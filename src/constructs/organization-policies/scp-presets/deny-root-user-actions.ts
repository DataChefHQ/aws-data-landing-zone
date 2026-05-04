import * as iam from 'aws-cdk-lib/aws-iam';

/** Denies all root-user actions. Plan a break-glass detach procedure before attaching. */
export class ScpDenyRootUserActions {
  public static statement(): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'DenyRootUserActions',
      effect: iam.Effect.DENY,
      actions: ['*'],
      resources: ['*'],
      conditions: {
        StringLike: {
          'aws:PrincipalArn': ['arn:aws:iam::*:root'],
        },
      },
    });
  }
}
