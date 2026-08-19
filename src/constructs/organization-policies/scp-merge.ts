import * as iam from 'aws-cdk-lib/aws-iam';

/**
 * AWS Organizations service quotas for SCPs (raised by AWS — see the reference below):
 * - max policy document size = 10,240 characters (was 5,120)
 * - max SCPs directly attached to a single root / OU / account = 10 (was 5)
 *
 * Note: SCPs inherited from a parent OU or the root do NOT count toward a target's
 * per-node limit — only directly-attached policies do. So attaching one SCP to an OU
 * covers every account under it at zero per-account slot cost.
 * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_reference_limits.html
 */
export class ScpLimits {
  public static readonly MAX_BODY_SIZE = 10240;
  public static readonly MAX_PER_TARGET = 10;

  /**
   * The document size AWS actually counts for an SCP. Organizations counts the policy as
   * serialized by the SDK/CloudFormation, which keeps a space after every structural `:` and `,`
   * (only the console strips whitespace). Separators inside string values (e.g. ARNs) are not
   * structural, so they are skipped. Measuring the minified length instead under-counts and lets an
   * over-limit policy pass synth only to fail at deploy with "exceeded the maximum policy size".
   */
  public static bodySize(statements: iam.PolicyStatement[]): number {
    const minified = JSON.stringify(new iam.PolicyDocument({ statements }).toJSON());
    let separators = 0;
    let inString = false;
    let escaped = false;
    for (const char of minified) {
      if (escaped) { escaped = false; continue; }
      if (char === '\\') { escaped = true; continue; }
      if (char === '"') { inString = !inString; continue; }
      if (!inString && (char === ':' || char === ',')) { separators++; }
    }
    return minified.length + separators;
  }
}

export interface ResolveScpInput {
  readonly baseline: iam.PolicyStatement[];
  /** @default - no per-account-type statements */
  readonly accountTypeExtras?: iam.PolicyStatement[];
  readonly accountExtras: iam.PolicyStatement[];
}

/** Merges SCP statements: baseline -> account-type -> per-account (additive only). */
export class ScpMerge {
  public static resolve(input: ResolveScpInput): iam.PolicyStatement[] {
    return [
      ...input.baseline,
      ...(input.accountTypeExtras ?? []),
      ...input.accountExtras,
    ];
  }

  public static validate(
    accountName: string,
    statements: iam.PolicyStatement[],
    attachmentCount: number,
  ): void {
    if (statements.length === 0) {
      throw new Error(
        `Account "${accountName}" resolved to an empty SCP; ` +
        'AWS Organizations does not accept empty policies.',
      );
    }

    if (attachmentCount > ScpLimits.MAX_PER_TARGET) {
      throw new Error(
        `Account "${accountName}" has ${attachmentCount} SCPs attached; ` +
        `AWS allows a maximum of ${ScpLimits.MAX_PER_TARGET} SCPs per target.`,
      );
    }

    const bodySize = ScpLimits.bodySize(statements);
    if (bodySize > ScpLimits.MAX_BODY_SIZE) {
      throw new Error(
        `Account "${accountName}" has an SCP body of ${bodySize} bytes; ` +
        `AWS allows a maximum of ${ScpLimits.MAX_BODY_SIZE} bytes per SCP ` +
        '(whitespace is counted when the policy is deployed via CloudFormation). ' +
        'Split the statements across two or more standalone SCPs (DlzStandaloneScp) — ' +
        'e.g. one for compute/infra/IAM actions and one for data-platform actions.',
      );
    }
  }
}
