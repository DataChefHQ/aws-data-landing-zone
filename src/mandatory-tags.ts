/**
 * The mandatory tag keys, in the order every policy emits them.
 *
 * Single source of truth: the tag policy, both tag SCPs and the AWS Config rule must enforce an
 * identical set, so nothing may repeat this list. Deliberately imports nothing, so any module can
 * read it without an import cycle.
 */
export const DLZ_MANDATORY_TAG_KEYS: string[] = [
  'Owner',
  'Project',
  'Environment',
  'CostCenter',
  'Name',
];
