import { CostExplorerClient, UpdateCostAllocationTagsStatusCommand } from '@aws-sdk/client-cost-explorer';
import { fromIni } from '@aws-sdk/credential-providers';
import { DataLandingZoneProps } from '../../data-landing-zone';
import { PropsOrDefaults } from '../../defaults';
import { Logger } from '../../logger';

export interface SetCostAllocationTagsProps {
  region: string;
  profile: string;
  tags: string[];
}

export async function setCostAllocationTags(props: DataLandingZoneProps) {
  const logger = Logger.staticInstance();
  const costExplorerClient = new CostExplorerClient({
    region: props.regions.global,
    credentials: fromIni({
      profile: props.localProfile,
    }),
  });

  const tags = PropsOrDefaults.getOrganizationTags(props);
  const response = await costExplorerClient.send(new UpdateCostAllocationTagsStatusCommand({
    CostAllocationTagsStatus: tags.map(
      (tag) => ({
        TagKey: tag.name,
        Status: 'Active',
      }),
    ),
  }));
  if (response.Errors && response.Errors.length) {throw new Error(response.Errors.toString());}

  logger.info(`Cost allocation tags (${tags.map(t => t.name).join(',')}) set successfully. It may take up ` +
  'to 24 hours for tags to show in Cost Explorer.');
}