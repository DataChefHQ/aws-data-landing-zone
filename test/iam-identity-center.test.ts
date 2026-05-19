import * as path from 'path';
import {
  IdentitystoreClient,
  CreateUserCommand,
  DeleteUserCommand,
  UpdateUserCommand,
  DescribeUserCommand,
} from '@aws-sdk/client-identitystore';
import { App, Duration } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as iam from 'aws-cdk-lib/aws-iam';
import {
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceUpdateEvent,
  CloudFormationCustomResourceDeleteEvent,
} from 'aws-lambda';
import { CdkExpressPipeline } from 'cdk-express-pipeline';
import { Construct } from 'constructs';
import { DataLandingZoneProps, DlzAccountType, Region } from '../src';
import { DlzStack, DlzStackProps } from '../src/constructs/dlz-stack/index';
import { IamIdentityCenter } from '../src/constructs/iam-identity-center';
import { IdentityStoreUser } from '../src/constructs/iam-identity-center/identity-store-user';
import { handler } from '../src/constructs/iam-identity-center/identity-store-user-lambda';
import { Defaults } from '../src/defaults';

jest.mock('@aws-sdk/client-identitystore');

const mockSend = jest.fn();
IdentitystoreClient.prototype.send = mockSend;

const configBase: DataLandingZoneProps = {
  localProfile: 'ct-sandbox-exported',
  regions: {
    global: Region.EU_WEST_1,
    regional: [Region.US_EAST_1],
  },
  mandatoryTags: {
    owner: [],
    project: [],
    environment: [],
    costCenter: [],
    domain: [],
  },
  securityHubNotifications: [],
  organization: {
    organizationId: 'o-05ev6vk6fa',
    root: {
      accounts: {
        management: {
          accountId: '882070149987',
        },
      },
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
        accounts: [],
      },
      suspended: {
        ouId: 'ou-vh4d-rhcmhzsy',
      },
    },
  },
  printDeploymentOrder: false,
  saveReport: false,
  printReport: false,
};

class TestStack extends DlzStack {
  constructor(scope: Construct, stackProps: DlzStackProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);
    if (this.props.iamIdentityCenter) { new IamIdentityCenter(this, this.props.organization, this.props.iamIdentityCenter); }
  }
}

jest.spyOn(IdentityStoreUser, 'fetchCodeDirectory').mockImplementation(() => {
  return path.join(__dirname, '../assets/constructs/iam-identity-center/identity-store-user-lambda');
});

describe('Permission sets', () => {
  const app = new App();
  const pipeline = new CdkExpressPipeline();
  const wave = pipeline.addWave('wave');
  const stage = wave.addStage('stage');
  const stack = new TestStack(app, {
    stage,
    name: {
      stack: 'test',
      region: 'eu-west-1',
    },
    env: {
      account: '123456789012',
      region: 'us-east-1',
    },
  }, {
    ...configBase,
    iamIdentityCenter: {
      id: 'sso-instance-id',
      storeId: 'identity-store-id',
      arn: 'arn:aws:sso:::instance/sso-instance-id',
      permissionSets: [
        ...Defaults.iamIdentityCenterPermissionSets(),
        {
          name: 'longer-read-only',
          description: 'Read only only for 12 hours',
          managedPolicyArns: ['arn:aws:iam::aws:policy/ReadOnlyAccess'],
          sessionDuration: Duration.hours(12),
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
    },
  });

  const template = Template.fromStack(stack);

  test('Creates the permission sets', () => {
    template.resourceCountIs('AWS::SSO::PermissionSet', 4);
  });
  test('Check that an inline policy statement is changed to JSON that CFN accepts', () => {
    template.hasResourceProperties('AWS::SSO::PermissionSet', {
      Name: 'inline-permission-set-read-only-s3',
      Description: 'Limited get object permission',
      InstanceArn: 'arn:aws:sso:::instance/sso-instance-id',
      InlinePolicy: {
        Statement: [
          {
            Action: 's3:GetObject',
            Effect: 'Allow',
            Resource: 'arn:aws:s3:::mybucket/*',
          },
        ],
        Version: '2012-10-17',
      },
    });
  });
  test('Check that a cdk.Duration is changed to ISO format and that CFN accepts it', () => {
    template.hasResourceProperties('AWS::SSO::PermissionSet', {
      Name: 'longer-read-only',
      Description: 'Read only only for 12 hours',
      InstanceArn: 'arn:aws:sso:::instance/sso-instance-id',
      ManagedPolicies: ['arn:aws:iam::aws:policy/ReadOnlyAccess'],
      SessionDuration: 'PT12H',
    });
  });
});

describe('Access groups', () => {

  const app = new App();
  const pipeline = new CdkExpressPipeline();
  const wave = pipeline.addWave('wave');
  const stage = wave.addStage('stage');
  const stack = new TestStack(app, {
    stage,
    name: {
      stack: 'test',
      region: 'eu-west-1',
    },
    env: {
      account: '123456789012',
      region: 'us-east-1',
    },
  }, {
    ...configBase,
    organization: {
      ...configBase.organization,
      ous: {
        ...configBase.organization.ous,
        workloads: {
          ...configBase.organization.ous.workloads,
          accounts: [
            {
              name: 'project-1-develop',
              accountId: '381491899779',
              type: DlzAccountType.DEVELOP,
            },
            {
              name: 'project-1-production',
              accountId: '234567890123',
              type: DlzAccountType.PRODUCTION,
            },
          ],
        },
      },
    },
    iamIdentityCenter: {
      id: 'sso-instance-id',
      storeId: 'identity-store-id',
      arn: 'arn:aws:sso:::instance/sso-instance-id',
      permissionSets: [...Defaults.iamIdentityCenterPermissionSets()],
      users: [{
        userName: 'testuser@example.com',
        name: 'Test',
        surname: 'User',
      }],
      accessGroups: [
        {
          name: 'test-group',
          description: 'Test Group',
          userNames: ['testuser@example.com'],
          permissionSetName: 'AdministratorAccess',
          accountNames: ['*'],
        },
        {
          name: 'project-1-admins',
          description: 'Admin access to only project 1 accounts',
          userNames: ['testuser@example.com'],
          permissionSetName: 'AdministratorAccess',
          accountNames: ['project-1-*'],
        },
      ],
    },
  });

  const template = Template.fromStack(stack);

  test('Creates the access groups', () => {
    template.resourceCountIs('AWS::IdentityStore::Group', 2);
  });
  test('The accountNames that end in a * are resolved to the correct accounts', () => {
    template.hasResourceProperties('AWS::SSO::Assignment', {
      PrincipalId: { 'Fn::GetAtt': ['project1admins', 'GroupId'] },
      TargetId: '381491899779',
      TargetType: 'AWS_ACCOUNT',
      PrincipalType: 'GROUP',
    });

    template.hasResourceProperties('AWS::SSO::Assignment', {
      PrincipalId: { 'Fn::GetAtt': ['project1admins', 'GroupId'] },
      TargetId: '234567890123',
      TargetType: 'AWS_ACCOUNT',
      PrincipalType: 'GROUP',
    });
  });
  test('Where accounts is a single star, it must match all accounts', () => {
    template.hasResourceProperties('AWS::SSO::Assignment', {
      PrincipalId: { 'Fn::GetAtt': ['testgroup', 'GroupId'] },
      TargetId: '381491899779',
      TargetType: 'AWS_ACCOUNT',
      PrincipalType: 'GROUP',
    });

    template.hasResourceProperties('AWS::SSO::Assignment', {
      PrincipalId: { 'Fn::GetAtt': ['testgroup', 'GroupId'] },
      TargetId: '234567890123',
      TargetType: 'AWS_ACCOUNT',
      PrincipalType: 'GROUP',
    });

    template.hasResourceProperties('AWS::SSO::Assignment', {
      PrincipalId: { 'Fn::GetAtt': ['testgroup', 'GroupId'] },
      TargetId: '882070149987',
      TargetType: 'AWS_ACCOUNT',
      PrincipalType: 'GROUP',
    });

    template.hasResourceProperties('AWS::SSO::Assignment', {
      PrincipalId: { 'Fn::GetAtt': ['testgroup', 'GroupId'] },
      TargetId: '730335597466',
      TargetType: 'AWS_ACCOUNT',
      PrincipalType: 'GROUP',
    });

    template.hasResourceProperties('AWS::SSO::Assignment', {
      PrincipalId: { 'Fn::GetAtt': ['testgroup', 'GroupId'] },
      TargetId: '851725452335',
      TargetType: 'AWS_ACCOUNT',
      PrincipalType: 'GROUP',
    });
  });
});


describe('Empty userNames', () => {
  const app = new App();
  const pipeline = new CdkExpressPipeline();
  const wave = pipeline.addWave('wave');
  const stage = wave.addStage('stage');
  const stack = new TestStack(app, {
    stage,
    name: { stack: 'test', region: 'eu-west-1' },
    env: { account: '123456789012', region: 'us-east-1' },
  }, {
    ...configBase,
    iamIdentityCenter: {
      id: 'sso-instance-id',
      storeId: 'identity-store-id',
      arn: 'arn:aws:sso:::instance/sso-instance-id',
      permissionSets: [...Defaults.iamIdentityCenterPermissionSets()],
      users: [{ userName: 'real@example.com', name: 'Real', surname: 'User' }],
      accessGroups: [
        {
          name: 'empty-group',
          userNames: [],
          permissionSetName: 'ReadOnlyAccess',
          accountNames: ['root'],
        },
        {
          name: 'populated-group',
          userNames: ['real@example.com'],
          permissionSetName: 'ReadOnlyAccess',
          accountNames: ['root'],
        },
      ],
    },
  });

  const template = Template.fromStack(stack);

  test('empty userNames synthesizes group + assignment without memberships', () => {
    expect(stack.node.metadata.filter(m => m.type === 'aws:cdk:error')).toHaveLength(0);

    template.hasResourceProperties('AWS::IdentityStore::Group', { DisplayName: 'empty-group' });
    template.hasResourceProperties('AWS::SSO::Assignment', {
      PrincipalId: { 'Fn::GetAtt': ['emptygroup', 'GroupId'] },
      TargetId: '882070149987',
      TargetType: 'AWS_ACCOUNT',
      PrincipalType: 'GROUP',
    });

    const memberships = template.findResources('AWS::IdentityStore::GroupMembership');
    const forEmpty = Object.values(memberships).filter((r: any) =>
      r.Properties?.GroupId?.['Fn::GetAtt']?.[0] === 'emptygroup',
    );
    expect(forEmpty).toHaveLength(0);
  });
});

describe('Unresolved userName', () => {
  const app = new App();
  const pipeline = new CdkExpressPipeline();
  const wave = pipeline.addWave('wave');
  const stage = wave.addStage('stage');
  const stack = new TestStack(app, {
    stage,
    name: { stack: 'test', region: 'eu-west-1' },
    env: { account: '123456789012', region: 'us-east-1' },
  }, {
    ...configBase,
    iamIdentityCenter: {
      id: 'sso-instance-id',
      storeId: 'identity-store-id',
      arn: 'arn:aws:sso:::instance/sso-instance-id',
      permissionSets: [...Defaults.iamIdentityCenterPermissionSets()],
      users: [{ userName: 'real@example.com', name: 'Real', surname: 'User' }],
      accessGroups: [
        {
          name: 'typo-group',
          userNames: ['typoooo@example.com'],
          permissionSetName: 'ReadOnlyAccess',
          accountNames: ['root'],
        },
      ],
    },
  });

  test('errors with the missing userName and group', () => {
    const errors = stack.node.metadata.filter(m => m.type === 'aws:cdk:error');
    expect(errors.some(e => /The user typoooo@example.com in group typo-group does not exist/.test(String(e.data)))).toBe(true);
  });
});

describe('Permission set allowedAccountNames', () => {
  function makeStackWithAllowList(groupAccountNames: string[]): TestStack {
    const app = new App();
    const pipeline = new CdkExpressPipeline();
    const wave = pipeline.addWave('wave');
    const stage = wave.addStage('stage');
    return new TestStack(app, {
      stage,
      name: { stack: 'test', region: 'eu-west-1' },
      env: { account: '123456789012', region: 'us-east-1' },
    }, {
      ...configBase,
      organization: {
        ...configBase.organization,
        ous: {
          ...configBase.organization.ous,
          sharedServices: {
            ouId: 'ou-vh4d-finopsou1',
            accounts: { finOps: { accountId: '999988887777' } },
          },
        },
      },
      iamIdentityCenter: {
        id: 'sso-instance-id',
        storeId: 'identity-store-id',
        arn: 'arn:aws:sso:::instance/sso-instance-id',
        users: [{ userName: 'a@x.com', name: 'A', surname: 'X' }],
        permissionSets: [
          {
            name: 'FinOpsQuickSightConsole',
            allowedAccountNames: ['finOps'],
            managedPolicyArns: ['arn:aws:iam::aws:policy/ReadOnlyAccess'],
          },
        ],
        accessGroups: [
          {
            name: 'qs-group',
            userNames: ['a@x.com'],
            permissionSetName: 'FinOpsQuickSightConsole',
            accountNames: groupAccountNames,
          },
        ],
      },
    });
  }

  test('allows accounts in the allow-list', () => {
    const stack = makeStackWithAllowList(['finOps']);
    expect(stack.node.metadata.filter(m => m.type === 'aws:cdk:error')).toHaveLength(0);
    Template.fromStack(stack).hasResourceProperties('AWS::SSO::Assignment', {
      TargetId: '999988887777',
      TargetType: 'AWS_ACCOUNT',
    });
  });

  test('rejects account outside the allow-list', () => {
    const errors = makeStackWithAllowList(['root']).node.metadata.filter(m => m.type === 'aws:cdk:error');
    expect(errors).toHaveLength(1);
    expect(errors[0].data).toMatch(/Permission set "FinOpsQuickSightConsole" is restricted/);
    expect(errors[0].data).toMatch(/disallowed account\(s\): \[root\]/);
  });

  test('rejects wildcard expansion containing disallowed accounts', () => {
    const errors = makeStackWithAllowList(['*']).node.metadata.filter(m => m.type === 'aws:cdk:error');
    expect(errors).toHaveLength(1);
    expect(errors[0].data).toMatch(/Permission set "FinOpsQuickSightConsole" is restricted to \[finOps\]/);
  });
});

describe('Shared services finOps account', () => {
  const app = new App();
  const pipeline = new CdkExpressPipeline();
  const wave = pipeline.addWave('wave');
  const stage = wave.addStage('stage');
  const stack = new TestStack(app, {
    stage,
    name: {
      stack: 'test',
      region: 'eu-west-1',
    },
    env: {
      account: '123456789012',
      region: 'us-east-1',
    },
  }, {
    ...configBase,
    organization: {
      ...configBase.organization,
      ous: {
        ...configBase.organization.ous,
        sharedServices: {
          ouId: 'ou-vh4d-finopsou1',
          accounts: {
            finOps: {
              accountId: '999988887777',
            },
          },
        },
      },
    },
    iamIdentityCenter: {
      id: 'sso-instance-id',
      storeId: 'identity-store-id',
      arn: 'arn:aws:sso:::instance/sso-instance-id',
      permissionSets: [...Defaults.iamIdentityCenterPermissionSets()],
      users: [{
        userName: 'finops-lead@example.com',
        name: 'Pat',
        surname: 'Lead',
      }],
      accessGroups: [
        {
          name: 'dlz-finops-admins',
          userNames: ['finops-lead@example.com'],
          permissionSetName: 'AdministratorAccess',
          accountNames: ['finOps'],
        },
      ],
    },
  });

  const template = Template.fromStack(stack);

  test('resolves "finOps" to the sharedServices finOps account id', () => {
    template.hasResourceProperties('AWS::SSO::Assignment', {
      PrincipalId: { 'Fn::GetAtt': ['dlzfinopsadmins', 'GroupId'] },
      TargetId: '999988887777',
      TargetType: 'AWS_ACCOUNT',
      PrincipalType: 'GROUP',
    });
  });
});

describe('SSM parameters', () => {
  const app = new App();
  const pipeline = new CdkExpressPipeline();
  const wave = pipeline.addWave('wave');
  const stage = wave.addStage('stage');
  const stack = new TestStack(app, {
    stage,
    name: {
      stack: 'test',
      region: 'eu-west-1',
    },
    env: {
      account: '123456789012',
      region: 'us-east-1',
    },
  }, {
    ...configBase,
    iamIdentityCenter: {
      id: 'ssoins-abcd1234efgh5678',
      storeId: 'd-9067abcdef',
      arn: 'arn:aws:sso:::instance/ssoins-abcd1234efgh5678',
      users: [{ userName: 'a@x.com', name: 'A', surname: 'X' }],
      permissionSets: [
        { name: 'ReadOnly', managedPolicyArns: ['arn:aws:iam::aws:policy/ReadOnlyAccess'] },
        { name: 'Admin', managedPolicyArns: ['arn:aws:iam::aws:policy/AdministratorAccess'] },
      ],
      accessGroups: [
        { name: 'group-one', userNames: ['a@x.com'], permissionSetName: 'ReadOnly', accountNames: ['root'] },
        { name: 'group-two', userNames: [], permissionSetName: 'Admin', accountNames: ['root'] },
      ],
    },
  });

  const template = Template.fromStack(stack);

  test('publishes instance, store, group, and permission-set parameters', () => {
    template.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/identity-center/instance-arn',
      Value: 'arn:aws:sso:::instance/ssoins-abcd1234efgh5678',
    });
    template.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/identity-center/instance-id',
      Value: 'ssoins-abcd1234efgh5678',
    });
    template.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/identity-center/store-id',
      Value: 'd-9067abcdef',
    });
    template.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/identity-center/groups/group-one/id',
      Value: { 'Fn::GetAtt': ['groupone', 'GroupId'] },
    });
    template.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/identity-center/groups/group-two/id',
      Value: { 'Fn::GetAtt': ['grouptwo', 'GroupId'] },
    });
    template.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/identity-center/group-names',
      Type: 'StringList',
      Value: 'group-one,group-two',
    });
    template.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/identity-center/permission-sets/ReadOnly/arn',
      Value: { 'Fn::GetAtt': [Match.stringLikeRegexp('ReadOnly'), 'PermissionSetArn'] },
    });
    template.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/identity-center/permission-sets/Admin/arn',
      Value: { 'Fn::GetAtt': [Match.stringLikeRegexp('Admin'), 'PermissionSetArn'] },
    });
    template.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/dlz/identity-center/permission-set-names',
      Type: 'StringList',
      Value: 'ReadOnly,Admin',
    });
  });
});

describe('SSM parameters — empty config', () => {
  const app = new App();
  const pipeline = new CdkExpressPipeline();
  const wave = pipeline.addWave('wave');
  const stage = wave.addStage('stage');
  const stack = new TestStack(app, {
    stage,
    name: { stack: 'test', region: 'eu-west-1' },
    env: { account: '123456789012', region: 'us-east-1' },
  }, {
    ...configBase,
    iamIdentityCenter: {
      id: 'ssoins-abcd1234efgh5678',
      storeId: 'd-9067abcdef',
      arn: 'arn:aws:sso:::instance/ssoins-abcd1234efgh5678',
    },
  });

  const template = Template.fromStack(stack);

  test('skips group-names and permission-set-names manifests', () => {
    const names = Object.values(template.findResources('AWS::SSM::Parameter'))
      .map((r: any) => r.Properties?.Name);
    expect(names).not.toContain('/dlz/identity-center/group-names');
    expect(names).not.toContain('/dlz/identity-center/permission-set-names');
  });
});

describe('IAM Identity Center', () => {

  test('iamIdentityCenter function', () => {
    const app = new App();
    const pipeline = new CdkExpressPipeline();
    const wave = pipeline.addWave('wave');
    const stage = wave.addStage('stage');
    const stack = new TestStack(app, {
      stage,
      name: {
        stack: 'test',
        region: 'eu-west-1',
      },
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    }, {
      ...configBase,
      iamIdentityCenter: {
        id: 'sso-instance-id',
        storeId: 'identity-store-id',
        arn: 'arn:aws:sso:::instance/sso-instance-id',
        users: [
          {
            userName: 'testuser@example.com',
            name: 'Test',
            surname: 'User',
          },
          {
            userName: 'idpuser@example.com',
            name: 'Test2',
            surname: 'User2',
          },
        ],
        permissionSets: [
          {
            name: 'custom-permission-set',
            description: 'Custom Permission Set',
            managedPolicyArns: ['arn:aws:iam::aws:policy/ReadOnlyAccess'],
          },
        ],
        accessGroups: [
          {
            name: 'test-group',
            userNames: ['testuser@example.com', 'idpuser@example.com'],
            permissionSetName: 'custom-permission-set',
            accountNames: ['root'],
            description: 'Test Group',
          },
        ],
      },
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::SSO::PermissionSet', {
      Name: 'custom-permission-set',
      Description: 'Custom Permission Set',
      ManagedPolicies: ['arn:aws:iam::aws:policy/ReadOnlyAccess'],
      InstanceArn: 'arn:aws:sso:::instance/sso-instance-id',
    });

    template.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      userName: 'testuser@example.com',
      name: {
        formatted: 'Test User',
        familyName: 'User',
        givenName: 'Test',

      },
      displayName: 'Test User',
      email: {
        value: 'testuser@example.com',
        type: 'work',
      },
      identityStoreId: 'identity-store-id',
    });

    template.hasResourceProperties('AWS::IdentityStore::Group', {
      IdentityStoreId: 'identity-store-id',
      DisplayName: 'test-group',
      Description: 'Test Group',
    });

    template.hasResourceProperties('AWS::SSO::Assignment', {
      InstanceArn: 'arn:aws:sso:::instance/sso-instance-id',
      PermissionSetArn: {
        'Fn::GetAtt': [
          'dlztestcustompermissionset',
          'PermissionSetArn',
        ],
      },
      PrincipalId: {
        'Fn::GetAtt': [
          'testgroup',
          'GroupId',
        ],
      },
      PrincipalType: 'GROUP',
      TargetId: '882070149987',
      TargetType: 'AWS_ACCOUNT',
    });

    template.hasResourceProperties('AWS::IdentityStore::GroupMembership', {
      GroupId: {
        'Fn::GetAtt': [
          'testgroup',
          'GroupId',
        ],
      },
      IdentityStoreId: 'identity-store-id',
      MemberId: {
        UserId: {
          'Fn::GetAtt': [
            Match.stringLikeRegexp('^dlztestawsssousertestuserexamplecomcustomResourceResult([0-9A-Z]+)$'),
            'UserId',
          ],
        },
      },
    });

    template.hasResourceProperties('AWS::IdentityStore::GroupMembership', {
      GroupId: {
        'Fn::GetAtt': [
          'testgroup',
          'GroupId',
        ],
      },
      IdentityStoreId: 'identity-store-id',
      MemberId: {
        UserId: {
          'Fn::GetAtt': [
            Match.stringLikeRegexp('^dlztestawsssouseridpuserexamplecomcustomResourceResult([0-9A-Z]+)$'),
            'UserId',
          ],
        },
      },
    });
  });
});

describe('Users', () => {
  beforeEach(() => {
    mockSend.mockReset();
  });

  test('Creates the identity users correctly', async () => {
    const event: CloudFormationCustomResourceCreateEvent = {
      RequestType: 'Create',
      ServiceToken: 'testServiceToken',
      ResourceType: 'Custom::DlzIdentityStoreUser',
      ResourceProperties: {
        userName: 'testUser',
        identityStoreId: 'testStoreId',
        name: {
          formatted: 'Test User',
          givenName: 'Test',
          familyName: 'User',
          middleName: '',
          honorificPrefix: '',
          honorificSuffix: '',
        },
        displayName: 'Test User',
        email: {
          value: 'test@example.com',
          type: 'work',
        },
        ServiceToken: 'testServiceToken',
      },
      StackId: 'testStackId',
      RequestId: 'testRequestId',
      LogicalResourceId: 'testLogicalResourceId',
      ResponseURL: '',
    };

    mockSend.mockResolvedValue({ UserId: 'testUserId' });

    const response = await handler(event);

    expect(mockSend).toHaveBeenCalledWith(expect.any(CreateUserCommand));
    expect(response.Status).toBe('SUCCESS');
    expect(response.PhysicalResourceId).toBe('testUserId');
  });

  test('Update User', async () => {
    const event: CloudFormationCustomResourceUpdateEvent = {
      RequestType: 'Update',
      ServiceToken: 'testServiceToken',
      ResourceType: 'Custom::DlzIdentityStoreUser',
      ResourceProperties: {

        userName: 'updatedUser',
        identityStoreId: 'testStoreId',
        name: {
          formatted: 'Updated User',
          givenName: 'Updated',
          familyName: 'User',
          middleName: '',
          honorificPrefix: '',
          honorificSuffix: '',
        },
        displayName: 'Updated User',
        email: {
          value: 'updated@example.com',
          type: 'work',
        },
        ServiceToken: 'testServiceToken',
      },
      OldResourceProperties: {
        userName: 'oldUser',
        identityStoreId: 'testStoreId',
        ServiceToken: 'testServiceToken',
        name: {
          formatted: 'Old User',
          givenName: 'Old',
          familyName: 'User',
          middleName: '',
          honorificPrefix: '',
          honorificSuffix: '',
        },
        displayName: 'Old User',
        email: {
          value: 'old@example.com',
          type: 'work',
        },
      },
      PhysicalResourceId: 'testUserId',
      StackId: 'testStackId',
      RequestId: 'testRequestId',
      LogicalResourceId: 'testLogicalResourceId',
      ResponseURL: '',
    };

    mockSend
      .mockResolvedValueOnce({
        UserId: 'testUserId',
        DisplayName: 'Old User',
        UserName: 'oldUser',
        Name: {
          GivenName: 'Old',
          FamilyName: 'User',
          MiddleName: '',
          Formatted: 'Old User',
          HonorificPrefix: '',
          HonorificSuffix: '',
        },
        Emails: [{ Value: 'old@example.com', Type: 'work', Primary: true }],
      })
      .mockResolvedValueOnce({});

    const response = await handler(event);

    expect(mockSend).toHaveBeenCalledWith(expect.any(DescribeUserCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(UpdateUserCommand));
    expect(response.Status).toBe('SUCCESS');
    expect(response.PhysicalResourceId).toBe('testUserId');
  });

  test('Delete User', async () => {
    const event: CloudFormationCustomResourceDeleteEvent = {
      RequestType: 'Delete',
      ServiceToken: 'testServiceToken',
      ResourceType: 'Custom::DlzIdentityStoreUser',
      ResourceProperties: {
        ServiceToken: 'testServiceToken',
        identityStoreId: 'testStoreId',
      },
      PhysicalResourceId: 'testUserId',
      StackId: 'testStackId',
      RequestId: 'testRequestId',
      LogicalResourceId: 'testLogicalResourceId',
      ResponseURL: '',
    };

    mockSend.mockResolvedValue({});

    const response = await handler(event);

    expect(mockSend).toHaveBeenCalledWith(expect.any(DeleteUserCommand));
    expect(response.Status).toBe('SUCCESS');
    expect(response.PhysicalResourceId).toBe('testUserId');
  });
});