import * as iam from 'aws-cdk-lib/aws-iam';
import { ControlTowerExemption } from './control-tower-exemption';

/** Denies disabling/removing S3 Block Public Access at the account or bucket level. */
export class ScpDenyS3PublicAccessBypass {
  public static statement(): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'DenyS3PublicAccessBypass',
      effect: iam.Effect.DENY,
      actions: [
        's3:PutAccountPublicAccessBlock',
        's3:DeleteAccountPublicAccessBlock',
        's3:PutBucketPublicAccessBlock',
        's3:DeleteBucketPublicAccessBlock',
      ],
      resources: ['*'],
      conditions: ControlTowerExemption.arnNotLike(),
    });
  }
}
