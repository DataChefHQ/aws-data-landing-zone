import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { DLzAccount } from '../../data-landing-zone';
import {NetworkAddress} from "./network-address";

export interface NetworkEntityVpc {
  readonly address: NetworkAddress;
  readonly vpc: ec2.CfnVPC;
}
export interface NetworkEntitySubnet {
  readonly address: NetworkAddress;
  readonly subnet: ec2.CfnSubnet;
}
export interface NetworkEntityRouteTable {
  readonly address: NetworkAddress;
  readonly routeTable: ec2.CfnRouteTable;
}

export interface NetworkEntity {
  readonly dlzAccount: DLzAccount;
  readonly vpc: NetworkEntityVpc;
  readonly subnets: NetworkEntitySubnet[];
  readonly routeTables: NetworkEntityRouteTable[];
}

/**
 * Convert CIDR to number range
 * @param cidr
 */
function cidrToRange(cidr: string): [number, number] {
  const [ip, prefixLength] = cidr.split('/');
  const ipParts = ip.split('.').map(part => parseInt(part, 10));
  const ipNumber = ipParts.reduce((acc, part) => (acc << 8) + part, 0);
  const mask = ~((1 << (32 - parseInt(prefixLength, 10))) - 1);

  const networkStart = ipNumber & mask;
  const networkEnd = networkStart + ~mask;

  return [networkStart, networkEnd];
}

/**
 * Check if new CIDR overlaps with existing CIDRs
 * @param newCidr
 * @param existingCidrs
 */
function findCidrOverlap(newCidr: string, existingCidrs: string[]): string | undefined {
  const [newStart, newEnd] = cidrToRange(newCidr);

  for (const existingCidr of existingCidrs) {
    const [existingStart, existingEnd] = cidrToRange(existingCidr);
    if (newStart <= existingEnd && existingStart <= newEnd) {
      return existingCidr;
    }
  }

  return;
}

export class NetworkEntities {
  private networkEntities: NetworkEntity[] = [];

  public add(networkEntity: NetworkEntity) {
    /* Only need to check VPC overlaps */
    if (this.vpcExists(networkEntity.vpc.address)) {
      throw new Error(`VPC with id ${networkEntity.vpc.address} already exists`);
    }

    const existingCidrs = this.networkEntities.map(ne => ne.vpc.vpc.cidrBlock!);
    const overlappingCidr = findCidrOverlap(networkEntity.vpc.vpc.cidrBlock!, existingCidrs);
    if (overlappingCidr) {
      throw new Error(`VPC CIDR block ${networkEntity.vpc.vpc.cidrBlock} overlaps with existing VPC CIDR block ${overlappingCidr}`);
    }

    this.networkEntities.push(networkEntity);
  }

  private vpcExists(networkAddress: NetworkAddress): boolean {
    return this.networkEntities.map(ne => ne.vpc.address).includes(networkAddress);
  }


  public getVpcEntitiesForAddress(networkAddress: NetworkAddress): NetworkEntity[] | undefined {
    return this.networkEntities.filter(ne => {
      const isVpcAddress = ne.vpc.address.isVpcAddress();
      const isSameAccount = ne.vpc.address.account === networkAddress.account;
      const isSameRegion = ne.vpc.address.region === networkAddress.region;
      const isSameVpc = ne.vpc.address.vpc === networkAddress.vpc;

      if (networkAddress.isAccountAddress()) {
        return isVpcAddress && isSameAccount;
      } else if (networkAddress.isRegionAddress()) {
        return isVpcAddress && isSameAccount && isSameRegion;
      } else if (networkAddress.isVpcAddress() || networkAddress.isSegmentAddress() || networkAddress.isSubnetAddress()) {
        return isVpcAddress && isSameAccount && isSameRegion && isSameVpc;
      }

      return false;
    });
  }
//   public getVpcEntitiesForAddress(networkAddress: NetworkAddress): NetworkEntity[] | undefined {
//     if (networkAddress.isAccountAddress()) {
//       return this.networkEntities.filter(ne =>
//         ne.vpc.address.isVpcAddress() &&
//         ne.vpc.address.account === networkAddress.account
//       );
//     } else if (networkAddress.isRegionAddress()) {
//       return this.networkEntities.filter(ne =>
//         ne.vpc.address.isVpcAddress() &&
//         ne.vpc.address.account === networkAddress.account &&
//         ne.vpc.address.region === networkAddress.region
//       );
//     } else if (networkAddress.isVpcAddress() || networkAddress.isSegmentAddress() || networkAddress.isSubnetAddress())
//     {
//
//       return this.networkEntities.filter(ne =>
//         ne.vpc.address.isVpcAddress() &&
//         ne.vpc.address.account === networkAddress.account &&
//         ne.vpc.address.region === networkAddress.region &&
//         ne.vpc.address.vpc === networkAddress.vpc
//       );
//     }
//
//     return;
//
//
//
//
//     /* Can always return a direct address for subnet, segment, vpc addresses */
//     // const directVpcAddress = networkAddress.getVpcAddress(networkAddress);
//     // if(!directVpcAddress) {
//     //   return this.networkEntities.filter(ne => ne.vpc.address == directVpcAddress);
//     // }
//     // else {
//     //   /* Need to find the VPCs for the given regional, and account address, there can be many */
//     //
//     //     if (networkAddress.isRegionAddress()) {
//     //       const accountRegionVpcs = this.networkEntities.filter(ne =>
//     //         ne.vpc.address.isVpcAddress() &&
//     //         ne.vpc.address.account === networkAddress.region &&
//     //         ne.vpc.address.region === networkAddress.account
//     //       );
//     //       return accountRegionVpcs;
//     //       // const accountRegionVpcsUnique = uniqueValueByFunction(accountRegionVpcs, ne => (
//     //       //   ne.vpc.address.account + ne.vpc.address.region
//     //       // ));
//     //       // return accountRegionVpcsUnique.map(ne => new NetworkEntity(ne.dlzAccount, ne.vpc, )
//     //
//     //     }
//     //     else if (networkAddress.isAccountAddress()) {
//     //       return this.networkEntities.filter(ne => ne.dlzAccount.name === networkAddress.account);
//     //     }
//     //
//     // }
// // -----
//     // if(networkAddress.isSegmentAddress()) {
//     //   const segmentVpcAddress = networkAddress.getVpcAddress(networkAddress);
//     //   this.networkEntities.filter()
//     // }
//     // else if (networkAddress.isVpcAddress()) {
//     //   easy just take vpc part in the address
//     // }
//     // else if (networkAddress.isRegionAddress()) {
//     //   not easy - loop over all the network entities, for this account's' region and find all the VPCs
//     // }
//     // else if (networkAddress.isAccountAddress()) {
//     //   not easy - loop over all the network entities, for this account in all regions and find all the VPCs
//     // }
//     // else {
//     //   throw new Error('Invalid Network Address');
//     // }
//   }
}
