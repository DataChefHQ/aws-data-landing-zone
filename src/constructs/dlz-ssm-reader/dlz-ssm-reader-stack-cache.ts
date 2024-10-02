import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DlzSsmReader } from './dlz-ssm-reader';


/**
 * Get the value of an SSM Parameter Store value. This method will reuse the same CustomResource, reducing the number
 * of lookups to the same resource within a stack.
 */
export class DlzSsmReaderStackCache {
  private cachedValues: { [key: string]: string } = {};

  /**
   * Fetch type `always` will always fetch the value from SSM Parameter Store, this will produce a CDK diff every time.
   * Fetch type `value-change` will fetch the value from SSM Parameter Store only when the value changes, this will not
   * produce a CDK diff every time.
   *
   * @param scope
   * @param id
   * @param accountId
   * @param region
   * @param name
   * @param withDecryption
   * @param fetchType
   */
  public getValue(scope: Construct, id: string,
    accountId: string, region: string, name: string,
    fetchType: 'always' | 'value-change' = 'value-change', withDecryption: boolean = false)
    : string {

    const stack = Stack.of(scope);
    const cacheKey = `${stack.stackId}-${name}`;
    if (!this.cachedValues[cacheKey]) {
      this.cachedValues[cacheKey] = DlzSsmReader.getValue(scope, id, accountId, region, name, fetchType, withDecryption);
    }

    return this.cachedValues[cacheKey];
  }
}
