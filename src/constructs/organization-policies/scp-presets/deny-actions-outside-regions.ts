import * as iam from 'aws-cdk-lib/aws-iam';
import { ControlTowerExemption } from './control-tower-exemption';

/** Denies regional API calls outside `allowedRegions`, with global-services exempted. */
export class ScpDenyActionsOutsideRegions {
  public static statement(allowedRegions: string[]): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'DenyActionsOutsideAllowedRegions',
      effect: iam.Effect.DENY,
      notActions: [
        'a4b:*',
        'access-analyzer:*',
        'account:*',
        'acm:*',
        'artifact:*',
        'aws-marketplace-management:*',
        'aws-marketplace:*',
        'aws-portal:*',
        'billing:*',
        'budgets:*',
        'ce:*',
        'chime:*',
        'cloudfront:*',
        'config:*',
        'cur:*',
        'directconnect:*',
        'ec2:DescribeRegions',
        'ec2:DescribeAvailabilityZones',
        'fms:*',
        'globalaccelerator:*',
        'health:*',
        'iam:*',
        'importexport:*',
        'kms:*',
        'mobileanalytics:*',
        'networkmanager:*',
        'organizations:*',
        'pricing:*',
        'route53:*',
        'route53domains:*',
        's3:GetAccountPublic*',
        's3:ListAllMyBuckets',
        's3:PutAccountPublic*',
        'shield:*',
        'sso:*',
        'sts:*',
        'support:*',
        'trustedadvisor:*',
        'waf-regional:*',
        'waf:*',
      ],
      resources: ['*'],
      conditions: {
        ...ControlTowerExemption.arnNotLike(),
        StringNotEquals: {
          'aws:RequestedRegion': allowedRegions,
        },
      },
    });
  }
}
