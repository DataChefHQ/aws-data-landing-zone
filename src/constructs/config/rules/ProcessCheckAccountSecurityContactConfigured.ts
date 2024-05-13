/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Ensure the contact email and telephone number for the your organizations security team are current. Within the My Account section of the AWS Management Console ensure the correct information is specified in the Security section.
 * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
 */
export class ProcessCheckAccountSecurityContactConfigured implements IDlzConfigRule {
  readonly configRuleName = 'account-security-contact-configured';
  readonly description = 'Ensure the contact email and telephone number for the your organizations security team are current. Within the My Account section of the AWS Management Console ensure the correct information is specified in the Security section. https://docs.aws.amazon.co';
  readonly identifier = 'AWS_CONFIG_PROCESS_CHECK';

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Ensure the contact email and telephone number for the your organizations security team are current. Within the My Account section of the AWS Management Console ensure the correct information is specified in the Security section.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html',
  };

}
