import * as iam from 'aws-cdk-lib/aws-iam';
import { ControlTowerExemption } from './control-tower-exemption';

/** Denies Outposts, Snowball, Shield Advanced, and ACM Private CA provisioning. */
export class ScpDenyDedicatedInfraAndSubscriptions {
  public static statement(): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'DenyDedicatedInfraAndSubscriptions',
      effect: iam.Effect.DENY,
      actions: [
        'outposts:CreateOutpost',
        'snowball:CreateCluster',
        'shield:CreateSubscription',
        'acm-pca:CreateCertificateAuthority',
      ],
      resources: ['*'],
      conditions: ControlTowerExemption.arnNotLike(),
    });
  }
}
