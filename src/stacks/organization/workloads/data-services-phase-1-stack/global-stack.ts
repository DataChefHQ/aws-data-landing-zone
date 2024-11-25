import { Construct } from 'constructs';
import { Shared } from './shared';
import { DlzStack } from '../../../../constructs';
import { WorkloadAccountProps } from '../../../../data-landing-zone-types';

export class WorkloadGlobalDataServicesPhase1Stack extends DlzStack {
  constructor(scope: Construct, workloadAccountProps: WorkloadAccountProps) {
    super(scope, workloadAccountProps);
    const shared = new Shared(this, workloadAccountProps.dlzAccount);
    shared.createLakeFormation();
  }
}
