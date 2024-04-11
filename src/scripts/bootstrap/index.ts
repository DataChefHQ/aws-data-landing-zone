import { AssumeRoleCommand, STS } from '@aws-sdk/client-sts';
import { fromIni } from '@aws-sdk/credential-providers';
import { DataLandingZoneProps, DlzAllRegions } from '../../data-landing-zone';
import { runCommand } from '../lib/helpers';

const tags = '--tags Owner=infra --tags Project=dlz --tags Environment=dlz';
async function assumeRole(profile: string, region: string, roleArn: string) {
  const stsClient = new STS({
    region,
    credentials: fromIni({
      profile,
    }),
  });

  const response = await stsClient.send(new AssumeRoleCommand({
    RoleArn: roleArn,
    RoleSessionName: 'CDKBootstrap',
  }));
  if (!response.Credentials) {throw new Error('No credentials returned from AssumeRole');}

  return response.Credentials;
}
async function bootstrapChildAccount(props: DataLandingZoneProps, bootstrapRoleName: string, accountId: string, region: string) {
  const accountRole = `arn:aws:iam::${accountId}:role/${bootstrapRoleName}`;
  const accountCreds = await assumeRole(props.localProfile, props.regions.global, accountRole);

  await runCommand('cdk', [
    'bootstrap',
    '--cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess', // Needs to be specified if using --trust
    `--trust ${props.organization.root.accounts.management.accountId}`,
    tags,
    `aws://${accountId}/${region}`,
  ].join(' '),
  {
    env: {
      AWS_PROFILE: '',
      AWS_DEFAULT_REGION: region, // Needs to be specified if using env variables
      AWS_ACCESS_KEY_ID: accountCreds.AccessKeyId!,
      AWS_SECRET_ACCESS_KEY: accountCreds.SecretAccessKey!,
      AWS_SESSION_TOKEN: accountCreds.SessionToken!,
    },
  });
}

export async function management(props: DataLandingZoneProps) {
  await runCommand('cdk', [
    'bootstrap',
    '--cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess',
    `--profile ${props.localProfile}`,
    tags,
    `aws://${props.organization.root.accounts.management.accountId}/${props.regions.global}`,
  ].join(' '));
}
export async function log(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
  for (let region of DlzAllRegions(props.regions)) {
    await bootstrapChildAccount(props, bootstrapRoleName, props.organization.ous.security.accounts.log.accountId, region);
  }
}
export async function audit(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
  for (let region of DlzAllRegions(props.regions)) {
    await bootstrapChildAccount(props, bootstrapRoleName, props.organization.ous.security.accounts.audit.accountId, region);
  }
}

export async function develop(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
  for (let region of DlzAllRegions(props.regions)) {
    await bootstrapChildAccount(props, bootstrapRoleName, props.organization.ous.workloads.accounts.develop.accountId, region);
  }
}
export async function production(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
  for (let region of DlzAllRegions(props.regions)) {
    await bootstrapChildAccount(props, bootstrapRoleName, props.organization.ous.workloads.accounts.production.accountId, region);
  }
}

export async function all(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
  await management(props);
  await log(props, bootstrapRoleName);
  await audit(props, bootstrapRoleName);
  await develop(props, bootstrapRoleName);
  await production(props, bootstrapRoleName);
}