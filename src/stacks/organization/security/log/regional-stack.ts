import { Construct } from 'constructs';
import { DlzStack } from '../../../../constructs';
import { DlzStackProps } from '../../../../constructs/dlz-stack/index';

export class LogRegionalStack extends DlzStack {
  constructor(scope: Construct, props: DlzStackProps) {
    super(scope, props);
  }
}
