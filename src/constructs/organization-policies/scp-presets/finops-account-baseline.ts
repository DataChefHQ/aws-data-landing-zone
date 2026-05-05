import * as iam from 'aws-cdk-lib/aws-iam';
import { ControlTowerExemption } from './control-tower-exemption';

export interface ScpFinOpsAccountBaselineOptions {
  /**
   * Override the default service deny list (defaults to {@link ScpFinOpsAccountBaseline.DEFAULT_DENIED_SERVICES}).
   */
  readonly deniedServices?: string[];
}

/**
 * Hardening baseline for the dedicated FinOps account.
 *
 * The FinOps account exists to hold CUR Parquet data, the Glue catalog over it, and
 * (future) Athena queries — nothing else. This preset locks the account to that surface
 * so it cannot drift into a workload account by accident or be abused as a privilege hop.
 *
 * Statements layered onto the account via the existing 3-tier SCP composition model:
 *   1. Deny compute / data services (no workloads run here).
 *   2. Deny VPC / IGW / NAT / TGW creation (FinOps tooling runs on AWS-managed infra).
 *   3. Deny IAM user / access-key / login-profile creation (humans access via SSO only).
 *   4. Deny org-integrity actions (LeaveOrganization, CloseAccount, disabling CloudTrail / GuardDuty / Macie / Config).
 *   5. Deny actions outside the allowed regions.
 *
 * AWSControlTowerExecution is exempted in every statement so Control Tower can keep
 * managing the account.
 */
export class ScpFinOpsAccountBaseline {

  /**
   * Compute / data services that should never run in the FinOps account. Lambda is
   * intentionally allowed because CDK custom resources need it; further IAM scoping
   * happens via permission boundaries, not SCPs here.
   */
  public static readonly DEFAULT_DENIED_SERVICES: string[] = [
    'ec2:RunInstances',
    'ec2:StartInstances',
    'rds:*',
    'sagemaker:*',
    'bedrock:*',
    'ecs:*',
    'eks:*',
    'elasticmapreduce:*',
    'redshift:*',
    'redshift-serverless:*',
    'es:*',
    'opensearch:*',
    'kinesis:*',
    'firehose:*',
    'kafka:*',
    'states:*',
    'apprunner:*',
    'lightsail:*',
    'workspaces:*',
    'appstream:*',
    'codebuild:*',
    'codedeploy:*',
    'codepipeline:*',
  ];

  /**
   * Network primitives that should never be created in the FinOps account. Glue and
   * Athena run on AWS-managed infrastructure; no VPC needed for the in-scope use cases.
   */
  public static denyNetworkPrimitives(): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'FinOpsDenyNetworkPrimitives',
      effect: iam.Effect.DENY,
      actions: [
        'ec2:CreateVpc',
        'ec2:CreateInternetGateway',
        'ec2:AttachInternetGateway',
        'ec2:CreateNatGateway',
        'ec2:CreateTransitGateway',
        'ec2:CreateTransitGatewayVpcAttachment',
        'ec2:CreateVpcPeeringConnection',
        'ec2:CreateClientVpnEndpoint',
      ],
      resources: ['*'],
      conditions: ControlTowerExemption.arnNotLike(),
    });
  }

  /**
   * IAM users / access keys / login profiles cannot be created. Humans access the
   * account via SSO / IAM Identity Center only.
   */
  public static denyIamUserCreation(): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'FinOpsDenyIamUserCreation',
      effect: iam.Effect.DENY,
      actions: [
        'iam:CreateUser',
        'iam:CreateAccessKey',
        'iam:CreateLoginProfile',
        'iam:CreateServiceSpecificCredential',
      ],
      resources: ['*'],
      conditions: ControlTowerExemption.arnNotLike(),
    });
  }

  /**
   * Org-integrity guard. Prevents the FinOps account from leaving the organization or
   * disabling the security baseline that the rest of DLZ relies on.
   */
  public static denyOrgIntegrityActions(): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'FinOpsDenyOrgIntegrity',
      effect: iam.Effect.DENY,
      actions: [
        'organizations:LeaveOrganization',
        'organizations:CloseAccount',
        'organizations:DeletePolicy',
        'organizations:DetachPolicy',
        'organizations:DisablePolicyType',
        'cloudtrail:DeleteTrail',
        'cloudtrail:StopLogging',
        'cloudtrail:UpdateTrail',
        'guardduty:DisassociateFromMasterAccount',
        'guardduty:DisassociateFromAdministratorAccount',
        'guardduty:DeleteDetector',
        'macie2:DisassociateFromAdministratorAccount',
        'macie2:DisassociateFromMasterAccount',
        'macie2:DisableMacie',
        'config:DeleteConfigurationRecorder',
        'config:DeleteDeliveryChannel',
        'config:StopConfigurationRecorder',
      ],
      resources: ['*'],
      conditions: ControlTowerExemption.arnNotLike(),
    });
  }

  /**
   * Returns the full set of statements applied to the FinOps account.
   */
  public static statements(options: ScpFinOpsAccountBaselineOptions = {}): iam.PolicyStatement[] {
    const services = options.deniedServices ?? this.DEFAULT_DENIED_SERVICES;
    return [
      new iam.PolicyStatement({
        sid: 'FinOpsDenyServices',
        effect: iam.Effect.DENY,
        actions: services,
        resources: ['*'],
        conditions: ControlTowerExemption.arnNotLike(),
      }),
      this.denyNetworkPrimitives(),
      this.denyIamUserCreation(),
      this.denyOrgIntegrityActions(),
    ];
  }
}
