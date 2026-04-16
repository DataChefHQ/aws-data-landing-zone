import {
  Macie2Client,
  EnableMacieCommand,
  EnableOrganizationAdminAccountCommand,
  DisableOrganizationAdminAccountCommand,
  ListOrganizationAdminAccountsCommand,
} from '@aws-sdk/client-macie2';
import {
  OrganizationsClient,
  EnableAWSServiceAccessCommand,
} from '@aws-sdk/client-organizations';
import {
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceDeleteEvent,
} from 'aws-lambda';
import { handler } from '../../../src/constructs/dlz-macie/lambda/macie-delegated-admin';

jest.mock('@aws-sdk/client-macie2');
jest.mock('@aws-sdk/client-organizations');

const mockMacieSend = jest.fn();
const mockOrgSend = jest.fn();
Macie2Client.prototype.send = mockMacieSend;
OrganizationsClient.prototype.send = mockOrgSend;

const createEvent: CloudFormationCustomResourceCreateEvent = {
  RequestType: 'Create',
  ServiceToken: 'test',
  ResourceType: 'Custom::DlzMacieDelegatedAdmin',
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

describe('Macie Delegated Admin Lambda', () => {
  beforeEach(() => {
    mockMacieSend.mockReset();
    mockOrgSend.mockReset();
  });

  test('Create enables Macie, service access, and designates admin', async () => {
    mockMacieSend
      .mockResolvedValueOnce({}) // EnableMacie
      .mockResolvedValueOnce({ adminAccounts: [] }) // ListOrganizationAdminAccounts
      .mockResolvedValueOnce({}); // EnableOrganizationAdminAccount
    mockOrgSend.mockResolvedValueOnce({}); // EnableAWSServiceAccess

    const response = await handler(createEvent);

    expect(mockMacieSend).toHaveBeenCalledWith(expect.any(EnableMacieCommand));
    expect(mockOrgSend).toHaveBeenCalledWith(expect.any(EnableAWSServiceAccessCommand));
    expect(mockMacieSend).toHaveBeenCalledWith(expect.any(ListOrganizationAdminAccountsCommand));
    expect(mockMacieSend).toHaveBeenCalledWith(expect.any(EnableOrganizationAdminAccountCommand));
    expect(response?.PhysicalResourceId).toBe('test-id');
  });

  test('Create is idempotent when already admin', async () => {
    mockMacieSend
      .mockResolvedValueOnce({}) // EnableMacie
      .mockResolvedValueOnce({
        adminAccounts: [{ accountId: '123456789012' }],
      }); // ListOrganizationAdminAccounts
    mockOrgSend.mockResolvedValueOnce({}); // EnableAWSServiceAccess

    await handler(createEvent);

    expect(mockMacieSend).not.toHaveBeenCalledWith(expect.any(EnableOrganizationAdminAccountCommand));
  });

  test('Create handles ConflictException when Macie already enabled', async () => {
    const conflictError = new Error('Macie is already enabled');
    conflictError.name = 'ConflictException';
    mockMacieSend
      .mockRejectedValueOnce(conflictError) // EnableMacie - already enabled
      .mockResolvedValueOnce({ adminAccounts: [] }) // ListOrganizationAdminAccounts
      .mockResolvedValueOnce({}); // EnableOrganizationAdminAccount
    mockOrgSend.mockResolvedValueOnce({}); // EnableAWSServiceAccess

    const response = await handler(createEvent);

    expect(response?.PhysicalResourceId).toBe('test-id');
    expect(mockMacieSend).toHaveBeenCalledWith(expect.any(EnableOrganizationAdminAccountCommand));
  });

  test('Delete removes delegated admin when account is admin', async () => {
    const deleteEvent: CloudFormationCustomResourceDeleteEvent = {
      ...createEvent,
      RequestType: 'Delete',
      PhysicalResourceId: 'test-id',
    };

    mockMacieSend
      .mockResolvedValueOnce({ adminAccounts: [{ accountId: '123456789012' }] }) // ListOrganizationAdminAccounts
      .mockResolvedValueOnce({}); // DisableOrganizationAdminAccount

    const response = await handler(deleteEvent);

    expect(mockMacieSend).toHaveBeenCalledWith(expect.any(ListOrganizationAdminAccountsCommand));
    expect(mockMacieSend).toHaveBeenCalledWith(expect.any(DisableOrganizationAdminAccountCommand));
    expect(response?.PhysicalResourceId).toBe('test-id');
  });

  test('Delete is idempotent when account is not admin', async () => {
    const deleteEvent: CloudFormationCustomResourceDeleteEvent = {
      ...createEvent,
      RequestType: 'Delete',
      PhysicalResourceId: 'test-id',
    };

    mockMacieSend
      .mockResolvedValueOnce({ adminAccounts: [] }); // ListOrganizationAdminAccounts

    const response = await handler(deleteEvent);

    expect(mockMacieSend).not.toHaveBeenCalledWith(expect.any(DisableOrganizationAdminAccountCommand));
    expect(response?.PhysicalResourceId).toBe('test-id');
  });
});
