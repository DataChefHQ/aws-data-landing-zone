import * as iam from 'aws-cdk-lib/aws-iam';
import { ControlTowerExemption } from './control-tower-exemption';

/** Enforces the `IamPolicyPermissionBoundaryPolicy` boundary across IAM create/update/delete. Requires `iamPolicyPermissionBoundary` to be configured. */
export class ScpDenyIamWithoutPermissionsBoundary {
  public static statements(): iam.PolicyStatement[] {
    const boundaryArn = 'arn:aws:iam::*:policy/IamPolicyPermissionBoundaryPolicy';

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
          ...ControlTowerExemption.arnNotLike(),
          StringNotLike: {
            'iam:PermissionsBoundary': [boundaryArn],
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
        resources: [boundaryArn],
        conditions: ControlTowerExemption.arnNotLike(),
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
          ...ControlTowerExemption.arnNotLike(),
          StringLike: {
            'iam:PermissionsBoundary': [boundaryArn],
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
          ...ControlTowerExemption.arnNotLike(),
          StringNotLike: {
            'iam:PermissionsBoundary': [boundaryArn],
          },
        },
      }),
    ];
  }
}
