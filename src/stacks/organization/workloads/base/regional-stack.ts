import { Construct } from 'constructs';
import { Shared } from './shared';
import { DlzStack } from '../../../../constructs';
import { IamPolicyPermissionBoundry } from '../../../../constructs/permission-boundary/iam-policy-permission-boundary';
import { DataLandingZoneProps, WorkloadAccountProps } from '../../../../data-landing-zone';

export class WorkloadRegionalStack extends DlzStack {

  constructor(scope: Construct, workloadAccountProps: WorkloadAccountProps, private props: DataLandingZoneProps) {
    super(scope, workloadAccountProps);

    const shared = new Shared(this, this.props, workloadAccountProps.dlzAccount, workloadAccountProps.globalVariables);
    shared.configRuleRequiredTags();
    shared.createVpcs();

    this.permissionBoundaryPolicy();
  }

  permissionBoundaryPolicy() {
    if (this.props.iamPolicyPermissionBoundry) IamPolicyPermissionBoundry.createParameter(this);
  }
}
