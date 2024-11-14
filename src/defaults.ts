import * as cdk from 'aws-cdk-lib';
import { BudgetSubscribers, DlzControlTowerStandardControls, IamIdentityCenterPermissionSetProps } from './constructs/';
import { BudgetProps } from './constructs/budget';
import { DlzVpcProps } from './constructs/dlz-vpc/dlz-vpc';
import { DlzTag } from './constructs/organization-policies/tag-policy';

import { DataLandingZoneProps, Region } from './data-landing-zone-types';

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

  /**
   * Creates a VPC configuration with 2 route tables, one used as public and the other private, each with 3 subnets.
   * Each subnet has a /19 CIDR block. The VPC CIDR is `10.${thirdOctetMask}.0.0/16`
   * There will be remaining space:
   *   - 10.x.192.0/19
   *   - 10.x.224.0/19
   * @param thirdOctetMask the third octet of the VPC CIDR
   * @param region the region where the VPC will be created
   * @returns a VPC configuration
   */
  public static vpcClassB3Private3Public(thirdOctetMask: number, region: Region): DlzVpcProps {
    return {
      name: 'default',
      region: region,
      cidr: '10.' + thirdOctetMask + '.0.0/16',
      routeTables: [
        {
          name: 'private',
          subnets: [
            {
              name: 'private-1',
              cidr: '10.' + thirdOctetMask + '.0.0/19',
              az: region + 'a',
            },
            {
              name: 'private-2',
              cidr: '10.' + thirdOctetMask + '.32.0/19',
              az: region + 'b',
            },
            {
              name: 'private-3',
              cidr: '10.' + thirdOctetMask + '.64.0/19',
              az: region + 'c',
            },
          ],
        },
        {
          name: 'public',
          subnets: [
            {
              name: 'public-1',
              cidr: '10.' + thirdOctetMask + '.96.0/19',
              az: region + 'a',
            },
            {
              name: 'public-2',
              cidr: '10.' + thirdOctetMask + '.128.0/19',
              az: region + 'b',
            },
            {
              name: 'public-3',
              cidr: '10.' + thirdOctetMask + '.160.0/19',
              az: region + 'c',
            },
          ],
        },
      ],
    };
  }

  /**
   * Provides the AWS managed policy `AdministratorAccess` and `ReadOnlyAccess` as permission sets
   */
  public static iamIdentityCenterPermissionSets(): IamIdentityCenterPermissionSetProps[] {
    return [
      {
        name: 'AdministratorAccess',
        description: 'Provides the AWS managed policy AdministratorAccess as permission set',
        managedPolicyArns: [
          'arn:aws:iam::aws:policy/AdministratorAccess',
        ],
        sessionDuration: cdk.Duration.hours(12),
      },
      {
        name: 'ReadOnlyAccess',
        description: 'Provides the AWS  managed policy ReadOnlyAccess as permission set',
        managedPolicyArns: [
          'arn:aws:iam::aws:policy/ReadOnlyAccess',
        ],
        sessionDuration: cdk.Duration.hours(12),
      },
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

