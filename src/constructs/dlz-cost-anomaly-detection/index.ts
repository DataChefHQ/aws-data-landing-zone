import * as ce from 'aws-cdk-lib/aws-ce';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';
import { DlzAnomalyMonitorProps, DlzCostAnomalyDetectionProps } from './cost-anomaly-detection-types';
import { GlobalVariablesBudgetSnsCacheRecord } from '../../data-landing-zone-types';
import { AccountChatbots } from '../account-chatbots';
import { BudgetSubscribers } from '../dlz-budget';

export * from './cost-anomaly-detection-types';

/**
 * Cost Anomaly Detection — one `CfnAnomalyMonitor` + `CfnAnomalySubscription` per
 * configured monitor. Reuses `budgetSnsCache` so anomaly + budget alerts can share an SNS topic.
 */
export class DlzCostAnomalyDetection extends Construct {

  constructor(
    scope: Construct,
    id: string,
    props: DlzCostAnomalyDetectionProps,
    budgetSnsCache: Record<string, GlobalVariablesBudgetSnsCacheRecord>,
  ) {
    super(scope, id);

    for (const monitor of props.monitors) {
      this.createMonitor(monitor, budgetSnsCache);
    }
  }

  private createMonitor(
    props: DlzAnomalyMonitorProps,
    budgetSnsCache: Record<string, GlobalVariablesBudgetSnsCacheRecord>,
  ) {
    if (props.dimension && props.tagKey) {
      throw new Error(
        `Anomaly monitor '${props.name}' has both 'dimension' and 'tagKey' set. They are mutually exclusive.`,
      );
    }

    const monitorType = props.tagKey ? 'CUSTOM' : 'DIMENSIONAL';
    const monitorDimension = props.tagKey ? undefined : (props.dimension ?? 'SERVICE');

    const monitorSpecification = props.tagKey
      ? JSON.stringify({ Tags: { Key: props.tagKey, Values: ['*'] } })
      : undefined;

    const anomalyMonitor = new ce.CfnAnomalyMonitor(this, `${props.name}-monitor`, {
      monitorName: props.name,
      monitorType,
      monitorDimension,
      monitorSpecification,
    });

    const topic = this.resolveTopic(props.name, props.subscribers, budgetSnsCache);

    new ce.CfnAnomalySubscription(this, `${props.name}-subscription`, {
      subscriptionName: props.name,
      monitorArnList: [anomalyMonitor.attrMonitorArn],
      threshold: props.thresholdUsd,
      frequency: props.frequency ?? 'IMMEDIATE',
      subscribers: [{
        type: 'SNS',
        address: topic.topicArn,
      }],
    });
  }

  private resolveTopic(
    monitorName: string,
    subscribers: BudgetSubscribers,
    budgetSnsCache: Record<string, GlobalVariablesBudgetSnsCacheRecord>,
  ): sns.Topic {
    const topicName = subscribers.snsTopicName ?? `${monitorName}-topic`;

    const cached = budgetSnsCache[topicName];
    if (cached) {
      cached.topic.grantPublish(new iam.ServicePrincipal('costalerts.amazonaws.com'));
      return cached.topic;
    }

    const topic = new sns.Topic(this, topicName, { topicName });
    topic.grantPublish(new iam.ServicePrincipal('costalerts.amazonaws.com'));
    topic.grantPublish(new iam.ServicePrincipal('budgets.amazonaws.com'));

    if (subscribers.emails) {
      for (const email of subscribers.emails) {
        topic.addSubscription(new subscriptions.EmailSubscription(email));
      }
    }
    if (subscribers.slacks) {
      for (const slack of subscribers.slacks) {
        const slackChannel = AccountChatbots.findSlackChannel(this, slack);
        slackChannel.addNotificationTopic(topic);
      }
    }

    budgetSnsCache[topicName] = {
      topic,
      subscribers: {
        snsTopicName: topicName,
        emails: subscribers.emails,
        slacks: subscribers.slacks,
      },
    };
    return topic;
  }
}
