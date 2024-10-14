import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sso from 'aws-cdk-lib/aws-sso';
import { CfnPermissionSet } from 'aws-cdk-lib/aws-sso/lib/sso.generated';
import { Construct } from 'constructs';
import { IamIdentityCenterGroup, IamIdentityCenterGroupUser } from './iam-identity-center-group';
import { IdentityStoreUser, IdentityStoreUserProps } from './identity-store-user';
import {
  DLzOrganization,
} from '../../data-landing-zone';
import { durationToIso8601 } from '../../lib/cdk-utils';
import { DlzStack } from '../dlz-stack/index';

/**
 * A permission set in the IAM Identity Center
 */
export interface IamIdentityCenterPermissionSetProps {
  readonly name: string;
  readonly description?: string;
  readonly inlinePolicyStatement?: iam.PolicyStatement;
  readonly managedPolicyArns?: string[];
  readonly permissionsBoundary?: cdk.IResolvable | CfnPermissionSet.PermissionsBoundaryProperty;
  readonly sessionDuration?: cdk.Duration;
}

/**
 * An access group in the IAM Identity Center
 */
export interface IamIdentityCenterAccessGroupProps {
  readonly name: string;
  readonly description?: string;
  readonly userNames?: string[];
  readonly permissionSetName: string;
  readonly accountNames: string[];

}

export interface IamIdentityCenterProps {
  readonly arn: string;
  readonly id: string;
  readonly storeId: string;
  readonly users?: IdentityStoreUserProps[];
  readonly permissionSets?: IamIdentityCenterPermissionSetProps[];
  readonly accessGroups?: IamIdentityCenterAccessGroupProps[];
}

/**
 * The IAM Identity Center
 */
export class IamIdentityCenter {

  constructor(dlzStack: DlzStack, organization: DLzOrganization, iamIdentityCenter: IamIdentityCenterProps) {

    /* Get map of all accounts */
    const allAccountIds = new Map<string, string>();
    allAccountIds.set('root', organization.root.accounts.management.accountId);
    allAccountIds.set('log', organization.ous.security.accounts.log.accountId);
    allAccountIds.set('audit', organization.ous.security.accounts.audit.accountId);
    for (const account of organization.ous.workloads.accounts) {
      if (allAccountIds.has(account.name)) {
        cdk.Annotations.of(dlzStack).addError(`Duplicate account ${account.name} found ignoring account id ${account.accountId}`);
        continue;
      }
      allAccountIds.set(account.name, account.accountId);
    }
    const allAccountNames = allAccountIds.keys();

    /* Create all users */
    const allUsersIds = new Map<string, string>();
    const awsSsoUsers = new Map<string, IdentityStoreUser>();
    for (const user of iamIdentityCenter.users ?? []) {
      const displayName = `${user.name} ${user.surname}`;
      const userConstruct = new IdentityStoreUser(dlzStack, dlzStack.resourceName(`aws-sso-user-${user.userName}`),
        {
          userName: user.userName,
          name: {
            formatted: displayName,
            familyName: user.surname,
            givenName: user.name,
          },
          email: {
            value: user.userName,
            type: 'work',
          },
          displayName,
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
      const groupUserIds = group.userNames
        ?.filter(userName => allUsersIds.has(userName))
        .map(userName => <IamIdentityCenterGroupUser>{ userId: allUsersIds.get(userName)!, userName }) || [];

      if (groupUserIds.length === 0) {
        cdk.Annotations.of(dlzStack).addError(`No users found for group ${group.name}`);
        continue;
      }

      /* Check that group accounts exist and get IDs */
      const groupAccountIds: string[] = [];
      for (const groupAccountName of group.accountNames) {
        if (groupAccountName === '*') {
          groupAccountIds.push(...allAccountIds.values());
          continue;
        }

        if (groupAccountName.endsWith('*')) {
          const accountPrefix = groupAccountName.slice(0, -1);
          const groupAccountIdsForWildcard: string[] = [];
          for (const accountName of allAccountNames) {
            if (accountName.startsWith(accountPrefix)) {
              groupAccountIdsForWildcard.push(allAccountIds.get(accountName)!);
            }
          }
          if (groupAccountIdsForWildcard.length === 0) {
            cdk.Annotations.of(dlzStack).addError(`No accounts found for group ${group.name} with wildcard ${groupAccountName}`);
            continue;
          }
          groupAccountIds.push(...groupAccountIdsForWildcard);
          continue;
        }

        const isAccountNumber = groupAccountName.match(/^\d{12}$/);
        if (!isAccountNumber) {
          groupAccountIds.push(allAccountIds.get(groupAccountName)!);
          continue;
        }
        if (!allAccountIds.has(groupAccountName)) {
          cdk.Annotations.of(dlzStack).addError(`The account ${groupAccountName} in group ${group.name} does not exist`);
          continue;
        }
        groupAccountIds.push(allAccountIds.get(groupAccountName)!);
      }

      /* Check that group permission sets exist */
      if (!allPermissionSets.has(group.permissionSetName)) {
        cdk.Annotations.of(dlzStack).addError(`PermissionSet ${group.permissionSetName} in group ${group.name} does not exist`);
      }
      const groupPermissionSet = allPermissionSets.get(group.permissionSetName)!;
      const depenencyUsers: Construct[] = (groupUserIds || [])
        .filter(user => awsSsoUsers.has(user.userName))
        .map(user => awsSsoUsers.get(user.userName)!);

      const groupConstruct = new IamIdentityCenterGroup(
        dlzStack,
        dlzStack.resourceName(group.name),
        {
          ssoArn: iamIdentityCenter.arn,
          identityStoreId: iamIdentityCenter.storeId,
          users: groupUserIds,
          permissionSet: groupPermissionSet,
          accounts: groupAccountIds,
          description: group.description,
          name: group.name,
        });

      groupConstruct.node.addDependency(groupPermissionSet);
      for (const awsSsoUser of depenencyUsers) {
        groupConstruct.node.addDependency(awsSsoUser);
      }
    }
  }

}