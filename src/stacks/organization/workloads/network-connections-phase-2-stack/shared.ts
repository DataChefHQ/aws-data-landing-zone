import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { DlzSsmReader, DlzStack, NetworkEntityVpc } from '../../../../constructs/index';
import { DataLandingZoneProps, GlobalVariables } from '../../../../data-landing-zone-types';
import { Logger } from '../../../../lib/logger';
import { SSM_PARAMETERS_DLZ } from '../../constants';

export class Shared {

  constructor(private stack: DlzStack, private props: DataLandingZoneProps, private globals: GlobalVariables) {
  }

  createVpcPeeringConnections() {
    for (const connection of this.props.network?.connections?.vpcPeering || []) {
      const sourceAccountNetworks = this.globals.dlzAccountNetworks.getEntitiesForAddress(connection.source); // No `matchOnAddress`, can be region, vpc, routeTable,or subnet.
      if (!sourceAccountNetworks?.length) {
        throw new Error(`No DlzAccountNetworks found for VPC Peering source ${connection.source}`);
      }

      const destinationAccountNetworks = this.globals.dlzAccountNetworks.getEntitiesForAddress(connection.destination); // No `matchOnAddress`, can be region, vpc, routeTable,or subnet.
      if (!destinationAccountNetworks?.length) {
        throw new Error(`No DlzAccountNetworks found for VPC Peering destination ${connection.destination}`);
      }

      for (const sourceAccountNetwork of sourceAccountNetworks) {
        for (const destinationNetwork of destinationAccountNetworks) {

          for (const sourceVpc of sourceAccountNetwork.vpcs) {
            for (const destinationVpc of destinationNetwork.vpcs) {
              this.createPeeringConnection(
                sourceAccountNetwork.dlzAccount.accountId,
                sourceVpc,
                destinationNetwork.dlzAccount.accountId,
                destinationVpc,
              );
            }
          }

        }

      }
    }
  }


  /**
   * Returns undefined if the Peering Connection has been created between the accounts
   * @param fromAccountId
   * @param fromVpc
   * @param toAccountId
   * @param toVpc
   * @private
   */
  private createPeeringConnection(fromAccountId: string, fromVpc: NetworkEntityVpc, toAccountId: string, toVpc: NetworkEntityVpc) {

    /* Only create peering connections in the source account and region */
    if (this.stack.account !== fromAccountId || this.stack.region !== fromVpc.address.region) {
      return;
    }

    /* Only create a peeringConnection if it has not been created before  */
    const vpcPeeringConnectionKey = `${fromVpc.address}-to-${toVpc.address}`;
    let peeringConnection: ec2.CfnVPCPeeringConnection | undefined = this.globals.ncp2.peeringConnections[vpcPeeringConnectionKey];
    if (peeringConnection) {
      return undefined;
    }

    Logger.debug(`${this.stack.id} Creating VPC Peering between VPC '${fromVpc.address}' and '${toVpc.address}'`);
    const peerRoleArn = this.getPeerRoleArn(fromAccountId, toAccountId);

    const vpcId = this.globals.ncp2.ownerVpcIds.getValue(
      this.stack,
      `VpcId--${vpcPeeringConnectionKey}`,
      this.stack.accountId, //Same account
      this.stack.region, //Same account
      `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${fromVpc.address}/id`,
    );
    const peerOwnerId = toAccountId;
    const peerRegion = toVpc.address.region;
    const peerVpcId = DlzSsmReader.getValue(
      this.stack,
      `PeerVpcId--${vpcPeeringConnectionKey}`,
      toAccountId,
      toVpc.address.region!, // VPC was created in base/regional stack, the ssm param is stored there
      `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${toVpc.address}/id`,
    );

    this.globals.ncp2.peeringConnections[vpcPeeringConnectionKey] = new ec2.CfnVPCPeeringConnection(
      this.stack,
      this.stack.resourceName(`vpc-peering-connection--${vpcPeeringConnectionKey}`),
      {
        vpcId,
        peerVpcId,
        peerOwnerId,
        peerRegion,
        peerRoleArn,
        tags: [
          {
            key: 'Name',
            value: vpcPeeringConnectionKey,
          },
        ],
      },
    );
    peeringConnection = this.globals.ncp2.peeringConnections[vpcPeeringConnectionKey];

    if (peeringConnection) {
      new ssm.StringParameter(this.stack, this.stack.resourceName(`network-entity--${fromVpc.address}-${toVpc.address}-id`), {
        parameterName: `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${fromVpc.address}/peer/${toVpc.address}/id`,
        stringValue: peeringConnection.attrId,
      });
    }
  }


  /**
   * Get the peer role ARN for the VPC Peering connection if the peering request is from a different account.
   * If the peering request is from the same account, return undefined.
   * @param fromAccountId
   * @param toAccountId
   * @private
   */
  private getPeerRoleArn(fromAccountId: string, toAccountId: string) {
    /* Do not create a Peering connection if in the same account */
    if (fromAccountId === toAccountId) {
      return undefined;
    }

    const vpcPeeringRolesKey = `${fromAccountId}-${toAccountId}`;
    return this.globals.ncp2.peeringRoleArns.getValue(
      this.stack,
      'PeerRoleArn--' + vpcPeeringRolesKey,
      toAccountId,
      this.props.regions.global,
      `${SSM_PARAMETERS_DLZ.NETWORKING_VPC_PEERING_ROLE_PREFIX}${vpcPeeringRolesKey}`,
    );
  }
}
