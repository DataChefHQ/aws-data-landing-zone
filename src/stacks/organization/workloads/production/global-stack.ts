import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { DlzStack } from '../../../../constructs';
import { DataLandingZoneProps, WorkloadAccountProps } from '../../../../data-landing-zone';
import { SharedWorkloads } from '../shared-workloads';

export class ProductionGlobalStack extends DlzStack {

  constructor(scope: Construct, stackProps: WorkloadAccountProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    new SharedWorkloads(this, this.props, stackProps.dlzAccount);

    new sns.Topic(this, this.resourceName('test-topic'), {
      displayName: this.resourceName('test-topic'),
      topicName: this.resourceName('test-topic'),
    });
  }
}
