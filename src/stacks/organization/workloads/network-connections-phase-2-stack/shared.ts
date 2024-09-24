import * as ec2 from 'aws-cdk-lib/aws-ec2';
import {DlzAccountNetwork, DlzSsmReader, DlzStack, NetworkEntityVpc} from '../../../../constructs/index';
import {DataLandingZoneProps, GlobalVariables} from "../../../../data-landing-zone";
import {SSM_PARAMETERS_DLZ} from "../../constants";
// import {DlzSsmReaderStackCache} from "../../../../constructs/dlz-ssm-reader/dlz-ssm-reader-stack-cache";
import * as ssm from "aws-cdk-lib/aws-ssm";

// /* To not create duplicate peering connections */
// let peeringConnections: {[key: string]: ec2.CfnVPCPeeringConnection} = {};
//
// /* Reduce the number of SSM readers, only create them if they do not exist for that key
//  * This applies only if multiple SSM readers are used with the same key in the same stack, which we are */
// let ownerVpcIds: DlzSsmReaderStackCache = new DlzSsmReaderStackCache();
// let peeringRoleArns: DlzSsmReaderStackCache = new DlzSsmReaderStackCache();

export class Shared {

  constructor(private stack: DlzStack ,private props: DataLandingZoneProps, private globals: GlobalVariables) {
  }

  createVpcPeeringConnections() {

    for (const connection of this.props.network?.connections.vpcPeering || []) {
      const sourceAccountNetworks = this.globals.dlzAccountNetworks.getEntitiesForAddress(connection.source); // No `matchOnAddress`, can be region, vpc, segment,or subnet.
      if (!sourceAccountNetworks?.length) {
        throw new Error(`No DlzAccountNetworks found for VPC Peering source ${connection.source}`);
      }

      const destinationAccountNetworks = this.globals.dlzAccountNetworks.getEntitiesForAddress(connection.destination); // No `matchOnAddress`, can be region, vpc, segment,or subnet.
      if (!destinationAccountNetworks?.length) {
        throw new Error(`No DlzAccountNetworks found for VPC Peering destination ${connection.destination}`);
      }

      for (const sourceAccountNetwork of sourceAccountNetworks) {
        // /* Only do in Source */ //TODO: Create Account Guard
        // if (vpcSourceNetworkEntity.dlzAccount.accountId !== this.accountId) {
        //   console.log(`Source account does not match this stack accountId`)
        //   return;
        // }

        for (const vpcDestinationNetworkEntity of destinationAccountNetworks) {
          if (connection.direction === 'source-to-destination') {
            this.connectVpcs(this.stack, sourceAccountNetwork, vpcDestinationNetworkEntity);
          } else {
            this.connectVpcs(this.stack, sourceAccountNetwork, vpcDestinationNetworkEntity);
            this.connectVpcs(this.stack, vpcDestinationNetworkEntity, sourceAccountNetwork);
          }
        }


      }
    }
  }


  private connectVpcs(stack: DlzStack, from: DlzAccountNetwork, to: DlzAccountNetwork) {
    ///* Only create/retrieve a peeringConnection if it is for a different account (aka the source/requester)  */
    // if (this.stack.account === to.dlzAccount.accountId) {
    //   return;
    // } //TODO: Also check region like for routes?
    for (const fromVpc of from.vpcs) {
      /* Only create routes for the source account and region */
      if (this.stack.account !== from.dlzAccount.accountId || this.stack.region !== fromVpc.address.region) {
        return;
      }
      for (const toVpc of to.vpcs) {
        const peeringConnection = this.createPeeringConnection(
          from.dlzAccount.accountId,
          fromVpc,
          to.dlzAccount.accountId,
          toVpc
        );

        if(peeringConnection) {
          new ssm.StringParameter(stack, this.stack.resourceName(`network-entity--${fromVpc.address}-${toVpc.address}-id`), {
            parameterName: `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${fromVpc.address}/peer/${toVpc.address}/id`,
            stringValue: peeringConnection.attrId,
          });
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
    /* Only create a peeringConnection if it has not been created before  */
    const vpcPeeringConnectionKey = `${fromVpc.address}-to-${toVpc.address}`;
    let peeringConnection: ec2.CfnVPCPeeringConnection | undefined = this.globals.ncp2.peeringConnections[vpcPeeringConnectionKey];
    if (peeringConnection) {
      return undefined;
    }

    console.log(`${this.stack.id} Creating VPC Peering between VPC '${fromVpc.address}' and '${toVpc.address}'`);
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

    return this.globals.ncp2.peeringConnections[vpcPeeringConnectionKey];
  }


  /**
   * Get the peer role ARN for the VPC Peering connection if the peering request is from a different account.
   * If the peering request is from the same account, return undefined.
   * @param fromAccountId
   * @param toAccountId
   * @private
   */
  private getPeerRoleArn(fromAccountId: string, toAccountId: string) {
    if(fromAccountId === toAccountId) {
      return undefined;
    }

    const vpcPeeringRolesKey = `${fromAccountId}-${toAccountId}`;
    return this.globals.ncp2.peeringRoleArns.getValue(
      this.stack,
      'PeerRoleArn--'+vpcPeeringRolesKey,
      toAccountId,
      this.props.regions.global,
      `${SSM_PARAMETERS_DLZ.NETWORKING_VPC_PEERING_ROLE_PREFIX}${vpcPeeringRolesKey}`,
    );
  }
}
