import * as iam from 'aws-cdk-lib/aws-iam';
import * as organizations from 'aws-cdk-lib/aws-organizations';
import * as ram from 'aws-cdk-lib/aws-ram';
import { DLzOrganization } from '../../data-landing-zone';
import { DlzStack } from '../dlz-stack/index';

export interface IamPolicyPermissionsBoundaryProps {
  readonly policyStatements: iam.PolicyStatement[];
}

export class IamPolicyPermissionBoundry {

  constructor(dlzStack: DlzStack, organization: DLzOrganization, props: IamPolicyPermissionsBoundaryProps) {

    const allAccountIds: string[] = [
      organization.root.accounts.management.accountId,
      organization.ous.security.accounts.log.accountId,
      organization.ous.security.accounts.audit.accountId,
    ];
    for (const account of organization.ous.workloads.accounts) {
      allAccountIds.push(account.accountId);
    }

    const permissionsBoundaryPolicy = new iam.ManagedPolicy(dlzStack, 'IamPolicyPermissionBoundryPolicy', {
      managedPolicyName: 'IamPolicyPermissionBoundryPolicy',
      statements: props.policyStatements,
    });

    new ram.CfnResourceShare(dlzStack, 'IamPolicyPermissionBoundryPolicyShare', {
      name: 'IamPolicyPermissionBoundryPolicyShare',
      resourceArns: [permissionsBoundaryPolicy.managedPolicyArn],
      principals: allAccountIds,
      allowExternalPrincipals: true,
    });

    new organizations.CfnPolicy(dlzStack, 'IamPolicyPermissionBoundrySCPPolicy', {
      name: 'IamPolicyPermissionBoundrySCPPolicy',
      description: `Deny all IAM policy creation/modification unless permissions boundary ${permissionsBoundaryPolicy.managedPolicyArn} is applied`,
      targetIds: allAccountIds,
      content: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Deny',
            Action: [
              'iam:CreatePolicy',
              'iam:CreatePolicyVersion',
              'iam:PutRolePolicy',
              'iam:PutUserPolicy',
              'iam:PutGroupPolicy',
              'iam:DeletePolicy',
              'iam:DeletePolicyVersion',
            ],
            Resource: '*',
            Condition: {
              StringNotEquals: {
                'iam:PermissionsBoundary': permissionsBoundaryPolicy.managedPolicyArn,
              },
            },
          },
        ],
      }),
      type: 'SERVICE_CONTROL_POLICY',
    });

  }
}