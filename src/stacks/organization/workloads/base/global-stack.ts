import * as iam from 'aws-cdk-lib/aws-iam';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { Shared } from './shared';
import { AccountChatbots, DlzStack, SlackChannel } from '../../../../constructs';
import { DataLandingZoneProps, WorkloadAccountProps } from '../../../../data-landing-zone';
import { SSM_ASSUME_CROSS_ACCOUNT_ROLE_NAME, SSM_PARAMETER_DLZ_PREFIX } from '../../constants';


export class WorkloadGlobalStack extends DlzStack {
  public static defaultPolicyStatement: iam.PolicyStatementProps = {
    effect: iam.Effect.DENY,
    actions: ['*'],
    resources: ['*'],
  };

  constructor(scope: Construct, workloadAccountProps: WorkloadAccountProps, private props: DataLandingZoneProps) {
    super(scope, workloadAccountProps);

    const shared = new Shared(this, this.props, workloadAccountProps.dlzAccount, workloadAccountProps.globalVariables);
    shared.configRuleRequiredTags();
    shared.createVpcs();

    this.ssmAssumeCrossAccountRole();
    this.defaultNotifications();
  }

  defaultNotifications() {
    const accountId = this.accountId;
    const idPrefix = `default-notification-${accountId}`;
    let defaultNotification = this.props.defaultNotification;

    for (const account of this.props.organization.ous.workloads.accounts) {
      if (account.defaultNotification) {
        defaultNotification = account.defaultNotification;
        break;
      }
    }

    if (!defaultNotification) return;

    const topic = new sns.Topic(this, this.resourceName(`${idPrefix}-topic`), {
      displayName: this.resourceName(`${idPrefix}-topic`),
      topicName: this.resourceName(`${idPrefix}-topic`),
    });

    new ssm.StringParameter(this, this.resourceName(`${idPrefix}}-notification-id`), {
      parameterName: `${SSM_PARAMETER_DLZ_PREFIX}default-notification/id`,
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
      const policyStatement = WorkloadGlobalStack.defaultPolicyStatement;
      const policy = new iam.ManagedPolicy(this, this.resourceName(`${idPrefix}-guardrail-policy`), {
        managedPolicyName: this.resourceName(`${idPrefix}-guardrail-policy`),
        description: 'guardrail policy',
        statements: [new iam.PolicyStatement(policyStatement)],
      });

      const id = this.resourceName(`slack-bot-${channel.slackWorkspaceId}-${channel.slackChannelId}`);
      AccountChatbots.addSlackChannel(this, id, {
        ...channel,
        guardrailPolicies: [
          policy,
        ],
      });
    }

    const slackChannel = AccountChatbots.findSlackChannel(this, channel);
    slackChannel.addNotificationTopic(topic);
  }

  ssmAssumeCrossAccountRole() {
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
