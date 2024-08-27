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


  /**
   * Get NetworkEntities for the given `networkAddress` and match on the given `matchOnAddress`. For example, if the
   * `networkAddress` is a segment address and `matchOnAddress` has a value of `vpc` then it will return all
   * NetworkEntities that have the same VPC as the `networkAddress`. Or, if the `matchOnAddress` has a value of
   * `region` then it will return all NetworkEntities that have the same VPC region as the `networkAddress`.
   *
   * If the `matchOnAddress` is `account`, `region`, or `vpc` then the complete NetworkEntity will be returned.
   * Else, if `matchOnAddress` is `segment` or `subnet` then a partial NetworkEntity will be returned. The
   * `routeTables` and `subnets` will be filtered to only include those that match the `networkAddress`.
   *
   * Example:
   *
   * Given we have these NetworkEntity[]:
   * 1. project-1-develop.us-east-1.default.private
   * 2. project-1-develop.eu-west-1.default.private
   * 3. project-1-production.eu-west-1.default.private
   *
   * - If the `networkAddress` has a `segment` address of: `project-1-develop.us-east-1.default.private` and the
   *   `matchOnAddress` value is **`segment`**. Then it will only match the **first** entry of
   *   `project-1-develop.us-east-1.default.private` and return a partial NetworkEntity with the VPC, and only
   *   the routeTables and subnets that have the same segment address.
   *
   * - If the `networkAddress` has the same `segment` address of: `project-1-develop.us-east-1.default.private` and the
   *   `matchOnAddress` value is changed to **`vpc`**. Then it will match the **first** and **second** entries
   *    and return the complete NetworkEntity for each.
   *
   * @param networkAddress
   * @param matchOnAddress
   */
  public getEntitiesForAddress(networkAddress: NetworkAddress,
                               matchOnAddress: "account" | "region" | "vpc" | "segment" | "subnet"
  ): NetworkEntity[] | undefined {

    const networkEntitiesMatch: NetworkEntity[] = [];
    for(const ne of this.networkEntities) {
      const isAccountMatch = ne.vpc.address.account === networkAddress.account;
      const isRegionMatch = ne.vpc.address.region === networkAddress.region || networkAddress.region === undefined;
      const isVpcMatch = ne.vpc.address.vpc === networkAddress.vpc || networkAddress.vpc === undefined;

      if (matchOnAddress === "account" && isAccountMatch) {
        networkEntitiesMatch.push(ne);
      } else if (matchOnAddress === "region" && isAccountMatch && isRegionMatch) {
        networkEntitiesMatch.push(ne);
      }
      else if (matchOnAddress === "vpc" && isAccountMatch && isRegionMatch && isVpcMatch) {
        networkEntitiesMatch.push(ne);
      }
      else if (matchOnAddress === "segment" && isAccountMatch && isRegionMatch && isVpcMatch) {
        let partialNe = ne;
          partialNe = {
            ...partialNe,
            routeTables: ne.routeTables.filter(routeTable => routeTable.address.segment === networkAddress.segment),
            subnets: ne.subnets.filter(subnet => subnet.address.segment === networkAddress.segment),
          };

          if(partialNe.routeTables.length !== 0) {
            networkEntitiesMatch.push(partialNe);
          }
      }
      else if (matchOnAddress === "subnet" && isAccountMatch && isRegionMatch && isVpcMatch ) {
        let partialNe = ne;
        partialNe = {
          ...partialNe,
          routeTables: ne.routeTables.filter(routeTable => routeTable.address.segment === networkAddress.segment),
          subnets: ne.subnets.filter(subnet => subnet.address.subnet === networkAddress.subnet),
        }

        if(partialNe.subnets.length !== 0) {
          networkEntitiesMatch.push(partialNe);
        }
      }
    }

    return networkEntitiesMatch;
  }
}
