import {
  CreateDetectorCommand,
  EnableOrganizationAdminAccountCommand,
  DisableOrganizationAdminAccountCommand,
  GuardDutyClient,
  ListDetectorsCommand,
  ListOrganizationAdminAccountsCommand,
} from '@aws-sdk/client-guardduty';
import {
  EnableAWSServiceAccessCommand,
  OrganizationsClient,
} from '@aws-sdk/client-organizations';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import {
  CloudFormationCustomResourceEvent,
} from 'aws-lambda';

const guarddutyClient = new GuardDutyClient({ region: process.env.AWS_REGION });
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

async function ensureDetectorExists(): Promise<string> {
  console.log('Checking for existing detector...');
  const detectors = await guarddutyClient.send(new ListDetectorsCommand({}));
  console.log('ListDetectors response:', JSON.stringify(detectors.DetectorIds));
  if (detectors.DetectorIds && detectors.DetectorIds.length > 0) {
    console.log(`GuardDuty detector already exists: ${detectors.DetectorIds[0]}`);
    return detectors.DetectorIds[0];
  }
  console.log('No detector found, creating one...');
  const result = await guarddutyClient.send(new CreateDetectorCommand({ Enable: true }));
  console.log(`Created GuardDuty detector: ${result.DetectorId}`);
  return result.DetectorId!;
}

async function isAlreadyAdmin(accountId: string): Promise<boolean> {
  console.log(`Checking if ${accountId} is already delegated admin...`);
  const adminAccounts = await guarddutyClient.send(new ListOrganizationAdminAccountsCommand({}));
  console.log('ListOrganizationAdminAccounts response:', JSON.stringify(adminAccounts.AdminAccounts));
  return adminAccounts.AdminAccounts?.some(admin => admin.AdminAccountId === accountId) ?? false;
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

      // GuardDuty requires a detector in the management account before
      // organization-level APIs (ListOrganizationAdminAccounts, etc.) can be called.
      const detectorId = await ensureDetectorExists();
      console.log(`Using management account detector: ${detectorId}`);

      // Enable GuardDuty service access in AWS Organizations (idempotent)
      console.log('Enabling AWS service access for guardduty.amazonaws.com...');
      await organizationsClient.send(new EnableAWSServiceAccessCommand({
        ServicePrincipal: 'guardduty.amazonaws.com',
      }));
      console.log('Enabled AWS service access for guardduty.amazonaws.com');

      // Check if already designated as admin to make operation idempotent.
      // Retry with backoff: EnableAWSServiceAccess is eventually consistent —
      // GuardDuty may not immediately recognize trusted access enablement.
      const alreadyAdmin = await retryWithBackoff(
        () => isAlreadyAdmin(auditAccountId),
        { maxRetries: 3, initialDelayMs: 2000, retryableErrors: ['BadRequestException'] },
      );

      if (!alreadyAdmin) {
        console.log(`Designating ${auditAccountId} as GuardDuty delegated admin...`);
        await guarddutyClient.send(new EnableOrganizationAdminAccountCommand({
          AdminAccountId: auditAccountId,
        }));
        console.log(`Designated ${auditAccountId} as GuardDuty delegated admin`);
      } else {
        console.log(`${auditAccountId} is already GuardDuty delegated admin, skipping`);
      }

    } else if (event.RequestType === 'Delete') {
      console.log(`Checking if ${event.ResourceProperties.auditAccountId} is delegated admin before removing...`);
      if (await isAlreadyAdmin(event.ResourceProperties.auditAccountId)) {
        await guarddutyClient.send(new DisableOrganizationAdminAccountCommand({
          AdminAccountId: event.ResourceProperties.auditAccountId,
        }));
        console.log(`Removed ${event.ResourceProperties.auditAccountId} as GuardDuty delegated admin`);
      } else {
        console.log('Account is not a GuardDuty delegated admin, skipping disable');
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
