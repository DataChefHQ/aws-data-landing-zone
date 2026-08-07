import * as iam from 'aws-cdk-lib/aws-iam';
import { ControlTowerExemption } from './control-tower-exemption';
import { DLZ_MANDATORY_TAG_KEYS } from '../../../mandatory-tags';

export interface ScpDenyResourceCreationTagOptions {
  /**
   * Exempt creates that an AWS service makes on your behalf with *forwarded credentials*
   * (e.g. CloudFormation) by adding `aws:ViaAWSService` to each Deny — so only direct
   * console/CLI/SDK/IaC creates are blocked.
   */
  readonly exemptAwsServiceCalls?: boolean;
}

/**
 * Opt-in SCP statements that deny the given create actions unless every mandatory tag is present at creation
 * (`aws:RequestTag`). This covers direct console/CLI/SDK creation, which `ScpDenyCfnStacksWithoutStandardTags`
 * (CloudFormation only) does not. Tag presence is checked, not values; values stay with the tag policy. It is
 * not in the baseline, so add it yourself.
 *
 * `statements()` returns one Deny per tag key on purpose: IAM joins keys in a single `Null` block with AND, so
 * one combined statement would only deny when every tag is absent. Gate only actions that support
 * `aws:RequestTag` at creation. The action-set constants below are composable (spread the ones you want into
 * `statements()`) and were verified against the AWS Service Authorization Reference.
 */
export class ScpDenyResourceCreationWithoutStandardTags {
  public static readonly DEFAULT_TAG_KEYS: string[] = [...DLZ_MANDATORY_TAG_KEYS];

  /** Core compute and data create actions. */
  public static readonly CORE_TAG_ON_CREATE_ACTIONS: string[] = [
    'ec2:RunInstances',
    'ec2:CreateVolume',
    'rds:CreateDBInstance',
    'rds:CreateDBCluster',
    'dynamodb:CreateTable',
    'lambda:CreateFunction',
    'eks:CreateCluster',
    'ecs:CreateCluster',
    'ecs:CreateService',
    'sqs:CreateQueue',
    'sns:CreateTopic',
    'secretsmanager:CreateSecret',
    'kms:CreateKey',
    'elasticloadbalancing:CreateLoadBalancer',
    'redshift:CreateCluster',
  ];

  /** Analytics and ML create actions. OpenSearch uses `es:CreateDomain`; `opensearch:CreateDomain` does not exist. */
  public static readonly DATA_PLATFORM_TAG_ON_CREATE_ACTIONS: string[] = [
    'glue:CreateJob',
    'glue:CreateCrawler',
    'glue:CreateSession',
    'athena:CreateWorkGroup',
    'athena:CreateDataCatalog',
    'elasticmapreduce:RunJobFlow',
    'emr-serverless:CreateApplication',
    'firehose:CreateDeliveryStream',
    'kafka:CreateClusterV2',
    'es:CreateDomain',
    'redshift-serverless:CreateNamespace',
    'redshift-serverless:CreateWorkgroup',
    'states:CreateStateMachine',
    'sagemaker:CreateDomain',
    'sagemaker:CreateNotebookInstance',
    'sagemaker:CreateTrainingJob',
    'sagemaker:CreateEndpoint',
    'sagemaker:CreateModel',
    'bedrock:CreateAgent',
    'bedrock:CreateKnowledgeBase',
    'bedrock:CreateModelCustomizationJob',
  ];

  /**
   * Networking, storage, and compute create actions.
   *
   * Deliberately excludes resources that AWS services auto-create, untagged, at runtime
   * (CloudWatch log groups, EBS/RDS snapshots, default/managed security groups, EIPs,
   * auto-scaling groups). Those calls carry no `aws:RequestTag`, so gating them can't be
   * satisfied and only breaks normal operation (e.g. Lambda logging, backups, EKS scaling).
   * Catch tag gaps on those with AWS Config instead of an SCP.
   */
  public static readonly INFRA_TAG_ON_CREATE_ACTIONS: string[] = [
    'ecr:CreateRepository',
    'elasticfilesystem:CreateFileSystem',
    'elasticache:CreateReplicationGroup',
    'elasticache:CreateCacheCluster',
    'elasticache:CreateServerlessCache',
    'ec2:CreateVpc',
    'ec2:CreateSubnet',
    'ec2:CreateLaunchTemplate',
    'ec2:CreateNatGateway',
    'eks:CreateNodegroup',
    'eks:CreateFargateProfile',
    'rds:CreateDBSubnetGroup',
    'rds:CreateDBParameterGroup',
  ];

  /** IAM create actions. `iam:CreateGroup` is excluded: it carries no tag keys, so gating it would deny all group creation. */
  public static readonly IAM_TAG_ON_CREATE_ACTIONS: string[] = [
    'iam:CreateUser',
    'iam:CreateRole',
    'iam:CreatePolicy',
  ];

  /** One Deny per tag key over `actions`. Tag keys default to {@link DEFAULT_TAG_KEYS}. */
  public static statements(
    actions: string[],
    tagKeys?: string[],
    options?: ScpDenyResourceCreationTagOptions,
  ): iam.PolicyStatement[] {
    const keys = tagKeys ?? ScpDenyResourceCreationWithoutStandardTags.DEFAULT_TAG_KEYS;

    // `BoolIfExists` keeps the deny strict when the key is absent, and only lifts it for
    // genuine service-forwarded calls (`aws:ViaAWSService` = true).
    const viaServiceExemption = options?.exemptAwsServiceCalls
      ? { BoolIfExists: { 'aws:ViaAWSService': 'false' } }
      : {};

    return keys.map((key) => new iam.PolicyStatement({
      sid: `DenyCreateWithout${key.replace(/[^a-zA-Z0-9]/g, '')}Tag`,
      effect: iam.Effect.DENY,
      actions,
      resources: ['*'],
      conditions: {
        ...ControlTowerExemption.arnNotLike(),
        ...viaServiceExemption,
        Null: {
          [`aws:RequestTag/${key}`]: true,
        },
      },
    }));
  }
}
