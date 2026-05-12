import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CdkExpressPipeline } from 'cdk-express-pipeline';
import { DataLandingZoneProps, DlzFinOpsAccountTags } from '../src/data-landing-zone-types';
import { FinOpsGlobalStack } from '../src/stacks/organization/shared-services/finops/global-stack';

const synth = (accountTags?: DlzFinOpsAccountTags) => {
  const app = new App();
  const pipeline = new CdkExpressPipeline({});
  const wave = pipeline.addWave('finops');
  const stage = wave.addStage('global');

  const props = {
    organization: {
      root: { accounts: { management: { accountId: '999999999999', name: 'mgmt' } } },
      ous: {
        sharedServices: {
          accounts: {
            finOps: { accountId: '111111111111', name: 'finops', type: 'production' },
          },
        },
      },
    },
    finOps: {
      // Ensures the data-plane bucket synthesizes so Tags propagate to a taggable resource.
      dataExports: { exports: { standard: { exportType: 'STANDARD_CUR_2_0' } } },
      accountTags,
    },
  } as unknown as DataLandingZoneProps;

  const stack = new FinOpsGlobalStack(app, {
    stage,
    name: { ou: 'shared-services', account: 'finops', stack: 'global', region: 'us-east-1' },
    env: { account: '111111111111', region: 'us-east-1' },
  }, props);

  return Template.fromStack(stack);
};

const tagOnBucket = (template: Template, key: string): string | undefined => {
  const buckets = template.findResources('AWS::S3::Bucket');
  for (const def of Object.values(buckets) as any[]) {
    const tag = (def.Properties?.Tags ?? []).find((t: any) => t.Key === key);
    if (tag) return tag.Value;
  }
  return undefined;
};

describe('FinOpsGlobalStack account tags', () => {
  test('applies the spec defaults when no overrides are provided', () => {
    const t = synth();
    expect(tagOnBucket(t, 'Owner')).toBe('infra');
    expect(tagOnBucket(t, 'Project')).toBe('dlz');
    expect(tagOnBucket(t, 'Environment')).toBe('production');
    expect(tagOnBucket(t, 'CostCenter')).toBe('dlz');
    expect(tagOnBucket(t, 'Domain')).toBe('foundation');
  });

  test('overrides every tag when fully populated', () => {
    const t = synth({
      owner: 'platform-team',
      project: 'data-platform',
      environment: 'staging',
      costCenter: 'eng-platform',
      domain: 'finops-data',
    });
    expect(tagOnBucket(t, 'Owner')).toBe('platform-team');
    expect(tagOnBucket(t, 'Project')).toBe('data-platform');
    expect(tagOnBucket(t, 'Environment')).toBe('staging');
    expect(tagOnBucket(t, 'CostCenter')).toBe('eng-platform');
    expect(tagOnBucket(t, 'Domain')).toBe('finops-data');
  });

  test('partial override leaves the other defaults intact', () => {
    const t = synth({ environment: 'staging' });
    expect(tagOnBucket(t, 'Owner')).toBe('infra');
    expect(tagOnBucket(t, 'Project')).toBe('dlz');
    expect(tagOnBucket(t, 'Environment')).toBe('staging');
    expect(tagOnBucket(t, 'CostCenter')).toBe('dlz');
    expect(tagOnBucket(t, 'Domain')).toBe('foundation');
  });

});
