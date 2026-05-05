import * as assert from 'assert';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as organizations from 'aws-cdk-lib/aws-organizations';
import { Construct } from 'constructs';
import {
  DlzControlTowerEnabledControl,
  IDlzControlTowerControl,
} from '../../../constructs/dlz-control-tower-control';
import { DlzAccountBudgets } from '../../../constructs/dlz-account-budgets';
import { DlzCostAnomalyDetection } from '../../../constructs/dlz-cost-anomaly-detection';
import { DLZ_CUR_DEFAULTS, DlzCurExport } from '../../../constructs/dlz-cur';
import { GuardDutyDelegatedAdmin } from '../../../constructs/dlz-guardduty';
import { MacieDelegatedAdmin } from '../../../constructs/dlz-macie';
import {
  AccountChatbots,
  DlzBudget,
  ControlTowerControlMappings,
  DlzStack,
  DlzStackProps, SlackChannel,
} from '../../../constructs/index';
import {
  DlzServiceControlPolicy,
  ScpDenyIamWithoutPermissionsBoundary,
  ScpDenyServiceActions,
  ScpFinOpsAccountBaseline,
  ScpMerge,
} from '../../../constructs/organization-policies/index';
import { DlzTagPolicy } from '../../../constructs/organization-policies/tag-policy';
import {
  DataLandingZoneProps,
  DlzAccountType,
  GlobalVariables,
  Ou,
  Region,
  ScpStatementsByAccountType,
} from '../../../data-landing-zone-types';
import { PropsOrDefaults } from '../../../defaults';
import { limitCfnExecutions } from '../../../lib/cdk-utils';
import { Report } from '../../../lib/report';

export interface ManagementGlobalStackProps extends DlzStackProps {
  readonly globalVariables: GlobalVariables;
}

export class ManagementGlobalStack extends DlzStack {

  constructor(scope: Construct, private stackProps: ManagementGlobalStackProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    this.rootControls();
    this.iamPermissionBoundary();

    this.workloadAccountsOrgPolicies();
    this.suspendedOuPolicies();

    if (this.props.organization.ous.sharedServices?.accounts.finOps) {
      this.finOpsAccountHardening();
    }

    if (this.props.finOps?.budgets && this.props.finOps.budgets.length > 0) {
      this.budgets();
    }

    if (this.props.finOps?.accountBudgets) {
      this.accountBudgets();
    }

    if (this.props.finOps?.costAnomalyDetection) {
      this.costAnomalyDetection();
    }

    if (this.props.finOps?.cur) {
      this.curExport();
    }

    if (this.props.guardDuty) {
      this.guardDuty();
    }

    if (this.props.macie && this.props.macie.enabled !== false) {
      this.macie();
    }

    if (this.props.deploymentPlatform?.gitHub) {
      this.deploymentPlatformGitHub();
    }
  }

  /**
  * IAM Policy Permission Boundary
 */
  iamPermissionBoundary() {
    if (this.props.iamPolicyPermissionBoundary) {
      const ouId = this.props.organization.ous.workloads.ouId;
      const boundaryPolicy = new DlzServiceControlPolicy(this, 'IamPolicyPermissionBoundaryPolicy', {
        name: 'IamPolicyPermissionBoundaryPolicy',
        description: 'Deny all IAM policy creation/modification unless permissions boundary is applied',
        targetIds: [ouId],
        statements: ScpDenyIamWithoutPermissionsBoundary.statements(),
      });
      Report.addReportForOuAccountRegions(
        this.props.organization.ous.workloads,
        this.props.regions,
        boundaryPolicy.reportResource);
    }
  }

  /**
   * Control Tower Controls applied on all OUs
   */
  private rootControls() {
    const allOus = [Ou.SECURITY, Ou.WORKLOADS];
    console.assert(this.props.regions.global === Region.EU_WEST_1);

    const standardControls = ControlTowerControlMappings.standardControl();
    const selectedControlNames = PropsOrDefaults.getRootControls(this.props);
    const selectedControls: IDlzControlTowerControl[] = [];
    for (const controlName of selectedControlNames) {
      selectedControls.push(standardControls[controlName]);
    }

    const enabledControls: Construct[] = [];
    for (const control of selectedControls) {
      for (const ou of allOus) {
        if (ou === Ou.SECURITY && !DlzControlTowerEnabledControl.canBeAppliedToSecurityOU(control)) {
          cdk.Annotations.of(this).addInfo(`Skipping control ${control.controlFriendlyName} for the Security OU, not supported.`);
          continue;
        }

        const enableControl = new DlzControlTowerEnabledControl(this,
          this.resourceName(control.controlFriendlyName + ou), {
            controlTowerAccountId: this.props.organization.root.accounts.management.accountId,
            organizationId: this.props.organization.organizationId,
            controlTowerRegion: this.props.regions.global,
            appliedOu: this.props.organization.ous[ou].ouId,
            control: control,
          });

        enabledControls.push(enableControl.control);

        if (ou === Ou.SECURITY) {
          Report.addReportForSecurityOuAccountRegions(
            this.props.organization.ous[ou],
            this.props.regions,
            enableControl.reportResource,
          );
        } else {
          Report.addReportForOuAccountRegions(
            this.props.organization.ous[ou],
            this.props.regions,
            enableControl.reportResource,
          );
        }
      }
    }
    limitCfnExecutions(enabledControls, 10);
  }

  /** Per-account SCPs and tag policies. Tiers: baseline -> account-type -> per-account (additive). */
  workloadAccountsOrgPolicies() {
    const tags = PropsOrDefaults.getOrganizationTags(this.props);
    const baselineStatements = PropsOrDefaults.getScpBaseline(this.props);
    const accountTypeStatements = this.resolveScpStatementsByAccountType(this.props.scpStatementsByAccountType);

    const sortedAccounts = [...this.props.organization.ous.workloads.accounts]
      .sort((a, b) => a.name.localeCompare(b.name));

    const previousPolicies: organizations.CfnPolicy[] = [];

    for (const dlzAccount of sortedAccounts) {
      const statements = ScpMerge.resolve({
        baseline: baselineStatements,
        accountTypeExtras: accountTypeStatements[dlzAccount.type] ?? [],
        accountExtras: dlzAccount.scpStatements ?? [],
      });
      ScpMerge.validate(dlzAccount.name, statements, 1);

      const dlzScp = new DlzServiceControlPolicy(this,
        this.resourceName(`scp-${dlzAccount.name}-account`), {
          name: this.resourceName(`scp-${dlzAccount.name}-account`),
          description: `SCP statements applied to the ${dlzAccount.name} account`,
          targetIds: [dlzAccount.accountId],
          statements: statements,
        });
      const dlzTagPolicy = new DlzTagPolicy(this,
        this.resourceName(`tag-policy-${dlzAccount.name}-account`), {
          name: this.resourceName(`tag-policy-${dlzAccount.name}-account`),
          description: `Tag policy for the ${dlzAccount.name} account`,
          targetIds: [dlzAccount.accountId],
          policyTags: tags,
        });

      Report.addReportForAccountRegion(dlzAccount.name, '*', dlzScp.reportResource);
      Report.addReportForAccountRegion(dlzAccount.name, '*', dlzTagPolicy.reportResource);

      for (const prev of previousPolicies) {
        dlzScp.policy.node.addDependency(prev);
        dlzTagPolicy.policy.node.addDependency(prev);
      }
      previousPolicies.length = 0;
      previousPolicies.push(dlzScp.policy, dlzTagPolicy.policy);
    }
  }

  private resolveScpStatementsByAccountType(
    config: ScpStatementsByAccountType | undefined,
  ): Record<DlzAccountType, iam.PolicyStatement[]> {
    return {
      [DlzAccountType.DEVELOP]: config?.development ?? [],
      [DlzAccountType.PRODUCTION]: config?.production ?? [],
    };
  }

  /**
   * Service Control Policies and Tag Policies  applied at the OU level because we won't need any customizations per account
   */
  suspendedOuPolicies() {
    new DlzServiceControlPolicy(this,
      this.resourceName('scp-suspended-ou'), {
        name: this.resourceName('scp-suspended-ou'),
        description: 'SCP statements applied to the suspended OU',
        targetIds: [
          this.props.organization.ous.suspended.ouId,
        ],
        statements: [
          ScpDenyServiceActions.statement(['*']),
        ],
      });
  }

  budgets() {
    const budgets = this.props.finOps!.budgets!;
    const budgetSlackChannels: SlackChannel[] = budgets
      .filter(budget => budget.subscribers.slacks)
      .flatMap(budget => budget.subscribers.slacks!);

    const denyAllPolicy = new iam.ManagedPolicy(this, this.resourceName('deny-all-guardrail-policies'), {
      managedPolicyName: this.resourceName('deny-all-guardrail-policies'),
      description: 'Deny all guardrail policies',
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.DENY,
          actions: ['*'],
          resources: ['*'],
        }),
      ],
    });

    for (const slackChannel of budgetSlackChannels) {
      const id = this.resourceName(`slack-bot-${slackChannel.slackWorkspaceId}-${slackChannel.slackChannelId}`);
      if (!AccountChatbots.existsSlackChannel(this, slackChannel)) {
        AccountChatbots.addSlackChannel(this, id, {
          ...slackChannel,
          guardrailPolicies: [
            denyAllPolicy,
          ],
        });
      }
    }

    for (const budget of budgets) {
      new DlzBudget(this, this.resourceName(`budget-${budget.name}`), budget, this.stackProps.globalVariables.budgetSnsCache);
    }
  }

  /**
   * GuardDuty organization enablement and delegated admin designation
   */
  private guardDuty() {
    const auditAccountId = this.props.organization.ous.security.accounts.audit.accountId;
    const managementAccountId = this.props.organization.root.accounts.management.accountId;
    const guardDutyAdmin = new GuardDutyDelegatedAdmin(this, this.resourceName('guardduty-delegated-admin'), {
      managementAccountId,
      auditAccountId,
    });
    Report.addReportForAccountRegion(
      'management',
      this.props.regions.global,
      guardDutyAdmin.reportResource,
    );
  }

  /**
   * Macie organization enablement and delegated admin designation
   */
  private macie() {
    const auditAccountId = this.props.organization.ous.security.accounts.audit.accountId;
    const managementAccountId = this.props.organization.root.accounts.management.accountId;
    const macieAdmin = new MacieDelegatedAdmin(this, this.resourceName('macie-delegated-admin'), {
      managementAccountId,
      auditAccountId,
    });
    Report.addReportForAccountRegion(
      'management',
      this.props.regions.global,
      macieAdmin.reportResource,
    );
  }

  deploymentPlatformGitHub() {
    const githubProvider = new iam.OpenIdConnectProvider(this, this.resourceName('git-hub-provider'), {
      url: 'https://token.actions.githubusercontent.com',
      clientIds: ['sts.amazonaws.com'],
    });

    assert.ok(this.props.deploymentPlatform?.gitHub?.references);
    const gitReferences = this.props.deploymentPlatform?.gitHub?.references.map(r => `repo:${r.owner}/${r.repo}:${r.filter ?? '*'}`);

    const conditions: iam.Conditions = {
      StringEquals: { 'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com' },
      StringLike: {
        ['token.actions.githubusercontent.com:sub']: gitReferences,
      },
    };

    const role = new iam.Role(this, this.resourceName('git-hub-deploy-role'), {
      roleName: this.resourceName('git-hub-deploy-role'),
      assumedBy: new iam.WebIdentityPrincipal(githubProvider.openIdConnectProviderArn, conditions),
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')],
      inlinePolicies: {
        'cdk-assume': new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                'sts:AssumeRole',
                'iam:PassRole',
              ],
              resources: ['arn:aws:iam::*:role/cdk-hnb659fds-'],
            }),
          ],
        }),
      },
      description: 'This role is used via GitHub Actions to deploy with AWS CDK target AWS account',
      maxSessionDuration: cdk.Duration.hours(12),
    });

    new cdk.CfnOutput(this, this.resourceName('git-hub-deploy-role-out'), {
      value: role.roleArn,
      description: 'Arn for AWS IAM role with Github oidc auth',
      exportName: this.resourceName('git-hub-deploy-role'),
    });
  }

  /**
   * Hardening baseline applied to the dedicated FinOps account. Auto-attached when
   * `org.ous.sharedServices.accounts.finOps` is configured. Composes the static baseline
   * with any per-account `scpStatements` declared on `DLzFinOpsAccount` (additive only).
   */
  private finOpsAccountHardening() {
    const finOpsAccount = this.props.organization.ous.sharedServices!.accounts.finOps!;
    const accountExtras = finOpsAccount.scpStatements ?? [];
    const dlzScp = new DlzServiceControlPolicy(this, this.resourceName('scp-finops-account-baseline'), {
      name: this.resourceName('scp-finops-account-baseline'),
      description: 'Hardening baseline for the FinOps account: deny compute/data services, network primitives, IAM users, org-integrity actions',
      targetIds: [finOpsAccount.accountId],
      statements: [
        ...ScpFinOpsAccountBaseline.statements(),
        ...accountExtras,
      ],
    });
    Report.addReportForAccountRegion('finops', '*', dlzScp.reportResource);
  }

  /** Per-account / per-cost-center budgets composed from `DlzBudget`. */
  private accountBudgets() {
    new DlzAccountBudgets(
      this,
      this.resourceName('account-budgets'),
      this.props.finOps!.accountBudgets!,
      this.props.organization.ous.workloads.accounts,
      this.stackProps.globalVariables.budgetSnsCache,
    );
  }

  /** Cost Anomaly Detection monitors + subscriptions, sharing SNS topics with budgets. */
  private costAnomalyDetection() {
    new DlzCostAnomalyDetection(
      this,
      this.resourceName('cost-anomaly-detection'),
      this.props.finOps!.costAnomalyDetection!,
      this.stackProps.globalVariables.budgetSnsCache,
    );
  }

  /**
   * CUR 2.0 export definition (BCM Data Exports). Writes cross-account into the FinOps
   * account's bucket — the bucket itself is provisioned by `FinOpsGlobalStack`.
   */
  private curExport() {
    const cur = this.props.finOps!.cur!;
    const finOpsAccountId = this.props.organization.ous.sharedServices!.accounts.finOps!.accountId;
    const destinationRegion = cur.destinationRegion ?? DLZ_CUR_DEFAULTS.destinationRegion;
    const exportName = cur.exportName ?? DLZ_CUR_DEFAULTS.exportName;
    const bucketName = `${cur.bucketNamePrefix ?? DLZ_CUR_DEFAULTS.bucketNamePrefix}-${finOpsAccountId}-${destinationRegion}`;

    const tagKeys = this.collectMandatoryTagKeys();

    new DlzCurExport(this, this.resourceName('cur-export'), {
      destinationBucketArn: `arn:aws:s3:::${bucketName}`,
      destinationPrefix: exportName,
      exportName,
      costAllocationTagKeys: cur.activateCostAllocationTags === false ? [] : tagKeys,
      exportConfig: cur.exportConfig,
    });
  }

  private collectMandatoryTagKeys(): string[] {
    const baseline = PropsOrDefaults.getOrganizationTags(this.props);
    return baseline.map(t => t.name);
  }

}