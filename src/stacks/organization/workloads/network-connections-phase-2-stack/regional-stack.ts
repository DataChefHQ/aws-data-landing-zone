import * as sns from 'aws-cdk-lib/aws-sns';
import { DlzStack} from '../../../../constructs/index';
import {DataLandingZoneProps, WorkloadAccountProps} from "../../../../data-landing-zone";
import {Construct} from "constructs";
import {Shared} from "./shared";

export class WorkloadRegionalNetworkConnectionsPhase2Stack extends DlzStack {

  constructor(scope: Construct, workloadAccountProps: WorkloadAccountProps, props: DataLandingZoneProps) {
    super(scope, workloadAccountProps);
    const shared = new Shared(this, props, workloadAccountProps.globalVariables);
    shared.createVpcPeeringConnections();

    new sns.Topic(this, this.resourceName('test-topic'), {
      displayName: this.resourceName('test-topic'),
      topicName: this.resourceName('test-topic'),
    });
  }

}
