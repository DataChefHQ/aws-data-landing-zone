import {
  CreateAccountAliasCommand, DeleteAccountAliasCommand, IAMClient, ListAccountAliasesCommand,
} from '@aws-sdk/client-iam';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import {
  CloudFormationCustomResourceEvent,
} from 'aws-lambda';
const client = new IAMClient({ region: process.env.AWS_REGION });

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

export const handler = async (
  event: CloudFormationCustomResourceEvent,
): Promise<HandlerResponse> => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  try {
    const { physicalResourceId, accountAlias } = event.ResourceProperties;
    const response: HandlerResponse = {
      PhysicalResourceId: physicalResourceId,
    };

    const existingAliases = await client.send(new ListAccountAliasesCommand());
    console.log('existingAliases', existingAliases);

    if (event.RequestType === 'Create' ||
        event.RequestType === 'Update') {
      // We check that it does not already exist with the same value, makes it idempotent, else it will error
      // Can happen that rolls back and wants to create a new one, so we need the check, else it fails that update
      // and enters a ROLLBACK_FAILED state that needs to be handled manually
      if (!existingAliases.AccountAliases?.length || existingAliases.AccountAliases[0] !== accountAlias) {
        const responseData = await client.send(new CreateAccountAliasCommand({
          AccountAlias: accountAlias,
        }));
        console.log('SDK Response', responseData);
      }
    } else if (event.RequestType === 'Delete') {
      if (existingAliases.AccountAliases?.length === 1) {
        const responseData = await client.send(new DeleteAccountAliasCommand({
          AccountAlias: existingAliases.AccountAliases[0],
        }));
        console.log('SDK Response', responseData);
      }
    }

    return response;
  } catch (error: any) {
    console.error('ERROR', error);
    throw error;
  }
};
