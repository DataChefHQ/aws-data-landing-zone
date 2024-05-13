/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks whether your AWS account is enabled to use multi-factor authentication (MFA) hardware device to sign in with root credentials.
 * https://docs.aws.amazon.com/config/latest/developerguide/root-account-hardware-mfa-enabled.html
 */
export class RootAccountHardwareMfaEnabled implements IDlzConfigRule {
  readonly configRuleName = 'root-account-hardware-mfa-enabled';
  readonly description = 'Checks whether your AWS account is enabled to use multi-factor authentication (MFA) hardware device to sign in with root credentials. https://docs.aws.amazon.com/config/latest/developerguide/root-account-hardware-mfa-enabled.html';
  readonly identifier = config.ManagedRuleIdentifiers.ROOT_ACCOUNT_HARDWARE_MFA_ENABLED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether your AWS account is enabled to use multi-factor authentication (MFA) hardware device to sign in with root credentials.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/root-account-hardware-mfa-enabled.html',
  };

}
