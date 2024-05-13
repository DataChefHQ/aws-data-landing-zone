/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Ensure the contact email and telephone number for AWS accounts are current and map to more than one individual in your organization. Within the My Account section of the console ensure correct information is specified in the Contact Information section.
 * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
 */
export class ProcessCheckAccountContactDetailsConfigured implements IDlzConfigRule {
  readonly configRuleName = 'account-contact-details-configured';
  readonly description = 'Ensure the contact email and telephone number for AWS accounts are current and map to more than one individual in your organization. Within the My Account section of the console ensure correct information is specified in the Contact Information section. h';
  readonly identifier = 'AWS_CONFIG_PROCESS_CHECK';

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Ensure the contact email and telephone number for AWS accounts are current and map to more than one individual in your organization. Within the My Account section of the console ensure correct information is specified in the Contact Information section.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html',
  };

}
