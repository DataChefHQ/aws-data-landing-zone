import * as identitystore from 'aws-cdk-lib/aws-identitystore';
import * as sso from 'aws-cdk-lib/aws-sso';
import { Construct } from 'constructs';

/**
 * A group of users in the IAM Identity Center
 */
export interface IamIdentityCenterGroupProps {
  readonly name: string;
  readonly ssoArn: string;
  readonly identityStoreId: string;
  readonly description?: string;
  readonly users: IamIdentityCenterGroupUser[];
  readonly permissionSet: sso.CfnPermissionSet;
  readonly accounts: string[];
}

/**
 * A user in the IAM Identity Center
 */
export interface IamIdentityCenterGroupUser {
  readonly userId: string;
  readonly userName: string;
}

/**
 * A group of users in the IAM Identity Center
 */
export class IamIdentityCenterGroup extends Construct {

  constructor(scope: Construct, id: string, props: IamIdentityCenterGroupProps) {
    super(scope, id);

    const { name, ssoArn, identityStoreId, description, users, permissionSet, accounts } = props;

    const group = new identitystore.CfnGroup(
      scope,
      name,
      {
        displayName: name,
        description: description,
        identityStoreId,
      });

    for (const user of users) {
      const membership = new identitystore.CfnGroupMembership(
        scope,
        `${name}-membership-${user.userName}`,
        {
          groupId: group.attrGroupId,
          identityStoreId,
          memberId: {
            userId: user.userId,
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
  }
}