import { App, Tags, Annotations } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { InstanceType } from 'aws-cdk-lib/aws-ec2/lib/instance-types';
import * as iam from 'aws-cdk-lib/aws-iam';
import { CdkExpressPipeline } from 'cdk-express-pipeline';
import {
  BudgetProps, DlzAccountNetworks,
  DlzControlTowerStandardControls,
  DlzStackProps, DlzVpcProps, IamIdentityCenterProps,
  SlackChannel,
} from './constructs';
import { DlzSsmReaderStackCache } from './constructs/dlz-ssm-reader/dlz-ssm-reader-stack-cache';
import { NetworkAddress } from './constructs/dlz-vpc/network-address';
import { DlzTag } from './constructs/organization-policies/tag-policy';
import { Report } from './lib/report';
import { LogRegionalStack, ManagementStack, WorkloadGlobalNetworkConnectionsPhase1Stack } from './stacks';
import { AuditGlobalStack } from './stacks/organization/security/audit/global-stack';
import { AuditRegionalStack } from './stacks/organization/security/audit/regional-stack';
import { LogGlobalStack } from './stacks/organization/security/log/global-stack';
import { WorkloadGlobalStack } from './stacks/organization/workloads/base/global-stack';
import { WorkloadRegionalStack } from './stacks/organization/workloads/base/regional-stack';
import {
  WorkloadGlobalNetworkConnectionsPhase2Stack,
} from './stacks/organization/workloads/network-connections-phase-2-stack/global-stack';
import {
  WorkloadRegionalNetworkConnectionsPhase2Stack,
} from './stacks/organization/workloads/network-connections-phase-2-stack/regional-stack';
import {
  WorkloadGlobalNetworkConnectionsPhase3Stack,
} from './stacks/organization/workloads/network-connections-phase-3-stack/global-stack';
import {
  WorkloadRegionalNetworkConnectionsPhase3Stack,
} from './stacks/organization/workloads/network-connections-phase-3-stack/regional-stack';

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
  DEVELOP = 'develop',
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

function validations(props: DataLandingZoneProps) {

  let allNetworkAdressVariants: NetworkAddress[] = [];
  for (const account of props.organization.ous.workloads.accounts) {
    allNetworkAdressVariants.push(new NetworkAddress(account.name));
    for (const vpc of account.vpcs || []) {
      allNetworkAdressVariants.push(new NetworkAddress(account.name, vpc.region));
      allNetworkAdressVariants.push(new NetworkAddress(account.name, vpc.region, vpc.name));
      for (const routeTable of vpc.routeTables) {
        allNetworkAdressVariants.push(new NetworkAddress(account.name, vpc.region, vpc.name, routeTable.name));
        for (const subnet of routeTable.subnets) {
          allNetworkAdressVariants.push(new NetworkAddress(account.name, vpc.region, vpc.name, routeTable.name, subnet.name));
        }
      }
    }
  }
  function networkAddressExists(networkAddress: NetworkAddress) {
    return allNetworkAdressVariants.some(address => address.matches(networkAddress));
  }

  /* VPC Peering */
  for (const connection of props.network?.connections?.vpcPeering || []) {
    if (!networkAddressExists(connection.source)) {
      throw new Error(`The VPC Peering 'source' NetworkAddress ${connection.source} does not exist`);
    }
    if (!networkAddressExists(connection.destination)) {
      throw new Error(`The VPC Peering 'destination' NetworkAddress ${connection.destination} does not exist`);
    }

    if (connection.source.subnet || connection.destination.subnet) {
      throw new Error('VPC Peering addresses' +
        ` (source: ${connection.source}, destination: ${connection.destination})` +
        ' can not be specified on a subnet level, routeTable is the lowest');
    }
    if (connection.source.account == connection.destination.account &&
      connection.source.region == connection.destination.region &&
      connection.source.vpc == connection.destination.vpc) {
      throw new Error('VPC Peering' +
        ` (source: ${connection.source}, destination: ${connection.destination})` +
        ' can not be used within the same VPC');
    }
  }


  /* NATs */
  for (const nat of props.network?.nats || []) {
    if (!networkAddressExists(nat.location)) {
      throw new Error(`The NAT (${nat.name}) 'location' NetworkAddress ${nat.location} does not exist`);
    }
    if (!nat.location.subnet) {
      throw new Error(`The NAT (${nat.name}) 'location' NetworkAddress must target a specific subnet`);
    }
    if (nat.type.gateway && nat.type.instance) {
      throw new Error(`The NAT (${nat.name}) can not have both 'gateway' and 'instance' properties specified`);
    }
    if (!nat.type.gateway && !nat.type.instance) {
      throw new Error(`The NAT (${nat.name}) must have either 'gateway' or 'instance' property specified`);
    }

    for (const allowAccessFrom of nat.allowAccessFrom) {
      if (!networkAddressExists(allowAccessFrom)) {
        throw new Error(`The NAT (${nat.name}) 'allowAccessFrom' NetworkAddress ${allowAccessFrom} does not exist`);
      }
      if (!allowAccessFrom.routeTable) {
        throw new Error(`NAT (${nat.name}) 'allowAccessFrom' (${allowAccessFrom}) NetworkAddress must target ` +
          'a specific routeTable');
      }

      if (nat.location.account !== allowAccessFrom.account ||
        nat.location.region !== allowAccessFrom.region ||
        nat.location.vpc !== allowAccessFrom.vpc
      ) {
        throw new Error(`NAT ${nat.name} 'location' and 'allowAccessFrom' (${allowAccessFrom}) NetworkAddress must ` +
          'be in the same account, region and VPC');
      }
    }
  }

  /* Bastions */
  for (const bastion of props.network?.bastionHosts || []) {
    if (!networkAddressExists(bastion.location)) {
      throw new Error(`The BastionHost (${bastion.name}) 'location' NetworkAddress ${bastion.location} does not exist`);
    }

    if (!bastion.location.subnet) {
      throw new Error(`The BastionHost (${bastion.name}) 'location' NetworkAddress must target a specific subnet`);
    }
  }
}

export class DataLandingZone {

  private pipeline: CdkExpressPipeline;

  /* For direct access to stacks */
  public managementStack!: ManagementStack;
  public logStacks!: LogStacks;
  public auditStacks!: AuditStacks;

  public workloadGlobalStacks: WorkloadGlobalStack[] = [];
  public workloadRegionalStacks: WorkloadRegionalStack[] = [];

  public workloadGlobalNetworkConnectionsPhase1Stacks: WorkloadGlobalNetworkConnectionsPhase1Stack[] = [];

  public workloadGlobalNetworkConnectionsPhase2Stacks: WorkloadGlobalNetworkConnectionsPhase2Stack[] = [];
  public workloadRegionalNetworkConnectionsPhase2Stacks: WorkloadRegionalNetworkConnectionsPhase2Stack[] = [];

  public workloadGlobalNetworkConnectionsPhase3Stacks: WorkloadGlobalNetworkConnectionsPhase3Stack[] = [];
  public workloadRegionalNetworkConnectionsPhase3Stacks: WorkloadRegionalNetworkConnectionsPhase3Stack[] = [];

  private globalVariables: GlobalVariables = {
    dlzAccountNetworks: new DlzAccountNetworks(),
    ncp1: {
      vpcPeeringRoleKeys: [],
    },
    ncp2: {
      peeringConnections: {},
      ownerVpcIds: new DlzSsmReaderStackCache(),
      peeringRoleArns: new DlzSsmReaderStackCache(),
    },
    ncp3: {
      vpcPeeringConnectionIds: new DlzSsmReaderStackCache(),
      routeTablesSsmCache: new DlzSsmReaderStackCache(),
    },
  };

  constructor(private app: App, private props: DataLandingZoneProps) {

    validations(props);

    this.pipeline = new CdkExpressPipeline();

    this.managementStack = this.stageManagement();
    this.auditStacks = this.stageAudit();
    this.logStacks = this.stageLog();

    this.workloadGlobalStacks = this.stageWorkloadGlobalStacks();
    this.workloadRegionalStacks = this.stageWorkloadRegionalStacks();

    this.workloadGlobalNetworkConnectionsPhase1Stacks = this.stageWorkloadGlobalNetworkConnectionsPhase1Stacks();

    this.workloadGlobalNetworkConnectionsPhase2Stacks = this.stageWorkloadGlobalNetworkConnectionsPhase2Stack();
    this.workloadRegionalNetworkConnectionsPhase2Stacks = this.stageWorkloadRegionalNetworkConnectionsPhase2Stack();

    this.workloadGlobalNetworkConnectionsPhase3Stacks = this.stageWorkloadGlobalNetworkConnectionsPhase3Stack();
    this.workloadRegionalNetworkConnectionsPhase3Stacks = this.stageWorkloadRegionalNetworkConnectionsPhase3Stack();

    this.pipeline.synth(this.pipeline.waves, this.props.printDeploymentOrder);

    Tags.of(app).add('Owner', 'infra');
    Tags.of(app).add('Project', 'dlz');
    Tags.of(app).add('Environment', 'dlz');

    if (this.props.printReport !== false) {
      Report.printConsoleReport();
    }
    if (this.props.saveReport !== false) { Report.saveConsoleReport(); }
  }

  stageManagement() {
    const managementWave = this.pipeline.addWave('root--global');
    const managementStage = managementWave.addStage('management');

    const management = new ManagementStack(this.app, {
      stage: managementStage,
      name: { ou: 'root', account: 'management', stack: 'global', region: this.props.regions.global },
      env: {
        account: this.props.organization.root.accounts.management.accountId,
        region: this.props.regions.global,
      },
    },
    this.props);

    return management;
  };

  private stageLog() {
    const ou = 'security';
    const account = 'log';

    const waveGlobal = this.pipeline.addWave('security--log--global');
    const stageGlobal = waveGlobal.addStage('global');
    const logGlobal = new LogGlobalStack(this.app, {
      stage: stageGlobal,
      name: { ou, account, stack: 'global', region: this.props.regions.global },
      env: {
        account: this.props.organization.ous.security.accounts.log.accountId,
        region: this.props.regions.global,
      },
    });

    const waveRegional = this.pipeline.addWave('security--log--regional');
    const stageRegional = waveRegional.addStage('regional');
    const logRegionalStacks: AuditRegionalStack[] = [];
    for (const region of this.props.regions.regional) {
      const logRegional = new LogRegionalStack(this.app, {
        stage: stageRegional,
        name: { ou, account, stack: 'regional', region },
        env: {
          account: this.props.organization.ous.security.accounts.log.accountId,
          region: region,
        },
      });
      logRegionalStacks.push(logRegional);
    }

    return {
      global: logGlobal,
      regional: logRegionalStacks,
    };
  };

  private stageAudit() {
    const ou = 'security';
    const account = 'audit';

    const waveGlobal = this.pipeline.addWave('security--audit--global');
    const stageGlobal = waveGlobal.addStage('global');
    const auditGlobalStack = new AuditGlobalStack(this.app, {
      stage: stageGlobal,
      name: { ou, account, stack: 'global', region: this.props.regions.global },
      env: {
        account: this.props.organization.ous.security.accounts.audit.accountId,
        region: this.props.regions.global,
      },
    },
    this.props);

    const waveRegional = this.pipeline.addWave('security--audit--regional');
    const stageRegional = waveRegional.addStage('regional');
    const auditRegionalStacks: AuditRegionalStack[] = [];
    for (const region of this.props.regions.regional) {
      const auditRegional = new AuditRegionalStack(this.app, {
        stage: stageRegional,
        name: { ou, account, stack: 'regional', region: region },
        env: {
          account: this.props.organization.ous.security.accounts.audit.accountId,
          region: region,
        },
      });
      auditRegionalStacks.push(auditRegional);
    }

    return {
      global: auditGlobalStack,
      regional: auditRegionalStacks,
    };
  };

  private stageWorkloadGlobalStacks() {
    const ou = 'workloads';

    const wave = this.pipeline.addWave('workloads--base--global');
    const workloadGlobalStacks: WorkloadGlobalStack[] = [];
    const dlzAccountsMap = new Map<string, DLzAccount>();
    for (const dlzAccount of this.props.organization.ous.workloads.accounts) {
      if (dlzAccountsMap.has(dlzAccount.name)) {
        Annotations.of(this.app).addError(`Duplicate account name ${dlzAccount.name} in OU ${ou}`);
        continue;
      }
      dlzAccountsMap.set(dlzAccount.name, dlzAccount);
      const accountStage = wave.addStage(dlzAccount.name);
      const developGlobalStack = new WorkloadGlobalStack(this.app, {
        stage: accountStage,
        name: { ou, account: dlzAccount.name, stack: 'global', region: this.props.regions.global },
        env: {
          account: dlzAccount.accountId,
          region: this.props.regions.global,
        },
        dlzAccount,
        globalVariables: this.globalVariables,
      }, this.props);

      workloadGlobalStacks.push(developGlobalStack);
    }
    return workloadGlobalStacks;
  }
  private stageWorkloadRegionalStacks() {
    const ou = 'workloads';

    const wave = this.pipeline.addWave('workloads--base--regional');
    const workloadRegionalStacks: WorkloadRegionalStack[] = [];
    for (const dlzAccount of this.props.organization.ous.workloads.accounts) {
      const accountStage = wave.addStage(dlzAccount.name);
      for (const region of this.props.regions.regional) {
        const developGlobalStack = new WorkloadRegionalStack(this.app, {
          stage: accountStage,
          name: { ou, account: dlzAccount.name, stack: 'regional', region },
          env: {
            account: dlzAccount.accountId,
            region,
          },
          dlzAccount,
          globalVariables: this.globalVariables,
        }, this.props);
        workloadRegionalStacks.push(developGlobalStack);
      }
    }
    return workloadRegionalStacks;
  }

  private stageWorkloadGlobalNetworkConnectionsPhase1Stacks() {
    const ou = 'workloads';

    const waveGlobal = this.pipeline.addWave('workloads--ncp1--global');
    const workloadGlobalStacks: WorkloadGlobalNetworkConnectionsPhase1Stack[] = [];
    for (const dlzAccount of this.props.organization.ous.workloads.accounts) {
      const stage = waveGlobal.addStage(dlzAccount.name);
      const networkConnectionsPhase1Stack = new WorkloadGlobalNetworkConnectionsPhase1Stack(this.app, {
        stage,
        /* ncp1 abbreviation for NetworkConnectionsPhase1Stack */
        name: { ou, account: dlzAccount.name, stack: 'ncp1-global', region: this.props.regions.global },
        env: {
          account: dlzAccount.accountId,
          region: this.props.regions.global,
        },
        dlzAccount,
        globalVariables: this.globalVariables,
      }, this.props);

      workloadGlobalStacks.push(networkConnectionsPhase1Stack);
    }
    return workloadGlobalStacks;
  }

  private stageWorkloadGlobalNetworkConnectionsPhase2Stack() {
    const ou = 'workloads';

    const waveGlobal = this.pipeline.addWave('workloads--ncp2--global');
    const workloadGlobalStacks: WorkloadGlobalNetworkConnectionsPhase2Stack[] = [];
    for (const dlzAccount of this.props.organization.ous.workloads.accounts) {
      const stage = waveGlobal.addStage(dlzAccount.name);
      const networkConnectionsPhase2Stack = new WorkloadGlobalNetworkConnectionsPhase2Stack(this.app, {
        stage,
        /* ncp2 abbreviation for NetworkConnectionsPhase2Stack */
        name: { ou, account: dlzAccount.name, stack: 'ncp2-global', region: this.props.regions.global },
        env: {
          account: dlzAccount.accountId,
          region: this.props.regions.global,
        },
        dlzAccount,
        globalVariables: this.globalVariables,
      }, this.props);

      workloadGlobalStacks.push(networkConnectionsPhase2Stack);
    }
    return workloadGlobalStacks;
  }
  private stageWorkloadRegionalNetworkConnectionsPhase2Stack() {
    const ou = 'workloads';

    const waveRegional = this.pipeline.addWave('workloads--ncp2--regional');
    const workloadRegionalStacks: WorkloadRegionalNetworkConnectionsPhase2Stack[] = [];
    for (const dlzAccount of this.props.organization.ous.workloads.accounts) {
      const stage = waveRegional.addStage(dlzAccount.name);
      for (const region of this.props.regions.regional) {

        const workloadRegionalStack = new WorkloadRegionalNetworkConnectionsPhase2Stack(this.app, {
          stage,
          /* ncp2 abbreviation for NetworkConnectionsPhase2Stack */
          name: { ou, account: dlzAccount.name, stack: 'ncp2-regional', region },
          env: {
            account: dlzAccount.accountId,
            region: region,
          },
          dlzAccount,
          globalVariables: this.globalVariables,
        }, this.props);
        workloadRegionalStacks.push(workloadRegionalStack);
      }
    }
    return workloadRegionalStacks;
  }

  private stageWorkloadGlobalNetworkConnectionsPhase3Stack() {
    const ou = 'workloads';

    const waveGlobal = this.pipeline.addWave('workloads--ncp3--global');
    const workloadGlobalStacks: WorkloadGlobalNetworkConnectionsPhase3Stack[] = [];
    for (const dlzAccount of this.props.organization.ous.workloads.accounts) {
      const stage = waveGlobal.addStage(dlzAccount.name);
      const networkConnectionsPhase3Stack = new WorkloadGlobalNetworkConnectionsPhase3Stack(this.app, {
        stage,
        /* ncp3 abbreviation for NetworkConnectionsPhase3Stack */
        name: { ou, account: dlzAccount.name, stack: 'ncp3-global', region: this.props.regions.global },
        env: {
          account: dlzAccount.accountId,
          region: this.props.regions.global,
        },
        dlzAccount,
        globalVariables: this.globalVariables,
      }, this.props);

      workloadGlobalStacks.push(networkConnectionsPhase3Stack);
    }
    return workloadGlobalStacks;
  }
  private stageWorkloadRegionalNetworkConnectionsPhase3Stack() {
    const ou = 'workloads';

    const waveRegional = this.pipeline.addWave('workloads--ncp3--regional');
    const workloadRegionalStacks: WorkloadRegionalNetworkConnectionsPhase3Stack[] = [];
    for (const dlzAccount of this.props.organization.ous.workloads.accounts) {
      const stage = waveRegional.addStage(dlzAccount.name);
      for (const region of this.props.regions.regional) {

        const workloadRegionalStack = new WorkloadRegionalNetworkConnectionsPhase3Stack(this.app, {
          stage,
          /* ncp3 abbreviation for NetworkConnectionsPhase3Stack */
          name: { ou, account: dlzAccount.name, stack: 'ncp3-regional', region },
          env: {
            account: dlzAccount.accountId,
            region: region,
          },
          dlzAccount,
          globalVariables: this.globalVariables,
        }, this.props);
        workloadRegionalStacks.push(workloadRegionalStack);
      }
    }
    return workloadRegionalStacks;
  }
}

export default DataLandingZone;