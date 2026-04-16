import {
  EnableMacieCommand,
  Macie2Client,
  UpdateOrganizationConfigurationCommand,
} from '@aws-sdk/client-macie2';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import {
  CloudFormationCustomResourceEvent,
} from 'aws-lambda';

const macieClient = new Macie2Client({ region: process.env.AWS_REGION });

/*
* This function is wrapped by the CDK CustomResourceProvider.getOrCreateProvider logic entrypoint, this is the wrapper:
* https://github.com/aws/aws-cdk/blob/main/packages/@aws-cdk/custom-resource-handlers/lib/core/nodejs-entrypoint-handler/index.ts
* It handles some edge cases around Custom Resources for us. Most notably if this function returns successfully
* (regardless of the { Status: 'SUCCESS' | 'FAILED' } status) the wrapper overrides the response to { Status: 'SUCCESS' }
* A failed can only be generated if this function throws an error. It will then set the Status to 'FAILED' and
* the Reason will be the `error.message`. The `HandlerResponse` type is copied from that file, I couldn't find it exported
*  */
export type HandlerResponse = undefined | {
  Data?: any;
  PhysicalResourceId?: string;
  Reason?: string;
  NoEcho?: boolean;
};

async function ensureMacieEnabled(): Promise<void> {
  console.log('Enabling Macie session in delegated admin account...');
  try {
    await macieClient.send(new EnableMacieCommand({}));
    console.log('Macie session enabled');
  } catch (error: any) {
    if (error.name === 'ConflictException' || error.__type === 'ConflictException') {
      console.log('Macie is already enabled in this account');
    } else {
      throw error;
    }
  }
}

export const handler = async (
  event: CloudFormationCustomResourceEvent,
): Promise<HandlerResponse> => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  console.log(`Handler invoked: RequestType=${event.RequestType}, Region=${process.env.AWS_REGION}`);

  try {
    const { physicalResourceId } = event.ResourceProperties;
    const response: HandlerResponse = {
      PhysicalResourceId: physicalResourceId,
    };

    if (event.RequestType === 'Create' ||
        event.RequestType === 'Update') {

      // Ensure Macie is enabled in the delegated admin account
      await ensureMacieEnabled();

      const autoEnable = event.ResourceProperties.autoEnable === 'true';

      console.log(`Updating organization configuration: autoEnable=${autoEnable}`);
      const updateResult = await macieClient.send(new UpdateOrganizationConfigurationCommand({
        autoEnable: autoEnable,
      }));
      console.log('UpdateOrganizationConfiguration response:', JSON.stringify(updateResult.$metadata));

    } else if (event.RequestType === 'Delete') {
      console.log('Resetting organization configuration: autoEnable=false');
      try {
        const resetResult = await macieClient.send(new UpdateOrganizationConfigurationCommand({
          autoEnable: false,
        }));
        console.log('Reset response:', JSON.stringify(resetResult.$metadata));
      } catch (error: any) {
        // If the delegated admin was already removed (e.g. management stack deleted first),
        // we are no longer the Macie administrator and cannot reset the config. This is safe
        // to ignore — the admin removal already effectively disables org-level settings.
        if (error.name === 'AccessDeniedException' || error.__type === 'AccessDeniedException') {
          console.log('No longer Macie administrator, skipping org config reset (safe to ignore)');
        } else {
          throw error;
        }
      }
    }

    console.log('Handler completed successfully');
    return response;
  } catch (error: any) {
    console.error('ERROR:', error.name, error.message);
    console.error('Stack:', error.stack);
    throw error;
  }
};
