import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as sso from 'aws-cdk-lib/aws-sso';
import { CfnPermissionSet } from 'aws-cdk-lib/aws-sso/lib/sso.generated';
import { Construct } from 'constructs';
import { IamIdentityCenterGroup, IamIdentityCenterGroupUser } from './iam-identity-center-group';
import { IdentityStoreUser, IdentityStoreUserProps } from './identity-store-user';
import { DLzOrganization } from '../../data-landing-zone-types';
import { durationToIso8601 } from '../../lib/cdk-utils';
import { SSM_PARAMETERS_DLZ } from '../../stacks/organization/constants';
import { DlzStack } from '../dlz-stack/index';

/**
 * A permission set in the IAM Identity Center
 */
export interface IamIdentityCenterPermissionSetProps {
  readonly name: string;
  readonly description?: string;
  readonly inlinePolicyDocument?: iam.PolicyDocument;
  readonly managedPolicyArns?: string[];
  readonly permissionsBoundary?: cdk.IResolvable | CfnPermissionSet.PermissionsBoundaryProperty;
  readonly sessionDuration?: cdk.Duration;
  /**
   * Pins this permission set to a specific allow-list of accounts. The check
   * runs after wildcard expansion, so `accountNames: ['*']` is rejected too.
   * @default - no restriction; can be assigned to any account
   */
  readonly allowedAccountNames?: string[];
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
    if (organization.ous.sharedServices?.accounts.finOps) {
      allAccountIds.set('finOps', organization.ous.sharedServices.accounts.finOps.accountId);
    }
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
    const permissionSetAllowedAccounts = new Map<string, string[]>();
    for (const permissionSetConf of iamIdentityCenter.permissionSets ?? []) {
      const permissionSet = new sso.CfnPermissionSet(dlzStack, dlzStack.resourceName(permissionSetConf.name),
        {
          instanceArn: iamIdentityCenter.arn,
          name: permissionSetConf.name,
          description: permissionSetConf.description,
          inlinePolicy: permissionSetConf.inlinePolicyDocument ? permissionSetConf.inlinePolicyDocument.toJSON() : undefined,
          managedPolicies: permissionSetConf.managedPolicyArns,
          permissionsBoundary: permissionSetConf.permissionsBoundary,
          sessionDuration: permissionSetConf.sessionDuration ? durationToIso8601(permissionSetConf.sessionDuration) : undefined,
        },
      );
      allPermissionSets.set(permissionSetConf.name, permissionSet);
      if (permissionSetConf.allowedAccountNames) {
        permissionSetAllowedAccounts.set(permissionSetConf.name, permissionSetConf.allowedAccountNames);
      }
    }

    /* Build groups */
    const allGroups = new Map<string, IamIdentityCenterGroup>();
    for (const group of iamIdentityCenter.accessGroups ?? []) {

      // Empty userNames is intentional — groups can exist for external routing
      // (Identity Center console, IdP sync, QuickSight group→role mapping).
      for (const groupUserName of group.userNames ?? []) {
        if (!allUsersIds.has(groupUserName)) {
          cdk.Annotations.of(dlzStack).addError(`The user ${groupUserName} in group ${group.name} does not exist`);
        }
      }
      const groupUserIds = group.userNames
        ?.filter(userName => allUsersIds.has(userName))
        .map(userName => <IamIdentityCenterGroupUser>{ userId: allUsersIds.get(userName)!, userName }) || [];

      const groupAccountIds: string[] = [];
      const groupResolvedAccountNames: string[] = [];
      for (const groupAccountName of group.accountNames) {
        if (groupAccountName === '*') {
          for (const [name, id] of allAccountIds.entries()) {
            groupAccountIds.push(id);
            groupResolvedAccountNames.push(name);
          }
          continue;
        }

        if (groupAccountName.endsWith('*')) {
          const accountPrefix = groupAccountName.slice(0, -1);
          const matchedNames: string[] = [];
          for (const accountName of allAccountNames) {
            if (accountName.startsWith(accountPrefix)) {
              matchedNames.push(accountName);
            }
          }
          if (matchedNames.length === 0) {
            cdk.Annotations.of(dlzStack).addError(`No accounts found for group ${group.name} with wildcard ${groupAccountName}`);
            continue;
          }
          for (const name of matchedNames) {
            groupAccountIds.push(allAccountIds.get(name)!);
            groupResolvedAccountNames.push(name);
          }
          continue;
        }

        if (!allAccountIds.has(groupAccountName)) {
          cdk.Annotations.of(dlzStack).addError(`The account ${groupAccountName} in group ${group.name} does not exist`);
          continue;
        }
        groupAccountIds.push(allAccountIds.get(groupAccountName)!);
        groupResolvedAccountNames.push(groupAccountName);
      }

      const allowedAccounts = permissionSetAllowedAccounts.get(group.permissionSetName);
      if (allowedAccounts) {
        const allowedSet = new Set(allowedAccounts);
        const offenders = groupResolvedAccountNames.filter(name => !allowedSet.has(name));
        if (offenders.length > 0) {
          cdk.Annotations.of(dlzStack).addError(
            `Permission set "${group.permissionSetName}" is restricted to [${allowedAccounts.join(', ')}], ` +
            `but group "${group.name}" would assign it to disallowed account(s): [${[...new Set(offenders)].join(', ')}]. ` +
            `Either narrow the group's accountNames, or extend allowedAccountNames on the permission set.`,
          );
        }
      }

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

      allGroups.set(group.name, groupConstruct);
    }

    const ssmPrefix = SSM_PARAMETERS_DLZ.IDENTITY_CENTER_PREFIX;
    new ssm.StringParameter(dlzStack, 'ssm-identity-center-instance-arn', {
      parameterName: `${ssmPrefix}instance-arn`,
      stringValue: iamIdentityCenter.arn,
    });
    new ssm.StringParameter(dlzStack, 'ssm-identity-center-instance-id', {
      parameterName: `${ssmPrefix}instance-id`,
      stringValue: iamIdentityCenter.id,
    });
    new ssm.StringParameter(dlzStack, 'ssm-identity-center-store-id', {
      parameterName: `${ssmPrefix}store-id`,
      stringValue: iamIdentityCenter.storeId,
    });

    for (const [groupName, groupConstruct] of allGroups.entries()) {
      new ssm.StringParameter(dlzStack, `ssm-identity-center-group-${groupName}-id`, {
        parameterName: `${ssmPrefix}groups/${groupName}/id`,
        stringValue: groupConstruct.groupId,
        description: `Identity Center GroupId for ${groupName}`,
      });
    }
    if (allGroups.size > 0) {
      new ssm.StringListParameter(dlzStack, 'ssm-identity-center-group-names', {
        parameterName: `${ssmPrefix}group-names`,
        stringListValue: [...allGroups.keys()],
        description: 'List of Identity Center group display names provisioned by DLZ',
      });
    }

    for (const [permissionSetName, permissionSet] of allPermissionSets.entries()) {
      new ssm.StringParameter(dlzStack, `ssm-identity-center-permission-set-${permissionSetName}-arn`, {
        parameterName: `${ssmPrefix}permission-sets/${permissionSetName}/arn`,
        stringValue: permissionSet.attrPermissionSetArn,
        description: `Permission set ARN for ${permissionSetName}`,
      });
    }
    if (allPermissionSets.size > 0) {
      new ssm.StringListParameter(dlzStack, 'ssm-identity-center-permission-set-names', {
        parameterName: `${ssmPrefix}permission-set-names`,
        stringListValue: [...allPermissionSets.keys()],
        description: 'List of Identity Center permission set names provisioned by DLZ',
      });
    }
  }

}