import { DescribeAccountCommand, ListTagsForResourceCommand, OrganizationsClient } from '@aws-sdk/client-organizations';
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
  region: 'eu-west-1',
  detail: {
    resourceType: 'AWS::DynamoDB::Table',
    resourceId: 'test-table',
    configRuleName: 'dlz-global-config-required-tags',
  },
};

/** Default Organizations mock: DescribeAccount -> name, ListTagsForResource -> optional SlackId tag. */
function mockOrg({ name = 'sandbox', slackId }: { name?: string; slackId?: string } = {}) {
  orgSend.mockImplementation((cmd: any) => {
    if (cmd instanceof DescribeAccountCommand) {
      return Promise.resolve({ Account: { Name: name } });
    }
    if (cmd instanceof ListTagsForResourceCommand) {
      return Promise.resolve({ Tags: slackId ? [{ Key: 'SlackId', Value: slackId }] : [] });
    }
    return Promise.resolve({});
  });
}

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

  test('leads with account then resource, and publishes a client-markdown Chatbot message', async () => {
    mockOrg({ name: 'sandbox', slackId: 'U123' });

    await handler({ ...baseEvent, account: '111111111111' });

    const publish = snsSend.mock.calls.at(-1)![0] as PublishCommand;
    expect(publish.input.TopicArn).toBe(process.env.TOPIC_ARN);

    const msg = lastPublishedMessage();
    expect(msg.source).toBe('custom');
    expect(msg.content.textType).toBe('client-markdown');
    expect(msg.content.title).toContain('sandbox');

    const lines = (msg.content.description as string).split('\n');
    expect(lines[0]).toBe('- Account: **sandbox** (111111111111)');
    expect(lines[1]).toBe('- Resource Type: AWS::DynamoDB::Table');
    expect(lines[2]).toBe('- Resource ID: **test-table**');
    expect(msg.content.description).toContain('- Region: eu-west-1');
  });

  test('mentions a user (U…) with <@…>', async () => {
    mockOrg({ slackId: 'U08RF04QQPQ' });

    await handler({ ...baseEvent, account: '222222222222' });

    expect(lastPublishedMessage().content.description).toContain('Owner: <@U08RF04QQPQ>');
  });

  test('mentions a user group (S…) with <!subteam^…>', async () => {
    mockOrg({ slackId: 'S053XJ1E5KJ' });

    await handler({ ...baseEvent, account: '333333333333' });

    expect(lastPublishedMessage().content.description).toContain('Owner: <!subteam^S053XJ1E5KJ>');
  });

  test('omits the owner line when the account has no SlackId tag, and still publishes', async () => {
    mockOrg({ name: 'no-owner' });

    await handler({ ...baseEvent, account: '444444444444' });

    expect(snsSend).toHaveBeenCalledWith(expect.any(PublishCommand));
    expect(lastPublishedMessage().content.description).not.toContain('Owner:');
  });

  test('falls back to the account id when the name lookup fails, and still publishes', async () => {
    orgSend.mockImplementation((cmd: any) => {
      if (cmd instanceof DescribeAccountCommand) {
        return Promise.reject(new Error('AccessDenied'));
      }
      return Promise.resolve({ Tags: [] });
    });

    await handler({ ...baseEvent, account: '555555555555' });

    expect(lastPublishedMessage().content.description).toContain('- Account: **555555555555** (555555555555)');
  });

  test('caches account info so repeated events cost one lookup each', async () => {
    mockOrg({ name: 'cached', slackId: 'U1' });

    await handler({ ...baseEvent, account: '666666666666' });
    await handler({ ...baseEvent, account: '666666666666' });

    const describes = orgSend.mock.calls.filter(([c]) => c instanceof DescribeAccountCommand);
    const tagLookups = orgSend.mock.calls.filter(([c]) => c instanceof ListTagsForResourceCommand);
    expect(describes).toHaveLength(1);
    expect(tagLookups).toHaveLength(1);
    expect(snsSend).toHaveBeenCalledTimes(2);
  });

  test('renders "unknown" for missing resource fields', async () => {
    mockOrg({ name: 'n' });

    await handler({ account: '777777777777', region: 'eu-west-1' } as any);

    const d = lastPublishedMessage().content.description;
    expect(d).toContain('- Resource Type: unknown');
    expect(d).toContain('- Resource ID: **unknown**');
  });
});
