import * as iam from 'aws-cdk-lib/aws-iam';
import { ControlTowerExemption } from './control-tower-exemption';

/** Denies a member account from leaving the AWS Organization. */
export class ScpDenyLeavingOrganization {
  public static statement(): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'DenyLeavingOrganization',
      effect: iam.Effect.DENY,
      actions: [
        'organizations:LeaveOrganization',
      ],
      resources: ['*'],
      conditions: ControlTowerExemption.arnNotLike(),
    });
  }
}
