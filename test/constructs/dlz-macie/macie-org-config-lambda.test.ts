import {
  Macie2Client,
  EnableMacieCommand,
  UpdateOrganizationConfigurationCommand,
} from '@aws-sdk/client-macie2';
import {
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceDeleteEvent,
  CloudFormationCustomResourceUpdateEvent,
} from 'aws-lambda';
import { handler } from '../../../src/constructs/dlz-macie/lambda/macie-org-config';

jest.mock('@aws-sdk/client-macie2');

const mockSend = jest.fn();
Macie2Client.prototype.send = mockSend;

const baseEvent = {
  ServiceToken: 'test',
  ResourceType: 'Custom::DlzMacieOrgConfig',
  StackId: 'test-stack',
  RequestId: 'test-request',
  LogicalResourceId: 'test-logical',
  ResponseURL: '',
  ResourceProperties: {
    ServiceToken: 'test',
    physicalResourceId: 'test-id',
    autoEnable: 'true',
  },
};

const createEvent: CloudFormationCustomResourceCreateEvent = {
  ...baseEvent,
  RequestType: 'Create',
};

const updateEvent: CloudFormationCustomResourceUpdateEvent = {
  ...baseEvent,
  RequestType: 'Update',
  OldResourceProperties: { ServiceToken: 'test' },
  PhysicalResourceId: 'test-id',
};

const deleteEvent: CloudFormationCustomResourceDeleteEvent = {
  ...baseEvent,
  RequestType: 'Delete',
  PhysicalResourceId: 'test-id',
};

describe('Macie Org Config Lambda', () => {
  beforeEach(() => {
    mockSend.mockReset();
  });

  test('Create enables Macie and updates org configuration', async () => {
    mockSend
      .mockResolvedValueOnce({}) // EnableMacie
      .mockResolvedValueOnce({}); // UpdateOrganizationConfiguration

    const response = await handler(createEvent);

    expect(mockSend).toHaveBeenCalledTimes(2);
    expect(mockSend).toHaveBeenCalledWith(expect.any(EnableMacieCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(UpdateOrganizationConfigurationCommand));
    expect(response?.PhysicalResourceId).toBe('test-id');
  });

  test('Create passes correct autoEnable=true to UpdateOrganizationConfiguration', async () => {
    mockSend
      .mockResolvedValueOnce({}) // EnableMacie
      .mockResolvedValueOnce({}); // UpdateOrganizationConfiguration

    await handler(createEvent);

    const updateInput = (UpdateOrganizationConfigurationCommand as unknown as jest.Mock).mock.calls[0][0];
    expect(updateInput.autoEnable).toBe(true);
  });

  test('Create passes correct autoEnable=false', async () => {
    const falseEvent: CloudFormationCustomResourceCreateEvent = {
      ...createEvent,
      ResourceProperties: {
        ...createEvent.ResourceProperties,
        autoEnable: 'false',
      },
    };

    mockSend
      .mockResolvedValueOnce({}) // EnableMacie
      .mockResolvedValueOnce({}); // UpdateOrganizationConfiguration

    await handler(falseEvent);

    const updateInput = (UpdateOrganizationConfigurationCommand as unknown as jest.Mock).mock.calls[0][0];
    expect(updateInput.autoEnable).toBe(false);
  });

  test('Update enables Macie and updates org configuration', async () => {
    mockSend
      .mockResolvedValueOnce({}) // EnableMacie
      .mockResolvedValueOnce({}); // UpdateOrganizationConfiguration

    const response = await handler(updateEvent);

    expect(mockSend).toHaveBeenCalledTimes(2);
    expect(response?.PhysicalResourceId).toBe('test-id');
  });

  test('Delete resets autoEnable to false', async () => {
    mockSend.mockResolvedValueOnce({}); // UpdateOrganizationConfiguration

    const response = await handler(deleteEvent);

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(expect.any(UpdateOrganizationConfigurationCommand));

    const resetInput = (UpdateOrganizationConfigurationCommand as unknown as jest.Mock).mock.calls[0][0];
    expect(resetInput.autoEnable).toBe(false);
    expect(response?.PhysicalResourceId).toBe('test-id');
  });

  test('Delete succeeds when no longer Macie administrator', async () => {
    const accessDenied = new Error('Not the Macie administrator');
    accessDenied.name = 'AccessDeniedException';
    mockSend.mockRejectedValueOnce(accessDenied); // UpdateOrganizationConfiguration

    const response = await handler(deleteEvent);

    expect(response?.PhysicalResourceId).toBe('test-id');
  });

  test('Create handles ConflictException when Macie already enabled', async () => {
    const conflictError = new Error('Macie is already enabled');
    conflictError.name = 'ConflictException';
    mockSend
      .mockRejectedValueOnce(conflictError) // EnableMacie - already enabled
      .mockResolvedValueOnce({}); // UpdateOrganizationConfiguration

    const response = await handler(createEvent);

    expect(mockSend).toHaveBeenCalledTimes(2);
    expect(response?.PhysicalResourceId).toBe('test-id');
  });
});
