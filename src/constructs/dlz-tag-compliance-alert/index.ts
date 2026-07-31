import * as fs from 'fs';
import * as path from 'path';
import { Duration } from 'aws-cdk-lib';
import * as chatbot from 'aws-cdk-lib/aws-chatbot';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';
import { SlackChannel } from '../account-chatbots';

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
  public static busArn(managementAccountId: string, globalRegion: string): string {
    return `arn:aws:events:${globalRegion}:${managementAccountId}:event-bus/${DlzTagComplianceCentralAlert.BUS_NAME}`;
  }

  /** Formatter Lambda code dir: the compiled handler in dev, else the projen-bundled asset. */
  private static formatterCodeDirectory(): string {
    const dir = path.join(__dirname, 'lambda', 'tag-alert-formatter');
    if (fs.existsSync(path.join(dir, 'index.js'))) {
      return dir;
    }
    return path.join(__dirname, '..', '..', '..', 'assets', 'constructs', 'dlz-tag-compliance-alert', 'lambda', 'tag-alert-formatter');
  }

  public readonly bus: events.EventBus;
  public readonly topic: sns.Topic;

  constructor(scope: Construct, id: string, props: DlzTagComplianceCentralAlertProps) {
    const emails = props.emails ?? [];
    const slacks = props.slacks ?? [];
    if (emails.length === 0 && slacks.length === 0) {
      throw new Error(`${id}: tagComplianceCentralAlert needs at least one email or slack channel.`);
    }

    this.bus = new events.EventBus(scope, `${id}-bus`, {
      eventBusName: DlzTagComplianceCentralAlert.BUS_NAME,
    });
    // Allow every account in the organization (and only those) to forward events to this bus.
    // New accounts are covered automatically — no per-account grant.
    this.bus.addToResourcePolicy(new iam.PolicyStatement({
      sid: 'AllowOrgAccountsToPutEvents',
      effect: iam.Effect.ALLOW,
      principals: [new iam.AnyPrincipal()],
      actions: ['events:PutEvents'],
      resources: [this.bus.eventBusArn],
      conditions: { StringEquals: { 'aws:PrincipalOrgID': props.organizationId } },
    }));

    this.topic = new sns.Topic(scope, `${id}-topic`, { topicName: `${id}-topic` });

    // Formatter Lambda: resolves the source account id -> name and publishes a readable Chatbot
    // message to the topic. Sits between the rule and SNS because the name isn't on the forwarded
    // event (handler: lambda/tag-alert-formatter). Least-privilege: DescribeAccount + publish only.
    const formatter = new lambda.Function(scope, `${id}-formatter`, {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(DlzTagComplianceCentralAlert.formatterCodeDirectory()),
      timeout: Duration.seconds(15),
      environment: { TOPIC_ARN: this.topic.topicArn },
    });
    this.topic.grantPublish(formatter);
    formatter.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['organizations:DescribeAccount'],
      resources: ['*'],
    }));

    // The rule targets the formatter (not the topic directly) so the alert shows the account name.
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
      targets: [new targets.LambdaFunction(formatter)],
    });

    for (const email of emails) {
      this.topic.addSubscription(new subscriptions.EmailSubscription(email));
    }

    // Single account + single region, so no region-scoped name is needed (unlike the per-account
    // alert). Deny-all guardrail keeps it notify-only (no commands from Slack).
    if (slacks.length > 0) {
      const guardrail = new iam.ManagedPolicy(scope, `${id}-chatbot-guardrail`, {
        statements: [new iam.PolicyStatement({ effect: iam.Effect.DENY, actions: ['*'], resources: ['*'] })],
      });
      slacks.forEach((slack, index) => {
        new chatbot.SlackChannelConfiguration(scope, `${id}-slack-${index}`, {
          slackChannelConfigurationName: slack.slackChannelConfigurationName,
          slackWorkspaceId: slack.slackWorkspaceId,
          slackChannelId: slack.slackChannelId,
          notificationTopics: [this.topic],
          guardrailPolicies: [guardrail],
        });
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
  constructor(scope: Construct, id: string, props: DlzTagComplianceForwardingRuleProps) {
    const centralBus = events.EventBus.fromEventBusArn(scope, `${id}-central-bus`, props.centralBusArn);

    // EventBridge assumes this role to PutEvents on the central bus. A dedicated role scoped to the
    // one target bus is mandatory for cross-account event-bus targets.
    const role = new iam.Role(scope, `${id}-role`, {
      assumedBy: new iam.ServicePrincipal('events.amazonaws.com'),
    });
    role.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['events:PutEvents'],
      resources: [props.centralBusArn],
    }));

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
