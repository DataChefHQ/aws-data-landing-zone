import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { NetworkEntityRouteTable, NetworkEntityVpc } from './dlz-account-network';
import { NetworkAddress } from './network-address';
import { DLzAccount, Region } from '../../data-landing-zone';
import { groupByField } from '../../lib';
import { SSM_PARAMETERS_DLZ } from '../../stacks/organization/constants';
import { DlzStack } from '../dlz-stack/index';

export interface DlzSubnetProps {
  /**
   * A Segment name is a grouping of subnets and is the route table the subnets will be long to.
   */
  readonly segment: string;

  /**
   * The name of the subnet, must be unique within the segment
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
   * The subnets to be created in the VPC
   */
  readonly subnets: DlzSubnetProps[];
}

export class DlzVpc {

  public readonly networkEntityVpc: NetworkEntityVpc;

  constructor(private dlzAccount: DLzAccount, dlzStack: DlzStack, dlzVpc: DlzVpcProps) {

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
      // stringValue: networkEntityToSsmString(this.networkEntity),
    });

    const segmentsSubnets = groupByField(dlzVpc.subnets, 'segment');
    for (const segment in segmentsSubnets) {
      const segmentSubnets = segmentsSubnets[segment];

      /* Create Route table */
      const routeTableName = this.vpcResourceName(segment);
      const routeTableAddress = new NetworkAddress(this.dlzAccount.name, dlzVpc.region, dlzVpc.name, segment);
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
        // stringValue: networkEntityToSsmString(this.networkEntity),
      });

      const subnetEntity: NetworkEntityRouteTable = {
        address: routeTableAddress,
        routeTable,
        subnets: [],
      };

      /* Create Subnets and associations, then add to Route Table */
      for (const segmentSubnet of segmentSubnets) {
        const subnetName = this.vpcResourceName(segmentSubnet.name);
        const subnetId = new NetworkAddress(this.dlzAccount.name, dlzVpc.region, dlzVpc.name, segment, segmentSubnet.name);
        if (subnetEntity.subnets.map(s => s.address).includes(subnetId)) {
          throw new Error(`Subnet with id ${subnetId} already exists`);
        }
        const subnet = new ec2.CfnSubnet(dlzStack, subnetName, {
          vpcId: vpc.ref,
          cidrBlock: segmentSubnet.cidr,
          availabilityZone: segmentSubnet.az,
          tags: [{ key: 'Name', value: subnetName }],
        });

        subnetEntity.subnets.push({
          address: subnetId,
          subnet,
        });

        const subnetRouteTableAssociationName = this.vpcResourceName(segmentSubnet.name + '-association');
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


      // //TODO: Next ticket
      // new ec2.CfnRoute(dlzStack, 'Route', {
      //   routeTableId: routeTable.ref,
      //   destinationCidrBlock: '0.0.0.0/0',
      //   gatewayId: 'igw-xxxxxxxx',
      // });

    }

  }

  private vpcResourceName(name: string): string {
    return 'vpc-' + name;
  }
}
