// interface NetworkAddressProps {
//   /**
//    * Account Name
//    */
//   readonly account: string;
//
//   /**
//    * Region Name
//    */
//   readonly region?: string;
//
//   /**
//    * VPC Name
//    */
//   readonly vpc?: string;
//
//   /**
//    * Segment Name
//    */
//   readonly segment?: string;
//
//   /**
//    * Subnet Name
//    */
//   readonly subnet?: string;
// }

export const NETWORK_ADDRESS_SEPARATOR = '.';

export class NetworkAddress {
  public readonly account: string;
  public readonly region?: string;
  public readonly vpc?: string;
  public readonly segment?: string;
  public readonly subnet?: string;

  /**
   *
   * @param account
   * @param region
   * @param vpc
   * @param segment
   * @param subnet
   */
  constructor(account: string, region?: string, vpc?: string, segment?: string, subnet?: string) {
    if(vpc && !region) {
      throw new Error('VPC must have a Region');
    }
    if (segment && (!vpc || !region)) {
      throw new Error('Segment must have a VPC and Region');
    }
    if (subnet && (!segment || !vpc || !region)) {
      throw new Error('Subnet must have a Segment, VPC and Region');
    }

    this.account = account;
    this.region = region;
    this.vpc = vpc;
    this.segment = segment;
    this.subnet = subnet;
  }

  public static fromString(props: string): NetworkAddress {
    const parts = props.split(NETWORK_ADDRESS_SEPARATOR);
    if (parts.length < 1 || parts.length > 5) {
      throw new Error(`Invalid Network Address: ${props}`);
    }

    return new NetworkAddress(parts[0], parts[1], parts[2], parts[3], parts[4]);
  }
  public toString(): string {
    return [this.account, this.region, this.vpc, this.segment]
      .filter(part => part !== undefined)
      .join(NETWORK_ADDRESS_SEPARATOR);
  }

  public isAccountAddress(): boolean {
    return this.region === undefined && this.vpc === undefined && this.segment === undefined && this.subnet === undefined;
  }
  public isRegionAddress(): boolean {
    return this.region !== undefined && this.vpc === undefined && this.segment === undefined && this.subnet === undefined;
  }
  public isVpcAddress(): boolean {
    return this.region !== undefined && this.vpc !== undefined && this.segment === undefined && this.subnet === undefined;
  }
  public isSegmentAddress(): boolean {
    return this.region !== undefined && this.vpc !== undefined && this.segment !== undefined && this.subnet === undefined;
  }
  public isSubnetAddress(): boolean {
    return this.region !== undefined && this.vpc !== undefined && this.segment !== undefined && this.subnet !== undefined;
  }

  /**
   * Get the direct VPC Address from the given Network Address
   * - If the Network Address is for a Subnet, this will return the VPC Network Address
   * - If the Network Address is for a Segment, this will return the VPC Network Address
   * - If the Network Address is for a VPC, this will return the VPC Network Address
   * - Otherwise it returns undefined
   * @param address
   */
  public getVpcAddress(address: NetworkAddress): NetworkAddress | undefined {
    if(!address.isVpcAddress() || !address.isSegmentAddress() || !address.isSubnetAddress()) {
      return;
    }

    return new NetworkAddress(this.account, this.region, this.vpc);
  }

}
