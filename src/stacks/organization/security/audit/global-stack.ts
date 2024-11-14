import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';
import { AccountChatbots, DlzStack } from '../../../../constructs';
import { DlzStackProps } from '../../../../constructs/dlz-stack/index';

import { DataLandingZoneProps } from '../../../../data-landing-zone-types';

export class AuditGlobalStack extends DlzStack {
  constructor(scope: Construct, stackProps: DlzStackProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    this.securityHubNotifications();
  }

  public securityHubNotifications() {
    let denyAllPolicy: iam.ManagedPolicy | undefined;
    for (const notification of this.props.securityHubNotifications) {
      const idPrefix = `sh-notification-${notification.id}`;
      const topic = new sns.Topic(this, this.resourceName(`${idPrefix}-topic`), {
        displayName: this.resourceName(`${idPrefix}-topic`),
        topicName: this.resourceName(`${idPrefix}-topic`),
      });

      const severity = notification.severity ? {
        Severity: {
          Label: notification.severity,
        },
      } : { };
      const workflowStatus = notification.workflowStatus ? {
        Workflow: {
          Status: notification.workflowStatus,
        },
      } : { };

      const securityHubRule = new events.Rule(this, this.resourceName(`${idPrefix}-rule`), {
        ruleName: this.resourceName(`${idPrefix}-rule`),
        eventPattern: {
          source: ['aws.securityhub'],
          detailType: ['Security Hub Findings - Imported'],
          detail: {
            findings: {
              RecordState: ['ACTIVE'],
              ...severity,
              ...workflowStatus,
            },
          },
        },
      });
      securityHubRule.addTarget(new targets.SnsTopic(topic));


      if (notification.notification.emails) {
        for (let emailAddress of notification.notification.emails) {
          topic.addSubscription(new subscriptions.EmailSubscription(emailAddress));
        }
      }


      if (notification.notification.slack) {
        if (!denyAllPolicy) {
          denyAllPolicy = new iam.ManagedPolicy(this, this.resourceName(`${idPrefix}-deny-all-guardrail-policies`), {
            managedPolicyName: this.resourceName(`${idPrefix}-deny-all-guardrail-policies`),
            description: 'Deny all guardrail policies',
            statements: [
              new iam.PolicyStatement({
                effect: iam.Effect.DENY,
                actions: ['*'],
                resources: ['*'],
              }),
            ],
          });
        }

        if (!AccountChatbots.existsSlackChannel(this, notification.notification.slack)) {
          const id = this.resourceName(`slack-bot-${notification.notification.slack.slackWorkspaceId}-${notification.notification.slack.slackChannelId}`);
          AccountChatbots.addSlackChannel(this, id, {
            ...notification.notification.slack,
            guardrailPolicies: [
              denyAllPolicy,
            ],
          });
        }

        const slackChannel = AccountChatbots.findSlackChannel(this, notification.notification.slack);
        slackChannel.addNotificationTopic(topic);
      }
    }

  }
}
