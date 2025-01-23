import { DataLandingZoneProps, DlzAllRegions } from '../../data-landing-zone-types';
import { assumeRole, runCommand } from '../lib/helpers';
import { synth } from '../synth';

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
    '--app cdk.out',
  ].join(' '),
  {
    env: {
      AWS_PROFILE: '',
      AWS_DEFAULT_REGION: region, // Needs to be specified if using env variables
      AWS_ACCESS_KEY_ID: accountCreds.AccessKeyId!,
      AWS_SECRET_ACCESS_KEY: accountCreds.SecretAccessKey!,
      AWS_SESSION_TOKEN: accountCreds.SessionToken!,
    },
  },
  `(${region}) `);
}

let bootstrapSynthed = false;
async function synthOnce(props: DataLandingZoneProps) {
  if (!bootstrapSynthed) {
    bootstrapSynthed = true;
    await synth(props);
  }
}

async function management(props: DataLandingZoneProps) {
  await synthOnce(props);
  await runCommand('cdk', [
    'bootstrap',
    '--cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess',
    `--profile ${props.localProfile}`,
    tags,
    `aws://${props.organization.root.accounts.management.accountId}/${props.regions.global}`,
    '--app cdk.out',
  ].join(' '));
}
async function log(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
  await synthOnce(props);

  const regionBootStrapPromises = [];
  for (let region of DlzAllRegions(props.regions)) {
    regionBootStrapPromises.push(bootstrapChildAccount(props, bootstrapRoleName, props.organization.ous.security.accounts.log.accountId, region));
  }
  await Promise.all(regionBootStrapPromises);
}
async function audit(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
  await synthOnce(props);

  const regionBootStrapPromises = [];
  for (let region of DlzAllRegions(props.regions)) {
    regionBootStrapPromises.push(bootstrapChildAccount(props, bootstrapRoleName, props.organization.ous.security.accounts.audit.accountId, region));
  }
  await Promise.all(regionBootStrapPromises);
}
async function workloadAccounts(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
  await synthOnce(props);

  for (const account of props.organization.ous.workloads.accounts) {
    const regionBootStrapPromises = [];
    for (let region of DlzAllRegions(props.regions)) {
      regionBootStrapPromises.push(bootstrapChildAccount(props, bootstrapRoleName, account.accountId, region));
    }
    await Promise.all(regionBootStrapPromises);
  }
}

export async function all(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
  await management(props);
  await log(props, bootstrapRoleName);
  await audit(props, bootstrapRoleName);
  await workloadAccounts(props, bootstrapRoleName);
}