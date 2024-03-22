// import * as assert from 'assert';
import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DataLandingZone, Region } from '../src';

test('Local build and debug', () => {
  const app = new App();
  const dlz = new DataLandingZone(app, {
    localProfile: 'ct-sandbox-exported',
    accounts: {
      management: {
        accountId: '882070149987',
      },
      log: {
        accountId: '730335597466',
      },
      audit: {
        accountId: '851725452335',
      },
    },
    regions: {
      global: Region.EU_WEST_1,
      regional: [Region.US_EAST_1],
    },
  });

  // assert.ok(managementStack);
  const template = Template.fromStack(dlz.managementStack);


  template.hasResource('AWS::SNS::Topic', { });
  console.log(dlz.managementTopic.topicName);
});

