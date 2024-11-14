import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { InstanceType } from 'aws-cdk-lib/aws-ec2/lib/instance-types';
import * as iam from 'aws-cdk-lib/aws-iam';
import {
  BudgetProps,
  DlzAccountNetworks,
  DlzControlTowerStandardControls,
  DlzSsmReaderStackCache,
  DlzStackProps,
  DlzTag,
  DlzVpcProps,
  IamIdentityCenterProps,
  NetworkAddress,
  SlackChannel,
} from './constructs';
import { AuditGlobalStack, AuditRegionalStack, LogGlobalStack } from './stacks';

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
  PRODUCTION = 'production'
}

export interface DLzManagementAccount {
  readonly accountId: string;
}

export interface DLzAccount {
  readonly accountId: string;
  readonly name: string;
  readonly type: DlzAccountType;
  readonly vpcs?: DlzVpcProps[];
  /**
   * Default notifications settings for the account. Defines settings for email notifications or the slack channel details.
   * This will override the organization level defaultNotification.
   */
  readonly defaultNotification?: NotificationDetailsProps;
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
}

export interface OrgOus {
  readonly security: OrgOuSecurity;
  readonly workloads: OrgOuWorkloads;
  readonly suspended: OrgOuSuspended;
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

export interface MandatoryTags {
  readonly owner: string[];
  readonly project: string[];
  readonly environment: string[];
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
  readonly owner: string;
  readonly repo: string;
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
   * List of services to deny in the organization SCP. If not specified, the default defined by
   *
   * @default DataLandingZone.defaultDenyServiceList()
   */
  readonly denyServiceList?: string[];

  /**
   * List of additional mandatory tags that all resources must have. Not all resources support tags, this is a best-effort.
   *
   * Mandatory tags are defined in Defaults.mandatoryTags() which are:
   * - Owner, the team responsible for the resource
   * - Project, the project the resource is part of
   * - Environment, the environment the resource is part of
   *
   * It creates:
   * 1. A tag policy in the organization
   * 2. An SCP on the organization that all CFN stacks must have these tags when created
   * 3. An AWS Config rule that checks for these tags on all CFN stacks and resources
   *
   * For all stacks created by DLZ the following tags are applied:
   * - Owner: infra
   * - Project: dlz
   * - Environment: dlz
   *
   * @default Defaults.mandatoryTags()
   */
  readonly additionalMandatoryTags?: DlzTag[];

  /**
   * The values of the mandatory tags that all resources must have.
   * The following values are already specified and used by the DLZ constructs
   * - Owner: [infra]
   * - Project: [dlz]
   * - Environment: [dlz]
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

  readonly budgets: BudgetProps[];

  readonly securityHubNotifications: SecurityHubNotification[];

  readonly deploymentPlatform?: DeploymentPlatform;

  readonly network?: Network;
}

export interface LogStacks {
  readonly global: LogGlobalStack;
  readonly regional: LogGlobalStack[];
}

export interface AuditStacks {
  readonly global: AuditGlobalStack;
  readonly regional: AuditRegionalStack[];
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

/* Global variables need to be reset between Construct usage */
export interface GlobalVariables {
  readonly dlzAccountNetworks: DlzAccountNetworks;
  readonly ncp1: GlobalVariablesNcp1;
  readonly ncp2: GlobalVariablesNcp2;
  readonly ncp3: GlobalVariablesNcp3;
}

export interface WorkloadAccountProps extends DlzStackProps {
  readonly dlzAccount: DLzAccount;
  readonly globalVariables: GlobalVariables;
}