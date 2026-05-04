import * as iam from 'aws-cdk-lib/aws-iam';
import { ControlTowerExemption } from './control-tower-exemption';

/** Denies S3 Object Lock, retention, legal-hold, and governance-bypass actions. */
export class ScpDenyS3ObjectLockAndRetention {
  public static statement(): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'DenyS3ObjectLockAndRetention',
      effect: iam.Effect.DENY,
      actions: [
        's3:PutObjectRetention',
        's3:PutObjectLegalHold',
        's3:BypassGovernanceRetention',
        's3:PutBucketObjectLockConfiguration',
        's3-object-lambda:PutObjectLegalHold',
        's3-object-lambda:PutObjectRetention',
      ],
      resources: ['*'],
      conditions: ControlTowerExemption.arnNotLike(),
    });
  }
}
