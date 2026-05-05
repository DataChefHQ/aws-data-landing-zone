import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import * as glue from 'aws-cdk-lib/aws-glue';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import {
  DLZ_CUR_DEFAULTS,
  DlzCurDataPlaneConfig,
  DlzCurLifecycleConfig,
} from './cur-types';

export interface DlzCurDataPlaneProps {
  /** Account ID hosting the management/payer account — used to scope the bucket policy. */
  readonly managementAccountId: string;

  /** Export name — used to derive the BCM Data Exports `aws:SourceArn` condition. */
  readonly exportName: string;

  /** Region the CUR S3 bucket lives in. The Glue crawler is auto-pinned to this region. */
  readonly destinationRegion: string;

  /** Bucket-name prefix; full name is `{prefix}-{accountId}-{region}`. */
  readonly bucketNamePrefix: string;

  /** S3 prefix under which CUR files are written. */
  readonly destinationPrefix: string;

  /** Glue database name. */
  readonly glueDatabaseName: string;

  /** Data-plane (S3 + Glue) tuning. */
  readonly dataPlaneConfig?: DlzCurDataPlaneConfig;
}

/**
 * S3 + Glue resources that hold and catalog the CUR Parquet data. Lives in the FinOps
 * account (or whatever account `org.ous.sharedServices.accounts.finOps.accountId` points to).
 *
 * AWS Billing writes Parquet files directly into the bucket on the export schedule. There
 * is no DLZ-managed copy job — the bucket policy grants `billingreports.amazonaws.com`
 * scoped to the management account + the specific export ARN.
 */
export class DlzCurDataPlane extends Construct {

  public readonly bucket: s3.Bucket;
  public readonly glueDatabase: glue.CfnDatabase;
  public readonly glueCrawler: glue.CfnCrawler;

  constructor(scope: Construct, id: string, props: DlzCurDataPlaneProps) {
    super(scope, id);

    const dpCfg = props.dataPlaneConfig ?? {};
    const lifecycleCfg = dpCfg.lifecycle ?? {};
    const lifecycleEnabled = lifecycleCfg.enabled ?? true;

    if (!lifecycleEnabled) {
      // eslint-disable-next-line no-console
      console.warn(
        '[DlzCurDataPlane] WARNING: lifecycle.enabled=false — no S3 transitions or expirations will be applied. ' +
        'This is intended for testing/sandbox only. Do not ship this to production.',
      );
    }

    const bucketName = `${props.bucketNamePrefix}-${this.synthesizeAccountSuffix(scope)}-${props.destinationRegion}`;

    const encryption = this.resolveEncryption(dpCfg);

    this.bucket = new s3.Bucket(this, 'cur-bucket', {
      bucketName,
      versioned: dpCfg.versioning ?? true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      encryption: encryption.kind,
      encryptionKey: encryption.key,
      removalPolicy: RemovalPolicy.RETAIN,
      lifecycleRules: lifecycleEnabled ? this.lifecycleRules(lifecycleCfg) : [],
    });

    this.bucket.addToResourcePolicy(new iam.PolicyStatement({
      sid: 'AllowBillingReportsCurDelivery',
      effect: iam.Effect.ALLOW,
      principals: [new iam.ServicePrincipal('billingreports.amazonaws.com')],
      actions: ['s3:PutObject', 's3:GetBucketAcl', 's3:GetBucketPolicy'],
      resources: [this.bucket.bucketArn, this.bucket.arnForObjects('*')],
      conditions: {
        StringEquals: {
          'aws:SourceAccount': props.managementAccountId,
          'aws:SourceArn': this.exportArn(props.managementAccountId, props.exportName),
        },
      },
    }));

    for (const accountId of dpCfg.additionalReadAccountIds ?? []) {
      this.bucket.addToResourcePolicy(new iam.PolicyStatement({
        sid: `AllowReadFromAccount${accountId}`,
        effect: iam.Effect.ALLOW,
        principals: [new iam.AccountPrincipal(accountId)],
        actions: ['s3:GetObject', 's3:ListBucket'],
        resources: [this.bucket.bucketArn, this.bucket.arnForObjects('*')],
      }));
    }

    this.glueDatabase = new glue.CfnDatabase(this, 'cur-glue-db', {
      catalogId: this.synthesizeAccountSuffix(scope),
      databaseInput: {
        name: props.glueDatabaseName,
        description: 'DLZ Cost and Usage Report 2.0 — Parquet data catalog',
      },
    });

    const crawlerRole = new iam.Role(this, 'cur-glue-crawler-role', {
      assumedBy: new iam.ServicePrincipal('glue.amazonaws.com'),
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSGlueServiceRole')],
    });
    this.bucket.grantRead(crawlerRole);

    this.glueCrawler = new glue.CfnCrawler(this, 'cur-glue-crawler', {
      role: crawlerRole.roleArn,
      databaseName: props.glueDatabaseName,
      targets: {
        s3Targets: [{
          path: `s3://${this.bucket.bucketName}/${props.destinationPrefix}/`,
        }],
      },
      schedule: {
        scheduleExpression: dpCfg.glueCrawlerSchedule ?? DLZ_CUR_DEFAULTS.glueCrawlerSchedule,
      },
      tablePrefix: 'cur_',
      configuration: JSON.stringify({
        Version: 1.0,
        CrawlerOutput: {
          Partitions: { AddOrUpdateBehavior: 'InheritFromTable' },
        },
      }),
    });
    this.glueCrawler.addDependency(this.glueDatabase);
  }

  private synthesizeAccountSuffix(scope: Construct): string {
    // CDK's account token resolves at deploy time; the bucket-name suffix needs a
    // synth-time string. Walking up to the stack lets us read the account from the env.
    const stack = scope.node.scopes.find(s => 'account' in (s as any))?.node.scope as any;
    return (stack?.account ?? scope.node.tryGetContext('finopsAccountId') ?? 'unknown').toString();
  }

  private exportArn(managementAccountId: string, exportName: string): string {
    return `arn:aws:bcm-data-exports:${DLZ_CUR_DEFAULTS.exportRegion}:${managementAccountId}:export/${exportName}`;
  }

  private lifecycleRules(cfg: DlzCurLifecycleConfig): s3.LifecycleRule[] {
    const transitions: s3.Transition[] = [
      {
        storageClass: s3.StorageClass.INFREQUENT_ACCESS,
        transitionAfter: Duration.days(cfg.transitionToInfrequentAccessDays ?? DLZ_CUR_DEFAULTS.lifecycle.transitionToInfrequentAccessDays),
      },
      {
        storageClass: s3.StorageClass.GLACIER_INSTANT_RETRIEVAL,
        transitionAfter: Duration.days(cfg.transitionToGlacierDays ?? DLZ_CUR_DEFAULTS.lifecycle.transitionToGlacierDays),
      },
    ];

    const expirationDays = cfg.expirationDays ?? DLZ_CUR_DEFAULTS.lifecycle.expirationDays;
    let expiration: Duration | undefined;
    if (expirationDays > 0) {
      if (expirationDays < DLZ_CUR_DEFAULTS.lifecycle.minExpirationDays) {
        throw new Error(
          `lifecycle.expirationDays must be 0 (disabled) or >= ${DLZ_CUR_DEFAULTS.lifecycle.minExpirationDays} ` +
          `(13 months for YoY comparisons). Got ${expirationDays}.`,
        );
      }
      expiration = Duration.days(expirationDays);
    }

    return [{
      id: 'dlz-cur-lifecycle',
      enabled: true,
      transitions,
      expiration,
    }];
  }

  private resolveEncryption(cfg: DlzCurDataPlaneConfig): { kind: s3.BucketEncryption; key?: kms.IKey } {
    const kmsKeyArn = cfg.encryption?.kmsKeyArn;
    if (!kmsKeyArn) {
      return { kind: s3.BucketEncryption.S3_MANAGED };
    }
    return {
      kind: s3.BucketEncryption.KMS,
      key: kms.Key.fromKeyArn(this, 'cur-bucket-key', kmsKeyArn),
    };
  }
}
