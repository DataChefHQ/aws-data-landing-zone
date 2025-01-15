import { writeFile } from 'fs/promises';
import * as path from 'path';
import { dump } from 'js-yaml';
import { DataLandingZoneProps } from '../../data-landing-zone-types';
import { assumeRole, runCommand } from '../lib/helpers';

export async function awsNuke(props: DataLandingZoneProps, relativeDir: string, awsNukeBinary: string, accountName: string, dryRun: boolean = true) {

  const workloadAccount = props.organization.ous.workloads.accounts.find(a => a.name === accountName);
  const suspendedAccount = props.organization.ous.suspended.accounts?.find(a => a.name === accountName);

  let accountId: string;
  let globalFilters = [];
  const controlTowerFilters = [
    // Better to not specify the property, it will use the Name, ID and ARN then.
    // CDK preset https://github.com/ekristen/aws-nuke/issues/401#issuecomment-2433215826, but reduced, also
    //  not going to filter on the identifier, this is enough
    {
      type: 'contains',
      value: 'aws-controltower',
    },
    {
      type: 'contains',
      value: 'AWSControlTower',
    },
    {
      type: 'contains',
      value: 'aws-controltower',
    },

    //Some AWS SSO and IAM Identity Center resources should nto be deleted, grouping them with the ControlTower filters
    {
      type: 'regex',
      value: 'AWSSSO_.*_DO_NOT_DELETE',
    },
    {
      type: 'glob',
      value: 'AWSReservedSSO_*',
    },
  ];
  const cdkFilters = [
    {
      type: 'contains',
      value: 'cdk',
    },
    {
      type: 'contains',
      value: 'CDK',
    },
    {
      property: 'tag:aws:cloudformation:stack-name',
      value: 'CDKToolkit',
    },
    {
      property: 'tag:aws:aws-cdk:bootstrap-role',
      value: 'lookup',
    },
    {
      property: 'tag:aws:aws-cdk:bootstrap-role',
      value: 'image-publishing',
    },
    {
      property: 'tag:aws:aws-cdk:bootstrap-role',
      value: 'file-publishing',
    },
    {
      property: 'tag:aws:aws-cdk:bootstrap-role',
      value: 'deploy',
    },
    {
      property: 'tag:aws:aws:cloudformation:stack-id',
      type: 'glob',
      value: '*CDK*',
    },
  ];
  const dlzFilters = [
    {
      type: 'contains',
      value: 'dlz-',
    },
    {
      property: 'tag:aws:cloudformation:stack-name',
      type: 'glob',
      value: 'dlz-',
    },
    {
      property: 'tag:Environment',
      value: 'dlz',
    },
    {
      property: 'tag:user:Environment', // IAMUserPolicyAttachment resources prefixes user to it for some reason
      value: 'dlz',
    },
    {
      property: 'tag:role:Environment', // IAMRolePolicyAttachment resources prefixes role to it for some reason
      value: 'dlz',
    },
  ];

  if (workloadAccount) {
    accountId = workloadAccount.accountId;
    console.log(`Account: ${accountName} (${accountId})`);
    console.log('OU: Workloads');
    console.log('Target: ALL resources except: ControlTower, CDK Bootstrap and DLZ resources.');
    globalFilters = [
      ...controlTowerFilters,
      ...cdkFilters,
      ...dlzFilters,
    ];
  } else if (suspendedAccount) {
    accountId = suspendedAccount.accountId;
    console.log(`Account: ${accountName} (${accountId})`);
    console.log('OU: Suspended');
    console.log('Target: ALL resources except: ControlTower and CDK Bootstrap.');
    globalFilters = [
      ...controlTowerFilters,
      ...cdkFilters,
    ];
  } else {
    throw new Error(`Account ${accountName} not found in Workloads or Suspended OUs.`);
  }

  let nukeConfig = {
    'regions': [
      props.regions.global,
      ...props.regions.regional,
      'global',
    ],
    'account-blocklist': [
      '000000000000', // Just to make it happy that we listed something
    ],
    'bypass-alias-check-accounts': [
      accountId,
    ],
    'accounts': {
      [accountId]: {
        filters: {
          __global__: globalFilters,
        },
      },
    },
    'resource-types': {
      //https://github.com/ekristen/aws-nuke/issues/404 exclude disabled/deprecated services, will error, but continues
      // if it can not be accessed
      excludes: [
        'ServiceCatalogTagOption', // Excluded due to https://github.com/rebuy-de/aws-nuke/issues/515
        'ServiceCatalogTagOptionPortfolioAttachment', // Excluded due to https://github.com/rebuy-de/aws-nuke/issues/515
        'FMSNotificationChannel', // Excluded because it's not available
        'FMSPolicy', // Excluded because it's not available
        'MachineLearningMLModel', // Excluded due to ML being unavailable
        'MachineLearningDataSource', // Excluded due to ML being unavailable
        'MachineLearningBranchPrediction', // Excluded due to ML being unavailable
        'MachineLearningEvaluation', // Excluded due to ML being unavailable
        'RoboMakerDeploymentJob', // Deprecated Service
        'RoboMakerFleet', // Deprecated Service
        'RoboMakerRobot', // Deprecated Service
        'RoboMakerSimulationJob', // Deprecated Service
        'RoboMakerRobotApplication', // Deprecated Service
        'RoboMakerSimulationApplication', // Deprecated Service
        'OpsWorksApp', // Deprecated service
        'OpsWorksInstance', // Deprecated service
        'OpsWorksLayer', // Deprecated service
        'OpsWorksUserProfile', // Deprecated service
        'OpsWorksCMBackup', // Deprecated service
        'OpsWorksCMServer', // Deprecated service
        'OpsWorksCMServerState', // Deprecated service
        'CodeStarProject', // Deprecated service
        'CodeStarConnection', // Deprecated service
        'CodeStarNotification', // Deprecated service
        'Cloud9Environment', // Deprecated service
        'CloudSearchDomain', // Deprecated service
        'RedshiftServerlessSnapshot', // Deprecated service
        'RedshiftServerlessNamespace', // Deprecated service
        'RedshiftServerlessWorkgroup', // Deprecated service
        'ElasticTranscoderPreset', // Deprecated service
        'ElasticTranscoderPipeline', // Deprecated service
      ],
    },
  };
  const nukeConfigYaml = dump(nukeConfig);
  await writeFile(path.resolve(relativeDir, 'aws-nuke-config.yml'), nukeConfigYaml);

  const accountRole = `arn:aws:iam::${accountId}:role/AWSControlTowerExecution`;
  const accountCreds = await assumeRole(props.localProfile, props.regions.global, accountRole, 'DlzAWSNuke');
  let nukeArgs = [
    'run',
    '--no-alias-check',
    // '--log-level', 'debug',
    '--config aws-nuke-config.yml',
    '--no-prompt',
  ];
  if (!dryRun) {
    nukeArgs.push('--no-dry-run');
  }
  await runCommand(awsNukeBinary, nukeArgs.join(' '), {
    cwd: relativeDir,
    env: {
      AWS_PROFILE: '',
      AWS_DEFAULT_REGION: props.regions.global,
      AWS_ACCESS_KEY_ID: accountCreds.AccessKeyId!,
      AWS_SECRET_ACCESS_KEY: accountCreds.SecretAccessKey!,
      AWS_SESSION_TOKEN: accountCreds.SessionToken!,
    },
  });
}


