import {
  CostExplorerClient,
  ListCostAllocationTagsCommand,
  UpdateCostAllocationTagsStatusCommand,
  type CostAllocationTagStatusEntry,
} from '@aws-sdk/client-cost-explorer';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import {
  CloudFormationCustomResourceEvent,
} from 'aws-lambda';

const ceClient = new CostExplorerClient({ region: process.env.AWS_REGION });

export type HandlerResponse = undefined | {
  Data?: any;
  PhysicalResourceId?: string;
  Reason?: string;
  NoEcho?: boolean;
};

/**
 * Returns the user-defined tag keys that are currently `Inactive` in Cost Explorer.
 * `UpdateCostAllocationTagsStatus` is idempotent — re-activating an already-active tag
 * is a no-op — so we filter mostly to keep the request payload small and the logs honest.
 */
async function inactiveOf(requested: string[]): Promise<string[]> {
  console.log('Listing current cost allocation tag status...');
  const inactive = new Set<string>(requested);

  let nextToken: string | undefined;
  do {
    const page = await ceClient.send(new ListCostAllocationTagsCommand({
      Type: 'UserDefined',
      NextToken: nextToken,
    }));
    for (const tag of page.CostAllocationTags ?? []) {
      if (tag.TagKey && tag.Status === 'Active' && inactive.has(tag.TagKey)) {
        inactive.delete(tag.TagKey);
      }
    }
    nextToken = page.NextToken;
  } while (nextToken);

  return Array.from(inactive);
}

export const handler = async (
  event: CloudFormationCustomResourceEvent,
): Promise<HandlerResponse> => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  try {
    const { physicalResourceId } = event.ResourceProperties;
    const response: HandlerResponse = {
      PhysicalResourceId: physicalResourceId,
    };

    if (event.RequestType === 'Delete') {
      // Do not deactivate tags on stack delete — they may be in use by other things.
      console.log('Delete is a no-op (tags are not deactivated to avoid disrupting consumers).');
      return response;
    }

    const tagKeys: string[] = JSON.parse(event.ResourceProperties.tagKeys);
    if (tagKeys.length === 0) {
      console.log('No tag keys provided — nothing to activate.');
      return response;
    }

    const toActivate = await inactiveOf(tagKeys);
    if (toActivate.length === 0) {
      console.log('All requested tags already Active. Nothing to do.');
      return response;
    }

    console.log(`Activating ${toActivate.length} cost allocation tag(s):`, toActivate);
    const entries: CostAllocationTagStatusEntry[] = toActivate.map((TagKey) => ({
      TagKey,
      Status: 'Active',
    }));
    const result = await ceClient.send(new UpdateCostAllocationTagsStatusCommand({
      CostAllocationTagsStatus: entries,
    }));
    console.log('UpdateCostAllocationTagsStatus response:', JSON.stringify(result.$metadata));
    if (result.Errors && result.Errors.length > 0) {
      console.warn('Some tag activations failed:', JSON.stringify(result.Errors));
    }

    return response;
  } catch (error: any) {
    console.error('ERROR:', error.name, error.message);
    console.error('Stack:', error.stack);
    throw error;
  }
};
