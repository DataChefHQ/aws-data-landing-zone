const SIMPLE_TAG_KEY = /^[A-Za-z][A-Za-z0-9]*$/;

/**
 * CFN-Guard policy for an AWS Config Custom Policy rule that marks a resource NON_COMPLIANT when
 * it is missing any of `tagKeys`, or when the tag is present with an empty value.
 *
 * The policy names no resource type, so the rule evaluates every type the configuration recorder
 * records — including types AWS adds in future. Tags are read from the configuration item's
 * top-level `tags` map, the only location that is uniform across resource types.
 *
 * The two-rule shape mirrors AWS's `all_resources_tagCheck_withparam.guard` sample: the first rule
 * fails resources with no tags at all, which keeps the per-key clauses from querying a path that
 * does not exist.
 */
export function mandatoryTagsPolicy(tagKeys: string[]): string {
  const unsupported = tagKeys.filter((key) => !SIMPLE_TAG_KEY.test(key));
  if (unsupported.length > 0) {
    throw new Error(
      'Mandatory tag keys must be alphanumeric and start with a letter to be usable in a ' +
      `CFN-Guard query path. Unsupported: ${unsupported.join(', ')}`,
    );
  }

  const perKeyClauses = tagKeys
    .map((key) => `    tags.${key} !empty <<Missing mandatory tag: ${key}>>`)
    .join('\n');

  return [
    'rule resource_has_tags {',
    '    tags !empty <<Resource carries no tags>>',
    '}',
    '',
    'rule resource_has_mandatory_tags when resource_has_tags {',
    perKeyClauses,
    '}',
    '',
  ].join('\n');
}
