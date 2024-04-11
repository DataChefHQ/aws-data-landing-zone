// import * as assert from 'assert';
import { App } from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
// import {DataLandingZone, DlzControlTowerStandardControls, Region} from '../src';
import {
  DataLandingZone,
  Defaults,
  DlzAccountType,
  DlzControlTowerStandardControls,
  Region,
  SlackChannelId,
} from '../src';
// import * as sns from 'aws-cdk-lib/aws-sns';

test('Local build and debug', () => {
  const app = new App();
  // const dlz = new DataLandingZone(app, {

  const slackBudgetNotifications: SlackChannelId = {
    slackChannelConfigurationName: 'budget-alerts',
    slackWorkspaceId: 'T1',
    slackChannelId: 'C2',
  };

  new DataLandingZone(app, {
    localProfile: 'ct-sandbox-exported',
    regions: {
      global: Region.EU_WEST_1,
      regional: [Region.US_EAST_1],
    },
    mandatoryTags: {
      owner: ['backend'],
      project: ['accounting-internal'],
      environment: ['development', 'staging', 'production'],
    },
    budgets: [
      ...Defaults.budgets(100, 20, {
        slack: slackBudgetNotifications,
        emails: ['rehan+dc-budget--defaults@datachef.co'],
      }),
      {
        name: 'backend',
        forTags: {
          owner: 'backend',
        },
        amount: 100,
        subscribers: {
          slack: slackBudgetNotifications,
          emails: ['rehan+dc-budget--backend@datachef.co'],
        },
      },
      {
        name: 'backend-accounting-internal-development',
        forTags: {
          owner: 'backend',
          project: 'accounting-internal',
          environment: 'development',
        },
        amount: 100,
        subscribers: {
          slack: slackBudgetNotifications,
          emails: ['rehan+dc-budget--backend-accounting-internal-development@datachef.co'],
        },
      },
    ],
    organization: {
      organizationId: 'o-05ev6vk6fa',
      root: {
        accounts: {
          management: {
            accountId: '882070149987',
          },
        },
        /* Specify all the default controls and then an extra one */
        controls: [
          ...Defaults.rootControls(),
          DlzControlTowerStandardControls.SH_SECRETS_MANAGER_3,
        ],
      },


      ous: {
        security: {
          ouId: 'ou-vh4d-lpyovlyp',
          accounts: {
            log: {
              accountId: '730335597466',
            },
            audit: {
              accountId: '851725452335',
            },
          },
        },
        workloads: {
          ouId: 'ou-vh4d-nc2zzf9z',

          // Small Org, all workloads/projects in the same accounts
          accounts: [
            {
              name: 'development',
              accountId: '381491899779',
              type: DlzAccountType.DEVELOP,
            },
            {
              name: 'production',
              accountId: '891377027267',
              type: DlzAccountType.PRODUCTION,
            },
          ],

          // // Big Org, all workloads/projects per account
          // accounts: [
          //   {
          //     name: 'project-1-develop',
          //     accountId: '381491899779',
          //     type: DlzAccountType.DEVELOP,
          //   },
          //   {
          //     name: 'project-1-production',
          //     accountId: '234567890123',
          //     type: DlzAccountType.PRODUCTION,
          //   },
          //
          //   {
          //     name: 'project-2-develop',
          //     accountId: '1111',
          //     type: DlzAccountType.DEVELOP,
          //   },
          //   {
          //     name: 'project-2-test',
          //     accountId: '22222',
          //     type: DlzAccountType.DEVELOP,
          //   },
          //   {
          //     name: 'project-3-stage',
          //     accountId: '333333',
          //     type: DlzAccountType.DEVELOP,
          //   },
          //   {
          //     name: 'project-2-production',
          //     accountId: '4444444',
          //     type: DlzAccountType.PRODUCTION,
          //   },
          // ]

          // controls: [ ] //This will be possible but has not been done...
        },
        suspended: {
          ouId: 'ou-vh4d-rhcmhzsy',
        },
      },
    },
  });

  // assert.ok(managementStack);
  // const template = Template.fromStack(dlz.managementStack);
  // template.hasResource('AWS::SNS::Topic', { });
});

