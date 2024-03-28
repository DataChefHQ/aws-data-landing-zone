// import * as assert from 'assert';
import { App } from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
import { DataLandingZone, Region } from '../src';

test('Local build and debug', () => {
  const app = new App();
  // const dlz = new DataLandingZone(app, {
  new DataLandingZone(app, {
    localProfile: "ct-sandbox-exported",
    regions: {
      global: Region.EU_WEST_1,
      regional: [Region.US_EAST_1],
    },
    organization: {
      organizationId: 'o-05ev6vk6fa',
      rootAccounts: {
        management: {
          accountId: '882070149987',
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
          }
        },
        workloads: {
          ouId: 'ou-vh4d-nc2zzf9z',
          accounts: {
            develop: {
              accountId: '381491899779',
            },
            production: {
              accountId: '891377027267',
            },
          }
        },
        suspended: {
          ouId: 'ou-vh4d-rhcmhzsy',
        }
      }
    }
  });

  // assert.ok(managementStack);
  // const template = Template.fromStack(dlz.managementStack);
  // template.hasResource('AWS::SNS::Topic', { });
});

