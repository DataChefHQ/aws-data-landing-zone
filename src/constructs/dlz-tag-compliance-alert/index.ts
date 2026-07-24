import { Stack } from 'aws-cdk-lib';
import * as chatbot from 'aws-cdk-lib/aws-chatbot';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';
import { SlackChannel } from '../account-chatbots';

/** Where tag-compliance alerts are sent. Consumer-facing prop on `DataLandingZoneProps`. */
export interface DlzTagComplianceAlertSubscribers {
  /** Emails that receive an alert when a resource is found without its mandatory tags. */
  readonly emails?: string[];
  /** Slack channels that receive the alert (notify-only). */
  readonly slacks?: SlackChannel[];
}

export interface DlzTagComplianceAlertProps extends DlzTagComplianceAlertSubscribers {
  /**
   * AWS Config rule names to watch. A resource turning NON_COMPLIANT on any of them raises
   * an alert. AWS Config is regional, so this construct only covers the region it is created in.
   */
  readonly configRuleNames: string[];
}

/**
 * Detective alerting for AWS Config tag rules: routes NON_COMPLIANT findings to email and/or Slack.
 *
 * AWS Config emits a "Config Rules Compliance Change" event (per region) whenever a rule's
 * compliance flips. An EventBridge rule forwards only the NON_COMPLIANT ones for the given rules
 * to an SNS topic, which fans out to the subscribers. Detect-only — it never touches the resource.
 */
export class DlzTagComplianceAlert {
  public readonly topic: sns.Topic;

  constructor(scope: Construct, id: string, props: DlzTagComplianceAlertProps) {
    const emails = props.emails ?? [];
    const slacks = props.slacks ?? [];
    if (emails.length === 0 && slacks.length === 0) {
      throw new Error(`${id}: tagComplianceAlerts needs at least one email or slack channel.`);
    }

    this.topic = new sns.Topic(scope, `${id}-topic`, { topicName: `${id}-topic` });

    new events.Rule(scope, `${id}-rule`, {
      ruleName: `${id}-rule`,
      eventPattern: {
        source: ['aws.config'],
        detailType: ['Config Rules Compliance Change'],
        detail: {
          messageType: ['ComplianceChangeNotification'],
          configRuleName: props.configRuleNames,
          newEvaluationResult: { complianceType: ['NON_COMPLIANT'] },
        },
      },
      targets: [new targets.SnsTopic(this.topic)],
    });

    for (const email of emails) {
      this.topic.addSubscription(new subscriptions.EmailSubscription(email));
    }

    // Chatbot channel configs are account-global, so the name is region-scoped to stay unique
    // when this construct runs in every region. Deny-all guardrail = notify-only (no commands).
    if (slacks.length > 0) {
      const region = Stack.of(scope).region;
      const guardrail = new iam.ManagedPolicy(scope, `${id}-chatbot-guardrail`, {
        statements: [new iam.PolicyStatement({ effect: iam.Effect.DENY, actions: ['*'], resources: ['*'] })],
      });
      slacks.forEach((slack, index) => {
        new chatbot.SlackChannelConfiguration(scope, `${id}-slack-${index}`, {
          slackChannelConfigurationName: `${slack.slackChannelConfigurationName}-${region}`,
          slackWorkspaceId: slack.slackWorkspaceId,
          slackChannelId: slack.slackChannelId,
          notificationTopics: [this.topic],
          guardrailPolicies: [guardrail],
        });
      });
    }
  }
}
