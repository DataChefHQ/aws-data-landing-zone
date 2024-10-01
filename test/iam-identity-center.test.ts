import * as path from 'path';
import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { IdentityStoreUser } from '../src/constructs/identity-store-user';
import { DataLandingZoneProps, Region } from '../src/data-landing-zone';
import { ManagementStack } from '../src/stacks/organization/management-stack';

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

describe('ManagementStack', () => {
  beforeEach(() => {
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
            users: ['testuser'],
            permissionSet: 'custom-permission-set',
            accounts: ['dlz:root'],
            description: 'Test Group',
          },
        ],
      },
    });

    const template = Template.fromStack(stack);
    console.log(template.toJSON());

  });
});