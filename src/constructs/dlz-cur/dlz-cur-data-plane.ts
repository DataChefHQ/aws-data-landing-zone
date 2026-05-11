import { Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
import * as glue from 'aws-cdk-lib/aws-glue';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import {
  DLZ_CUR_DEFAULTS,
  DlzCurDataPlaneConfig,
  DlzCurLifecycleConfig,
} from './cur-types';
import { DlzCurAthena } from './dlz-cur-athena';
import { SSM_PARAMETERS_DLZ } from '../../stacks/organization/constants';

export interface DlzCurDataPlaneProps {
  /** Used to scope the bucket policy via aws:SourceAccount / aws:SourceArn. */
  readonly managementAccountId: string;
  readonly destinationRegion: string;
  /** Bucket name is `{prefix}-{accountId}-{region}`. */
  readonly bucketNamePrefix: string;
  /**
   * Optional S3 path segment prepended in front of the export name. BCM's layout
   * is `<bucket>/<destinationPrefix>/<exportName>/{data,metadata}/...`.
   * @default '' (flat layout; data lives directly under <exportName>/)
   */
  readonly destinationPrefix?: string;
  /** Export name — also the inner S3 path segment BCM writes under. */
  readonly exportName: string;
  readonly glueDatabaseName: string;
  readonly dataPlaneConfig?: DlzCurDataPlaneConfig;
}

/**
 * S3 + Glue resources holding and cataloging CUR Parquet data. Lives in the FinOps
 * account; AWS Billing writes directly into the bucket via `bcm-data-exports.amazonaws.com`.
 */
export class DlzCurDataPlane extends Construct {

  public readonly bucket: s3.Bucket;
  public readonly glueDatabase: glue.CfnDatabase;
  public readonly glueCrawler: glue.CfnCrawler;
  public readonly athena?: DlzCurAthena;

  /** Resolved bucket name (string, not a CDK token). */
  public readonly curBucketName: string;
  public readonly curDestinationPrefix: string;
  public readonly curExportName: string;
  /** `<prefix>/<exportName>` or just `<exportName>` when prefix is empty. */
  public readonly curDataPath: string;
  public readonly curDestinationRegion: string;
  public readonly glueDatabaseName: string;

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
    const destinationPrefix = props.destinationPrefix ?? DLZ_CUR_DEFAULTS.destinationPrefix;
    const dataPath = destinationPrefix === '' ? props.exportName : `${destinationPrefix}/${props.exportName}`;
    this.curBucketName = bucketName;
    this.curDestinationPrefix = destinationPrefix;
    this.curExportName = props.exportName;
    this.curDataPath = dataPath;
    this.curDestinationRegion = props.destinationRegion;
    this.glueDatabaseName = props.glueDatabaseName;

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

    // BCM's CreateExport validation reads the bucket policy + ACL before it accepts
    // the export, so PutObject on objects + GetBucket* on the bucket are both required.
    this.bucket.addToResourcePolicy(new iam.PolicyStatement({
      sid: 'EnableAWSDataExportsToWriteToS3',
      effect: iam.Effect.ALLOW,
      principals: [new iam.ServicePrincipal('bcm-data-exports.amazonaws.com')],
      actions: ['s3:PutObject'],
      resources: [this.bucket.arnForObjects('*')],
      conditions: {
        ArnLike: {
          'aws:SourceArn': `arn:aws:bcm-data-exports:${DLZ_CUR_DEFAULTS.exportRegion}:${props.managementAccountId}:export/*`,
        },
        StringEquals: {
          'aws:SourceAccount': props.managementAccountId,
        },
      },
    }));

    this.bucket.addToResourcePolicy(new iam.PolicyStatement({
      sid: 'EnableAWSDataExportsToReadBucketMetadata',
      effect: iam.Effect.ALLOW,
      principals: [new iam.ServicePrincipal('bcm-data-exports.amazonaws.com')],
      actions: ['s3:GetBucketAcl', 's3:GetBucketPolicy'],
      resources: [this.bucket.bucketArn],
      conditions: {
        ArnLike: {
          'aws:SourceArn': `arn:aws:bcm-data-exports:${DLZ_CUR_DEFAULTS.exportRegion}:${props.managementAccountId}:export/*`,
        },
        StringEquals: {
          'aws:SourceAccount': props.managementAccountId,
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

    // Exclude metadata/ + JSON so the crawler doesn't create a second `cur_metadata` table
    // alongside the Parquet data table.
    this.glueCrawler = new glue.CfnCrawler(this, 'cur-glue-crawler', {
      role: crawlerRole.roleArn,
      databaseName: props.glueDatabaseName,
      targets: {
        s3Targets: [{
          path: `s3://${bucketName}/${dataPath}/`,
          exclusions: ['metadata/**', '**.json', '**_$folder$'],
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
          // MergeNewColumns so downstream views survive new optional CUR columns over time.
          Tables: { AddOrUpdateBehavior: 'MergeNewColumns' },
        },
      }),
    });
    this.glueCrawler.addDependency(this.glueDatabase);

    if (dpCfg.athena?.enabled !== false) {
      this.athena = new DlzCurAthena(this, 'athena', {
        accountId: this.synthesizeAccountSuffix(scope),
        region: props.destinationRegion,
        encryption,
        config: dpCfg.athena,
      });
    }

    this.exportSsmParameters();
  }

  /** Publishes data-plane state under `/dlz/finops/cur/` for downstream consumers. */
  private exportSsmParameters() {
    const prefix = SSM_PARAMETERS_DLZ.FINOPS_CUR_PREFIX;
    new ssm.StringParameter(this, 'ssm-glue-database-name', {
      parameterName: `${prefix}glue-database-name`,
      stringValue: this.glueDatabaseName,
      description: 'DLZ FinOps CUR — Glue database name',
    });
    new ssm.StringParameter(this, 'ssm-cur-bucket-name', {
      parameterName: `${prefix}cur-bucket-name`,
      stringValue: this.curBucketName,
      description: 'DLZ FinOps CUR — S3 bucket holding CUR Parquet data',
    });
    new ssm.StringParameter(this, 'ssm-cur-destination-prefix', {
      parameterName: `${prefix}cur-destination-prefix`,
      // SSM rejects empty values; sentinel `(none)` means "no prefix configured".
      stringValue: this.curDestinationPrefix === '' ? '(none)' : this.curDestinationPrefix,
      description: 'DLZ FinOps CUR — optional S3 path prefix (or "(none)" when unset)',
    });
    new ssm.StringParameter(this, 'ssm-cur-export-name', {
      parameterName: `${prefix}cur-export-name`,
      stringValue: this.curExportName,
      description: 'DLZ FinOps CUR — export name (also the inner S3 path segment)',
    });
    new ssm.StringParameter(this, 'ssm-cur-data-path', {
      parameterName: `${prefix}cur-data-path`,
      stringValue: this.curDataPath,
      description: 'DLZ FinOps CUR — relative path inside the bucket where CUR data lives',
    });
    new ssm.StringParameter(this, 'ssm-cur-destination-region', {
      parameterName: `${prefix}destination-region`,
      stringValue: this.curDestinationRegion,
      description: 'DLZ FinOps CUR — region of the CUR bucket',
    });
  }

  private synthesizeAccountSuffix(scope: Construct): string {
    return Stack.of(scope).account;
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
