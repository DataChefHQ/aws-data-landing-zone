import * as ec2 from 'aws-cdk-lib/aws-ec2';
import {DlzAccountNetwork, DlzStack, NetworkEntityVpc} from '../../../../constructs/index';
import {DataLandingZoneProps, GlobalVariables} from "../../../../data-landing-zone";
import {SSM_PARAMETERS_DLZ} from "../../constants";


// /* Reduce the number of SSM readers, only create them if they do not exist for that key
//  * This applies only if multiple SSM readers are used with the same key in the same stack, which we are */
// let vpcPeeringConnectionIds: DlzSsmReaderStackCache = new DlzSsmReaderStackCache();
// let routeTablesSsmCache: DlzSsmReaderStackCache = new DlzSsmReaderStackCache();

export class Shared {

  constructor(private stack: DlzStack ,private props: DataLandingZoneProps, private globals: GlobalVariables) {
  }

  createVpcPeeringRoutes() {

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
        for (const vpcDestinationNetworkEntity of destinationAccountNetworks) {
          if (connection.direction === 'source-to-destination') {
            this.connectVpcs(sourceAccountNetwork, vpcDestinationNetworkEntity);
          } else {
            this.connectVpcs(sourceAccountNetwork, vpcDestinationNetworkEntity);
            this.connectVpcs(vpcDestinationNetworkEntity, sourceAccountNetwork);
          }
        }


      }
    }
  }


  private connectVpcs(from: DlzAccountNetwork, to: DlzAccountNetwork) {
    for (const fromVpc of from.vpcs) {
      /* Only create routes for the source account and region */
      if (this.stack.account !== from.dlzAccount.accountId || this.stack.region !== fromVpc.address.region) {
        return;
      }
      for (const toVpc of to.vpcs) {

        const peeringConnectionId = this.globals.ncp3.vpcPeeringConnectionIds.getValue(
          this.stack,
          `VpcPeeringConnectionId--${fromVpc.address}-${toVpc.address}`,
          from.dlzAccount.accountId, //Defied in the source account
          fromVpc.address.region!, //Defied in the source account region
          `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${fromVpc.address}/peer/${toVpc.address}/id`,
        );
        console.log(this.stack.id, this.stack.accountId, this.stack.region);
        this.createRoutes(fromVpc, toVpc, peeringConnectionId);
      }
    }
  }

  private createRoutes(fromVpc: NetworkEntityVpc, toVpc: NetworkEntityVpc, peeringConnectionId: string) {

    // TODO: Only in acceptor?

    console.log(`Creating VPC Peering routes between '${fromVpc.address}' and '${toVpc.address}'`);

    for (const fromRouteTable of fromVpc.routeTables) {
      for (const toRouteTable of toVpc.routeTables) {
        for (const toSubnet of toRouteTable.subnets!) {
          const routeLogicalId = `vpc-peering-route-from--${fromRouteTable.address}--to--${toRouteTable.address}-${toSubnet.subnet.cidrBlock}`;
          console.log(routeLogicalId);


          const routeTableId = this.globals.ncp3.routeTablesSsmCache.getValue(
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
