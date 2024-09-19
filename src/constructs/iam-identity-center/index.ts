import * as iam from 'aws-cdk-lib/aws-iam';
import * as identitystore from 'aws-cdk-lib/aws-identitystore';
import * as sso from 'aws-cdk-lib/aws-sso';
import { Construct } from 'constructs';

export class SecurityPolicy {
  public static readonly defaultServices = [
    's3',
    'lambda',
    'glue',
    'athena',
    'dynmodb',
    'ec2',
    'api-gateway',
    'cloudwatch',
    'logs',
    'cloudformation',
    'cloudfront',
    'sagemaker',
    'rds',
    'sns',
    'sqs',
  ];

  public static readonly adminPolicy = this.createPolicy();
  public static readonly readOnlyPolicy = this.createPolicy(this.defaultServices, 'List*,Describe*,Get*');

  public static createPolicy(services: string[] = [], wildCard: string = '*'): iam.PolicyDocument {
    let actions: string[] = [];
    let wildCards = wildCard ? wildCard.split(',') : ['*'];
    if (services.length > 0) {
      for (const action of wildCards) {
        actions = [...actions, ...services.map(service => `${service}:${action}`)];
      }
    }

    return new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: actions.length > 0 ? actions : ['*'],
          resources: ['*'],
        }),
      ],
    });
  }
}

export class SecurityAccess {
  public static adminPermissionSet(scope: Construct, ssoArn: string) {
    return this.createPermissionSet(scope, ssoArn, 'AdminAccess', 'Use this permission set/role to grant full access', SecurityPolicy.adminPolicy);
  }

  public static readOnlyPermissionSet(scope: Construct, ssoArn: string) {
    return this.createPermissionSet(scope, ssoArn, 'ReadOnlyAccess', 'Use this permission set/role to grant read only access', SecurityPolicy.readOnlyPolicy);
  }

  public static catalogPermissionSet(scope: Construct, ssoArn: string) {
    return this.createPermissionSet(scope, ssoArn, 'CatalogAccess', 'Use this permission set/role to grants PeopleOps role', undefined, [
      'arn:aws:iam::aws:policy/AWSServiceCatalogAdminFullAccess',
      'arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess',
    ]);
  }

  public static createPermissionSet(
    scope: Construct,
    ssoArn: string,
    name: string,
    description: string = '',
    policy: iam.PolicyDocument | undefined = undefined,
    managedPolicies: string[] = []): sso.CfnPermissionSet {

    const id = `${name}PermissionSet`;
    return new sso.CfnPermissionSet(scope, id, {
      name,
      description,
      inlinePolicy: policy,
      managedPolicies,
      instanceArn: ssoArn,
    });
  }

  public static createGroup(
    scope: Construct,
    name: string,
    ssoArn: string,
    users: string[],
    permissionSet: sso.CfnPermissionSet,
    accounts: string[] = [],
    description: string = '',
  ) {

    const group = new identitystore.CfnGroup(
      scope,
      name,
      {
        displayName: name,
        description: description,
        identityStoreId: ssoArn,
      });

    for (const user of users) {
      new identitystore.CfnGroupMembership(
        scope,
        `${name}-${user}`,
        {
          groupId: group.attrGroupId,
          identityStoreId: group.identityStoreId,
          memberId: {
            userId: user,
          },
        });
    }

    for (const account of accounts) {
      new sso.CfnAssignment(
        scope,
        `${name}-${account}`,
        {
          instanceArn: ssoArn,
          permissionSetArn: permissionSet.attrPermissionSetArn,
          principalId: group.attrGroupId,
          principalType: 'GROUP',
          targetId: account,
          targetType: 'AWS_ACCOUNT',
        },
      );
    }

    return group;
  }
}