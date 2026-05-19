import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { DlzDataExportsDataPlane, DlzDataExportsDataPlaneProps } from '../../../src/constructs/dlz-data-exports/dlz-data-exports-data-plane';

const baseProps: DlzDataExportsDataPlaneProps = {
  managementAccountId: '999999999999',
  destinationRegion: 'us-east-1',
  bucketNamePrefix: 'dlz-finops',
  exports: { standard: { exportType: 'STANDARD_CUR_2_0' } },
};

const synth = (props: DlzDataExportsDataPlaneProps) => {
  const app = new App();
  const stack = new Stack(app, 'TestStack', { env: { account: '111111111111', region: 'us-east-1' } });
  new DlzDataExportsDataPlane(stack, 'TestDataPlane', props);
  return Template.fromStack(stack);
};

describe('DlzDataExportsAthena (composed by DlzDataExportsDataPlane)', () => {

  test('creates the workgroup with sane defaults when athena is unset', () => {
    const t = synth(baseProps);
    t.hasResourceProperties('AWS::Athena::WorkGroup', {
      Name: 'dlz-finops',
      State: 'ENABLED',
      WorkGroupConfiguration: Match.objectLike({
        EnforceWorkGroupConfiguration: true,
        PublishCloudWatchMetricsEnabled: true,
        RequesterPaysEnabled: false,
        EngineVersion: { SelectedEngineVersion: 'Athena engine version 3' },
      }),
    });
  });

  test('points the workgroup at the dedicated results bucket via SSL-enforced output location', () => {
    const t = synth(baseProps);
    t.hasResourceProperties('AWS::Athena::WorkGroup', {
      WorkGroupConfiguration: Match.objectLike({
        ResultConfiguration: Match.objectLike({
          OutputLocation: Match.stringLikeRegexp('^s3://dlz-finops-athena-results-111111111111-us-east-1/'),
          EncryptionConfiguration: { EncryptionOption: 'SSE_S3' },
        }),
      }),
    });
  });

  test('creates the results bucket with BPA, no versioning, and short expiration', () => {
    const t = synth(baseProps);
    t.hasResourceProperties('AWS::S3::Bucket', {
      BucketName: 'dlz-finops-athena-results-111111111111-us-east-1',
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
      LifecycleConfiguration: {
        Rules: Match.arrayWith([
          Match.objectLike({
            Id: 'dlz-finops-athena-results-expiration',
            ExpirationInDays: 30,
            Status: 'Enabled',
          }),
        ]),
      },
    });
  });

  test('opt-out skips the workgroup and the results bucket entirely', () => {
    const t = synth({
      ...baseProps,
      dataPlaneConfig: { athena: { enabled: false } },
    });
    t.resourceCountIs('AWS::Athena::WorkGroup', 0);
    const buckets = t.findResources('AWS::S3::Bucket');
    const names = Object.values(buckets).map((b: any) => b.Properties?.BucketName);
    expect(names).not.toContain('dlz-finops-athena-results-111111111111-us-east-1');
  });

  test('overrides workgroup name, prefix, and engine version', () => {
    const t = synth({
      ...baseProps,
      dataPlaneConfig: {
        athena: {
          workgroupName: 'acme-cur',
          resultsBucketNamePrefix: 'acme-athena',
          engineVersion: 2,
          publishCloudWatchMetrics: false,
        },
      },
    });
    t.hasResourceProperties('AWS::Athena::WorkGroup', {
      Name: 'acme-cur',
      WorkGroupConfiguration: Match.objectLike({
        PublishCloudWatchMetricsEnabled: false,
        EngineVersion: { SelectedEngineVersion: 'Athena engine version 2' },
        ResultConfiguration: Match.objectLike({
          OutputLocation: Match.stringLikeRegexp('^s3://acme-athena-111111111111-us-east-1/'),
        }),
      }),
    });
  });

  test('propagates bytesScannedCutoffPerQuery onto the workgroup', () => {
    const t = synth({
      ...baseProps,
      dataPlaneConfig: { athena: { bytesScannedCutoffPerQuery: 10_737_418_240 } }, // 10 GiB
    });
    t.hasResourceProperties('AWS::Athena::WorkGroup', {
      WorkGroupConfiguration: Match.objectLike({
        BytesScannedCutoffPerQuery: 10_737_418_240,
      }),
    });
  });

  test('omits BytesScannedCutoffPerQuery when no limit is configured', () => {
    const t = synth(baseProps);
    const wgs = t.findResources('AWS::Athena::WorkGroup');
    const wg = Object.values(wgs)[0] as any;
    expect(wg.Properties.WorkGroupConfiguration.BytesScannedCutoffPerQuery).toBeUndefined();
  });

  test('uses custom expiration days when provided', () => {
    const t = synth({
      ...baseProps,
      dataPlaneConfig: { athena: { resultsExpirationDays: 7 } },
    });
    t.hasResourceProperties('AWS::S3::Bucket', {
      BucketName: 'dlz-finops-athena-results-111111111111-us-east-1',
      LifecycleConfiguration: {
        Rules: Match.arrayWith([
          Match.objectLike({ ExpirationInDays: 7 }),
        ]),
      },
    });
  });

  test('rejects resultsExpirationDays < 1 (no "keep forever" foot-gun)', () => {
    expect(() =>
      synth({
        ...baseProps,
        dataPlaneConfig: { athena: { resultsExpirationDays: 0 } },
      }),
    ).toThrow(/resultsExpirationDays must be >= 1/);
  });

  test('exports the workgroup + results bucket names as SSM parameters', () => {
    const t = synth(baseProps);
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/athena-workgroup-name',
      Value: 'dlz-finops',
    });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/athena-results-bucket-name',
      Value: 'dlz-finops-athena-results-111111111111-us-east-1',
    });
  });

  test('exports workgroup + results bucket ARNs', () => {
    const t = synth(baseProps);
    t.hasResourceProperties('AWS::SSM::Parameter', { Name: '/dlz/finops/athena-workgroup-arn' });
    t.hasResourceProperties('AWS::SSM::Parameter', { Name: '/dlz/finops/athena-results-bucket-arn' });
    const params = Object.values(t.findResources('AWS::SSM::Parameter')) as any[];
    const wgArn = params.find(p => p.Properties.Name === '/dlz/finops/athena-workgroup-arn');
    expect(wgArn.Properties.Value['Fn::Join'][1]).toEqual(
      expect.arrayContaining(['arn:', expect.stringContaining(':athena:us-east-1:111111111111:workgroup/dlz-finops')]),
    );
  });

  test('skips Athena SSM exports when athena.enabled is false', () => {
    const t = synth({
      ...baseProps,
      dataPlaneConfig: { athena: { enabled: false } },
    });
    const params = t.findResources('AWS::SSM::Parameter');
    const names = Object.values(params).map((p: any) => p.Properties?.Name);
    expect(names).not.toContain('/dlz/finops/athena-workgroup-name');
    expect(names).not.toContain('/dlz/finops/athena-workgroup-arn');
    expect(names).not.toContain('/dlz/finops/athena-results-bucket-name');
    expect(names).not.toContain('/dlz/finops/athena-results-bucket-arn');
  });

  test('mirrors SSE-KMS encryption from the data bucket onto results + workgroup', () => {
    const t = synth({
      ...baseProps,
      dataPlaneConfig: {
        encryption: { kmsKeyArn: 'arn:aws:kms:us-east-1:111111111111:key/abcd-efgh' },
      },
    });
    t.hasResourceProperties('AWS::Athena::WorkGroup', {
      WorkGroupConfiguration: Match.objectLike({
        ResultConfiguration: Match.objectLike({
          EncryptionConfiguration: {
            EncryptionOption: 'SSE_KMS',
            KmsKey: 'arn:aws:kms:us-east-1:111111111111:key/abcd-efgh',
          },
        }),
      }),
    });
    t.hasResourceProperties('AWS::S3::Bucket', {
      BucketName: 'dlz-finops-athena-results-111111111111-us-east-1',
      BucketEncryption: {
        ServerSideEncryptionConfiguration: Match.arrayWith([
          Match.objectLike({
            ServerSideEncryptionByDefault: Match.objectLike({
              SSEAlgorithm: 'aws:kms',
              KMSMasterKeyID: 'arn:aws:kms:us-east-1:111111111111:key/abcd-efgh',
            }),
          }),
        ]),
      },
    });
  });
});
