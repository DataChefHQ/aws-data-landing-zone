import {
  GuardDutyClient,
  EnableOrganizationAdminAccountCommand,
  ListOrganizationAdminAccountsCommand,
} from '@aws-sdk/client-guardduty';
import {
  OrganizationsClient,
  EnableAWSServiceAccessCommand,
} from '@aws-sdk/client-organizations';
import { CloudFormationCustomResourceCreateEvent } from 'aws-lambda';
import { handler } from '../../../src/constructs/dlz-guardduty/lambda/guardduty-delegated-admin';

jest.mock('@aws-sdk/client-guardduty');
jest.mock('@aws-sdk/client-organizations');

const mockGuardDutySend = jest.fn();
const mockOrgSend = jest.fn();
GuardDutyClient.prototype.send = mockGuardDutySend;
OrganizationsClient.prototype.send = mockOrgSend;

const createEvent: CloudFormationCustomResourceCreateEvent = {
  RequestType: 'Create',
  ServiceToken: 'test',
  ResourceType: 'Custom::DlzGuardDutyDelegatedAdmin',
  StackId: 'test-stack',
  RequestId: 'test-request',
  LogicalResourceId: 'test-logical',
  ResponseURL: '',
  ResourceProperties: {
    ServiceToken: 'test',
    physicalResourceId: 'test-id',
    auditAccountId: '123456789012',
  },
};

describe('GuardDuty Delegated Admin Lambda', () => {
  beforeEach(() => {
    mockGuardDutySend.mockReset();
    mockOrgSend.mockReset();
  });

  test('Create enables service access and designates admin', async () => {
    mockOrgSend.mockResolvedValueOnce({});
    mockGuardDutySend
      .mockResolvedValueOnce({ DetectorIds: ['detector-123'] }) // ListDetectors
      .mockResolvedValueOnce({ AdminAccounts: [] }) // ListOrganizationAdminAccounts
      .mockResolvedValueOnce({}); // EnableOrganizationAdminAccount

    const response = await handler(createEvent);

    expect(mockOrgSend).toHaveBeenCalledWith(expect.any(EnableAWSServiceAccessCommand));
    expect(mockGuardDutySend).toHaveBeenCalledWith(expect.any(ListOrganizationAdminAccountsCommand));
    expect(mockGuardDutySend).toHaveBeenCalledWith(expect.any(EnableOrganizationAdminAccountCommand));
    expect(response?.PhysicalResourceId).toBe('test-id');
  });

  test('Create is idempotent when already admin', async () => {
    mockOrgSend.mockResolvedValueOnce({});
    mockGuardDutySend
      .mockResolvedValueOnce({ DetectorIds: ['detector-123'] }) // ListDetectors
      .mockResolvedValueOnce({
        AdminAccounts: [{ AdminAccountId: '123456789012' }],
      });

    await handler(createEvent);

    expect(mockGuardDutySend).not.toHaveBeenCalledWith(expect.any(EnableOrganizationAdminAccountCommand));
  });
});
