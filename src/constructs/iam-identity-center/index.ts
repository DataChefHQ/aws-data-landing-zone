import * as iam from 'aws-cdk-lib/aws-iam';
import * as identitystore from 'aws-cdk-lib/aws-identitystore';
import * as sso from 'aws-cdk-lib/aws-sso';
import { Construct } from 'constructs';

export class SecurityAccess {
  public static adminPermissionSet(scope: Construct, ssoArn: string) {
    return this.createPermissionSet(scope, ssoArn, 'DLZ-AdminAccess', 'Use this permission set/role to grant full access', undefined, [
      'arn:aws:iam::aws:policy/AdministratorAccess',
    ]);
  }

  public static readOnlyPermissionSet(scope: Construct, ssoArn: string) {
    return this.createPermissionSet(scope, ssoArn, 'DLZ-ReadOnlyAccess', 'Use this permission set/role to grant read only access', undefined, [
      'arn:aws:iam::aws:policy/ReadOnlyAccess',
    ]);
  }

  public static catalogPermissionSet(scope: Construct, ssoArn: string) {
    return this.createPermissionSet(scope, ssoArn, 'DLZ-CatalogAccess', 'Use this permission set/role to grant Service Catalog access', undefined, [
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
    identityStoreId: string,
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
        identityStoreId,
      });

    let i = 0;
    for (const user of users) {
      i++;
      const id = `${name}-membership-` + i;
      const membership = new identitystore.CfnGroupMembership(
        scope,
        id,
        {
          groupId: group.attrGroupId,
          identityStoreId,
          memberId: {
            userId: user,
          },
        });

      membership.node.addDependency(group);
    }

    for (const account of accounts) {
      const assignment = new sso.CfnAssignment(
        scope,
        `${name}-${account}-assignment`,
        {
          instanceArn: ssoArn,
          permissionSetArn: permissionSet.attrPermissionSetArn,
          principalId: group.attrGroupId,
          principalType: 'GROUP',
          targetId: account,
          targetType: 'AWS_ACCOUNT',
        },
      );
      assignment.node.addDependency(group);
      assignment.node.addDependency(permissionSet);
    }

    return group;
  }
}