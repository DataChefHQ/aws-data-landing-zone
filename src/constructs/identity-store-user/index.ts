import * as path from 'path';
import { CustomResource, CustomResourceProvider, CustomResourceProviderRuntime, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface IdentityStoreUserProps {
  readonly userName: string;
  readonly name: IdentityStoreUserNameProps;
  readonly displayName: string;
  readonly emails?: IdentityStoreUserEmailsProps[];
}

export interface IdentityStoreUserPropsExt extends IdentityStoreUserProps {
  readonly identityStoreId: string;
}

export interface IdentityStoreUserNameProps {
  readonly formatted: string;
  readonly familyName: string;
  readonly givenName: string;
  readonly middleName?: string;
  readonly honorificPrefix?: string;
  readonly honorificSuffix?: string;
}

export interface IdentityStoreUserEmailsProps {
  readonly value: string;
  readonly type: string;
  readonly primary?: boolean;
}

export class IdentityStoreUser extends Construct {
  public readonly userId: string;

  constructor(scope: Construct, id: string, props: IdentityStoreUserPropsExt) {
    super(scope, id);
    const customResourceProvider = CustomResourceProvider.getOrCreateProvider(
      this,
      'Custom::Resource',
      {
        codeDirectory: path.join(__dirname, 'lambda'),
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
        properties: { ...props },
      },
    );

    this.userId = customResourceResult.getAttString('UserId');

  }
}