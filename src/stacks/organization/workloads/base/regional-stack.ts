import { Construct } from 'constructs';
import { Shared } from './shared';
import { DlzStack } from '../../../../constructs';

import { DataLandingZoneProps, WorkloadAccountProps } from '../../../../data-landing-zone-types';

export class WorkloadRegionalStack extends DlzStack {

  constructor(scope: Construct, workloadAccountProps: WorkloadAccountProps, private props: DataLandingZoneProps) {
    super(scope, workloadAccountProps);

    const shared = new Shared(this, this.props, workloadAccountProps.dlzAccount, workloadAccountProps.globalVariables);
    shared.configRuleRequiredTags();
    shared.createVpcs();
    shared.createIamPermissionsBoundaryParameter();
    shared.createBastions();
    shared.createLakeFormation();
  }
}
