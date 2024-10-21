import * as iam from 'aws-cdk-lib/aws-iam';
import * as organizations from 'aws-cdk-lib/aws-organizations';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { SSM_PARAMETERS_DLZ } from '../../stacks/organization/constants';
import { DlzStack } from '../dlz-stack/index';

export interface IamPolicyPermissionsBoundaryProps {
  readonly policyStatement: iam.PolicyStatementProps;
}

export class IamPolicyPermissionBoundry {

  public static createParameter(dlzStack: DlzStack) {
    const parameterValue = (<any>dlzStack.node.tryFindChild(dlzStack.resourceName('security-entity--iam-permission-boundary')))?.stringValue;
    if (!parameterValue) return;

    new ssm.StringParameter(dlzStack, dlzStack.resourceName('security-entity--iam-permission-boundary'), {
      parameterName: `${SSM_PARAMETERS_DLZ.SECURITY_ENTITY_PREFIX}/iam.permission.boundary`,
      stringValue: parameterValue,
    });
  }

  constructor(dlzStack: DlzStack, props: IamPolicyPermissionsBoundaryProps) {
    const accountId: string = dlzStack.accountId;

    const permissionsBoundaryPolicy = new iam.ManagedPolicy(dlzStack, 'IamPolicyPermissionBoundryPolicy', {
      managedPolicyName: 'IamPolicyPermissionBoundryPolicy',
      statements: [new iam.PolicyStatement(props.policyStatement)],
    });

    new organizations.CfnPolicy(dlzStack, 'IamPolicyPermissionBoundrySCPPolicy', {
      name: 'IamPolicyPermissionBoundrySCPPolicy',
      description: `Deny all IAM policy creation/modification unless permissions boundary ${permissionsBoundaryPolicy.managedPolicyArn} is applied`,
      targetIds: [accountId],
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

    new ssm.StringParameter(dlzStack, dlzStack.resourceName('security-entity--iam-permission-boundary'), {
      parameterName: `${SSM_PARAMETERS_DLZ.SECURITY_ENTITY_PREFIX}/iam.permission.boundary`,
      stringValue: permissionsBoundaryPolicy.managedPolicyArn,
    });
  }
}