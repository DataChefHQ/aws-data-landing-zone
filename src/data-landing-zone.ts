import { App, Stack, Tags } from 'aws-cdk-lib';
import {
  BudgetProps,
  DlzControlTowerStandardControls,
  DlzStack,
  DlzStackProps,
  DlzVpcProps,
  SlackChannel,
} from './constructs';
import { IdentityStoreUserProps } from './constructs/identity-store-user';
import { DlzTag } from './constructs/organization-policies/tag-policy';
import { Report } from './lib/report';
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

export interface IamIdentityCenterIdpUser {
  readonly name: string;
  readonly userId: string;
}

export interface IamIdentityCenterPermissionSetProps {
  readonly name: string;
  readonly description?: string;
  readonly inlinePolicy?: any;
  readonly managedPolicyArns?: string[];
}

export interface IamIdentityCenterAccessGroupProps {
  readonly name: string;
  readonly users?: string[];
  readonly permissionSet: string;
  readonly accounts: string[];
  readonly description?: string;
}

export interface IamIdentityCenter {
  readonly iamIdentityCenterArn?: string;
  readonly iamIdentityCenterId: string;
  readonly identityStoreId: string;
  readonly awsSsoUsers?: IdentityStoreUserProps[];
  readonly idpUsers?: IamIdentityCenterIdpUser[];
  readonly permissionSets?: IamIdentityCenterPermissionSetProps[];
  readonly accessGroups?: IamIdentityCenterAccessGroupProps[];
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
  readonly vpcs: DlzVpcProps[];
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

export interface IamIdentityCenterIdpUser {
  readonly name: string;
  readonly userId: string;
}

export interface IamIdentityCenterPermissionSetProps {
  readonly name: string;
  readonly description?: string;
  readonly inlinePolicy?: any;
  readonly managedPolicyArns?: string[];
}

export interface IamIdentityCenterAccessGroupProps {
  readonly name: string;
  readonly users?: string[];
  readonly permissionSet: string;
  readonly accounts: string[];
  readonly description?: string;
}

export interface IamIdentityCenter {
  readonly iamIdentityCenterArn?: string;
  readonly iamIdentityCenterId: string;
  readonly identityStoreId: string;
  readonly awsSsoUsers?: IdentityStoreUserProps[];
  readonly idpUsers?: IamIdentityCenterIdpUser[];
  readonly permissionSets?: IamIdentityCenterPermissionSetProps[];
  readonly accessGroups?: IamIdentityCenterAccessGroupProps[];
}

export interface DataLandingZoneProps {
  readonly localProfile: string;
  readonly organization: DLzOrganization;
  readonly regions: DlzRegions;

  /**
   * IAM Identity Center configuration
   */
  readonly iamIdentityCenter?: IamIdentityCenter;

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

export interface DevelopAccountStacks {
  readonly accountId: string;
  readonly name: string;
  readonly stacks: DevelopStacks;
}

export interface ProductionStacks {
  readonly global: ProductionGlobalStack;
  readonly regional: ProductionRegionalStack[];
}

export interface ProductionAccountStacks {
  readonly accountId: string;
  readonly name: string;
  readonly stacks: ProductionStacks;
}

export interface WorkloadAccountProps extends DlzStackProps {
  readonly dlzAccount: DLzAccount;
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

export class DataLandingZone {
  public managementStack!: ManagementStack;
  public logStacks!: LogStacks;
  public auditStacks!: AuditStacks;
  public developAccountStacks: DevelopAccountStacks[] = [];
  public productionAccountStacks: ProductionAccountStacks[] = [];

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
        Develop: this.stageWorkloadDevelopType(),
        Production: this.stageWorkloadProductionType(),
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

  stageWorkloadDevelopType() {
    const ou = 'workloads';

    const developAccounts = this.props.organization.ous.workloads.accounts
      .filter(account => account.type === DlzAccountType.DEVELOP);

    const developStacks: DlzStack[] = [];
    for (const dlzAccount of developAccounts) {
      const developGlobalStack = new DevelopGlobalStack(this.app, {
        name: { ou, account: dlzAccount.name, stack: 'global', region: this.props.regions.global },
        env: {
          account: dlzAccount.accountId,
          region: this.props.regions.global,
        },
        dlzAccount,
      },
      this.props);

      const developRegionalStacks: DevelopRegionalStack[] = [];
      for (const region of this.props.regions.regional) {
        const developRegional = new DevelopRegionalStack(this.app, {
          name: { ou, account: dlzAccount.name, stack: 'regional', region: region },
          env: {
            account: dlzAccount.accountId,
            region: region,
          },
          dlzAccount,
        },
        this.props);
        developRegional.addDependency(developGlobalStack);
        developRegionalStacks.push(developRegional);
      }

      this.developAccountStacks.push({
        accountId: dlzAccount.accountId,
        name: dlzAccount.name,
        stacks: {
          global: developGlobalStack,
          regional: developRegionalStacks,
        },
      });

      developStacks.push(developGlobalStack);
      developStacks.push(...developRegionalStacks);
    }

    return developStacks;
  };

  stageWorkloadProductionType() {
    const ou = 'workloads';

    const productionAccounts = this.props.organization.ous.workloads.accounts
      .filter(account => account.type === DlzAccountType.PRODUCTION);

    const productionStacks: DlzStack[] = [];
    for (const dlzAccount of productionAccounts) {
      const productionGlobalStack = new ProductionGlobalStack(this.app, {
        name: { ou, account: dlzAccount.name, stack: 'global', region: this.props.regions.global },
        env: {
          account: dlzAccount.accountId,
          region: this.props.regions.global,
        },
        dlzAccount,
      },
      this.props);

      const productionRegionalStacks: ProductionRegionalStack[] = [];
      for (const region of this.props.regions.regional) {
        const productionRegional = new ProductionRegionalStack(this.app, {
          name: { ou, account: dlzAccount.name, stack: 'regional', region: region },
          env: {
            account: dlzAccount.accountId,
            region: region,
          },
          dlzAccount,
        },
        this.props);
        productionRegional.addDependency(productionGlobalStack);
        productionRegionalStacks.push(productionRegional);
      }

      this.productionAccountStacks.push({
        accountId: dlzAccount.accountId,
        name: dlzAccount.name,
        stacks: {
          global: productionGlobalStack,
          regional: productionRegionalStacks,
        },
      });

      productionStacks.push(productionGlobalStack);
      productionStacks.push(...productionRegionalStacks);
    }

    return productionStacks;
  };
}

export default DataLandingZone;
