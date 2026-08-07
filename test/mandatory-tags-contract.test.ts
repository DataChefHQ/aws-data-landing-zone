import { ScpDenyResourceCreationWithoutStandardTags } from '../src/constructs/organization-policies/scp-presets';
import { DataLandingZoneProps, MandatoryTags } from '../src/data-landing-zone-types';
import { Defaults } from '../src/defaults';

const tagsBy = (...keys: (keyof MandatoryTags)[]): MandatoryTags => {
  // Build a tags object containing only the supplied keys, leaving the rest as
  // `undefined` (which is what older callers would emit before costCenter/name
  // existed on the type).
  const partial: Record<string, string[] | undefined> = {};
  for (const k of keys) partial[k] = [`some-${k}`];
  return {
    owner: partial.owner,
    project: partial.project,
    environment: partial.environment,
    costCenter: partial.costCenter,
    name: partial.name,
  } as MandatoryTags;
};

const propsWith = (mandatoryTags: MandatoryTags): DataLandingZoneProps =>
  ({ mandatoryTags } as DataLandingZoneProps);

describe('MandatoryTags backwards-compatibility contract', () => {
  test('always emits the five canonical tag names in stable order', () => {
    const result = Defaults.mandatoryTags(propsWith(tagsBy('owner', 'project', 'environment')));
    expect(result.map(t => t.name)).toEqual(['Owner', 'Project', 'Environment', 'CostCenter', 'Name']);
  });

  test('Domain is no longer one of the baseline tags', () => {
    const result = Defaults.mandatoryTags(propsWith(tagsBy('owner')));
    expect(result.map(t => t.name)).not.toContain('Domain');
  });

  test('the baseline tag names match the tag-on-create SCP preset', () => {
    const result = Defaults.mandatoryTags(propsWith(tagsBy('owner')));
    expect(result.map(t => t.name))
      .toEqual(ScpDenyResourceCreationWithoutStandardTags.DEFAULT_TAG_KEYS);
  });

  test('legacy 3-key callers (owner/project/environment only) synthesize without errors', () => {
    // Older tests / callers passing a 3-field MandatoryTags shape still resolve cleanly.
    const result = Defaults.mandatoryTags(propsWith(tagsBy('owner', 'project', 'environment')));
    expect(result).toHaveLength(5);
    // The legacy fields keep their values…
    expect(result.find(t => t.name === 'Owner')?.values).toEqual(expect.arrayContaining(['infra', 'some-owner']));
    expect(result.find(t => t.name === 'Project')?.values).toEqual(expect.arrayContaining(['dlz', 'some-project']));
    // …and the new fields enforce presence without constraining values.
    expect(result.find(t => t.name === 'CostCenter')?.values).toBeUndefined();
    expect(result.find(t => t.name === 'Name')?.values).toBeUndefined();
  });

  test('all-undefined input still produces five presence-only entries', () => {
    const allUndefined: MandatoryTags = {
      owner: undefined,
      project: undefined,
      environment: undefined,
      costCenter: undefined,
      name: undefined,
    };
    const result = Defaults.mandatoryTags(propsWith(allUndefined));
    expect(result).toHaveLength(5);
    for (const tag of result) expect(tag.values).toBeUndefined();
  });

  test('empty arrays behave the same as undefined (presence-only)', () => {
    const result = Defaults.mandatoryTags(propsWith({
      owner: [],
      project: [],
      environment: [],
      costCenter: [],
      name: [],
    }));
    for (const tag of result) expect(tag.values).toBeUndefined();
  });

  test('defaults prepend the DLZ-owned values when user values are supplied', () => {
    const result = Defaults.mandatoryTags(propsWith({
      owner: ['team-a'],
      project: ['workload-a'],
      environment: ['prod'],
      costCenter: ['eng-platform'],
      name: ['my-resource'],
    }));
    expect(result.find(t => t.name === 'Owner')?.values).toEqual(['infra', 'team-a']);
    expect(result.find(t => t.name === 'Project')?.values).toEqual(['dlz', 'workload-a']);
    expect(result.find(t => t.name === 'Environment')?.values).toEqual(['dlz', 'prod']);
    expect(result.find(t => t.name === 'CostCenter')?.values).toEqual(['dlz', 'eng-platform']);
    expect(result.find(t => t.name === 'Name')?.values).toEqual(['dlz', 'my-resource']);
  });
});
