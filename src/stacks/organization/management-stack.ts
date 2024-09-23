import * as assert from 'assert';
import { Annotations } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as sso from 'aws-cdk-lib/aws-sso';
import { Construct } from 'constructs';
import { AccountChatbots, Budget, ControlTowerControlMappings, DlzStack, DlzStackProps } from '../../constructs';
import {
  DlzControlTowerEnabledControl,
  IDlzControlTowerControl,
} from '../../constructs/control-tower-control';
import { SecurityAccess } from '../../constructs/iam-identity-center';
import { DlzServiceControlPolicy } from '../../constructs/organization-policies';
import { DlzTagPolicy } from '../../constructs/organization-policies/tag-policy';
import { DataLandingZoneProps, DlzAccountType, Ou, Region } from '../../data-landing-zone';
import { PropsOrDefaults } from '../../defaults';
import { limitCfnExecutions } from '../../lib/cfn-utils';
import { Report } from '../../lib/report';

export class ManagementStack extends DlzStack {
  public readonly topic: sns.Topic;

  constructor(scope: Construct, stackProps: DlzStackProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    this.topic = new sns.Topic(this, this.resourceName('test-topic'), {
      displayName: this.resourceName('test-topic'),
      topicName: this.resourceName('test-topic'),
    });

    this.rootControls();
    this.iamIdentityCenter();

    this.workloadAccountsOrgPolicies();
    this.suspendedOuPolicies();

    this.budgets();

    if (this.props.deploymentPlatform?.gitHub) {
      this.deploymentPlatformGitHub();
    }
  }

  /**
   * Control Tower Controls applied on all OUs
   */
  private rootControls() {
    const allOus = [Ou.SECURITY, Ou.WORKLOADS, Ou.SUSPENDED];
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
          Annotations.of(this).addInfo(`Skipping control ${control.controlFriendlyName} for the Security OU, not supported.`);
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
    }
  }

  /**
   * IAM Identity Center
   */
  iamIdentityCenter() {
    if (this.props.iamIdentityCenter === undefined) return;

    const iamIdentityCenterId = this.props.iamIdentityCenter.iamIdentityCenterId;
    let iamIdentityCenterArn = this.props.iamIdentityCenter.iamIdentityCenterArn;

    if (!iamIdentityCenterArn) {
      iamIdentityCenterArn = `arn:aws:sso:::instance/${iamIdentityCenterId}`;
    }

    const accounts = new Map<string, string>();
    accounts.set('dlz:root', this.props.organization.root.accounts.management.accountId);
    accounts.set('dlz:security:log', this.props.organization.ous.security.accounts.log.accountId);
    accounts.set('dlz:security:audit', this.props.organization.ous.security.accounts.audit.accountId);

    for (const account of this.props.organization.ous.workloads.accounts) {
      accounts.set(account.name, account.accountId);
    }
    const accountNames = [...accounts.keys()];

    const users = new Map<string, string>();
    for (const user of this.props.iamIdentityCenter.idpUsers ?? []) {
      users.set(user.name, user.userId);
    }

    const permissionSets = new Map<string, sso.CfnPermissionSet>();
    permissionSets.set('dlz:adminaccess', SecurityAccess.adminPermissionSet(this, iamIdentityCenterArn));
    permissionSets.set('dlz:readonlyaccess', SecurityAccess.readOnlyPermissionSet(this, iamIdentityCenterArn));
    permissionSets.set('dlz:catalogaccess', SecurityAccess.catalogPermissionSet(this, iamIdentityCenterArn));

    for (const permissionSetConf of this.props.iamIdentityCenter.permissionSets ?? []) {
      const permissionSet = SecurityAccess.createPermissionSet(
        this,
        iamIdentityCenterArn,
        permissionSetConf.name,
        permissionSetConf.description,
        permissionSetConf.inlinePolicy,
        permissionSetConf.managedPolicyArns,
      );
      permissionSets.set(permissionSetConf.name, permissionSet);
    }

    // const awsSsoUsers = new Map<string, IdentityStoreUser>();
    // for (const user of this.props.iamIdentityCenter.awsSsoUsers ?? []) {
    //   const userConstruct = new IdentityStoreUser(this, this.resourceName(`aws-sso-user-${user.userName}`), user);
    //   awsSsoUsers.set(user.userName, userConstruct);
    //   users.set(user.userName, userConstruct.userId);
    // }

    for (const group of this.props.iamIdentityCenter.accessGroups ?? []) {
      const resolvedUsers = group.users?.map(user => users.get(user) ?? user) ?? [];
      const dependencyUsers: Construct[] = [];//...awsSsoUsers.values()].filter(user => resolvedUsers.includes(user.userId));

      const resolvedAccounts: string[] = [];
      for (const accountWithWildCard of group.accounts) {
        if (!/^[a-zA-Z0-9]+[a-zA-Z0-9\-\:]+\*?$/.test(accountWithWildCard)) {
          Annotations.of(this).addError(`Invalid account name: ${accountWithWildCard} in group ${group.name}`);
          continue;
        }
        for (const accountName of accountNames) {
          if (accountWithWildCard.slice(-1) === '*' && accountWithWildCard.slice(0, accountName.length) !== accountName) continue;
          if (accountWithWildCard.slice(-1) !== '*' && accountWithWildCard !== accountName) continue;

          resolvedAccounts.push(accounts.get(accountName) ?? accountName);
          break;
        }
      }

      if (!permissionSets.has(group.permissionSet)) {
        Annotations.of(this).addError(`PermissionSet ${group.permissionSet} in group ${group.name} was not found`);
        continue;
      }
      const permissionSet = permissionSets.get(group.permissionSet)!;

      const groupConstruct = SecurityAccess.createGroup(
        this,
        group.name,
        iamIdentityCenterArn,
        resolvedUsers,
        permissionSet,
        resolvedAccounts,
        group.description);

      groupConstruct.node.addDependency(permissionSet);
      for (const user of dependencyUsers) {
        groupConstruct.node.addDependency(user);
      }
    }
  }

  /**
   * Service Control Policies and Tag Policies  applied at the OU level because we won't need any customizations per account
   */
  suspendedOuPolicies() {
    const tags = PropsOrDefaults.getOrganizationTags(this.props);

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
    new DlzTagPolicy(this,
      this.resourceName('tag-policy-suspended-ou'), {
        name: this.resourceName('tag-policy-suspended-ou'),
        description: 'Tag policy for the suspended OU',
        targetIds: [this.props.organization.ous.suspended.ouId],
        policyTags: tags,
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
      new Budget(this, this.resourceName(`budget-${budget.name}`), budget);
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
