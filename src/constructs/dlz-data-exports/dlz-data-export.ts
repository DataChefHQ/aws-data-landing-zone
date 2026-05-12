import * as fs from 'fs';
import * as path from 'path';
import { CustomResource, CustomResourceProvider, CustomResourceProviderRuntime, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  buildDataPath,
  buildDescription,
  buildQueryStatement,
  buildTableConfigurations,
  resolveOutput,
} from './data-exports-builders';
import {
  DLZ_DATA_EXPORTS_DEFAULTS,
  DlzDataExportEntry,
  deriveDefaultExportName,
} from './data-exports-types';

export interface DlzDataExportProps {
  readonly entryId: string;
  readonly entry: DlzDataExportEntry;
  readonly destinationBucketArn: string;
  readonly destinationBucketRegion: string;
  readonly destinationBucketOwnerAccountId: string;
}

/**
 * BCM rejects duplicate export names on Replacement, so the Lambda handler
 * owns the lifecycle and falls back to delete-then-create when UpdateExport
 * can't apply a change in place.
 *
 * The custom-resource provider is shared across every instance; the first
 * construct locks the provider's IAM policy, so we grant every action any of
 * the five export types might need up front (including
 * `sustainability:GetCarbonFootprintSummary` for CARBON_EMISSIONS).
 */
export class DlzDataExport extends Construct {

  public static fetchExportManagerCodeDirectory(): string {
    return DlzDataExport.fetchLambdaDir('data-export-manager');
  }

  private static fetchLambdaDir(name: string): string {
    const dir = path.join(__dirname, 'lambda', name);
    if (fs.existsSync(path.join(dir, 'index.js'))) {
      return dir;
    }
    return path.join(__dirname, '..', '..', '..', 'assets', 'constructs', 'dlz-data-exports', 'lambda', name);
  }

  public readonly exportArn: string;
  public readonly resolvedExportName: string;
  public readonly resolvedDestinationPrefix: string;
  public readonly resolvedDataPath: string;

  constructor(scope: Construct, id: string, props: DlzDataExportProps) {
    super(scope, id);

    const exportName = props.entry.exportName ?? deriveDefaultExportName(props.entryId);
    const destinationPrefix = props.entry.destinationPrefix ?? DLZ_DATA_EXPORTS_DEFAULTS.destinationPrefix;
    const overwriteBehavior = props.entry.overwriteBehavior ?? DLZ_DATA_EXPORTS_DEFAULTS.overwriteBehavior;
    const output = resolveOutput(props.entry);

    this.resolvedExportName = exportName;
    this.resolvedDestinationPrefix = destinationPrefix;
    this.resolvedDataPath = buildDataPath(destinationPrefix, exportName);

    // Keep this CFN logical-id seed stable across class renames —
    // changing it produces a new Lambda, changes the ServiceToken on
    // any existing custom resource, and CFN refuses ("Modifying
    // service token is not allowed"). Rename the wrapping class
    // freely; this string is internal-only.
    const provider = CustomResourceProvider.getOrCreateProvider(this, 'Custom::DlzDataExport', {
      useCfnResponseWrapper: true,
      codeDirectory: DlzDataExport.fetchExportManagerCodeDirectory(),
      runtime: CustomResourceProviderRuntime.NODEJS_22_X,
      timeout: Duration.minutes(5),
      policyStatements: [{
        Effect: 'Allow',
        Action: [
          'bcm-data-exports:CreateExport',
          'bcm-data-exports:UpdateExport',
          'bcm-data-exports:DeleteExport',
          'bcm-data-exports:GetExport',
          // CUR 2.0 path goes through the legacy cur: API internally.
          'cur:PutReportDefinition',
          'cur:ModifyReportDefinition',
          'cur:DeleteReportDefinition',
          'cur:DescribeReportDefinitions',
          // Carbon Emissions export — BCM validates caller can read sustainability data.
          'sustainability:GetCarbonFootprintSummary',
          // Cost Optimization Recommendations export — BCM validates caller
          // can read COH data on CreateExport.
          'cost-optimization-hub:ListRecommendations',
          'cost-optimization-hub:GetRecommendation',
          'cost-optimization-hub:GetPreferences',
          'cost-optimization-hub:ListEnrollmentStatuses',
        ],
        Resource: '*',
      }],
    });

    const destinationConfigurations = {
      S3Destination: {
        S3Bucket: parseBucketName(props.destinationBucketArn),
        S3BucketOwner: props.destinationBucketOwnerAccountId,
        S3Prefix: destinationPrefix,
        S3Region: props.destinationBucketRegion,
        S3OutputConfigurations: {
          Format: output.format,
          Compression: output.compression,
          OutputType: 'CUSTOM',
          Overwrite: overwriteBehavior,
        },
      },
    };

    const exportResource = new CustomResource(this, 'export', {
      serviceToken: provider.serviceToken,
      properties: {
        Name: exportName,
        Description: buildDescription(props.entry),
        QueryStatement: buildQueryStatement(props.entry),
        TableConfigurations: JSON.stringify(buildTableConfigurations(props.entry)),
        DestinationConfigurations: JSON.stringify(destinationConfigurations),
        Frequency: 'SYNCHRONOUS',
      },
    });

    this.exportArn = exportResource.getAttString('ExportArn');
  }
}

function parseBucketName(arn: string): string {
  const prefix = 'arn:aws:s3:::';
  if (!arn.startsWith(prefix)) {
    throw new Error(`Expected an S3 bucket ARN starting with '${prefix}', got '${arn}'`);
  }
  return arn.slice(prefix.length);
}
