import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import { AssumeRoleCommand, STSClient, Credentials } from '@aws-sdk/client-sts';
import { NetworkAddress } from './constructs/dlz-vpc/network-address';
import { DynamicConstants, SSM_PARAMETERS_DLZ, SSM_PARAMETER_DLZ_PREFIX } from './stacks/organization/constants';

export class DataLandingZoneClient {

  constructor(private accountId: string, private accountName: string, private region: string) {
  }

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

  private async getParameter(parameterName: string, errorMessage: string): Promise<string> {
    const dynamicProps = new DynamicConstants();
    const assumeRoleArn = dynamicProps.getSsmAssumeCrossAccountRoleArn(this.accountId);
    const value = await this.getSSMParameter(parameterName, assumeRoleArn) as string;
    if (!value) {
      throw new Error(errorMessage);
    }
    return value;
  }

  public async getBastionSecurityGroupId(bastionName?: string): Promise<string> {
    bastionName = bastionName ?? 'default';

    return this.getParameter(
      `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}bastion/${bastionName}/security-group/id`,
      `Failed to get bastion security group id for ${bastionName}`);
  }

  public async getVpcId(vpcName: string): Promise<string> {
    const vpcAddress = new NetworkAddress(this.accountName, this.region, vpcName);
    return this.getParameter(
      `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${vpcAddress}/id`,
      `Failed to get vpc id for ${vpcAddress}`);
  }

  public async routeTableId(vpcName: string, segment: string): Promise<string> {
    const routeTableAddress = new NetworkAddress(this.accountName, this.region, vpcName, segment);
    return this.getParameter(
      `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${routeTableAddress}/id`,
      `Failed to get route table id for ${routeTableAddress}`);
  }

  public async notificationTopicArn(): Promise<string> {
    return this.getParameter(
      `${SSM_PARAMETER_DLZ_PREFIX}/sns/default-notification/arn`,
      'Failed to get ARN for default notification topic');
  }

  public async permissionsBoundaryArn(): Promise<string> {
    return this.getParameter(
      `${SSM_PARAMETER_DLZ_PREFIX}/iam/permission-boundary-policy/arn`,
      'Failed to get ARN for IAM permission boundary policy');
  }
}