import { Construct } from 'constructs';
import {DlzStack} from "../../../../constructs";
import * as sns from "aws-cdk-lib/aws-sns";
import {DlzStackProps} from "../../../../constructs/dlz-stack";

export class LogGlobalStack extends DlzStack {
  constructor(scope: Construct, props: DlzStackProps) {
    super(scope, props);

    new sns.Topic(this, this.resourceName('test-topic'), {
      displayName: this.resourceName('test-topic'),
      topicName: this.resourceName('test-topic'),
    });
  }
}
