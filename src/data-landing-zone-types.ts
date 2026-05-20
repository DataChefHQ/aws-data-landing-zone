import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { InstanceType } from 'aws-cdk-lib/aws-ec2/lib/instance-types';
import * as iam from 'aws-cdk-lib/aws-iam';
import { IManagedPolicy } from 'aws-cdk-lib/aws-iam/lib/managed-policy';
import { PolicyDocument } from 'aws-cdk-lib/aws-iam/lib/policy-document';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam/lib/policy-statement';
import { IPrincipal } from 'aws-cdk-lib/aws-iam/lib/principals';
import * as sns from 'aws-cdk-lib/aws-sns';
import { Duration, SecretValue } from 'aws-cdk-lib/core';
import {
  BudgetSubscribers,
  DlzAccountNetworks,
  DlzBudgetProps,
  DlzControlTowerStandardControls,
  DlzLakeFormationProps,
  DlzSsmReaderStackCache,
  DlzStackProps,
  DlzTag,
  DlzVpcProps,
  IamIdentityCenterProps, IamPasswordPolicyProps,
  NetworkAddress,
  SlackChannel,
} from './constructs';
import { DlzAccountBudgetsProps } from './constructs/dlz-account-budgets/account-budgets-types';
import { DlzCostAnomalyDetectionProps } from './constructs/dlz-cost-anomaly-detection/cost-anomaly-detection-types';
import { DlzDataExportsProps } from './constructs/dlz-data-exports/data-exports-types';
import { DlzGuardDutyFeaturesProps, DlzGuardDutyProps } from './constructs/dlz-guardduty/guardduty-types';
import { DlzMacieProps } from './constructs/dlz-macie/macie-types';
import { AuditGlobalStack, FinOpsGlobalStack, ManagementDataExportsStack, ManagementGlobalStack } from './stacks';
import {
  ManagementGlobalIamIdentityCenterStack,
} from './stacks/organization/management/management-global-iam-identity-center-stack';

/**
 * Control Tower Supported Regions as listed here
 * https://docs.aws.amazon.com/controltower/latest/userguide/region-how.html with the regions that might have partial
 * or no support for SecurityHub Standard mentioned in the comment
 * https://docs.aws.amazon.com/controltower/latest/userguide/security-hub-controls.html#sh-unsupported-regions
 * Last updated: 22 Mar 2024
 */
export enum Region {
  /**
   * N. Virginia
   */
  US_EAST_1 = 'us-east-1',

  /**
   * Ohio
   */
  US_EAST_2 = 'us-east-2',

  /**
   * N. California
   */
  US_WEST_1 = 'us-west-1',

  /**
   * Oregon
   */
  US_WEST_2 = 'us-west-2',

  /**
   * Canada (Central)
   */
  CA_CENTRAL_1 = 'ca-central-1',

  /**
   * Ireland
   */
  EU_WEST_1 = 'eu-west-1',

  /**
   * London
   */
  EU_WEST_2 = 'eu-west-2',

  /**
   * Paris
   */
  EU_WEST_3 = 'eu-west-3',

  /**
   * Frankfurt
   */
  EU_CENTRAL_1 = 'eu-central-1',

  /**
   * Zurich
   */
  EU_CENTRAL_2 = 'eu-central-2',

  /**
   * Stockholm
   */
  EU_NORTH_1 = 'eu-north-1',

  /**
   * Milan
   */
  EU_SOUTH_1 = 'eu-south-1',

  /**
   * Spain
   */
  EU_SOUTH_2 = 'eu-south-2',

  /**
   * Tokyo
   */
  AP_NORTHEAST_1 = 'ap-northeast-1',

  /**
   * Seoul
   */
  AP_NORTHEAST_2 = 'ap-northeast-2',

  /**
   * Osaka
   */
  AP_NORTHEAST_3 = 'ap-northeast-3',

  /**
   * Singapore
   */
  AP_SOUTHEAST_1 = 'ap-southeast-1',

  /**
   * Sydney, Melbourne
   */
  AP_SOUTHEAST_2 = 'ap-southeast-2',

  /**
   * Jakarta
   * No Control Tower SecurityHub Standard support
   */
  AP_SOUTHEAST_3 = 'ap-southeast-3',

  /**
   * Melbourne
   * No Control Tower SecurityHub Standard support
   */
  AP_SOUTHEAST_4 = 'ap-southeast-4',

  /**
   * Hong Kong
   * No Control Tower SecurityHub Standard support
   */
  AP_EAST_1 = 'ap-east-1',

  /**
   * Sao Paulo
   */
  SA_EAST_1 = 'sa-east-1',

  /**
   * Cape Town
   * No Control Tower SecurityHub Standard support
   */
  AF_SOUTH_1 = 'af-south-1',

  /**
   * Bahrain, UAE, Tel Aviv
   * No Control Tower SecurityHub Standard support
   */
  ME_SOUTH_1 = 'me-south-1',

  /**
   * UAE
   * No Control Tower SecurityHub Standard support
   */
  ME_CENTRAL_1 = 'me-central-1',

  /**
   * Israel
   * No Control Tower SecurityHub Standard support
   */
  IL_CENTRAL_1 = 'il-central-1',

  /**
   * Hyderabad
   * No Control Tower SecurityHub Standard support
   */
  AP_SOUTH_2 = 'ap-south-2',
}

export interface IamPolicyPermissionsBoundaryProps {
  readonly policyStatement: iam.PolicyStatementProps;
}

export interface DlzRegions {
  /**
   * Also known as the Home region for Control Tower
   */
  readonly global: Region;

  /**
   * The other regions to support (do not specify the global region again)
   */
  readonly regional: Region[];
}

export function DlzAllRegions(regions: DlzRegions): Region[] {
  return [regions.global, ...regions.regional];
}

export enum DlzAccountType {
  // SANDBOX = 'sandbox',
  DEVELOP = 'development',
  PRODUCTION = 'production',
}

/** Additional SCP statements per `DlzAccountType`, layered between the org baseline and per-account extras. Additive only. */
export interface ScpStatementsByAccountType {
  /** @default - no statements */
  readonly development?: PolicyStatement[];
  /** @default - no statements */
  readonly production?: PolicyStatement[];
}

export interface DLzManagementAccount {
  readonly accountId: string;
}

/**
 * Dedicated FinOps account. `ScpFinOpsAccountBaseline` is auto-attached; `scpStatements`
 * layers additional Deny rules on top (additive only).
 */
export interface DLzFinOpsAccount extends DLzManagementAccount {
  /**
   * Extra per-account SCP statements appended to `ScpFinOpsAccountBaseline`.
   * @default - no additional statements
   */
  readonly scpStatements?: PolicyStatement[];
}

export interface DLzIamUserGroup {
  /**
   * A name for the IAM group.
   *
   * Differs from `Group`, now required.
   */
  readonly groupName: string;
  /**
   * A list of managed policies associated with this role.
   *
   * Differs from `Group` that accepts `IManagedPolicy[]`. This is to not expose the scope of the stack and make
   * it difficult to pass `new iam.ManagedPolicy.fromAwsManagedPolicyName...` that gets defined as a construct
   */
  readonly managedPolicyNames?: string[];
  /**
   * List of usernames that should be added to this group
   *
   * Differs from `Group`, does not exist
   */
  readonly users: string[];
}

export interface DlzIamPolicy {
  /**
   * The name of the policy.
   *
   * Differs from `Policy`, now required.
   */
  readonly policyName: string;
  /**
   * Initial set of permissions to add to this policy document.
   * You can also use `addStatements(...statement)` to add permissions later.
   *
   * @default - No statements.
   */
  readonly statements?: PolicyStatement[];
  /**
   * Initial PolicyDocument to use for this Policy. If omited, any
   * `PolicyStatement` provided in the `statements` property will be applied
   * against the empty default `PolicyDocument`.
   *
   * @default - An empty policy.
   */
  readonly document?: PolicyDocument;
}

export interface DlzIamRole {
  /**
   * A name for the IAM role. For valid values, see the RoleName parameter for
   * the CreateRole action in the IAM API Reference.
   *
   * Differs from `Role`, now required.
   */
  readonly roleName: string;
  /**
   * The IAM principal (i.e. `new ServicePrincipal('sns.amazonaws.com')`)
   * which can assume this role.
   *
   * You can later modify the assume role policy document by accessing it via
   * the `assumeRolePolicy` property.
   */
  readonly assumedBy: IPrincipal;
  /**
   * List of IDs that the role assumer needs to provide one of when assuming this role
   *
   * If the configured and provided external IDs do not match, the
   * AssumeRole operation will fail.
   */
  readonly externalIds?: string[];
  /**
   * A list of managed policies associated with this role.
   *
   * Differs from `Role` that accepts `IManagedPolicy[]`. This is to not expose the scope of the stack and make
   * it difficult to pass `new iam.ManagedPolicy.fromAwsManagedPolicyName...` that gets defined as a construct
   */
  readonly managedPolicyNames?: string[];
  /**
   * A list of named policies to inline into this role. These policies will be
   * created with the role, whereas those added by ``addToPolicy`` are added
   * using a separate CloudFormation resource (allowing a way around circular
   * dependencies that could otherwise be introduced)..
   */
  readonly inlinePolicies?: {
    [name: string]: PolicyDocument;
  };
  /**
   * AWS supports permissions boundaries for IAM entities (users or roles).
   * A permissions boundary is an advanced feature for using a managed policy
   * to set the maximum permissions that an identity-based policy can grant to
   * an IAM entity. An entity's permissions boundary allows it to perform only
   * the actions that are allowed by both its identity-based policies and its
   * permissions boundaries.
   *
   * @link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-permissionsboundary
   * @link https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html
   *
   * @default - No permissions boundary.
   */
  readonly permissionsBoundary?: IManagedPolicy;
  /**
   * The maximum session duration that you want to set for the specified role.
   * This setting can have a value from 1 hour (3600sec) to 12 (43200sec) hours.
   *
   * Anyone who assumes the role from the AWS CLI or API can use the
   * DurationSeconds API parameter or the duration-seconds CLI parameter to
   * request a longer session. The MaxSessionDuration setting determines the
   * maximum duration that can be requested using the DurationSeconds
   * parameter.
   *
   * If users don't specify a value for the DurationSeconds parameter, their
   * security credentials are valid for one hour by default. This applies when
   * you use the AssumeRole* API operations or the assume-role* CLI operations
   * but does not apply when you use those operations to create a console URL.
   *
   * @link https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html
   *
   * @default Duration.hours(1)
   */
  readonly maxSessionDuration?: Duration;
  /**
   * A description of the role. It can be up to 1000 characters long.
   */
  readonly description?: string;
}

export interface DlzIamUser {
  /**
   * A name for the IAM user.
   *
   * Differs from `User`, now required.
   */
  readonly userName: string;
  /**
   * A list of managed policies associated with this role.
   *
   * Differs from `User` that accepts `IManagedPolicy[]`. This is to not expose the scope of the stack and make
   * it difficult to pass `new iam.ManagedPolicy.fromAwsManagedPolicyName...` that gets defined as a construct
   */
  readonly managedPolicyNames?: string[];
  /**
   * AWS supports permissions boundaries for IAM entities (users or roles).
   * A permissions boundary is an advanced feature for using a managed policy
   * to set the maximum permissions that an identity-based policy can grant to
   * an IAM entity. An entity's permissions boundary allows it to perform only
   * the actions that are allowed by both its identity-based policies and its
   * permissions boundaries.
   *
   * @link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-permissionsboundary
   * @link https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html
   */
  readonly permissionsBoundary?: IManagedPolicy;
  /**
   * The password for the user. This is required so the user can access the
   * AWS Management Console.
   *
   * You can use `SecretValue.unsafePlainText` to specify a password in plain text or
   * use `secretsmanager.Secret.fromSecretAttributes` to reference a secret in
   * Secrets Manager.
   *
   * @default - User won't be able to access the management console without a password.
   */
  readonly password?: SecretValue;
  /**
   * Specifies whether the user is required to set a new password the next
   * time the user logs in to the AWS Management Console.
   *
   * If this is set to 'true', you must also specify "initialPassword".
   *
   * @default false
   */
  readonly passwordResetRequired?: boolean;
}

export interface DLzIamProps {
  /**
   * The account alias to set for this account
   */
  readonly accountAlias?: string;

  /**
   * The password policy for this account
   * If not set the default AWS IAM policy is applied, use this to customize the password policy.
   * @Default below:
   * - Password minimum length: 8 characters
   * - Uppercase
   * - Lowercase
   * - Numbers
   * - Non-alphanumeric characters
   * - Never expire password
   * - Must not be identical to your AWS account name or email address
   */
  readonly passwordPolicy?: IamPasswordPolicyProps;

  /**
   * IAM policies to create in this account.
   */
  readonly policies?: DlzIamPolicy[];

  /**
   * IAM roles to create in this account.
   */
  readonly roles?: DlzIamRole[];

  /**
   * IAM users to create in this account.
   */
  readonly users?: DlzIamUser[];

  /**
   * IAM groups to create in this account with their associated users
   */
  readonly userGroups?: DLzIamUserGroup[];
}

export interface DLzAccount {
  readonly accountId: string;
  readonly name: string;
  readonly type: DlzAccountType;

  /**
   * The email address associated with this AWS account.
   * Used by GuardDuty CreateMembers API when enrolling accounts.
   * For organization-managed accounts the member relationship is established
   * through AWS Organizations, not through email invitations — the email is
   * a required API field but does not affect enrollment behavior.
   * @default 'noreply@example.com'
   */
  readonly email?: string;

  readonly vpcs?: DlzVpcProps[];

  /**
   * Default notifications settings for the account. Defines settings for email notifications or the slack channel details.
   * This will override the organization level defaultNotification.
   */
  readonly defaultNotification?: NotificationDetailsProps;

  /**
   * LakeFormation settings and tags
   */
  readonly lakeFormation?: DlzLakeFormationProps[];

  /**
   * IAM configuration for the account
   */
  readonly iam?: DLzIamProps;

  /**
   * Explicitly enable GuardDuty for this account.
   * Required when `autoEnableOrgMembers` is `'NONE'` or `'NEW'` (for existing accounts).
   * When `autoEnableOrgMembers` is `'ALL'`, this flag is not needed as all accounts are auto-enrolled.
   * Only takes effect when `guardDuty` is enabled at the organization level.
   */
  readonly guardDutyEnabled?: boolean;

  /**
   * GuardDuty feature overrides for this account.
   * When specified, these features are applied to this account on top of the
   * organization-level baseline from `Defaults.guardDutyFeatures()`.
   * Additive only — cannot disable org-level features.
   * Only takes effect when `guardDuty` is enabled at the organization level.
   */
  readonly guardDutyFeatures?: DlzGuardDutyFeaturesProps;

  /**
   * Explicitly enroll this existing account in Macie via CreateMember.
   * Set to `true` to enroll, `false` to disenroll. Omit to take no action.
   *
   * This controls enrollment of **existing** accounts only.
   * The `DlzMacieProps.autoEnable` setting separately controls whether
   * **new** accounts joining the organization are auto-enabled by AWS.
   *
   * Only takes effect when `macie.enabled` is `true` at the organization level.
   */
  readonly macieEnabled?: boolean;

  /**
   * Additional per-account SCP statements layered on top of the org baseline and account-type tier. Additive only.
   * @default - no additional statements
   */
  readonly scpStatements?: PolicyStatement[];

  /**
   * Cost center identifier. Populates the `CostCenter` tag and feeds `DlzAccountBudgets`
   * cost-center roll-ups.
   */
  readonly costCenter?: string;

  /**
   * Data domain. Populates the `Domain` tag. Foundation enforces presence only; the
   * platform overlay may later constrain values.
   */
  readonly domain?: 'raw' | 'curated' | 'serving' | 'inference';

  /**
   * Monthly budget cap in USD. `DlzAccountBudgets` creates a `DlzBudget` filtered to
   * this account's `LinkedAccount`.
   */
  readonly monthlyBudget?: number;
}

export interface DLzAccountSuspended {
  readonly accountId: string;
  readonly name: string;
}

export enum Ou {
  SECURITY = 'security',
  WORKLOADS = 'workloads',
  SUSPENDED = 'suspended',
}

export interface OrgRootAccounts {
  readonly management: DLzManagementAccount;
}

export interface OrgOuSecurityAccounts {
  readonly log: DLzManagementAccount;
  readonly audit: DLzManagementAccount;
}

export interface OrgOuSecurity {
  readonly ouId: string;
  readonly accounts: OrgOuSecurityAccounts;
}

export interface OrgOuWorkloads {
  readonly ouId: string;
  readonly accounts: DLzAccount[];
}

export interface OrgOuSuspended {
  readonly ouId: string;
  readonly accounts?: DLzAccountSuspended[];
}

export interface OrgOuSharedServicesAccounts {
  /** Dedicated FinOps account hosting the BCM Data Exports bucket, Glue catalog, and Athena workgroup. */
  readonly finOps?: DLzFinOpsAccount;
}

/**
 * Shared Services OU. Optional parent for accounts that serve the wider organization but
 * are not themselves workloads, security, or governance baselines. Constructs that need a
 * specific account here (e.g. the CUR data plane needs the FinOps account) fail at synth
 * with an actionable error when the account is absent. Anomaly detection and account
 * budgets don't need this OU — they only use the management account.
 */
export interface OrgOuSharedServices {
  readonly ouId: string;
  readonly accounts: OrgOuSharedServicesAccounts;
}

export interface OrgOus {
  readonly security: OrgOuSecurity;
  readonly workloads: OrgOuWorkloads;
  readonly suspended: OrgOuSuspended;
  /**
   * Shared Services OU. Required to enable BCM Data Exports (`finOps.dataExports`).
   * @default - not configured
   */
  readonly sharedServices?: OrgOuSharedServices;
}

export interface RootOptions {
  readonly accounts: OrgRootAccounts;

  /**
   * Control Tower Controls applied to all the OUs in the organization
   */
  readonly controls?: DlzControlTowerStandardControls[];
}

export interface DLzOrganization {
  readonly organizationId: string;
  readonly root: RootOptions;
  readonly ous: OrgOus;
}

/**
 * Allowed values for each mandatory tag. An empty array or `undefined` enforces tag
 * presence only; a non-empty list restricts the value to entries in the list.
 */
export interface MandatoryTags {
  readonly owner: string[] | undefined;
  readonly project: string[] | undefined;
  readonly environment: string[] | undefined;
  /** Used by FinOps tooling for chargeback / showback. */
  readonly costCenter: string[] | undefined;
  /**
   * Foundation enforces presence only. The platform overlay may later constrain values to
   * `['raw', 'curated', 'serving', 'inference']` via a value-restricted tag policy.
   */
  readonly domain: string[] | undefined;
}

export interface SecurityHubNotificationProps {
  readonly emails?: string[];
  readonly slack?: SlackChannel;
}

export interface NotificationDetailsProps {
  readonly emails?: string[];
  readonly slack?: SlackChannel;
}

/**
 * https://docs.aws.amazon.com/securityhub/1.0/APIReference/API_Severity.html
 */
export enum SecurityHubNotificationSeverity {
  INFORMATIONAL = 'INFORMATIONAL',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

/**
 * https://docs.aws.amazon.com/securityhub/1.0/APIReference/API_Workflow.html
 */
export enum SecurityHubNotificationSWorkflowStatus {
  NEW = 'NEW',
  NOTIFIED = 'NOTIFIED',
  SUPPRESSED = 'SUPPRESSED',
  RESOLVED = 'RESOLVED',
}

export interface SecurityHubNotification {
  readonly id: string;
  readonly severity?: SecurityHubNotificationSeverity[];
  readonly workflowStatus?: SecurityHubNotificationSWorkflowStatus[];
  readonly notification: SecurityHubNotificationProps;
}

export interface GitHubReference {
  /**
   * The owner of the GitHub repository
   */
  readonly owner: string;
  /**
   * The repository name
   */
  readonly repo: string;
  /**
   * For a complete list of filters see https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/about-security-hardening-with-openid-connect#understanding-the-oidc-token
   *
   * Some common Examples:
   * - specific environment `environment:ENVIRONMENT-NAME`
   * - specific branch `ref:refs/heads/BRANCH-NAME`
   * - specific tag `ref:refs/tags/TAG-NAME`
   * - only PRs `pull_request`
   *
   * A `*` can be used for most parts like `ENVIRONMENT-NAME`, `BRANCH-NAME`, `TAG-NAME`
   */
  readonly filter?: string;
}

export interface DeploymentPlatformGitHub {
  readonly references: GitHubReference[];
}

export interface DeploymentPlatform {
  readonly gitHub?: DeploymentPlatformGitHub;
}

export interface NetworkConnectionVpcPeering {
  readonly source: NetworkAddress;
  readonly destination: NetworkAddress;
}

export interface NetworkConnection {
  readonly vpcPeering: NetworkConnectionVpcPeering[];
}

export interface NetworkNatGateway {
  readonly eip?: ec2.CfnEIPProps;
}

export interface NetworkNatInstance {
  readonly eip?: ec2.CfnEIPProps;
  readonly instanceType: InstanceType;
}

export interface NetworkNatType {
  readonly gateway?: NetworkNatGateway;
  readonly instance?: NetworkNatInstance;
}

export interface NetworkNat {
  /**
   * The name of the NAT Gateway to easily identify it
   */
  readonly name: string;

  /**
   * The location where the NAT will exist. The network address must target a specific subnet
   */
  readonly location: NetworkAddress;

  /**
   * The route tables that should route to the NAT. Must be in the same Account, Region and VPC as the NAT.
   */
  readonly allowAccessFrom: NetworkAddress[];

  /**
   * The type of NAT to create
   * */
  readonly type: NetworkNatType;
}

export interface BastionHost {
  /**
   * The name of the Bastion, defaults to 'default', specify the name if there are more than one per account
   */
  readonly name?: string;

  /**
   * The location where the Bastion will exist. The network address must target a specific subnet
   */
  readonly location: NetworkAddress;

  /**
   * The bastion instance EC2 type
   */
  readonly instanceType: InstanceType;
}

export interface Network {
  readonly connections?: NetworkConnection;
  readonly nats?: NetworkNat[];
  readonly bastionHosts?: BastionHost[];
}

export interface DataLandingZoneProps {
  /**
   * The the AWS CLI profile that will be used to run the Scripts.
   * For the `bootstrap` script, this profile must be an Admin of the root management account and it must be able to assume
   * the `AWSControlTowerExecution` role created by ControlTower. This is an extremely powerful set of credentials and
   * should be treated with care. The permissions can be reduced for the everyday use of the `diff` and `deploy` scripts
   * but the `bootstrap` script requires full admin access.
   */
  readonly localProfile: string;
  readonly organization: DLzOrganization;
  readonly regions: DlzRegions;
  /**
   * Default notification settings for the organization. Allows you to define the
   * email notfication settings or slack channel settings. If the account level defaultNotification
   * is defined those will be used for the account instead of this defaultNotification which
   * acts as the fallback.
   */
  readonly defaultNotification?: NotificationDetailsProps;
  /**
   * IAM Policy Permission Boundary
   */
  readonly iamPolicyPermissionBoundary?: IamPolicyPermissionsBoundaryProps;

  /**
   * IAM Identity Center configuration
   */
  readonly iamIdentityCenter?: IamIdentityCenterProps;

  /**
   * Replaces the deny-services portion of the org SCP baseline applied to every workload account.
   * The mandatory-tags SCP is always appended after these statements and cannot be opted out of.
   *
   * @default - only the mandatory-tags SCP is applied
   */
  readonly scpBaselineStatements?: PolicyStatement[];

  /**
   * Per-`DlzAccountType` SCP statements layered between the org baseline and per-account extras. Additive only.
   * @default - no per-account-type statements
   */
  readonly scpStatementsByAccountType?: ScpStatementsByAccountType;

  /**
   * Extra tags appended to the five baseline mandatory tags (Owner, Project, Environment,
   * CostCenter, Domain). Tag policy + SCP + an AWS Config rule enforce presence; tag
   * support is best-effort because not every AWS resource accepts tags.
   *
   * DLZ-created stacks are tagged Owner=infra, Project=dlz, Environment=dlz, CostCenter=dlz,
   * Domain=foundation.
   *
   * @default Defaults.mandatoryTags()
   */
  readonly additionalMandatoryTags?: DlzTag[];

  /**
   * Allowed values for the five baseline mandatory tags. DLZ resources use Owner=infra,
   * Project=dlz, Environment=dlz, CostCenter=dlz, Domain=foundation — leave those in the
   * allowed-values lists when overriding.
   */
  readonly mandatoryTags: MandatoryTags;

  /**
   * Print the deployment order to the console
   *
   * @default true
   */
  readonly printDeploymentOrder?: boolean;

  /**
   * Print the report grouped by account, type and aggregated regions to the console
   *
   * @default true
   */
  readonly printReport?: boolean;

  /**
   * Save the raw report items and the reports grouped by account to a `./.dlz-reports` folder
   *
   * @default true
   */
  readonly saveReport?: boolean;

  /**
   * GuardDuty configuration for the organization.
   * When specified, enables GuardDuty at the organization level and delegates
   * administration to the security audit account. The audit account will have
   * a GuardDuty detector created and organization-wide auto-enable configured.
   */
  readonly guardDuty?: DlzGuardDutyProps;

  /**
   * Macie configuration for the organization.
   * When specified, enables Macie at the organization level and delegates
   * administration to the security audit account.
   */
  readonly macie?: DlzMacieProps;

  readonly securityHubNotifications: SecurityHubNotification[];

  readonly deploymentPlatform?: DeploymentPlatform;

  readonly network?: Network;

  /**
   * Cost-management capabilities. Each member is independently optional. `dataExports`
   * requires `org.ous.sharedServices.accounts.finOps`; the rest only need the management
   * account.
   *
   * @default - no FinOps capabilities enabled
   */
  readonly finOps?: DlzFinOpsProps;
}

export interface DlzFinOpsProps {
  /** Tag-scoped org/account-wide budget alerts in the management account. */
  readonly budgets?: DlzBudgetProps[];

  /**
   * Per-account and (optional) per-cost-center roll-up budgets. Iterates workload accounts
   * with `monthlyBudget` set. Management account only.
   */
  readonly accountBudgets?: DlzAccountBudgetsProps;

  /**
   * Cost Anomaly Detection monitors + subscriptions. Reuses `budgetSnsCache` so anomaly
   * alerts and budgets can share an SNS topic. Management account only.
   */
  readonly costAnomalyDetection?: DlzCostAnomalyDetectionProps;

  /**
   * BCM Data Exports (CUR 2.0, FOCUS 1.2, Cost Optimization Recommendations, Carbon
   * Emissions) into the dedicated FinOps account. Synth fails fast if the FinOps account
   * is not configured.
   */
  readonly dataExports?: DlzDataExportsProps;

  /**
   * Tag-value overrides for the FinOps account stack. Defaults treat the account as
   * production-grade DLZ infrastructure; override when the operator's taxonomy differs.
   */
  readonly accountTags?: DlzFinOpsAccountTags;
}

/** Per-tag overrides for the FinOps account stack. Omitted fields fall back to the default. */
export interface DlzFinOpsAccountTags {
  /** @default 'infra' */
  readonly owner?: string;
  /** @default 'dlz' */
  readonly project?: string;
  /** @default DlzAccountType.PRODUCTION ('production') */
  readonly environment?: string;
  /** @default 'dlz' */
  readonly costCenter?: string;
  /** @default 'foundation' */
  readonly domain?: string;
}

export interface ManagementStacks {
  readonly global: ManagementGlobalStack;
  readonly globalIamIdentityCenter?: ManagementGlobalIamIdentityCenterStack;
  readonly dataExports?: ManagementDataExportsStack;
}

export interface LogStacks {
  // readonly global: LogGlobalStack;
  // readonly regional: LogGlobalStack[];
}

export interface AuditStacks {
  readonly global: AuditGlobalStack;
  // readonly regional: AuditRegionalStack[];
}

export interface FinOpsStacks {
  readonly global: FinOpsGlobalStack;
}

export interface GlobalVariablesNcp1 {
  /* The key is the combination of the account ids */
  readonly vpcPeeringRoleKeys: string[];
}

export interface GlobalVariablesNcp2 {
  /* To not create duplicate peering connections */
  readonly peeringConnections: Record<string, ec2.CfnVPCPeeringConnection>;
  /* Reduce the number of SSM readers, only create them if they do not exist for that key
   * This applies only if multiple SSM readers are used with the same key in the same stack, which we are */
  readonly ownerVpcIds: DlzSsmReaderStackCache;
  readonly peeringRoleArns: DlzSsmReaderStackCache;
}

export interface GlobalVariablesNcp3 {
  /* Reduce the number of SSM readers, only create them if they do not exist for that key
   * This applies only if multiple SSM readers are used with the same key in the same stack, which we are */
  readonly vpcPeeringConnectionIds: DlzSsmReaderStackCache;
  readonly routeTablesSsmCache: DlzSsmReaderStackCache;
}

export interface GlobalVariablesBudgetSnsCacheRecord {
  readonly topic: sns.Topic;
  readonly subscribers: BudgetSubscribers;
}

// export interface GlobalVariablesBudgetSnsCache {
//   readonly values: Record<string, GlobalVariablesBudgetSnsCacheRecord>
// }

/* Global variables need to be reset between Construct usage */
export interface GlobalVariables {
  readonly budgetSnsCache: Record<string, GlobalVariablesBudgetSnsCacheRecord>;
  readonly dlzAccountNetworks: DlzAccountNetworks;
  readonly ncp1: GlobalVariablesNcp1;
  readonly ncp2: GlobalVariablesNcp2;
  readonly ncp3: GlobalVariablesNcp3;
}

export interface WorkloadAccountProps extends DlzStackProps {
  readonly dlzAccount: DLzAccount;
  readonly globalVariables: GlobalVariables;
}

/**
 * This is a type that is used to force JSII to not "argument lift" the arguments. Use it as the last argument of
 * user facing function that you want to prevent argument lifting on. Example:
 * ```
 * public async diffAll(props: DataLandingZoneProps, _: ForceNoPythonArgumentLifting = {})
 *
 * export class DataLandingZone {
 *   constructor(app: App, props: DataLandingZoneProps, _: ForceNoPythonArgumentLifting = {}) {
 * ```
 *
 * Then just call the function/constructor and "forget about the last parameter". It's an ugly hack but acceptable for
 * the time being. Tracking issue: https://github.com/aws/jsii/issues/4721
 */
export interface ForceNoPythonArgumentLifting {}
