import * as iam from 'aws-cdk-lib/aws-iam';

/** Denies member-account root actions while allowing AWS Organizations centralized-root sessions (`aws:AssumedRoot`). */
export class ScpDenyRootCredentialsManagementInMemberAccounts {
  public static statement(): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'DenyRootCredentialsManagementInMemberAccounts',
      effect: iam.Effect.DENY,
      actions: ['*'],
      resources: ['*'],
      conditions: {
        ArnLike: {
          'aws:PrincipalArn': ['arn:aws:iam::*:root'],
        },
        Null: {
          'aws:AssumedRoot': 'true',
        },
      },
    });
  }
}
