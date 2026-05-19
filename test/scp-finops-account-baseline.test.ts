import { ScpFinOpsAccountBaseline } from '../src/constructs/organization-policies/scp-presets/finops-account-baseline';

const CT_ROLE = 'arn:aws:iam::*:role/AWSControlTowerExecution';

describe('ScpFinOpsAccountBaseline', () => {
  test('emits the four expected statement Sids', () => {
    const sids = ScpFinOpsAccountBaseline.statements().map(s => s.toJSON().Sid);
    expect(sids).toEqual([
      'FinOpsDenyServices',
      'FinOpsDenyNetworkPrimitives',
      'FinOpsDenyIamUserCreation',
      'FinOpsDenyOrgIntegrity',
    ]);
  });

  test('every statement excludes the Control Tower execution role', () => {
    for (const statement of ScpFinOpsAccountBaseline.statements()) {
      const json = statement.toJSON();
      expect(json.Effect).toBe('Deny');
      expect(json.Condition?.ArnNotLike?.['aws:PrincipalARN']).toContain(CT_ROLE);
    }
  });

  test('default deniedServices covers compute, data, ML, and orchestration categories', () => {
    const services = ScpFinOpsAccountBaseline.DEFAULT_DENIED_SERVICES;
    // Spot-check categories — full enumeration would just shadow the source.
    expect(services).toEqual(expect.arrayContaining([
      'ec2:RunInstances',
      'rds:*',
      'sagemaker:*',
      'bedrock:*',
      'eks:*',
      'redshift:*',
      'kinesis:*',
      'states:*',
    ]));
  });

  test('deniedServices override replaces the default list', () => {
    const override = ['custom:Action'];
    const statements = ScpFinOpsAccountBaseline.statements({ deniedServices: override });
    const denyServices = statements.find(s => s.toJSON().Sid === 'FinOpsDenyServices');
    expect(denyServices).toBeDefined();
    expect(denyServices!.toJSON().Action).toEqual('custom:Action');
  });

  test('denies network primitives that would let the account act as a workload', () => {
    const json = ScpFinOpsAccountBaseline.denyNetworkPrimitives().toJSON();
    expect(json.Action as string[]).toEqual(expect.arrayContaining([
      'ec2:CreateVpc',
      'ec2:CreateInternetGateway',
      'ec2:CreateNatGateway',
      'ec2:CreateTransitGateway',
      'ec2:CreateVpcPeeringConnection',
    ]));
  });

  test('denies IAM user / access-key / login-profile creation', () => {
    const json = ScpFinOpsAccountBaseline.denyIamUserCreation().toJSON();
    expect(json.Action as string[]).toEqual(expect.arrayContaining([
      'iam:CreateUser',
      'iam:CreateAccessKey',
      'iam:CreateLoginProfile',
    ]));
  });

  test('denies actions that would break org-level governance', () => {
    const json = ScpFinOpsAccountBaseline.denyOrgIntegrityActions().toJSON();
    expect(json.Action as string[]).toEqual(expect.arrayContaining([
      'organizations:LeaveOrganization',
      'cloudtrail:DeleteTrail',
      'cloudtrail:StopLogging',
      'guardduty:DeleteDetector',
      'macie2:DisableMacie',
      'config:DeleteConfigurationRecorder',
    ]));
  });
});
