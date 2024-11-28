import { ExportValueOptions } from 'aws-cdk-lib';
import { Environment } from 'aws-cdk-lib/core/lib/environment';
import { ExpressStage, ExpressStack } from 'cdk-express-pipeline';
import { Construct } from 'constructs';

export interface DlzStackNameProps {
  readonly ou?: string;
  readonly account?: string;
  readonly stack: string;
  readonly region: string;
}
export interface DlzStackProps {
  readonly name: DlzStackNameProps;
  readonly env: Environment;
  readonly stage: ExpressStage;
}

const DlzStackNamePrefix = 'dlz-';
export class DlzStack extends ExpressStack {

  public readonly accountName: string;
  public readonly accountId: string;

  constructor(scope: Construct, props: DlzStackProps) {
    super(scope, props.name.region!, props.stage, {
      ...props,
      stackName: DlzStackNamePrefix + props.name.stack,
      analyticsReporting: false,
    });

    this.accountName = props.name.account!;
    this.accountId = props.env.account!;
  }

  /**
   * Create unique ResourceNames
   * @param resourceId
   */
  resourceName(resourceId: string): string {
    return this.stackName + '-' + resourceId;
  }

  // Re specifying to remove the excessive heredoc that has markdown in and upsetting the generated docs
  /**
   * Create a CloudFormation Export for a string value.
   *
   * Returns a string representing the corresponding Fn.importValue() expression for this Export. You can control the name for the export by passing the name option.
   *
   * If you don’t supply a value for name, the value you’re exporting must be a Resource attribute (for example: bucket.bucketName) and it will be given the same name as the automatic cross-stack reference that would be created if you used the attribute in another Stack.
   *
   * One of the uses for this method is to remove the relationship between two Stacks established by automatic cross-stack references. It will temporarily ensure that the CloudFormation Export still exists while you remove the reference from the consuming stack. After that, you can remove the resource and the manual export.
   * @param exportedValue
   * @param options
   */
  exportValue(exportedValue: any, options?: ExportValueOptions): string {
    return super.exportValue(exportedValue, options);
  }
}
