import * as iam from 'aws-cdk-lib/aws-iam';
import { ControlTowerExemption } from './control-tower-exemption';

/** Denies disabling/deleting CloudTrail, Config, GuardDuty, Security Hub, or Macie. */
export class ScpDenyDisablingSecurityServices {
  public static statement(): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'DenyDisablingSecurityServices',
      effect: iam.Effect.DENY,
      actions: [
        'cloudtrail:StopLogging',
        'cloudtrail:DeleteTrail',
        'cloudtrail:UpdateTrail',
        'cloudtrail:PutEventSelectors',
        'config:DeleteConfigurationRecorder',
        'config:DeleteDeliveryChannel',
        'config:StopConfigurationRecorder',
        'config:DeleteConfigRule',
        'config:DeleteOrganizationConfigRule',
        'config:DeleteRetentionConfiguration',
        'guardduty:DeleteDetector',
        'guardduty:DeleteMembers',
        'guardduty:DisassociateFromMasterAccount',
        'guardduty:DisassociateMembers',
        'guardduty:StopMonitoringMembers',
        'guardduty:UpdateDetector',
        'securityhub:DisableSecurityHub',
        'securityhub:DisassociateFromMasterAccount',
        'securityhub:DeleteMembers',
        'securityhub:DisassociateMembers',
        'macie2:DisableMacie',
        'macie2:DisassociateFromMasterAccount',
        'macie2:DeleteMember',
        'macie2:DisassociateMember',
      ],
      resources: ['*'],
      conditions: ControlTowerExemption.arnNotLike(),
    });
  }
}
