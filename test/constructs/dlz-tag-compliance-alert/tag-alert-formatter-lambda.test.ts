import { DescribeAccountCommand, OrganizationsClient } from '@aws-sdk/client-organizations';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { handler } from '../../../src/constructs/dlz-tag-compliance-alert/lambda/tag-alert-formatter';

// Preserve Command constructors so tests can assert on the command types.
jest.mock('@aws-sdk/client-organizations', () => ({ ...jest.requireActual('@aws-sdk/client-organizations') }));
jest.mock('@aws-sdk/client-sns', () => ({ ...jest.requireActual('@aws-sdk/client-sns') }));

const orgSend = jest.fn();
const snsSend = jest.fn();
OrganizationsClient.prototype.send = orgSend as any;
SNSClient.prototype.send = snsSend as any;

process.env.TOPIC_ARN = 'arn:aws:sns:eu-west-1:999999999999:dlz-tag-alert';

const baseEvent = {
  account: '111111111111',
  region: 'eu-west-1',
  detail: {
    resourceType: 'AWS::DynamoDB::Table',
    resourceId: 'test-table',
    configRuleName: 'dlz-global-config-required-tags',
  },
};

/** The parsed body of the most recent SNS publish. */
function lastPublishedMessage(): any {
  const cmd = snsSend.mock.calls.at(-1)![0] as PublishCommand;
  return JSON.parse(cmd.input.Message as string);
}

describe('tag-alert-formatter Lambda', () => {
  beforeEach(() => {
    orgSend.mockReset();
    snsSend.mockReset();
    snsSend.mockResolvedValue({});
  });

  test('resolves the account name and publishes a Chatbot custom message to the topic', async () => {
    orgSend.mockResolvedValueOnce({ Account: { Name: 'sandbox' } });

    await handler({ ...baseEvent, account: '111111111111' });

    expect(orgSend).toHaveBeenCalledWith(expect.any(DescribeAccountCommand));
    const publish = snsSend.mock.calls.at(-1)![0] as PublishCommand;
    expect(publish.input.TopicArn).toBe(process.env.TOPIC_ARN);

    const msg = lastPublishedMessage();
    expect(msg.source).toBe('custom');
    expect(msg.content.description).toContain('Account Name: sandbox');
    expect(msg.content.description).toContain('Account ID: 111111111111');
    expect(msg.content.description).toContain('Region: eu-west-1');
    expect(msg.content.description).toContain('Resource Type: AWS::DynamoDB::Table');
    expect(msg.content.description).toContain('Resource ID: test-table');
  });

  test('falls back to the account id when the name lookup fails, and still publishes', async () => {
    orgSend.mockRejectedValueOnce(new Error('AccessDenied'));

    await handler({ ...baseEvent, account: '222222222222' });

    expect(snsSend).toHaveBeenCalledWith(expect.any(PublishCommand));
    expect(lastPublishedMessage().content.description).toContain('222222222222');
  });

  test('caches the name so repeated events cost one lookup', async () => {
    orgSend.mockResolvedValue({ Account: { Name: 'cached' } });

    await handler({ ...baseEvent, account: '333333333333' });
    await handler({ ...baseEvent, account: '333333333333' });

    const lookups = orgSend.mock.calls.filter(([c]) => c instanceof DescribeAccountCommand);
    expect(lookups).toHaveLength(1);
    expect(snsSend).toHaveBeenCalledTimes(2);
  });

  test('renders "unknown" for missing resource fields', async () => {
    orgSend.mockResolvedValueOnce({ Account: { Name: 'n' } });

    await handler({ account: '444444444444', region: 'eu-west-1' } as any);

    const description = lastPublishedMessage().content.description;
    expect(description).toContain('Resource Type: unknown');
    expect(description).toContain('Resource ID: unknown');
  });
});
