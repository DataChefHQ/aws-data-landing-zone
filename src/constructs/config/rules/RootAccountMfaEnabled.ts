/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks whether users of your AWS account require a multi-factor authentication (MFA) device to sign in with root credentials.
 * https://docs.aws.amazon.com/config/latest/developerguide/root-account-mfa-enabled.html
 */
export class RootAccountMfaEnabled implements IDlzConfigRule {
  readonly configRuleName = 'root-account-mfa-enabled';
  readonly description = 'Checks whether users of your AWS account require a multi-factor authentication (MFA) device to sign in with root credentials. https://docs.aws.amazon.com/config/latest/developerguide/root-account-mfa-enabled.html';
  readonly identifier = config.ManagedRuleIdentifiers.ROOT_ACCOUNT_MFA_ENABLED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether users of your AWS account require a multi-factor authentication (MFA) device to sign in with root credentials.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/root-account-mfa-enabled.html',
  };

}
