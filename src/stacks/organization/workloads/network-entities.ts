import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { NetworkEntities } from '../../../constructs/dlz-vpc/network-entities';
export const networkEntities = new NetworkEntities();

/* The key is the combination of the account ids */
export let vpcPeeringRoleKeys: string[] = [];
/* Key is the combination of the concat of the connection's [vpcId, peerVpcId, peerOwnerId, peerRegion] */
export let peeringConnections: {[key: string]: ec2.CfnVPCPeeringConnection} = {};
