import { Annotations, App, Tags } from 'aws-cdk-lib';
import { CdkExpressPipeline } from 'cdk-express-pipeline';
import { DlzAccountNetworks } from './constructs';
import { DlzSsmReaderStackCache } from './constructs/dlz-ssm-reader/dlz-ssm-reader-stack-cache';
import { NetworkAddress } from './constructs/dlz-vpc/network-address';
import { AuditStacks, DataLandingZoneProps, DLzAccount, GlobalVariables, LogStacks } from './data-landing-zone-types';
import { Report } from './lib/report';
import { ManagementStack, WorkloadGlobalNetworkConnectionsPhase1Stack } from './stacks';
import { AuditGlobalStack } from './stacks/organization/security/audit/global-stack';
import { WorkloadGlobalStack } from './stacks/organization/workloads/base/global-stack';
import { WorkloadRegionalStack } from './stacks/organization/workloads/base/regional-stack';
import {
  WorkloadGlobalDataServicesPhase1Stack,
} from './stacks/organization/workloads/data-services-phase-1-stack/global-stack';
import {
  WorkloadRegionalDataServicesPhase1Stack,
} from './stacks/organization/workloads/data-services-phase-1-stack/regional-stack';
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

  public workloadGlobalDataServicesPhase1Stacks: WorkloadGlobalDataServicesPhase1Stack[] = [];
  public workloadRegionalDataServicesPhase1Stacks: WorkloadRegionalDataServicesPhase1Stack[] = [];

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

    this.workloadGlobalDataServicesPhase1Stacks = this.stageWorkloadGlobalDataServicesPhase1Stack();
    this.workloadRegionalDataServicesPhase1Stacks = this.stageWorkloadRegionalDataServicesPhase1Stack();

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
    // const ou = 'security';
    // const account = 'log';
    // const waveGlobal = this.pipeline.addWave('security--log--global');
    // const stageGlobal = waveGlobal.addStage('global');
    // const logGlobal = new LogGlobalStack(this.app, {
    //   stage: stageGlobal,
    //   name: { ou, account, stack: 'global', region: this.props.regions.global },
    //   env: {
    //     account: this.props.organization.ous.security.accounts.log.accountId,
    //     region: this.props.regions.global,
    //   },
    // });
    //
    // const waveRegional = this.pipeline.addWave('security--log--regional');
    // const stageRegional = waveRegional.addStage('regional');
    // const logRegionalStacks: AuditRegionalStack[] = [];
    // for (const region of this.props.regions.regional) {
    //   const logRegional = new LogRegionalStack(this.app, {
    //     stage: stageRegional,
    //     name: { ou, account, stack: 'regional', region },
    //     env: {
    //       account: this.props.organization.ous.security.accounts.log.accountId,
    //       region: region,
    //     },
    //   });
    //   logRegionalStacks.push(logRegional);
    // }

    return {
      // global: logGlobal,
      // regional: logRegionalStacks,
    } satisfies LogStacks;
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

    // const waveRegional = this.pipeline.addWave('security--audit--regional');
    // const stageRegional = waveRegional.addStage('regional');
    // const auditRegionalStacks: AuditRegionalStack[] = [];
    // for (const region of this.props.regions.regional) {
    //   const auditRegional = new AuditRegionalStack(this.app, {
    //     stage: stageRegional,
    //     name: { ou, account, stack: 'regional', region: region },
    //     env: {
    //       account: this.props.organization.ous.security.accounts.audit.accountId,
    //       region: region,
    //     },
    //   });
    //   auditRegionalStacks.push(auditRegional);
    // }

    return {
      global: auditGlobalStack,
    } satisfies AuditStacks;
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
      const accountStage = wave.addStage(this.accountStageName(dlzAccount));
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
      const accountStage = wave.addStage(this.accountStageName(dlzAccount));
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
      const stage = waveGlobal.addStage(this.accountStageName(dlzAccount));
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
      const stage = waveGlobal.addStage(this.accountStageName(dlzAccount));
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
      const stage = waveRegional.addStage(this.accountStageName(dlzAccount));
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
      const stage = waveGlobal.addStage(this.accountStageName(dlzAccount));
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
      const stage = waveRegional.addStage(this.accountStageName(dlzAccount));
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

  private stageWorkloadGlobalDataServicesPhase1Stack() {
    const ou = 'workloads';

    const waveGlobal = this.pipeline.addWave('workloads--dsp1--global');
    const stacks: WorkloadGlobalDataServicesPhase1Stack[] = [];
    for (const dlzAccount of this.props.organization.ous.workloads.accounts) {
      const stage = waveGlobal.addStage(this.accountStageName(dlzAccount));
      const stack = new WorkloadGlobalDataServicesPhase1Stack(this.app, {
        stage,
        /* ncp3 abbreviation for NetworkConnectionsPhase3Stack */
        name: { ou, account: dlzAccount.name, stack: 'dsp1-global', region: this.props.regions.global },
        env: {
          account: dlzAccount.accountId,
          region: this.props.regions.global,
        },
        dlzAccount,
        globalVariables: this.globalVariables,
      });

      stacks.push(stack);
    }
    return stacks;
  }
  private stageWorkloadRegionalDataServicesPhase1Stack() {
    const ou = 'workloads';

    const waveRegional = this.pipeline.addWave('workloads--dsp1--regional');
    const stacks: WorkloadRegionalDataServicesPhase1Stack[] = [];
    for (const dlzAccount of this.props.organization.ous.workloads.accounts) {
      const stage = waveRegional.addStage(this.accountStageName(dlzAccount));
      for (const region of this.props.regions.regional) {
        const stack = new WorkloadRegionalDataServicesPhase1Stack(this.app, {
          stage,
          /* ncp3 abbreviation for NetworkConnectionsPhase3Stack */
          name: { ou, account: dlzAccount.name, stack: 'dsp1-regional', region },
          env: {
            account: dlzAccount.accountId,
            region: region,
          },
          dlzAccount,
          globalVariables: this.globalVariables,
        });
        stacks.push(stack);
      }
    }
    return stacks;
  }


  private accountStageName(dlzAccount: DLzAccount) {
    return `${dlzAccount.type}--${dlzAccount.name}`;
  }
}

export default DataLandingZone;