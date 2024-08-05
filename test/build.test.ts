// import * as assert from 'assert';
import { App } from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
// import {DataLandingZone, DlzControlTowerStandardControls, Region} from '../src';
import {
  DataLandingZone,
  Defaults,
  DlzAccountType,
  DlzControlTowerStandardControls,
  Region, SecurityHubNotificationSeverity, SecurityHubNotificationSWorkflowStatus,
  SlackChannel,
} from '../src';
// import * as sns from 'aws-cdk-lib/aws-sns';

test('Local build and debug', () => {
  const app = new App();
  // const dlz = new DataLandingZone(app, {

  const slackBudgetNotifications: SlackChannel = {
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
    denyServiceList: [
      ...Defaults.denyServiceList(),
      'ecs:*',
    ],
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
    securityHubNotifications: [
      {
        id: 'notify-high',
        severity: [
          SecurityHubNotificationSeverity.MEDIUM,
          SecurityHubNotificationSeverity.HIGH,
          SecurityHubNotificationSeverity.CRITICAL,
        ],
        workflowStatus: [
          SecurityHubNotificationSWorkflowStatus.NEW,
        ],
        notification: {
          // emails: ['rehan+dc-sh-high@datachef.co'],// Looks terrible
          slack: {
            slackChannelConfigurationName: 'security-hub-high',
            slackWorkspaceId: 'T06UBGRJCAC',
            slackChannelId: 'C06TEKK87E3',
          },
        },
      },
      {
        id: 'notify-resolved',
        workflowStatus: [
          SecurityHubNotificationSWorkflowStatus.RESOLVED,
          SecurityHubNotificationSWorkflowStatus.SUPPRESSED,
        ],
        notification: {
          // emails: ['rehan+dc-sh-resolved@datachef.co'],// Looks terrible
          slack: {
            slackChannelConfigurationName: 'security-hub-resolved',
            slackWorkspaceId: 'T06UBGRJCAC',
            slackChannelId: 'C06U0E6QEBU',
          },
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

          // Big Org, all workloads/projects per account
          accounts: [
            {
              name: 'project-1-develop',
              accountId: '381491899779',
              type: DlzAccountType.DEVELOP,
              vpcs: [
                {
                  name: 'default',
                  region: Region.US_EAST_1,
                  cidr: '10.0.0.0/16',
                  subnets: [
                    /* Evenly divide, each /19 = 8k hosts */
                    {
                      segment: 'private',
                      name: 'private-1',
                      cidr: '10.0.0.0/19',
                      az: 'us-east-1a',
                    },
                    {
                      segment: 'private',
                      name: 'private-2',
                      cidr: '10.0.32.0/19',
                      az: 'us-east-1b',
                    },
                    {
                      segment: 'private',
                      name: 'private-3',
                      cidr: '10.0.64.0/19',
                      az: 'us-east-1c',
                    },
                    {
                      segment: 'public',
                      name: 'public-1',
                      cidr: '10.0.96.0/19',
                      az: 'us-east-1a',
                    },
                    {
                      segment: 'public',
                      name: 'public-2',
                      cidr: '10.0.128.0/19',
                      az: 'us-east-1a',
                    },
                    {
                      segment: 'public',
                      name: 'public-3',
                      cidr: '10.0.160.0/19',
                      az: 'us-east-1a',
                    },
                    /* Remaining:
                    *  - 10.0.192.0/19
                    *  - 10.0.224.0/19
                    * */
                  ],
                },
                {
                  name: 'default',
                  region: Region.EU_WEST_1,
                  cidr: '10.1.0.0/16',
                  subnets: [
                    /* Evenly divide, each /19 = 8k hosts */
                    {
                      segment: 'private',
                      name: 'private-1',
                      cidr: '10.1.0.1/19',
                      az: 'us-east-1a',
                    },
                    {
                      segment: 'private',
                      name: 'private-2',
                      cidr: '10.1.32.0/19',
                      az: 'us-east-1b',
                    },
                    {
                      segment: 'private',
                      name: 'private-3',
                      cidr: '10.1.64.0/19',
                      az: 'us-east-1c',
                    },
                    {
                      segment: 'public',
                      name: 'public-1',
                      cidr: '10.1.96.0/19',
                      az: 'us-east-1a',
                    },
                    {
                      segment: 'public',
                      name: 'public-2',
                      cidr: '10.1.128.0/19',
                      az: 'us-east-1a',
                    },
                    {
                      segment: 'public',
                      name: 'public-3',
                      cidr: '10.1.160.0/19',
                      az: 'us-east-1a',
                    },
                    /* Remaining:
                    *  - 10.1.192.0/19
                    *  - 10.1.224.0/19
                    * */
                  ],
                },
              ],
            },
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
          //     name: 'project-2-stage',
          //     accountId: '333333',
          //     type: DlzAccountType.DEVELOP,
          //   },
          //   {
          //     name: 'project-2-production',
          //     accountId: '4444444',
          //     type: DlzAccountType.PRODUCTION,
          //   },
          ],

          // controls: [ ] //This will be possible but has not been done...
        },
        suspended: {
          ouId: 'ou-vh4d-rhcmhzsy',
        },
      },

    },
    deploymentPlatform: {
      gitHub: {
        references: [
          { owner: 'DataChefHQ', repo: 'recipes_data-landing-zone_data-landing-zone-sandbox' },
          // { owner: "DataChefHQ", repo: 'recipes_data-landing-zone_data-landing-zone-sandbox', filter: "main"}
        ],
      },
    },

    printDeploymentOrder: false,
    saveReport: false,
    printReport: false,
  });

  // assert.ok(managementStack);
  // const template = Template.fromStack(dlz.managementStack);
  // template.hasResource('AWS::SNS::Topic', { });
});

