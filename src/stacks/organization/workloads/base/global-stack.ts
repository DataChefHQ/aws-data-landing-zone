import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { Shared } from './shared';
import { AccountChatbots, DlzStack, IamPasswordPolicy, SlackChannel } from '../../../../constructs';
import { IamAccountAlias } from '../../../../constructs/iam/iam-account-alias';
import { DataLandingZoneProps, WorkloadAccountProps, DLzIamProps } from '../../../../data-landing-zone-types';
import { Report, ReportType } from '../../../../lib';
import { SSM_ASSUME_CROSS_ACCOUNT_ROLE_NAME, SSM_PARAMETER_DLZ_PREFIX } from '../../constants';

export class WorkloadGlobalStack extends DlzStack {

  constructor(scope: Construct, workloadAccountProps: WorkloadAccountProps, private props: DataLandingZoneProps) {
    super(scope, workloadAccountProps);

    const shared = new Shared(this, this.props, workloadAccountProps.dlzAccount, workloadAccountProps.globalVariables);
    shared.configRuleRequiredTags();
    shared.createVpcs();
    shared.createIamPermissionsBoundaryManagedPolicy();
    shared.createBastions();

    if (workloadAccountProps.dlzAccount.iam) {
      this.createIamResources(workloadAccountProps.dlzAccount.iam);
    }

    this.ssmAssumeCrossAccountRole();
    this.defaultNotifications();
  }

  private createIamResources(iamConfig: DLzIamProps): void {
    const createdPolicies = new Map<string, iam.IManagedPolicy>();
    const createdUsers = new Map<string, iam.IUser>();
    function addPolicyDependencies(resource: cdk.Resource, managedPolicies: string[] | undefined): void {
      if (managedPolicies) {
        for (const policyName of managedPolicies) {
          const createdPolicy = createdPolicies.get(policyName!);
          if (createdPolicy) {
            resource.node.addDependency(createdPolicy);
          }
        }
      }
    }
    function addUserDependencies(resource: cdk.Resource, users: string[] | undefined): void {
      if (users) {
        for (const userName of users) {
          const createdUser = createdUsers.get(userName);
          if (createdUser) {
            resource.node.addDependency(createdUser);
          }
        }
      }
    }

    function getManagedPolicies(managedPolicyNames: string[] | undefined): iam.IManagedPolicy[] {
      if (!managedPolicyNames) return [];

      return managedPolicyNames.map((policyName) => {
        const policy = createdPolicies.get(policyName);
        if (!policy) {
          throw new Error(`Managed policy with name ${policyName} not found`);
        }
        return policy;
      });
    }

    if (iamConfig.accountAlias) {
      const alias = new IamAccountAlias(this, this.resourceName('AccountAlias'), {
        accountAlias: iamConfig.accountAlias,
      });
      Report.addReportForAccountRegion(this.accountName, '*', alias.reportResource);
    }

    if (iamConfig.passwordPolicy) {
      const passwordPolicy = new IamPasswordPolicy(this, this.resourceName('PasswordPolicy'), iamConfig.passwordPolicy);
      Report.addReportForAccountRegion(this.accountName, '*', passwordPolicy.reportResource);
    }

    if (iamConfig.policies) {
      for (const policyProps of iamConfig.policies) {
        const policy = new iam.ManagedPolicy(this, `IamPolicy${policyProps.policyName}`, policyProps);

        //TODO: Fix later, for some reason it isn't being set when passed above.. For now use escape hatch
        const cfnPolicy = policy.node.defaultChild as iam.CfnManagedPolicy;
        cfnPolicy.managedPolicyName = policyProps.policyName;

        createdPolicies.set(policyProps.policyName, policy);
        Report.addReportForAccountRegion(this.accountName, '*', {
          type: ReportType.IAM_POLICY,
          name: policyProps.policyName,
          description: JSON.stringify(policyProps),
        });
      }
    }

    if (iamConfig.roles) {
      for (const roleProps of iamConfig.roles) {
        const managedPolicies = getManagedPolicies(roleProps.managedPolicyNames);
        const role = new iam.Role(this, `IamRole${roleProps.roleName}`, {
          ...roleProps,
          managedPolicies: managedPolicies,
        });
        addPolicyDependencies(role, roleProps.managedPolicyNames);

        Report.addReportForAccountRegion(this.accountName, '*', {
          type: ReportType.IAM_ROLE,
          name: roleProps.roleName,
          description: JSON.stringify(roleProps),
        });
      }
    }

    if (iamConfig.users) {
      for (const userProps of iamConfig.users) {
        const managedPolicies = getManagedPolicies(userProps.managedPolicyNames);
        const user = new iam.User(this, `IamUser${userProps.userName}`, {
          ...userProps,
          managedPolicies: managedPolicies,
        });
        createdUsers.set(userProps.userName, user);
        addPolicyDependencies(user, userProps.managedPolicyNames);

        Report.addReportForAccountRegion(this.accountName, '*', {
          type: ReportType.IAM_USER,
          name: userProps.userName,
          description: JSON.stringify(userProps),
        });
      }
    }

    if (iamConfig.userGroups) {
      for (const groupConfig of iamConfig.userGroups) {
        if (!groupConfig.groupName) {
          throw new Error('groupName is required for groups');
        }
        const managedPolicies = getManagedPolicies(groupConfig.managedPolicyNames);
        const group = new iam.Group(this, `IamGroup${groupConfig.groupName}`, {
          ...groupConfig,
          managedPolicies: managedPolicies,
        });

        new iam.CfnUserToGroupAddition(this, `IamGroup${groupConfig.groupName}-Users`, {
          groupName: group.groupName,
          users: groupConfig.users,
        });

        addPolicyDependencies(group, groupConfig.managedPolicyNames);
        addUserDependencies(group, groupConfig.users);

        Report.addReportForAccountRegion(this.accountName, '*', {
          type: ReportType.IAM_USER_GROUP,
          name: groupConfig.groupName,
          description: JSON.stringify(groupConfig),
        });
      }
    }
  }

  private defaultNotifications() {
    const idPrefix = 'default-notification';
    let defaultNotification = this.props.defaultNotification;

    for (const account of this.props.organization.ous.workloads.accounts) {
      if (account.accountId === this.accountId && account.defaultNotification) {
        defaultNotification = account.defaultNotification;
        break;
      }
      if (account.accountId === this.accountId) break;
    }

    if (!defaultNotification) return;

    const topic = new sns.Topic(this, this.resourceName(`${idPrefix}-topic`), {
      displayName: this.resourceName(`${idPrefix}-topic`),
      topicName: this.resourceName(`${idPrefix}-topic`),
    });

    new ssm.StringParameter(this, this.resourceName(`${idPrefix}-notification-id`), {
      parameterName: `${SSM_PARAMETER_DLZ_PREFIX}/sns/default-notification/arn`,
      stringValue: topic.topicArn,
    });

    if (defaultNotification.emails) {
      for (let emailAddress of defaultNotification.emails) {
        topic.addSubscription(new subscriptions.EmailSubscription(emailAddress));
      }
    }

    if (!defaultNotification.slack) return;

    const channel: SlackChannel = {
      slackChannelConfigurationName: defaultNotification.slack.slackChannelConfigurationName,
      slackWorkspaceId: defaultNotification.slack.slackWorkspaceId,
      slackChannelId: defaultNotification.slack.slackChannelId,
    };

    if (!AccountChatbots.existsSlackChannel(this, channel)) {
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

      const id = this.resourceName(`slack-bot-${channel.slackWorkspaceId}-${channel.slackChannelId}`);
      AccountChatbots.addSlackChannel(this, id, {
        ...channel,
        guardrailPolicies: [
          denyAllPolicy,
        ],
      });
    }

    const slackChannel = AccountChatbots.findSlackChannel(this, channel);
    slackChannel.addNotificationTopic(topic);
  }

  private ssmAssumeCrossAccountRole() {
    new iam.Role(this, SSM_ASSUME_CROSS_ACCOUNT_ROLE_NAME, {
      roleName: SSM_ASSUME_CROSS_ACCOUNT_ROLE_NAME,
      description: 'Role to be assumed by other accounts to read SSM parameters im this account',
      assumedBy: new iam.OrganizationPrincipal(this.props.organization.organizationId),
      inlinePolicies: {
        ssmRead: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              actions: [
                'ssm:GetParameter',
              ],
              resources: [`arn:aws:ssm:*:${this.accountId}:parameter${SSM_PARAMETER_DLZ_PREFIX}*`],
            }),
          ],
        }),
      },
    });
  }
}
