import * as fs from 'fs';
import * as path from 'path';
import { CustomResource, CustomResourceProvider, CustomResourceProviderRuntime, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  DLZ_CUR_DEFAULTS,
  DLZ_CUR_DEFAULT_QUERY_COLUMNS,
  DLZ_CUR_OPTIONAL_QUERY_COLUMNS,
  DlzCurExportConfig,
} from './cur-types';

export interface DlzCurExportProps {
  readonly destinationBucketArn: string;
  readonly destinationBucketRegion: string;
  /** Required for cross-account delivery; BCM validates bucket ownership. */
  readonly destinationBucketOwnerAccountId: string;
  /**
   * Optional S3 path segment prepended in front of the export name. BCM's layout
   * is `<bucket>/<destinationPrefix>/<exportName>/{data,metadata}/...`.
   * @default '' (flat layout; data lives directly under <exportName>/)
   */
  readonly destinationPrefix?: string;
  readonly exportName?: string;
  /** Pass `[]` to skip cost-allocation-tag activation. */
  readonly costAllocationTagKeys: string[];
  readonly exportConfig?: DlzCurExportConfig;
}

/**
 * CUR 2.0 export. Lives in the management/payer account; AWS Billing writes Parquet
 * files cross-account into the FinOps-account bucket on the export schedule.
 *
 * Backed by a custom resource rather than `bcm.CfnExport`: BCM rejects duplicate
 * export names on Replacement, so the Lambda owns the lifecycle and falls back to
 * delete-then-create when UpdateExport can't apply a change in place. This keeps the
 * export name stable across config changes — and so the S3 path stays stable too.
 */
export class DlzCurExport extends Construct {

  public static fetchExportManagerCodeDirectory(): string {
    return DlzCurExport.fetchLambdaDir('cur-export-manager');
  }

  public static fetchTagActivationCodeDirectory(): string {
    return DlzCurExport.fetchLambdaDir('cur-tag-activation');
  }

  private static fetchLambdaDir(name: string): string {
    const dir = path.join(__dirname, 'lambda', name);
    if (fs.existsSync(path.join(dir, 'index.js'))) {
      return dir;
    }
    return path.join(__dirname, '..', '..', '..', 'assets', 'constructs', 'dlz-cur', 'lambda', name);
  }

  public readonly exportArn: string;

  constructor(scope: Construct, id: string, props: DlzCurExportProps) {
    super(scope, id);

    const cfg = props.exportConfig ?? {};
    const exportName = props.exportName ?? DLZ_CUR_DEFAULTS.exportName;

    const provider = CustomResourceProvider.getOrCreateProvider(this, 'Custom::DlzCurExport', {
      useCfnResponseWrapper: true,
      codeDirectory: DlzCurExport.fetchExportManagerCodeDirectory(),
      runtime: CustomResourceProviderRuntime.NODEJS_22_X,
      timeout: Duration.minutes(5),
      policyStatements: [{
        Effect: 'Allow',
        Action: [
          'bcm-data-exports:CreateExport',
          'bcm-data-exports:UpdateExport',
          'bcm-data-exports:DeleteExport',
          'bcm-data-exports:GetExport',
          // BCM Data Exports CUR 2.0 calls the legacy cur: API surface internally.
          'cur:PutReportDefinition',
          'cur:ModifyReportDefinition',
          'cur:DeleteReportDefinition',
          'cur:DescribeReportDefinitions',
        ],
        Resource: '*',
      }],
    });

    const tableConfigurations = {
      COST_AND_USAGE_REPORT: buildTableProperties(cfg),
    };
    const destinationConfigurations = {
      S3Destination: {
        S3Bucket: parseBucketName(props.destinationBucketArn),
        S3BucketOwner: props.destinationBucketOwnerAccountId,
        S3Prefix: props.destinationPrefix ?? DLZ_CUR_DEFAULTS.destinationPrefix,
        S3Region: props.destinationBucketRegion,
        S3OutputConfigurations: {
          Format: cfg.format ?? 'PARQUET',
          Compression: cfg.compression ?? 'PARQUET',
          OutputType: 'CUSTOM',
          Overwrite: cfg.overwriteBehavior ?? 'OVERWRITE_REPORT',
        },
      },
    };

    const exportResource = new CustomResource(this, 'export', {
      serviceToken: provider.serviceToken,
      properties: {
        Name: exportName,
        Description: 'DLZ Cost and Usage Report 2.0 export — Parquet, hourly, resource-level',
        QueryStatement: cfg.queryStatement ?? buildDefaultQueryStatement(cfg),
        TableConfigurations: JSON.stringify(tableConfigurations),
        DestinationConfigurations: JSON.stringify(destinationConfigurations),
        Frequency: 'SYNCHRONOUS',
      },
    });

    this.exportArn = exportResource.getAttString('ExportArn');

    if (props.costAllocationTagKeys.length > 0) {
      const tagProvider = CustomResourceProvider.getOrCreateProvider(this, 'Custom::DlzCurTagActivation', {
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
        serviceToken: tagProvider.serviceToken,
        properties: {
          physicalResourceId: `${id}-tag-activation`,
          tagKeys: JSON.stringify(props.costAllocationTagKeys),
        },
      });
    }
  }
}

function parseBucketName(arn: string): string {
  const prefix = 'arn:aws:s3:::';
  if (!arn.startsWith(prefix)) {
    throw new Error(`Expected an S3 bucket ARN starting with '${prefix}', got '${arn}'`);
  }
  return arn.slice(prefix.length);
}

function buildDefaultQueryStatement(cfg: DlzCurExportConfig): string {
  const base = cfg.queryColumns?.length ? cfg.queryColumns : DLZ_CUR_DEFAULT_QUERY_COLUMNS;

  const cols: string[] = [...base];
  const seen = new Set(cols);
  const append = (extras: readonly string[]) => {
    for (const c of extras) {
      if (seen.has(c)) continue;
      cols.push(c);
      seen.add(c);
    }
  };

  if (cfg.includeCapacityReservationData === true) {
    append(DLZ_CUR_OPTIONAL_QUERY_COLUMNS.capacityReservationData);
  }
  if (cfg.includeIamPrincipalData === true) {
    append(DLZ_CUR_OPTIONAL_QUERY_COLUMNS.iamPrincipalData);
  }

  return `SELECT ${cols.join(', ')} FROM COST_AND_USAGE_REPORT`;
}

// Only emit opt-in INCLUDE_* keys when the user explicitly sets them; BCM rejects
// unrecognized properties in accounts that haven't received a given rollout.
function buildTableProperties(cfg: DlzCurExportConfig): Record<string, string> {
  const props: Record<string, string> = {
    TIME_GRANULARITY: cfg.timeGranularity ?? 'HOURLY',
    INCLUDE_RESOURCES: String(cfg.includeResources ?? true).toUpperCase(),
    INCLUDE_SPLIT_COST_ALLOCATION_DATA: String(cfg.includeSplitCostAllocationData ?? true).toUpperCase(),
  };
  if (cfg.includeCapacityReservationData !== undefined) {
    props.INCLUDE_CAPACITY_RESERVATION_DATA = String(cfg.includeCapacityReservationData).toUpperCase();
  }
  if (cfg.includeIamPrincipalData !== undefined) {
    props.INCLUDE_IAM_PRINCIPAL_DATA = String(cfg.includeIamPrincipalData).toUpperCase();
  }
  return props;
}
