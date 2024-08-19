import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { DlzStack } from '../../../../constructs';
import { DataLandingZoneProps, WorkloadAccountProps } from '../../../../data-landing-zone';
import { Shared } from './shared';

export class WorkloadGlobalStack extends DlzStack {

  constructor(scope: Construct, stackProps: WorkloadAccountProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    const shared = new Shared(this, this.props, stackProps.dlzAccount);
    shared.configRuleRequiredTags();
    shared.createVpcs();

    new sns.Topic(this, this.resourceName('test-topic'), {
      displayName: this.resourceName('test-topic'),
      topicName: this.resourceName('test-topic'),
    });
  }
}
