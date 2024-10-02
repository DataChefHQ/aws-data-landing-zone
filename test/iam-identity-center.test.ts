import * as path from 'path';
import {
  IdentitystoreClient,
  CreateUserCommand,
  DeleteUserCommand,
  UpdateUserCommand,
  DescribeUserCommand,
} from '@aws-sdk/client-identitystore';
import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import {
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceUpdateEvent,
  CloudFormationCustomResourceDeleteEvent,
} from 'aws-lambda';
import { IdentityStoreUser } from '../src/constructs/identity-store-user';
import { handler } from '../src/constructs/identity-store-user/lambda';
import { DataLandingZoneProps, Region } from '../src/data-landing-zone';
import { ManagementStack } from '../src/stacks/organization/management-stack';


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
  },
  budgets: [],
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

// Mock sns.Topic to prevent actual AWS resource creation
jest.mock('aws-cdk-lib/aws-sns', () => {
  return {
    Topic: jest.fn().mockImplementation(() => {
      return {
        // Mock methods or properties if needed
      };
    }),
  };
});

describe('ManagementStack', () => {
  beforeEach(() => {
    // Spy on and mock the methods
    jest.spyOn(ManagementStack.prototype as any, 'rootControls').mockImplementation(() => { });

    jest.spyOn(ManagementStack.prototype, 'workloadAccountsOrgPolicies').mockImplementation(() => { });

    jest.spyOn(ManagementStack.prototype, 'suspendedOuPolicies').mockImplementation(() => { });

    jest.spyOn(ManagementStack.prototype, 'budgets').mockImplementation(() => { });

    jest.spyOn(ManagementStack.prototype, 'deploymentPlatformGitHub').mockImplementation(() => { });

    jest.spyOn(IdentityStoreUser, 'fetchCodeDirectory').mockImplementation(() => {
      return path.join(__dirname, '../assets/constructs/identity-store-user/lambda');
    });
  });
  test('iamIdentityCenter function', () => {
    const app = new App();
    const stack = new ManagementStack(app, {
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
        iamIdentityCenterId: 'sso-instance-id',
        identityStoreId: 'identity-store-id',
        awsSsoUsers: [
          {
            userName: 'testuser',
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
          },
        ],
        idpUsers: [
          {
            name: 'idpuser',
            userId: 'idp-user-id',
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
            users: ['testuser', 'idpuser'],
            permissionSet: 'custom-permission-set',
            accounts: ['dlz:root'],
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
      userName: 'testuser',
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
            Match.stringLikeRegexp('^dlztestawsssousertestusercustomResourceResult([0-9]+)$'),
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
        UserId: 'idp-user-id',
      },
    });
  });
});

describe('Lambda Function Tests', () => {
  beforeEach(() => {
    mockSend.mockReset();
  });

  test('Create User', async () => {
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