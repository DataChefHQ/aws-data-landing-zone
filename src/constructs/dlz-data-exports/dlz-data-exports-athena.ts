import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import * as athena from 'aws-cdk-lib/aws-athena';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { DLZ_DATA_EXPORTS_DEFAULTS, DlzDataExportsAthenaConfig } from './data-exports-types';
import { SSM_PARAMETERS_DLZ } from '../../stacks/organization/constants';

export interface DlzDataExportsAthenaResolvedEncryption {
  readonly kind: s3.BucketEncryption;
  readonly key?: kms.IKey;
}

export interface DlzDataExportsAthenaProps {
  readonly accountId: string;
  readonly region: string;
  /** Resolved by the data plane so encryption stays consistent with the CUR bucket. */
  readonly encryption: DlzDataExportsAthenaResolvedEncryption;
  readonly config?: DlzDataExportsAthenaConfig;
}

/**
 * Athena workgroup + query-results bucket for the DLZ CUR data plane. Without
 * this, the AWS console blocks every first query with the "set up a query
 * result location" prompt.
 *
 * `EnforceWorkGroupConfiguration: true` so users can't override the result
 * location or encryption client-side.
 */
export class DlzDataExportsAthena extends Construct {

  public readonly resultsBucket: s3.Bucket;
  public readonly workgroup: athena.CfnWorkGroup;
  public readonly workgroupName: string;
  public readonly resultsBucketName: string;

  constructor(scope: Construct, id: string, props: DlzDataExportsAthenaProps) {
    super(scope, id);

    const cfg = props.config ?? {};
    const expirationDays = cfg.resultsExpirationDays ?? DLZ_DATA_EXPORTS_DEFAULTS.athena.resultsExpirationDays;
    if (expirationDays < 1) {
      throw new Error(
        `athena.resultsExpirationDays must be >= 1. Got ${expirationDays}. ` +
        'Query results are disposable scratch data — keeping them indefinitely accumulates cost without value.',
      );
    }

    const bucketPrefix = cfg.resultsBucketNamePrefix ?? DLZ_DATA_EXPORTS_DEFAULTS.athena.resultsBucketNamePrefix;
    const bucketName = `${bucketPrefix}-${props.accountId}-${props.region}`;
    this.resultsBucketName = bucketName;
    this.workgroupName = cfg.workgroupName ?? DLZ_DATA_EXPORTS_DEFAULTS.athena.workgroupName;
    this.resultsBucket = new s3.Bucket(this, 'results-bucket', {
      bucketName,
      versioned: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      encryption: props.encryption.kind,
      encryptionKey: props.encryption.key,
      removalPolicy: RemovalPolicy.RETAIN,
      lifecycleRules: [{
        id: 'dlz-finops-athena-results-expiration',
        enabled: true,
        expiration: Duration.days(expirationDays),
        abortIncompleteMultipartUploadAfter: Duration.days(1),
      }],
    });

    const engineVersion = cfg.engineVersion ?? DLZ_DATA_EXPORTS_DEFAULTS.athena.engineVersion;
    const publishMetrics = cfg.publishCloudWatchMetrics ?? DLZ_DATA_EXPORTS_DEFAULTS.athena.publishCloudWatchMetrics;

    const resultConfig: athena.CfnWorkGroup.ResultConfigurationProperty = {
      outputLocation: `s3://${bucketName}/`,
      encryptionConfiguration: this.encryptionConfiguration(props.encryption),
    };

    this.workgroup = new athena.CfnWorkGroup(this, 'workgroup', {
      name: this.workgroupName,
      description: 'DLZ CUR query workgroup — results in the DLZ-managed scratch bucket',
      state: 'ENABLED',
      recursiveDeleteOption: cfg.recursiveDeleteOption ?? DLZ_DATA_EXPORTS_DEFAULTS.athena.recursiveDeleteOption,
      workGroupConfiguration: {
        enforceWorkGroupConfiguration: true,
        publishCloudWatchMetricsEnabled: publishMetrics,
        requesterPaysEnabled: false,
        engineVersion: {
          selectedEngineVersion: engineVersion === 2 ? 'Athena engine version 2' : 'Athena engine version 3',
        },
        bytesScannedCutoffPerQuery: cfg.bytesScannedCutoffPerQuery,
        resultConfiguration: resultConfig,
      },
    });

    const prefix = SSM_PARAMETERS_DLZ.FINOPS_PREFIX;
    new ssm.StringParameter(this, 'ssm-athena-workgroup-name', {
      parameterName: `${prefix}athena-workgroup-name`,
      stringValue: this.workgroupName,
      description: 'DLZ FinOps CUR — Athena workgroup name',
    });
    new ssm.StringParameter(this, 'ssm-athena-results-bucket-name', {
      parameterName: `${prefix}athena-results-bucket-name`,
      stringValue: this.resultsBucketName,
      description: 'DLZ FinOps CUR — Athena query-results bucket',
    });
  }

  private encryptionConfiguration(
    encryption: DlzDataExportsAthenaResolvedEncryption,
  ): athena.CfnWorkGroup.EncryptionConfigurationProperty {
    if (encryption.kind === s3.BucketEncryption.KMS && encryption.key) {
      return {
        encryptionOption: 'SSE_KMS',
        kmsKey: encryption.key.keyArn,
      };
    }
    return { encryptionOption: 'SSE_S3' };
  }
}
