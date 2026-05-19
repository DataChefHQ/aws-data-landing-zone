import * as fs from 'fs';
import * as path from 'path';
import { CustomResource, CustomResourceProvider, CustomResourceProviderRuntime, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface DlzDataExportsTagActivationProps {
  readonly tagKeys: string[];
}

/**
 * Activates Cost Allocation Tags via `ce:UpdateCostAllocationTagsStatus`. Idempotent;
 * Delete is a no-op because the tags may be in use by consumers outside this stack.
 */
export class DlzDataExportsTagActivation extends Construct {

  public static fetchTagActivationCodeDirectory(): string {
    const dir = path.join(__dirname, 'lambda', 'tag-activation');
    if (fs.existsSync(path.join(dir, 'index.js'))) {
      return dir;
    }
    return path.join(__dirname, '..', '..', '..', 'assets', 'constructs', 'dlz-data-exports', 'lambda', 'tag-activation');
  }

  constructor(scope: Construct, id: string, props: DlzDataExportsTagActivationProps) {
    super(scope, id);

    if (props.tagKeys.length === 0) {
      return;
    }

    // Keep this CFN logical-id seed stable across class renames — changing it produces
    // a new Lambda, changes the ServiceToken on the existing CustomResource, and CFN
    // refuses ("Modifying service token is not allowed").
    const provider = CustomResourceProvider.getOrCreateProvider(this, 'Custom::DlzDataExportsTagActivation', {
      useCfnResponseWrapper: true,
      codeDirectory: DlzDataExportsTagActivation.fetchTagActivationCodeDirectory(),
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

    new CustomResource(this, 'resource', {
      serviceToken: provider.serviceToken,
      properties: {
        physicalResourceId: `${id}-tag-activation`,
        tagKeys: JSON.stringify(props.tagKeys),
      },
    });
  }
}
