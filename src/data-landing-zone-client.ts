import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import { AssumeRoleCommand, STSClient, Credentials } from '@aws-sdk/client-sts';
import { NetworkAddress } from './constructs/dlz-vpc/network-address';
import { DynamicConstants, SSM_PARAMETERS_DLZ, SSM_PARAMETER_DLZ_PREFIX } from './stacks/organization/constants';

/*
* This class is used to fetch parameters from the SSM Parameter Store and uses the AWS SDK to assume the role
*/
export class DataLandingZoneClient {

  constructor(private accountId: string, private accountName: string, private region: string) {
  }

  /*
    * Assumes the role and returns the credentials
    * @param roleArn - The ARN of the role to assume
    * @returns - The credentials of the role
    */
  private async assumeRole(roleArn: string): Promise<Credentials | undefined> {
    try {
      const stsClient = new STSClient({ region: this.region });
      const command = new AssumeRoleCommand({
        RoleArn: roleArn,
        RoleSessionName: 'AssumeRoleSession',
      });

      const response = await stsClient.send(command);
      return response.Credentials;
    } catch (error) {
      console.error('Error assuming role:', error);
      return undefined;
    }
  }

  /*
    * Fetches the parameter from the SSM Parameter Store and returns the value
    * @param parameterName - The name of the parameter to fetch
    * @param roleArn - The ARN of the role to assume
    * @returns - The value of the parameter
    */
  private async getSSMParameter(parameterName: string, roleArn: string): Promise<string | undefined> {
    const credentials = await this.assumeRole(roleArn);
    if (!credentials) {
      console.error('Failed to assume role.');
      return undefined;
    }

    const ssmClient = new SSMClient({
      region: this.region,
      credentials: {
        accessKeyId: credentials.AccessKeyId!,
        secretAccessKey: credentials.SecretAccessKey!,
        sessionToken: credentials.SessionToken!,
      },
    });

    try {
      const command = new GetParameterCommand({
        Name: parameterName,
        WithDecryption: true,
      });

      const response = await ssmClient.send(command);
      return response.Parameter?.Value;
    } catch (error) {
      console.error('Error fetching parameter:', error);
      return undefined;
    }
  }

  /*
    * Fetches the parameter from the SSM Parameter Store and returns the value
    * @param parameterName - The name of the parameter to fetch
    * @param errorMessage - The error message to throw if the parameter is not found
    * @returns - The value of the parameter
    */
  private async getParameter(parameterName: string, errorMessage: string): Promise<string> {
    const dynamicProps = new DynamicConstants();
    const assumeRoleArn = dynamicProps.getSsmAssumeCrossAccountRoleArn(this.accountId);
    const value = await this.getSSMParameter(parameterName, assumeRoleArn) as string;
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
  public async getBastionSecurityGroupId(bastionName?: string): Promise<string> {
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
  public async getVpcId(vpcName: string): Promise<string> {
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
  public async routeTableId(vpcName: string, segment: string): Promise<string> {
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
  public async subnetId(vpcName: string, segment: string, subnetName: string): Promise<string> {
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
  public async notificationTopicArn(): Promise<string> {
    return this.getParameter(
      `${SSM_PARAMETER_DLZ_PREFIX}/sns/default-notification/arn`,
      'Failed to get ARN for default notification topic');
  }

  /*
    * Fetches the permissions boundary ARN from the SSM Parameter Store
    * @returns - The ARN of the permissions boundary
    * @throws - An error if the parameter is not found
    */
  public async permissionsBoundaryArn(): Promise<string> {
    return this.getParameter(
      `${SSM_PARAMETER_DLZ_PREFIX}/iam/permission-boundary-policy/arn`,
      'Failed to get ARN for IAM permission boundary policy');
  }
}