import * as budgets from 'aws-cdk-lib/aws-budgets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';
import { GlobalVariablesBudgetSnsCacheRecord } from '../../data-landing-zone-types';
import { AccountChatbots, SlackChannel } from '../account-chatbots';


export interface BudgetSubscribers {
  /**
   * Optional, specify to reuse the same SNS topic for multiple budgets
   */
  readonly snsTopicName?: string;
  readonly emails?: string[];
  readonly slacks?: SlackChannel[];
}

export interface DlzBudgetProps {
  readonly name: string;
  readonly amount: number;
  readonly forTags?: Record<string, string>;
  readonly subscribers: BudgetSubscribers;
}

// Cache for SNS topics to avoid creating multiple topics for the same subscribers

export class DlzBudget {
  public readonly cfnBudget: budgets.CfnBudget;


  constructor(scope: Construct, id: string, props: DlzBudgetProps, budgetSnsCache: Record<string, GlobalVariablesBudgetSnsCacheRecord>) {

    let costFilters: undefined | { TagKeyValue: string[] } = undefined;
    if (props.forTags) {
      costFilters = { TagKeyValue: [] };
      for (const [key, value] of Object.entries(props.forTags)) {
        costFilters.TagKeyValue.push(`user:${key}$` + value);
      }
    }


    let notificationTopic: sns.Topic;

    if (props.subscribers.snsTopicName === undefined ||
      (props.subscribers.snsTopicName && !budgetSnsCache[props.subscribers.snsTopicName])) {
      const topicName = props.subscribers.snsTopicName || `${id}-topic`;
      notificationTopic = new sns.Topic(scope, topicName, {
        topicName: topicName,
      });
      notificationTopic.grantPublish(new iam.ServicePrincipal('budgets.amazonaws.com'));

      if (props.subscribers.emails) {
        for (const emailAddress of props.subscribers.emails) {
          notificationTopic.addSubscription(new subscriptions.EmailSubscription(emailAddress));
        }
      }
      if (props.subscribers.slacks) {
        for (const slack of props.subscribers.slacks) {
          const slackChannel = AccountChatbots.findSlackChannel(scope, slack);
          slackChannel.addNotificationTopic(notificationTopic);
        }
      }

      budgetSnsCache[topicName] = {
        topic: notificationTopic,
        subscribers: props.subscribers,
      };
    } else {
      notificationTopic = budgetSnsCache[props.subscribers.snsTopicName].topic;

      if (props.subscribers?.emails) {
        // If there are new emails not already subscribed, add them
        for (const emailSub of props.subscribers.emails) {
          if (!budgetSnsCache[props.subscribers.snsTopicName].subscribers.emails?.includes(emailSub)) {
            budgetSnsCache[props.subscribers.snsTopicName].topic.addSubscription(new subscriptions.EmailSubscription(emailSub));
          }
        }
        // Also update the cache that we have added them
        budgetSnsCache[props.subscribers.snsTopicName] = {
          topic: budgetSnsCache[props.subscribers.snsTopicName].topic,
          subscribers: {
            ...budgetSnsCache[props.subscribers.snsTopicName].subscribers,
            emails: [
              ...(budgetSnsCache[props.subscribers.snsTopicName].subscribers?.emails || []),
              ...props.subscribers.emails,
            ],
          },
        };
      }

      if (props.subscribers?.slacks) {
        // If there are new slack channels not already subscribed, add them
        for (const slackSub of props.subscribers.slacks) {
          const exists = budgetSnsCache[props.subscribers.snsTopicName].subscribers.slacks?.find(slack =>
            slack.slackChannelId === slackSub.slackChannelId && slack.slackWorkspaceId === slackSub.slackWorkspaceId,
          );
          if (!exists) {
            const slackChannel = AccountChatbots.findSlackChannel(scope, slackSub);
            slackChannel.addNotificationTopic(budgetSnsCache[props.subscribers.snsTopicName].topic);
          }
        }
        // Also update the cache that we have added them
        budgetSnsCache[props.subscribers.snsTopicName] = {
          topic: budgetSnsCache[props.subscribers.snsTopicName].topic,
          subscribers: {
            ...budgetSnsCache[props.subscribers.snsTopicName].subscribers,
            slacks: [
              ...(budgetSnsCache[props.subscribers.snsTopicName].subscribers?.slacks || []),
              ...props.subscribers.slacks,
            ],
          },
        };
      }
    }


    this.cfnBudget = new budgets.CfnBudget(scope, id, {
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
              address: notificationTopic.topicArn,
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
              address: notificationTopic.topicArn,
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
