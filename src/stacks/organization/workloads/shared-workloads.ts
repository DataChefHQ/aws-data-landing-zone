import {DataLandingZoneProps} from "../../../data-landing-zone";
import {DlzStack} from "../../../constructs";
import {SharedOrganization} from "../shared-organization";

export class SharedWorkloads {
  constructor(private stack: DlzStack, private props: DataLandingZoneProps) {
     new SharedOrganization(this.stack, this.props);
  }
}