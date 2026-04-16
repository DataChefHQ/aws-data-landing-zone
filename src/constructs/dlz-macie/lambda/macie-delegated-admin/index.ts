import {
  EnableMacieCommand,
  EnableOrganizationAdminAccountCommand,
  DisableOrganizationAdminAccountCommand,
  ListOrganizationAdminAccountsCommand,
  Macie2Client,
} from '@aws-sdk/client-macie2';
import {
  EnableAWSServiceAccessCommand,
  OrganizationsClient,
} from '@aws-sdk/client-organizations';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import {
  CloudFormationCustomResourceEvent,
} from 'aws-lambda';

const macieClient = new Macie2Client({ region: process.env.AWS_REGION });
const organizationsClient = new OrganizationsClient({ region: process.env.AWS_REGION });

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  opts: { maxRetries: number; initialDelayMs: number; retryableErrors: string[] },
): Promise<T> {
  let lastError: Error | undefined;
  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      const isRetryable = opts.retryableErrors.some(name => error.name === name || error.__type === name);
      if (!isRetryable || attempt === opts.maxRetries) {
        throw error;
      }
      lastError = error;
      const delay = opts.initialDelayMs * Math.pow(2, attempt);
      console.log(`Attempt ${attempt + 1}/${opts.maxRetries} failed with ${error.name}: ${error.message}. Retrying in ${delay}ms...`);
      await sleep(delay);
    }
  }
  throw lastError;
}

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
  console.log('Enabling Macie session in management account...');
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

async function isAlreadyAdmin(accountId: string): Promise<boolean> {
  console.log(`Checking if ${accountId} is already delegated admin...`);
  const adminAccounts = await macieClient.send(new ListOrganizationAdminAccountsCommand({}));
  console.log('ListOrganizationAdminAccounts response:', JSON.stringify(adminAccounts.adminAccounts));
  return adminAccounts.adminAccounts?.some(admin => admin.accountId === accountId) ?? false;
}

export const handler = async (
  event: CloudFormationCustomResourceEvent,
): Promise<HandlerResponse> => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  console.log(`Handler invoked: RequestType=${event.RequestType}, Region=${process.env.AWS_REGION}`);

  try {
    const { physicalResourceId, auditAccountId } = event.ResourceProperties;
    const response: HandlerResponse = {
      PhysicalResourceId: physicalResourceId,
    };

    if (event.RequestType === 'Create' ||
        event.RequestType === 'Update') {

      // Macie requires an active session before organization-level APIs can be called.
      await ensureMacieEnabled();

      // Enable Macie service access in AWS Organizations (idempotent)
      console.log('Enabling AWS service access for macie.amazonaws.com...');
      await organizationsClient.send(new EnableAWSServiceAccessCommand({
        ServicePrincipal: 'macie.amazonaws.com',
      }));
      console.log('Enabled AWS service access for macie.amazonaws.com');

      // Check if already designated as admin to make operation idempotent.
      // Retry with backoff: EnableAWSServiceAccess is eventually consistent —
      // Macie may not immediately recognize trusted access enablement.
      const alreadyAdmin = await retryWithBackoff(
        () => isAlreadyAdmin(auditAccountId),
        { maxRetries: 3, initialDelayMs: 2000, retryableErrors: ['ConflictException'] },
      );

      if (!alreadyAdmin) {
        console.log(`Designating ${auditAccountId} as Macie delegated admin...`);
        await macieClient.send(new EnableOrganizationAdminAccountCommand({
          adminAccountId: auditAccountId,
        }));
        console.log(`Designated ${auditAccountId} as Macie delegated admin`);
      } else {
        console.log(`${auditAccountId} is already Macie delegated admin, skipping`);
      }

    } else if (event.RequestType === 'Delete') {
      console.log(`Checking if ${event.ResourceProperties.auditAccountId} is delegated admin before removing...`);
      if (await isAlreadyAdmin(event.ResourceProperties.auditAccountId)) {
        await macieClient.send(new DisableOrganizationAdminAccountCommand({
          adminAccountId: event.ResourceProperties.auditAccountId,
        }));
        console.log(`Removed ${event.ResourceProperties.auditAccountId} as Macie delegated admin`);
      } else {
        console.log('Account is not a Macie delegated admin, skipping disable');
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
