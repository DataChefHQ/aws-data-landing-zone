import * as iam from 'aws-cdk-lib/aws-iam';
import * as cr from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { DynamicConstants } from '../../stacks/organization/constants';

export class DlzSsmReader {

  /**
   * Get the value of an SSM Parameter Store value.
   *
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
  public static getValue(scope: Construct, id: string,
    accountId: string, region: string, name: string,
    fetchType: 'always' | 'value-change' = 'value-change', withDecryption: boolean = false)
    : string {

    const dynamicProps = new DynamicConstants();
    const assumeRoleArn = dynamicProps.getSsmAssumeCrossAccountRoleArn(accountId);

    let physicalResourceId;
    if (fetchType === 'always') {
      physicalResourceId = cr.PhysicalResourceId.of(Date.now().toString());
    } else {
      physicalResourceId = cr.PhysicalResourceId.fromResponse('Parameter.Value');
    }

    const getParameter = new cr.AwsCustomResource(scope, id, {
      resourceType: 'Custom::DlzSsmReader',
      onUpdate: {
        region: region,
        assumedRoleArn: assumeRoleArn,
        service: 'SSM',
        action: 'GetParameter',
        parameters: {
          Name: name,
          WithDecryption: withDecryption,
        },
        physicalResourceId,
      },
      policy: cr.AwsCustomResourcePolicy.fromStatements([
        new iam.PolicyStatement({
          actions: ['sts:AssumeRole'],
          resources: [assumeRoleArn],
        }),
      ]),
    });

    return getParameter.getResponseField('Parameter.Value');
  }
}
