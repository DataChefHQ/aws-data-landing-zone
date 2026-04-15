import { App, Stack } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import {
  mapFeaturesToCfn,
  mergeFeatures,
  DlzGuardDutyFeaturesProps,
  GuardDutyDelegatedAdmin,
  GuardDutyMemberFeatures,
  GuardDutyOrgConfig,
} from '../../../src/constructs/dlz-guardduty';

describe('mapFeaturesToCfn', () => {
  test('all features disabled returns all DISABLED with correct CFN names', () => {
    const features: DlzGuardDutyFeaturesProps = {};
    const result = mapFeaturesToCfn(features);

    expect(result).toEqual([
      { name: 'S3_DATA_EVENTS', status: 'DISABLED' },
      { name: 'EKS_AUDIT_LOGS', status: 'DISABLED' },
      { name: 'EBS_MALWARE_PROTECTION', status: 'DISABLED' },
      { name: 'RDS_LOGIN_EVENTS', status: 'DISABLED' },
      { name: 'LAMBDA_NETWORK_LOGS', status: 'DISABLED' },
      { name: 'RUNTIME_MONITORING', status: 'DISABLED' },
    ]);
  });

  test('mixed features maps correctly', () => {
    const features: DlzGuardDutyFeaturesProps = {
      s3DataEvents: true,
      runtimeMonitoring: true,
    };
    const result = mapFeaturesToCfn(features);

    expect(result).toEqual(
      expect.arrayContaining([
        { name: 'S3_DATA_EVENTS', status: 'ENABLED' },
        { name: 'RUNTIME_MONITORING', status: 'ENABLED' },
        { name: 'EKS_AUDIT_LOGS', status: 'DISABLED' },
        { name: 'EBS_MALWARE_PROTECTION', status: 'DISABLED' },
        { name: 'RDS_LOGIN_EVENTS', status: 'DISABLED' },
        { name: 'LAMBDA_NETWORK_LOGS', status: 'DISABLED' },
      ]),
    );
  });

  test('all features enabled returns all ENABLED', () => {
    const features: DlzGuardDutyFeaturesProps = {
      s3DataEvents: true,
      eksAuditLogs: true,
      ebsMalwareProtection: true,
      rdsLoginEvents: true,
      lambdaNetworkLogs: true,
      runtimeMonitoring: true,
    };
    const result = mapFeaturesToCfn(features);

    for (const entry of result) {
      expect(entry.status).toBe('ENABLED');
    }
    expect(result).toHaveLength(6);
  });
});

describe('mergeFeatures', () => {
  test('both empty returns all falsy', () => {
    const result = mergeFeatures({}, {});

    expect(result.s3DataEvents).toBeFalsy();
    expect(result.eksAuditLogs).toBeFalsy();
    expect(result.ebsMalwareProtection).toBeFalsy();
    expect(result.rdsLoginEvents).toBeFalsy();
    expect(result.lambdaNetworkLogs).toBeFalsy();
    expect(result.runtimeMonitoring).toBeFalsy();
  });

  test('baseline features preserved when override is empty', () => {
    const baseline: DlzGuardDutyFeaturesProps = {
      s3DataEvents: true,
      eksAuditLogs: true,
    };
    const result = mergeFeatures(baseline, {});

    expect(result.s3DataEvents).toBeTruthy();
    expect(result.eksAuditLogs).toBeTruthy();
    expect(result.ebsMalwareProtection).toBeFalsy();
  });

  test('override adds features on top of baseline (OR logic)', () => {
    const baseline: DlzGuardDutyFeaturesProps = {
      s3DataEvents: true,
    };
    const override: DlzGuardDutyFeaturesProps = {
      runtimeMonitoring: true,
    };
    const result = mergeFeatures(baseline, override);

    expect(result.s3DataEvents).toBeTruthy();
    expect(result.runtimeMonitoring).toBeTruthy();
    expect(result.eksAuditLogs).toBeFalsy();
  });
});

describe('GuardDutyDelegatedAdmin construct', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');
  new GuardDutyDelegatedAdmin(stack, 'TestAdmin', {
    managementAccountId: '999888777666',
    auditAccountId: '123456789012',
  });
  const template = Template.fromStack(stack);

  test('creates the custom resource with auditAccountId', () => {
    template.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      auditAccountId: '123456789012',
    });
  });

});

describe('GuardDutyOrgConfig construct', () => {
  test('creates custom resource with autoEnableOrgMembers and serialized features', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    new GuardDutyOrgConfig(stack, 'TestOrgConfig', {
      autoEnableOrgMembers: 'NEW',
      features: [
        { name: 'S3_DATA_EVENTS', status: 'ENABLED' },
        { name: 'EKS_AUDIT_LOGS', status: 'DISABLED' },
      ],
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      autoEnableOrgMembers: 'NEW',
      features: Match.stringLikeRegexp('"S3_DATA_EVENTS"'),
    });
  });

  test('features payload maps autoEnable based on status and autoEnableOrgMembers', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    new GuardDutyOrgConfig(stack, 'TestOrgConfig', {
      autoEnableOrgMembers: 'ALL',
      features: [
        { name: 'S3_DATA_EVENTS', status: 'ENABLED' },
        { name: 'EKS_AUDIT_LOGS', status: 'DISABLED' },
      ],
    });
    const template = Template.fromStack(stack);

    // Verify the JSON payload contains correct autoEnable mappings
    const resources = template.findResources('AWS::CloudFormation::CustomResource');
    const cr = Object.values(resources).find((r: any) =>
      r.Properties?.autoEnableOrgMembers === 'ALL',
    ) as any;
    const features = JSON.parse(cr.Properties.features);

    expect(features).toEqual([
      { name: 'S3_DATA_EVENTS', status: 'ENABLED', autoEnable: 'ALL' },
      { name: 'EKS_AUDIT_LOGS', status: 'DISABLED', autoEnable: 'NONE' },
    ]);
  });

});

describe('GuardDutyMemberFeatures construct', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');
  new GuardDutyMemberFeatures(stack, 'TestMembers', {
    enrollAccounts: [
      { accountId: '111111111111', email: 'a@example.com' },
      { accountId: '222222222222', email: 'b@example.com' },
    ],
    memberFeatureGroups: [
      {
        accountIds: ['111111111111'],
        features: { s3DataEvents: true, runtimeMonitoring: true },
      },
    ],
  });
  const template = Template.fromStack(stack);

  test('serializes enrollAccounts in properties', () => {
    template.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      enrollAccounts: Match.stringLikeRegexp('111111111111'),
    });
  });

  test('serializes memberFeatureGroups with CFN feature format', () => {
    template.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      memberFeatureGroups: Match.stringLikeRegexp('"S3_DATA_EVENTS"'),
    });
  });

  test('omits enrollAccounts, disenrollAccountIds, and memberFeatureGroups when empty', () => {
    const emptyApp = new App();
    const emptyStack = new Stack(emptyApp, 'EmptyStack');
    new GuardDutyMemberFeatures(emptyStack, 'EmptyMembers', {});
    const emptyTemplate = Template.fromStack(emptyStack);

    emptyTemplate.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      enrollAccounts: Match.absent(),
      disenrollAccountIds: Match.absent(),
      memberFeatureGroups: Match.absent(),
    });
  });

  test('serializes disenrollAccountIds in properties', () => {
    const disenrollApp = new App();
    const disenrollStack = new Stack(disenrollApp, 'DisenrollStack');
    new GuardDutyMemberFeatures(disenrollStack, 'DisenrollMembers', {
      disenrollAccountIds: ['333333333333', '444444444444'],
    });
    const disenrollTemplate = Template.fromStack(disenrollStack);

    disenrollTemplate.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      disenrollAccountIds: Match.stringLikeRegexp('333333333333'),
    });
  });

});
