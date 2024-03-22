import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class DlzStack extends cdk.Stack {
  private readonly id: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.id = id;
  }

  /**
   * Create unique ResourceNames
   * @param resourceId
   */
  resourceName(resourceId: string): string {
    return this.id + '-' + resourceId;
  }
}
