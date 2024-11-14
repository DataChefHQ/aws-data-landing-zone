import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { NetworkAddress } from './constructs/dlz-vpc/network-address';
import { SSM_PARAMETERS_DLZ, SSM_PARAMETER_DLZ_PREFIX } from './stacks/organization/constants';

export interface DataLandingZoneClientProps {
  readonly accountName: string;
  readonly region: string;
}

export interface DataLandingZoneClientBastionProps extends DataLandingZoneClientProps {
  readonly bastionName?: string;
}

export interface DataLandingZoneClientVpcIdProps extends DataLandingZoneClientProps {
  readonly vpcName: string;
}

export interface DataLandingZoneClientRouteTableIdProps extends DataLandingZoneClientProps {
  readonly vpcName: string;
  readonly routeTable: string;
}

export interface DataLandingZoneClientSubnetIdProps extends DataLandingZoneClientProps {
  readonly vpcName: string;
  readonly routeTable: string;
  readonly subnetName: string;
}
/*
* This class is used to fetch parameters from the SSM Parameter Store and uses the AWS SDK to assume the role
*/
export class DataLandingZoneClient {

  /**
   * Fetches the bastion security group ID from the SSM Parameter Store
   *@param scope - The scope of the construct
   *@param id - The id of the construct
   *@param props - The props of the construct
   *@returns - The security group ID of the bastion
   */
  public static bastionSecurityGroupId(scope: Construct, id: string, props: DataLandingZoneClientBastionProps): string {
    const bastionName = props.bastionName ?? 'default';

    const parameter = ssm.StringParameter.fromStringParameterName(
      scope,
      id,
      `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}bastion/${bastionName}/security-group/id`);
    return parameter.stringValue;
  }

  /**
   * Fetches the VPC ID from the SSM Parameter Store
   *@param scope - The scope of the construct
   *@param id - The id of the construct
   *@param props - The props of the construct
   *@returns - The ID of the VPC
   */
  public static vpcId(scope: Construct, id: string, props: DataLandingZoneClientVpcIdProps): string {
    const accountName = props.accountName;
    const region = props.region;
    const vpcName = props.vpcName;
    const vpcAddress = new NetworkAddress(accountName, region, vpcName);
    const parameterName = `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${vpcAddress}/id`;
    const parameter = ssm.StringParameter.fromStringParameterName(
      scope,
      id,
      parameterName);
    return parameter.stringValue;
  }

  /**
   * Fetches the route table ID from the SSM Parameter Store
   *@param scope - The scope of the construct
   *@param id - The id of the construct
   *@param props - The props of the construct
   *@returns - The ID of the route table
   */
  public static routeTableId(scope: Construct, id: string, props: DataLandingZoneClientRouteTableIdProps): string {
    const accountName = props.accountName;
    const region = props.region;
    const vpcName = props.vpcName;
    const routeTable = props.routeTable;
    const routeTableAddress = new NetworkAddress(accountName, region, vpcName, routeTable);
    const parameterName = `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${routeTableAddress}/id`;
    const parameter = ssm.StringParameter.fromStringParameterName(
      scope,
      id,
      parameterName);
    return parameter.stringValue;
  }

  /**
   * Fetches the subnet ID from the SSM Parameter Store
   *@param scope - The scope of the construct
   *@param id - The id of the construct
   *@param props - The props of the construct
   *@returns - The ID of the subnet
   */
  public static subnetId(scope: Construct, id: string, props: DataLandingZoneClientSubnetIdProps): string {
    const accountName = props.accountName;
    const region = props.region;
    const vpcName = props.vpcName;
    const routeTable = props.routeTable;
    const subnetName = props.subnetName;
    const subnetAddress = new NetworkAddress(accountName, region, vpcName, routeTable, subnetName);
    const parameterName = `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${subnetAddress}/id`;
    const parameter = ssm.StringParameter.fromStringParameterName(
      scope,
      id,
      parameterName);
    return parameter.stringValue;
  }

  /**
   * Fetches the notification topic ARN from the SSM Parameter Store
   *@param scope - The scope of the construct
   *@param id - The id of the construct
   *@returns - The ARN of the notification topic
   */
  public static notificationTopicArn(scope: Construct, id: string): string {
    const parameterName = `${SSM_PARAMETER_DLZ_PREFIX}/sns/default-notification/arn`;
    const parameter = ssm.StringParameter.fromStringParameterName(
      scope,
      id,
      parameterName);
    return parameter.stringValue;
  }

  /**
   * Fetches the permissions boundary ARN from the SSM Parameter Store
   *@param scope - The scope of the construct
   *@param id - The id of the construct
   *@returns - The ARN of the permissions boundary
   */
  public static permissionsBoundaryArn(scope: Construct, id: string): string {
    const parameterName = `${SSM_PARAMETER_DLZ_PREFIX}/iam/permission-boundary-policy/arn`;
    const parameter = ssm.StringParameter.fromStringParameterName(
      scope,
      id,
      parameterName);
    return parameter.stringValue;
  }
}