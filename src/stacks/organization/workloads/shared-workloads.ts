import { DlzStack } from '../../../constructs';
import { DataLandingZoneProps, DLzAccount } from '../../../data-landing-zone';
import { SharedOrganization } from '../shared-organization';

export class SharedWorkloads {
  constructor(private stack: DlzStack, private props: DataLandingZoneProps, private dlzAccount: DLzAccount) {
    const sharedOrg = new SharedOrganization(this.stack, this.props);

    sharedOrg.configRules();

    const vpcsForRegion = this.dlzAccount.vpcs.filter(vpc => vpc.region === this.stack.region);
    sharedOrg.createVpcs(dlzAccount, vpcsForRegion);
  }
}