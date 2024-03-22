import * as cdk from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { DlzStack } from '../constructs/dlz-stack';

export class ManagementStack extends DlzStack {
  public readonly topic: sns.Topic;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Create a new SNS Topic
    this.topic = new sns.Topic(this, this.resourceName('test-topic'), {
      displayName: this.resourceName('test-topic'),
      topicName: this.resourceName('test-topic'),
    });
  }
}
