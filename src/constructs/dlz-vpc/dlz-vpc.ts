import { Fn } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { UserData } from 'aws-cdk-lib/aws-ec2';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { NetworkEntityRouteTable, NetworkEntityVpc } from './dlz-account-network';
import { NetworkAddress } from './network-address';
import { DLzAccount, NetworkNat, Region } from '../../data-landing-zone';
import { SSM_PARAMETERS_DLZ } from '../../stacks/organization/constants';
import { DlzStack } from '../dlz-stack/index';

export interface DlzSubnetProps {
  /**
   * The name of the subnet, must be unique within the routeTable
   */
  readonly name: string;

  /**
   * The CIDR block of the subnet
   */
  readonly cidr: string;

  /**
   * Optional. The Availability Zone of the subnet, if not specified a random AZ will be selected
   */
  readonly az?: string;
}

export interface DlzVpcProps {
  /**
   * The region where the VPC will be created
   */
  readonly region: Region;

  /**
   * The name of the VPC, must be unique within the region
   */
  readonly name: string;

  /**
   * The CIDR block of the VPC
   */
  readonly cidr: string;

  /**
   * The route tables to be created in the VPC
   */
  readonly routeTables: DlzRouteTableProps[];
}


export interface DlzRouteTableProps {
  readonly name: string;
  readonly subnets: DlzSubnetProps[];
}

export interface DlzSubnetProps {
  readonly name: string;
  readonly cidr: string;
  readonly az?: string;
}

export class DlzVpc {

  public readonly networkEntityVpc: NetworkEntityVpc;

  constructor(private dlzAccount: DLzAccount, private dlzStack: DlzStack, dlzVpc: DlzVpcProps, private networkNats?: NetworkNat[]) {

    const vpcName = this.vpcResourceName(dlzVpc.name);
    const vpc = new ec2.CfnVPC(dlzStack, vpcName, {
      cidrBlock: dlzVpc.cidr,
      tags: [{ key: 'Name', value: vpcName }],
    });

    const vpcAddress = new NetworkAddress(this.dlzAccount.name, dlzVpc.region, dlzVpc.name);
    this.networkEntityVpc = {
      address: vpcAddress,
      vpc,
      routeTables: [],
    };
    new ssm.StringParameter(dlzStack, this.vpcResourceName(`network-entity--${vpcAddress}-id`), {
      parameterName: `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${vpcAddress}/id`,
      stringValue: vpc.attrVpcId,
    });

    for (const vpcRouteTable of dlzVpc.routeTables) {
      /* Create Route table */
      const routeTableName = this.vpcResourceName(vpcRouteTable.name);
      const routeTableAddress = new NetworkAddress(this.dlzAccount.name, dlzVpc.region, dlzVpc.name, vpcRouteTable.name);
      if (this.networkEntityVpc.routeTables.map(rt => rt.address).includes(routeTableAddress)) {
        throw new Error(`RouteTable with address '${routeTableAddress}' already exists`);
      }
      const routeTable = new ec2.CfnRouteTable(dlzStack, routeTableName, {
        vpcId: vpc.ref,
        tags: [{ key: 'Name', value: routeTableName }],
      });

      new ssm.StringParameter(dlzStack, this.vpcResourceName(`network-entity--${routeTableAddress}`), {
        parameterName: `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${routeTableAddress}/id`,
        stringValue: routeTable.attrRouteTableId,
      });

      const subnetEntity: NetworkEntityRouteTable = {
        address: routeTableAddress,
        routeTable,
        subnets: [],
      };

      /* Create Subnets and associations, then add to Route Table */
      for (const routeTableSubnet of vpcRouteTable.subnets) {
        const subnetName = this.vpcResourceName(routeTableSubnet.name);
        const subnetAddress = new NetworkAddress(this.dlzAccount.name, dlzVpc.region, dlzVpc.name,
          vpcRouteTable.name, routeTableSubnet.name);
        if (subnetEntity.subnets.map(s => s.address).includes(subnetAddress)) {
          throw new Error(`Subnet with address ${subnetAddress} already exists`);
        }
        const subnet = new ec2.CfnSubnet(dlzStack, subnetName, {
          vpcId: vpc.ref,
          cidrBlock: routeTableSubnet.cidr,
          availabilityZone: routeTableSubnet.az,
          tags: [{ key: 'Name', value: subnetName }],
        });

        subnetEntity.subnets.push({
          address: subnetAddress,
          subnet,
        });

        new ssm.StringParameter(dlzStack, this.vpcResourceName(`network-entity--${subnetAddress}-id`), {
          parameterName: `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${subnetAddress}/id`,
          stringValue: subnet.attrSubnetId,
        });

        const subnetRouteTableAssociationName = this.vpcResourceName(routeTableSubnet.name + '-association');
        new ec2.CfnSubnetRouteTableAssociation(dlzStack, subnetRouteTableAssociationName, {
          routeTableId: routeTable.ref,
          subnetId: subnet.ref,
        });
      }

      this.networkEntityVpc.routeTables.push(
        {
          address: routeTableAddress,
          routeTable,
          subnets: subnetEntity.subnets,
        },
      );
    }

    this.createNats(vpcName, this.networkEntityVpc);
  }

  private createInternetGateWay(vpcName: string, vpcAddress: NetworkAddress, vpc: ec2.CfnVPC) {
    /* Only create IGWs if there ar NATs in this VPC */
    const vpcNats = this.networkNats?.filter(nat => {
      const natVpcAddress = new NetworkAddress(nat.location.account, nat.location.region, nat.location.vpc);
      return natVpcAddress.matches(vpcAddress);
    });
    if (!vpcNats || !vpcNats.length) { return; }

    const igwName = this.vpcResourceName(`igw-${vpcName}`);
    const igw = new ec2.CfnInternetGateway(this.dlzStack, igwName, {
      tags: [{ key: 'Name', value: igwName }],
    });
    const igwAttachment = new ec2.CfnVPCGatewayAttachment(this.dlzStack, this.vpcResourceName('igw-attachment'), {
      vpcId: vpc.ref,
      internetGatewayId: igw.ref,
    });

    return {
      igw,
      igwAttachment,
    };
  }

  private crateNatInstance(routeTable: NetworkEntityRouteTable, networkNat: NetworkNat, vpcNe: NetworkEntityVpc, vpcIgw: undefined | {
    igwAttachment: ec2.CfnVPCGatewayAttachment;
    igw: ec2.CfnInternetGateway;
  }) {
    let nat: ec2.CfnInstance | undefined;
    for (const subnet of routeTable.subnets) {
      if (!networkNat.location.matches(subnet.address)) {
        continue;
      }

      const natInstanceName = this.vpcResourceName(`${networkNat.name}-nati`);

      /* Referenced from the CDK's method of defining a NAT Instance
      * https://github.com/aws/aws-cdk/blob/fbc28bcd5892768bb436b93c09c6d925b57daf0f/packages/aws-cdk-lib/aws-ec2/lib/nat.ts#L467-L466 */
      const userData = UserData.forLinux();
      userData.addCommands(
        'yum install iptables-services -y',
        'systemctl enable iptables',
        'systemctl start iptables',
        'echo "net.ipv4.ip_forward=1" > /etc/sysctl.d/custom-ip-forwarding.conf',
        'sudo sysctl -p /etc/sysctl.d/custom-ip-forwarding.conf',
        "sudo /sbin/iptables -t nat -A POSTROUTING -o $(route | awk '/^default/{print $NF}') -j MASQUERADE",
        'sudo /sbin/iptables -F FORWARD',
        'sudo service iptables save',
      );

      const natSecurityGroup = new ec2.CfnSecurityGroup(this.dlzStack, this.vpcResourceName(`${networkNat.name}-nati-sg`), {
        vpcId: vpcNe.vpc.attrVpcId,
        groupDescription: `Security group for NAT instance ${networkNat.name}`,
        securityGroupIngress: [
          {
            ipProtocol: 'tcp',
            fromPort: 0,
            toPort: 65535,
            cidrIp: '0.0.0.0/0',
          },
        ],
      });

      nat = new ec2.CfnInstance(this.dlzStack, natInstanceName, {
        instanceType: networkNat.type.instance!.instanceType.toString(),
        imageId: new ec2.AmazonLinuxImage({
          generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2023,
          cpuType: networkNat.type.instance!.instanceType.architecture == ec2.InstanceArchitecture.ARM_64 ?
            ec2.AmazonLinuxCpuType.ARM_64 : undefined,
        }).getImage(this.dlzStack).imageId,
        userData: Fn.base64(userData.render()),
        networkInterfaces: [{
          deviceIndex: '0',
          associatePublicIpAddress: true,
          subnetId: subnet.subnet.attrSubnetId,
          groupSet: [natSecurityGroup.attrGroupId],
        }],
        sourceDestCheck: false,
        tags: [{ key: 'Name', value: natInstanceName }],
      });
      nat.addDependency(vpcIgw!.igw);
      nat.addDependency(vpcIgw!.igwAttachment);

      const eipName = this.vpcResourceName(`${networkNat.name}-nati-eip`);
      const eip = new ec2.CfnEIP(this.dlzStack, eipName, {
        domain: 'vpc',
        ...(networkNat.type.instance!.eip || {}),
        tags: [
          { key: 'Name', value: eipName },
          ...(networkNat.type.instance!.eip?.tags || []),
        ],
      });

      const eipAssoc = new ec2.CfnEIPAssociation(this.dlzStack,
        this.vpcResourceName(`${networkNat.name}-nati-eip-assoc`), {
          allocationId: eip.attrAllocationId,
          instanceId: nat.ref,
        });
      eipAssoc.addDependency(eip);
      eipAssoc.addDependency(nat);
    }

    if (nat) {
      /* Add a route in the route table the NAT is in to the IGW */
      const routeIgwName = this.vpcResourceName(`${networkNat.name}-nati-route-igw`);
      const routeIgw = new ec2.CfnRoute(this.dlzStack, routeIgwName, {
        routeTableId: routeTable.routeTable.ref,
        destinationCidrBlock: '0.0.0.0/0',
        gatewayId: vpcIgw!.igw.attrInternetGatewayId,
      });
      routeIgw.addDependency(vpcIgw!.igw);
      routeIgw.addDependency(vpcIgw!.igwAttachment);

      /* Add a route in the route tables that need to route to the NAT */
      for (const from of networkNat.allowAccessFrom) {
        const routeTableFrom = vpcNe.routeTables.find(rt => from.matches(rt.address));
        if (!routeTableFrom) { continue; }

        const routeNatName = this.vpcResourceName(`${networkNat.name}-nati-route-${routeTableFrom.address.routeTable}`);
        const routeNat = new ec2.CfnRoute(this.dlzStack, routeNatName, {
          routeTableId: routeTableFrom.routeTable.ref,
          destinationCidrBlock: '0.0.0.0/0',
          instanceId: nat.ref,
        });
        routeNat.addDependency(nat);
      }
    }
  }

  private createNatGw(routeTable: NetworkEntityRouteTable, networkNat: NetworkNat, vpcIgw: undefined | {
    igwAttachment: ec2.CfnVPCGatewayAttachment;
    igw: ec2.CfnInternetGateway;
  }, vpcNe: NetworkEntityVpc) {
    let nat: ec2.CfnNatGateway | undefined;
    for (const subnet of routeTable.subnets) {
      if (!networkNat.location.matches(subnet.address)) {
        continue;
      }

      const eipName = this.vpcResourceName(`${networkNat.name}-nat-eip`);
      const eip = new ec2.CfnEIP(this.dlzStack, eipName, {
        domain: 'vpc',
        ...(networkNat.type.gateway!.eip || {}),
        tags: [
          { key: 'Name', value: eipName },
          ...(networkNat.type.gateway!.eip?.tags || []),
        ],
      });

      const natGatewayName = this.vpcResourceName(`${networkNat.name}-nat`);
      nat = new ec2.CfnNatGateway(this.dlzStack, natGatewayName, {
        allocationId: eip.attrAllocationId,
        subnetId: subnet.subnet.attrSubnetId,
        tags: [{ key: 'Name', value: natGatewayName }],
      });

      nat.addDependency(eip);
      nat.addDependency(vpcIgw!.igw);
      nat.addDependency(vpcIgw!.igwAttachment);
    }

    if (nat) {
      /* Add a route in the route table the NAT is in to the IGW */
      const routeIgwName = this.vpcResourceName(`${networkNat.name}-nat-route-igw`);
      const routeIgw = new ec2.CfnRoute(this.dlzStack, routeIgwName, {
        routeTableId: routeTable.routeTable.ref,
        destinationCidrBlock: '0.0.0.0/0',
        gatewayId: vpcIgw!.igw.attrInternetGatewayId,
      });
      routeIgw.addDependency(vpcIgw!.igw);
      routeIgw.addDependency(vpcIgw!.igwAttachment);

      /* Add a route in the route tables that need to route to the NAT */
      for (const from of networkNat.allowAccessFrom) {
        const routeTableFrom = vpcNe.routeTables.find(rt => from.matches(rt.address));
        if (!routeTableFrom) { continue; }

        const routeNatName = this.vpcResourceName(`${networkNat.name}-nat-route-${routeTableFrom.address.routeTable}`);
        const routeNat = new ec2.CfnRoute(this.dlzStack, routeNatName, {
          routeTableId: routeTableFrom.routeTable.ref,
          destinationCidrBlock: '0.0.0.0/0',
          natGatewayId: nat.ref,
        });
        routeNat.addDependency(nat);
      }
    }
  }


  private createNats(vpcName: string, vpcNe: NetworkEntityVpc) {

    const vpcIgw = this.createInternetGateWay(vpcName, vpcNe.address, vpcNe.vpc);
    if (!vpcIgw) { return; }

    for (const networkNat of this.networkNats || []) {
      for (const routeTable of vpcNe.routeTables) {
        if (networkNat.type.gateway) {
          this.createNatGw(routeTable, networkNat, vpcIgw, vpcNe);
        } else if (networkNat.type.instance) {
          this.crateNatInstance(routeTable, networkNat, vpcNe, vpcIgw);
        }
      }
    }
  }


  private vpcResourceName(name: string): string {
    return 'vpc-' + name;
  }
}
