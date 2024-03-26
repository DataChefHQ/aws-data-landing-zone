import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface DlzStackNameProps {
  readonly ou?: string;
  readonly account?: string;
  readonly stack: string;
  readonly region: string;
}
export interface DlzStackProps extends Omit<cdk.StackProps,"stackName"> {
  name: DlzStackNameProps
}

const DlzStackNamePrefix = "dlz-";
export class DlzStack extends cdk.Stack {
  public readonly id: string;
  constructor(scope: Construct, props: DlzStackProps) {
    const stackId = [
      props.name.ou,
      props.name.account,
      props.name.stack,
      props.name.region
    ].filter(Boolean).join('--');

    super(scope, stackId, {
      ...props,
      stackName: DlzStackNamePrefix + props.name.stack,
    });

    this.id = stackId;
  }

  /**
   * Create unique ResourceNames
   * @param resourceId
   */
  resourceName(resourceId: string): string {
    return this.stackName + '-' + resourceId;
  }
}
