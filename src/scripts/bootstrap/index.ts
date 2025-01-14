import { DataLandingZoneProps, DlzAllRegions } from '../../data-landing-zone-types';
import { assumeRole, runCommand } from '../lib/helpers';

const tags = '--tags Owner=infra --tags Project=dlz --tags Environment=dlz';

async function bootstrapChildAccount(props: DataLandingZoneProps, bootstrapRoleName: string, accountId: string, region: string) {
  const accountRole = `arn:aws:iam::${accountId}:role/${bootstrapRoleName}`;
  const accountCreds = await assumeRole(props.localProfile, props.regions.global, accountRole, 'CDKBootstrap');

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

async function management(props: DataLandingZoneProps) {
  await runCommand('cdk', [
    'bootstrap',
    '--cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess',
    `--profile ${props.localProfile}`,
    tags,
    `aws://${props.organization.root.accounts.management.accountId}/${props.regions.global}`,
  ].join(' '));
}
async function log(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
  for (let region of DlzAllRegions(props.regions)) {
    await bootstrapChildAccount(props, bootstrapRoleName, props.organization.ous.security.accounts.log.accountId, region);
  }
}
async function audit(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
  for (let region of DlzAllRegions(props.regions)) {
    await bootstrapChildAccount(props, bootstrapRoleName, props.organization.ous.security.accounts.audit.accountId, region);
  }
}

async function workloadAccounts(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
  for (const account of props.organization.ous.workloads.accounts) {
    for (let region of DlzAllRegions(props.regions)) {
      await bootstrapChildAccount(props, bootstrapRoleName, account.accountId, region);
    }
  }
}

export async function all(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
  await management(props);
  await log(props, bootstrapRoleName);
  await audit(props, bootstrapRoleName);
  await workloadAccounts(props, bootstrapRoleName);
}