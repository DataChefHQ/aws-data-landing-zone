export interface NearMiss {
  readonly present: string;
  readonly required: string;
}

const normalize = (key: string) => key.toLowerCase().replace(/[-_\s]/g, '');

export function missingTagKeys(requiredKeys: string[], presentKeys: string[]): string[] {
  return requiredKeys.filter(required => !presentKeys.includes(required));
}

/**
 * Tag keys the resource carries that look like a required key but are not one. AWS tag keys are
 * case sensitive, so `owner` and `Owner` are different keys — someone who tagged a resource in the
 * wrong case is told they are missing a tag they believe they set. Naming the near miss turns that
 * into a one-second fix.
 */
export function nearMisses(missingKeys: string[], presentKeys: string[]): NearMiss[] {
  return missingKeys.flatMap((required) => {
    const present = presentKeys.find(key => normalize(key) === normalize(required));
    return present ? [{ present, required }] : [];
  });
}
