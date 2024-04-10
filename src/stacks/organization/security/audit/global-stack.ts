import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { DlzStack } from '../../../../constructs';
import { DlzStackProps } from '../../../../constructs/dlz-stack/index';

export class AuditGlobalStack extends DlzStack {
  constructor(scope: Construct, props: DlzStackProps) {
    super(scope, props);

    new sns.Topic(this, this.resourceName('test-topic'), {
      displayName: this.resourceName('test-topic'),
      topicName: this.resourceName('test-topic'),
    });
  }
}
