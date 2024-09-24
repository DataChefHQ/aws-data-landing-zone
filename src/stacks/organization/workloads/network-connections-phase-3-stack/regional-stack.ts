import { DlzStack} from '../../../../constructs/index';
import {DataLandingZoneProps, WorkloadAccountProps} from "../../../../data-landing-zone";
import {Construct} from "constructs";
import {Shared} from "./shared";

export class WorkloadRegionalNetworkConnectionsPhase3Stack extends DlzStack {

  constructor(scope: Construct, workloadAccountProps: WorkloadAccountProps, props: DataLandingZoneProps) {
    super(scope, workloadAccountProps);
    const shared = new Shared(this, props, workloadAccountProps.globalVariables);
    shared.createVpcPeeringRoutes();
  }

}
