
export const NETWORK_ADDRESS_SEPARATOR = '.';

export class NetworkAddress {

  public static fromString(props: string): NetworkAddress {
    const parts = props.split(NETWORK_ADDRESS_SEPARATOR);
    if (parts.length < 1 || parts.length > 5) {
      throw new Error(`Invalid Network Address: ${props}`);
    }

    return new NetworkAddress(parts[0], parts[1], parts[2], parts[3], parts[4]);
  }

  public readonly account: string;
  public readonly region?: string;
  public readonly vpc?: string;
  public readonly routeTable?: string;
  public readonly subnet?: string;

  /**
   *
   * @param account
   * @param region
   * @param vpc
   * @param routeTable
   * @param subnet
   */
  constructor(account: string, region?: string, vpc?: string, routeTable?: string, subnet?: string) {
    if (vpc && !region) {
      throw new Error('VPC must have a Region');
    }
    if (routeTable && (!vpc || !region)) {
      throw new Error('RouteTable must have a VPC and Region');
    }
    if (subnet && (!routeTable || !vpc || !region)) {
      throw new Error('Subnet must have a RouteTable, VPC and Region');
    }

    this.account = account;
    this.region = region;
    this.vpc = vpc;
    this.routeTable = routeTable;
    this.subnet = subnet;
  }

  public toString(): string {
    return [this.account, this.region, this.vpc, this.routeTable, this.subnet]
      .filter(part => part !== undefined)
      .join(NETWORK_ADDRESS_SEPARATOR);
  }

  public matches(other: NetworkAddress): boolean {
    return this.toString() === other.toString();
  }

  public isAccountAddress(): boolean {
    return this.region === undefined && this.vpc === undefined && this.routeTable === undefined && this.subnet === undefined;
  }
  public isRegionAddress(): boolean {
    return this.region !== undefined && this.vpc === undefined && this.routeTable === undefined && this.subnet === undefined;
  }
  public isVpcAddress(): boolean {
    return this.region !== undefined && this.vpc !== undefined && this.routeTable === undefined && this.subnet === undefined;
  }
  public isRouteTableAddress(): boolean {
    return this.region !== undefined && this.vpc !== undefined && this.routeTable !== undefined && this.subnet === undefined;
  }
  public isSubnetAddress(): boolean {
    return this.region !== undefined && this.vpc !== undefined && this.routeTable !== undefined && this.subnet !== undefined;
  }

}
