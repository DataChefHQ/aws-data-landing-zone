import * as sns from 'aws-cdk-lib/aws-sns';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import { DlzStack } from '../../../../constructs';
import { DlzStackProps } from '../../../../constructs/dlz-stack/index';
import { DataLandingZoneProps } from '../../../../data-landing-zone';
import { SharedWorkloads } from '../shared-workloads';

export class ProductionRegionalStack extends DlzStack {

  constructor(scope: Construct, stackProps: DlzStackProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    new SharedWorkloads(this, this.props);

    new sns.Topic(this, this.resourceName('test-topic'), {
      displayName: this.resourceName('test-topic'),
      topicName: this.resourceName('test-topic'),
    });

    new sqs.Queue(this, this.resourceName('test-queue'), {
      queueName: this.resourceName('test-queue'),
    });
  }
}
