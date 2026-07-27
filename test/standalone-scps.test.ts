import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as iam from 'aws-cdk-lib/aws-iam';
import {
  DataLandingZone,
  DataLandingZoneProps,
  DlzAccountType,
  DlzStandaloneScp,
  Region,
} from '../src';

const ACCOUNT = 'wl-dev-a';
const ACCOUNT_ID = '111111111111';

function denyStatement(sid: string, action: string): iam.PolicyStatement {
  return new iam.PolicyStatement({
    sid,
    effect: iam.Effect.DENY,
    actions: [action],
    resources: ['*'],
  });
}

function configWith(
  standaloneScps?: DlzStandaloneScp[],
  ouScps?: DlzStandaloneScp[],
  sharedServicesOuScps?: DlzStandaloneScp[],
): DataLandingZoneProps {
  return {
    localProfile: 'ct-sandbox-exported',
    regions: {
      global: Region.EU_WEST_1,
      regional: [Region.US_EAST_1],
    },
    mandatoryTags: {
      owner: [],
      project: undefined,
      environment: [],
      costCenter: [],
      domain: undefined,
    },
    guardDuty: {
      autoEnableOrgMembers: 'ALL',
    },
    securityHubNotifications: [],
    organization: {
      organizationId: 'o-standalonetest',
      root: {
        accounts: {
          management: { accountId: '999999999999' },
        },
      },
      ous: {
        security: {
          ouId: 'ou-test-security',
          accounts: {
            log: { accountId: '222222222222' },
            audit: { accountId: '333333333333' },
          },
        },
        workloads: {
          ouId: 'ou-test-workloads',
          standaloneScps: ouScps,
          accounts: [
            {
              name: ACCOUNT,
              accountId: ACCOUNT_ID,
              type: DlzAccountType.DEVELOP,
              standaloneScps,
            },
          ],
        },
        suspended: {
          ouId: 'ou-test-suspended',
        },
        ...(sharedServicesOuScps ? {
          sharedServices: {
            ouId: 'ou-test-shared-services',
            accounts: {},
            standaloneScps: sharedServicesOuScps,
          },
        } : {}),
      },
    },
  };
}

describe('DLzAccount.standaloneScps', () => {
  test('emits one dedicated SCP per entry, targeted at the account', () => {
    const app = new App();
    const dlz = new DataLandingZone(app, configWith([
      { nameSuffix: 'extra-a', statements: [denyStatement('DenyA', 's3:DeleteBucket')] },
      { nameSuffix: 'extra-b', statements: [denyStatement('DenyB', 'ec2:TerminateInstances')] },
    ]));

    const template = Template.fromStack(dlz.managementStacks.global);

    // The merged per-account SCP still exists...
    template.hasResourceProperties('AWS::Organizations::Policy', Match.objectLike({
      Type: 'SERVICE_CONTROL_POLICY',
      Name: Match.stringLikeRegexp(`scp-${ACCOUNT}-account$`),
      TargetIds: [ACCOUNT_ID],
    }));
    // ...plus one standalone SCP per entry, each targeted at the account.
    for (const suffix of ['extra-a', 'extra-b']) {
      template.hasResourceProperties('AWS::Organizations::Policy', Match.objectLike({
        Type: 'SERVICE_CONTROL_POLICY',
        Name: Match.stringLikeRegexp(`scp-${ACCOUNT}-${suffix}$`),
        TargetIds: [ACCOUNT_ID],
      }));
    }
  });

  test('emits an OU-level SCP attached to the Workloads OU (not to any account)', () => {
    const app = new App();
    const dlz = new DataLandingZone(app, configWith(undefined, [
      { nameSuffix: 'tag-on-create', statements: [denyStatement('DenyOu', 's3:DeleteBucket')] },
    ]));
    const template = Template.fromStack(dlz.managementStacks.global);
    template.hasResourceProperties('AWS::Organizations::Policy', Match.objectLike({
      Type: 'SERVICE_CONTROL_POLICY',
      Name: Match.stringLikeRegexp('scp-workloads-ou-tag-on-create$'),
      TargetIds: ['ou-test-workloads'],
    }));
  });

  test('emits an OU-level SCP attached to the Shared Services OU (not to any account)', () => {
    const app = new App();
    const dlz = new DataLandingZone(app, configWith(undefined, undefined, [
      { nameSuffix: 'tag-on-create', statements: [denyStatement('DenyShared', 's3:DeleteBucket')] },
    ]));
    const template = Template.fromStack(dlz.managementStacks.global);
    template.hasResourceProperties('AWS::Organizations::Policy', Match.objectLike({
      Type: 'SERVICE_CONTROL_POLICY',
      Name: Match.stringLikeRegexp('scp-shared-services-ou-tag-on-create$'),
      TargetIds: ['ou-test-shared-services'],
    }));
  });

  test('nameSuffix defaults to the entry index when omitted', () => {
    const app = new App();
    const dlz = new DataLandingZone(app, configWith([
      { statements: [denyStatement('DenyA', 's3:DeleteBucket')] },
    ]));
    const template = Template.fromStack(dlz.managementStacks.global);
    template.hasResourceProperties('AWS::Organizations::Policy', Match.objectLike({
      Name: Match.stringLikeRegexp(`scp-${ACCOUNT}-standalone-0$`),
    }));
  });

  test('throws when standalone SCPs would exceed the 10-SCP-per-target limit', () => {
    const app = new App();
    // FullAWSAccess (1) + merged (1) + 9 standalone = 11 > 10.
    const scps = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'].map(s => ({
      nameSuffix: s,
      statements: [denyStatement(`Deny${s}`, 's3:DeleteBucket')],
    }));
    expect(() => new DataLandingZone(app, configWith(scps)))
      .toThrow(/maximum of 10 SCPs per target/);
  });

  test('throws on duplicate nameSuffix', () => {
    const app = new App();
    expect(() => new DataLandingZone(app, configWith([
      { nameSuffix: 'dup', statements: [denyStatement('DenyA', 's3:DeleteBucket')] },
      { nameSuffix: 'dup', statements: [denyStatement('DenyB', 'ec2:TerminateInstances')] },
    ]))).toThrow(/nameSuffix "dup" is duplicated or reserved/);
  });

  test('throws when nameSuffix collides with the reserved merged-SCP suffix "account"', () => {
    const app = new App();
    expect(() => new DataLandingZone(app, configWith([
      { nameSuffix: 'account', statements: [denyStatement('DenyA', 's3:DeleteBucket')] },
    ]))).toThrow(/nameSuffix "account" is duplicated or reserved/);
  });

  test('throws when a single standalone SCP body exceeds 10,240 chars', () => {
    const app = new App();
    // ~500 distinct actions -> well over the 10,240-char body limit for one policy.
    const bigActions = Array.from({ length: 500 }, (_, i) => `service${i}:DoSomethingLongActionName`);
    const oversize = new iam.PolicyStatement({
      sid: 'Oversize',
      effect: iam.Effect.DENY,
      actions: bigActions,
      resources: ['*'],
    });
    expect(() => new DataLandingZone(app, configWith([
      { nameSuffix: 'big', statements: [oversize] },
    ]))).toThrow(/maximum of 10240 bytes per SCP/);
  });
});
