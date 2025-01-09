import * as iam from 'aws-cdk-lib/aws-iam';
import * as cr from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { IReportResource, ReportResource, ReportType } from '../../lib';

export interface IamPasswordPolicyProps {
  readonly allowUsersToChangePassword?: boolean;
  /**
   *  Prevents IAM users who are accessing the account via the AWS Management Console from setting a new console
   *  password after their password has expired. The IAM user cannot access the console until an administrator resets
   *  the password.
   *
   * If you do not specify a value for this parameter, then the operation uses the default value of false. The result
   * is that IAM users can change their passwords after they expire and continue to sign in as the user.
   */
  readonly hardExpiry?: boolean;

  /**
   * The number of days that an IAM user password is valid.
   * If you do not specify a value for this parameter, then the operation uses the default value of 0.
   * The result is that IAM user passwords never expire.
   *
   * Valid Range: Minimum value of 1. Maximum value of 1095.
   */
  readonly maxPasswordAge?: number;
  readonly minimumPasswordLength?: number;

  /**
   * Specifies the number of previous passwords that IAM users are prevented from reusing.
   *
   * If you do not specify a value for this parameter, then the operation uses the default value of 0. The result
   * is that IAM users are not prevented from reusing previous passwords.

   * Valid Range: Minimum value of 1. Maximum value of 24.
   */
  readonly passwordReusePrevention?: number;
  readonly requireLowercaseCharacters?: boolean;
  readonly requireNumbers?: boolean;
  /**
   * Specifies whether IAM user passwords must contain at least one of the following non-alphanumeric characters:
   * ! @ # $ % ^ & * ( ) _ + - = [ ] { } | '
   */
  readonly requireSymbols?: boolean;
  readonly requireUppercaseCharacters?: boolean;
}

/**
 * Set the IAM Password Policy
 */
export class IamPasswordPolicy extends Construct implements IReportResource {
  readonly reportResource: ReportResource;

  constructor(scope: Construct, id: string, props: IamPasswordPolicyProps) {
    super(scope, id);

    new cr.AwsCustomResource(this, 'iam-password-policy-custom-resource', {
      resourceType: 'Custom::IamSetPasswordPolicy',
      onUpdate: {
        physicalResourceId: cr.PhysicalResourceId.of(id),
        service: 'IAM',
        action: 'updateAccountPasswordPolicy',
        parameters: {
          MinimumPasswordLength: props.minimumPasswordLength,
          RequireSymbols: props.requireSymbols,
          RequireNumbers: props.requireNumbers,
          RequireUppercaseCharacters: props.requireUppercaseCharacters,
          RequireLowercaseCharacters: props.requireLowercaseCharacters,
          AllowUsersToChangePassword: props.allowUsersToChangePassword,
          MaxPasswordAge: props.maxPasswordAge,
          PasswordReusePrevention: props.passwordReusePrevention,
          HardExpiry: props.hardExpiry,
        },
      },
      onDelete: {
        service: 'IAM',
        action: 'deleteAccountPasswordPolicy',
        parameters: {},
      },
      policy: cr.AwsCustomResourcePolicy.fromStatements([
        new iam.PolicyStatement({
          actions: ['iam:UpdateAccountPasswordPolicy', 'iam:DeleteAccountPasswordPolicy'],
          resources: ['*'],
        }),
      ]),
    });

    this.reportResource = {
      type: ReportType.IAM_PASSWORD_POLICY,
      name: ReportType.IAM_PASSWORD_POLICY,
      description: JSON.stringify(props),
    };
  }
}