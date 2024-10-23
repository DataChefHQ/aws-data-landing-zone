import { App, Stack, Tags, Annotations } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { InstanceType } from 'aws-cdk-lib/aws-ec2/lib/instance-types';
import * as iam from 'aws-cdk-lib/aws-iam';
import {
  BudgetProps, DlzAccountNetworks,
  DlzControlTowerStandardControls,
  DlzStack,
  DlzStackProps, DlzVpcProps, IamIdentityCenterProps,
  SlackChannel,
} from './constructs';
import { DlzSsmReaderStackCache } from './constructs/dlz-ssm-reader/dlz-ssm-reader-stack-cache';
import { NetworkAddress } from './constructs/dlz-vpc/network-address';
import { DlzTag } from './constructs/organization-policies/tag-policy';
import { Report } from './lib/report';
import { ManagementStack, WorkloadGlobalNetworkConnectionsPhase1Stack } from './stacks';
import { AuditGlobalStack } from './stacks/organization/security/audit/global-stack';
import { AuditRegionalStack } from './stacks/organization/security/audit/regional-stack';
import { LogGlobalStack } from './stacks/organization/security/log/global-stack';
import { LogRegionalStack } from './stacks/organization/security/log/regional-stack';
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

export interface Network {
  readonly connections?: NetworkConnection;
  readonly nats?: NetworkNat[];
}


export interface DataLandingZoneProps {
  readonly localProfile: string;
  readonly organization: DLzOrganization;
  readonly regions: DlzRegions;

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

type DeploymentOrder = {
  [wave: string]: {
    [stage: string]: DlzStack[];
  };
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

function printConsoleDeploymentOrder(deploymentOrder: DeploymentOrder) {
  console.log('');
  console.log('ORDER OF DEPLOYMENT');
  console.log('🌊 Waves  - Deployed sequentially');
  console.log('🔲 Stages - Deployed in parallel, all stages within a wave are deployed at the same time');
  console.log('📄 Stacks - Dependency driven, stacks are deployed in the order of their dependency within the stage ' +
    '(stack dependency not visualized below');
  console.log('');
  for (const wave of Object.keys(deploymentOrder)) {
    console.log(`🌊 ${wave}`);
    for (const stage of Object.keys(deploymentOrder[wave])) {
      console.log(`  🔲 ${stage}`);
      for (const stack of deploymentOrder[wave][stage]) {
        console.log(`    📄 ${stack.id}`);
      }
    }
  }
  console.log('');
}

function validations(props: DataLandingZoneProps) {

  let allNetworkAdressVariants: NetworkAddress[] = [];
  for (const account of props.organization.ous.workloads.accounts) {
    allNetworkAdressVariants.push(new NetworkAddress(account.name));
    for (const vpc of account.vpcs || []) {
      allNetworkAdressVariants.push(new NetworkAddress(account.name, vpc.region));
      allNetworkAdressVariants.push(new NetworkAddress(account.name, vpc.region, vpc.name));
      for (const subnet of vpc.subnets) {
        allNetworkAdressVariants.push(new NetworkAddress(account.name, vpc.region, vpc.name, subnet.segment));
        allNetworkAdressVariants.push(new NetworkAddress(account.name, vpc.region, vpc.name, subnet.segment, subnet.name));
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
        ' can not be specified on a subnet level, segment is the lowest');
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
      if (!allowAccessFrom.segment) {
        throw new Error(`NAT (${nat.name}) 'allowAccessFrom' (${allowAccessFrom}) NetworkAddress must target ` +
          'a specific segment');
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
}

export class DataLandingZone {

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

    const deploymentOrder: DeploymentOrder =
    {
      ManagementWave: {
        ManagementStage: [this.managementStack],
      },

      LogGlobalWave: {
        GlobalStage: [this.logStacks.global],
      },
      LogRegionalWave: {
        RegionalStage: this.logStacks.regional,
      },
      AuditGlobalWave: {
        GlobalStage: [this.auditStacks.global],
      },
      AuditRegionalWave: {
        RegionalStage: this.auditStacks.regional,
      },

      WorkloadsGlobalWave: {
        GlobalStage: this.workloadGlobalStacks,
      },
      WorkloadsRegionalWave: {
        RegionalStage: this.workloadRegionalStacks,
      },

      WorkloadsGlobalNetworkConnectionsPhase1Wave: {
        GlobalStage: this.workloadGlobalNetworkConnectionsPhase1Stacks,
      },
      WorkloadRegionalNetworkConnectionsPhase2Stack: {
        GlobalStage: this.workloadGlobalNetworkConnectionsPhase2Stacks,
        RegionalStage: this.workloadRegionalNetworkConnectionsPhase2Stacks,
      },
      WorkloadRegionalNetworkConnectionsPhase3Stack: {
        GlobalStage: this.workloadGlobalNetworkConnectionsPhase3Stacks,
        RegionalStage: this.workloadRegionalNetworkConnectionsPhase3Stacks,
      },
    };


    const waves = Object.keys(deploymentOrder).map(waveName => {
      const wave = deploymentOrder[waveName];
      const waveElement: { stages: { stacks: Stack[] }[] } = { stages: [] };
      for (const stage of Object.keys(wave)) {
        waveElement.stages.push({ stacks: deploymentOrder[waveName][stage] });
      }
      return waveElement;
    });
    for (let i = 1; i < waves.length; i++) {
      for (const stage of waves[i].stages) {
        // All the stacks in this stage needs to depend on all the stacks in the previous stage
        for (const dependantStage of waves[i - 1].stages) {
          for (const stageStack of stage.stacks) {
            for (const dependantStack of dependantStage.stacks) {
              // console.log(`> Stack ${stageStack.id} depends on ${dependantStack.id}`)
              stageStack.addDependency(dependantStack);
            }
          }
        }
      }
    }

    Tags.of(app).add('Owner', 'infra');
    Tags.of(app).add('Project', 'dlz');
    Tags.of(app).add('Environment', 'dlz');

    if (this.props.printDeploymentOrder !== false) { printConsoleDeploymentOrder(deploymentOrder); }
    if (this.props.printDeploymentOrder !== false) { printConsoleDeploymentOrder(deploymentOrder); }
    if (this.props.printReport !== false) {
      Report.printConsoleReport();
    }
    if (this.props.saveReport !== false) { Report.saveConsoleReport(); }
    if (this.props.saveReport !== false) { Report.saveConsoleReport(); }
  }

  stageManagement() {
    const management = new ManagementStack(this.app, {
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

    const logGlobal = new LogGlobalStack(this.app, {
      name: { ou, account, stack: 'global', region: this.props.regions.global },
      env: {
        account: this.props.organization.ous.security.accounts.log.accountId,
        region: this.props.regions.global,
      },
    });

    const logRegionalStacks: AuditRegionalStack[] = [];
    for (const region of this.props.regions.regional) {
      const logRegional = new LogRegionalStack(this.app, {
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
    const auditGlobalStack = new AuditGlobalStack(this.app, {
      name: { ou, account, stack: 'global', region: this.props.regions.global },
      env: {
        account: this.props.organization.ous.security.accounts.audit.accountId,
        region: this.props.regions.global,
      },
    },
    this.props);

    const auditRegionalStacks: AuditRegionalStack[] = [];
    for (const region of this.props.regions.regional) {
      const auditRegional = new AuditRegionalStack(this.app, {
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

    const workloadGlobalStacks: WorkloadGlobalStack[] = [];
    const dlzAccountsMap = new Map<string, DLzAccount>();
    for (const dlzAccount of this.props.organization.ous.workloads.accounts) {
      if (dlzAccountsMap.has(dlzAccount.name)) {
        Annotations.of(this.app).addError(`Duplicate account name ${dlzAccount.name} in OU ${ou}`);
        continue;
      }
      dlzAccountsMap.set(dlzAccount.name, dlzAccount);
      const developGlobalStack = new WorkloadGlobalStack(this.app, {
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

    const workloadRegionalStacks: WorkloadRegionalStack[] = [];
    for (const dlzAccount of this.props.organization.ous.workloads.accounts) {
      for (const region of this.props.regions.regional) {
        const developGlobalStack = new WorkloadRegionalStack(this.app, {
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

    const workloadGlobalStacks: WorkloadGlobalNetworkConnectionsPhase1Stack[] = [];
    for (const dlzAccount of this.props.organization.ous.workloads.accounts) {
      const networkConnectionsPhase1Stack = new WorkloadGlobalNetworkConnectionsPhase1Stack(this.app, {
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

    const workloadGlobalStacks: WorkloadGlobalNetworkConnectionsPhase2Stack[] = [];
    for (const dlzAccount of this.props.organization.ous.workloads.accounts) {
      const networkConnectionsPhase2Stack = new WorkloadGlobalNetworkConnectionsPhase2Stack(this.app, {
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

    const workloadRegionalStacks: WorkloadRegionalNetworkConnectionsPhase2Stack[] = [];
    for (const dlzAccount of this.props.organization.ous.workloads.accounts) {
      for (const region of this.props.regions.regional) {

        const workloadRegionalStack = new WorkloadRegionalNetworkConnectionsPhase2Stack(this.app, {
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

    const workloadGlobalStacks: WorkloadGlobalNetworkConnectionsPhase3Stack[] = [];
    for (const dlzAccount of this.props.organization.ous.workloads.accounts) {
      const networkConnectionsPhase3Stack = new WorkloadGlobalNetworkConnectionsPhase3Stack(this.app, {
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

    const workloadRegionalStacks: WorkloadRegionalNetworkConnectionsPhase3Stack[] = [];
    for (const dlzAccount of this.props.organization.ous.workloads.accounts) {
      for (const region of this.props.regions.regional) {

        const workloadRegionalStack = new WorkloadRegionalNetworkConnectionsPhase3Stack(this.app, {
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
