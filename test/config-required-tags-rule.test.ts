import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { DlzConfigRule } from '../src/constructs/dlz-config-rule';
import { mandatoryTagsPolicy } from '../src/constructs/dlz-config-rule/mandatory-tags-policy';

const MANDATORY_TAG_KEYS = ['Owner', 'Project', 'Environment', 'CostCenter', 'Name'];

function ruleTemplate(tagKeys: string[] = MANDATORY_TAG_KEYS) {
  const stack = new Stack(new App(), 'test', { env: { account: '111111111111', region: 'eu-west-1' } });
  new DlzConfigRule(stack, 'workloads-config-required-tags', {
    configRuleName: 'workloads-config-required-tags',
    policyText: mandatoryTagsPolicy(tagKeys),
    description: 'test rule',
    reportItem: { description: 'Checks resources for tags', externalLink: 'https://example.com' },
  });
  return Template.fromStack(stack);
}

describe('mandatoryTagsPolicy', () => {
  test('requires every key to be present and non-empty', () => {
    const policy = mandatoryTagsPolicy(MANDATORY_TAG_KEYS);
    for (const key of MANDATORY_TAG_KEYS) {
      expect(policy).toContain(`tags.${key} !empty`);
    }
  });

  test('names no resource type, so the rule evaluates every recorded type', () => {
    expect(mandatoryTagsPolicy(MANDATORY_TAG_KEYS)).not.toContain('resourceType');
  });

  test('fails a resource that carries no tags at all', () => {
    expect(mandatoryTagsPolicy(MANDATORY_TAG_KEYS)).toContain('tags !empty');
  });

  test('reads tags from the top-level map, not from configuration', () => {
    expect(mandatoryTagsPolicy(MANDATORY_TAG_KEYS)).not.toContain('configuration.tags');
  });

  test('reports the missing key in the annotation', () => {
    expect(mandatoryTagsPolicy(['Owner'])).toContain('<<Missing mandatory tag: Owner>>');
  });

  test('rejects keys that are not usable in a Guard query path', () => {
    expect(() => mandatoryTagsPolicy(['datachef:Owner']))
      .toThrow(/Unsupported: datachef:Owner/);
  });
});

describe('DlzConfigRule', () => {
  test('creates a Custom Policy rule, not a managed rule', () => {
    ruleTemplate().hasResourceProperties('AWS::Config::ConfigRule', Match.objectLike({
      Source: Match.objectLike({
        Owner: 'CUSTOM_POLICY',
        CustomPolicyDetails: Match.objectLike({ PolicyRuntime: 'guard-2.x.x' }),
      }),
    }));
  });

  test('omits Scope so every recorded resource type triggers an evaluation', () => {
    const rule = ruleTemplate().findResources('AWS::Config::ConfigRule');
    const properties = Object.values(rule)[0].Properties;
    expect(properties.Scope).toBeUndefined();
  });

  test('keeps the rule name, which the forwarding rule matches on', () => {
    ruleTemplate().hasResourceProperties('AWS::Config::ConfigRule', Match.objectLike({
      ConfigRuleName: 'workloads-config-required-tags',
    }));
  });

  test('reports itself under the rule name', () => {
    const stack = new Stack(new App(), 'test', { env: { account: '111111111111', region: 'eu-west-1' } });
    const rule = new DlzConfigRule(stack, 'rule', {
      configRuleName: 'workloads-config-required-tags',
      policyText: mandatoryTagsPolicy(MANDATORY_TAG_KEYS),
      reportItem: { description: 'Checks resources for tags', externalLink: 'https://example.com' },
    });
    expect(rule.reportResource.name).toBe('workloads-config-required-tags');
  });
});
