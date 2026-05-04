import * as iam from 'aws-cdk-lib/aws-iam';
import { ScpMerge } from '../src/constructs/organization-policies/scp-merge';
import {
  ScpDenyActionsOutsideRegions,
  ScpDenyBackupVaultLock,
  ScpDenyBedrockProvisionedThroughput,
  ScpDenyCfnStacksWithoutStandardTags,
  ScpDenyDedicatedInfraAndSubscriptions,
  ScpDenyDisablingSecurityServices,
  ScpDenyDomainRegistrations,
  ScpDenyGlacierVaultLock,
  ScpDenyIamWithoutPermissionsBoundary,
  ScpDenyLeavingOrganization,
  ScpDenyMarketplaceSubscriptions,
  ScpDenyReservedCapacityPurchases,
  ScpDenyRootCredentialsManagementInMemberAccounts,
  ScpDenyRootUserActions,
  ScpDenyS3ObjectLockAndRetention,
  ScpDenyS3PublicAccessBypass,
  ScpDenySavingsPlanPurchases,
  ScpDenyServiceActions,
} from '../src/constructs/organization-policies/scp-presets';

const CT_ROLE = 'arn:aws:iam::*:role/AWSControlTowerExecution';

interface PresetCase {
  readonly name: string;
  readonly statement: iam.PolicyStatement;
  readonly sid: string;
  readonly sampleActions: string[];
  readonly excludesControlTower: boolean;
}

const cases: PresetCase[] = [
  {
    name: 'ScpDenyReservedCapacityPurchases',
    statement: ScpDenyReservedCapacityPurchases.statement(),
    sid: 'DenyReservedCapacityPurchases',
    sampleActions: ['ec2:PurchaseReservedInstancesOffering', 'rds:PurchaseReservedDBInstancesOffering'],
    excludesControlTower: true,
  },
  {
    name: 'ScpDenySavingsPlanPurchases',
    statement: ScpDenySavingsPlanPurchases.statement(),
    sid: 'DenySavingsPlanPurchases',
    sampleActions: ['savingsplans:CreateSavingsPlan'],
    excludesControlTower: true,
  },
  {
    name: 'ScpDenyMarketplaceSubscriptions',
    statement: ScpDenyMarketplaceSubscriptions.statement(),
    sid: 'DenyMarketplaceSubscriptions',
    sampleActions: ['aws-marketplace:Subscribe', 'aws-marketplace:AcceptAgreementApprovalRequest'],
    excludesControlTower: true,
  },
  {
    name: 'ScpDenyDomainRegistrations',
    statement: ScpDenyDomainRegistrations.statement(),
    sid: 'DenyDomainRegistrations',
    sampleActions: ['route53domains:RegisterDomain', 'route53domains:RenewDomain'],
    excludesControlTower: true,
  },
  {
    name: 'ScpDenyBedrockProvisionedThroughput',
    statement: ScpDenyBedrockProvisionedThroughput.statement(),
    sid: 'DenyBedrockProvisionedThroughput',
    sampleActions: ['bedrock:CreateProvisionedModelThroughput', 'bedrock:UpdateProvisionedModelThroughput'],
    excludesControlTower: true,
  },
  {
    name: 'ScpDenyDedicatedInfraAndSubscriptions',
    statement: ScpDenyDedicatedInfraAndSubscriptions.statement(),
    sid: 'DenyDedicatedInfraAndSubscriptions',
    sampleActions: ['outposts:CreateOutpost', 'snowball:CreateCluster', 'shield:CreateSubscription', 'acm-pca:CreateCertificateAuthority'],
    excludesControlTower: true,
  },
  {
    name: 'ScpDenyS3ObjectLockAndRetention',
    statement: ScpDenyS3ObjectLockAndRetention.statement(),
    sid: 'DenyS3ObjectLockAndRetention',
    sampleActions: ['s3:PutObjectRetention', 's3:BypassGovernanceRetention', 's3:PutBucketObjectLockConfiguration'],
    excludesControlTower: true,
  },
  {
    name: 'ScpDenyGlacierVaultLock',
    statement: ScpDenyGlacierVaultLock.statement(),
    sid: 'DenyGlacierVaultLock',
    sampleActions: ['glacier:InitiateVaultLock', 'glacier:CompleteVaultLock'],
    excludesControlTower: true,
  },
  {
    name: 'ScpDenyBackupVaultLock',
    statement: ScpDenyBackupVaultLock.statement(),
    sid: 'DenyBackupVaultLock',
    sampleActions: ['backup:PutBackupVaultLockConfiguration'],
    excludesControlTower: true,
  },
  {
    name: 'ScpDenyLeavingOrganization',
    statement: ScpDenyLeavingOrganization.statement(),
    sid: 'DenyLeavingOrganization',
    sampleActions: ['organizations:LeaveOrganization'],
    excludesControlTower: true,
  },
  {
    name: 'ScpDenyDisablingSecurityServices',
    statement: ScpDenyDisablingSecurityServices.statement(),
    sid: 'DenyDisablingSecurityServices',
    sampleActions: ['cloudtrail:StopLogging', 'guardduty:DeleteDetector', 'macie2:DisableMacie'],
    excludesControlTower: true,
  },
  {
    name: 'ScpDenyS3PublicAccessBypass',
    statement: ScpDenyS3PublicAccessBypass.statement(),
    sid: 'DenyS3PublicAccessBypass',
    sampleActions: ['s3:PutAccountPublicAccessBlock', 's3:DeleteBucketPublicAccessBlock'],
    excludesControlTower: true,
  },
  {
    name: 'ScpDenyRootUserActions',
    statement: ScpDenyRootUserActions.statement(),
    sid: 'DenyRootUserActions',
    sampleActions: ['*'],
    excludesControlTower: false,
  },
  {
    name: 'ScpDenyRootCredentialsManagementInMemberAccounts',
    statement: ScpDenyRootCredentialsManagementInMemberAccounts.statement(),
    sid: 'DenyRootCredentialsManagementInMemberAccounts',
    sampleActions: ['*'],
    excludesControlTower: false,
  },
];

describe('SCP presets', () => {
  test.each(cases)('$name has the expected Sid, denies, and sample actions', (c: PresetCase) => {
    const json = c.statement.toJSON();
    expect(json.Sid).toBe(c.sid);
    expect(json.Effect).toBe('Deny');
    const actions = (Array.isArray(json.Action) ? json.Action : [json.Action]) as string[];
    expect(actions).toEqual(expect.arrayContaining(c.sampleActions));
    if (c.excludesControlTower) {
      expect(json.Condition?.ArnNotLike?.['aws:PrincipalARN']).toContain(CT_ROLE);
    }
  });

  test('ScpDenyServiceActions returns the supplied service actions and excludes Control Tower', () => {
    const json = ScpDenyServiceActions.statement(['eks:*', 'ecs:*']).toJSON();
    expect(json.Sid).toBe('DenyServiceActions');
    expect(json.Effect).toBe('Deny');
    expect(json.Action).toEqual(['eks:*', 'ecs:*']);
    expect(json.Condition?.ArnNotLike?.['aws:PrincipalARN']).toContain(CT_ROLE);
  });

  test('ScpDenyIamWithoutPermissionsBoundary returns four pinned-boundary statements', () => {
    const statements = ScpDenyIamWithoutPermissionsBoundary.statements();
    expect(statements).toHaveLength(4);
    const sids = statements.map(s => s.toJSON().Sid);
    expect(sids).toEqual([
      'DenyCreatingUserWithoutPermisionBoundary',
      'DenyDeletingPolicy',
      'DenyDeletingPermBoundaryFromAnyUserOrRole',
      'DenyUpdatingPermissionBoundary',
    ]);
    for (const statement of statements) {
      const json = statement.toJSON();
      expect(json.Effect).toBe('Deny');
      expect(json.Condition?.ArnNotLike?.['aws:PrincipalARN']).toContain(CT_ROLE);
    }
  });

  test('ScpDenyCfnStacksWithoutStandardTags emits a Null condition over the supplied tags', () => {
    const json = ScpDenyCfnStacksWithoutStandardTags.statement([
      { name: 'Owner', values: ['team-a'] },
      { name: 'Project', values: undefined },
    ]).toJSON();
    expect(json.Sid).toBe('DenyCfnStacksWithoutStandardTags');
    expect(json.Effect).toBe('Deny');
    expect(json.Action).toBe('cloudformation:CreateStack');
    expect(json.Condition?.Null?.['aws:RequestTag/Owner']).toEqual(['team-a']);
    expect(json.Condition?.Null?.['aws:RequestTag/Project']).toBe(true);
  });

  test('ScpDenyRootCredentialsManagementInMemberAccounts allows AssumedRoot but blocks direct root', () => {
    const json = ScpDenyRootCredentialsManagementInMemberAccounts.statement().toJSON();
    expect(json.Sid).toBe('DenyRootCredentialsManagementInMemberAccounts');
    expect(json.Effect).toBe('Deny');
    expect(json.Action).toBe('*');
    expect(json.Condition?.ArnLike?.['aws:PrincipalArn']).toContain('arn:aws:iam::*:root');
    expect(json.Condition?.Null?.['aws:AssumedRoot']).toBe('true');
  });

  test('ScpDenyActionsOutsideRegions exempts global services and pins to allowed regions', () => {
    const statement = ScpDenyActionsOutsideRegions.statement(['eu-west-1', 'us-east-1']);
    const json = statement.toJSON();
    expect(json.Sid).toBe('DenyActionsOutsideAllowedRegions');
    expect(json.Effect).toBe('Deny');
    expect(json.NotAction as string[]).toEqual(expect.arrayContaining(['iam:*', 'route53:*', 'organizations:*']));
    expect(json.Condition?.StringNotEquals?.['aws:RequestedRegion']).toEqual(['eu-west-1', 'us-east-1']);
    expect(json.Condition?.ArnNotLike?.['aws:PrincipalARN']).toContain(CT_ROLE);
  });

  test('all presets except ScpDenyActionsOutsideRegions compose under the 5120-byte limit', () => {
    const merged = ScpMerge.resolve({
      baseline: [],
      accountExtras: cases.map(c => c.statement),
    });
    expect(() => ScpMerge.validate('any-account', merged, 1)).not.toThrow();
  });

  test('ScpDenyActionsOutsideRegions alone is well under the 5120-byte limit', () => {
    const merged = ScpMerge.resolve({
      baseline: [],
      accountExtras: [ScpDenyActionsOutsideRegions.statement(['eu-west-1', 'us-east-1'])],
    });
    expect(() => ScpMerge.validate('any-account', merged, 1)).not.toThrow();
  });

  test('combining ALL presets exceeds the 5120-byte limit (documented constraint)', () => {
    const merged = ScpMerge.resolve({
      baseline: [],
      accountExtras: [
        ...cases.map(c => c.statement),
        ScpDenyActionsOutsideRegions.statement(['eu-west-1', 'us-east-1']),
      ],
    });
    expect(() => ScpMerge.validate('any-account', merged, 1))
      .toThrow(/SCP body of \d+ bytes.*maximum of 5120/);
  });
});
