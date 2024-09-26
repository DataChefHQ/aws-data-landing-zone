import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { NetworkEntity } from './network-entity';
import { DLzAccount, Region } from '../../data-landing-zone';
import { groupByField } from '../../lib';
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

  public readonly networkEntity: NetworkEntity;

  constructor(private dlzAccount: DLzAccount, dlzStack: DlzStack, private dlzVpc: DlzVpcProps) {

    const vpcName = this.vpcResourceName(dlzVpc.name);
    const vpc = new ec2.CfnVPC(dlzStack, vpcName, {
      cidrBlock: dlzVpc.cidr,
      tags: [{ key: 'Name', value: vpcName }],
    });

    this.networkEntity = {
      dlzAccount: this.dlzAccount,
      vpc: {
        id: this.vpcId(),
        vpc,
      },
      subnets: [],
      routeTables: [],
    };

    const segmentsSubnets = groupByField(dlzVpc.subnets, 'segment');
    for (const segment in segmentsSubnets) {
      const segmentSubnets = segmentsSubnets[segment];

      const routeTableName = this.vpcResourceName(segment);
      const routeTableId = this.routeTableId(segment);
      if (this.networkEntity.routeTables.map(rt => rt.id).includes(routeTableId)) {
        throw new Error(`RouteTable with id ${routeTableId} already exists`);
      }
      const routeTable = new ec2.CfnRouteTable(dlzStack, routeTableName, {
        vpcId: vpc.ref,
        tags: [{ key: 'Name', value: routeTableName }],
      });
      this.networkEntity.routeTables.push({
        id: routeTableId,
        routeTable,
      });

      for (const segmentSubnet of segmentSubnets) {
        const subnetName = this.vpcResourceName(segmentSubnet.name);
        const subnetId = this.subnetId(segment, segmentSubnet.name);
        if (this.networkEntity.subnets.map(s => s.id).includes(subnetId)) {
          throw new Error(`Subnet with id ${subnetId} already exists`);
        }
        const subnet = new ec2.CfnSubnet(dlzStack, subnetName, {
          vpcId: vpc.ref,
          cidrBlock: segmentSubnet.cidr,
          availabilityZone: segmentSubnet.az,
          tags: [{ key: 'Name', value: subnetName }],
        });
        this.networkEntity.subnets.push({
          id: subnetId,
          subnet,
        });

        const subnetRouteTableAssociationName = this.vpcResourceName(segmentSubnet.name + '-association');
        new ec2.CfnSubnetRouteTableAssociation(dlzStack, subnetRouteTableAssociationName, {
          routeTableId: routeTable.ref,
          subnetId: subnet.ref,
        });

        // //TODO: Next ticket
        // new ec2.CfnRoute(dlzStack, 'Route', {
        //   routeTableId: routeTable.ref,
        //   destinationCidrBlock: '0.0.0.0/0',
        //   gatewayId: 'igw-xxxxxxxx',
        // });
      }
    }
  }

  private vpcResourceName(name: string): string {
    return 'vpc-' + name;
  }

  private vpcId(): string {
    return [this.dlzAccount.name, this.dlzVpc.region, this.dlzVpc.name].join('.');
  }

  private routeTableId(routeTableName: string): string {
    return [this.dlzAccount.name, this.dlzVpc.region, this.dlzVpc.name, routeTableName].join('.');
  }

  private subnetId(routeTableName: string, subnetName: string): string {
    return [this.dlzAccount.name, this.dlzVpc.region, this.dlzVpc.name, routeTableName, subnetName].join('.');
  }

}