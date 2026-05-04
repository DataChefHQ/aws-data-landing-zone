import * as iam from 'aws-cdk-lib/aws-iam';
import { ScpLimits, ScpMerge } from '../src/constructs/organization-policies/scp-merge';

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
      .toThrow(/prod-account.*SCPs attached.*maximum of 5/);
  });

  test('passes at exactly the per-target limit', () => {
    expect(() => ScpMerge.validate('prod-account', [denyEks], ScpLimits.MAX_PER_TARGET)).not.toThrow();
  });

  test('throws when the merged body exceeds 5120 bytes', () => {
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
      .toThrow(/prod-bloated.*SCP body.*bytes.*maximum of 5120 bytes/);
  });
});
