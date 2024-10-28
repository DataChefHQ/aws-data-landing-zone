import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { NetworkAddress } from './constructs/dlz-vpc/network-address';
import { SSM_PARAMETERS_DLZ, SSM_PARAMETER_DLZ_PREFIX } from './stacks/organization/constants';

/*
* This class is used to fetch parameters from the SSM Parameter Store and uses the AWS SDK to assume the role
*/
export class DataLandingZoneClient {

  constructor(private scope: Construct, private accountName: string, private region: string) {
  }


  /*
          * Fetches the parameter from the SSM Parameter Store and returns the value
          * @param parameterName - The name of the parameter to fetch
          * @param errorMessage - The error message to throw if the parameter is not found
          * @returns - The value of the parameter
          */
  private getParameter(parameterName: string, errorMessage: string): string {
    const value = ssm.StringParameter.valueFromLookup(this.scope, parameterName);
    if (!value) {
      throw new Error(errorMessage);
    }
    return value;
  }

  /*
          * Fetches the bastion security group ID from the SSM Parameter Store
          * @param bastionName - The name of the bastion to fetch the security group ID for
          * @returns - The security group ID of the bastion
          * @throws - An error if the parameter is not found
          */
  public getBastionSecurityGroupId(bastionName?: string): string {
    bastionName = bastionName ?? 'default';

    return this.getParameter(
      `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}bastion/${bastionName}/security-group/id`,
      `Failed to get bastion security group id for ${bastionName}`);
  }

  /*
          * Fetches the VPC ID from the SSM Parameter Store
          * @param vpcName - The name of the VPC to fetch the ID for
          * @returns - The ID of the VPC
          * @throws - An error if the parameter is not found
          */
  public getVpcId(vpcName: string): string {
    const vpcAddress = new NetworkAddress(this.accountName, this.region, vpcName);
    return this.getParameter(
      `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${vpcAddress}/id`,
      `Failed to get vpc id for ${vpcAddress}`);
  }

  /*
          * Fetches the route table ID from the SSM Parameter Store
          * @param vpcName - The name of the VPC to fetch the route table ID for
          * @param segment - The segment of the VPC to fetch the route table ID for
          * @returns - The ID of the route table
          * @throws - An error if the parameter is not found
          */
  public routeTableId(vpcName: string, segment: string): string {
    const routeTableAddress = new NetworkAddress(this.accountName, this.region, vpcName, segment);
    return this.getParameter(
      `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${routeTableAddress}/id`,
      `Failed to get route table id for ${routeTableAddress}`);
  }

  /*
          * Fetches the subnet ID from the SSM Parameter Store
          * @param vpcName - The name of the VPC to fetch the subnet ID for
          * @param segment - The segment of the VPC to fetch the subnet ID for
          * @param subnetName - The name of the subnet to fetch the ID for
          * @returns - The ID of the subnet
          * @throws - An error if the parameter is not found
          */
  public getSubnetId(vpcName: string, segment: string, subnetName: string): string {
    const subnetAddress = new NetworkAddress(this.accountName, this.region, vpcName, segment, subnetName);
    return this.getParameter(
      `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${subnetAddress}/id`,
      `Failed to get subnet id for ${subnetAddress}`);
  }

  /*
          * Fetches the notification topic ARN from the SSM Parameter Store
          * @returns - The ARN of the notification topic
          * @throws - An error if the parameter is not found
          */
  public notificationTopicArn(): string {
    return this.getParameter(
      `${SSM_PARAMETER_DLZ_PREFIX}/sns/default-notification/arn`,
      'Failed to get ARN for default notification topic');
  }

  /*
          * Fetches the permissions boundary ARN from the SSM Parameter Store
          * @returns - The ARN of the permissions boundary
          * @throws - An error if the parameter is not found
          */
  public permissionsBoundaryArn(): string {
    return this.getParameter(
      `${SSM_PARAMETER_DLZ_PREFIX}/iam/permission-boundary-policy/arn`,
      'Failed to get ARN for IAM permission boundary policy');
  }
}