import {
  DescribeAccountCommand,
  ListTagsForResourceCommand,
  OrganizationsClient,
} from '@aws-sdk/client-organizations';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import {
  assumeReadRole,
  liveTagKeys,
  lookupCreator,
  recordedResource,
} from './member-account-reader';
import { recordOutcome } from './metrics';
import { missingTagKeys, nearMisses } from './tag-key-comparison';

/**
 * Formats a central tag-compliance alert for Slack. Neither the account name nor its owner ride on
 * the cross-account forwarded event, so we resolve id -> name (DescribeAccount) and id -> SlackId tag
 * (ListTagsForResource) here — the management account can call Organizations for any member — cache
 * both, then publish a Chatbot custom-notification message to SNS. The message leads with the two
 * facts on-callers need first (which account, which resource) and @mentions the owner when known.
 * On any lookup failure we degrade gracefully (fall back to the id, drop the mention) so an alert is
 * never lost.
 */

const org = new OrganizationsClient({});
const sns = new SNSClient({});

interface AccountInfo {
  readonly accountName: string;
  readonly slackId?: string;
}
const infoCache: Record<string, AccountInfo> = {};

interface ConfigComplianceEvent {
  readonly account: string;
  readonly region: string;
  readonly detail?: {
    readonly resourceType?: string;
    readonly resourceId?: string;
    readonly configRuleName?: string;
  };
}

interface SqsEvent {
  readonly Records: { readonly body: string }[];
}

async function accountInfo(accountId: string): Promise<AccountInfo> {
  if (infoCache[accountId]) {
    return infoCache[accountId];
  }
  let name = accountId;
  let slackId: string | undefined;
  try {
    const res = await org.send(new DescribeAccountCommand({ AccountId: accountId }));
    name = res.Account?.Name ?? accountId;
  } catch {
    // Keep the id as the display name.
  }
  try {
    const res = await org.send(new ListTagsForResourceCommand({ ResourceId: accountId }));
    slackId = res.Tags?.find((t) => t.Key === 'SlackId')?.Value || undefined;
  } catch {
    // No owner mention if the tags can't be read.
  }
  const info: AccountInfo = { accountName: name, slackId };
  infoCache[accountId] = info;
  return info;
}

/** Slack mention token: a user group id starts with `S` (`<!subteam^…>`), otherwise a user (`<@…>`). */
function slackMention(slackId?: string): string | undefined {
  if (!slackId) {
    return undefined;
  }
  return slackId.startsWith('S') ? `<!subteam^${slackId}>` : `<@${slackId}>`;
}

export async function handler(sqsEvent: SqsEvent): Promise<void> {
  for (const record of sqsEvent.Records) {
    await handleFinding(JSON.parse(record.body));
  }
}

/**
 * Decides whether one finding deserves a Slack message, cheapest check first so the rate-limited
 * CloudTrail lookup only runs for the few findings that survive everything else.
 */
async function handleFinding(event: ConfigComplianceEvent): Promise<void> {
  const accountId = event.account;
  const region = event.region;
  const detail = event.detail ?? {};
  const resourceType = detail.resourceType ?? 'unknown';
  const resourceId = detail.resourceId ?? 'unknown';
  const context = { accountId, region, resourceType, resourceId };

  const requiredKeys = (process.env.MANDATORY_TAG_KEYS ?? '').split(',').filter(Boolean);
  let credentials;
  let recorded;
  try {
    credentials = await assumeReadRole(accountId, process.env.READ_ROLE_NAME!);
    recorded = await recordedResource(resourceType, resourceId, region, credentials);
  } catch (error) {
    recordOutcome('lookup_failed', { ...context, error: `${error}` });
    return;
  }

  if (!recorded.arn) {
    recordOutcome('dropped_not_recorded', context);
    return;
  }

  let presentKeys = recorded.tagKeys;
  if (missingTagKeys(requiredKeys, presentKeys).length > 0) {
    presentKeys = await liveTagKeys(recorded.arn, region, credentials);
  }
  const missing = missingTagKeys(requiredKeys, presentKeys);
  if (missing.length === 0) {
    recordOutcome('dropped_already_tagged', context);
    return;
  }

  const creator = await lookupCreator(
    recorded.resourceName ?? resourceId, region, credentials, new Date(),
  );
  if (creator.createdByAwsService) {
    recordOutcome('dropped_aws_service', context);
    return;
  }
  if (creator.noEventFound) {
    recordOutcome('dropped_no_event', context);
    return;
  }

  await publishAlert({ ...context, missing, presentKeys, createdBy: creator.createdBy });
  recordOutcome('alert_sent', context);
}

interface AlertDetails {
  readonly accountId: string;
  readonly region: string;
  readonly resourceType: string;
  readonly resourceId: string;
  readonly missing: string[];
  readonly presentKeys: string[];
  readonly createdBy?: string;
}

async function publishAlert(details: AlertDetails): Promise<void> {
  const { accountName, slackId } = await accountInfo(details.accountId);
  const mention = slackMention(slackId);

  const lines = [
    `• Account: *${accountName}* (${details.accountId})`,
    `• Resource Type: ${details.resourceType}`,
    `• Resource ID: *${details.resourceId}*`,
    `• Region: ${details.region}`,
  ];
  if (mention) {
    lines.push(`• Owner: ${mention}`);
  }
  if (details.createdBy) {
    lines.push(`• Created by: ${details.createdBy}`);
  }
  lines.push(`• Missing tags: ${details.missing.join(', ')}`);
  for (const nearMiss of nearMisses(details.missing, details.presentKeys)) {
    lines.push(`• Did you mean? you set \`${nearMiss.present}\` → needs \`${nearMiss.required}\``);
  }
  lines.push('', 'This resource is missing mandatory tags. Please tag it.');

  const message = JSON.stringify({
    version: '1.0',
    source: 'custom',
    content: {
      textType: 'client-markdown',
      title: `⚠️ Untagged resource in ${accountName}`,
      description: lines.join('\n'),
    },
  });

  await sns.send(
    new PublishCommand({ TopicArn: process.env.TOPIC_ARN, Message: message }),
  );
}
