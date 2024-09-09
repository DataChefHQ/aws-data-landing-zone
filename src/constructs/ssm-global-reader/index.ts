import { Construct } from 'constructs';
import * as cr from 'aws-cdk-lib/custom-resources'
import {DynamicConstants} from "../../stacks/organization/constants";
import * as iam from "aws-cdk-lib/aws-iam";

export interface SsmCrossAccountAndRegionReaderProps {
  readonly accountId: string;
  readonly region: string;
}

export class SsmCrossAccountAndRegionReader {

  private readonly assumeRoleArn: string;

  constructor(private scope: Construct, private id: string, private props: SsmCrossAccountAndRegionReaderProps) {
    const dynamicProps = new DynamicConstants();
    this.assumeRoleArn = dynamicProps.getSsmAssumeCrossAccountRoleArn(props.accountId);
  }

  /**
   * Get the value of an SSM Parameter Store value.
   *
   * Fetch type `always` will always fetch the value from SSM Parameter Store, this will produce a CDK diff every time.
   * Fetch type `value-change` will fetch the value from SSM Parameter Store only when the value changes, this will not
   * produce a CDK diff every time.
   *
   * @param name
   * @param withDecryption
   * @param fetchType
   */
  public getValue(name: string,  fetchType: "always" | "value-change" = "value-change", withDecryption: boolean = false)
  : string {

    let physicalResourceId;
    if(fetchType === "always") {
      physicalResourceId = cr.PhysicalResourceId.of(Date.now().toString());
    }
    else {
      physicalResourceId = cr.PhysicalResourceId.fromResponse('Parameter.Value');
    }

    const getParameter = new cr.AwsCustomResource(this.scope, this.id, {
      onUpdate: {
        region: this.props.region,
        assumedRoleArn: this.assumeRoleArn,
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
              resources: [this.assumeRoleArn],
          }),
      ]),
    });

    return getParameter.getResponseField('Parameter.Value');
  }
}
