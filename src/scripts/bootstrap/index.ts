import { AssumeRoleCommand, STS } from '@aws-sdk/client-sts';
import { fromIni } from '@aws-sdk/credential-providers';
import { DataLandingZoneProps, DlzAllRegions } from '../../data-landing-zone';
import {CommandExec, runCommand, syncFunction, syncFunctionSleep} from '../lib/helpers';

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
  const management = props.accounts.management;

  const logAccountRole = `arn:aws:iam::${accountId}:role/${bootstrapRoleName}`;
  const logAccountCreds = await assumeRole(props.localProfile, props.regions.global, logAccountRole);

  await runCommand('cdk', [
      'bootstrap',
      '--cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess', // Needs to be specified if using --trust
      `--trust ${management.accountId}`,
      `aws://${accountId}/${region}`,
      '--output .temp-cdk-synth',
    ].join(' '),
    {
      env: {
        AWS_PROFILE: '',
        AWS_DEFAULT_REGION: region, // Needs to be specified if using env variables
        AWS_ACCESS_KEY_ID: logAccountCreds.AccessKeyId!,
        AWS_SECRET_ACCESS_KEY: logAccountCreds.SecretAccessKey!,
        AWS_SESSION_TOKEN: logAccountCreds.SessionToken!,
      },
    });
}

export class DlzScriptBootstrap {
  public async managementAsync(props: DataLandingZoneProps) {
      const management = props.accounts.management;
    await runCommand('npx', [
        'cdk',
        'bootstrap',
        '--cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess',
        `--profile ${props.localProfile}`,
        `aws://${management.accountId}/${props.regions.global}`,
        '--output .temp-cdk-synth',
      ].join(' '));
  }

  public async managementAsync2(props: DataLandingZoneProps) {
    const management = props.accounts.management;
    await CommandExec('npx', [
      'cdk',
      'bootstrap',
      '--cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess',
      `--profile ${props.localProfile}`,
      `aws://${management.accountId}/${props.regions.global}`,
      '--output .temp-cdk-synth',
    ]);
  }

  public managementAsync3(props: DataLandingZoneProps) {
    syncFunction( async () => {
      const management = props.accounts.management;
      await CommandExec('npx', [
        'cdk',
        'bootstrap',
        '--cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess',
        `--profile ${props.localProfile}`,
        `aws://${management.accountId}/${props.regions.global}`,
        '--output .temp-cdk-synth',
      ]);
    })
  }


  // public managementNonStatic(props: DataLandingZoneProps) {
  //   syncFunction( async () => {
  //     const management = props.accounts.management;
  //     await runCommand('cdk', [
  //       'bootstrap',
  //       '--cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess',
  //       `--profile ${props.localProfile}`,
  //       `aws://${management.accountId}/${props.regions.global}`,
  //       '--output .temp-cdk-synth',
  //     ].join(' '));
  //   })
  // }

  public async management(props: DataLandingZoneProps) {
    // syncFunction( async () => {
      const management = props.accounts.management;
       await runCommand('npx', [
        'cdk',
        'bootstrap',
        '--cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess',
        `--profile ${props.localProfile}`,
        `aws://${management.accountId}/${props.regions.global}`,
        '--output .temp-cdk-synth',
      ].join(' '));
      // console.log("RESP", resp);
    // })
  }

  public static managementSpawn(props: DataLandingZoneProps) {
    syncFunctionSleep( async () => {
      const management = props.accounts.management;

       const resp = await CommandExec('npx', [
        'cdk',
        'bootstrap',
        '--cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess',
        `--profile ${props.localProfile}`,
        `aws://${management.accountId}/${props.regions.global}`,
        '--output .temp-cdk-synth',
      ]);
      console.log("RESP", resp);
    })
  }

  public static log(props: DataLandingZoneProps, bootstrapRoleName: string) {
    syncFunction( async () => {
      for (let region of DlzAllRegions(props.regions)) {
        const log = props.accounts.log;
        await bootstrapChildAccount(props, bootstrapRoleName, log.accountId, region);
      }
    })
  }

  public static audit(props: DataLandingZoneProps, bootstrapRoleName: string) {
    syncFunction( async () => {
      for (let region of DlzAllRegions(props.regions)) {
        const audit = props.accounts.audit;
        await bootstrapChildAccount(props, bootstrapRoleName, audit.accountId, region);
      }
    })
  }
}