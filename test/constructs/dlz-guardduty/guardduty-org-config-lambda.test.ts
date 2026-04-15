import {
  GuardDutyClient,
  ListDetectorsCommand,
  UpdateDetectorCommand,
  UpdateOrganizationConfigurationCommand,
} from '@aws-sdk/client-guardduty';
import {
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceDeleteEvent,
  CloudFormationCustomResourceUpdateEvent,
} from 'aws-lambda';
import { handler } from '../../../src/constructs/dlz-guardduty/lambda/guardduty-org-config';

jest.mock('@aws-sdk/client-guardduty');

const mockSend = jest.fn();
GuardDutyClient.prototype.send = mockSend;

const features = JSON.stringify([
  { name: 'S3_DATA_EVENTS', status: 'ENABLED', autoEnable: 'NEW' },
  { name: 'EKS_AUDIT_LOGS', status: 'DISABLED', autoEnable: 'NONE' },
]);

const baseEvent = {
  ServiceToken: 'test',
  ResourceType: 'Custom::DlzGuardDutyOrgConfig',
  StackId: 'test-stack',
  RequestId: 'test-request',
  LogicalResourceId: 'test-logical',
  ResponseURL: '',
  ResourceProperties: {
    ServiceToken: 'test',
    physicalResourceId: 'test-id',
    autoEnableOrgMembers: 'NEW',
    features,
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

describe('GuardDuty Org Config Lambda', () => {
  beforeEach(() => {
    mockSend.mockReset();
  });

  test('Create updates detector features and org configuration', async () => {
    mockSend
      .mockResolvedValueOnce({ DetectorIds: ['detector-abc'] }) // ListDetectors
      .mockResolvedValueOnce({}) // UpdateDetector
      .mockResolvedValueOnce({}); // UpdateOrganizationConfiguration

    const response = await handler(createEvent);

    expect(mockSend).toHaveBeenCalledTimes(3);
    expect(mockSend).toHaveBeenCalledWith(expect.any(ListDetectorsCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(UpdateDetectorCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(UpdateOrganizationConfigurationCommand));
    expect(response?.PhysicalResourceId).toBe('test-id');
  });

  test('Update updates detector features and org configuration', async () => {
    mockSend
      .mockResolvedValueOnce({ DetectorIds: ['detector-abc'] })
      .mockResolvedValueOnce({})
      .mockResolvedValueOnce({});

    const response = await handler(updateEvent);

    expect(mockSend).toHaveBeenCalledTimes(3);
    expect(mockSend).toHaveBeenCalledWith(expect.any(UpdateDetectorCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(UpdateOrganizationConfigurationCommand));
    expect(response?.PhysicalResourceId).toBe('test-id');
  });

  test('Delete resets org configuration to NONE', async () => {
    mockSend
      .mockResolvedValueOnce({ DetectorIds: ['detector-abc'] }) // ListDetectors
      .mockResolvedValueOnce({}); // UpdateOrganizationConfiguration

    const response = await handler(deleteEvent);

    expect(mockSend).toHaveBeenCalledTimes(2);
    expect(mockSend).toHaveBeenCalledWith(expect.any(ListDetectorsCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(UpdateOrganizationConfigurationCommand));
    // Should NOT call UpdateDetector on delete
    expect(mockSend).not.toHaveBeenCalledWith(expect.any(UpdateDetectorCommand));
    expect(response?.PhysicalResourceId).toBe('test-id');
  });

  test('throws when no detector exists', async () => {
    mockSend.mockResolvedValueOnce({ DetectorIds: [] });

    await expect(handler(createEvent)).rejects.toThrow(
      'No GuardDuty detector found in the delegated admin account',
    );
  });

  test('Create passes correct feature mappings to UpdateDetector', async () => {
    mockSend
      .mockResolvedValueOnce({ DetectorIds: ['detector-abc'] })
      .mockResolvedValueOnce({})
      .mockResolvedValueOnce({});

    await handler(createEvent);

    const updateDetectorInput = (UpdateDetectorCommand as unknown as jest.Mock).mock.calls[0][0];

    expect(updateDetectorInput.DetectorId).toBe('detector-abc');
    expect(updateDetectorInput.Enable).toBe(true);
    expect(updateDetectorInput.Features).toEqual([
      { Name: 'S3_DATA_EVENTS', Status: 'ENABLED' },
      { Name: 'EKS_AUDIT_LOGS', Status: 'DISABLED' },
    ]);
  });

  test('Create passes correct feature mappings to UpdateOrganizationConfiguration', async () => {
    mockSend
      .mockResolvedValueOnce({ DetectorIds: ['detector-abc'] })
      .mockResolvedValueOnce({})
      .mockResolvedValueOnce({});

    await handler(createEvent);

    const updateOrgInput = (UpdateOrganizationConfigurationCommand as unknown as jest.Mock).mock.calls[0][0];

    expect(updateOrgInput.DetectorId).toBe('detector-abc');
    expect(updateOrgInput.AutoEnableOrganizationMembers).toBe('NEW');
    expect(updateOrgInput.Features).toEqual([
      { Name: 'S3_DATA_EVENTS', AutoEnable: 'NEW' },
      { Name: 'EKS_AUDIT_LOGS', AutoEnable: 'NONE' },
    ]);
  });
});
