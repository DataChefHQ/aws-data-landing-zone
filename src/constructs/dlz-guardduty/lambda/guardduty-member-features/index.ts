import {
  GuardDutyClient,
  UpdateMemberDetectorsCommand,
  CreateMembersCommand,
  DeleteMembersCommand,
  DisassociateMembersCommand,
  ListDetectorsCommand,
  ListMembersCommand,
  GetMembersCommand,
} from '@aws-sdk/client-guardduty';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import {
  CloudFormationCustomResourceEvent,
} from 'aws-lambda';

const guarddutyClient = new GuardDutyClient({ region: process.env.AWS_REGION });

export type HandlerResponse = undefined | {
  Data?: any;
  PhysicalResourceId?: string;
  Reason?: string;
  NoEcho?: boolean;
};

interface MemberFeatureGroup {
  readonly accountIds: string[];
  readonly features: { name: string; status: string }[];
}

async function getDetectorId(): Promise<string> {
  console.log('Listing detectors...');
  const response = await guarddutyClient.send(new ListDetectorsCommand({}));
  console.log('ListDetectors response:', JSON.stringify(response.DetectorIds));
  if (!response.DetectorIds || response.DetectorIds.length === 0) {
    throw new Error('No GuardDuty detector found in the delegated admin account');
  }
  return response.DetectorIds[0];
}

interface EnrollAccount {
  readonly accountId: string;
  readonly email: string;
}

async function enrollAccounts(detectorId: string, accounts: EnrollAccount[]): Promise<void> {
  if (accounts.length === 0) {
    console.log('No accounts to enroll, skipping CreateMembers');
    return;
  }

  const accountIds = accounts.map(a => a.accountId);

  // Check current member status before enrolling
  console.log(`Checking current member status for accounts [${accountIds.join(', ')}]...`);
  try {
    const existingMembers = await guarddutyClient.send(new GetMembersCommand({
      DetectorId: detectorId,
      AccountIds: accountIds,
    }));
    console.log('GetMembers response:', JSON.stringify({
      Members: existingMembers.Members?.map(m => ({
        AccountId: m.AccountId,
        RelationshipStatus: m.RelationshipStatus,
        DetectorId: m.DetectorId,
        Email: m.Email,
      })),
      UnprocessedAccounts: existingMembers.UnprocessedAccounts,
    }));
  } catch (err: any) {
    console.log(`GetMembers check failed (non-fatal): ${err.name}: ${err.message}`);
  }

  const accountDetails = accounts.map(a => ({
    AccountId: a.accountId,
    Email: a.email,
  }));

  console.log('Enrolling accounts via CreateMembers:', JSON.stringify({
    DetectorId: detectorId,
    AccountDetails: accountDetails,
  }));

  const result = await guarddutyClient.send(new CreateMembersCommand({
    DetectorId: detectorId,
    AccountDetails: accountDetails,
  }));

  console.log('CreateMembers full response:', JSON.stringify({
    UnprocessedAccounts: result.UnprocessedAccounts,
    $metadata: result.$metadata,
  }));

  if (result.UnprocessedAccounts && result.UnprocessedAccounts.length > 0) {
    console.warn('WARNING: Unprocessed accounts during enrollment:', JSON.stringify(result.UnprocessedAccounts));
  }

  // Verify enrollment by listing members after
  console.log('Verifying enrollment by listing members...');
  try {
    const listResult = await guarddutyClient.send(new ListMembersCommand({
      DetectorId: detectorId,
      OnlyAssociated: 'false',
    }));
    console.log('ListMembers after enrollment:', JSON.stringify(
      listResult.Members?.map(m => ({
        AccountId: m.AccountId,
        RelationshipStatus: m.RelationshipStatus,
        DetectorId: m.DetectorId,
      })),
    ));
  } catch (err: any) {
    console.log(`ListMembers verification failed (non-fatal): ${err.name}: ${err.message}`);
  }
}

async function disenrollAccounts(detectorId: string, accountIds: string[]): Promise<void> {
  if (accountIds.length === 0) {
    console.log('No accounts to disenroll, skipping');
    return;
  }

  console.log(`Disenrolling accounts [${accountIds.join(', ')}]...`);

  // Step 1: Disassociate — breaks the admin-member relationship
  console.log('Calling DisassociateMembers...');
  const disassociateResult = await guarddutyClient.send(new DisassociateMembersCommand({
    DetectorId: detectorId,
    AccountIds: accountIds,
  }));
  console.log('DisassociateMembers response:', JSON.stringify({
    UnprocessedAccounts: disassociateResult.UnprocessedAccounts,
    $metadata: disassociateResult.$metadata,
  }));

  // Step 2: Delete — removes from member list entirely
  console.log('Calling DeleteMembers...');
  const deleteResult = await guarddutyClient.send(new DeleteMembersCommand({
    DetectorId: detectorId,
    AccountIds: accountIds,
  }));
  console.log('DeleteMembers response:', JSON.stringify({
    UnprocessedAccounts: deleteResult.UnprocessedAccounts,
    $metadata: deleteResult.$metadata,
  }));
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
      memberFeatureGroups,
    } = event.ResourceProperties;
    const response: HandlerResponse = {
      PhysicalResourceId: physicalResourceId,
    };

    if (event.RequestType === 'Create' ||
        event.RequestType === 'Update') {

      const detectorId = await getDetectorId();
      console.log(`Using detector: ${detectorId}`);

      // Step 0: Disenroll accounts that have guardDutyEnabled=false
      if (disenrollJson) {
        const accountIds: string[] = JSON.parse(disenrollJson);
        console.log(`Step 0: Disenrolling ${accountIds.length} accounts: [${accountIds.join(', ')}]`);
        await disenrollAccounts(detectorId, accountIds);
      } else {
        console.log('Step 0: No disenrollAccountIds provided, skipping disenrollment');
      }

      // Step 1: Enroll accounts that need explicit enrollment
      if (enrollAccountsJson) {
        const accounts: EnrollAccount[] = JSON.parse(enrollAccountsJson);
        console.log(`Step 1: Enrolling ${accounts.length} accounts:`, JSON.stringify(accounts));
        await enrollAccounts(detectorId, accounts);
      } else {
        console.log('Step 1: No enrollAccounts provided, skipping enrollment');
      }

      // Step 2: Apply per-account feature overrides
      if (memberFeatureGroups) {
        const groups: MemberFeatureGroup[] = JSON.parse(memberFeatureGroups);
        console.log(`Step 2: Applying feature overrides for ${groups.length} group(s)`);

        for (const group of groups) {
          if (group.accountIds.length === 0) {
            console.log('Skipping empty account group');
            continue;
          }

          console.log(`Updating features for accounts [${group.accountIds.join(', ')}]:`,
            JSON.stringify(group.features));

          const result = await guarddutyClient.send(new UpdateMemberDetectorsCommand({
            DetectorId: detectorId,
            AccountIds: group.accountIds,
            Features: group.features.map(f => ({
              Name: f.name as any,
              Status: f.status as any,
            })),
          }));

          console.log('UpdateMemberDetectors response:', JSON.stringify({
            UnprocessedAccounts: result.UnprocessedAccounts,
            $metadata: result.$metadata,
          }));

          if (result.UnprocessedAccounts && result.UnprocessedAccounts.length > 0) {
            console.warn('WARNING: Unprocessed accounts:', JSON.stringify(result.UnprocessedAccounts));
          }
        }
      } else {
        console.log('Step 2: No memberFeatureGroups provided, skipping feature overrides');
      }

    } else if (event.RequestType === 'Delete') {
      console.log('Delete: no action required for member enrollment and feature overrides');
    }

    console.log('Handler completed successfully');
    return response;
  } catch (error: any) {
    console.error('ERROR:', error.name, error.message);
    console.error('Stack:', error.stack);
    throw error;
  }
};
