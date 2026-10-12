import { DataLandingZoneProps, DlzAllRegions } from '../../data-landing-zone-types';
import { writeBootstrapAccessLoggingTemplate } from '../lib/bootstrap-template';
import { assumeRole, runCommand } from '../lib/helpers';
import { synth } from '../synth';

const tags = '--tags Owner=infra --tags Project=dlz --tags Environment=dlz --tags CostCenter=dlz --tags Domain=foundation --tags Name=dlz';
const accessLoggingTemplate = 'cdk.out/dlz-bootstrap-access-logging.json';

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
    ...(props.bootstrapAccessLogging ? [`--template ${accessLoggingTemplate}`] : []),
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

async function management(props: DataLandingZoneProps) {
  const managementAccountId = props.organization.root.accounts.management.accountId;
  const managementRegions = new Set<string>([props.regions.global]);

  // CUR's BCM Data Exports resource is us-east-1-only.
  if (props.finOps?.dataExports) {
    managementRegions.add('us-east-1');
  }

  for (const region of managementRegions) {
    await runCommand('cdk', [
      'bootstrap',
      '--cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess',
      `--profile ${props.localProfile}`,
      tags,
      `aws://${managementAccountId}/${region}`,
      '--app cdk.out',
      ...(props.bootstrapAccessLogging ? [`--template ${accessLoggingTemplate}`] : []),
    ].join(' '));
  }
}
async function log(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
  const regionBootStrapPromises = [];
  for (let region of DlzAllRegions(props.regions)) {
    regionBootStrapPromises.push(bootstrapChildAccount(props, bootstrapRoleName, props.organization.ous.security.accounts.log.accountId, region));
  }
  await Promise.all(regionBootStrapPromises);
}
async function audit(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
  const regionBootStrapPromises = [];
  for (let region of DlzAllRegions(props.regions)) {
    regionBootStrapPromises.push(bootstrapChildAccount(props, bootstrapRoleName, props.organization.ous.security.accounts.audit.accountId, region));
  }
  await Promise.all(regionBootStrapPromises);
}
async function workloadAccounts(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
  for (const account of props.organization.ous.workloads.accounts) {
    const regionBootStrapPromises = [];
    for (let region of DlzAllRegions(props.regions)) {
      regionBootStrapPromises.push(bootstrapChildAccount(props, bootstrapRoleName, account.accountId, region));
    }
    await Promise.all(regionBootStrapPromises);
  }
}
async function finOps(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
  const finOpsAccount = props.organization.ous.sharedServices?.accounts.finOps;
  if (!finOpsAccount) return;
  const regionBootStrapPromises = [];
  for (let region of DlzAllRegions(props.regions)) {
    regionBootStrapPromises.push(bootstrapChildAccount(props, bootstrapRoleName, finOpsAccount.accountId, region));
  }
  await Promise.all(regionBootStrapPromises);
}

export async function all(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
  await synth(props);
  if (props.bootstrapAccessLogging) {
    writeBootstrapAccessLoggingTemplate(accessLoggingTemplate);
  }
  await management(props);
  await log(props, bootstrapRoleName);
  await audit(props, bootstrapRoleName);
  await workloadAccounts(props, bootstrapRoleName);
  await finOps(props, bootstrapRoleName);
}
