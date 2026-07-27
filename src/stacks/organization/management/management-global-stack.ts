import * as assert from 'assert';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as organizations from 'aws-cdk-lib/aws-organizations';
import { Construct } from 'constructs';
import { DlzAccountBudgets } from '../../../constructs/dlz-account-budgets';
import {
  DlzControlTowerEnabledControl,
  IDlzControlTowerControl,
} from '../../../constructs/dlz-control-tower-control';
import { DlzCostAnomalyDetection } from '../../../constructs/dlz-cost-anomaly-detection';
import { GuardDutyDelegatedAdmin } from '../../../constructs/dlz-guardduty';
import { MacieDelegatedAdmin } from '../../../constructs/dlz-macie';
import {
  AccountChatbots,
  DlzBudget,
  ControlTowerControlMappings,
  DlzStack,
  DlzStackProps, SlackChannel,
  DlzTagComplianceCentralAlert,
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
  DlzStandaloneScp,
  GlobalVariables,
  Ou,
  Region,
  ScpStatementsByAccountType,
} from '../../../data-landing-zone-types';
import { PropsOrDefaults } from '../../../defaults';
import { limitCfnExecutions } from '../../../lib/cdk-utils';
import { Report, ReportType } from '../../../lib/report';

export interface ManagementGlobalStackProps extends DlzStackProps {
  readonly globalVariables: GlobalVariables;
}

export class ManagementGlobalStack extends DlzStack {

  constructor(scope: Construct, private stackProps: ManagementGlobalStackProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    this.rootControls();
    this.iamPermissionBoundary();

    this.workloadAccountsOrgPolicies();
    this.workloadsOuPolicies();
    this.sharedServicesOuPolicies();
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

    if (this.props.tagComplianceCentralAlert) {
      this.tagComplianceCentralAlert();
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

    // Suffix of the merged per-account SCP; single-sourced so the reserved-suffix guard can't drift.
    const mergedScpSuffix = 'account';

    const previousPolicies: organizations.CfnPolicy[] = [];

    for (const dlzAccount of sortedAccounts) {
      const statements = ScpMerge.resolve({
        baseline: baselineStatements,
        accountTypeExtras: accountTypeStatements[dlzAccount.type] ?? [],
        accountExtras: dlzAccount.scpStatements ?? [],
      });

      // Slot budget for AWS's per-target SCP limit (`ScpLimits.MAX_PER_TARGET`, counted per
      // policy type): the AWS-managed `FullAWSAccess` (always attached) + the merged DLZ SCP
      // below + one policy per standalone entry. FullAWSAccess is counted conservatively —
      // DLZ never detaches it.
      const scpSlotsUsed = 1 /* FullAWSAccess */ + 1 /* merged SCP */ + (dlzAccount.standaloneScps?.length ?? 0);
      ScpMerge.validate(dlzAccount.name, statements, scpSlotsUsed);

      const dlzScp = new DlzServiceControlPolicy(this,
        this.resourceName(`scp-${dlzAccount.name}-${mergedScpSuffix}`), {
          name: this.resourceName(`scp-${dlzAccount.name}-${mergedScpSuffix}`),
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

      const standalonePolicies = this.createStandaloneScps({
        label: dlzAccount.name,
        targetId: dlzAccount.accountId,
        scps: dlzAccount.standaloneScps ?? [],
        scpSlotsUsed,
        reservedSuffixes: [mergedScpSuffix], // reserved by the merged per-account SCP above
      });

      for (const prev of previousPolicies) {
        dlzScp.policy.node.addDependency(prev);
        dlzTagPolicy.policy.node.addDependency(prev);
        for (const standalone of standalonePolicies) {
          standalone.node.addDependency(prev);
        }
      }
      previousPolicies.length = 0;
      previousPolicies.push(dlzScp.policy, dlzTagPolicy.policy, ...standalonePolicies);
    }
  }

  /**
   * Standalone SCPs attached to the Workloads OU, inherited by every workload account.
   * Preferred over per-account SCPs for a rule that applies uniformly org-wide: one policy,
   * no per-account duplication, and inherited SCPs don't consume any account's slots.
   */
  workloadsOuPolicies() {
    const scps = this.props.organization.ous.workloads.standaloneScps ?? [];
    if (scps.length === 0) {
      return;
    }
    // Slot budget: FullAWSAccess (always attached to the OU) + our standalone SCPs. SCPs
    // attached out-of-band (e.g. Control Tower guardrails) aren't visible to DLZ and aren't
    // counted here; `ScpLimits.MAX_PER_TARGET` leaves ample room.
    this.createStandaloneScps({
      label: 'workloads-ou',
      targetId: this.props.organization.ous.workloads.ouId,
      scps,
      scpSlotsUsed: 1 /* FullAWSAccess */ + scps.length,
    });
  }

  // Standalone SCPs attached to the Shared Services OU
  sharedServicesOuPolicies() {
    const sharedServices = this.props.organization.ous.sharedServices;
    const scps = sharedServices?.standaloneScps ?? [];
    if (!sharedServices || scps.length === 0) {
      return;
    }
    this.createStandaloneScps({
      label: 'shared-services-ou',
      targetId: sharedServices.ouId,
      scps,
      scpSlotsUsed: 1 /* FullAWSAccess */ + scps.length,
    });
  }

  /**
   * Emits one `AWS::Organizations::Policy` per standalone SCP, attached to `targetId` (an
   * account or an OU) — never merged into another policy. `ScpMerge.validate` checks each
   * policy's body size; the slot budget (`scpSlotsUsed`) is validated once by the caller.
   * `reservedSuffixes` blocks nameSuffixes that would collide with other DLZ policies on the
   * same target (e.g. `account`, used by the merged per-account SCP).
   */
  private createStandaloneScps(params: {
    readonly label: string;
    readonly targetId: string;
    readonly scps: DlzStandaloneScp[];
    readonly scpSlotsUsed: number;
    readonly reservedSuffixes?: string[];
  }): organizations.CfnPolicy[] {
    const seenSuffixes = new Set<string>(params.reservedSuffixes ?? []);
    return params.scps.map((scp, index) => {
      const suffix = scp.nameSuffix ?? `standalone-${index}`;
      if (seenSuffixes.has(suffix)) {
        throw new Error(
          `${params.label} standalone SCP nameSuffix "${suffix}" is duplicated or reserved ` +
          '(a reserved suffix is used by another DLZ policy on the same target); use a unique nameSuffix.',
        );
      }
      seenSuffixes.add(suffix);
      ScpMerge.validate(`${params.label} (standalone "${suffix}")`, scp.statements, params.scpSlotsUsed);

      const policyName = this.resourceName(`scp-${params.label}-${suffix}`);
      const policy = new DlzServiceControlPolicy(this, policyName, {
        name: policyName,
        description: `Standalone SCP "${suffix}" applied to ${params.label}`,
        targetIds: [params.targetId],
        statements: scp.statements,
      });
      Report.addReportForAccountRegion(params.label, '*', policy.reportResource);
      return policy.policy;
    });
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
   * Central sink for org-wide tag-compliance alerts: one event bus + SNS topic + Slack/email in
   * the management account. Workload accounts forward their findings here (see
   * `DlzTagComplianceForwardingRule`). Deployed here because the Slack workspace is authorized in
   * this account (like budgets) and one topic means one subscription confirmation.
   */
  private tagComplianceCentralAlert() {
    const alert = new DlzTagComplianceCentralAlert(this, this.resourceName('dlz-tag-compliance-central-alert'), {
      organizationId: this.props.organization.organizationId,
      emails: this.props.tagComplianceCentralAlert!.emails,
      slacks: this.props.tagComplianceCentralAlert!.slacks,
    });
    Report.addReportForAccountRegion('management', this.props.regions.global, {
      type: ReportType.TAG_COMPLIANCE_ALERT,
      name: alert.bus.eventBusName,
      description: 'Central event bus that receives tag NON_COMPLIANT findings from all workload accounts',
    });
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

  /** Auto-attaches `ScpFinOpsAccountBaseline` + per-account `scpStatements` (additive). */
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

  private accountBudgets() {
    new DlzAccountBudgets(
      this,
      this.resourceName('account-budgets'),
      this.props.finOps!.accountBudgets!,
      this.props.organization.ous.workloads.accounts,
      this.stackProps.globalVariables.budgetSnsCache,
    );
  }

  private costAnomalyDetection() {
    new DlzCostAnomalyDetection(
      this,
      this.resourceName('cost-anomaly-detection'),
      this.props.finOps!.costAnomalyDetection!,
      this.stackProps.globalVariables.budgetSnsCache,
    );
  }

}