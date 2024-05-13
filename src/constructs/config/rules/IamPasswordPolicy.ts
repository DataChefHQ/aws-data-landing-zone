/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

export interface IamPasswordPolicyProps {
  /** @default 90 */
  MaxPasswordAge: number;
  /** @default 14 */
  MinimumPasswordLength: number;
  /** @default 24 */
  PasswordReusePrevention: number;
  /** @default true */
  RequireLowercaseCharacters: boolean;
  /** @default true */
  RequireNumbers: boolean;
  /** @default true */
  RequireSymbols: boolean;
  /** @default true */
  RequireUppercaseCharacters: boolean;
}

/**
 * Checks whether the account password policy for IAM users meets the specified requirements indicated in the parameters.
 * https://docs.aws.amazon.com/config/latest/developerguide/iam-password-policy.html
 */
export class IamPasswordPolicy implements IDlzConfigRule {
  readonly configRuleName = 'iam-password-policy';
  readonly description = 'Checks whether the account password policy for IAM users meets the specified requirements indicated in the parameters. https://docs.aws.amazon.com/config/latest/developerguide/iam-password-policy.html';
  readonly identifier = config.ManagedRuleIdentifiers.IAM_PASSWORD_POLICY;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether the account password policy for IAM users meets the specified requirements indicated in the parameters.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/iam-password-policy.html',
  };
  readonly inputParameters: { [p: string]: any };
  constructor(props?: IamPasswordPolicyProps) {
    this.inputParameters = props ?? {
      MaxPasswordAge: 90,
      MinimumPasswordLength: 14,
      PasswordReusePrevention: 24,
      RequireLowercaseCharacters: true,
      RequireNumbers: true,
      RequireSymbols: true,
      RequireUppercaseCharacters: true,
    };
  }
}
