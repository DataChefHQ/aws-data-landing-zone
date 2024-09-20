import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { NetworkAddress } from './network-address';
import { DLzAccount } from '../../data-landing-zone';

export interface NetworkEntitySubnet {
  readonly address: NetworkAddress;
  readonly subnet: ec2.CfnSubnet;
}
export interface NetworkEntityRouteTable {
  readonly address: NetworkAddress;
  readonly routeTable: ec2.CfnRouteTable;

  readonly subnets: NetworkEntitySubnet[];
}
export interface NetworkEntityVpc {
  readonly address: NetworkAddress;
  readonly vpc: ec2.CfnVPC;

  readonly routeTables: NetworkEntityRouteTable[];
}

export interface DlzAccountNetwork {
  readonly dlzAccount: DLzAccount;
  readonly vpcs: NetworkEntityVpc[];
}


// export interface NetworkEntityVpcSsm {
//   readonly address: NetworkAddress;
//   readonly vpcId: string;
// }
// export interface NetworkEntitySubnetSsm {
//   readonly address: NetworkAddress;
//   readonly subnetId: string;
// }
// export interface NetworkEntityRouteTableSsm {
//   readonly address: NetworkAddress;
//   readonly routeTableId: string;
// }
// export interface NetworkEntitySsm {
//   readonly dlzAccount: DLzAccount;
//   readonly vpcs: NetworkEntityVpcSsm[];
//   readonly subnets: NetworkEntitySubnetSsm[];
//   readonly routeTables: NetworkEntityRouteTableSsm[];
// }
