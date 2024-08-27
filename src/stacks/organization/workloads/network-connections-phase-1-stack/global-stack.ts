import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { DlzStack } from '../../../../constructs/index';
import { DataLandingZoneProps, WorkloadAccountProps } from '../../../../data-landing-zone';

import * as iam from "aws-cdk-lib/aws-iam";

import {networkEntities, vpcPeeringRoles} from "../network-entities";


export class WorkloadGlobalNetworkConnectionsPhase1Stack extends DlzStack {

  constructor(scope: Construct, stackProps: WorkloadAccountProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    for (const connection of this.props.network?.connections.vpcPeering || [])
    {
      // -4 because of stack name prefix of 'dlz-'
      // -4 because all resources will have a short prefix for that resource like 'vpr-'
      if (connection.name.length > 54) {
        throw new Error(`VPC Peering Connection name" '${connection.name}' is too long, the maximum length is 54 characters.`);
      }

      const vpcSourceNetworkEntities = networkEntities.getEntitiesForAddress(connection.source, "vpc");
      if (!vpcSourceNetworkEntities?.length) {
        throw new Error(`No VPCs found for VPC Peering source ${connection.source}`);
      }

      for (const vpcSourceNetworkEntity of vpcSourceNetworkEntities) {
        const vpcDestinationNetworkEntities = networkEntities.getEntitiesForAddress(connection.destination, "vpc");
        if (!vpcDestinationNetworkEntities?.length) {
          throw new Error(`No VPCs found for VPC Peering destination ${connection.destination}`);
        }

        for (const vpcDestinationNetworkEntity of vpcDestinationNetworkEntities) {

          console.log(`Creating VPC Peering connection role '${connection.name}' between '${vpcSourceNetworkEntity.vpc.address}' and '${vpcDestinationNetworkEntity.vpc.address}'`)

          const peeringRoleName = this.resourceName(`vpc-peering-role-for-${vpcSourceNetworkEntity.vpc.address.account}`);
          const vpcPeeringRolesKey = `${vpcSourceNetworkEntity.dlzAccount.accountId}-${vpcDestinationNetworkEntity.dlzAccount.accountId}`;

          /* Do not create a role if one already exists between accounts */
          if (vpcPeeringRoles[vpcPeeringRolesKey]) {
            continue;
          }

          /* Only create on the destination account */
          if (vpcDestinationNetworkEntity.dlzAccount.accountId !== this.accountId) {
            console.log(`Skipping VPC Peering connection role '${connection.name}' between '${vpcSourceNetworkEntity.vpc.address}' and '${vpcDestinationNetworkEntity.vpc.address}'`)
            console.log(`Destination account id ${vpcDestinationNetworkEntity.dlzAccount.accountId} does not match this account id ${this.accountId}`)
            continue;
          }
          console.log(`Creating VPC Peering role '${peeringRoleName}' between '${vpcSourceNetworkEntity.vpc.address}' and '${vpcDestinationNetworkEntity.vpc.address}'`)
          vpcPeeringRoles[vpcPeeringRolesKey] = new iam.Role(this, peeringRoleName, {
            roleName: peeringRoleName,
            description: `VPC Peering Role for ${vpcSourceNetworkEntity.vpc.address} to ${vpcDestinationNetworkEntity.vpc.address}`,
            assumedBy: new iam.AccountPrincipal(vpcSourceNetworkEntity.dlzAccount.accountId),
            inlinePolicies: {
              "vpc-peering": new iam.PolicyDocument({
                statements: [
                  new iam.PolicyStatement({
                    actions: [
                      "ec2:AcceptVpcPeeringConnection"
                    ],
                    resources: ["*"]
                  })
                ]
              })
            }
          })
        }
      }
    }

    new sns.Topic(this, this.resourceName('test-topic'), {
      displayName: this.resourceName('test-topic'),
      topicName: this.resourceName('test-topic'),
    });
  }
}
