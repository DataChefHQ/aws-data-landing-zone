import * as iam from 'aws-cdk-lib/aws-iam';
import * as organizations from 'aws-cdk-lib/aws-organizations';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { DLzOrganization } from '../../data-landing-zone';
import { DlzStack } from '../dlz-stack/index';

export interface IamPolicyPermissionsBoundaryProps {
  readonly policyStatement: iam.PolicyStatementProps;
}

export class IamPolicyPermissionBoundryRegion {
  constructor(dlzStack: DlzStack) {
    const accountId: string = dlzStack.accountId;
    new ssm.StringParameter(dlzStack, dlzStack.resourceName('security-entity--iam-permission-boundary'), {
      parameterName: IamPolicyPermissionBoundryManagement.parameterName,
      stringValue: `arn:aws:iam::${accountId}:policy/IamPolicyPermissionBoundryPolicy`,
    });
  }
}

export class IamPolicyPermissionBoundryGlobal {
  constructor(dlzStack: DlzStack, props: IamPolicyPermissionsBoundaryProps) {

    new iam.ManagedPolicy(dlzStack, 'IamPolicyPermissionBoundryPolicy', {
      managedPolicyName: 'IamPolicyPermissionBoundryPolicy',
      statements: [new iam.PolicyStatement(props.policyStatement)],
    });
  }
}

export class IamPolicyPermissionBoundryManagement {

  public static readonly parameterName = '/dlz/security-entity/iam.permission.boundary';

  constructor(dlzStack: DlzStack, organization: DLzOrganization, props: IamPolicyPermissionsBoundaryProps) {

    const allAccountIds: string[] = [
      organization.root.accounts.management.accountId,
      organization.ous.security.accounts.log.accountId,
      organization.ous.security.accounts.audit.accountId,
    ];
    for (const account of organization.ous.workloads.accounts) {
      allAccountIds.push(account.accountId);
    }

    const managedPolicy = new iam.ManagedPolicy(dlzStack, 'IamPolicyPermissionBoundryPolicy', {
      managedPolicyName: 'IamPolicyPermissionBoundryPolicy',
      statements: [new iam.PolicyStatement(props.policyStatement)],
    });

    new organizations.CfnPolicy(dlzStack, 'IamPolicyPermissionBoundrySCPPolicy', {
      name: 'IamPolicyPermissionBoundrySCPPolicy',
      description: `Deny all IAM policy creation/modification unless permissions boundary '${managedPolicy.managedPolicyArn}' is applied`,
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
              ArnNotLike: {
                'iam:PermissionsBoundary': [
                  managedPolicy.managedPolicyArn,
                  'arn:aws:iam::*:policy/IamPolicyPermissionBoundryPolicy',
                ],
              },
            },
          },
        ],
      }),
      type: 'SERVICE_CONTROL_POLICY',
    });
  }
}