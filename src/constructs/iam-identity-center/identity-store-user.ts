import * as path from 'path';
import { CustomResource, CustomResourceProvider, CustomResourceProviderRuntime, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * A user in the IAM Identity Center
 */
export interface IdentityStoreUserProps {
  readonly userName: string;
  readonly name: IdentityStoreUserNameProps;
  readonly displayName: string;
  readonly email: IdentityStoreUserEmailsProps;
}

/**
 * A user in the IAM Identity Center
 */
export interface IdentityStoreUserPropsExt extends IdentityStoreUserProps {
  readonly identityStoreId: string;
}

/**
 * The name of a user in the IAM Identity Center
 */
export interface IdentityStoreUserNameProps {
  readonly formatted: string;
  readonly familyName: string;
  readonly givenName: string;
  readonly middleName?: string;
  readonly honorificPrefix?: string;
  readonly honorificSuffix?: string;
}

/**
 * The email of a user in the IAM Identity Center
 */
export interface IdentityStoreUserEmailsProps {
  readonly value: string;
  readonly type: string;
  readonly primary?: boolean;
}

/**
 * A user in the IAM Identity Center
 */
export class IdentityStoreUser extends Construct {
  public static fetchCodeDirectory(): string {
    return path.join(__dirname, 'identity-store-user-lambda');
  }

  public readonly userId: string;

  constructor(scope: Construct, id: string, props: IdentityStoreUserPropsExt) {
    super(scope, id);
    const customResourceProvider = CustomResourceProvider.getOrCreateProvider(
      this,
      'Custom::DlzIdentityStoreUser',
      {
        codeDirectory: IdentityStoreUser.fetchCodeDirectory(),
        runtime: CustomResourceProviderRuntime.NODEJS_18_X,
        timeout: Duration.seconds(60),
        policyStatements: [
          {
            Effect: 'Allow',
            Action: [
              'identitystore:CreateUser',
              'identitystore:DescribeUser',
              'identitystore:UpdateUser',
              'identitystore:DeleteUser',
              'identitystore:ListUsers',
            ],
            Resource: '*',
          },
        ],
      },
    );

    const customResourceResult = new CustomResource(
      this,
      'customResourceResult',
      {
        serviceToken: customResourceProvider.serviceToken,
        properties: props,
      },
    );

    this.userId = customResourceResult.getAttString('UserId');
  }
}