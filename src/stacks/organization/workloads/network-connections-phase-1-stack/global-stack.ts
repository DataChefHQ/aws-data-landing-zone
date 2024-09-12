import * as assert from 'assert';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { DlzStack, NetworkEntity } from '../../../../constructs/index';
import { DataLandingZoneProps, NetworkConnectionVpcPeering, WorkloadAccountProps } from '../../../../data-landing-zone';

import { SSM_PARAMETERS_DLZ } from '../../constants';
import { networkEntities, vpcPeeringRoleKeys } from '../network-entities';


export class WorkloadGlobalNetworkConnectionsPhase1Stack extends DlzStack {

  /*
  * Only create the peering role in the destination Account.
  * 1. Loop over all accounts, no matter the region.
  *   2. Loop over all VPC Peering connections
  *   3. Get the SourceNetworkEntity, matching on Account, there can be more than 1 Network entitiy but all of these
  *      NetworkEntities will have the same account information. That is all we are interested in, so always take the first.
  *   3. Get the DestinationNetworkEntity, same as above, can take the first.
  *   4. We should only create the peering role in the destination account. If the current stack ID does match the destination account ID, create the role.
  *
  *  */

  // TODO: Not needed anymore, think maybe add as tag, can also have longer string, actuallly just use the two addresses then? Or put as tags sepreatly then no issue of length
  // function verifyConnectionName(name: string)
  // {
  //   // -4 because of stack name prefix of 'dlz-'
  //   // -4 because all resources will have a short prefix for that resource like 'vpr-'
  //   if (connection.name.length > 54) {
  //     throw new Error(`VPC Peering Connection name" '${connection.name}' is too long, the maximum length is 54 characters.`);
  //   }
  // }

  constructor(scope: Construct, stackProps: WorkloadAccountProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    for (const connection of this.props.network?.connections.vpcPeering || []) {

      /* A connection can return more than 1 NetworkEntities, but all of these NetworkEntities will have the same
       * account information. That is all we are interested in, so always take the first. */
      const vpcSourceNes = networkEntities.getEntitiesForAddress(connection.source, 'account');
      assert.ok(vpcSourceNes && vpcSourceNes.length !== 0, `No Network Entities found for ${connection.source}`);
      const vpcSourceNe = vpcSourceNes[0];

      const vpcDestinationNes = networkEntities.getEntitiesForAddress(connection.destination, 'account');
      assert.ok(vpcDestinationNes && vpcDestinationNes.length !== 0, `No Network Entities found for ${connection.destination}`);
      const vpcDestinationNe = vpcDestinationNes[0];

      /* Only create the peering role in the destination account. */
      if (this.accountId !== vpcDestinationNe.dlzAccount.accountId) {
        continue;
      }

      if (connection.direction === 'source-to-destination') {
        this.createPeeringRole(connection, vpcSourceNe, vpcDestinationNe);
      } else {
        this.createPeeringRole(connection, vpcSourceNe, vpcDestinationNe);
        this.createPeeringRole(connection, vpcDestinationNe, vpcSourceNe);
      }
    }

    new sns.Topic(this, this.resourceName('test-topic'), {
      displayName: this.resourceName('test-topic'),
      topicName: this.resourceName('test-topic'),
    });
  }


  createPeeringRole (connection: NetworkConnectionVpcPeering, fromNetworkEntity: NetworkEntity, toNetworkEntity: NetworkEntity) {
    console.log(`Creating VPC Peering connection role '${connection.name}' between account '${fromNetworkEntity.dlzAccount.name}' and '${toNetworkEntity.dlzAccount.name}'`);

    const peeringRoleName = this.resourceName(`vpc-peering-role-for-${fromNetworkEntity.dlzAccount.name}`);
    const vpcPeeringRolesKey = `${fromNetworkEntity.dlzAccount.accountId}-${toNetworkEntity.dlzAccount.accountId}`;

    /* Do not create a role if one already exists between accounts */
    if (vpcPeeringRoleKeys.includes(vpcPeeringRolesKey)) {
      return;
    }

    console.log(`Creating VPC Peering role '${peeringRoleName}' between account '${fromNetworkEntity.dlzAccount.name}' and '${toNetworkEntity.dlzAccount.name}'`);

    const role = new iam.Role(this, peeringRoleName, {
      roleName: peeringRoleName,
      description: `VPC Peering Role for ${fromNetworkEntity.dlzAccount.name}' to '${toNetworkEntity.dlzAccount.name}'`,
      assumedBy: new iam.AccountPrincipal(fromNetworkEntity.dlzAccount.accountId),
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
    vpcPeeringRoleKeys.push(vpcPeeringRolesKey);

    new ssm.StringParameter(this, this.resourceName(`vpc-peering-role-arn--${vpcPeeringRolesKey}`), {
      parameterName: `${SSM_PARAMETERS_DLZ.NETWORKING_VPC_PEERING_ROLE_PREFIX}${vpcPeeringRolesKey}`,
      stringValue: role.roleArn,
    });

  }
}

