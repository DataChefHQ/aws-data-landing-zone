import * as identitystore from 'aws-cdk-lib/aws-identitystore';
import * as sso from 'aws-cdk-lib/aws-sso';
import { Construct } from 'constructs';
import { DlzStack, DlzStackProps } from '../dlz-stack';

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
  public static readonly readWritePolicy = this.createPolicy(this.defaultServices, 'List*,Describe*,Get*,Create*,Update*,Delete*');
  public static readonly servicePolicy = this.createPolicy(this.defaultServices);

  public static createPolicy(services: string[] = [], wildCard: string = '*'): any {
    let actions: string[] = [];
    let wildCards = wildCard ? wildCard.split(',') : ['*'];
    if (services.length > 0) {
      for (const card of wildCards) {
        actions = [...actions, ...services.map(service => `${service}:${card}`)];
      }
    }

    return {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Action: actions.length > 0 ? actions : '*',
          Resource: '*',
        },
      ],
    };
  }
}

export class SecurityAccess {
  public static adminPermissionSet(scope: Construct, ssoArn: string) {
    return this.createPermissionSet(scope, ssoArn, 'AdminAccess', 'Use this permission set/role to grant full access', SecurityPolicy.adminPolicy);
  }

  public static engineeringPermissionSet(scope: Construct, ssoArn: string) {
    return this.createPermissionSet(scope, ssoArn, 'EngineeringAccess', 'Use this permission set/role to grant only interal-tech-ops people', SecurityPolicy.servicePolicy);
  }

  public static readOnlyPermissionSet(scope: Construct, ssoArn: string) {
    return this.createPermissionSet(scope, ssoArn, 'ReadOnlyAccess', 'Use this permission set/role to grant read only access', SecurityPolicy.readOnlyPolicy);
  }

  public static catalogPermissionSet(scope: Construct, ssoArn: string) {
    return this.createPermissionSet(scope, ssoArn, 'CatalogAccess', 'Use this permission set/role to grants PeopleOps role', null, [
      'arn:aws:iam::aws:policy/AWSServiceCatalogAdminFullAccess',
      'arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess',
    ]);
  }

  public static createPermissionSet(
    scope: Construct,
    ssoArn: string,
    name: string,
    description: string = '',
    policy: any = null,
    managedPolicies: string[] = []): sso.CfnPermissionSet {

    const id = `${name}PermissionSet`;
    if (this.permissionSets.has(id)) return this.permissionSets.get(id) || {} as sso.CfnPermissionSet;

    const permissionSet = new sso.CfnPermissionSet(scope, id, {
      name,
      description,
      inlinePolicy: policy,
      managedPolicies,
      instanceArn: ssoArn,
    });

    this.permissionSets.set(id, permissionSet);
    return permissionSet;
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

  private static readonly permissionSets = new Map<string, sso.CfnPermissionSet>();
}

export class IamIdentityCenterStack extends DlzStack {
  constructor(scope: Construct, props: DlzStackProps) {
    super(scope, props);
  }
}