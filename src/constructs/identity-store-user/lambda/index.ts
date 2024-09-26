import {
  IdentitystoreClient,
  CreateUserCommand,
  CreateUserCommandInput,
  DeleteUserCommand,
  UpdateUserCommand,
  DescribeUserCommand,
} from '@aws-sdk/client-identitystore';
import {
  CloudFormationCustomResourceEvent,
  CloudFormationCustomResourceResponse,
  CloudFormationCustomResourceSuccessResponse,
  CloudFormationCustomResourceFailedResponse,
  CloudFormationCustomResourceUpdateEvent,
  CloudFormationCustomResourceDeleteEvent,
} from 'aws-lambda';

const client = new IdentitystoreClient({ region: process.env.AWS_REGION });

export const handler = async (
  event: CloudFormationCustomResourceEvent,
): Promise<CloudFormationCustomResourceResponse> => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  const response: CloudFormationCustomResourceFailedResponse = {
    Status: 'FAILED',
    PhysicalResourceId: '',
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    Reason: '',
    Data: {},
  };

  try {
    const userName = event.ResourceProperties.userName;
    const identityStoreId = event.ResourceProperties.identityStoreId;
    const name = event.ResourceProperties.name;
    const displayName = event.ResourceProperties.displayName;
    const email = event.ResourceProperties.email;

    if (event.RequestType === 'Create') {
      const input: CreateUserCommandInput = {

        IdentityStoreId: identityStoreId,
        UserName: userName,
        DisplayName: displayName,
        Name: {
          Formatted: name.formatted,
          GivenName: name.givenName,
          FamilyName: name.familyName,
          MiddleName: name.middleName,
          HonorificPrefix: name.honorificPrefix,
          HonorificSuffix: name.honorificSuffix,
        },
        Emails: [{
          Value: email.value,
          Type: email.type,
          Primary: true,
        }],
      };

      const command = new CreateUserCommand(input);
      const responseData = await client.send(command);

      console.log('CreateUserCommand response:', responseData);

      // Assume responseData contains UserId
      if (!responseData.UserId) {
        throw new Error(`UserId not returned from CreateUserCommand for user ${userName}`);
      }

      response.PhysicalResourceId = responseData.UserId;
      response.Data = {
        UserId: responseData.UserId,
      };
      return { ...response, Status: 'SUCCESS' } as CloudFormationCustomResourceSuccessResponse;
    }

    if (event.RequestType === 'Delete') {
      const userId = (event as CloudFormationCustomResourceDeleteEvent).PhysicalResourceId;

      const deleteUserCommand = new DeleteUserCommand({
        IdentityStoreId: identityStoreId,
        UserId: userId,
      });
      const deleteResponse = await client.send(deleteUserCommand);
      console.log('DeleteUserCommand response:', deleteResponse);

      response.PhysicalResourceId = userId;
      response.Data = { UserId: userId };

      return { ...response, Status: 'SUCCESS' } as CloudFormationCustomResourceSuccessResponse;
    }

    if (event.RequestType === 'Update') {
      const userId = (event as CloudFormationCustomResourceUpdateEvent).PhysicalResourceId;

      // describe the user in the identity store
      const describeUserCommand = new DescribeUserCommand({
        IdentityStoreId: identityStoreId,
        UserId: userId,
      });
      const current = await client.send(describeUserCommand);
      console.log('DescribeUserCommand response:', current);

      const operations: { AttributePath: string; AttributeValue: any }[] = [];

      // Helper function to compare simple attributes
      const compareAndAdd = (attributePath: string, currentValue: string | undefined, desiredValue: string | undefined) => {
        if (desiredValue === undefined) return;

        if (currentValue !== desiredValue) {
          operations.push({
            AttributePath: attributePath,
            AttributeValue: desiredValue,
          });
        }
      };

      compareAndAdd('displayName', current.DisplayName, displayName);
      compareAndAdd('userName', current.UserName, userName);
      compareAndAdd('name.givenName', current.Name?.GivenName, name.givenName);
      compareAndAdd('name.familyName', current.Name?.FamilyName, name.familyName);
      compareAndAdd('name.middleName', current.Name?.MiddleName, name.middleName);
      compareAndAdd('name.formatted', current.Name?.Formatted, name.formatted);
      compareAndAdd('name.honorificPrefix', current.Name?.HonorificPrefix, name.honorificPrefix);
      compareAndAdd('name.honorificSuffix', current.Name?.HonorificSuffix, name.honorificSuffix);

      if (email) {
        operations.push({
          AttributePath: 'emails',
          AttributeValue: [{
            value: email.value,
            type: email.type,
            primary: true,
          }],
        });
      }

      const updateUserCommand = new UpdateUserCommand({
        IdentityStoreId: identityStoreId,
        UserId: userId,
        Operations: operations,
      });

      const updateResponse = await client.send(updateUserCommand);
      console.log('UpdateUserCommand response:', updateResponse);

      response.PhysicalResourceId = userId;
      response.Data = { UserId: userId };
      return { ...response, Status: 'SUCCESS' } as CloudFormationCustomResourceSuccessResponse;
    }
  } catch (error: any) {
    console.error('Error handling custom resource:', error);
    throw error;
  }

  return response as CloudFormationCustomResourceFailedResponse;
};