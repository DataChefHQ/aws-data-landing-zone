import {
  CreateMemberCommand,
  DeleteMemberCommand,
  DisassociateMemberCommand,
  GetMemberCommand,
  ListMembersCommand,
  Macie2Client,
} from '@aws-sdk/client-macie2';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import {
  CloudFormationCustomResourceEvent,
} from 'aws-lambda';

const macieClient = new Macie2Client({ region: process.env.AWS_REGION });

export type HandlerResponse = undefined | {
  Data?: any;
  PhysicalResourceId?: string;
  Reason?: string;
  NoEcho?: boolean;
};

interface EnrollAccount {
  readonly accountId: string;
  readonly email: string;
}

async function enrollAccounts(accounts: EnrollAccount[]): Promise<void> {
  if (accounts.length === 0) {
    console.log('No accounts to enroll, skipping');
    return;
  }

  for (const account of accounts) {
    console.log(`Checking if ${account.accountId} is already a member...`);
    try {
      const existing = await macieClient.send(new GetMemberCommand({
        id: account.accountId,
      }));
      console.log(`Account ${account.accountId} already exists with status: ${existing.relationshipStatus}`);
      continue;
    } catch (error: any) {
      if (error.name === 'ResourceNotFoundException' || error.__type === 'ResourceNotFoundException') {
        console.log(`Account ${account.accountId} is not a member, creating...`);
      } else {
        throw error;
      }
    }

    console.log(`Creating member for account ${account.accountId} (email: ${account.email})...`);
    const result = await macieClient.send(new CreateMemberCommand({
      account: {
        accountId: account.accountId,
        email: account.email,
      },
    }));
    console.log(`CreateMember response for ${account.accountId}: arn=${result.arn}`);
  }

  // Verify enrollment by listing members
  console.log('Verifying enrollment by listing members...');
  try {
    const listResult = await macieClient.send(new ListMembersCommand({}));
    console.log('ListMembers after enrollment:', JSON.stringify(
      listResult.members?.map(m => ({
        accountId: m.accountId,
        relationshipStatus: m.relationshipStatus,
      })),
    ));
  } catch (err: any) {
    console.log(`ListMembers verification failed (non-fatal): ${err.name}: ${err.message}`);
  }
}

async function disenrollAccounts(accountIds: string[]): Promise<void> {
  if (accountIds.length === 0) {
    console.log('No accounts to disenroll, skipping');
    return;
  }

  for (const accountId of accountIds) {
    console.log(`Checking if ${accountId} is a member before disenrolling...`);
    try {
      await macieClient.send(new GetMemberCommand({ id: accountId }));
    } catch (error: any) {
      if (error.name === 'ResourceNotFoundException' || error.__type === 'ResourceNotFoundException'
        || error.name === 'ValidationException' || error.__type === 'ValidationException') {
        console.log(`Account ${accountId} is not a member, skipping disenrollment`);
        continue;
      }
      throw error;
    }

    console.log(`Disenrolling account ${accountId}...`);

    // Step 1: Disassociate — breaks the admin-member relationship
    // May throw ValidationException if the account was never explicitly associated
    // (e.g., auto-enabled by org config but not enrolled via CreateMember).
    console.log(`Calling DisassociateMember for ${accountId}...`);
    try {
      await macieClient.send(new DisassociateMemberCommand({
        id: accountId,
      }));
      console.log(`DisassociateMember completed for ${accountId}`);
    } catch (error: any) {
      if (error.name === 'ValidationException' || error.__type === 'ValidationException') {
        console.log(`Account ${accountId} is not an associated member, skipping disassociation`);
      } else {
        throw error;
      }
    }

    // Step 2: Delete — removes from member list
    console.log(`Calling DeleteMember for ${accountId}...`);
    try {
      await macieClient.send(new DeleteMemberCommand({
        id: accountId,
      }));
      console.log(`DeleteMember completed for ${accountId}`);
    } catch (error: any) {
      if (error.name === 'ValidationException' || error.__type === 'ValidationException') {
        console.log(`Account ${accountId} is not a member, skipping deletion`);
      } else {
        throw error;
      }
    }
  }
}

export const handler = async (
  event: CloudFormationCustomResourceEvent,
): Promise<HandlerResponse> => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  console.log(`Handler invoked: RequestType=${event.RequestType}, Region=${process.env.AWS_REGION}`);

  try {
    const {
      physicalResourceId,
      enrollAccounts: enrollAccountsJson,
      disenrollAccountIds: disenrollJson,
    } = event.ResourceProperties;
    const response: HandlerResponse = {
      PhysicalResourceId: physicalResourceId,
    };

    if (event.RequestType === 'Create' ||
        event.RequestType === 'Update') {

      // Step 0: Disenroll accounts that have macieEnabled=false
      if (disenrollJson) {
        const accountIds: string[] = JSON.parse(disenrollJson);
        console.log(`Step 0: Disenrolling ${accountIds.length} accounts: [${accountIds.join(', ')}]`);
        await disenrollAccounts(accountIds);
      } else {
        console.log('Step 0: No disenrollAccountIds provided, skipping disenrollment');
      }

      // Step 1: Enroll accounts that need explicit enrollment
      if (enrollAccountsJson) {
        const accounts: EnrollAccount[] = JSON.parse(enrollAccountsJson);
        console.log(`Step 1: Enrolling ${accounts.length} accounts:`, JSON.stringify(accounts));
        await enrollAccounts(accounts);
      } else {
        console.log('Step 1: No enrollAccounts provided, skipping enrollment');
      }

    } else if (event.RequestType === 'Delete') {
      console.log('Delete: no action required for member enrollment');
    }

    console.log('Handler completed successfully');
    return response;
  } catch (error: any) {
    console.error('ERROR:', error.name, error.message);
    console.error('Stack:', error.stack);
    throw error;
  }
};
