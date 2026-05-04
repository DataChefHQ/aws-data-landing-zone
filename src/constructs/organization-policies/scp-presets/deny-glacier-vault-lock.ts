import * as iam from 'aws-cdk-lib/aws-iam';
import { ControlTowerExemption } from './control-tower-exemption';

/** Denies S3 Glacier Vault Lock initiation/completion. */
export class ScpDenyGlacierVaultLock {
  public static statement(): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'DenyGlacierVaultLock',
      effect: iam.Effect.DENY,
      actions: [
        'glacier:InitiateVaultLock',
        'glacier:CompleteVaultLock',
      ],
      resources: ['*'],
      conditions: ControlTowerExemption.arnNotLike(),
    });
  }
}
