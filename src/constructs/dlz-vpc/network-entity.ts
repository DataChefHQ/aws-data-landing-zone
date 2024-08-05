import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { DLzAccount } from '../../data-landing-zone';

export interface NetworkEntityVpc {
  readonly id: string;
  readonly vpc: ec2.CfnVPC;
}
export interface NetworkEntitySubnet {
  readonly id: string;
  readonly subnet: ec2.CfnSubnet;
}
export interface NetworkEntityRouteTable {
  readonly id: string;
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
    if (this.vpcExists(networkEntity.vpc.id)) {
      throw new Error(`VPC with id ${networkEntity.vpc.id} already exists`);
    }

    const existingCidrs = this.networkEntities.map(ne => ne.vpc.vpc.cidrBlock!);
    const overlappingCidr = findCidrOverlap(networkEntity.vpc.vpc.cidrBlock!, existingCidrs);
    if (overlappingCidr) {
      throw new Error(`VPC CIDR block ${networkEntity.vpc.vpc.cidrBlock} overlaps with existing VPC CIDR block ${overlappingCidr}`);
    }

    this.networkEntities.push(networkEntity);
  }

  public vpcExists(vpcId: string): boolean {
    return this.networkEntities.map(ne => ne.vpc.id).includes(vpcId);
  }

}
