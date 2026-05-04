import * as iam from 'aws-cdk-lib/aws-iam';
import { ControlTowerExemption } from './control-tower-exemption';

/** Denies AWS Marketplace subscriptions and agreement approvals. */
export class ScpDenyMarketplaceSubscriptions {
  public static statement(): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'DenyMarketplaceSubscriptions',
      effect: iam.Effect.DENY,
      actions: [
        'aws-marketplace:AcceptAgreementApprovalRequest',
        'aws-marketplace:Subscribe',
      ],
      resources: ['*'],
      conditions: ControlTowerExemption.arnNotLike(),
    });
  }
}
