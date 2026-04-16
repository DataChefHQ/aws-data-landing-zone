import {
  CreateMemberCommand,
  DeleteMemberCommand,
  DisassociateMemberCommand,
  GetMemberCommand,
  Macie2Client,
} from '@aws-sdk/client-macie2';
import { CloudFormationCustomResourceCreateEvent } from 'aws-lambda';
import { handler } from '../../../src/constructs/dlz-macie/lambda/macie-members';

jest.mock('@aws-sdk/client-macie2');

const mockSend = jest.fn();
Macie2Client.prototype.send = mockSend;

const createEvent: CloudFormationCustomResourceCreateEvent = {
  RequestType: 'Create',
  ServiceToken: 'test',
  ResourceType: 'Custom::DlzMacieMembers',
  StackId: 'test-stack',
  RequestId: 'test-request',
  LogicalResourceId: 'test-logical',
  ResponseURL: '',
  ResourceProperties: {
    ServiceToken: 'test',
    physicalResourceId: 'test-id',
    enrollAccounts: JSON.stringify([{ accountId: '111111111111', email: 'test@example.com' }]),
  },
};

describe('Macie Members Lambda', () => {
  beforeEach(() => {
    mockSend.mockReset();
  });

  test('Create enrolls accounts via GetMember + CreateMember', async () => {
    const notFoundError = new Error('Member not found');
    notFoundError.name = 'ResourceNotFoundException';
    mockSend
      .mockRejectedValueOnce(notFoundError) // GetMember - not found
      .mockResolvedValueOnce({ arn: 'arn:aws:macie2:us-east-1:123:member/111111111111' }) // CreateMember
      .mockResolvedValueOnce({ members: [{ accountId: '111111111111', relationshipStatus: 'Enabled' }] }); // ListMembers

    const response = await handler(createEvent);

    expect(mockSend).toHaveBeenCalledWith(expect.any(GetMemberCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(CreateMemberCommand));
    expect(response?.PhysicalResourceId).toBe('test-id');
  });

  test('Create skips enrollment when account already exists', async () => {
    mockSend
      .mockResolvedValueOnce({ relationshipStatus: 'Enabled' }) // GetMember - already exists
      .mockResolvedValueOnce({ members: [{ accountId: '111111111111' }] }); // ListMembers

    await handler(createEvent);

    expect(mockSend).toHaveBeenCalledWith(expect.any(GetMemberCommand));
    expect(mockSend).not.toHaveBeenCalledWith(expect.any(CreateMemberCommand));
  });

  test('disenrolls accounts via GetMember + DisassociateMember + DeleteMember', async () => {
    const disenrollEvent: CloudFormationCustomResourceCreateEvent = {
      ...createEvent,
      ResourceProperties: {
        ServiceToken: 'test',
        physicalResourceId: 'test-id',
        disenrollAccountIds: JSON.stringify(['222222222222']),
      },
    };

    mockSend
      .mockResolvedValueOnce({ relationshipStatus: 'Enabled' }) // GetMember - exists
      .mockResolvedValueOnce({}) // DisassociateMember
      .mockResolvedValueOnce({}); // DeleteMember

    const response = await handler(disenrollEvent);

    expect(mockSend).toHaveBeenCalledWith(expect.any(GetMemberCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(DisassociateMemberCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(DeleteMemberCommand));
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

    const notFoundError = new Error('Member not found');
    notFoundError.name = 'ResourceNotFoundException';
    mockSend
      .mockResolvedValueOnce({ relationshipStatus: 'Enabled' }) // GetMember for disenroll - exists
      .mockResolvedValueOnce({}) // DisassociateMember
      .mockResolvedValueOnce({}) // DeleteMember
      .mockRejectedValueOnce(notFoundError) // GetMember for enroll - not found
      .mockResolvedValueOnce({ arn: 'arn:aws:macie2:us-east-1:123:member/111111111111' }) // CreateMember
      .mockResolvedValueOnce({ members: [{ accountId: '111111111111' }] }); // ListMembers

    await handler(bothEvent);

    expect(mockSend).toHaveBeenCalledWith(expect.any(DisassociateMemberCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(DeleteMemberCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(CreateMemberCommand));
  });

  test('throws when GetMember returns non-ResourceNotFoundException error', async () => {
    const accessDenied = new Error('Access denied');
    accessDenied.name = 'AccessDeniedException';
    mockSend.mockRejectedValueOnce(accessDenied); // GetMember - access denied

    await expect(handler(createEvent)).rejects.toThrow('Access denied');
  });

  test('disenrollment skips account that is not a member', async () => {
    const disenrollEvent: CloudFormationCustomResourceCreateEvent = {
      ...createEvent,
      ResourceProperties: {
        ServiceToken: 'test',
        physicalResourceId: 'test-id',
        disenrollAccountIds: JSON.stringify(['222222222222']),
      },
    };

    const notFoundError = new Error('Member not found');
    notFoundError.name = 'ResourceNotFoundException';
    mockSend.mockRejectedValueOnce(notFoundError); // GetMember - not found

    const response = await handler(disenrollEvent);

    expect(mockSend).not.toHaveBeenCalledWith(expect.any(DisassociateMemberCommand));
    expect(mockSend).not.toHaveBeenCalledWith(expect.any(DeleteMemberCommand));
    expect(response?.PhysicalResourceId).toBe('test-id');
  });

  test('disenrollment throws on non-ResourceNotFoundException from GetMember', async () => {
    const disenrollEvent: CloudFormationCustomResourceCreateEvent = {
      ...createEvent,
      ResourceProperties: {
        ServiceToken: 'test',
        physicalResourceId: 'test-id',
        disenrollAccountIds: JSON.stringify(['222222222222']),
      },
    };

    const accessDenied = new Error('Access denied');
    accessDenied.name = 'AccessDeniedException';
    mockSend.mockRejectedValueOnce(accessDenied); // GetMember - access denied

    await expect(handler(disenrollEvent)).rejects.toThrow('Access denied');
  });

  test('skips enrollment when no enrollAccounts provided', async () => {
    const eventWithoutEnroll: CloudFormationCustomResourceCreateEvent = {
      ...createEvent,
      ResourceProperties: {
        ServiceToken: 'test',
        physicalResourceId: 'test-id',
      },
    };

    const response = await handler(eventWithoutEnroll);

    expect(mockSend).not.toHaveBeenCalledWith(expect.any(CreateMemberCommand));
    expect(response?.PhysicalResourceId).toBe('test-id');
  });
});
