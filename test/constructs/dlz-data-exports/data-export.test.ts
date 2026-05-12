import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { DlzDataExport, DlzDataExportProps } from '../../../src/constructs/dlz-data-exports/dlz-data-export';

const sharedBucketProps = {
  destinationBucketArn: 'arn:aws:s3:::dlz-finops-111111111111-us-east-1',
  destinationBucketRegion: 'us-east-1',
  destinationBucketOwnerAccountId: '111111111111',
};

const synth = (props: DlzDataExportProps) => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');
  new DlzDataExport(stack, 'TestExport', props);
  return Template.fromStack(stack);
};

const findExport = (t: Template) => {
  const rs = t.findResources('AWS::CloudFormation::CustomResource', {
    Properties: { Name: Match.anyValue() },
  });
  const entries = Object.values(rs);
  expect(entries.length).toBe(1);
  return (entries[0] as any).Properties;
};

describe('DlzDataExport — defaults', () => {
  test('exportName defaults to dlz-<id> from the keyed-map id', () => {
    const t = synth({
      ...sharedBucketProps,
      entryId: 'standard',
      entry: { exportType: 'STANDARD_CUR_2_0' },
    });
    expect(findExport(t).Name).toBe('dlz-standard');
  });

  test('explicit exportName wins over the derived default', () => {
    const t = synth({
      ...sharedBucketProps,
      entryId: 'standard',
      entry: { exportType: 'STANDARD_CUR_2_0', exportName: 'team-cur' },
    });
    expect(findExport(t).Name).toBe('team-cur');
  });

  test('S3Prefix defaults to empty (flat <bucket>/<exportName>/ layout)', () => {
    const t = synth({
      ...sharedBucketProps,
      entryId: 'standard',
      entry: { exportType: 'STANDARD_CUR_2_0' },
    });
    expect(findExport(t).DestinationConfigurations).toContain('"S3Prefix":""');
  });

  test('Format/Compression default to PARQUET/PARQUET', () => {
    const t = synth({
      ...sharedBucketProps,
      entryId: 'standard',
      entry: { exportType: 'STANDARD_CUR_2_0' },
    });
    expect(findExport(t).DestinationConfigurations).toContain('"Format":"PARQUET","Compression":"PARQUET"');
  });

  test('TEXT_OR_CSV output defaults compression to GZIP', () => {
    const t = synth({
      ...sharedBucketProps,
      entryId: 'standard',
      entry: { exportType: 'STANDARD_CUR_2_0', output: { format: 'TEXT_OR_CSV' } },
    });
    expect(findExport(t).DestinationConfigurations).toContain('"Format":"TEXT_OR_CSV","Compression":"GZIP"');
  });

  test('Frequency is hardcoded SYNCHRONOUS', () => {
    const t = synth({
      ...sharedBucketProps,
      entryId: 'standard',
      entry: { exportType: 'STANDARD_CUR_2_0' },
    });
    expect(findExport(t).Frequency).toBe('SYNCHRONOUS');
  });
});

describe('DlzDataExport — STANDARD_CUR_2_0', () => {
  test('uses COST_AND_USAGE_REPORT FROM clause and table key', () => {
    const t = synth({
      ...sharedBucketProps,
      entryId: 'standard',
      entry: { exportType: 'STANDARD_CUR_2_0' },
    });
    const e = findExport(t);
    expect(e.QueryStatement).toMatch(/FROM COST_AND_USAGE_REPORT$/);
    expect(e.TableConfigurations).toContain('"COST_AND_USAGE_REPORT"');
  });

  test('default TableConfigurations carry TIME_GRANULARITY=HOURLY and INCLUDE_RESOURCES/SPLIT=TRUE', () => {
    const t = synth({
      ...sharedBucketProps,
      entryId: 'standard',
      entry: { exportType: 'STANDARD_CUR_2_0' },
    });
    const tc = JSON.parse(findExport(t).TableConfigurations);
    expect(tc.COST_AND_USAGE_REPORT).toMatchObject({
      TIME_GRANULARITY: 'HOURLY',
      INCLUDE_RESOURCES: 'TRUE',
      INCLUDE_SPLIT_COST_ALLOCATION_DATA: 'TRUE',
    });
  });

  test('appends iam_principal column when includeIamPrincipalData=true', () => {
    const t = synth({
      ...sharedBucketProps,
      entryId: 'standard',
      entry: { exportType: 'STANDARD_CUR_2_0', config: { includeIamPrincipalData: true } },
    });
    const e = findExport(t);
    expect(e.QueryStatement).toContain('line_item_iam_principal');
    expect(e.TableConfigurations).toContain('"INCLUDE_IAM_PRINCIPAL_DATA":"TRUE"');
  });

  test('user-supplied queryStatement wins over generated one', () => {
    const explicit = 'SELECT line_item_unblended_cost FROM COST_AND_USAGE_REPORT';
    const t = synth({
      ...sharedBucketProps,
      entryId: 'standard',
      entry: {
        exportType: 'STANDARD_CUR_2_0',
        config: { queryStatement: explicit, includeIamPrincipalData: true },
      },
    });
    expect(findExport(t).QueryStatement).toBe(explicit);
  });

  test('serializes destination configuration with parsed bucket name', () => {
    const t = synth({
      ...sharedBucketProps,
      entryId: 'standard',
      entry: { exportType: 'STANDARD_CUR_2_0' },
    });
    expect(findExport(t).DestinationConfigurations).toContain('dlz-finops-111111111111-us-east-1');
  });
});

describe('DlzDataExport — FOCUS_1_2', () => {
  test('uses FOCUS_1_2_AWS and emits TIME_GRANULARITY=DAILY by default', () => {
    const t = synth({
      ...sharedBucketProps,
      entryId: 'focus12',
      entry: { exportType: 'FOCUS_1_2' },
    });
    const e = findExport(t);
    expect(e.QueryStatement).toMatch(/FROM FOCUS_1_2_AWS$/);
    expect(JSON.parse(e.TableConfigurations)).toEqual({
      FOCUS_1_2_AWS: { TIME_GRANULARITY: 'DAILY' },
    });
  });

  test('honors timeGranularity=MONTHLY', () => {
    const t = synth({
      ...sharedBucketProps,
      entryId: 'focus12',
      entry: { exportType: 'FOCUS_1_2', config: { timeGranularity: 'MONTHLY' } },
    });
    expect(JSON.parse(findExport(t).TableConfigurations).FOCUS_1_2_AWS.TIME_GRANULARITY).toBe('MONTHLY');
  });

  test('projects the InvoiceId column the 1.0 default lacks', () => {
    const t = synth({
      ...sharedBucketProps,
      entryId: 'focus12',
      entry: { exportType: 'FOCUS_1_2' },
    });
    expect(findExport(t).QueryStatement).toContain('InvoiceId');
  });
});

describe('DlzDataExport — COST_OPTIMIZATION_RECOMMENDATIONS', () => {
  test('uses COST_OPTIMIZATION_RECOMMENDATIONS FROM and no defaulted TableConfigurations', () => {
    const t = synth({
      ...sharedBucketProps,
      entryId: 'cor',
      entry: { exportType: 'COST_OPTIMIZATION_RECOMMENDATIONS' },
    });
    const e = findExport(t);
    expect(e.QueryStatement).toMatch(/FROM COST_OPTIMIZATION_RECOMMENDATIONS$/);
    expect(JSON.parse(e.TableConfigurations).COST_OPTIMIZATION_RECOMMENDATIONS).toEqual({});
  });

  test('emits INCLUDE_ALL_RECOMMENDATIONS when set', () => {
    const t = synth({
      ...sharedBucketProps,
      entryId: 'cor',
      entry: {
        exportType: 'COST_OPTIMIZATION_RECOMMENDATIONS',
        config: { includeAllRecommendations: true },
      },
    });
    const tc = JSON.parse(findExport(t).TableConfigurations);
    expect(tc.COST_OPTIMIZATION_RECOMMENDATIONS.INCLUDE_ALL_RECOMMENDATIONS).toBe('TRUE');
  });

  test('FILTER is JSON-stringified per BCM API requirement', () => {
    const t = synth({
      ...sharedBucketProps,
      entryId: 'cor',
      entry: {
        exportType: 'COST_OPTIMIZATION_RECOMMENDATIONS',
        config: { filter: { accountIds: ['123456789012'], resourceTypes: ['Ec2Instance'] } },
      },
    });
    const tc = JSON.parse(findExport(t).TableConfigurations);
    const filter = tc.COST_OPTIMIZATION_RECOMMENDATIONS.FILTER;
    expect(typeof filter).toBe('string');
    expect(JSON.parse(filter)).toEqual({ accountIds: ['123456789012'], resourceTypes: ['Ec2Instance'] });
  });
});

describe('DlzDataExport — CARBON_EMISSIONS', () => {
  test('uses CARBON_EMISSIONS and emits an empty TableConfigurations map', () => {
    const t = synth({
      ...sharedBucketProps,
      entryId: 'carbon',
      entry: { exportType: 'CARBON_EMISSIONS' },
    });
    const e = findExport(t);
    expect(e.QueryStatement).toMatch(/FROM CARBON_EMISSIONS$/);
    expect(JSON.parse(e.TableConfigurations).CARBON_EMISSIONS).toEqual({});
  });

  test('projects emissions + partition columns by default', () => {
    const t = synth({
      ...sharedBucketProps,
      entryId: 'carbon',
      entry: { exportType: 'CARBON_EMISSIONS' },
    });
    const q = findExport(t).QueryStatement;
    expect(q).toContain('total_mbm_emissions_value');
    expect(q).toContain('total_lbm_emissions_value');
    expect(q).toContain('usage_period_start');
    expect(q).toContain('model_version');
  });
});

describe('DlzDataExport — Lambda provider permissions', () => {
  test('data-export-manager Lambda role includes sustainability:GetCarbonFootprintSummary', () => {
    // The shared provider is created on the first DlzDataExport instance; the
    // role policy must include the carbon perm regardless of which export
    // type is first because the policy is locked at provider-creation time.
    const t = synth({
      ...sharedBucketProps,
      entryId: 'standard',
      entry: { exportType: 'STANDARD_CUR_2_0' },
    });
    const roles = t.findResources('AWS::IAM::Role');
    const hasCarbon = Object.values(roles).some((r: any) => {
      const inline = r.Properties?.Policies?.[0]?.PolicyDocument?.Statement ?? [];
      return inline.some((s: any) => {
        const actions = Array.isArray(s.Action) ? s.Action : [s.Action];
        return actions.includes('sustainability:GetCarbonFootprintSummary');
      });
    });
    expect(hasCarbon).toBe(true);
  });
});
