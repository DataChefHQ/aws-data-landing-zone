import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import {DlzStack, NetworkEntity, NetworkEntitySsm, networkEntitySsmFromString} from '../../../../constructs/index';
import {DataLandingZoneProps, NetworkConnectionVpcPeering, WorkloadAccountProps} from '../../../../data-landing-zone';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

import {networkEntities, peeringConnections} from "../network-entities";
import {SsmCrossAccountAndRegionReader} from "../../../../constructs/ssm-global-reader";
import {SSM_PARAMETERS_DLZ} from "../../constants";




export class WorkloadGlobalNetworkConnectionsPhase2Stack extends DlzStack {

  private ssmDestinationGlobalReaders: {[key: string]: SsmCrossAccountAndRegionReader} = {};

  constructor(scope: Construct, stackProps: WorkloadAccountProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    for (const connection of this.props.network?.connections.vpcPeering || [])
    {
      const vpcSourceNetworkEntities = networkEntities.getEntitiesForAddress(connection.source); // No `matchOnAddress`, can be region, vpc, segment,or subnet.
      if (!vpcSourceNetworkEntities?.length) {
        throw new Error(`No NetworkEntities found for VPC Peering source ${connection.source}`);
      }

      for (const vpcSourceNetworkEntity of vpcSourceNetworkEntities) {

        /* Only do in Source */ //TODO: Create Account Guard
        if (vpcSourceNetworkEntity.dlzAccount.accountId !== this.accountId) {
          console.log(`Source account does not match this stack accountId`)
          return;
        }

        const vpcDestinationNetworkEntities = networkEntities.getEntitiesForAddress(connection.destination); // No `matchOnAddress`, can be region, vpc, segment,or subnet.
        if (!vpcDestinationNetworkEntities?.length) {
          throw new Error(`No NetworkEntities found for VPC Peering destination ${connection.destination}`);
        }

        for (const vpcDestinationNetworkEntity of vpcDestinationNetworkEntities) {

          Remove .getValue params
          Those must be in the constructor. Can not update custon resource params at rintime
          // TODO:  Must this be per region as well??
          /* Only create an SSMReader if it has not been created before for this source to destination account combination  */
          const ssmGlobalReaderKey = `${vpcSourceNetworkEntity.dlzAccount.accountId}-${vpcSourceNetworkEntity.vpc.address.region}--${vpcDestinationNetworkEntity.dlzAccount.accountId}-${vpcDestinationNetworkEntity.vpc.address.region}`;
          let ssmGlobalReader: SsmCrossAccountAndRegionReader;
          if(this.ssmDestinationGlobalReaders[ssmGlobalReaderKey])
          {
            ssmGlobalReader = this.ssmDestinationGlobalReaders[ssmGlobalReaderKey];
          }
          else {
            ssmGlobalReader = new SsmCrossAccountAndRegionReader(this, this.resourceName(`ssm-get-vpc-peer-details--${ssmGlobalReaderKey}`), {
              accountId: vpcDestinationNetworkEntity.dlzAccount.accountId,
              region: this.props.regions.global,
            });
          }

          if (connection.direction === "source-to-destination") {
            const peeringConnectionId = this.createPeeringConnection(ssmGlobalReader, vpcSourceNetworkEntity, vpcDestinationNetworkEntity)
            this.createRoute(connection, vpcSourceNetworkEntity, vpcDestinationNetworkEntity, peeringConnectionId);
          } else {
            const sourceToDestPeeringConnectionId = this.createPeeringConnection(ssmGlobalReader, vpcSourceNetworkEntity, vpcDestinationNetworkEntity);
            this.createRoute(connection, vpcSourceNetworkEntity, vpcDestinationNetworkEntity, sourceToDestPeeringConnectionId);

            const destToSourcePeeringConnectionId = this.createPeeringConnection(ssmGlobalReader, vpcSourceNetworkEntity, vpcDestinationNetworkEntity);
            this.createRoute(connection, vpcDestinationNetworkEntity, vpcSourceNetworkEntity, destToSourcePeeringConnectionId);
          }
        }
      }
    }

    new sns.Topic(this, this.resourceName('test-topic'), {
      displayName: this.resourceName('test-topic'),
      topicName: this.resourceName('test-topic'),
    });
  }


  private createPeeringConnection(ssmGlobalReader: SsmCrossAccountAndRegionReader, vpcSourceNetworkEntity: NetworkEntity, vpcDestinationNetworkEntity: NetworkEntity) {

    /* Only create/retrieve a peeringConnection if it is for a different account (aka the source/requester)  */
    if (this.account === vpcDestinationNetworkEntity.dlzAccount.accountId)
      return;

    /* Get VPC Acceptor details */
    const vpcPeeringRolesKey = `${vpcSourceNetworkEntity.dlzAccount.accountId}-${vpcDestinationNetworkEntity.dlzAccount.accountId}`;
    const peerRoleArn = ssmGlobalReader.getValue(`${SSM_PARAMETERS_DLZ.NETWORKING_VPC_PEERING_ROLE_PREFIX}${vpcPeeringRolesKey}`);

    const networkEntityAcceptorSsmString = ssmGlobalReader.getValue(`${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}${vpcDestinationNetworkEntity.vpc.address}`);
    const networkEntityAcceptorSsm: NetworkEntitySsm = networkEntitySsmFromString(networkEntityAcceptorSsmString);

    const vpcId = vpcSourceNetworkEntity.vpc.vpc.attrVpcId;
    const peerVpcId = networkEntityAcceptorSsm.vpc.vpcId;
    const peerOwnerId = vpcDestinationNetworkEntity.dlzAccount.accountId;
    const peerRegion = vpcDestinationNetworkEntity.vpc.address.region;

    /* Only create a peeringConnection if it has not been created before  */
    const vpcPeeringConnectionKey = `${vpcId}-${peerVpcId}-${peerOwnerId}-${peerRegion}`;
    let peeringConnection: ec2.CfnVPCPeeringConnection | undefined = peeringConnections[vpcPeeringConnectionKey];
    if (peeringConnection) {
      return peeringConnection.attrId;
    }

    console.log(`Creating VPC Peering connection '${vpcId}' to '${peerVpcId}' in '${peerRegion}'`)

    peeringConnection = new ec2.CfnVPCPeeringConnection(
      this,
      this.resourceName(`vpc-peering-connection--${vpcId}-${peerVpcId}-${peerOwnerId}-${peerRegion}-${peerRoleArn}`),
      {
        vpcId, peerVpcId, peerOwnerId, peerRegion, peerRoleArn,
        tags: [
          {
            key: 'Name',
            value: `${vpcId}-${peerVpcId}-${peerOwnerId}-${peerRegion}-${peerRoleArn}`
          }
        ]
      }
    )

    return peeringConnection.attrId;
  }

  private createRoute(connection:  NetworkConnectionVpcPeering, vpcSourceNetworkEntity: NetworkEntity, vpcDestinationNetworkEntity: NetworkEntity, peeringConnectionId?: string) {

    console.log(`Creating VPC Peering route '${connection.name}' between '${vpcSourceNetworkEntity.vpc.address}' and '${vpcDestinationNetworkEntity.vpc.address}'`)

    for(const sourceRouteTableEntity of vpcSourceNetworkEntity.routeTables){

      for(const destinationSubnetEntity of vpcDestinationNetworkEntity.subnets!)
      {
        console.log(sourceRouteTableEntity.routeTable.attrRouteTableId);
        const routeLogicalId = `vpc-peering-route-to--${sourceRouteTableEntity.address}--${destinationSubnetEntity.address}--${destinationSubnetEntity.subnet.cidrBlock}`;
        console.log(">>", routeLogicalId);

        console.log(this.account, vpcSourceNetworkEntity.routeTables["0"].routeTable.stack.account);
        new ec2.CfnRoute(this, this.resourceName(routeLogicalId),
          {
            routeTableId: sourceRouteTableEntity.routeTable.attrRouteTableId,
            destinationCidrBlock: destinationSubnetEntity.subnet.cidrBlock,
            vpcPeeringConnectionId: peeringConnectionId
          });

      }
    }
  }

}
