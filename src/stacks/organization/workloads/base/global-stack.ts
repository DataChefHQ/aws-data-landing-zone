import * as iam from 'aws-cdk-lib/aws-iam';
import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { Shared } from './shared';
import { DlzStack } from '../../../../constructs';
import { DataLandingZoneProps, WorkloadAccountProps } from '../../../../data-landing-zone';
import { SSM_ASSUME_CROSS_ACCOUNT_ROLE_NAME, SSM_PARAMETER_DLZ_PREFIX } from '../../constants';


export class WorkloadGlobalStack extends DlzStack {

  constructor(scope: Construct, stackProps: WorkloadAccountProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    const shared = new Shared(this, this.props, stackProps.dlzAccount);
    shared.configRuleRequiredTags();
    shared.createVpcs();

    this.ssmAssumeCrossAccountRole();

    new sns.Topic(this, this.resourceName('test-topic'), {
      displayName: this.resourceName('test-topic'),
      topicName: this.resourceName('test-topic'),
    });
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

}
