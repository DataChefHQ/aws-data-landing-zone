import * as iam from 'aws-cdk-lib/aws-iam';
import { ControlTowerExemption } from './control-tower-exemption';

/** Denies Route 53 domain registrations, renewals, and transfers. */
export class ScpDenyDomainRegistrations {
  public static statement(): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'DenyDomainRegistrations',
      effect: iam.Effect.DENY,
      actions: [
        'route53domains:RegisterDomain',
        'route53domains:RenewDomain',
        'route53domains:TransferDomain',
      ],
      resources: ['*'],
      conditions: ControlTowerExemption.arnNotLike(),
    });
  }
}
