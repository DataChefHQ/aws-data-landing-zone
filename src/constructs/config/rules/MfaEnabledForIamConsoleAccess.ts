/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks whether AWS Multi-Factor Authentication (MFA) is enabled for all IAM users that use a console password.
 * https://docs.aws.amazon.com/config/latest/developerguide/mfa-enabled-for-iam-console-access.html
 */
export class MfaEnabledForIamConsoleAccess implements IDlzConfigRule {
  readonly configRuleName = 'mfa-enabled-for-iam-console-access';
  readonly description = 'Checks whether AWS Multi-Factor Authentication (MFA) is enabled for all IAM users that use a console password. https://docs.aws.amazon.com/config/latest/developerguide/mfa-enabled-for-iam-console-access.html';
  readonly identifier = config.ManagedRuleIdentifiers.MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether AWS Multi-Factor Authentication (MFA) is enabled for all IAM users that use a console password.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/mfa-enabled-for-iam-console-access.html',
  };

}
