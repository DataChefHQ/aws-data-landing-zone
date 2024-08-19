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
      const sourceVpcs = networkEntities.getVpcEntitiesForAddress(connection.source);
      if (!sourceVpcs?.length) {
        throw new Error(`No VPCs found for VPC Peering source ${connection.source}`);
      }
      if (sourceVpcs.length > 1) {
        throw new Error(`Multiple VPCs found for VPC Peering source ${connection.source}`);
      }
      const sourceVpc = sourceVpcs[0];

      const destinationtVpcs = networkEntities.getVpcEntitiesForAddress(connection.destination);
      if (!destinationtVpcs?.length) {
        throw new Error(`No VPCs found for VPC Peering destination ${connection.destination}`);
      }

      for(const destinationtVpc of destinationtVpcs) {

        console.log(`Creating VPC Peering connection role '${connection.name}' between '${sourceVpc.vpc.address}' and '${destinationtVpc.vpc.address}'`)

        /* Abbreviate vpc-peer-rule as vpr- */
        const peeringRoleName = this.resourceName(`vpr-${sourceVpc.vpc.address}-${destinationtVpc.vpc.address}`);
        if (peeringRoleName.length > 64) {
          throw new Error(`VPC Peering Role name ${peeringRoleName} is too long`);
        }

        const vpcPeeringRolesKey = `${sourceVpc.dlzAccount.accountId}-${destinationtVpc.dlzAccount.accountId}`;
        /* Do not create a role if one already exists between accounts */
        if (vpcPeeringRoles[vpcPeeringRolesKey]) {
          continue;
        }

        /* Only create on the destination VPC */
        if(destinationtVpc.dlzAccount.accountId !== this.accountId) {      //TODO: Can not target the other stacks... Hmmm think about it...
          continue;
        }
        vpcPeeringRoles[vpcPeeringRolesKey] = new iam.Role(this, peeringRoleName, {
          roleName: peeringRoleName,
          description: `VPC Peering Role for ${sourceVpc.vpc.address} to ${destinationtVpc.vpc.address}`,
          assumedBy: new iam.AccountPrincipal(sourceVpc.dlzAccount.accountId),
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


      // continue here ffs
    }


    new sns.Topic(this, this.resourceName('test-topic'), {
      displayName: this.resourceName('test-topic'),
      topicName: this.resourceName('test-topic'),
    });
  }
}
