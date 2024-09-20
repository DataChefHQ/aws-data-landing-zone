import * as ec2 from 'aws-cdk-lib/aws-ec2';
import {DlzAccountNetwork, DlzSsmReader, DlzStack, NetworkEntityVpc} from '../../../../constructs/index';
import {DataLandingZoneProps} from "../../../../data-landing-zone";
import {dlzAccountNetworks} from "../network-entities";
import {SSM_PARAMETERS_DLZ} from "../../constants";
import {DlzSsmReaderStackCache} from "../../../../constructs/dlz-ssm-reader/dlz-ssm-reader-stack-cache";

/* To not create duplicate peering connections */
let peeringConnections: {[key: string]: ec2.CfnVPCPeeringConnection} = {};

/* Reduce the number of SSM readers, only create them if they do not exist for that key
 * This applies only if multiple SSM readers are used with the same key in the same stack, which we are */
let ownerVpcIds: DlzSsmReaderStackCache = new DlzSsmReaderStackCache();
let peeringRoleArns: DlzSsmReaderStackCache = new DlzSsmReaderStackCache();
let routeTablesSsmCache: DlzSsmReaderStackCache = new DlzSsmReaderStackCache();

export class Shared {

  constructor(private stack: DlzStack ,private props: DataLandingZoneProps) {
  }

  createVpcPeeringConnectionsAndRoutes() {

    for (const connection of this.props.network?.connections.vpcPeering || []) {
      const sourceAccountNetworks = dlzAccountNetworks.getEntitiesForAddress(connection.source); // No `matchOnAddress`, can be region, vpc, segment,or subnet.
      if (!sourceAccountNetworks?.length) {
        throw new Error(`No DlzAccountNetworks found for VPC Peering source ${connection.source}`);
      }

      const destinationAccountNetworks = dlzAccountNetworks.getEntitiesForAddress(connection.destination); // No `matchOnAddress`, can be region, vpc, segment,or subnet.
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
            this.connectVpcs(sourceAccountNetwork, vpcDestinationNetworkEntity);
          } else {
            // const sourceToDestPeeringConnectionId = this.createPeeringConnection(ssmGlobalReader, vpcSourceNetworkEntity, vpcDestinationNetworkEntity);
            // this.createRoute(connection, vpcSourceNetworkEntity, vpcDestinationNetworkEntity, sourceToDestPeeringConnectionId);
            //
            // const destToSourcePeeringConnectionId = this.createPeeringConnection(ssmGlobalReader, vpcSourceNetworkEntity, vpcDestinationNetworkEntity);
            // this.createRoute(connection, vpcDestinationNetworkEntity, vpcSourceNetworkEntity, destToSourcePeeringConnectionId);
          }
        }


      }
    }
  }


  private connectVpcs(from: DlzAccountNetwork, to: DlzAccountNetwork) {
    /* Only create/retrieve a peeringConnection if it is for a different account (aka the source/requester)  */
    if (this.stack.account === to.dlzAccount.accountId) {return;}
    for (const fromVpc of from.vpcs) {
      for (const toVpc of to.vpcs) {
        //@ts-ignore
        const peeringConnectionId = this.getOrCreatePeeringConnection(
          from.dlzAccount.accountId,
          fromVpc,
          to.dlzAccount.accountId,
          toVpc
        );
        this.createRoutes(fromVpc, toVpc, peeringConnectionId);
      }
    }
  }

  private getOrCreatePeeringConnection(fromAccountId: string, fromVpc: NetworkEntityVpc, toAccountId: string, toVpc: NetworkEntityVpc) {
    /* Only create a peeringConnection if it has not been created before  */
    const vpcPeeringConnectionKey = `${fromVpc.address}-to-${toVpc.address}`;
    let peeringConnection: ec2.CfnVPCPeeringConnection | undefined = peeringConnections[vpcPeeringConnectionKey];
    if (peeringConnection) {
      return peeringConnection.attrId;
    }

    console.log(`Creating VPC Peering between VPC '${fromVpc.address}' and '${toVpc.address}'`);

    const peerRoleArn = this.getPeerRoleArn(fromAccountId, toAccountId);

    const vpcId = ownerVpcIds.getValue(
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

    peeringConnections[vpcPeeringConnectionKey] = new ec2.CfnVPCPeeringConnection(
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

    return peeringConnections[vpcPeeringConnectionKey].attrId;
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
    return peeringRoleArns.getValue(
      this.stack,
      'PeerRoleArn--'+vpcPeeringRolesKey,
      toAccountId,
      this.props.regions.global,
      `${SSM_PARAMETERS_DLZ.NETWORKING_VPC_PEERING_ROLE_PREFIX}${vpcPeeringRolesKey}`,
    );
  }

  private createRoutes(fromVpc: NetworkEntityVpc, toVpc: NetworkEntityVpc, peeringConnectionId: string) {

    // TODO: Only in acceptor?

    console.log(`Creating VPC Peering routes between '${fromVpc.address}' and '${toVpc.address}'`);

    for (const fromRouteTable of fromVpc.routeTables) {
      for (const toRouteTable of toVpc.routeTables) {
        for (const toSubnet of toRouteTable.subnets!) {
          const routeLogicalId = `vpc-peering-route-from--${fromRouteTable.address}--to--${toRouteTable.address}-${toSubnet.subnet.cidrBlock}`;
          console.log(routeLogicalId);


          const routeTableId = routeTablesSsmCache.getValue(
            this.stack,
            `RouteTableId--${routeLogicalId}`,
            this.stack.accountId, //Same account
            this.stack.region, //Same account
            `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${fromRouteTable.address}/id`,
          );

          new ec2.CfnRoute(this.stack, this.stack.resourceName(routeLogicalId),
            {
              routeTableId: routeTableId,
              destinationCidrBlock: toSubnet.subnet.cidrBlock,
              vpcPeeringConnectionId: peeringConnectionId
            });
        }
      }
    }
  }

}
