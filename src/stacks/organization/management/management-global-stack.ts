import * as assert from 'assert';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import {
  DlzControlTowerEnabledControl,
  IDlzControlTowerControl,
} from '../../../constructs/dlz-control-tower-control';
import {
  AccountChatbots,
  DlzBudget,
  ControlTowerControlMappings,
  DlzStack,
  DlzStackProps,
} from '../../../constructs/index';
import { DlzServiceControlPolicy } from '../../../constructs/organization-policies/index';
import { DlzTagPolicy } from '../../../constructs/organization-policies/tag-policy';
import { DataLandingZoneProps, DlzAccountType, Ou, Region } from '../../../data-landing-zone-types';
import { PropsOrDefaults } from '../../../defaults';
import { limitCfnExecutions } from '../../../lib/cdk-utils';
import { Report } from '../../../lib/report';

export class ManagementGlobalStack extends DlzStack {

  constructor(scope: Construct, stackProps: DlzStackProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    this.rootControls();
    this.iamPermissionBoundary();

    this.workloadAccountsOrgPolicies();
    this.suspendedOuPolicies();

    this.budgets();

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
        statements: DlzServiceControlPolicy.denyIamPolicyActionStatements(),
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

  /**
   * Service Control Policies and Tag Policies applied at the account level to enable customization per account
   */
  workloadAccountsOrgPolicies() {
    const denyService = PropsOrDefaults.getDenyServiceList(this.props);
    const tags = PropsOrDefaults.getOrganizationTags(this.props);

    const commonStatements = [
      DlzServiceControlPolicy.denyServiceActionStatements(denyService),
      DlzServiceControlPolicy.denyCfnStacksWithoutStandardTags(tags),
    ];

    const orgPolicies: Construct[] = [];
    // ============================================================================================
    // ======================================= DEVELOPMENT ========================================
    // ============================================================================================

    const developAccounts = this.props.organization.ous.workloads.accounts
      .filter(account => account.type === DlzAccountType.DEVELOP);
    for (const dlzAccount of developAccounts) {
      const dlzScpDevelop = new DlzServiceControlPolicy(this,
        this.resourceName(`scp-${dlzAccount.name}-account`), {
          name: this.resourceName(`scp-${dlzAccount.name}-account`),
          description: `SCP statements applied to the ${dlzAccount.name} account`,
          targetIds: [dlzAccount.accountId],
          statements: [
            ...commonStatements,
          ],
        });
      const dlzTagPolicyDevelop = new DlzTagPolicy(this,
        this.resourceName(`tag-policy-${dlzAccount.name}-account`), {
          name: this.resourceName(`tag-policy-${dlzAccount.name}-account`),
          description: `Tag policy for the ${dlzAccount.name} account`,
          targetIds: [dlzAccount.accountId],
          policyTags: tags,
        });
      Report.addReportForAccountRegion(
        dlzAccount.name,
        '*',
        dlzScpDevelop.reportResource,
      );
      Report.addReportForAccountRegion(
        dlzAccount.name,
        '*',
        dlzTagPolicyDevelop.reportResource,
      );

      orgPolicies.push(dlzScpDevelop.policy);
      orgPolicies.push(dlzTagPolicyDevelop.policy);
    }


    // ============================================================================================
    // ======================================== PRODUCTION ========================================
    // ============================================================================================

    const prodAccounts = this.props.organization.ous.workloads.accounts
      .filter(account => account.type === DlzAccountType.PRODUCTION);
    for (const dlzAccount of prodAccounts) {
      const dlzScpProd = new DlzServiceControlPolicy(this,
        this.resourceName(`scp-${dlzAccount.name}-account`), {
          name: this.resourceName(`scp-${dlzAccount.name}-account`),
          description: `SCP statements applied to the ${dlzAccount.name} account`,
          targetIds: [dlzAccount.accountId],
          statements: [
            ...commonStatements,
          ],
        });
      const dlzTagPolicyProduction = new DlzTagPolicy(this,
        this.resourceName(`tag-policy-${dlzAccount.name}-account`), {
          name: this.resourceName(`tag-policy-${dlzAccount.name}-account`),
          description: `Tag policy for the ${dlzAccount.name} account`,
          targetIds: [dlzAccount.accountId],
          policyTags: tags,
        });

      Report.addReportForAccountRegion(
        dlzAccount.name,
        '*',
        dlzScpProd.reportResource,
      );
      Report.addReportForAccountRegion(
        dlzAccount.name,
        '*',
        dlzTagPolicyProduction.reportResource,
      );

      orgPolicies.push(dlzScpProd.policy);
      orgPolicies.push(dlzTagPolicyProduction.policy);
    }

    limitCfnExecutions(orgPolicies, 8);
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
          DlzServiceControlPolicy.denyServiceActionStatements(['*']),
        ],
      });
  }

  budgets() {
    const budgetSlackChannels = this.props.budgets
      .filter(budget => budget.subscribers.slack)
      .map(budget => budget.subscribers.slack!);

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

    for (const budget of this.props.budgets) {
      new DlzBudget(this, this.resourceName(`budget-${budget.name}`), budget);
    }
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

}