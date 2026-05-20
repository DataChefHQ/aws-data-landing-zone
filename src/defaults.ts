import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { BudgetSubscribers, DlzControlTowerStandardControls, IamIdentityCenterPermissionSetProps } from './constructs/';
import { DlzBudgetProps } from './constructs/dlz-budget';
import {
  DLZ_CARBON_EMISSIONS_DEFAULT_QUERY_COLUMNS,
  DLZ_COR_DEFAULT_QUERY_COLUMNS,
  DLZ_CUR_DEFAULT_QUERY_COLUMNS_STANDARD,
  DLZ_FOCUS_1_2_DEFAULT_QUERY_COLUMNS,
} from './constructs/dlz-data-exports/data-exports-types';
import { DlzGuardDutyFeaturesProps } from './constructs/dlz-guardduty/guardduty-types';
import { DlzMacieProps } from './constructs/dlz-macie/macie-types';
import { DlzVpcProps } from './constructs/dlz-vpc/dlz-vpc';
import { ScpDenyCfnStacksWithoutStandardTags } from './constructs/organization-policies';
import { DlzTag } from './constructs/organization-policies/tag-policy';

import { DataLandingZoneProps, ForceNoPythonArgumentLifting, Region } from './data-landing-zone-types';

export enum IamIdentityAccounts {
  ROOT = 'dlz:root',
  SECURITY_LOG = 'dlz:security:log',
  SECURITY_AUDIT = 'dlz:security:audit',
}

export enum IamIdentityPermissionSets {
  ADMIN = 'dlz:adminaccess',
  READ_ONLY = 'dlz:readonlyaccess',
  CATALOG = 'dlz:catalogaccess',
}

export class Defaults {
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
      values: props.mandatoryTags.owner && props.mandatoryTags.owner.length > 0 ? [
        'infra',
        ...props.mandatoryTags.owner,
      ]: undefined,
    }, {
      name: 'Project',
      values: props.mandatoryTags.project && props.mandatoryTags.project.length > 0 ? [
        'dlz',
        ...props.mandatoryTags.project,
      ]: undefined,
    }, {
      name: 'Environment',
      values: props.mandatoryTags.environment && props.mandatoryTags.environment.length > 0 ? [
        'dlz',
        ...props.mandatoryTags.environment,
      ] : undefined,
    }, {
      name: 'CostCenter',
      values: props.mandatoryTags.costCenter && props.mandatoryTags.costCenter.length > 0 ? [
        'dlz',
        ...props.mandatoryTags.costCenter,
      ] : undefined,
    }, {
      name: 'Domain',
      values: props.mandatoryTags.domain && props.mandatoryTags.domain.length > 0 ? [
        'foundation',
        ...props.mandatoryTags.domain,
      ] : undefined,
    }];
  }

  /**
   * Default GuardDuty features. All additional protection features are disabled.
   * Basic GuardDuty monitoring (CloudTrail management events, VPC Flow Logs, DNS query logs)
   * is always active when the detector is enabled.
   *
   * Enable additional features at the org level via `DlzGuardDutyProps.features`
   * or per-account via `DLzAccount.guardDutyFeatures`.
   */
  public static guardDutyFeatures(): DlzGuardDutyFeaturesProps {
    return {
      s3DataEvents: false,
      ebsMalwareProtection: false,
      rdsLoginEvents: false,
      eksAuditLogs: false,
      lambdaNetworkLogs: false,
      runtimeMonitoring: false,
    };
  }

  /**
   * Default Macie configuration. Auto-enable for new members is disabled.
   */
  public static macieConfig(): DlzMacieProps {
    return {
      enabled: true,
      autoEnable: false,
    };
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
   * @param _ Ignore this parameter, it is used to force a consistent interface across TS and Python usage
   */
  /**
   * Default query-column projection for `STANDARD_CUR_2_0` exports.
   * jsii-friendly accessor for the underlying `DLZ_CUR_DEFAULT_QUERY_COLUMNS_STANDARD` constant.
   */
  public static standardCurQueryColumns(): string[] {
    return [...DLZ_CUR_DEFAULT_QUERY_COLUMNS_STANDARD];
  }

  /**
   * Default query-column projection for `FOCUS_1_2` exports.
   * jsii-friendly accessor for the underlying `DLZ_FOCUS_1_2_DEFAULT_QUERY_COLUMNS` constant.
   */
  public static focus12QueryColumns(): string[] {
    return [...DLZ_FOCUS_1_2_DEFAULT_QUERY_COLUMNS];
  }

  /**
   * Default query-column projection for `COST_OPTIMIZATION_RECOMMENDATIONS` exports.
   * jsii-friendly accessor for the underlying `DLZ_COR_DEFAULT_QUERY_COLUMNS` constant.
   */
  public static corQueryColumns(): string[] {
    return [...DLZ_COR_DEFAULT_QUERY_COLUMNS];
  }

  /**
   * Default query-column projection for `CARBON_EMISSIONS` exports.
   * jsii-friendly accessor for the underlying `DLZ_CARBON_EMISSIONS_DEFAULT_QUERY_COLUMNS` constant.
   */
  public static carbonEmissionsQueryColumns(): string[] {
    return [...DLZ_CARBON_EMISSIONS_DEFAULT_QUERY_COLUMNS];
  }

  public static budgets(orgTotal: number, infraDlz: number, subscribers: BudgetSubscribers,
    _: ForceNoPythonArgumentLifting = {}): DlzBudgetProps[] {
    const defaultTopicName = 'dlz-budget-topic';
    return [
      {
        name: 'org-total',
        amount: orgTotal,
        subscribers: {
          snsTopicName: subscribers.snsTopicName || defaultTopicName,
          emails: subscribers.emails,
          slacks: subscribers.slacks,
        },
      },
      {
        name: 'infra-dlz',
        amount: infraDlz,
        forTags: {
          Owner: 'infra',
          Project: 'dlz',
        },
        subscribers: {
          snsTopicName: subscribers.snsTopicName || defaultTopicName,
          emails: subscribers.emails,
          slacks: subscribers.slacks,
        },
      },
    ];
  }
}

/**
 * @internal
 */
export class PropsOrDefaults {
  /**
   * Resolves the org SCP baseline applied to every workload account.
   * Owns conflict detection, deny-list resolution, and the always-appended mandatory-tags SCP.
   */
  public static getScpBaseline(props: DataLandingZoneProps): iam.PolicyStatement[] {
    const tags = PropsOrDefaults.getOrganizationTags(props);
    const tagsStatement = ScpDenyCfnStacksWithoutStandardTags.statement(tags);
    return [...(props.scpBaselineStatements ?? []), tagsStatement];
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

  public static getGuardDutyFeatures(props: DataLandingZoneProps): DlzGuardDutyFeaturesProps {
    return props.guardDuty?.features ?? Defaults.guardDutyFeatures();
  }

  public static getMacieConfig(props: DataLandingZoneProps): DlzMacieProps {
    return props.macie ?? Defaults.macieConfig();
  }
}

