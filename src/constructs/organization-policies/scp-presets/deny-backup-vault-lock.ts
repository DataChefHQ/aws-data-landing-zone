import * as iam from 'aws-cdk-lib/aws-iam';
import { ControlTowerExemption } from './control-tower-exemption';

/** Denies enabling AWS Backup Vault Lock. */
export class ScpDenyBackupVaultLock {
  public static statement(): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'DenyBackupVaultLock',
      effect: iam.Effect.DENY,
      actions: [
        'backup:PutBackupVaultLockConfiguration',
      ],
      resources: ['*'],
      conditions: ControlTowerExemption.arnNotLike(),
    });
  }
}
