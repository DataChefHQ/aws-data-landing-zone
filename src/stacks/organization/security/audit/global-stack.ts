import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';
import { AccountChatbots, DlzStack } from '../../../../constructs';
import { DlzStackProps } from '../../../../constructs/dlz-stack/index';
import { DataLandingZoneProps } from '../../../../data-landing-zone';

export class AuditGlobalStack extends DlzStack {
  constructor(scope: Construct, stackProps: DlzStackProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    this.securityHubNotifications();
  }

  public securityHubNotifications() {
    const topicLow = new sns.Topic(this, this.resourceName('sh-low-priority-topic'), {
      displayName: this.resourceName('sh-low-priority-topic'),
      topicName: this.resourceName('sh-low-priority-topic'),
    });
    const securityHubRuleLow = new events.Rule(this, this.resourceName('sh-low-rule'), {
      ruleName: this.resourceName('sh-low-rule'),
      eventPattern: {
        source: ['aws.securityhub'],
        detailType: ['Security Hub Findings - Imported'],
        detail: {
          findings: {
            RecordState: ['ACTIVE'],
            Severity: {
              Label: ['INFORMATIONAL', 'LOW'],
            },
            Workflow: {
              Status: ['NEW'],
            },
          },
        },
      },
    });
    securityHubRuleLow.addTarget(new targets.SnsTopic(topicLow));

    const topicHigh = new sns.Topic(this, this.resourceName('sh-high-priority-topic'), {
      displayName: this.resourceName('sh-high-priority-topic'),
      topicName: this.resourceName('sh-high-priority-topic'),
    });
    const securityHubRule = new events.Rule(this, this.resourceName('sh-high-rule'), {
      ruleName: this.resourceName('sh-high-rule'),
      eventPattern: {
        source: ['aws.securityhub'],
        detailType: ['Security Hub Findings - Imported'],
        detail: {
          findings: {
            RecordState: ['ACTIVE'],
            Severity: {
              Label: ['MEDIUM', 'HIGH', 'CRITICAL'],
            },
            Workflow: {
              Status: ['NEW'],
            },
          },
        },
      },
    });
    securityHubRule.addTarget(new targets.SnsTopic(topicHigh));


    if (this.props.securityHubNotifications.lowPriority.emails) {
      for (let emailAddress of this.props.securityHubNotifications.lowPriority.emails) {
        topicLow.addSubscription(new subscriptions.EmailSubscription(emailAddress));
      }
    }
    if (this.props.securityHubNotifications.highPriority.emails) {
      for (let emailAddress of this.props.securityHubNotifications.highPriority.emails) {
        topicHigh.addSubscription(new subscriptions.EmailSubscription(emailAddress));
      }
    }

    if (this.props.securityHubNotifications.lowPriority.slack || this.props.securityHubNotifications.highPriority.slack) {
      const denyAllPolicy = new iam.ManagedPolicy(this, this.resourceName('sh-deny-all-guardrail-policies-sh'), {
        managedPolicyName: this.resourceName('deny-all-guardrail-policies-sh'),
        description: 'Deny all guardrail policies',
        statements: [
          new iam.PolicyStatement({
            effect: iam.Effect.DENY,
            actions: ['*'],
            resources: ['*'],
          }),
        ],
      });

      const shSlackChannels = [
        this.props.securityHubNotifications.lowPriority.slack,
        this.props.securityHubNotifications.highPriority.slack,
      ].filter(slack => slack !== undefined)
        .map(slack => slack!);


      for (const slackChannel of shSlackChannels) {
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

      if (this.props.securityHubNotifications.lowPriority.slack) {
        const slackChannel = AccountChatbots.findSlackChannel(this, this.props.securityHubNotifications.lowPriority.slack);
        slackChannel.addNotificationTopic(topicLow);
      }
      if (this.props.securityHubNotifications.highPriority.slack) {
        const slackChannel = AccountChatbots.findSlackChannel(this, this.props.securityHubNotifications.highPriority.slack);
        slackChannel.addNotificationTopic(topicHigh);
      }
    }

  }
}
