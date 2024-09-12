import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { DlzSsmReader } from '../../../../constructs/dlz-ssm-reader';
import { DlzStack, NetworkEntity } from '../../../../constructs/index';
import { DataLandingZoneProps, WorkloadAccountProps } from '../../../../data-landing-zone';

import { SSM_PARAMETERS_DLZ } from '../../constants';
import { networkEntities, peeringConnections } from '../network-entities';


export class WorkloadGlobalNetworkConnectionsPhase2Stack extends DlzStack {

  constructor(scope: Construct, stackProps: WorkloadAccountProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    for (const connection of this.props.network?.connections.vpcPeering || []) {
      const vpcSourceNetworkEntities = networkEntities.getEntitiesForAddress(connection.source); // No `matchOnAddress`, can be region, vpc, segment,or subnet.
      if (!vpcSourceNetworkEntities?.length) {
        throw new Error(`No NetworkEntities found for VPC Peering source ${connection.source}`);
      }

      for (const vpcSourceNetworkEntity of vpcSourceNetworkEntities) {

        // /* Only do in Source */ //TODO: Create Account Guard
        // if (vpcSourceNetworkEntity.dlzAccount.accountId !== this.accountId) {
        //   console.log(`Source account does not match this stack accountId`)
        //   return;
        // }

        const vpcDestinationNetworkEntities = networkEntities.getEntitiesForAddress(connection.destination); // No `matchOnAddress`, can be region, vpc, segment,or subnet.
        if (!vpcDestinationNetworkEntities?.length) {
          throw new Error(`No NetworkEntities found for VPC Peering destination ${connection.destination}`);
        }

        for (const vpcDestinationNetworkEntity of vpcDestinationNetworkEntities) {

          if (connection.direction === 'source-to-destination') {
            const peeringConnectionId = this.createPeeringConnection(vpcSourceNetworkEntity, vpcDestinationNetworkEntity);
            console.log(peeringConnectionId);
            // this.createRoute(connection, vpcSourceNetworkEntity, vpcDestinationNetworkEntity, peeringConnectionId);
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

    new sns.Topic(this, this.resourceName('test-topic'), {
      displayName: this.resourceName('test-topic'),
      topicName: this.resourceName('test-topic'),
    });
  }


  private createPeeringConnection(vpcSourceNetworkEntity: NetworkEntity, vpcDestinationNetworkEntity: NetworkEntity) {

    /* Only create/retrieve a peeringConnection if it is for a different account (aka the source/requester)  */
    if (this.account === vpcDestinationNetworkEntity.dlzAccount.accountId) {return;}

    const ssmReaderCdkIdPrefix = `${vpcSourceNetworkEntity.dlzAccount.accountId}-${vpcSourceNetworkEntity.vpc.address.region}` +
    `--${vpcDestinationNetworkEntity.dlzAccount.accountId}-${vpcDestinationNetworkEntity.vpc.address.region}`;

    /* Get VPC Acceptor details */
    const vpcPeeringRolesKey = `${vpcSourceNetworkEntity.dlzAccount.accountId}-${vpcDestinationNetworkEntity.dlzAccount.accountId}`;
    const peerRoleArn = DlzSsmReader.getValue(
      this,
      ssmReaderCdkIdPrefix + 'PeerRoleArn',
      vpcDestinationNetworkEntity.dlzAccount.accountId,
      this.props.regions.global,
      `${SSM_PARAMETERS_DLZ.NETWORKING_VPC_PEERING_ROLE_PREFIX}${vpcPeeringRolesKey}`,
    );
    const peerVpcId = DlzSsmReader.getValue(
      this,
      ssmReaderCdkIdPrefix + 'PeerVpcId',
      vpcDestinationNetworkEntity.dlzAccount.accountId,
      vpcDestinationNetworkEntity.vpc.address.region!, // VPC was created in regional stack, the ssm param is stored there
      `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${vpcDestinationNetworkEntity.vpc.address}/id`,
    );

    // /* Get Requestor VPC ID */
    // const vpcId = DlzSsmReader.getValue(
    //   this,
    //   ssmReaderCdkIdPrefix + "VpcId",
    //   vpcSourceNetworkEntity.dlzAccount.accountId,
    //   vpcSourceNetworkEntity.vpc.address.region!, // VPC was created in regional stack, the ssm param is stored there
    //   `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${vpcSourceNetworkEntity.vpc.address}/id`
    // );

    const vpcId = vpcSourceNetworkEntity.vpc.vpc.attrVpcId; //This also a SSM. ?? hmm okay... why...?
    const peerOwnerId = vpcDestinationNetworkEntity.dlzAccount.accountId;
    const peerRegion = vpcDestinationNetworkEntity.vpc.address.region;

    /* Only create a peeringConnection if it has not been created before  */
    const vpcPeeringConnectionKey = `${vpcSourceNetworkEntity.vpc.address}-to-${vpcDestinationNetworkEntity.vpc.address}`;
    let peeringConnection: ec2.CfnVPCPeeringConnection | undefined = peeringConnections[vpcPeeringConnectionKey];
    if (peeringConnection) {
      return peeringConnection.attrId;
    }

    peeringConnections[vpcPeeringConnectionKey] = new ec2.CfnVPCPeeringConnection(
      this,
      this.resourceName(`vpc-peering-connection--${vpcPeeringConnectionKey}`),
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

  // private createRoute(connection:  NetworkConnectionVpcPeering, vpcSourceNetworkEntity: NetworkEntity, vpcDestinationNetworkEntity: NetworkEntity, peeringConnectionId?: string) {
  //
  //   // TODO: Only in acceptor?
  //
  //   console.log(`Creating VPC Peering route for '${connection.name}' between '${vpcSourceNetworkEntity.vpc.address}' and '${vpcDestinationNetworkEntity.vpc.address}'`)
  //
  //   for(const sourceRouteTableEntity of vpcSourceNetworkEntity.routeTables){
  //
  //     for(const destinationSubnetEntity of vpcDestinationNetworkEntity.subnets!)
  //     {
  //       console.log(sourceRouteTableEntity.routeTable.attrRouteTableId);
  //       const routeLogicalId = `vpc-peering-route-to--${sourceRouteTableEntity.address}--${destinationSubnetEntity.address}--${destinationSubnetEntity.subnet.cidrBlock}`;
  //       console.log(">>", routeLogicalId);
  //
  //       console.log(this.account, vpcSourceNetworkEntity.routeTables["0"].routeTable.stack.account);
  //       new ec2.CfnRoute(this, this.resourceName(routeLogicalId),
  //         {
  //           routeTableId: sourceRouteTableEntity.routeTable.attrRouteTableId,
  //           destinationCidrBlock: destinationSubnetEntity.subnet.cidrBlock,
  //           vpcPeeringConnectionId: peeringConnectionId
  //         });
  //     }
  //   }
  // }

}
