import * as fs from 'fs';
import * as path from 'path';
import { Duration } from 'aws-cdk-lib';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as eventsources from 'aws-cdk-lib/aws-lambda-event-sources';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import { TAG_ALERT_READ_CROSS_ACCOUNT_ROLE_NAME } from '../../stacks/organization/constants';
import { AccountChatbots, SlackChannel } from '../account-chatbots';
import { ScpDenyResourceCreationWithoutStandardTags } from '../organization-policies/scp-presets';

/** Where the centralized tag-compliance alert is sent. Consumer-facing prop on `DataLandingZoneProps`. */
export interface DlzTagComplianceCentralAlertSubscribers {
  /** Emails that receive an alert when any workload account has a resource missing mandatory tags. */
  readonly emails?: string[];
  /** Slack channels that receive the alert (notify-only). Uses Chatbot in the management account. */
  readonly slacks?: SlackChannel[];
}

export interface DlzTagComplianceCentralAlertProps extends DlzTagComplianceCentralAlertSubscribers {
  /**
   * The AWS Organizations id (e.g. `o-xxxxxxxxxx`). Scopes the central bus resource policy so that
   * any account in the organization — and only those accounts — may forward events to the bus.
   */
  readonly organizationId: string;

  /**
   * The tag keys a resource must carry. The formatter reports which of these are missing, and drops
   * the finding when the resource turns out to carry them all.
   *
   * @default ScpDenyResourceCreationWithoutStandardTags.DEFAULT_TAG_KEYS
   */
  readonly mandatoryTagKeys?: string[];

  /**
   * How long a finding is held before the formatter reads it. The delay lets tags applied moments
   * after creation land before the alert is decided, so IaC deploys do not alert on themselves.
   *
   * @default Duration.minutes(2)
   */
  readonly alertDelay?: Duration;
}

/**
 * Central, org-wide sink for AWS Config tag non-compliance, created once in the management account.
 *
 * Owns a dedicated EventBridge event bus that every workload account forwards its NON_COMPLIANT
 * findings to (see `DlzTagComplianceForwardingRule`), plus one SNS topic and the Slack/email fan-out.
 * Modeled on budget alerts: a single account, a single topic, Chatbot for Slack. One topic and one
 * Slack config for the whole org, instead of one per workload account × region.
 */
export class DlzTagComplianceCentralAlert {
  /**
   * Fixed name of the central event bus. Single-sourced so the workload-side forwarding rules can
   * build the bus ARN (via `busArn`) without a cross-stack reference.
   */
  public static readonly BUS_NAME = 'dlz-tag-compliance-central-alert-bus';

  /** ARN of the central bus, derived from the management account id and the global region. */
  public static busArn(
    managementAccountId: string,
    globalRegion: string,
  ): string {
    return `arn:aws:events:${globalRegion}:${managementAccountId}:event-bus/${DlzTagComplianceCentralAlert.BUS_NAME}`;
  }

  /** Formatter Lambda code dir: the compiled handler in dev, else the projen-bundled asset. */
  private static formatterCodeDirectory(): string {
    const dir = path.join(__dirname, 'lambda', 'tag-alert-formatter');
    if (fs.existsSync(path.join(dir, 'index.js'))) {
      return dir;
    }
    return path.join(
      __dirname,
      '..',
      '..',
      '..',
      'assets',
      'constructs',
      'dlz-tag-compliance-alert',
      'lambda',
      'tag-alert-formatter',
    );
  }

  public readonly bus: events.EventBus;
  public readonly topic: sns.Topic;

  constructor(
    scope: Construct,
    id: string,
    props: DlzTagComplianceCentralAlertProps,
  ) {
    const emails = props.emails ?? [];
    const slacks = props.slacks ?? [];
    if (emails.length === 0 && slacks.length === 0) {
      throw new Error(
        `${id}: tagComplianceCentralAlert needs at least one email or slack channel.`,
      );
    }

    this.bus = new events.EventBus(scope, `${id}-bus`, {
      eventBusName: DlzTagComplianceCentralAlert.BUS_NAME,
    });
    // Allow every account in the organization (and only those) to forward events to this bus.
    // New accounts are covered automatically — no per-account grant.
    this.bus.addToResourcePolicy(
      new iam.PolicyStatement({
        sid: 'AllowOrgAccountsToPutEvents',
        effect: iam.Effect.ALLOW,
        principals: [new iam.AnyPrincipal()],
        actions: ['events:PutEvents'],
        resources: [this.bus.eventBusArn],
        conditions: {
          StringEquals: { 'aws:PrincipalOrgID': props.organizationId },
        },
      }),
    );

    this.topic = new sns.Topic(scope, `${id}-topic`, {
      topicName: `${id}-topic`,
    });

    // Formatter Lambda: resolves the source account id -> name and owner (SlackId tag) and publishes
    // a readable Chatbot message to the topic. Sits between the rule and SNS because neither the name
    // nor the owner is on the forwarded event (handler: lambda/tag-alert-formatter). Least-privilege:
    // DescribeAccount + ListTagsForResource + publish only.
    const formatter = new lambda.Function(scope, `${id}-formatter`, {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(
        DlzTagComplianceCentralAlert.formatterCodeDirectory(),
      ),
      timeout: Duration.seconds(60),
      environment: {
        TOPIC_ARN: this.topic.topicArn,
        READ_ROLE_NAME: TAG_ALERT_READ_CROSS_ACCOUNT_ROLE_NAME,
        MANDATORY_TAG_KEYS: (
          props.mandatoryTagKeys ??
          ScpDenyResourceCreationWithoutStandardTags.DEFAULT_TAG_KEYS
        ).join(','),
      },
    });
    this.topic.grantPublish(formatter);
    formatter.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          'organizations:DescribeAccount',
          'organizations:ListTagsForResource',
        ],
        resources: ['*'],
      }),
    );
    // Reads the resource's current tags and its creation event in the account that reported the
    // finding. Any account in the organization may report, so the resource is the role name in
    // every account rather than an enumerated list.
    formatter.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['sts:AssumeRole'],
        resources: [
          `arn:aws:iam::*:role/${TAG_ALERT_READ_CROSS_ACCOUNT_ROLE_NAME}`,
        ],
      }),
    );

    // Config evaluates a resource the moment it is created, which is often before the tags land.
    // Holding each finding briefly lets the formatter re-read the live tags and drop the alert if
    // the resource was tagged in the meantime. The queue also brings retries and a dead-letter
    // queue, which a direct Lambda target does not.
    const findings = new sqs.Queue(scope, `${id}-findings`, {
      queueName: `${id}-findings`,
      deliveryDelay: props.alertDelay ?? Duration.minutes(2),
      visibilityTimeout: Duration.minutes(5),
      retentionPeriod: Duration.days(4),
      deadLetterQueue: {
        maxReceiveCount: 3,
        queue: new sqs.Queue(scope, `${id}-findings-dlq`, {
          queueName: `${id}-findings-dlq`,
          retentionPeriod: Duration.days(14),
        }),
      },
    });
    formatter.addEventSource(
      new eventsources.SqsEventSource(findings, { batchSize: 1 }),
    );

    // The rule targets the queue (not the topic) so the alert shows the account name and skips
    // findings that are no longer valid by the time they are read.
    new events.Rule(scope, `${id}-rule`, {
      ruleName: `${id}-rule`,
      eventBus: this.bus,
      eventPattern: {
        source: ['aws.config'],
        detailType: ['Config Rules Compliance Change'],
        detail: {
          messageType: ['ComplianceChangeNotification'],
          newEvaluationResult: { complianceType: ['NON_COMPLIANT'] },
        },
      },
      targets: [new targets.SqsQueue(findings)],
    });

    for (const email of emails) {
      this.topic.addSubscription(new subscriptions.EmailSubscription(email));
    }

    // Reuse one Slack channel configuration per channel (shared via AccountChatbots) so budgets and
    // tag alerts can post to the same channel: an existing configuration just gets this topic added,
    // otherwise it is created. Deny-all guardrail keeps a newly created one notify-only.
    if (slacks.length > 0) {
      const guardrail = new iam.ManagedPolicy(
        scope,
        `${id}-chatbot-guardrail`,
        {
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.DENY,
              actions: ['*'],
              resources: ['*'],
            }),
          ],
        },
      );
      slacks.forEach((slack, index) => {
        if (AccountChatbots.existsSlackChannel(scope, slack)) {
          AccountChatbots.findSlackChannel(scope, slack).addNotificationTopic(
            this.topic,
          );
        } else {
          AccountChatbots.addSlackChannel(scope, `${id}-slack-${index}`, {
            slackChannelConfigurationName: slack.slackChannelConfigurationName,
            slackWorkspaceId: slack.slackWorkspaceId,
            slackChannelId: slack.slackChannelId,
            notificationTopics: [this.topic],
            guardrailPolicies: [guardrail],
          });
        }
      });
    }
  }
}

export interface DlzTagComplianceForwardingRuleProps {
  /** AWS Config rule names to watch. A resource turning NON_COMPLIANT on any of them is forwarded. */
  readonly configRuleNames: string[];
  /** ARN of the central event bus in the management account (see `DlzTagComplianceCentralAlert.busArn`). */
  readonly centralBusArn: string;
}

/**
 * Workload-side half of the centralized alert. Created per account × region: an EventBridge rule
 * that matches this region's NON_COMPLIANT tag findings and forwards them to the central event bus
 * in the management account (cross-account, cross-region — a single hop). No local SNS/Chatbot.
 */
export class DlzTagComplianceForwardingRule {
  constructor(
    scope: Construct,
    id: string,
    props: DlzTagComplianceForwardingRuleProps,
  ) {
    const centralBus = events.EventBus.fromEventBusArn(
      scope,
      `${id}-central-bus`,
      props.centralBusArn,
    );

    // EventBridge assumes this role to PutEvents on the central bus. A dedicated role scoped to the
    // one target bus is mandatory for cross-account event-bus targets.
    const role = new iam.Role(scope, `${id}-role`, {
      assumedBy: new iam.ServicePrincipal('events.amazonaws.com'),
    });
    role.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['events:PutEvents'],
        resources: [props.centralBusArn],
      }),
    );

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
      targets: [new targets.EventBus(centralBus, { role })],
    });
  }
}
