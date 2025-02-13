import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { InstanceClass, InstanceSize, InstanceType } from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import {
  DataLandingZone,
  DataLandingZoneProps,
  Defaults,
  DlzAccountType,
  DlzControlTowerStandardControls,
  IdentityStoreUser,
  Region,
  SecurityHubNotificationSeverity,
  SecurityHubNotificationSWorkflowStatus,
  SlackChannel,
  IamAccountAlias,
} from '../src';
import {
  cdkTemplateToJson,
  //@ts-ignore
} from './helpers.test';
import { DatabaseAction, TableAction, TagAction } from '../src/constructs/dlz-lake-formation';
import { NetworkAddress } from '../src/constructs/dlz-vpc/network-address';

const jestConsole = console;

const slackBudgetNotifications: SlackChannel = {
  slackChannelConfigurationName: 'budget-alerts',
  slackWorkspaceId: 'T1',
  slackChannelId: 'C2',
};

const configBase: DataLandingZoneProps = {
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
    owner: [],
    project: undefined,
    environment: ['development', 'staging', 'production'],
  },
  additionalMandatoryTags: [
    {
      name: 'Cost Center',
      values: ['test'],
    },
  ],
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
            name: 'project-1-development',
            accountId: '381491899779',
            defaultNotification: {
              emails: ['rehan+dc-default-notification@datachef.co'],
            },
            type: DlzAccountType.DEVELOP,
            vpcs: [
              {
                name: 'default',
                region: Region.US_EAST_1,
                cidr: '10.0.0.0/16',
                routeTables: [
                  /* Evenly divide, each /19 = 8k hosts */
                  {
                    name: 'private',
                    subnets: [
                      {
                        name: 'private-1',
                        cidr: '10.0.0.0/19',
                        az: 'us-east-1a',
                      },
                      {
                        name: 'private-2',
                        cidr: '10.0.32.0/19',
                        az: 'us-east-1b',
                      },
                      {
                        name: 'private-3',
                        cidr: '10.0.64.0/19',
                        az: 'us-east-1c',
                      },
                    ],
                  },
                  {
                    name: 'public',
                    subnets: [
                      {
                        name: 'public-1',
                        cidr: '10.0.96.0/19',
                        az: 'us-east-1a',
                      },
                      {
                        name: 'public-2',
                        cidr: '10.0.128.0/19',
                        az: 'us-east-1a',
                      },
                      {
                        name: 'public-3',
                        cidr: '10.0.160.0/19',
                        az: 'us-east-1a',
                      },

                    ],
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
                routeTables: [
                  /* Evenly divide, each /19 = 8k hosts */
                  {
                    name: 'private',
                    subnets: [
                      /* Evenly divide, each /19 = 8k hosts */
                      {
                        name: 'private-1',
                        cidr: '10.1.0.0/19',
                        az: 'us-east-1a',
                      },
                      {
                        name: 'private-2',
                        cidr: '10.1.32.0/19',
                        az: 'us-east-1b',
                      },
                      {
                        name: 'private-3',
                        cidr: '10.1.64.0/19',
                        az: 'us-east-1c',
                      },
                    ],
                  },
                  {
                    name: 'public',
                    subnets: [
                      {
                        name: 'public-1',
                        cidr: '10.1.96.0/19',
                        az: 'us-east-1a',
                      },
                      {
                        name: 'public-2',
                        cidr: '10.1.128.0/19',
                        az: 'us-east-1a',
                      },
                      {
                        name: 'public-3',
                        cidr: '10.1.160.0/19',
                        az: 'us-east-1a',
                      },
                    ],
                  },
                  /* Remaining:
                   *  - 10.1.192.0/19
                   *  - 10.1.224.0/19
                   * */
                ],
              },

            ],
            lakeFormation: [{
              region: Region.EU_WEST_1,
              admins: ['arn:aws:iam::123456789012:role/MyLakeFormationAdminRole'],
              tags: [
                {
                  tagKey: 'tag1',
                  tagValues: ['value1', 'value2'],
                  share: {
                    withinAccount: [
                      {
                        tagActions: [TagAction.ALTER, TagAction.ASSOCIATE, TagAction.DESCRIBE, TagAction.DROP],
                        tagActionsWithGrant: [TagAction.ALTER, TagAction.ASSOCIATE, TagAction.DESCRIBE, TagAction.DROP],
                        principals: ['arn:aws:iam::123456789012:role/FakeRole1', 'arn:aws:iam::123456789012:role/FakeRole2'],
                        specificValues: ['value1'],
                      },
                    ],
                    withExternalAccount: [
                      {
                        tagActions: [TagAction.ASSOCIATE, TagAction.DESCRIBE],
                        tagActionsWithGrant: [TagAction.ASSOCIATE, TagAction.DESCRIBE],
                        principals: ['arn:aws:iam::123456789012:root'],
                      },
                    ],
                  },
                },
                {
                  tagKey: 'tag2',
                  tagValues: ['value3', 'value4'],
                },
              ],
              permissions: [
                {
                  principals: ['arn:aws:iam::123456789012:role/FakeRole1', 'arn:aws:iam::123456789012:role/FakeRole2'],
                  tags: [
                    {
                      tagKey: 'tag1',
                      tagValues: ['value1', 'value2'],
                    },
                  ],
                  databaseActions: [DatabaseAction.DESCRIBE],
                  databaseActionsWithGrant: [DatabaseAction.DESCRIBE],
                  tableActions: [TableAction.DESCRIBE, TableAction.SELECT],
                  tableActionsWithGrant: [TableAction.DESCRIBE, TableAction.SELECT],
                },
                {
                  principals: ['arn:aws:iam::123456789012:role/FakeRole1'],
                  tags: [
                    {
                      tagKey: 'tag2',
                      tagValues: ['value3'],
                    },
                  ],
                  databaseActions: [DatabaseAction.DESCRIBE],
                  tableActions: [TableAction.DESCRIBE, TableAction.SELECT],
                },
              ],
            }],
            iam: {
              accountAlias: 'dlz-development',
              passwordPolicy: {
                minimumPasswordLength: 14,
                allowUsersToChangePassword: true,
                requireLowercaseCharacters: true,
                requireNumbers: true,
                requireSymbols: true,
                requireUppercaseCharacters: true,
              },
              policies: [{
                policyName: 'TestPolicy',
                statements: [
                  new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: ['s3:Get*', 's3:List*'],
                    resources: ['*'],
                  }),
                ],
              }, {
                policyName: 'TestPolicy2',
                statements: [
                  new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: ['s3:Get*', 's3:List*'],
                    resources: ['*'],
                  }),
                ],
              }],
              roles: [{
                roleName: 'TestRole',
                assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
                managedPolicyNames: [
                  'TestPolicy',
                ],
              }],
              users: [{
                userName: 'john.doe',
                managedPolicyNames: [
                  'TestPolicy',
                ],
              }, {
                userName: 'jane.doe',
              }],
              userGroups: [{
                groupName: 'developers',
                managedPolicyNames: [
                  'TestPolicy',
                ],
                users: [
                  'john.doe',
                ],
              }],
            },
          },
          {
            name: 'project-1-production',
            accountId: '234567890123',
            type: DlzAccountType.PRODUCTION,
            vpcs: [
              {
                name: 'default',
                region: Region.US_EAST_1,
                cidr: '10.2.0.0/16',
                routeTables: [
                  /* Evenly divide, each /19 = 8k hosts */
                  {
                    name: 'private',
                    subnets: [
                      /* Evenly divide, each /19 = 8k hosts */
                      {
                        name: 'private-1',
                        cidr: '10.2.0.0/19',
                        az: 'us-east-1a',
                      },
                      {
                        name: 'private-2',
                        cidr: '10.2.32.0/19',
                        az: 'us-east-1b',
                      },
                      {
                        name: 'private-3',
                        cidr: '10.2.64.0/19',
                        az: 'us-east-1c',
                      },
                    ],
                  },
                  {
                    name: 'public',
                    subnets: [
                      {
                        name: 'public-1',
                        cidr: '10.2.96.0/19',
                        az: 'us-east-1a',
                      },
                      {
                        name: 'public-2',
                        cidr: '10.2.128.0/19',
                        az: 'us-east-1a',
                      },
                      {
                        name: 'public-3',
                        cidr: '10.2.160.0/19',
                        az: 'us-east-1a',
                      },
                    ],
                  },
                  /* Remaining:
                   *  - 10.2.192.0/19
                   *  - 10.2.224.0/19
                   * */
                ],
              },
              {
                name: 'default',
                region: Region.EU_WEST_1,
                cidr: '10.3.0.0/16',
                routeTables: [
                  /* Evenly divide, each /19 = 8k hosts */
                  {
                    name: 'private',
                    subnets: [
                      /* Evenly divide, each /19 = 8k hosts */
                      {
                        name: 'private-1',
                        cidr: '10.3.0.0/19',
                        az: 'us-east-1a',
                      },
                      {
                        name: 'private-2',
                        cidr: '10.3.32.0/19',
                        az: 'us-east-1b',
                      },
                      {
                        name: 'private-3',
                        cidr: '10.3.64.0/19',
                        az: 'us-east-1c',
                      },
                    ],
                  },
                  {
                    name: 'public',
                    subnets: [
                      {
                        name: 'public-1',
                        cidr: '10.3.96.0/19',
                        az: 'us-east-1a',
                      },
                      {
                        name: 'public-2',
                        cidr: '10.3.128.0/19',
                        az: 'us-east-1a',
                      },
                      {
                        name: 'public-3',
                        cidr: '10.3.160.0/19',
                        az: 'us-east-1a',
                      },
                    ],
                  },
                  /* Remaining:
                   *  - 10.3.192.0/19
                   *  - 10.3.224.0/19
                   * */
                ],
              },
            ],
          },
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
        // { owner: "DataChefHQ", repo: 'recipes_data-landing-zone_data-landing-zone-sandbox', filter: "refs/heads/main"}
      ],
    },
  },
  network: {
    connections: {
      vpcPeering: [
        // Single Dev global subnet to Single Prod Subnet regional subnet
        {
          source: new NetworkAddress('project-1-development', Region.EU_WEST_1, 'default', 'private'),
          destination: NetworkAddress.fromString('project-1-production.us-east-1.default.private'),
        },

        // // All Dev VPCs subnets to Single Prod regional subnet
        // {
        //   source: new NetworkAddress('development'),
        //   destination: NetworkAddress.fromString('production.us-east-1.default.private'),
        // },
        //
        // // All Dev VPCs Subnets to all Prod VPCs Subnets
        // {
        //   source: new NetworkAddress('development'),
        //   destination: NetworkAddress.fromString('production'),
        // },
        //
        // //Private subnets of Dev Account global VPC to Dev Account regional VPC
        // {
        //   source: new NetworkAddress('development', Region.EU_WEST_1, 'default', 'private'),
        //   destination: new NetworkAddress('development', Region.US_EAST_1, 'default', 'private'),
        // },
        //
        // // All Dev VPCs private subnets to Single Prod regional Subnet - Represented as two connections
        // {
        //   source: new NetworkAddress('development', Region.EU_WEST_1, 'default', 'private'),
        //   destination: NetworkAddress.fromString('production.us-east-1.default.private'),
        // },
        // {
        //   source: new NetworkAddress('development', Region.US_EAST_1, 'default', 'private'),
        //   destination: NetworkAddress.fromString('production.us-east-1.default.private'),
        // },
      ],
    },
    nats: [
      /* One NAT Instance that routes all traffic from the private route table and it's subnets  */
      {
        name: 'project-1-development-eu-west-1-internet-access',
        location: new NetworkAddress('project-1-development', Region.EU_WEST_1, 'default', 'public', 'public-1'),
        allowAccessFrom: [
          new NetworkAddress('project-1-development', Region.EU_WEST_1, 'default', 'private'),
        ],
        type: {
          instance: {
            instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
          },
        },
      },

      /* The same as above but for the production account that uses a NAT GW */
      {
        name: 'project-1-production-eu-west-1-internet-access',
        location: new NetworkAddress('project-1-production', Region.EU_WEST_1, 'default', 'public', 'public-1'),
        allowAccessFrom: [
          new NetworkAddress('project-1-production', Region.EU_WEST_1, 'default', 'private'),
        ],
        type: {
          gateway: {
            // eip: {
            //   tags: [{key: 'Extra', value: "cool"}],
            // }
          },
        },
      },
    ],
    bastionHosts: [
      {
        name: 'default', // can this be optional, defaults to 'default', would be unique in stack, but not app.
        location: new NetworkAddress('project-1-development', Region.EU_WEST_1, 'default', 'private', 'private-1'),
        instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
      },
    ],
  },
  defaultNotification: {
    slack: {
      slackChannelConfigurationName: 'default-notifications',
      slackWorkspaceId: 'T06UBGRJCAC',
      slackChannelId: 'C06TEKK87E3',
    },
  },
  iamPolicyPermissionBoundary: {
    policyStatement: {
      effect: iam.Effect.ALLOW,
      actions: ['s3:*'],
      resources: ['*'],
    },
  },
  iamIdentityCenter: {
    arn: 'sso-instance-arn',
    id: 'sso-instance-id',
    storeId: 'identity-store-id',
    users: [
      {
        userName: 'testusera@example.com',
        name: 'Test A',
        surname: 'User A',
      },
      {
        userName: 'testuserb@example.com',
        name: 'Test B',
        surname: 'User B',
      },
      {
        userName: 'testuserc@example.com',
        name: 'Test C',
        surname: 'User C',
      },
    ],
    permissionSets: [
      ...Defaults.iamIdentityCenterPermissionSets(),
      {
        name: 'longer-read-only',
        description: 'Read only only for 12 hours',
        managedPolicyArns: ['arn:aws:iam::aws:policy/ReadOnlyAccess'],
        sessionDuration: cdk.Duration.hours(12),
      },
      {
        name: 'inline-permission-set-read-only-s3',
        description: 'Limited get object permission',
        inlinePolicyDocument: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              actions: ['s3:GetObject'],
              resources: ['arn:aws:s3:::mybucket/*'],
            }),
          ],
        }),
      },
    ],
    accessGroups: [{
      name: 'admins',
      description: 'Root account admin access',
      userNames: ['testusera', 'idpuser'],
      permissionSetName: 'AdministratorAccess',
      accountNames: ['root'],
    },
    {
      name: 'project-1-admins',
      description: 'Admin access to only project 1 accounts',
      userNames: ['testusera', 'idpuser'],
      permissionSetName: 'AdministratorAccess',
      accountNames: ['project-1-*'],
    },
    {
      name: 'limited-s3-read',
      description: 'Limited S3 read access',
      userNames: ['testuserc'],
      permissionSetName: 'inline-permission-set-read-only-s3',
      accountNames: ['root'],
    }],
  },
  printDeploymentOrder: false,
  saveReport: false,
  printReport: false,
};

jest.spyOn(IdentityStoreUser, 'fetchCodeDirectory').mockImplementation(() => {
  return path.join(__dirname, '../assets/constructs/iam-identity-center/identity-store-user-lambda');
});
jest.spyOn(IamAccountAlias, 'fetchCodeDirectory').mockImplementation(() => {
  return path.join(__dirname, '../assets/constructs/iam/lambda/iam-account-alias');
});

describe('Build', () => {

  beforeEach(() => {
    /* Disable Jest's console.log that adds the location of log lines */
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    global.console = require('console');
  });
  afterEach(() => {
    /* Restore Jest's console */
    global.console = jestConsole;
  });

  test('Local build and debug', () => {
    const app = new App();

    // const dlz = new DataLandingZone(app, {
    new DataLandingZone(app, configBase);

    // console.log(dlz.managementStack);

  });

  test('Local snapshot testing', () => {
    const app = new App();

    const dlz = new DataLandingZone(app, configBase);

    const managementTemplate: Template = Template.fromStack(dlz.managementStacks.global);
    expect(cdkTemplateToJson(managementTemplate)).toMatchSnapshot('managementTemplate snapshot');

    const globalIamIdentityCenter: Template = Template.fromStack(dlz.managementStacks.globalIamIdentityCenter!);
    expect(cdkTemplateToJson(globalIamIdentityCenter)).toMatchSnapshot('globalIamIdentityCenter snapshot');

    // const logStacksGlobalTemplate: Template = Template.fromStack(dlz.logStacks.global);
    // expect(logStacksGlobalTemplate.toJSON()).toMatchSnapshot('logStacksGlobalTemplate snapshot');

    // const logStacksRegionalTemplates: Template[] = dlz.logStacks.regional.map(stack => Template.fromStack(stack));
    // logStacksRegionalTemplates.forEach(template => expect(template.toJSON()).toMatchSnapshot('logStacksRegionalTemplates snapshot'));

    const auditStacksGlobalTemplate: Template = Template.fromStack(dlz.auditStacks.global);
    expect(auditStacksGlobalTemplate.toJSON()).toMatchSnapshot('auditStacksGlobalTemplate snapshot');

    // const auditStacksRegionalTemplates: Template[] = dlz.auditStacks.regional.map(stack => Template.fromStack(stack));
    // auditStacksRegionalTemplates.forEach(template => expect(template.toJSON()).toMatchSnapshot('auditStacksRegionalTemplates snapshot'));

    const workloadGlobalStacksTemplates: Template[] = dlz.workloadGlobalStacks.map(stack => Template.fromStack(stack));
    workloadGlobalStacksTemplates.forEach(template => expect(cdkTemplateToJson(template)).toMatchSnapshot('workloadGlobalStacksTemplates snapshot'));

    const workloadRegionalStacksTemplates: Template[] = dlz.workloadRegionalStacks.map(stack => Template.fromStack(stack));
    workloadRegionalStacksTemplates.forEach(template => expect(template.toJSON()).toMatchSnapshot('workloadRegionalStacksTemplates snapshot'));

    const workloadGlobalNetworkConnectionsPhase1StacksTemplates: Template[] =
      dlz.workloadGlobalNetworkConnectionsPhase1Stacks.map(stack => Template.fromStack(stack));
    workloadGlobalNetworkConnectionsPhase1StacksTemplates.forEach(template => expect(template.toJSON()).toMatchSnapshot('workloadGlobalNetworkConnectionsPhase1StacksTemplates snapshot'));

    const workloadGlobalNetworkConnectionsPhase2StacksTemplates: Template[] =
      dlz.workloadGlobalNetworkConnectionsPhase2Stacks.map(stack => Template.fromStack(stack));
    workloadGlobalNetworkConnectionsPhase2StacksTemplates.forEach(template => expect(template.toJSON()).toMatchSnapshot('workloadGlobalNetworkConnectionsPhase2StacksTemplates snapshot'));

    const workloadRegionalNetworkConnectionsPhase2StacksTemplates: Template[] =
      dlz.workloadRegionalNetworkConnectionsPhase2Stacks.map(stack => Template.fromStack(stack));
    workloadRegionalNetworkConnectionsPhase2StacksTemplates.forEach(template => expect(template.toJSON()).toMatchSnapshot('workloadRegionalNetworkConnectionsPhase2StacksTemplates snapshot'));

    const workloadGlobalNetworkConnectionsPhase3StacksTemplates: Template[] =
      dlz.workloadGlobalNetworkConnectionsPhase3Stacks.map(stack => Template.fromStack(stack));
    workloadGlobalNetworkConnectionsPhase3StacksTemplates.forEach(template => expect(template.toJSON()).toMatchSnapshot('workloadGlobalNetworkConnectionsPhase3StacksTemplates snapshot'));

    const workloadRegionalNetworkConnectionsPhase3StacksTemplates: Template[] =
      dlz.workloadRegionalNetworkConnectionsPhase3Stacks.map(stack => Template.fromStack(stack));
    workloadRegionalNetworkConnectionsPhase3StacksTemplates.forEach(template => expect(template.toJSON()).toMatchSnapshot('workloadRegionalNetworkConnectionsPhase3StacksTemplates snapshot'));

  });
});
