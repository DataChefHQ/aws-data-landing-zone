import {App, Stack} from 'aws-cdk-lib';
import { ManagementStack } from './stacks';
import {LogGlobalStack} from "./stacks/organization/security/log/global-stack";
import {AuditGlobalStack} from "./stacks/organization/security/audit/global-stack";
import {LogRegionalStack} from "./stacks/organization/security/log/regional-stack";
import {AuditRegionalStack} from "./stacks/organization/security/audit/regional-stack";
import {DlzStack} from "./constructs";

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
export interface DLzAccounts {
  readonly management: DLzAccount;
  readonly log: DLzAccount;
  readonly audit: DLzAccount;
}

export interface DataLandingZoneProps {
  readonly localProfile: string;
  readonly accounts: DLzAccounts;
  readonly regions: DlzRegions;
}

type DeploymentOrder = {
  [wave: string]: {
    [stage: string]: DlzStack[]
  };
}

export interface LogStacks {
  global: LogGlobalStack;
  regional: LogGlobalStack[];
}

export interface AuditStacks {
  global: AuditGlobalStack;
  regional: AuditRegionalStack[];
}

export class DataLandingZone {
  public managementStack!: ManagementStack;
  public logStacks!: LogStacks;
  public auditStacks!: AuditStacks;

  constructor(app: App, props: DataLandingZoneProps) {

  const stageManagement = () =>
  {
    const management = new ManagementStack(app,{
      name: { ou: 'root', account: 'management', stack: 'global', region: props.regions.global },
      env: {
        account: props.accounts.management.accountId,
        region: props.regions.global,
      },
    });

    this.managementStack = management;

    return [
      this.managementStack,
    ];
  }

  const stageLog = () =>
  {
    const logGlobal = new LogGlobalStack(app,{
      name: { ou: 'security', account: 'log', stack: 'global', region: props.regions.global },
      env: {
        account: props.accounts.log.accountId,
        region: props.regions.global,
      },
    });

    const logRegionalStacks: AuditRegionalStack[] = [];
    for (const region of props.regions.regional) {
      const logRegional = new LogRegionalStack(app, {
        name: { ou: 'security', account: 'log', stack: 'regional', region },
        env: {
          account: props.accounts.log.accountId,
          region: region
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
  }

  const stageAudit = () =>
  {
    // ----------------------------- Audit Stacks -------------------------- //
    const auditGlobalStack = new AuditGlobalStack(app,{
      name: { ou: 'security', account: 'audit', stack: 'global', region: props.regions.global },
      env: {
        account: props.accounts.audit.accountId,
        region: props.regions.global,
      },
    });

    const auditRegionalStacks: AuditRegionalStack[] = [];
    for (const region of props.regions.regional) {
      const auditRegional = new AuditRegionalStack(app, {
        name: { ou: 'security', account: 'audit', stack: 'regional', region },
        env: {
          account: props.accounts.audit.accountId,
          region: region
        },
      });
      auditRegional.addDependency(auditGlobalStack);
      auditRegionalStacks.push(auditRegional);
    }
    // ---------------------------------------------------------------------- //

    this.auditStacks = {
      global: auditGlobalStack,
      regional: auditRegionalStacks,
    };

    return [
      this.auditStacks.global,
      ...this.auditStacks.regional
    ];
  }

  const deploymentOrder: DeploymentOrder = {
    'Management': {
      'Management': stageManagement()
    },
    'Security': {
      'Log': stageLog(),
      'Audit': stageAudit()
    }
  };

  console.log("")
  console.log("ORDER OF DEPLOYMENT")
  console.log("🌊 Waves  - Deployed sequentially");
  console.log("🔲 Stages - Deployed in parallel, all stages within a wave are deployed at the same time")
  console.log("📄 Stacks - Dependency driven, stacks are deployed in the order of their dependency within the stage " +
              "(stack dependency not visualized below")
  console.log("")
  for (const wave of Object.keys(deploymentOrder)) {
    console.log(`🌊 ${wave}`)
    for (const stage of  Object.keys(deploymentOrder[wave])) {
      console.log(`  🔲 ${stage}`)
      for (const stack of deploymentOrder[wave][stage]) {
        console.log(`    📄 ${stack.id}`)
      }
    }
  }
  console.log("")

    const waves = Object.keys(deploymentOrder).map(waveName => {
      const wave = deploymentOrder[waveName];
      const waveElement: { stages: {stacks: Stack[] }[] } = { stages: [] };
      for (const stage of Object.keys(wave)) {
        waveElement.stages.push({ stacks: deploymentOrder[waveName][stage] });
      }
      return waveElement;
    })

    for (let i = 1; i < waves.length; i++) {
      for (const stage of waves[i].stages) {
        // All the stacks in this stage needs to depend on all the stacks in the previous stage
        for (const dependantStage of waves[i - 1].stages) {
          for (const stageStack of stage.stacks) {
            for (const dependantStack of dependantStage.stacks) {
              // console.log(`> Stack ${stageStack.id} depends on ${dependantStack.id}`)
              stageStack.addDependency(dependantStack)
            }
          }
        }
      }
    }

  }
}

export default DataLandingZone;
