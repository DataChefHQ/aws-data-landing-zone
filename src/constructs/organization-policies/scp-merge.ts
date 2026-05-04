import * as iam from 'aws-cdk-lib/aws-iam';

/** AWS Organizations service quotas for SCPs. */
export class ScpLimits {
  public static readonly MAX_BODY_SIZE = 5120;
  public static readonly MAX_PER_TARGET = 5;
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

    const body = JSON.stringify(new iam.PolicyDocument({ statements }).toJSON());
    if (body.length > ScpLimits.MAX_BODY_SIZE) {
      throw new Error(
        `Account "${accountName}" has an SCP body of ${body.length} bytes; ` +
        `AWS allows a maximum of ${ScpLimits.MAX_BODY_SIZE} bytes per SCP. ` +
        'Reduce the number or size of SCP statements.',
      );
    }
  }
}
