import * as assert from 'assert';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { DlzStack, DlzAccountNetwork } from '../../../../constructs/index';
import { DataLandingZoneProps, WorkloadAccountProps } from '../../../../data-landing-zone';
import { SSM_PARAMETERS_DLZ } from '../../constants';

export class WorkloadGlobalNetworkConnectionsPhase1Stack extends DlzStack {

  constructor(scope: Construct, private workloadAccountProps: WorkloadAccountProps, private props: DataLandingZoneProps) {
    super(scope, workloadAccountProps);

    for (const connection of this.props.network?.connections?.vpcPeering || []) {

      /* A connection can return more than 1 NetworkEntities, but all of these NetworkEntities will have the same
       * account information. That is all we are interested in, so always take the first. */
      const sourceAccountNetworks = workloadAccountProps.globalVariables.dlzAccountNetworks.getEntitiesForAddress(connection.source, 'account');
      assert.ok(sourceAccountNetworks && sourceAccountNetworks.length !== 0, `No Network Entities found for ${connection.source}`);
      const sourceAccountNetwork = sourceAccountNetworks[0];

      const destinationAccountNetworks = workloadAccountProps.globalVariables.dlzAccountNetworks.getEntitiesForAddress(connection.destination, 'account');
      assert.ok(destinationAccountNetworks && destinationAccountNetworks.length !== 0, `No Network Entities found for ${connection.destination}`);
      const destinationAccountNetwork = destinationAccountNetworks[0];

      this.createPeeringRole(sourceAccountNetwork, destinationAccountNetwork);
    }
  }

  createPeeringRole (from: DlzAccountNetwork, to: DlzAccountNetwork) {

    /* Only create the peering role in the destination account. */
    if (this.accountId !== to.dlzAccount.accountId) {
      return;
    }

    /* Do not create a Role if in the same account */
    if (from.dlzAccount.accountId === to.dlzAccount.accountId) {
      return;
    }

    const peeringRoleName = this.resourceName(`vpc-peering-role-for-${from.dlzAccount.name}`);
    const vpcPeeringRolesKey = `${from.dlzAccount.accountId}-${to.dlzAccount.accountId}`;

    /* Do not create a role if one already exists between accounts */
    if (this.workloadAccountProps.globalVariables.ncp1.vpcPeeringRoleKeys.includes(vpcPeeringRolesKey)) {
      return;
    }

    console.log(`${this.id} Creating VPC Peering role '${peeringRoleName}' between account '${from.dlzAccount.name}' and '${to.dlzAccount.name}'`);
    const role = new iam.Role(this, peeringRoleName, {
      roleName: peeringRoleName,
      description: `VPC Peering Role for '${from.dlzAccount.name}' to '${to.dlzAccount.name}'`,
      assumedBy: new iam.AccountPrincipal(from.dlzAccount.accountId),
      inlinePolicies: {
        'vpc-peering': new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              actions: [
                'ec2:AcceptVpcPeeringConnection',
              ],
              resources: ['*'],
            }),
          ],
        }),
      },
    },
    );
    this.workloadAccountProps.globalVariables.ncp1.vpcPeeringRoleKeys.push(vpcPeeringRolesKey);

    new ssm.StringParameter(this, this.resourceName(`vpc-peering-role-arn--${vpcPeeringRolesKey}`), {
      parameterName: `${SSM_PARAMETERS_DLZ.NETWORKING_VPC_PEERING_ROLE_PREFIX}${vpcPeeringRolesKey}`,
      stringValue: role.roleArn,
    });
  }
}

