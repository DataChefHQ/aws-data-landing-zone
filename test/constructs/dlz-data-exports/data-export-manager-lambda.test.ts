import {
  BCMDataExportsClient,
  CreateExportCommand,
  DeleteExportCommand,
  ResourceNotFoundException,
  UpdateExportCommand,
  ValidationException,
} from '@aws-sdk/client-bcm-data-exports';
import {
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceDeleteEvent,
  CloudFormationCustomResourceUpdateEvent,
} from 'aws-lambda';
import { handler } from '../../../src/constructs/dlz-data-exports/lambda/data-export-manager';

jest.mock('@aws-sdk/client-bcm-data-exports', () => {
  const actual = jest.requireActual('@aws-sdk/client-bcm-data-exports');
  return { ...actual };
});

const mockSend = jest.fn();
BCMDataExportsClient.prototype.send = mockSend as any;

const baseProps = {
  ServiceToken: 'test',
  Name: 'dlz-finops-test',
  Description: 'desc',
  QueryStatement: 'SELECT line_item_unblended_cost FROM COST_AND_USAGE_REPORT',
  TableConfigurations: JSON.stringify({ COST_AND_USAGE_REPORT: { TIME_GRANULARITY: 'HOURLY' } }),
  DestinationConfigurations: JSON.stringify({ S3Destination: { S3Bucket: 'b' } }),
  Frequency: 'SYNCHRONOUS',
};

const baseEvent = {
  ServiceToken: 'test',
  ResourceType: 'Custom::DlzDataExport',
  StackId: 'test-stack',
  RequestId: 'test-request',
  LogicalResourceId: 'test-logical',
  ResponseURL: '',
  ResourceProperties: baseProps,
};

const createEvent: CloudFormationCustomResourceCreateEvent = {
  ...baseEvent,
  RequestType: 'Create',
};

const updateEvent: CloudFormationCustomResourceUpdateEvent = {
  ...baseEvent,
  RequestType: 'Update',
  PhysicalResourceId: 'arn:aws:bcm-data-exports:us-east-1:111111111111:export/dlz-finops-test',
  OldResourceProperties: baseProps,
};

const deleteEvent: CloudFormationCustomResourceDeleteEvent = {
  ...baseEvent,
  RequestType: 'Delete',
  PhysicalResourceId: 'arn:aws:bcm-data-exports:us-east-1:111111111111:export/dlz-finops-test',
};

describe('data-export-manager Lambda', () => {
  beforeEach(() => {
    mockSend.mockReset();
  });

  test('Create calls CreateExport and returns the ARN', async () => {
    const arn = 'arn:aws:bcm-data-exports:us-east-1:111111111111:export/dlz-finops-test';
    mockSend.mockResolvedValueOnce({ ExportArn: arn });

    const response = await handler(createEvent);

    expect(mockSend).toHaveBeenCalledWith(expect.any(CreateExportCommand));
    expect(response.PhysicalResourceId).toBe(arn);
    expect(response.Data?.ExportArn).toBe(arn);
  });

  test('Create throws when CreateExport returns no ARN', async () => {
    mockSend.mockResolvedValueOnce({});
    await expect(handler(createEvent)).rejects.toThrow(/no ExportArn/);
  });

  test('Update with same name calls UpdateExport in place', async () => {
    mockSend.mockResolvedValueOnce({});

    const response = await handler(updateEvent);

    expect(mockSend).toHaveBeenCalledWith(expect.any(UpdateExportCommand));
    expect(mockSend).not.toHaveBeenCalledWith(expect.any(CreateExportCommand));
    expect(response.PhysicalResourceId).toBe(updateEvent.PhysicalResourceId);
  });

  test('Update with different name deletes old and creates new', async () => {
    const renamed: CloudFormationCustomResourceUpdateEvent = {
      ...updateEvent,
      ResourceProperties: { ...baseProps, Name: 'dlz-finops-test-renamed' },
    };
    const newArn = 'arn:aws:bcm-data-exports:us-east-1:111111111111:export/dlz-finops-test-renamed';
    mockSend
      .mockResolvedValueOnce({}) // DeleteExport
      .mockResolvedValueOnce({ ExportArn: newArn }); // CreateExport

    const response = await handler(renamed);

    expect(mockSend).toHaveBeenCalledWith(expect.any(DeleteExportCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(CreateExportCommand));
    expect(response.PhysicalResourceId).toBe(newArn);
  });

  test('Update falls back to delete-then-create on ValidationException', async () => {
    const validationErr = new ValidationException({
      message: 'cannot update in place',
      Message: 'cannot update in place',
      $metadata: {},
    });
    const newArn = 'arn:aws:bcm-data-exports:us-east-1:111111111111:export/dlz-finops-test';
    mockSend
      .mockRejectedValueOnce(validationErr) // UpdateExport rejects
      .mockResolvedValueOnce({}) // DeleteExport
      .mockResolvedValueOnce({ ExportArn: newArn }); // CreateExport

    const response = await handler(updateEvent);

    expect(mockSend).toHaveBeenCalledWith(expect.any(UpdateExportCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(DeleteExportCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(CreateExportCommand));
    expect(response.PhysicalResourceId).toBe(newArn);
  });

  test('Update creates fresh when UpdateExport hits ResourceNotFoundException', async () => {
    const notFound = new ResourceNotFoundException({
      message: 'gone',
      Message: 'gone',
      ResourceId: 'arn',
      ResourceType: 'export',
      $metadata: {},
    });
    const newArn = 'arn:aws:bcm-data-exports:us-east-1:111111111111:export/dlz-finops-test';
    mockSend
      .mockRejectedValueOnce(notFound) // UpdateExport - not found
      .mockResolvedValueOnce({ ExportArn: newArn }); // CreateExport

    const response = await handler(updateEvent);

    expect(mockSend).toHaveBeenCalledWith(expect.any(UpdateExportCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(CreateExportCommand));
    expect(response.PhysicalResourceId).toBe(newArn);
  });

  test('Delete calls DeleteExport and returns the ARN', async () => {
    mockSend.mockResolvedValueOnce({});

    const response = await handler(deleteEvent);

    expect(mockSend).toHaveBeenCalledWith(expect.any(DeleteExportCommand));
    expect(response.PhysicalResourceId).toBe(deleteEvent.PhysicalResourceId);
  });

  test('Delete treats ResourceNotFoundException as success', async () => {
    const notFound = new ResourceNotFoundException({
      message: 'gone',
      Message: 'gone',
      ResourceId: 'arn',
      ResourceType: 'export',
      $metadata: {},
    });
    mockSend.mockRejectedValueOnce(notFound);

    const response = await handler(deleteEvent);

    expect(response.PhysicalResourceId).toBe(deleteEvent.PhysicalResourceId);
  });
});
