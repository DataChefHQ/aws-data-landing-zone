import {
  GuardDutyClient,
  ListDetectorsCommand,
  CreateMembersCommand,
  DeleteMembersCommand,
  DisassociateMembersCommand,
  UpdateMemberDetectorsCommand,
} from '@aws-sdk/client-guardduty';
import { CloudFormationCustomResourceCreateEvent } from 'aws-lambda';
import { handler } from '../../../src/constructs/dlz-guardduty/lambda/guardduty-member-features';

jest.mock('@aws-sdk/client-guardduty');

const mockSend = jest.fn();
GuardDutyClient.prototype.send = mockSend;

const createEvent: CloudFormationCustomResourceCreateEvent = {
  RequestType: 'Create',
  ServiceToken: 'test',
  ResourceType: 'Custom::DlzGuardDutyMemberFeatures',
  StackId: 'test-stack',
  RequestId: 'test-request',
  LogicalResourceId: 'test-logical',
  ResponseURL: '',
  ResourceProperties: {
    ServiceToken: 'test',
    physicalResourceId: 'test-id',
    enrollAccounts: JSON.stringify([{ accountId: '111111111111', email: 'test@example.com' }]),
    memberFeatureGroups: JSON.stringify([{
      accountIds: ['111111111111'],
      features: [{ name: 'S3_DATA_EVENTS', status: 'ENABLED' }],
    }]),
  },
};

describe('GuardDuty Member Features Lambda', () => {
  beforeEach(() => {
    mockSend.mockReset();
  });

  test('Create enrolls accounts and updates features', async () => {
    mockSend
      .mockResolvedValueOnce({ DetectorIds: ['detector-123'] }) // ListDetectors
      .mockResolvedValueOnce({ Members: [], UnprocessedAccounts: [] }) // GetMembers (pre-check)
      .mockResolvedValueOnce({ UnprocessedAccounts: [] }) // CreateMembers
      .mockResolvedValueOnce({ Members: [{ AccountId: '111111111111', RelationshipStatus: 'Enabled' }] }) // ListMembers (verify)
      .mockResolvedValueOnce({ UnprocessedAccounts: [] }); // UpdateMemberDetectors

    const response = await handler(createEvent);

    expect(mockSend).toHaveBeenCalledWith(expect.any(ListDetectorsCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(CreateMembersCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(UpdateMemberDetectorsCommand));
    expect(response?.PhysicalResourceId).toBe('test-id');
  });

  test('throws when no detector found', async () => {
    mockSend.mockResolvedValueOnce({ DetectorIds: [] });

    await expect(handler(createEvent)).rejects.toThrow('No GuardDuty detector found');
  });

  test('skips enrollment when no enrollAccounts provided', async () => {
    const eventWithoutEnroll: CloudFormationCustomResourceCreateEvent = {
      ...createEvent,
      ResourceProperties: {
        ServiceToken: 'test',
        physicalResourceId: 'test-id',
        memberFeatureGroups: JSON.stringify([{
          accountIds: ['111111111111'],
          features: [{ name: 'S3_DATA_EVENTS', status: 'ENABLED' }],
        }]),
      },
    };

    mockSend
      .mockResolvedValueOnce({ DetectorIds: ['detector-123'] }) // ListDetectors
      .mockResolvedValueOnce({ UnprocessedAccounts: [] }); // UpdateMemberDetectors

    await handler(eventWithoutEnroll);

    expect(mockSend).not.toHaveBeenCalledWith(expect.any(CreateMembersCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(UpdateMemberDetectorsCommand));
  });

  test('disenrolls accounts via DisassociateMembers + DeleteMembers', async () => {
    const disenrollEvent: CloudFormationCustomResourceCreateEvent = {
      ...createEvent,
      ResourceProperties: {
        ServiceToken: 'test',
        physicalResourceId: 'test-id',
        disenrollAccountIds: JSON.stringify(['222222222222']),
      },
    };

    mockSend
      .mockResolvedValueOnce({ DetectorIds: ['detector-123'] }) // ListDetectors
      .mockResolvedValueOnce({ UnprocessedAccounts: [] }) // DisassociateMembers
      .mockResolvedValueOnce({ UnprocessedAccounts: [] }); // DeleteMembers

    const response = await handler(disenrollEvent);

    expect(mockSend).toHaveBeenCalledWith(expect.any(DisassociateMembersCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(DeleteMembersCommand));
    expect(response?.PhysicalResourceId).toBe('test-id');
  });

  test('handles both enroll and disenroll in same event', async () => {
    const bothEvent: CloudFormationCustomResourceCreateEvent = {
      ...createEvent,
      ResourceProperties: {
        ServiceToken: 'test',
        physicalResourceId: 'test-id',
        enrollAccounts: JSON.stringify([{ accountId: '111111111111', email: 'test@example.com' }]),
        disenrollAccountIds: JSON.stringify(['222222222222']),
      },
    };

    mockSend
      .mockResolvedValueOnce({ DetectorIds: ['detector-123'] }) // ListDetectors
      .mockResolvedValueOnce({ UnprocessedAccounts: [] }) // DisassociateMembers
      .mockResolvedValueOnce({ UnprocessedAccounts: [] }) // DeleteMembers
      .mockResolvedValueOnce({ Members: [], UnprocessedAccounts: [] }) // GetMembers (pre-check)
      .mockResolvedValueOnce({ UnprocessedAccounts: [] }) // CreateMembers
      .mockResolvedValueOnce({ Members: [{ AccountId: '111111111111' }] }); // ListMembers (verify)

    await handler(bothEvent);

    expect(mockSend).toHaveBeenCalledWith(expect.any(DisassociateMembersCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(DeleteMembersCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(CreateMembersCommand));
  });
});
