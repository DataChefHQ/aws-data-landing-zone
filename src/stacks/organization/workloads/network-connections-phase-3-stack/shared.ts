import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { DlzStack, NetworkEntityVpc } from '../../../../constructs/index';
import { DataLandingZoneProps, GlobalVariables } from '../../../../data-landing-zone-types';
import { Logger } from '../../../../lib/logger';
import { SSM_PARAMETERS_DLZ } from '../../constants';

type SourcePeeringConnectionProps = {
  sourceAccountId: string;
  sourceRegion: string;
  sourceVpc: NetworkEntityVpc;
  destinationVpc: NetworkEntityVpc;
}

export class Shared {

  constructor(private stack: DlzStack, private props: DataLandingZoneProps, private globals: GlobalVariables) {
  }

  createVpcPeeringRoutes() {

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
        for (const destinationAccountNetwork of destinationAccountNetworks) {

          for (const sourceVpc of sourceAccountNetwork.vpcs) {
            for (const destinationVpc of destinationAccountNetwork.vpcs) {
              /* Must be bidirectional */
              const sourcePeeringConnection: SourcePeeringConnectionProps = {
                sourceAccountId: sourceAccountNetwork.dlzAccount.accountId,
                sourceRegion: sourceVpc.address.region!,
                sourceVpc: sourceVpc,
                destinationVpc: destinationVpc,
              };
              this.createRoutes(sourceAccountNetwork.dlzAccount.accountId, sourcePeeringConnection, sourceVpc, destinationVpc);
              this.createRoutes(destinationAccountNetwork.dlzAccount.accountId, sourcePeeringConnection, destinationVpc, sourceVpc);
            }
          }

        }
      }
    }
  }


  private createRoutes(fromAccountId: string, sourcePeeringConnection: SourcePeeringConnectionProps,
    fromVpc: NetworkEntityVpc, toVpc: NetworkEntityVpc) {
    /* Only create routes when we are in the source account and region stacks */
    if (this.stack.account !== fromAccountId || this.stack.region !== fromVpc.address.region) {
      return;
    }

    /* The same VPC Connection ID should be used in the destination */
    const peeringConnectionId = this.globals.ncp3.vpcPeeringConnectionIds.getValue(
      this.stack,
      `VpcPeeringConnectionId--${sourcePeeringConnection.sourceVpc.address}-${sourcePeeringConnection.destinationVpc.address}`,
      sourcePeeringConnection.sourceAccountId,
      sourcePeeringConnection.sourceRegion,
      `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${sourcePeeringConnection.sourceVpc.address}/peer/${sourcePeeringConnection.destinationVpc.address}/id`,
    );

    Logger.debug(`Creating VPC Peering routes between '${fromVpc.address}' and '${toVpc.address}'`);
    for (const fromRouteTable of fromVpc.routeTables) {
      for (const toRouteTable of toVpc.routeTables) {
        for (const toSubnet of toRouteTable.subnets!) {
          const routeLogicalId = `vpc-peering-route-from--${fromRouteTable.address}--to--${toRouteTable.address}-${toSubnet.subnet.cidrBlock}`;
          Logger.debug(this.stack.id, routeLogicalId);

          const routeTableId = this.globals.ncp3.routeTablesSsmCache.getValue(
            this.stack,
            `RouteTableId--${routeLogicalId}`,
            fromAccountId,
            fromVpc.address.region!,
            `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${fromRouteTable.address}/id`,
          );

          new ec2.CfnRoute(this.stack, this.stack.resourceName(routeLogicalId), {
            routeTableId: routeTableId,
            destinationCidrBlock: toSubnet.subnet.cidrBlock,
            vpcPeeringConnectionId: peeringConnectionId,
          });
        }
      }
    }
  }

}
