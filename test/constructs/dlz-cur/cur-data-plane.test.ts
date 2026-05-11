import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { DlzCurDataPlane, DlzCurDataPlaneProps } from '../../../src/constructs/dlz-cur/dlz-cur-data-plane';

const baseProps: DlzCurDataPlaneProps = {
  managementAccountId: '999999999999',
  destinationRegion: 'us-east-1',
  bucketNamePrefix: 'dlz-cur',
  exportName: 'dlz-cur-2',
  glueDatabaseName: 'dlz_cur_2',
};

const synth = (props: DlzCurDataPlaneProps) => {
  const app = new App();
  const stack = new Stack(app, 'TestStack', { env: { account: '111111111111', region: 'us-east-1' } });
  new DlzCurDataPlane(stack, 'TestDataPlane', props);
  return Template.fromStack(stack);
};

describe('DlzCurDataPlane', () => {
  test('creates the bucket with the expected name and BPA', () => {
    const t = synth(baseProps);
    t.hasResourceProperties('AWS::S3::Bucket', {
      BucketName: 'dlz-cur-111111111111-us-east-1',
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
    });
  });

  test('grants bcm-data-exports write scoped by SourceAccount/SourceArn', () => {
    const t = synth(baseProps);
    t.hasResourceProperties('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Sid: 'EnableAWSDataExportsToWriteToS3',
            Effect: 'Allow',
            Principal: { Service: 'bcm-data-exports.amazonaws.com' },
            Action: 's3:PutObject',
            Condition: {
              ArnLike: { 'aws:SourceArn': 'arn:aws:bcm-data-exports:us-east-1:999999999999:export/*' },
              StringEquals: { 'aws:SourceAccount': '999999999999' },
            },
          }),
        ]),
      },
    });
  });

  test('applies the lifecycle rule by default', () => {
    const t = synth(baseProps);
    t.hasResourceProperties('AWS::S3::Bucket', {
      LifecycleConfiguration: {
        Rules: Match.arrayWith([
          Match.objectLike({ Id: 'dlz-cur-lifecycle', Status: 'Enabled' }),
        ]),
      },
    });
  });

  test('omits the lifecycle rule when disabled', () => {
    const t = synth({
      ...baseProps,
      dataPlaneConfig: { lifecycle: { enabled: false } },
    });
    // Scope to the CUR data bucket — the Athena results bucket has its own
    // (separate, short) lifecycle that is not governed by `lifecycle.enabled`.
    const dataBucket = Object.values(t.findResources('AWS::S3::Bucket'))
      .find((b: any) => b.Properties?.BucketName === 'dlz-cur-111111111111-us-east-1') as any;
    expect(dataBucket?.Properties?.LifecycleConfiguration).toBeUndefined();
  });

  test('rejects expirationDays below the 13-month minimum (when non-zero)', () => {
    expect(() =>
      synth({
        ...baseProps,
        dataPlaneConfig: { lifecycle: { expirationDays: 30 } },
      }),
    ).toThrow(/expirationDays must be 0/);
  });

  test('allows expirationDays=0 (no expiration)', () => {
    expect(() =>
      synth({
        ...baseProps,
        dataPlaneConfig: { lifecycle: { expirationDays: 0 } },
      }),
    ).not.toThrow();
  });

  test('creates a Glue database and crawler scheduled at 06:00 UTC by default', () => {
    const t = synth(baseProps);
    t.resourceCountIs('AWS::Glue::Database', 1);
    t.hasResourceProperties('AWS::Glue::Crawler', {
      Schedule: { ScheduleExpression: 'cron(0 6 * * ? *)' },
      TablePrefix: 'cur_',
    });
  });

  test('crawler scans the flat <exportName>/ path by default with metadata exclusions', () => {
    // With the default empty destinationPrefix, BCM lays files at
    // <bucket>/<exportName>/{data,metadata}/... — the crawler scans there and
    // excludes metadata + JSON so a second `cur_metadata` table is not created.
    const t = synth(baseProps);
    t.hasResourceProperties('AWS::Glue::Crawler', {
      Targets: {
        S3Targets: [{
          Path: 's3://dlz-cur-111111111111-us-east-1/dlz-cur-2/',
          Exclusions: Match.arrayWith(['metadata/**', '**.json']),
        }],
      },
    });
  });

  test('crawler path nests under destinationPrefix when explicitly set', () => {
    const t = synth({ ...baseProps, destinationPrefix: 'reports' });
    t.hasResourceProperties('AWS::Glue::Crawler', {
      Targets: {
        S3Targets: [{
          Path: 's3://dlz-cur-111111111111-us-east-1/reports/dlz-cur-2/',
          Exclusions: Match.arrayWith(['metadata/**', '**.json']),
        }],
      },
    });
  });

  test('crawler config tolerates schema evolution via MergeNewColumns', () => {
    const t = synth(baseProps);
    const crawlers = t.findResources('AWS::Glue::Crawler');
    const crawler = Object.values(crawlers)[0] as any;
    const cfg = JSON.parse(crawler.Properties.Configuration);
    expect(cfg.CrawlerOutput.Tables.AddOrUpdateBehavior).toBe('MergeNewColumns');
  });

  test('exports CUR data-plane state as SSM parameters under /dlz/finops/cur/', () => {
    const t = synth(baseProps);
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/cur/glue-database-name',
      Value: 'dlz_cur_2',
    });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/cur/cur-bucket-name',
      Value: 'dlz-cur-111111111111-us-east-1',
    });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/cur/cur-destination-prefix',
      Value: '(none)',
    });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/cur/cur-export-name',
      Value: 'dlz-cur-2',
    });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/cur/cur-data-path',
      Value: 'dlz-cur-2',
    });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/cur/destination-region',
      Value: 'us-east-1',
    });
  });

  test('SSM cur-data-path includes the destinationPrefix when set', () => {
    const t = synth({ ...baseProps, destinationPrefix: 'reports' });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/cur/cur-destination-prefix',
      Value: 'reports',
    });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/cur/cur-data-path',
      Value: 'reports/dlz-cur-2',
    });
  });

  test('grants additionalReadAccountIds GetObject + ListBucket', () => {
    // CDK renders an AccountPrincipal as Fn::Join(['arn:', { Ref: 'AWS::Partition' }, ':iam::222222222222:root']),
    // so match on Sid + Action — the principal-render shape is CDK's responsibility.
    const t = synth({
      ...baseProps,
      dataPlaneConfig: { additionalReadAccountIds: ['222222222222'] },
    });
    t.hasResourceProperties('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Sid: 'AllowReadFromAccount222222222222',
            Effect: 'Allow',
            Action: ['s3:GetObject', 's3:ListBucket'],
          }),
        ]),
      },
    });
  });
});
