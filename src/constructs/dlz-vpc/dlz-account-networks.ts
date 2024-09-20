/* Use `undefined` to automatically detect level */
import { NetworkAddress } from './network-address';
import {DlzAccountNetwork, NetworkEntityVpc} from './dlz-account-network';
import {DLzAccount} from "../../data-landing-zone";

type MatchOnAddress = 'account' | 'region' | 'vpc' | 'segment' | 'subnet' | undefined;

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

export class DlzAccountNetworks {
  private dlzAccountNetworks: DlzAccountNetwork[] = [];

  //region: string,
  public add(dlzAccount: DLzAccount, networkEntityVpc: NetworkEntityVpc) {
    // Here find an existing NE, by account name, if exists add VPC to that.

    // TODO: Huh was here before?
    // const accountRegionAddress = new NetworkAddress(dlzAccount.accountId, region);
    // const accountRegionEntities = this.getEntitiesForAddress(accountRegionAddress, 'region');
    // assert.ok(accountRegionEntities && accountRegionEntities.length !== 0, `No account region entities found for
    //   address ${accountRegionAddress}`);


    /* Only need to check VPC overlaps */
    if (this.vpcExists(networkEntityVpc)) {
      throw new Error(`VPC with address ${networkEntityVpc.address} already exists`);
    }

    const existingCidrs = this.dlzAccountNetworks.map(ne => ne.vpcs).flat().map(vpc => vpc.vpc.cidrBlock!);
    const overlappingCidr = findCidrOverlap(networkEntityVpc.vpc.cidrBlock!, existingCidrs);
    if (overlappingCidr) {
      throw new Error(`VPC CIDR block ${networkEntityVpc.vpc.cidrBlock} overlaps with existing VPC CIDR block ${overlappingCidr}`);
    }

    /* Add the new VPC an Existing NetworkEntity OR create a new one */
    if(this.dlzAccountNetworks.filter(ne => ne.dlzAccount.accountId === dlzAccount.accountId)?.length === 0)
    {
      const networkEntity: DlzAccountNetwork = {
        dlzAccount: dlzAccount,
        vpcs: [networkEntityVpc],
      };
      this.dlzAccountNetworks.push(networkEntity);
    }
    else {
      for (let i = 0; i < this.dlzAccountNetworks.length; i++) {
        if (this.dlzAccountNetworks[i].dlzAccount.accountId === dlzAccount.accountId) {
          this.dlzAccountNetworks[i].vpcs.push(networkEntityVpc);
          return;
        }
      }
    }
  }

  private vpcExists(networkEntityVpc: NetworkEntityVpc): boolean {
    return this.dlzAccountNetworks.map(ne => ne.vpcs).flat().map(vpc => vpc.vpc.cidrBlock)
      .includes(networkEntityVpc.vpc.cidrBlock);
  }


  /**
   * Get NetworkEntities for the given `networkAddress` and match on the given `matchOnAddress`. For example, if the
   * `networkAddress` is a segment address and `matchOnAddress` has a value of `vpc` then it will return all
   * NetworkEntities that have the same VPC as the `networkAddress`. Or, if the `matchOnAddress` has a value of
   * `region` then it will return all NetworkEntities that have the same VPC region as the `networkAddress`.
   *
   * If the `matchOnAddress` is `account` then the complete NetworkEntity will be returned.
   * Else, if `matchOnAddress` is `region`, `vpc`, `segment` or `subnet` then a partial NetworkEntity will be returned.
   * The `vpcs` `routeTables` and `subnets` will be filtered to only include those that match the `networkAddress`. A value of
   * `undefined` will automatically detect the level of the `networkAddress` and use that as the `matchOnAddress`.
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
    matchOnAddress?: MatchOnAddress,
  ): DlzAccountNetwork[] | undefined {

    const networkEntitiesMatch: DlzAccountNetwork[] = [];
    for (const ne of this.dlzAccountNetworks) {

      if (matchOnAddress === 'account') {
        if(ne.dlzAccount.name === networkAddress.account) {
          networkEntitiesMatch.push(ne);
        }
      } else if (matchOnAddress === 'region') {
        const partialNe = {
          ...ne,
          vpcs: ne.vpcs.filter(vpc =>
            new NetworkAddress(vpc.address.account, vpc.address.region).toString() ===
            new NetworkAddress(networkAddress.account, networkAddress.region).toString()),
        };
        if (partialNe.vpcs.length !== 0) {
          networkEntitiesMatch.push(partialNe);
        }
      }
      else if (matchOnAddress === 'vpc') {

        const partialNe = {
          ...ne,
          vpcs: ne.vpcs.filter(vpc =>
            new NetworkAddress(vpc.address.account, vpc.address.region, vpc.address.vpc).toString() ===
            new NetworkAddress(networkAddress.account, networkAddress.region, networkAddress.vpc).toString()),
        };
        if (partialNe.vpcs.length !== 0) {
          networkEntitiesMatch.push(partialNe);
        }

      } else if (matchOnAddress === 'segment') {
        let vpcs = ne.vpcs.filter(vpc =>
            new NetworkAddress(vpc.address.account, vpc.address.region, vpc.address.vpc).toString() ===
            new NetworkAddress(networkAddress.account, networkAddress.region, networkAddress.vpc).toString());

        for(let vpc of vpcs)
        {
          const routeTables = vpc.routeTables.filter(routeTable => routeTable.address.segment === networkAddress.segment);
          if(routeTables.length !== 0)
          {
            const partialNe = {
              ...ne,
              vpcs: [{
                ...vpc,
                routeTables: routeTables,
              }],
            };
            networkEntitiesMatch.push(partialNe);
          }
        }
      } else if (matchOnAddress === 'subnet') {
        let vpcs = ne.vpcs.filter(vpc =>
          new NetworkAddress(vpc.address.account, vpc.address.region, vpc.address.vpc).toString() ===
          new NetworkAddress(networkAddress.account, networkAddress.region, networkAddress.vpc).toString());

        for(let vpc of vpcs)
        {
          const routeTables = vpc.routeTables.filter(routeTable => routeTable.address.segment === networkAddress.segment);
          for(let routeTable of routeTables) {
            const subnets = routeTable.subnets.filter(subnet => subnet.address.subnet === networkAddress.subnet);
            if(subnets.length !== 0)
            {
              const partialNe = {
                ...ne,
                vpcs: [{
                  ...vpc,
                  routeTables: [{
                    ...routeTable,
                    subnets: subnets,
                  }],
                }],
              };
              networkEntitiesMatch.push(partialNe);
            }
          }
        }

      } else if (matchOnAddress === undefined) {

        /* Use the same level as the `networkAddress` */
        let matchOn: MatchOnAddress;
        if (networkAddress.isAccountAddress()) {
          matchOn = 'account';
        } else if (networkAddress.isRegionAddress()) {
          matchOn = 'region';
        } else if (networkAddress.isVpcAddress()) {
          matchOn = 'vpc';
        } else if (networkAddress.isSegmentAddress()) {
          matchOn = 'segment';
        } else if (networkAddress.isSubnetAddress()) {
          matchOn = 'subnet';
        } else {
          throw new Error(`Invalid Network Address: ${networkAddress}`);
        }

        return this.getEntitiesForAddress(networkAddress, matchOn);
      }
    }

    return networkEntitiesMatch;
  }
}