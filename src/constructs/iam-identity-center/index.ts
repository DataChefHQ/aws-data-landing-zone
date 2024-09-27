import * as identitystore from 'aws-cdk-lib/aws-identitystore';
import * as sso from 'aws-cdk-lib/aws-sso';
import { Construct } from 'constructs';

export interface IamIdentityCenterGroupProps {
  readonly name: string;
  readonly ssoArn: string;
  readonly identityStoreId: string;
  readonly description?: string;
  readonly users: string[];
  readonly permissionSet: sso.CfnPermissionSet;
  readonly accounts: string[];
}

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

    let i = 0;
    for (const user of users) {
      i++;
      const membership = new identitystore.CfnGroupMembership(
        scope,
        `${name}-membership-` + i,
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
  }
}