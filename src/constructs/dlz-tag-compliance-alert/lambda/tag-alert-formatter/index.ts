import { DescribeAccountCommand, OrganizationsClient } from '@aws-sdk/client-organizations';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';

/**
 * Formats a central tag-compliance alert for Slack. The account NAME can't ride on the
 * cross-account forwarded event, so we resolve id -> name here (management account can call
 * Organizations for any member), cache it, then publish a Chatbot custom-notification message to
 * SNS. On any failure we fall back to the account id so an alert is never dropped.
 */

const org = new OrganizationsClient({});
const sns = new SNSClient({});
const nameCache: Record<string, string> = {};

interface ConfigComplianceEvent {
  readonly account: string;
  readonly region: string;
  readonly detail?: {
    readonly resourceType?: string;
    readonly resourceId?: string;
    readonly configRuleName?: string;
  };
}

async function accountName(accountId: string): Promise<string> {
  if (nameCache[accountId]) {
    return nameCache[accountId];
  }
  try {
    const res = await org.send(new DescribeAccountCommand({ AccountId: accountId }));
    const name = res.Account?.Name ?? accountId;
    nameCache[accountId] = name;
    return name;
  } catch {
    return accountId;
  }
}

export async function handler(event: ConfigComplianceEvent): Promise<void> {
  const id = event.account;
  const name = await accountName(id);
  const d = event.detail ?? {};
  const description = [
    `⚠️ Tag compliance — ${name} (${id}, ${event.region})`,
    `Resource: ${d.resourceType ?? '?'} ${d.resourceId ?? '?'}`,
    `Rule: ${d.configRuleName ?? '?'} is NON_COMPLIANT`,
  ].join('\n');

  const message = JSON.stringify({
    version: '1.0',
    source: 'custom',
    content: { title: 'Tag compliance alert', description },
  });

  await sns.send(new PublishCommand({ TopicArn: process.env.TOPIC_ARN, Message: message }));
}
