import { BudgetSubscribers, DlzControlTowerStandardControls } from './constructs/';
import { BudgetProps } from './constructs/budget';
import { DlzTag } from './constructs/organization-policies/tag-policy';
import { DataLandingZoneProps, IamIdentityCenterPermissionSetProps } from './data-landing-zone';

export enum IamIdentityAccounts {
  ROOT = 'dlz:root',
  SECURITY_LOG = 'dlz:security:log',
  SECURITY_AUDIT = 'dlz:security:audit'
}

export enum IamIdentityPermissionSets {
  ADMIN = 'dlz:adminaccess',
  READ_ONLY = 'dlz:readonlyaccess',
  CATALOG = 'dlz:catalogaccess',
}

export class Defaults {
  /** *
   * List of services that are denied in the organization
   */
  public static denyServiceList() {
    return [
      'eks:*',
    ];
  }

  public static catalogPermissionSet(): IamIdentityCenterPermissionSetProps {
    return {
      name: 'DLZ-CatalogAccess',
      description: 'Use this permission set/role to grant Service Catalog access',
      managedPolicyArns: [
        'arn:aws:iam::aws:policy/AWSServiceCatalogAdminFullAccess',
        'arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess',
      ],
    };
  }

  public static adminPermissionSet(): IamIdentityCenterPermissionSetProps {
    return {
      name: 'DLZ-AdminAccess',
      description: 'Use this permission set/role to grant full access',
      managedPolicyArns: [
        'arn:aws:iam::aws:policy/AdministratorAccess',
      ],
    };
  }


  public static readOnlyPermissionSet(): IamIdentityCenterPermissionSetProps {
    return {
      name: 'DLZ-ReadOnlyAccess',
      description: 'Use this permission set/role to grant read only access',
      managedPolicyArns: [
        'arn:aws:iam::aws:policy/ReadOnlyAccess',
      ],
    };
  }

  /** *
   * Mandatory tags for the organization
   */
  public static mandatoryTags(props: DataLandingZoneProps): DlzTag[] {
    return [{
      name: 'Owner',
      values: [
        'infra',
        ...props.mandatoryTags.owner,
      ],
    }, {
      name: 'Project',
      values: [
        'dlz',
        ...props.mandatoryTags.project,
      ],
    }, {
      name: 'Environment',
      values: [
        'dlz',
        ...props.mandatoryTags.environment,
      ],
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

  /**
   * Budgets for the organization
   * @param orgTotal Total budget for the organization in USD
   * @param infraDlz Budget for this DLZ project identified by tags Owner=infra, Project=dlz in USD
   * @param subscribers Subscribers for the budget
   */
  public static budgets(orgTotal: number, infraDlz: number, subscribers: BudgetSubscribers): BudgetProps[] {
    return [
      {
        name: 'org-total',
        amount: orgTotal,
        subscribers,
      },
      {
        name: 'infra-dlz',
        amount: infraDlz,
        forTags: {
          Owner: 'infra',
          Project: 'dlz',
        },
        subscribers,
      },
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

