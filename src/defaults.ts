import { BudgetSubscribers, DlzControlTowerStandardControls } from './constructs/';
import { BudgetProps } from './constructs/budget';
import { ConfigRule } from './constructs/config/rules';
import { DlzTag } from './constructs/organization-policies/tag-policy';
import { DataLandingZoneProps } from './data-landing-zone';

export type DisabledConfigRule = {
  rule: ConfigRule;
  reason: string;
}

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
   * ConfigRules that come with the OperationalBestPracticesForCISAWS_v1_4_Level1 conformance pack
   * https://github.com/awslabs/aws-config-rules/blob/master/aws-config-conformance-packs/Operational-Best-Practices-for-CIS-AWS-v1.4-Level1.yaml
   * https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_aws_benchmark_level_1.html
   */
  public static configConformancePackOperationalBestPracticesForCISAWS_v1_4_Level1(disabledRules: DisabledConfigRule[] = []): ConfigRule[] {
    /** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     * Do not modify this function it is generated from an external source and any changes will be lost upon regeneration.
     *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
    return [
      ConfigRule.ACCESS_KEYS_ROTATED,
      ConfigRule.CLOUD_TRAIL_CLOUD_WATCH_LOGS_ENABLED,
      ConfigRule.EC2_EBS_ENCRYPTION_BY_DEFAULT,
      ConfigRule.ENCRYPTED_VOLUMES,
      ConfigRule.IAM_NO_INLINE_POLICY_CHECK,
      ConfigRule.IAM_PASSWORD_POLICY,
      ConfigRule.IAM_POLICY_IN_USE,
      ConfigRule.IAM_POLICY_NO_STATEMENTS_WITH_ADMIN_ACCESS,
      ConfigRule.IAM_ROOT_ACCESS_KEY_CHECK,
      ConfigRule.IAM_USER_GROUP_MEMBERSHIP_CHECK,
      ConfigRule.IAM_USER_NO_POLICIES_CHECK,
      ConfigRule.IAM_USER_UNUSED_CREDENTIALS_CHECK,
      ConfigRule.INCOMING_SSH_DISABLED,
      ConfigRule.MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS,
      ConfigRule.MULTI_REGION_CLOUD_TRAIL_ENABLED,
      ConfigRule.RDS_SNAPSHOT_ENCRYPTED,
      ConfigRule.RDS_STORAGE_ENCRYPTED,
      ConfigRule.RESTRICTED_INCOMING_TRAFFIC,
      ConfigRule.ROOT_ACCOUNT_MFA_ENABLED,
      ConfigRule.S3_ACCOUNT_LEVEL_PUBLIC_ACCESS_BLOCKS_PERIODIC,
      ConfigRule.S3_BUCKET_LEVEL_PUBLIC_ACCESS_PROHIBITED,
      ConfigRule.S3_BUCKET_LOGGING_ENABLED,
      ConfigRule.S3_BUCKET_PUBLIC_READ_PROHIBITED,
      ConfigRule.S3_BUCKET_PUBLIC_WRITE_PROHIBITED,
      ConfigRule.S3_BUCKET_VERSIONING_ENABLED,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ACCOUNT_CONTACT_DETAILS_CONFIGURED,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ACCOUNT_SECURITY_CONTACT_CONFIGURED,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ROOT_ACCOUNT_REGULAR_USE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_IAM_USER_CONSOLE_AND_API_ACCESS_AT_CREATION,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_IAM_USER_SINGLE_ACCESS_KEY,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_IAM_EXPIRED_CERTIFICATES,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_IAM_ACCESS_ANALYZER_ENABLED,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_UNAUTHORIZED_API_CALLS,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_SIGN_IN_WITHOUT_MFA,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_ROOT_ACCOUNT_USE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_IAM_POLICY_CHANGE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_CLOUDTRAIL_CONFIG_CHANGE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_S3_BUCKET_POLICY_CHANGE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_NETWORK_GATEWAY_CHANGE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_ROUTE_TABLE_CHANGE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_CHANGE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_ORGANIZATIONS_CHANGE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_VPC_NETWORKACL_OPEN_ADMIN_PORTS,
    ].filter((rule) => !disabledRules.find((disabledRule) => disabledRule.rule === rule));;
  }

  /**
   * ConfigRules that come with the OperationalBestPracticesForCISAWS_v1_4_Level2 conformance pack
   * https://github.com/awslabs/aws-config-rules/blob/master/aws-config-conformance-packs/Operational-Best-Practices-for-CIS-AWS-v1.4-Level2.yaml
   * https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_aws_benchmark_level_2.html
   */
  public static configConformancePackOperationalBestPracticesForCISAWS_v1_4_Level2(disabledRules: DisabledConfigRule[] = []): ConfigRule[] {
    /** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     * Do not modify this function it is generated from an external source and any changes will be lost upon regeneration.
     *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
    return [
      ConfigRule.ACCESS_KEYS_ROTATED,
      ConfigRule.ACCOUNT_PART_OF_ORGANIZATIONS,
      ConfigRule.CLOUD_TRAIL_CLOUD_WATCH_LOGS_ENABLED,
      ConfigRule.CLOUD_TRAIL_ENCRYPTION_ENABLED,
      ConfigRule.CLOUD_TRAIL_LOG_FILE_VALIDATION_ENABLED,
      ConfigRule.CLOUDTRAIL_S3_DATAEVENTS_ENABLED,
      ConfigRule.CMK_BACKING_KEY_ROTATION_ENABLED,
      ConfigRule.EC2_EBS_ENCRYPTION_BY_DEFAULT,
      ConfigRule.ENCRYPTED_VOLUMES,
      ConfigRule.IAM_NO_INLINE_POLICY_CHECK,
      ConfigRule.IAM_PASSWORD_POLICY,
      ConfigRule.IAM_POLICY_IN_USE,
      ConfigRule.IAM_POLICY_NO_STATEMENTS_WITH_ADMIN_ACCESS,
      ConfigRule.IAM_ROOT_ACCESS_KEY_CHECK,
      ConfigRule.IAM_USER_GROUP_MEMBERSHIP_CHECK,
      ConfigRule.IAM_USER_NO_POLICIES_CHECK,
      ConfigRule.IAM_USER_UNUSED_CREDENTIALS_CHECK,
      ConfigRule.INCOMING_SSH_DISABLED,
      ConfigRule.MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS,
      ConfigRule.MULTI_REGION_CLOUD_TRAIL_ENABLED,
      ConfigRule.RDS_SNAPSHOT_ENCRYPTED,
      ConfigRule.RDS_STORAGE_ENCRYPTED,
      ConfigRule.RESTRICTED_INCOMING_TRAFFIC,
      ConfigRule.ROOT_ACCOUNT_HARDWARE_MFA_ENABLED,
      ConfigRule.ROOT_ACCOUNT_MFA_ENABLED,
      ConfigRule.S3_ACCOUNT_LEVEL_PUBLIC_ACCESS_BLOCKS_PERIODIC,
      ConfigRule.S3_BUCKET_LEVEL_PUBLIC_ACCESS_PROHIBITED,
      ConfigRule.S3_BUCKET_LOGGING_ENABLED,
      ConfigRule.S3_BUCKET_PUBLIC_READ_PROHIBITED,
      ConfigRule.S3_BUCKET_PUBLIC_WRITE_PROHIBITED,
      ConfigRule.S3_BUCKET_SERVER_SIDE_ENCRYPTION_ENABLED,
      ConfigRule.S3_BUCKET_SSL_REQUESTS_ONLY,
      ConfigRule.S3_BUCKET_VERSIONING_ENABLED,
      ConfigRule.VPC_DEFAULT_SECURITY_GROUP_CLOSED,
      ConfigRule.VPC_FLOW_LOGS_ENABLED,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ACCOUNT_CONTACT_DETAILS_CONFIGURED,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ACCOUNT_SECURITY_CONTACT_CONFIGURED,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ROOT_ACCOUNT_REGULAR_USE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_IAM_USER_CONSOLE_AND_API_ACCESS_AT_CREATION,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_IAM_USER_SINGLE_ACCESS_KEY,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_IAM_EXPIRED_CERTIFICATES,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_IAM_ACCESS_ANALYZER_ENABLED,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_CONFIG_ENABLED_ALL_REGIONS,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_UNAUTHORIZED_API_CALLS,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_SIGN_IN_WITHOUT_MFA,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_ROOT_ACCOUNT_USE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_IAM_POLICY_CHANGE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_CLOUDTRAIL_CONFIG_CHANGE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_S3_BUCKET_POLICY_CHANGE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_NETWORK_GATEWAY_CHANGE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_ROUTE_TABLE_CHANGE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_CHANGE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_ORGANIZATIONS_CHANGE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_VPC_NETWORKACL_OPEN_ADMIN_PORTS,
      ConfigRule.EC2_INSTANCE_PROFILE_ATTACHED,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_CONSOLE_AUTH_FAILURES,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_KMS_DISABLE_OR_DELETE_CMK,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_AWS_CONFIG_CHANGE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_SECRITY_GROUP_CHANGE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_NACL_CHANGE,
      ConfigRule.AWS_CONFIG_PROCESS_CHECK_VPC_PEERING_LEAST_ACCESS,
    ].filter((rule) => !disabledRules.find((disabledRule) => disabledRule.rule === rule));;
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

