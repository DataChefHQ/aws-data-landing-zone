import { Construct } from 'constructs';
import { Shared } from './shared';
import { DlzStack } from '../../../../constructs/index';

import { DataLandingZoneProps, WorkloadAccountProps } from '../../../../data-landing-zone-types';

export class WorkloadRegionalNetworkConnectionsPhase2Stack extends DlzStack {

  constructor(scope: Construct, workloadAccountProps: WorkloadAccountProps, props: DataLandingZoneProps) {
    super(scope, workloadAccountProps);
    const shared = new Shared(this, props, workloadAccountProps.globalVariables);
    shared.createVpcPeeringConnections();
  }

}
