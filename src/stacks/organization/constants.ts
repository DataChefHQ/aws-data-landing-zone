
export const SSM_ASSUME_CROSS_ACCOUNT_ROLE_NAME = 'dlz-global-dlz-ssm-cross-account-assume-role';
export const SSM_PARAMETER_DLZ_PREFIX = '/dlz';

export const SSM_PARAMETERS_DLZ = {
  NETWORKING_ENTITY_PREFIX: `${SSM_PARAMETER_DLZ_PREFIX}/networking-entity/`,
  NETWORKING_VPC_PEERING_ROLE_PREFIX: `${SSM_PARAMETER_DLZ_PREFIX}/networking/vpc-peering-role-arn--`,
};


export class DynamicConstants {

  public getSsmAssumeCrossAccountRoleArn(accountId: string): string {
    return `arn:aws:iam::${accountId}:role/${SSM_ASSUME_CROSS_ACCOUNT_ROLE_NAME}`;
  }

}


