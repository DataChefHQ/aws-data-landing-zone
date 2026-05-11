import * as iam from 'aws-cdk-lib/aws-iam';
import { ControlTowerExemption } from './control-tower-exemption';

export interface ScpFinOpsAccountBaselineOptions {
  /**
   * Override the default service deny list (defaults to {@link ScpFinOpsAccountBaseline.DEFAULT_DENIED_SERVICES}).
   */
  readonly deniedServices?: string[];
}

/**
 * Hardening baseline for the dedicated FinOps account. Locks the account to its
 * single purpose (CUR data + Glue catalog + Athena) so it can't drift into a
 * workload account or be abused as a privilege hop.
 *
 * Denies: compute/data services, network primitives, IAM user creation, and
 * org-integrity actions (LeaveOrganization, CloseAccount, disabling CloudTrail /
 * GuardDuty / Macie / Config). `AWSControlTowerExecution` is exempted in every
 * statement so Control Tower keeps managing the account.
 */
export class ScpFinOpsAccountBaseline {

  /**
   * Compute / data services denied by default. Lambda is intentionally allowed —
   * CDK custom resources need it; tighten via permission boundaries, not SCPs.
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
