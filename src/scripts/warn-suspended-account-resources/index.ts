import {
  CloudFormationClient,
  ListStacksCommand,
} from '@aws-sdk/client-cloudformation';
import { AssumeRoleCommand, STS } from '@aws-sdk/client-sts';
import { fromIni } from '@aws-sdk/credential-providers';
import { DataLandingZoneProps } from '../../data-landing-zone-types';

async function assumeRole(profile: string, region: string, roleArn: string) {
  const stsClient = new STS({
    region,
    credentials: !process.env.CI ? fromIni({
      profile,
    }) : undefined,
  });

  const response = await stsClient.send(new AssumeRoleCommand({
    RoleArn: roleArn,
    RoleSessionName: 'DlzInspectBootstrappedStacks',
  }));
  if (!response.Credentials) {throw new Error('No credentials returned from AssumeRole');}

  return response.Credentials;
}

export async function warnSuspendedAccountResources(props: DataLandingZoneProps) {
  process.env.CDK_DEBUG === 'true' && console.log('Checking for DLZ stacks in suspended accounts...');

  const allRegions = [...props.regions.regional, props.regions.global];
  const accountRoleName = 'AWSControlTowerExecution';
  let isHeaderPrinted = false;
  for (let account of props.organization.ous.suspended.accounts || []) {
    process.env.CDK_DEBUG === 'true' && console.log('Checking account:', account.name);

    for (let region of allRegions) {
      process.env.CDK_DEBUG === 'true' && console.log('Checking region:', region);

      const accountRole = `arn:aws:iam::${account.accountId}:role/${accountRoleName}`;
      const assumedRoleCreds = await assumeRole(props.localProfile, props.regions.global, accountRole);
      const cloudFormationClient = new CloudFormationClient({
        region,
        credentials: {
          accessKeyId: assumedRoleCreds.AccessKeyId!,
          secretAccessKey: assumedRoleCreds.SecretAccessKey!,
          sessionToken: assumedRoleCreds.SessionToken!,
        },
      });

      let nextToken: string | undefined;
      const stackNames: string[] = [];
      do {
        const response = await cloudFormationClient.send(new ListStacksCommand({
          NextToken: nextToken,
        }));
        if (response.StackSummaries) {
          for (const stack of response.StackSummaries) {
            if (stack.StackName && stack.StackName.startsWith('dlz-')) {
              stackNames.push(stack.StackName);
            }
          }
        }
        nextToken = response.NextToken;
      } while (nextToken);

      if (stackNames.length > 0) {
        if (!isHeaderPrinted) {
          console.warn('WARNING: The following DLZ stacks exist in suspended accounts, you might still be incurring costs.' +
            ' See the documentation for more information.\r\n'); //TODO: Direct link to docs
          isHeaderPrinted = true;
        }

        console.warn(`- Account: ${account.name} (${account.accountId})
  Region: ${region}
  Stacks: ${stackNames.join(', ')}`);
      }
    }

  }
}