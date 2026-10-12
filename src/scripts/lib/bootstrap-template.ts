import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

export function writeBootstrapAccessLoggingTemplate(path: string): void {
  // CLI CI mode sends informational logs to stdout, contaminating template JSON.
  const template = JSON.parse(execFileSync('cdk', ['bootstrap', '--show-template', '--json', '--ci=false'], { encoding: 'utf8' }));
  const source = template.Resources?.StagingBucket;
  if (source?.Type !== 'AWS::S3::Bucket' || !source.Properties?.BucketName || source.Properties.LoggingConfiguration ||
      template.Resources.FileAssetsAccessLogsBucket ||
      template.Resources.FileAssetsAccessLogsBucketPolicy) {
    throw new Error('Unsupported CDK bootstrap template; refusing to overwrite asset logging');
  }
  template.Resources.FileAssetsAccessLogsBucket = {
    Type: 'AWS::S3::Bucket',
    DeletionPolicy: 'Retain',
    UpdateReplacePolicy: 'Retain',
    Properties: {
      OwnershipControls: { Rules: [{ ObjectOwnership: 'BucketOwnerEnforced' }] },
      BucketEncryption: { ServerSideEncryptionConfiguration: [{ ServerSideEncryptionByDefault: { SSEAlgorithm: 'AES256' } }] },
      PublicAccessBlockConfiguration: { BlockPublicAcls: true, BlockPublicPolicy: true, IgnorePublicAcls: true, RestrictPublicBuckets: true },
      VersioningConfiguration: { Status: 'Enabled' },
      LifecycleConfiguration: { Rules: [{ Id: 'ExpireAccessLogs', Status: 'Enabled', ExpirationInDays: 365, NoncurrentVersionExpiration: { NoncurrentDays: 365 } }] },
    },
  };
  const logArn = { 'Fn::GetAtt': ['FileAssetsAccessLogsBucket', 'Arn'] };
  template.Resources.FileAssetsAccessLogsBucketPolicy = {
    Type: 'AWS::S3::BucketPolicy',
    Properties: {
      Bucket: { Ref: 'FileAssetsAccessLogsBucket' },
      PolicyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: { Service: 'logging.s3.amazonaws.com' },
            Action: 's3:PutObject',
            Resource: { 'Fn::Join': ['', [logArn, '/cdk-assets/*']] },
            Condition: {
              StringEquals: { 'aws:SourceAccount': { Ref: 'AWS::AccountId' } },
              // Compute the source ARN without referencing StagingBucket, avoiding a dependency cycle.
              ArnLike: { 'aws:SourceArn': { 'Fn::Join': ['', ['arn:', { Ref: 'AWS::Partition' }, ':s3:::', source.Properties.BucketName]] } },
            },
          },
          {
            Effect: 'Deny',
            Principal: '*',
            Action: 's3:*',
            Resource: [logArn, { 'Fn::Join': ['', [logArn, '/*']] }],
            Condition: { Bool: { 'aws:SecureTransport': 'false' } },
          },
        ],
      },
    },
  };
  source.Properties.LoggingConfiguration = {
    DestinationBucketName: { Ref: 'FileAssetsAccessLogsBucket' }, LogFilePrefix: 'cdk-assets/',
  };
  source.DependsOn = [...(Array.isArray(source.DependsOn) ? source.DependsOn : source.DependsOn ? [source.DependsOn] : []), 'FileAssetsAccessLogsBucketPolicy'];
  writeFileSync(path, JSON.stringify(template, null, 2));
}
