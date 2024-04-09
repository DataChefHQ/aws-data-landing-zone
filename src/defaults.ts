import { DlzControlTowerStandardControls } from './constructs/';
import { DlzTag } from './constructs/organization-policies/tag-policy';
import { DataLandingZoneProps } from './data-landing-zone';

export class Defaults {
  /** *
   * List of services that are denied in the organization
   */
  public static denyServiceList() {
    return [
      'eks:*',
      'ec2:*',
    ];
  }

  /** *
   * Mandatory tags for the organization
   */
  public static mandatoryTags(props: DataLandingZoneProps): DlzTag[] {
    return [{
      name: 'Owner',
      values: [
        'infra',
        ...props.mandatoryTags.owner
      ]
    }, {
      name: 'Project',
      values: [
        'dlz',
        ...props.mandatoryTags.project
      ]
    }, {
      name: 'Environment',
      values: [
        'dlz',
        ...props.mandatoryTags.environment
      ]
    }];
  }

  /**
   * Control Tower Controls applied to all the OUs in the organization
   */
  public static rootControls(): DlzControlTowerStandardControls[] {
    return [
      DlzControlTowerStandardControls.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS,
      DlzControlTowerStandardControls.AWS_GR_ENCRYPTED_VOLUMES,
      DlzControlTowerStandardControls.AWS_GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK,
      DlzControlTowerStandardControls.AWS_GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED,
      DlzControlTowerStandardControls.AWS_GR_RDS_STORAGE_ENCRYPTED,
      DlzControlTowerStandardControls.AWS_GR_RESTRICTED_SSH,
      DlzControlTowerStandardControls.AWS_GR_RESTRICT_ROOT_USER,
      DlzControlTowerStandardControls.AWS_GR_RESTRICT_ROOT_USER_ACCESS_KEYS,
      DlzControlTowerStandardControls.AWS_GR_ROOT_ACCOUNT_MFA_ENABLED,
      DlzControlTowerStandardControls.AWS_GR_S3_BUCKET_PUBLIC_READ_PROHIBITED,
      DlzControlTowerStandardControls.AWS_GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED,
    ];
  }
}

/**
 * @internal
 */
export class PropsOrDefaults {
  public static getDenyServiceList(props: DataLandingZoneProps) {
    return props.denyServiceList || Defaults.denyServiceList();
  }

  public static getOrganizationTags(props: DataLandingZoneProps) {
    return [
      ...Defaults.mandatoryTags(props),
      ...(props.additionalMandatoryTags ? props.additionalMandatoryTags : []),
    ];
  }

  public static getRootControls(props: DataLandingZoneProps) {
    return props.organization.root.controls || Defaults.rootControls();
  }
}

