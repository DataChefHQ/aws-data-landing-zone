import * as iam from 'aws-cdk-lib/aws-iam';
import { ScpLimits, ScpMerge } from '../src/constructs/organization-policies/scp-merge';
import { ScpDenyResourceCreationWithoutStandardTags as TagScp } from '../src/constructs/organization-policies/scp-presets';

const denyEks = new iam.PolicyStatement({
  sid: 'DenyEks',
  effect: iam.Effect.DENY,
  actions: ['eks:*'],
  resources: ['*'],
});

const denyEcs = new iam.PolicyStatement({
  sid: 'DenyEcs',
  effect: iam.Effect.DENY,
  actions: ['ecs:*'],
  resources: ['*'],
});

const denyAccountSpecific = new iam.PolicyStatement({
  sid: 'DenyAccountSpecific',
  effect: iam.Effect.DENY,
  actions: ['s3:DeleteBucket'],
  resources: ['*'],
});

const denyAccountTypeSpecific = new iam.PolicyStatement({
  sid: 'DenyAccountTypeSpecific',
  effect: iam.Effect.DENY,
  actions: ['rds:DeleteDBCluster'],
  resources: ['*'],
});

describe('ScpMerge.resolve', () => {
  test('baseline only when no per-account extras provided', () => {
    const result = ScpMerge.resolve({
      baseline: [denyEks, denyEcs],
      accountExtras: [],
    });

    expect(result).toEqual([denyEks, denyEcs]);
  });

  test('per-account extras are appended after baseline', () => {
    const result = ScpMerge.resolve({
      baseline: [denyEks],
      accountExtras: [denyAccountSpecific],
    });

    expect(result).toEqual([denyEks, denyAccountSpecific]);
  });

  test('account-type extras are layered between baseline and per-account', () => {
    const result = ScpMerge.resolve({
      baseline: [denyEks],
      accountTypeExtras: [denyAccountTypeSpecific],
      accountExtras: [denyAccountSpecific],
    });

    expect(result).toEqual([denyEks, denyAccountTypeSpecific, denyAccountSpecific]);
  });

  test('account-type extras default to empty when omitted', () => {
    const result = ScpMerge.resolve({
      baseline: [denyEks],
      accountExtras: [denyAccountSpecific],
    });

    expect(result).toEqual([denyEks, denyAccountSpecific]);
  });

  test('per-account extras only target the named account', () => {
    const baseline = [denyEks];

    const accountWithExtras = ScpMerge.resolve({
      baseline,
      accountExtras: [denyAccountSpecific],
    });
    const accountWithoutExtras = ScpMerge.resolve({
      baseline,
      accountExtras: [],
    });

    expect(accountWithExtras).toContain(denyAccountSpecific);
    expect(accountWithoutExtras).not.toContain(denyAccountSpecific);
  });

  test('does not mutate inputs (pure function)', () => {
    const baseline = [denyEks];
    const accountExtras = [denyAccountSpecific];
    const baselineSnapshot = [...baseline];
    const accountSnapshot = [...accountExtras];

    ScpMerge.resolve({ baseline, accountExtras });

    expect(baseline).toEqual(baselineSnapshot);
    expect(accountExtras).toEqual(accountSnapshot);
  });

  test('same inputs produce equal outputs (deterministic)', () => {
    const input = {
      baseline: [denyEks, denyEcs],
      accountExtras: [denyAccountSpecific],
    };

    expect(ScpMerge.resolve(input)).toEqual(ScpMerge.resolve(input));
  });
});

describe('ScpMerge.validate', () => {
  test('passes for a small SCP under both quotas', () => {
    expect(() => ScpMerge.validate('dev-account', [denyEks, denyEcs], 1)).not.toThrow();
  });

  test('throws when the merged statement list is empty', () => {
    expect(() => ScpMerge.validate('dev-account', [], 1))
      .toThrow(/dev-account.*empty SCP.*does not accept empty policies/);
  });

  test('throws when attachment count exceeds the per-target limit', () => {
    expect(() => ScpMerge.validate('prod-account', [denyEks], ScpLimits.MAX_PER_TARGET + 1))
      .toThrow(/prod-account.*SCPs attached.*maximum of 10/);
  });

  test('passes at exactly the per-target limit', () => {
    expect(() => ScpMerge.validate('prod-account', [denyEks], ScpLimits.MAX_PER_TARGET)).not.toThrow();
  });

  test('throws when the merged body exceeds 10240 bytes', () => {
    const giantSids = Array.from({ length: 200 }, (_, i) => new iam.PolicyStatement({
      sid: `Deny${i.toString().padStart(4, '0')}`,
      effect: iam.Effect.DENY,
      actions: ['s3:GetObject', 's3:PutObject', 's3:DeleteObject', 's3:ListBucket'],
      resources: [`arn:aws:s3:::bucket-${i}-with-a-fairly-long-name-to-eat-bytes/*`],
      conditions: {
        StringNotLike: {
          'aws:PrincipalArn': [`arn:aws:iam::*:role/AllowedRole-${i}`],
        },
      },
    }));

    expect(() => ScpMerge.validate('prod-bloated', giantSids, 1))
      .toThrow(/prod-bloated.*SCP body.*bytes.*maximum of 10240 bytes/);
  });
});

describe('ScpLimits.bodySize', () => {
  test('counts the whitespace AWS keeps when deployed via CloudFormation (more than minified)', () => {
    const minified = JSON.stringify(new iam.PolicyDocument({ statements: [denyEks, denyEcs] }).toJSON()).length;
    expect(ScpLimits.bodySize([denyEks, denyEcs])).toBeGreaterThan(minified);
  });

  test('does not count colons/commas inside string values (e.g. ARNs)', () => {
    const arnHeavy = new iam.PolicyStatement({
      sid: 'ArnHeavy',
      effect: iam.Effect.DENY,
      actions: ['s3:GetObject'],
      resources: ['arn:aws:s3:::a/*', 'arn:aws:s3:::b/*', 'arn:aws:s3:::c/*'],
    });
    const minified = JSON.stringify(new iam.PolicyDocument({ statements: [arnHeavy] }).toJSON());
    const structuralSeparators = ScpLimits.bodySize([arnHeavy]) - minified.length;
    // Only structural ':' / ',' add a space; the many ':' inside the ARNs must not be counted.
    const totalSeparators = (minified.match(/[:,]/g) ?? []).length;
    expect(structuralSeparators).toBeLessThan(totalSeparators);
  });
});

describe('tag-on-create SCP sizing (real preset)', () => {
  const ALL_ACTIONS = [
    ...TagScp.CORE_TAG_ON_CREATE_ACTIONS,
    ...TagScp.DATA_PLATFORM_TAG_ON_CREATE_ACTIONS,
    ...TagScp.INFRA_TAG_ON_CREATE_ACTIONS,
    ...TagScp.IAM_TAG_ON_CREATE_ACTIONS,
  ];

  test('all four action sets in one SCP exceed the limit and throw with split guidance', () => {
    const statements = TagScp.statements(ALL_ACTIONS, undefined, { exemptAwsServiceCalls: true });
    expect(ScpLimits.bodySize(statements)).toBeGreaterThan(ScpLimits.MAX_BODY_SIZE);
    expect(() => ScpMerge.validate('workloads-ou', statements, 1))
      .toThrow(/maximum of 10240 bytes.*[Ss]plit.*standalone SCPs/s);
  });

  test('splitting into two standalone SCPs keeps each under the limit', () => {
    const first = TagScp.statements(
      [...TagScp.CORE_TAG_ON_CREATE_ACTIONS, ...TagScp.INFRA_TAG_ON_CREATE_ACTIONS, ...TagScp.IAM_TAG_ON_CREATE_ACTIONS],
      undefined,
      { exemptAwsServiceCalls: true },
    );
    const second = TagScp.statements(TagScp.DATA_PLATFORM_TAG_ON_CREATE_ACTIONS, undefined, { exemptAwsServiceCalls: true });
    expect(ScpLimits.bodySize(first)).toBeLessThanOrEqual(ScpLimits.MAX_BODY_SIZE);
    expect(ScpLimits.bodySize(second)).toBeLessThanOrEqual(ScpLimits.MAX_BODY_SIZE);
    expect(() => ScpMerge.validate('workloads-ou', first, 2)).not.toThrow();
    expect(() => ScpMerge.validate('workloads-ou', second, 2)).not.toThrow();
  });
});
