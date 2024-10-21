import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { Shared } from './shared';
import { DlzStack } from '../../../../constructs';
import { IamPolicyPermissionBoundry } from '../../../../constructs/permission-boundary/iam-policy-permission-boundary';
import { DataLandingZoneProps, WorkloadAccountProps } from '../../../../data-landing-zone';
import { SSM_ASSUME_CROSS_ACCOUNT_ROLE_NAME, SSM_PARAMETER_DLZ_PREFIX } from '../../constants';

export class WorkloadGlobalStack extends DlzStack {

  constructor(scope: Construct, workloadAccountProps: WorkloadAccountProps, private props: DataLandingZoneProps) {
    super(scope, workloadAccountProps);

    const shared = new Shared(this, this.props, workloadAccountProps.dlzAccount, workloadAccountProps.globalVariables);
    shared.configRuleRequiredTags();
    shared.createVpcs();

    this.ssmAssumeCrossAccountRole();
    this.permissionBoundaryPolicy();
  }

  ssmAssumeCrossAccountRole() {
    new iam.Role(this, SSM_ASSUME_CROSS_ACCOUNT_ROLE_NAME, {
      roleName: SSM_ASSUME_CROSS_ACCOUNT_ROLE_NAME,
      description: 'Role to be assumed by other accounts to read SSM parameters im this account',
      assumedBy: new iam.OrganizationPrincipal(this.props.organization.organizationId),
      inlinePolicies: {
        ssmRead: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              actions: [
                'ssm:GetParameter',
              ],
              resources: [`arn:aws:ssm:*:${this.accountId}:parameter${SSM_PARAMETER_DLZ_PREFIX}*`],
            }),
          ],
        }),
      },
    });
  }

  permissionBoundaryPolicy() {
    if (this.props.iamPolicyPermissionBoundry) {
      new IamPolicyPermissionBoundry(this, this.props.iamPolicyPermissionBoundry);
    }
  }

}
