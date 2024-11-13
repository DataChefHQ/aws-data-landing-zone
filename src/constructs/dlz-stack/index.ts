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
}
