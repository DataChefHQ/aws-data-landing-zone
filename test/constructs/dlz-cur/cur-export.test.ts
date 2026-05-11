import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { DlzCurExport } from '../../../src/constructs/dlz-cur/dlz-cur-export';

const baseProps = {
  destinationBucketArn: 'arn:aws:s3:::dlz-cur-111111111111-us-east-1',
  destinationBucketRegion: 'us-east-1',
  destinationBucketOwnerAccountId: '111111111111',
  costAllocationTagKeys: ['Owner', 'Project'],
};

const synth = (props: ConstructorParameters<typeof DlzCurExport>[2]) => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');
  new DlzCurExport(stack, 'TestExport', props);
  return Template.fromStack(stack);
};

describe('DlzCurExport', () => {
  test('synthesizes the export custom resource with default name and frequency', () => {
    const t = synth(baseProps);
    t.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      Name: 'dlz-cur-2',
      Frequency: 'SYNCHRONOUS',
    });
  });

  test('honors a custom export name', () => {
    const t = synth({ ...baseProps, exportName: 'team-cur' });
    t.hasResourceProperties('AWS::CloudFormation::CustomResource', { Name: 'team-cur' });
  });

  test('defaults BCM S3Prefix to empty (flat <bucket>/<exportName>/ layout)', () => {
    const t = synth(baseProps);
    t.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      DestinationConfigurations: Match.stringLikeRegexp('"S3Prefix":""'),
    });
  });

  test('honors an explicit destinationPrefix on BCM S3Prefix', () => {
    const t = synth({ ...baseProps, destinationPrefix: 'reports' });
    t.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      DestinationConfigurations: Match.stringLikeRegexp('"S3Prefix":"reports"'),
    });
  });

  test('appends iam_principal column when includeIamPrincipalData=true', () => {
    const t = synth({
      ...baseProps,
      exportConfig: { includeIamPrincipalData: true },
    });
    t.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      QueryStatement: Match.stringLikeRegexp('line_item_iam_principal'),
    });
  });

  test('does not append iam_principal column by default', () => {
    const t = synth(baseProps);
    const resources = t.findResources('AWS::CloudFormation::CustomResource');
    const queries = Object.values(resources)
      .map((r: any) => r.Properties?.QueryStatement)
      .filter((q): q is string => typeof q === 'string');
    expect(queries.length).toBeGreaterThan(0);
    for (const q of queries) {
      expect(q).not.toContain('line_item_iam_principal');
    }
  });

  test('user-supplied queryStatement wins over generated one', () => {
    const explicit = 'SELECT line_item_unblended_cost FROM COST_AND_USAGE_REPORT';
    const t = synth({
      ...baseProps,
      exportConfig: { queryStatement: explicit, includeIamPrincipalData: true },
    });
    t.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      QueryStatement: explicit,
    });
  });

  test('serializes destination configuration with parsed bucket name', () => {
    const t = synth(baseProps);
    t.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      DestinationConfigurations: Match.stringLikeRegexp('dlz-cur-111111111111-us-east-1'),
    });
  });

  test('emits a tag-activation custom resource when tag keys are provided', () => {
    const t = synth(baseProps);
    const tagActivation = t.findResources('AWS::CloudFormation::CustomResource', {
      Properties: { tagKeys: Match.stringLikeRegexp('Owner') },
    });
    expect(Object.keys(tagActivation)).toHaveLength(1);
  });

  test('skips the tag-activation custom resource when tag keys are empty', () => {
    const t = synth({ ...baseProps, costAllocationTagKeys: [] });
    const allCustomResources = t.findResources('AWS::CloudFormation::CustomResource');
    for (const [, def] of Object.entries(allCustomResources)) {
      expect((def as any).Properties?.tagKeys).toBeUndefined();
    }
  });

  test('rejects malformed bucket ARN', () => {
    expect(() => synth({ ...baseProps, destinationBucketArn: 'not-an-arn' })).toThrow(
      /Expected an S3 bucket ARN/,
    );
  });
});
