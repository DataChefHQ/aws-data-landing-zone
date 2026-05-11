import {
  CostExplorerClient,
  ListCostAllocationTagsCommand,
  UpdateCostAllocationTagsStatusCommand,
} from '@aws-sdk/client-cost-explorer';
import {
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceDeleteEvent,
} from 'aws-lambda';
import { handler } from '../../../src/constructs/dlz-cur/lambda/cur-tag-activation';

// Preserve Command constructors so the tests can inspect command.input.
jest.mock('@aws-sdk/client-cost-explorer', () => {
  const actual = jest.requireActual('@aws-sdk/client-cost-explorer');
  return { ...actual };
});

const mockSend = jest.fn();
CostExplorerClient.prototype.send = mockSend as any;

const baseEvent = {
  ServiceToken: 'test',
  ResourceType: 'Custom::DlzCurTagActivation',
  StackId: 'test-stack',
  RequestId: 'test-request',
  LogicalResourceId: 'test-logical',
  ResponseURL: '',
  ResourceProperties: {
    ServiceToken: 'test',
    physicalResourceId: 'test-id',
    tagKeys: JSON.stringify(['Owner', 'CostCenter', 'Project']),
  },
};

const createEvent: CloudFormationCustomResourceCreateEvent = {
  ...baseEvent,
  RequestType: 'Create',
};

const deleteEvent: CloudFormationCustomResourceDeleteEvent = {
  ...baseEvent,
  RequestType: 'Delete',
  PhysicalResourceId: 'test-id',
};

describe('cur-tag-activation Lambda', () => {
  beforeEach(() => {
    mockSend.mockReset();
  });

  test('Create activates tags that are not yet Active', async () => {
    mockSend
      .mockResolvedValueOnce({
        CostAllocationTags: [
          { TagKey: 'Owner', Status: 'Active' },
          { TagKey: 'CostCenter', Status: 'Inactive' },
        ],
        NextToken: undefined,
      })
      .mockResolvedValueOnce({ Errors: [] });

    const response = await handler(createEvent);

    expect(mockSend).toHaveBeenCalledWith(expect.any(ListCostAllocationTagsCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(UpdateCostAllocationTagsStatusCommand));
    const updateCall = mockSend.mock.calls.find(
      ([cmd]) => cmd instanceof UpdateCostAllocationTagsStatusCommand,
    )?.[0] as UpdateCostAllocationTagsStatusCommand;
    expect(updateCall.input.CostAllocationTagsStatus).toEqual(
      expect.arrayContaining([
        { TagKey: 'CostCenter', Status: 'Active' },
        { TagKey: 'Project', Status: 'Active' },
      ]),
    );
    // Owner was already Active — should not be in the update.
    expect(updateCall.input.CostAllocationTagsStatus).not.toEqual(
      expect.arrayContaining([{ TagKey: 'Owner', Status: 'Active' }]),
    );
    expect(response?.PhysicalResourceId).toBe('test-id');
  });

  test('Create is a no-op when all requested tags are already Active', async () => {
    mockSend.mockResolvedValueOnce({
      CostAllocationTags: [
        { TagKey: 'Owner', Status: 'Active' },
        { TagKey: 'CostCenter', Status: 'Active' },
        { TagKey: 'Project', Status: 'Active' },
      ],
    });

    await handler(createEvent);

    expect(mockSend).not.toHaveBeenCalledWith(expect.any(UpdateCostAllocationTagsStatusCommand));
  });

  test('Create with empty tagKeys does not call AWS', async () => {
    const event: CloudFormationCustomResourceCreateEvent = {
      ...createEvent,
      ResourceProperties: { ...createEvent.ResourceProperties, tagKeys: '[]' },
    };

    await handler(event);

    expect(mockSend).not.toHaveBeenCalled();
  });

  test('Delete is a no-op (does not deactivate tags)', async () => {
    const response = await handler(deleteEvent);

    expect(mockSend).not.toHaveBeenCalled();
    expect(response?.PhysicalResourceId).toBe('test-id');
  });

  test('paginates ListCostAllocationTags via NextToken', async () => {
    mockSend
      .mockResolvedValueOnce({
        CostAllocationTags: [{ TagKey: 'Owner', Status: 'Active' }],
        NextToken: 'page-2',
      })
      .mockResolvedValueOnce({
        CostAllocationTags: [{ TagKey: 'CostCenter', Status: 'Active' }],
        NextToken: undefined,
      })
      .mockResolvedValueOnce({ Errors: [] });

    await handler(createEvent);

    const listCalls = mockSend.mock.calls.filter(
      ([cmd]) => cmd instanceof ListCostAllocationTagsCommand,
    );
    expect(listCalls).toHaveLength(2);
    // Only Project remained inactive after pagination.
    const updateCall = mockSend.mock.calls.find(
      ([cmd]) => cmd instanceof UpdateCostAllocationTagsStatusCommand,
    )?.[0] as UpdateCostAllocationTagsStatusCommand;
    expect(updateCall.input.CostAllocationTagsStatus).toEqual([
      { TagKey: 'Project', Status: 'Active' },
    ]);
  });
});
