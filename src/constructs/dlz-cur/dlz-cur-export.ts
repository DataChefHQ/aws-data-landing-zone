import * as fs from 'fs';
import * as path from 'path';
import { CustomResource, CustomResourceProvider, CustomResourceProviderRuntime, Duration } from 'aws-cdk-lib';
import * as bcm from 'aws-cdk-lib/aws-bcmdataexports';
import { Construct } from 'constructs';
import { DLZ_CUR_DEFAULTS, DlzCurExportConfig } from './cur-types';

export interface DlzCurExportProps {
  /**
   * ARN of the destination bucket in the FinOps account. The construct does not create
   * this bucket — it lives in the FinOps account stack via `DlzCurDataPlane`.
   */
  readonly destinationBucketArn: string;

  /** S3 prefix under which CUR files are written. */
  readonly destinationPrefix: string;

  /** Export name. Becomes part of the export ARN used by the bucket policy. */
  readonly exportName?: string;

  /** Tag keys to activate as cost allocation tags. Pass `[]` to skip activation. */
  readonly costAllocationTagKeys: string[];

  /** Export-shape config. Defaults match FinOps best practice. */
  readonly exportConfig?: DlzCurExportConfig;
}

/**
 * CUR 2.0 export definition + cost-allocation-tag activation.
 *
 * Lives in the management/payer account (BCM Data Exports is a payer-only API). Writes
 * cross-account into the FinOps-account bucket — no DLZ-managed data movement; AWS
 * Billing delivers the data directly.
 */
export class DlzCurExport extends Construct {

  public static fetchTagActivationCodeDirectory(): string {
    const dir = path.join(__dirname, 'lambda', 'cur-tag-activation');
    if (fs.existsSync(path.join(dir, 'index.js'))) {
      return dir;
    }
    return path.join(__dirname, '..', '..', '..', 'assets', 'constructs', 'dlz-cur', 'lambda', 'cur-tag-activation');
  }

  public readonly export: bcm.CfnExport;

  constructor(scope: Construct, id: string, props: DlzCurExportProps) {
    super(scope, id);

    const cfg = props.exportConfig ?? {};
    const exportName = props.exportName ?? DLZ_CUR_DEFAULTS.exportName;

    this.export = new bcm.CfnExport(this, 'export', {
      export: {
        name: exportName,
        description: 'DLZ Cost and Usage Report 2.0 export — Parquet, hourly, resource-level',
        dataQuery: {
          queryStatement: 'SELECT * FROM COST_AND_USAGE_REPORT',
          tableConfigurations: {
            COST_AND_USAGE_REPORT: {
              TIME_GRANULARITY: cfg.timeGranularity ?? 'HOURLY',
              INCLUDE_RESOURCES: String(cfg.includeResources ?? true).toUpperCase(),
              INCLUDE_SPLIT_COST_ALLOCATION_DATA: String(cfg.includeSplitCostAllocationData ?? true).toUpperCase(),
              INCLUDE_MANUAL_DISCOUNT_COMPATIBILITY: String(cfg.includeManualDiscountCompatibility ?? false).toUpperCase(),
            },
          },
        },
        destinationConfigurations: {
          s3Destination: {
            s3Bucket: parseBucketName(props.destinationBucketArn),
            s3Prefix: props.destinationPrefix,
            s3Region: DLZ_CUR_DEFAULTS.exportRegion,
            s3OutputConfigurations: {
              format: cfg.format ?? 'PARQUET',
              compression: cfg.compression ?? 'PARQUET',
              outputType: 'CUSTOM',
              overwrite: cfg.overwriteBehavior ?? 'OVERWRITE_REPORT',
            },
          },
        },
        refreshCadence: {
          frequency: 'SYNCHRONOUS',
        },
      },
    });

    if (props.costAllocationTagKeys.length > 0) {
      const provider = CustomResourceProvider.getOrCreateProvider(this, 'Custom::DlzCurTagActivation', {
        useCfnResponseWrapper: true,
        codeDirectory: DlzCurExport.fetchTagActivationCodeDirectory(),
        runtime: CustomResourceProviderRuntime.NODEJS_22_X,
        timeout: Duration.seconds(60),
        policyStatements: [{
          Effect: 'Allow',
          Action: [
            'ce:ListCostAllocationTags',
            'ce:UpdateCostAllocationTagsStatus',
          ],
          Resource: '*',
        }],
      });

      new CustomResource(this, 'tag-activation', {
        serviceToken: provider.serviceToken,
        properties: {
          physicalResourceId: `${id}-tag-activation`,
          tagKeys: JSON.stringify(props.costAllocationTagKeys),
        },
      });
    }
  }
}

/** Extract `<bucket>` from `arn:aws:s3:::<bucket>`. */
function parseBucketName(arn: string): string {
  const prefix = 'arn:aws:s3:::';
  if (!arn.startsWith(prefix)) {
    throw new Error(`Expected an S3 bucket ARN starting with '${prefix}', got '${arn}'`);
  }
  return arn.slice(prefix.length);
}
