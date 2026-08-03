import {
  DescribeAccountCommand,
  ListTagsForResourceCommand,
  OrganizationsClient,
} from '@aws-sdk/client-organizations';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';

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

export async function handler(event: ConfigComplianceEvent): Promise<void> {
  const id = event.account;
  const { accountName, slackId } = await accountInfo(id);
  const detail = event.detail ?? {};
  const resourceType = detail.resourceType ?? 'unknown';
  const resourceId = detail.resourceId ?? 'unknown';
  const mention = slackMention(slackId);

  // client-markdown: `**` = bold, `- ` = bullet. Lead with the two facts read first (account,
  // resource) as a bulleted list, account name bold.
  const lines = [
    `- Account: **${accountName}** (${id})`,
    `- Resource Type: ${resourceType}`,
    `- Resource ID: **${resourceId}**`,
    `- Region: ${event.region}`,
  ];
  if (mention) {
    lines.push(`- Owner: ${mention}`);
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
