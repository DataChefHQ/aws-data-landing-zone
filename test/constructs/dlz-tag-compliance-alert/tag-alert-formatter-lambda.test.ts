import { CloudTrailClient } from '@aws-sdk/client-cloudtrail';
import { ConfigServiceClient } from '@aws-sdk/client-config-service';
import { DescribeAccountCommand, ListTagsForResourceCommand, OrganizationsClient } from '@aws-sdk/client-organizations';
import { ResourceGroupsTaggingAPIClient } from '@aws-sdk/client-resource-groups-tagging-api';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { STSClient } from '@aws-sdk/client-sts';
import { handler } from '../../../src/constructs/dlz-tag-compliance-alert/lambda/tag-alert-formatter';

// Preserve Command constructors so tests can assert on the command types.
jest.mock('@aws-sdk/client-organizations', () => ({ ...jest.requireActual('@aws-sdk/client-organizations') }));
jest.mock('@aws-sdk/client-sns', () => ({ ...jest.requireActual('@aws-sdk/client-sns') }));

const orgSend = jest.fn();
const snsSend = jest.fn();
const stsSend = jest.fn();
const configSend = jest.fn();
const taggingSend = jest.fn();
const cloudTrailSend = jest.fn();
OrganizationsClient.prototype.send = orgSend as any;
SNSClient.prototype.send = snsSend as any;
STSClient.prototype.send = stsSend as any;
ConfigServiceClient.prototype.send = configSend as any;
ResourceGroupsTaggingAPIClient.prototype.send = taggingSend as any;
CloudTrailClient.prototype.send = cloudTrailSend as any;

process.env.TOPIC_ARN = 'arn:aws:sns:eu-west-1:999999999999:dlz-tag-alert';
process.env.READ_ROLE_NAME = 'dlz-tag-alert-read';
process.env.MANDATORY_TAG_KEYS = 'Owner,Project,Environment,CostCenter,Name';

const RESOURCE_ARN = 'arn:aws:dynamodb:eu-west-1:111111111111:table/test-table';

// The formatter caches assumed credentials per account, so each test uses its own account id.
function findingFrom(accountId: string) {
  return {
    Records: [{
      body: JSON.stringify({
        account: accountId,
        region: 'eu-west-1',
        detail: {
          resourceType: 'AWS::DynamoDB::Table',
          resourceId: 'test-table',
          configRuleName: 'dlz-global-config-required-tags',
        },
      }),
    }],
  };
}

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

function mockRecordedTags(tags: Record<string, string>) {
  configSend.mockResolvedValue({
    configurationItems: [{ arn: RESOURCE_ARN, resourceName: 'test-table', tags }],
  });
}

function mockLiveTags(tags: Record<string, string>) {
  taggingSend.mockResolvedValue({
    ResourceTagMappingList: [{
      ResourceARN: RESOURCE_ARN,
      Tags: Object.entries(tags).map(([Key, Value]) => ({ Key, Value })),
    }],
  });
}

function mockCreator(userIdentity: Record<string, any> | undefined) {
  cloudTrailSend.mockResolvedValue({
    Events: userIdentity ? [{ CloudTrailEvent: JSON.stringify({ userIdentity }) }] : [],
  });
}

const ALL_TAGS = {
  Owner: 'amir', Project: 'dlz', Environment: 'dev', CostCenter: 'eng', Name: 'test-table',
};

function lastPublishedMessage(): any {
  const cmd = snsSend.mock.calls.at(-1)![0] as PublishCommand;
  return JSON.parse(cmd.input.Message as string);
}

describe('tag-alert-formatter Lambda', () => {
  beforeEach(() => {
    orgSend.mockReset();
    snsSend.mockReset();
    stsSend.mockReset();
    configSend.mockReset();
    taggingSend.mockReset();
    cloudTrailSend.mockReset();
    snsSend.mockResolvedValue({});
    stsSend.mockResolvedValue({
      Credentials: { AccessKeyId: 'a', SecretAccessKey: 'b', SessionToken: 'c' },
    });
    mockOrg();
    mockRecordedTags({});
    mockLiveTags({});
    mockCreator({ type: 'AssumedRole', userName: 'amir' });
  });

  test('alerts for a human-created untagged resource, naming the missing tags', async () => {
    mockOrg({ name: 'sandbox', slackId: 'U123' });
    mockRecordedTags({ Owner: 'amir' });
    mockLiveTags({ Owner: 'amir' });

    await handler(findingFrom('111111111111'));

    const message = lastPublishedMessage();
    expect(message.source).toBe('custom');
    expect(message.content.textType).toBe('client-markdown');
    expect(message.content.description).toContain('• Account: *sandbox* (111111111111)');
    expect(message.content.description).toContain('• Owner: <@U123>');
    expect(message.content.description).toContain('• Missing tags: Project, Environment, CostCenter, Name');
  });

  test('names the creator', async () => {
    mockCreator({ type: 'AssumedRole', userName: 'amir', sessionContext: { sessionIssuer: { userName: 'Admin' } } });

    await handler(findingFrom('222222222222'));

    expect(lastPublishedMessage().content.description).toContain('• Created by: amir (role: Admin)');
  });

  test('points out a tag key that differs only in case', async () => {
    mockRecordedTags({ owner: 'amir', project: 'dlz' });
    mockLiveTags({ owner: 'amir', project: 'dlz' });

    await handler(findingFrom('333333333333'));

    const description = lastPublishedMessage().content.description;
    expect(description).toContain('• Did you mean? you set `owner` → needs `Owner`');
    expect(description).toContain('• Did you mean? you set `project` → needs `Project`');
  });

  test('stays silent when the resource was tagged after the finding was raised', async () => {
    mockRecordedTags({});
    mockLiveTags(ALL_TAGS);

    await handler(findingFrom('444444444444'));

    expect(snsSend).not.toHaveBeenCalled();
  });

  test('does not read live tags when the recorded item already carries every tag', async () => {
    mockRecordedTags(ALL_TAGS);

    await handler(findingFrom('555555555555'));

    expect(taggingSend).not.toHaveBeenCalled();
    expect(snsSend).not.toHaveBeenCalled();
  });

  test('stays silent for a resource an AWS service created', async () => {
    mockCreator({ type: 'AssumedRole', invokedBy: 'elasticloadbalancing.amazonaws.com' });

    await handler(findingFrom('666666666666'));

    expect(snsSend).not.toHaveBeenCalled();
  });

  test('stays silent for a service-linked role session', async () => {
    mockCreator({
      type: 'AssumedRole',
      sessionContext: { sessionIssuer: { arn: 'arn:aws:iam::1:role/aws-service-role/eks.amazonaws.com/AWSServiceRoleForAmazonEKS' } },
    });

    await handler(findingFrom('777777777777'));

    expect(snsSend).not.toHaveBeenCalled();
  });

  test('stays silent when no creation event is found, since the resource is not new', async () => {
    mockCreator(undefined);

    await handler(findingFrom('888888888888'));

    expect(snsSend).not.toHaveBeenCalled();
  });

  test('stays silent when the resource is not recorded, and never calls CloudTrail', async () => {
    configSend.mockResolvedValue({ configurationItems: [] });

    await handler(findingFrom('999999999999'));

    expect(cloudTrailSend).not.toHaveBeenCalled();
    expect(snsSend).not.toHaveBeenCalled();
  });

  test('swallows a failed cross-account read rather than losing the queue message', async () => {
    stsSend.mockRejectedValue(new Error('access denied'));

    await expect(handler(findingFrom('123456789012'))).resolves.toBeUndefined();
    expect(snsSend).not.toHaveBeenCalled();
  });
});
