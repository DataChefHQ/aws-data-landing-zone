import { Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
import * as glue from 'aws-cdk-lib/aws-glue';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { buildDataPath } from './data-exports-builders';
import {
  DLZ_DATA_EXPORTS_DEFAULTS,
  DlzDataExportsDataPlaneConfig,
  DlzDataExportEntry,
  DlzDataExportsLifecycleConfig,
  deriveDefaultExportName,
  deriveDefaultGlueTableName,
} from './data-exports-types';
import { DlzDataExportsAthena } from './dlz-data-exports-athena';
import { SSM_PARAMETERS_DLZ } from '../../stacks/organization/constants';

export interface DlzDataExportsDataPlaneProps {
  readonly managementAccountId: string;
  readonly destinationRegion: string;
  readonly bucketNamePrefix: string;
  readonly exports: { readonly [id: string]: DlzDataExportEntry };
  readonly dataPlaneConfig?: DlzDataExportsDataPlaneConfig;
}

interface ResolvedExportPlacement {
  readonly entryId: string;
  readonly entry: DlzDataExportEntry;
  readonly exportName: string;
  readonly destinationPrefix: string;
  readonly dataPath: string;
  readonly glueTableName: string;
}

interface ResolvedEncryption {
  readonly kind: s3.BucketEncryption;
  readonly key?: kms.IKey;
}

/**
 * One shared S3 bucket and one shared Glue database hold every configured export. The
 * crawler uses one `S3Targets` entry per export, producing one table per export in the
 * same database — cheaper than per-export crawlers with no Athena downside.
 */
export class DlzDataExportsDataPlane extends Construct {

  public readonly bucket: s3.Bucket;
  public readonly glueDatabase: glue.CfnDatabase;
  public readonly glueCrawler: glue.CfnCrawler;
  public readonly athena?: DlzDataExportsAthena;

  public readonly curBucketName: string;
  public readonly curDestinationRegion: string;
  public readonly glueDatabaseName: string;

  private readonly accountId: string;
  private readonly managementAccountId: string;
  private readonly resolvedExports: readonly ResolvedExportPlacement[];
  private readonly resolvedEncryption: ResolvedEncryption;
  private readonly glueCrawlerSchedule: string;

  constructor(scope: Construct, id: string, props: DlzDataExportsDataPlaneProps) {
    super(scope, id);

    const dpCfg = props.dataPlaneConfig ?? {};
    const lifecycleCfg = dpCfg.lifecycle ?? {};
    const lifecycleEnabled = lifecycleCfg.enabled ?? true;
    const accountId = Stack.of(scope).account;
    this.accountId = accountId;
    this.managementAccountId = props.managementAccountId;

    if (!lifecycleEnabled) {
      // eslint-disable-next-line no-console
      console.warn(
        '[DlzDataExportsDataPlane] lifecycle.enabled=false — every object stays in S3 Standard forever. Sandbox only.',
      );
    }

    const bucketName = `${props.bucketNamePrefix}-${accountId}-${props.destinationRegion}`;
    const glueDatabaseName = dpCfg.glueDatabaseName ?? DLZ_DATA_EXPORTS_DEFAULTS.glueDatabaseName;
    this.curBucketName = bucketName;
    this.curDestinationRegion = props.destinationRegion;
    this.glueDatabaseName = glueDatabaseName;
    this.resolvedExports = resolvePlacements(props.exports);

    const encryption = this.resolveEncryption(dpCfg);
    this.resolvedEncryption = encryption;

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

    // BCM validates bucket policy + ACL at CreateExport, so both PutObject on objects
    // and GetBucket* on the bucket are required.
    this.bucket.addToResourcePolicy(new iam.PolicyStatement({
      sid: 'EnableAWSDataExportsToWriteToS3',
      effect: iam.Effect.ALLOW,
      principals: [new iam.ServicePrincipal('bcm-data-exports.amazonaws.com')],
      actions: ['s3:PutObject'],
      resources: [this.bucket.arnForObjects('*')],
      conditions: {
        ArnLike: {
          'aws:SourceArn': `arn:aws:bcm-data-exports:${DLZ_DATA_EXPORTS_DEFAULTS.exportRegion}:${props.managementAccountId}:export/*`,
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
          'aws:SourceArn': `arn:aws:bcm-data-exports:${DLZ_DATA_EXPORTS_DEFAULTS.exportRegion}:${props.managementAccountId}:export/*`,
        },
        StringEquals: {
          'aws:SourceAccount': props.managementAccountId,
        },
      },
    }));

    for (const readerAccountId of dpCfg.additionalReadAccountIds ?? []) {
      this.bucket.addToResourcePolicy(new iam.PolicyStatement({
        sid: `AllowReadFromAccount${readerAccountId}`,
        effect: iam.Effect.ALLOW,
        principals: [new iam.AccountPrincipal(readerAccountId)],
        actions: ['s3:GetObject', 's3:ListBucket'],
        resources: [this.bucket.bucketArn, this.bucket.arnForObjects('*')],
      }));
    }

    // Construct id includes the DB name so a rename forces a new CFN logical id (=
    // Replacement). AWS::Glue::Database has no in-place rename, so Update on Name fails
    // at deploy; the logical-id change makes CFN do delete-old + create-new instead.
    this.glueDatabase = new glue.CfnDatabase(this, `glue-db-${glueDatabaseName}`, {
      catalogId: accountId,
      databaseInput: {
        name: glueDatabaseName,
        description: 'DLZ FinOps — shared Glue database cataloging every BCM Data Export',
      },
    });

    const crawlerRole = new iam.Role(this, 'cur-glue-crawler-role', {
      assumedBy: new iam.ServicePrincipal('glue.amazonaws.com'),
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSGlueServiceRole')],
    });
    this.bucket.grantRead(crawlerRole);

    const s3Targets = this.resolvedExports.map(p => ({
      path: `s3://${bucketName}/${p.dataPath}/`,
      exclusions: ['metadata/**', '**.json', '**_$folder$'],
    }));

    const glueCrawlerSchedule = dpCfg.glueCrawlerSchedule ?? DLZ_DATA_EXPORTS_DEFAULTS.glueCrawlerSchedule;
    this.glueCrawlerSchedule = glueCrawlerSchedule;
    this.glueCrawler = new glue.CfnCrawler(this, 'cur-glue-crawler', {
      role: crawlerRole.roleArn,
      databaseName: glueDatabaseName,
      targets: { s3Targets },
      schedule: {
        scheduleExpression: glueCrawlerSchedule,
      },
      tablePrefix: DLZ_DATA_EXPORTS_DEFAULTS.glueTablePrefix,
      configuration: JSON.stringify({
        Version: 1.0,
        CrawlerOutput: {
          Partitions: { AddOrUpdateBehavior: 'InheritFromTable' },
          // MergeNewColumns keeps downstream views working across CUR/FOCUS schema evolution.
          Tables: { AddOrUpdateBehavior: 'MergeNewColumns' },
        },
      }),
    });
    this.glueCrawler.addDependency(this.glueDatabase);

    if (dpCfg.athena?.enabled !== false) {
      this.athena = new DlzDataExportsAthena(this, 'athena', {
        accountId,
        region: props.destinationRegion,
        encryption,
        config: dpCfg.athena,
      });
    }

    this.exportSsmParameters();
  }

  private exportSsmParameters() {
    const prefix = SSM_PARAMETERS_DLZ.FINOPS_PREFIX;

    new ssm.StringParameter(this, 'ssm-data-bucket-name', {
      parameterName: `${prefix}data-bucket-name`,
      stringValue: this.curBucketName,
    });
    new ssm.StringParameter(this, 'ssm-data-bucket-arn', {
      parameterName: `${prefix}data-bucket-arn`,
      stringValue: this.bucket.bucketArn,
    });
    new ssm.StringParameter(this, 'ssm-data-bucket-encryption-type', {
      parameterName: `${prefix}data-bucket-encryption-type`,
      stringValue: this.resolvedEncryption.kind === s3.BucketEncryption.KMS ? 'SSE_KMS' : 'SSE_S3',
    });
    if (this.resolvedEncryption.key) {
      new ssm.StringParameter(this, 'ssm-data-bucket-kms-key-arn', {
        parameterName: `${prefix}data-bucket-kms-key-arn`,
        stringValue: this.resolvedEncryption.key.keyArn,
      });
    }
    new ssm.StringParameter(this, 'ssm-destination-region', {
      parameterName: `${prefix}destination-region`,
      stringValue: this.curDestinationRegion,
    });
    new ssm.StringParameter(this, 'ssm-finops-account-id', {
      parameterName: `${prefix}finops-account-id`,
      stringValue: this.accountId,
    });
    new ssm.StringParameter(this, 'ssm-management-account-id', {
      parameterName: `${prefix}management-account-id`,
      stringValue: this.managementAccountId,
    });
    new ssm.StringParameter(this, 'ssm-glue-database-name', {
      parameterName: `${prefix}glue-database-name`,
      stringValue: this.glueDatabaseName,
    });
    new ssm.StringParameter(this, 'ssm-glue-crawler-name', {
      parameterName: `${prefix}glue-crawler-name`,
      stringValue: this.glueCrawler.ref,
    });
    new ssm.StringParameter(this, 'ssm-glue-crawler-schedule', {
      parameterName: `${prefix}glue-crawler-schedule`,
      stringValue: this.glueCrawlerSchedule,
    });

    // Manifest of configured export IDs — readable in one call instead of paging
    // `ssm:GetParametersByPath /dlz/finops/exports/`. Always non-empty because the data
    // plane only runs when `finOps.dataExports.exports` has entries.
    new ssm.StringListParameter(this, 'ssm-export-ids', {
      parameterName: `${prefix}export-ids`,
      stringListValue: this.resolvedExports.map(p => p.entryId),
    });

    for (const placement of this.resolvedExports) {
      const exportPrefix = `${prefix}exports/${placement.entryId}/`;
      const idSafe = placement.entryId.replace(/[^a-zA-Z0-9]/g, '-');

      new ssm.StringParameter(this, `ssm-export-type-${idSafe}`, {
        parameterName: `${exportPrefix}export-type`,
        stringValue: placement.entry.exportType,
      });
      new ssm.StringParameter(this, `ssm-export-name-${idSafe}`, {
        parameterName: `${exportPrefix}export-name`,
        stringValue: placement.exportName,
      });
      new ssm.StringParameter(this, `ssm-destination-prefix-${idSafe}`, {
        parameterName: `${exportPrefix}destination-prefix`,
        // SSM rejects empty values; sentinel `(none)` means "no prefix configured".
        stringValue: placement.destinationPrefix === '' ? '(none)' : placement.destinationPrefix,
      });
      new ssm.StringParameter(this, `ssm-data-path-${idSafe}`, {
        parameterName: `${exportPrefix}data-path`,
        stringValue: placement.dataPath,
      });
      new ssm.StringParameter(this, `ssm-s3-uri-${idSafe}`, {
        parameterName: `${exportPrefix}s3-uri`,
        stringValue: `s3://${this.curBucketName}/${placement.dataPath}/`,
      });
      new ssm.StringParameter(this, `ssm-glue-table-name-${idSafe}`, {
        parameterName: `${exportPrefix}glue-table-name`,
        stringValue: placement.glueTableName,
      });
    }
  }

  private lifecycleRules(cfg: DlzDataExportsLifecycleConfig): s3.LifecycleRule[] {
    const transitions: s3.Transition[] = [
      {
        storageClass: s3.StorageClass.INFREQUENT_ACCESS,
        transitionAfter: Duration.days(cfg.transitionToInfrequentAccessDays ?? DLZ_DATA_EXPORTS_DEFAULTS.lifecycle.transitionToInfrequentAccessDays),
      },
      {
        storageClass: s3.StorageClass.GLACIER_INSTANT_RETRIEVAL,
        transitionAfter: Duration.days(cfg.transitionToGlacierDays ?? DLZ_DATA_EXPORTS_DEFAULTS.lifecycle.transitionToGlacierDays),
      },
    ];

    const expirationDays = cfg.expirationDays ?? DLZ_DATA_EXPORTS_DEFAULTS.lifecycle.expirationDays;
    let expiration: Duration | undefined;
    if (expirationDays > 0) {
      if (expirationDays < DLZ_DATA_EXPORTS_DEFAULTS.lifecycle.minExpirationDays) {
        throw new Error(
          `lifecycle.expirationDays must be 0 (disabled) or >= ${DLZ_DATA_EXPORTS_DEFAULTS.lifecycle.minExpirationDays} ` +
          `(13 months for YoY comparisons). Got ${expirationDays}.`,
        );
      }
      expiration = Duration.days(expirationDays);
    }

    return [{
      id: 'dlz-finops-lifecycle',
      enabled: true,
      transitions,
      expiration,
    }];
  }

  private resolveEncryption(cfg: DlzDataExportsDataPlaneConfig): ResolvedEncryption {
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

function resolvePlacements(exports: { readonly [id: string]: DlzDataExportEntry }): ResolvedExportPlacement[] {
  return Object.entries(exports).map(([entryId, entry]) => {
    const exportName = entry.exportName ?? deriveDefaultExportName(entryId);
    const destinationPrefix = entry.destinationPrefix ?? DLZ_DATA_EXPORTS_DEFAULTS.destinationPrefix;
    const glueTableName = entry.glueTableName ?? deriveDefaultGlueTableName(exportName);
    return {
      entryId,
      entry,
      exportName,
      destinationPrefix,
      glueTableName,
      dataPath: buildDataPath(destinationPrefix, exportName),
    };
  });
}
