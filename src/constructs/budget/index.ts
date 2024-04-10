import * as budgets from 'aws-cdk-lib/aws-budgets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';

export interface BudgetSubscribers {
  readonly emails?: string[];
  readonly slackChannels?: string[];
}

export interface BudgetProps {
  readonly name: string;
  readonly amount: number;
  readonly forTags?: Record<string, string>;
  readonly subscribers :BudgetSubscribers;
}

export class Budget {
  public readonly budget: budgets.CfnBudget;
  public readonly notificationTopic: sns.Topic;

  constructor(scope: Construct, id: string, props: BudgetProps) {

    let costFilters: undefined | { TagKeyValue: string[] } = undefined;
    if (props.forTags) {
      costFilters = { TagKeyValue: [] };
      for (const [key, value] of Object.entries(props.forTags)) {
        costFilters.TagKeyValue.push(`user:${key}$` + value);
      }
    }

    this.notificationTopic = new sns.Topic(scope, `${id}-topic`, {
      topicName: `${id}-topic`,
    });
    this.notificationTopic.grantPublish(new iam.ServicePrincipal('budgets.amazonaws.com'));
    // topic.addToResourcePolicy(
    //   new iam.PolicyStatement({
    //     effect: iam.Effect.ALLOW,
    //     actions: ["SNS:Publish"],
    //     principals: [new iam.ServicePrincipal("budgets.amazonaws.com")],
    //     resources: [topic.topicArn]
    //   })
    // );
    if (props.subscribers.emails) {
      for (let emailAddress of props.subscribers.emails) {
        this.notificationTopic.addSubscription(new subscriptions.EmailSubscription(emailAddress));
      }
    }


    this.budget = new budgets.CfnBudget(scope, id, {
      budget: {
        budgetName: props.name,
        budgetType: 'COST',
        timeUnit: 'MONTHLY',
        budgetLimit: {
          amount: props.amount,
          unit: 'USD',
        },
        costTypes: {
          includeCredit: false,
        },
        costFilters: costFilters,
      },
      notificationsWithSubscribers: [
        {
          subscribers: [
            {
              subscriptionType: 'SNS',
              address: this.notificationTopic.topicArn,
            },
          ],
          notification: {
            comparisonOperator: 'GREATER_THAN',
            notificationType: 'ACTUAL',
            threshold: 100,
            thresholdType: 'PERCENTAGE',
          },
        },
        {
          subscribers: [
            {
              subscriptionType: 'SNS',
              address: this.notificationTopic.topicArn,
            },
          ],
          notification: {
            comparisonOperator: 'GREATER_THAN',
            notificationType: 'FORECASTED',
            threshold: 100,
            thresholdType: 'PERCENTAGE',
          },
        },
      ],
    });

  }
}
