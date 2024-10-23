import * as iam from 'aws-cdk-lib/aws-iam';
import * as organizations from 'aws-cdk-lib/aws-organizations';
import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { DlzTag } from './tag-policy';
import { IReportResource, ReportResource, ReportType } from '../../lib/report';

const excludeCtRoles = {
  ArnNotLike: {
    'aws:PrincipalARN': [
      'arn:aws:iam::*:role/AWSControlTowerExecution',
    ],
  },
};

export interface DlzServiceControlPolicyProps {
  readonly statements: iam.PolicyStatement[];

  /* Copied from CfnPolicyProps because can not use Omit */
  readonly description?: string;
  readonly name: string;
  readonly tags?: Array<cdk.CfnTag>;
  readonly targetIds?: Array<string>;
}

export class DlzServiceControlPolicy implements IReportResource {

  public static denyServiceActionStatements(serviceActions: string[]) {
    return new iam.PolicyStatement({
      sid: 'DenyServiceActions',
      effect: iam.Effect.DENY,
      actions: serviceActions,
      resources: ['*'],
      conditions: excludeCtRoles,
    });
  }

  public static denyIamPolicyActionStatements() {
    return [
      new iam.PolicyStatement({
        sid: 'DenyCreatingUserWithoutPermisionBoundary',
        effect: iam.Effect.DENY,
        actions: [
          'iam:CreateUser',
          'iam:CreateRole',
        ],
        resources: [
          'arn:aws:iam::*:user/*',
          'arn:aws:iam::*:role/*',
        ],
        conditions: {
          ...excludeCtRoles,
          StringNotLike: {
            'iam:PermissionsBoundary': ['arn:aws:iam::*:policy/IamPolicyPermissionBoundaryPolicy'],
          },
        },
      }),
      new iam.PolicyStatement({
        sid: 'DenyDeletingPolicy',
        effect: iam.Effect.DENY,
        actions: [
          'iam:DeletePolicy',
          'iam:DeletePolicyVersion',
          'iam:CreatePolicyVersion',
          'iam:SetDefaultPolicyVersion',
        ],
        resources: [
          'arn:aws:iam::*:policy/IamPolicyPermissionBoundaryPolicy',
        ],
        conditions: {
          ...excludeCtRoles,
        },
      }),
      new iam.PolicyStatement({
        sid: 'DenyDeletingPermBoundaryFromAnyUserOrRole',
        effect: iam.Effect.DENY,
        actions: [
          'iam:DeleteUserPermissionsBoundary',
          'iam:DeleteRolePermissionsBoundary',
        ],
        resources: [
          'arn:aws:iam::*:user/*',
          'arn:aws:iam::*:role/*',
        ],
        conditions: {
          ...excludeCtRoles,
          StringLike: {
            'iam:PermissionsBoundary': ['arn:aws:iam::*:policy/IamPolicyPermissionBoundaryPolicy'],
          },
        },
      }),
      new iam.PolicyStatement({
        sid: 'DenyUpdatingPermissionBoundary',
        effect: iam.Effect.DENY,
        actions: [
          'iam:PutUserPermissionsBoundary',
          'iam:PutRolePermissionsBoundary',
        ],
        resources: [
          'arn:aws:iam::*:user/*',
          'arn:aws:iam::*:role/*',
        ],
        conditions: {
          ...excludeCtRoles,
          StringNotLike: {
            'iam:PermissionsBoundary': ['arn:aws:iam::*:policy/IamPolicyPermissionBoundaryPolicy'],
          },
        },
      }),
    ];
  }
  public static denyCfnStacksWithoutStandardTags(tags: DlzTag[]) {
    return new iam.PolicyStatement({
      sid: 'DenyCfnStacksWithoutStandardTags',
      effect: iam.Effect.DENY,
      actions: ['cloudformation:CreateStack'],
      resources: ['*'],
      conditions: {
        Null: tags.reduce<Record<string, string[] | boolean>>((acc, tag) => {
          acc[`aws:RequestTag/${tag.name}`] = tag.values ? tag.values : true;
          return acc;
        }, {}),
      },
    });
  }

  public readonly policy: organizations.CfnPolicy;
  public readonly reportResource: ReportResource;

  constructor(scope: Construct, id: string, props: DlzServiceControlPolicyProps) {
    this.policy = new organizations.CfnPolicy(scope,
      id, {
        name: props.name,
        type: 'SERVICE_CONTROL_POLICY',
        description: props.description,
        targetIds: props.targetIds,
        content: new iam.PolicyDocument({ statements: props.statements }).toJSON(),
      });

    const statementNames = props.statements.map((statement) => statement.sid);

    this.reportResource = {
      type: ReportType.SERVICE_CONTROL_POLICY,
      name: props.name,
      description: statementNames.join(', '),
      externalLink: '',
    };
  }
}

