import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sso from 'aws-cdk-lib/aws-sso';

import { CfnPermissionSet } from 'aws-cdk-lib/aws-sso/lib/sso.generated';
import { IamIdentityCenterGroup } from './iam-identity-center-group';
import { IdentityStoreUser, IdentityStoreUserProps } from './identity-store-user';
import {
  DLzOrganization,
} from '../../data-landing-zone';
import { durationToIso8601 } from '../../lib/cdk-utils';
import { DlzStack } from '../dlz-stack/index';

export interface IamIdentityCenterIdpUser {
  readonly name: string;
  readonly userId: string;
}

export interface IamIdentityCenterPermissionSetProps {
  readonly name: string;
  readonly description?: string;
  readonly inlinePolicyStatement?: iam.PolicyStatement;
  readonly managedPolicyArns?: string[];
  readonly permissionsBoundary?: cdk.IResolvable | CfnPermissionSet.PermissionsBoundaryProperty;
  readonly sessionDuration?: cdk.Duration;
}

export interface IamIdentityCenterAccessGroupProps {
  readonly name: string;
  readonly description?: string;
  readonly userNames?: string[];
  readonly permissionSetName: string;
  readonly accountNames: string[];

}

export interface IamIdentityCenterUsers {
  readonly identityStore?: IdentityStoreUserProps[];
  readonly idp?: IamIdentityCenterIdpUser[];
}

export interface IamIdentityCenterProps {
  readonly arn: string;
  readonly id: string;
  readonly storeId: string;
  readonly users?: IamIdentityCenterUsers;
  readonly permissionSets?: IamIdentityCenterPermissionSetProps[];
  readonly accessGroups?: IamIdentityCenterAccessGroupProps[];
}

export class IamIdentityCenter {

  constructor(dlzStack: DlzStack, organization: DLzOrganization, iamIdentityCenter: IamIdentityCenterProps) {

    /* Get map of all accounts */
    const allAccountIds = new Map<string, string>();
    allAccountIds.set('root', organization.root.accounts.management.accountId);
    allAccountIds.set('log', organization.ous.security.accounts.log.accountId);
    allAccountIds.set('audit', organization.ous.security.accounts.audit.accountId);
    for (const account of organization.ous.workloads.accounts) {
      allAccountIds.set(account.name, account.accountId);
    }
    const allAccountNames = allAccountIds.keys();

    /* Create all users */
    const allUsersIds = new Map<string, string>();
    for (const user of iamIdentityCenter.users?.idp ?? []) {
      allUsersIds.set(user.name, user.userId);
    }
    const awsSsoUsers = new Map<string, IdentityStoreUser>();
    for (const user of iamIdentityCenter.users?.identityStore ?? []) {
      if (!/^[a-zA-Z0-9]+[a-zA-Z0-9\-\_]+\*?$/.test(user.userName)) {
        cdk.Annotations.of(dlzStack).addError(`Invalid user name: ${user.userName} - only letters, numbers, - and _ are allowed`);
        continue;
      }
      const userConstruct = new IdentityStoreUser(dlzStack, dlzStack.resourceName(`aws-sso-user-${user.userName}`),
        {
          ...user,
          identityStoreId: iamIdentityCenter.storeId,
        });
      awsSsoUsers.set(user.userName, userConstruct);
      allUsersIds.set(user.userName, userConstruct.userId);
    }

    /* Create all permission sets */
    const allPermissionSets = new Map<string, sso.CfnPermissionSet>();
    for (const permissionSetConf of iamIdentityCenter.permissionSets ?? []) {
      const permissionSet = new sso.CfnPermissionSet(dlzStack, dlzStack.resourceName(permissionSetConf.name),
        {
          instanceArn: iamIdentityCenter.arn,
          name: permissionSetConf.name,
          description: permissionSetConf.description,
          inlinePolicy: permissionSetConf.inlinePolicyStatement ? permissionSetConf.inlinePolicyStatement?.toJSON() : undefined,
          managedPolicies: permissionSetConf.managedPolicyArns,
          permissionsBoundary: permissionSetConf.permissionsBoundary,
          sessionDuration: permissionSetConf.sessionDuration ? durationToIso8601(permissionSetConf.sessionDuration) : undefined,
        },
      );
      allPermissionSets.set(permissionSetConf.name, permissionSet);
    }

    /* Build groups */
    for (const group of iamIdentityCenter.accessGroups ?? []) {

      /* Check that group users exist and get IDs */
      for (const groupUserName of group.userNames ?? []) {
        if (!allUsersIds.has(groupUserName)) {
          cdk.Annotations.of(dlzStack).addError(`The user ${groupUserName} in group ${group.name} does not exist`);
        }
      }
      const groupUserIds = group.userNames?.map(userName => allUsersIds.get(userName)!);

      /* Check that group accounts exist and get IDs */
      const groupAccountIds: string[] = [];
      for (const groupAccountName of group.accountNames) {
        if (!allAccountIds.has(groupAccountName)) {
          cdk.Annotations.of(dlzStack).addError(`The account ${groupAccountName} in group ${group.name} does not exist`);
          continue;
        }
        if (groupAccountName.endsWith('*')) {
          const accountPrefix = groupAccountName.slice(0, -1);
          for (const accountName of allAccountNames) {
            if (accountName.startsWith(accountPrefix)) {
              groupAccountIds.push(allAccountIds.get(accountName)!);
            }
          }
        } else {
          groupAccountIds.push(allAccountIds.get(groupAccountName)!);
        }
      }

      /* Check that group permission sets exist */
      if (!allPermissionSets.has(group.permissionSetName)) {
        cdk.Annotations.of(dlzStack).addError(`PermissionSet ${group.permissionSetName} in group ${group.name} does not exist`);
      }
      const groupPermissionSet = allPermissionSets.get(group.permissionSetName)!;

      const groupConstruct = new IamIdentityCenterGroup(
        dlzStack,
        dlzStack.resourceName(group.name),
        {
          ssoArn: iamIdentityCenter.arn,
          identityStoreId: iamIdentityCenter.storeId,
          users: groupUserIds ?? [],
          permissionSet: groupPermissionSet,
          accounts: groupAccountIds,
          description: group.description,
          name: group.name,
        });

      groupConstruct.node.addDependency(groupPermissionSet);
      for (const awsSsoUser of awsSsoUsers) {
        groupConstruct.node.addDependency(awsSsoUser);
      }
    }
  }

}