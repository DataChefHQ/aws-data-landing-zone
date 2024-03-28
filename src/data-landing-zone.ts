import { App, Stack } from 'aws-cdk-lib';
import { DlzStack } from './constructs';
import { ManagementStack } from './stacks';
import { AuditGlobalStack } from './stacks/organization/security/audit/global-stack';
import { AuditRegionalStack } from './stacks/organization/security/audit/regional-stack';
import { LogGlobalStack } from './stacks/organization/security/log/global-stack';
import { LogRegionalStack } from './stacks/organization/security/log/regional-stack';
import { DevelopGlobalStack } from './stacks/organization/workloads/develop/global-stack';
import { DevelopRegionalStack } from './stacks/organization/workloads/develop/regional-stack';
import { ProductionGlobalStack } from './stacks/organization/workloads/production/global-stack';
import { ProductionRegionalStack } from './stacks/organization/workloads/production/regional-stack';

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

export interface DLzAccount {
  readonly accountId: string;
}

export enum Ou {
  SECURITY = 'security',
  WORKLOADS = 'workloads',
  SUSPENDED = 'suspended',
}

export interface OrgRootAccounts {
  readonly management: DLzAccount;
}

export interface OrgOuSecurityAccounts {
  readonly log: DLzAccount;
  readonly audit: DLzAccount;
}
export interface OrgOuSecurity {
  readonly ouId: string;
  readonly accounts: OrgOuSecurityAccounts;
}

export interface OrgOuSecurityWorkloads {
  readonly develop: DLzAccount;
  readonly production: DLzAccount;
}
export interface OrgOuWorkloads {
  readonly ouId: string;
  readonly accounts: OrgOuSecurityWorkloads;
}

export interface OrgOuSuspended {
  readonly ouId: string;
}
export interface OrgOus {
  readonly security: OrgOuSecurity;
  readonly workloads: OrgOuWorkloads;
  readonly suspended: OrgOuSuspended;
}

export interface DLzOrganization {
  readonly organizationId: string;
  readonly rootAccounts: OrgRootAccounts;
  readonly ous: OrgOus;
}

export interface DataLandingZoneProps {
  readonly localProfile: string;
  readonly organization: DLzOrganization;
  readonly regions: DlzRegions;
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

export interface DevelopStacks {
  readonly global: DevelopGlobalStack;
  readonly regional: DevelopRegionalStack[];
}

export interface ProductionStacks {
  readonly global: ProductionGlobalStack;
  readonly regional: ProductionRegionalStack[];
}


export class DataLandingZone {
  public managementStack!: ManagementStack;
  public logStacks!: LogStacks;
  public auditStacks!: AuditStacks;
  public developStacks!: DevelopStacks;
  public productionStacks!: ProductionStacks;

  constructor(private app: App, private props: DataLandingZoneProps) {

    const deploymentOrder: DeploymentOrder = {
      Management: {
        Management: this.stageManagement(),
      },
      Security: {
        Log: this.stageLog(),
        Audit: this.stageAudit(),
      },
      WorkloadsSandBoxesSuspended: {
        Develop: this.stageDevelop(),
        Production: this.stageProduction(),
      },
    };

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

    const waves = Object.keys(deploymentOrder).map(waveName => {
      const wave = deploymentOrder[waveName];
      const waveElement: { stages: {stacks: Stack[] }[] } = { stages: [] };
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

  }

  stageManagement() {
    const management = new ManagementStack(this.app, {
      name: { ou: 'root', account: 'management', stack: 'global', region: this.props.regions.global },
      env: {
        account: this.props.organization.rootAccounts.management.accountId,
        region: this.props.regions.global,
      },
    },
    this.props);

    this.managementStack = management;

    return [
      this.managementStack,
    ];
  };

  stageLog() {
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
      logRegional.addDependency(logGlobal);
      logRegionalStacks.push(logRegional);
    }

    this.logStacks = {
      global: logGlobal,
      regional: logRegionalStacks,
    };

    return [
      this.logStacks.global,
      ...this.logStacks.regional,
    ];
  };

  stageAudit() {
    const ou = 'security';
    const account = 'audit';
    const auditGlobalStack = new AuditGlobalStack(this.app, {
      name: { ou, account, stack: 'global', region: this.props.regions.global },
      env: {
        account: this.props.organization.ous.security.accounts.audit.accountId,
        region: this.props.regions.global,
      },
    });

    const auditRegionalStacks: AuditRegionalStack[] = [];
    for (const region of this.props.regions.regional) {
      const auditRegional = new AuditRegionalStack(this.app, {
        name: { ou, account, stack: 'regional', region: region },
        env: {
          account: this.props.organization.ous.security.accounts.audit.accountId,
          region: region,
        },
      });
      auditRegional.addDependency(auditGlobalStack);
      auditRegionalStacks.push(auditRegional);
    }

    this.auditStacks = {
      global: auditGlobalStack,
      regional: auditRegionalStacks,
    };

    return [
      this.auditStacks.global,
      ...this.auditStacks.regional,
    ];
  };

  stageDevelop() {
    const ou = 'workloads';
    const account = 'develop';

    const developGlobalStack = new DevelopGlobalStack(this.app, {
      name: { ou, account, stack: 'global', region: this.props.regions.global },
      env: {
        account: this.props.organization.ous.workloads.accounts.develop.accountId,
        region: this.props.regions.global,
      },
    });

    const developRegionalStacks: DevelopRegionalStack[] = [];
    for (const region of this.props.regions.regional) {
      const developRegional = new DevelopRegionalStack(this.app, {
        name: { ou, account, stack: 'regional', region: region },
        env: {
          account: this.props.organization.ous.workloads.accounts.develop.accountId,
          region: region,
        },
      });
      developRegional.addDependency(developGlobalStack);
      developRegionalStacks.push(developRegional);
    }

    this.developStacks = {
      global: developGlobalStack,
      regional: developRegionalStacks,
    };

    return [
      this.developStacks.global,
      ...this.developStacks.regional,
    ];
  };

  stageProduction() {
    const ou = 'workloads';
    const account = 'production';

    const productionGlobalStack = new ProductionGlobalStack(this.app, {
      name: { ou, account, stack: 'global', region: this.props.regions.global },
      env: {
        account: this.props.organization.ous.workloads.accounts.production.accountId,
        region: this.props.regions.global,
      },
    });

    const productionRegionalStacks: ProductionRegionalStack[] = [];
    for (const region of this.props.regions.regional) {
      const productionRegional = new ProductionRegionalStack(this.app, {
        name: { ou, account, stack: 'regional', region: region },
        env: {
          account: this.props.organization.ous.workloads.accounts.production.accountId,
          region: region,
        },
      });
      productionRegional.addDependency(productionGlobalStack);
      productionRegionalStacks.push(productionRegional);
    }


    this.productionStacks = {
      global: productionGlobalStack,
      regional: productionRegionalStacks,
    };

    return [
      this.productionStacks.global,
      ...this.productionStacks.regional,
    ];
  };
}

export default DataLandingZone;
