import * as iam from 'aws-cdk-lib/aws-iam';
import { ControlTowerExemption } from './control-tower-exemption';

/** Denies Savings Plan creation. */
export class ScpDenySavingsPlanPurchases {
  public static statement(): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'DenySavingsPlanPurchases',
      effect: iam.Effect.DENY,
      actions: [
        'savingsplans:CreateSavingsPlan',
      ],
      resources: ['*'],
      conditions: ControlTowerExemption.arnNotLike(),
    });
  }
}
