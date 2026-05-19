import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { DlzDataExportsDataPlane, DlzDataExportsDataPlaneProps } from '../../../src/constructs/dlz-data-exports/dlz-data-exports-data-plane';

const synth = (overrides: Partial<DlzDataExportsDataPlaneProps> = {}) => {
  const props: DlzDataExportsDataPlaneProps = {
    managementAccountId: '999999999999',
    destinationRegion: 'us-east-1',
    bucketNamePrefix: 'dlz-finops',
    exports: {
      standard: { exportType: 'STANDARD_CUR_2_0' },
    },
    ...overrides,
  };
  const app = new App();
  const stack = new Stack(app, 'TestStack', { env: { account: '111111111111', region: 'us-east-1' } });
  new DlzDataExportsDataPlane(stack, 'TestDataPlane', props);
  return Template.fromStack(stack);
};

describe('DlzDataExportsDataPlane — shared bucket', () => {
  test('creates exactly one shared bucket with the expected name + BPA', () => {
    const t = synth({
      exports: {
        standard: { exportType: 'STANDARD_CUR_2_0' },
        focus: { exportType: 'FOCUS_1_2' },
        carbon: { exportType: 'CARBON_EMISSIONS' },
      },
    });
    const dataBuckets = Object.values(t.findResources('AWS::S3::Bucket'))
      .filter((b: any) => b.Properties?.BucketName === 'dlz-finops-111111111111-us-east-1');
    expect(dataBuckets).toHaveLength(1);
    expect((dataBuckets[0] as any).Properties.PublicAccessBlockConfiguration).toMatchObject({
      BlockPublicAcls: true,
      BlockPublicPolicy: true,
      IgnorePublicAcls: true,
      RestrictPublicBuckets: true,
    });
  });

  test('grants bcm-data-exports write scoped by SourceAccount/SourceArn via wildcard export ARN', () => {
    const t = synth();
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

  test('grants additionalReadAccountIds GetObject + ListBucket', () => {
    const t = synth({
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

  test('applies the lifecycle rule by default', () => {
    const t = synth();
    t.hasResourceProperties('AWS::S3::Bucket', {
      LifecycleConfiguration: {
        Rules: Match.arrayWith([
          Match.objectLike({ Id: 'dlz-finops-lifecycle', Status: 'Enabled' }),
        ]),
      },
    });
  });

  test('rejects expirationDays below the 13-month minimum (when non-zero)', () => {
    expect(() =>
      synth({ dataPlaneConfig: { lifecycle: { expirationDays: 30 } } }),
    ).toThrow(/expirationDays must be 0/);
  });
});

describe('DlzDataExportsDataPlane — shared Glue DB + multi-target crawler', () => {
  test('creates exactly one shared Glue database', () => {
    const t = synth({
      exports: {
        standard: { exportType: 'STANDARD_CUR_2_0' },
        focus: { exportType: 'FOCUS_1_2' },
        carbon: { exportType: 'CARBON_EMISSIONS' },
      },
    });
    t.resourceCountIs('AWS::Glue::Database', 1);
    t.hasResourceProperties('AWS::Glue::Database', {
      DatabaseInput: Match.objectLike({ Name: 'dlz_finops' }),
    });
  });

  test('creates exactly one crawler with N S3Targets — one per export', () => {
    const t = synth({
      exports: {
        standard: { exportType: 'STANDARD_CUR_2_0' },
        focus: { exportType: 'FOCUS_1_2' },
        carbon: { exportType: 'CARBON_EMISSIONS' },
      },
    });
    t.resourceCountIs('AWS::Glue::Crawler', 1);
    t.hasResourceProperties('AWS::Glue::Crawler', {
      Schedule: { ScheduleExpression: 'cron(0 6 * * ? *)' },
      TablePrefix: 'finops_',
      Targets: {
        S3Targets: Match.arrayWith([
          { Path: 's3://dlz-finops-111111111111-us-east-1/dlz-standard/', Exclusions: Match.arrayWith(['metadata/**', '**.json']) },
          { Path: 's3://dlz-finops-111111111111-us-east-1/dlz-focus/', Exclusions: Match.arrayWith(['metadata/**', '**.json']) },
          { Path: 's3://dlz-finops-111111111111-us-east-1/dlz-carbon/', Exclusions: Match.arrayWith(['metadata/**', '**.json']) },
        ]),
      },
    });
  });

  test('honors per-entry destinationPrefix and exportName overrides in S3Target paths', () => {
    const t = synth({
      exports: {
        standard: { exportType: 'STANDARD_CUR_2_0', destinationPrefix: 'reports', exportName: 'team-cur' },
      },
    });
    t.hasResourceProperties('AWS::Glue::Crawler', {
      Targets: {
        S3Targets: [
          Match.objectLike({ Path: 's3://dlz-finops-111111111111-us-east-1/reports/team-cur/' }),
        ],
      },
    });
  });

  test('crawler config tolerates schema evolution via MergeNewColumns', () => {
    const t = synth();
    const crawler = Object.values(t.findResources('AWS::Glue::Crawler'))[0] as any;
    const cfg = JSON.parse(crawler.Properties.Configuration);
    expect(cfg.CrawlerOutput.Tables.AddOrUpdateBehavior).toBe('MergeNewColumns');
  });
});

describe('DlzDataExportsDataPlane — SSM parameters', () => {
  test('publishes shared params at /dlz/finops/*', () => {
    const t = synth();
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/data-bucket-name',
      Value: 'dlz-finops-111111111111-us-east-1',
    });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/destination-region',
      Value: 'us-east-1',
    });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/glue-database-name',
      Value: 'dlz_finops',
    });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/finops-account-id',
      Value: '111111111111',
    });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/management-account-id',
      Value: '999999999999',
    });
  });

  test('publishes data-bucket-arn + SSE_S3 by default, no kms-key-arn', () => {
    const t = synth();
    t.hasResourceProperties('AWS::SSM::Parameter', { Name: '/dlz/finops/data-bucket-arn' });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/data-bucket-encryption-type',
      Value: 'SSE_S3',
    });
    const names = Object.values(t.findResources('AWS::SSM::Parameter')).map((p: any) => p.Properties.Name);
    expect(names).not.toContain('/dlz/finops/data-bucket-kms-key-arn');
  });

  test('publishes SSE_KMS + kms-key-arn when CMK configured', () => {
    const kmsKeyArn = 'arn:aws:kms:us-east-1:111111111111:key/00000000-0000-0000-0000-000000000000';
    const t = synth({ dataPlaneConfig: { encryption: { kmsKeyArn } } });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/data-bucket-encryption-type',
      Value: 'SSE_KMS',
    });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/data-bucket-kms-key-arn',
      Value: kmsKeyArn,
    });
  });

  test('publishes glue-crawler-name + default schedule', () => {
    const t = synth();
    t.hasResourceProperties('AWS::SSM::Parameter', { Name: '/dlz/finops/glue-crawler-name' });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/glue-crawler-schedule',
      Value: 'cron(0 6 * * ? *)',
    });
  });

  test('glue-crawler-schedule honors override', () => {
    const t = synth({ dataPlaneConfig: { glueCrawlerSchedule: 'cron(0 */4 * * ? *)' } });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/glue-crawler-schedule',
      Value: 'cron(0 */4 * * ? *)',
    });
  });

  test('publishes export-ids as StringList', () => {
    const t = synth({
      exports: {
        'standard': { exportType: 'STANDARD_CUR_2_0' },
        'focus-1-2': { exportType: 'FOCUS_1_2' },
        'carbon': { exportType: 'CARBON_EMISSIONS' },
      },
    });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/export-ids',
      Type: 'StringList',
      Value: 'standard,focus-1-2,carbon',
    });
  });

  test('publishes per-export params at /dlz/finops/exports/<id>/*', () => {
    const t = synth({
      exports: {
        standard: { exportType: 'STANDARD_CUR_2_0' },
        focus: { exportType: 'FOCUS_1_2' },
      },
    });
    for (const id of ['standard', 'focus']) {
      t.hasResourceProperties('AWS::SSM::Parameter', { Name: `/dlz/finops/exports/${id}/export-type` });
      t.hasResourceProperties('AWS::SSM::Parameter', { Name: `/dlz/finops/exports/${id}/export-name` });
      t.hasResourceProperties('AWS::SSM::Parameter', { Name: `/dlz/finops/exports/${id}/destination-prefix` });
      t.hasResourceProperties('AWS::SSM::Parameter', { Name: `/dlz/finops/exports/${id}/data-path` });
      t.hasResourceProperties('AWS::SSM::Parameter', { Name: `/dlz/finops/exports/${id}/s3-uri` });
      t.hasResourceProperties('AWS::SSM::Parameter', { Name: `/dlz/finops/exports/${id}/glue-table-name` });
    }
  });

  test('per-export s3-uri = bucket + dataPath with trailing slash', () => {
    const t = synth();
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/exports/standard/s3-uri',
      Value: 's3://dlz-finops-111111111111-us-east-1/dlz-standard/',
    });
  });

  test('destination-prefix sentinel "(none)" when prefix is unset', () => {
    const t = synth();
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/exports/standard/destination-prefix',
      Value: '(none)',
    });
  });

  test('glue-table-name SSM matches crawler-derived name', () => {
    const t = synth({
      exports: {
        'cost-opt-recs': { exportType: 'COST_OPTIMIZATION_RECOMMENDATIONS' },
        'carbon': { exportType: 'CARBON_EMISSIONS' },
      },
    });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/exports/cost-opt-recs/glue-table-name',
      Value: 'finops_dlz_cost_opt_recs',
    });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/exports/carbon/glue-table-name',
      Value: 'finops_dlz_carbon',
    });
  });

  test('export-type SSM carries the exportType discriminator', () => {
    const t = synth({
      exports: {
        standard: { exportType: 'STANDARD_CUR_2_0' },
        carbon: { exportType: 'CARBON_EMISSIONS' },
      },
    });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/exports/standard/export-type',
      Value: 'STANDARD_CUR_2_0',
    });
    t.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/finops/exports/carbon/export-type',
      Value: 'CARBON_EMISSIONS',
    });
  });
});
