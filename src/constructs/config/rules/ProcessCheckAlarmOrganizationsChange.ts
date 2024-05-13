/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Ensure a log metric filter and an alarm exists for AWS Organizations changes.
 * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
 */
export class ProcessCheckAlarmOrganizationsChange implements IDlzConfigRule {
  readonly configRuleName = 'alarm-organizations-change';
  readonly description = 'Ensure a log metric filter and an alarm exists for AWS Organizations changes. https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html';
  readonly identifier = 'AWS_CONFIG_PROCESS_CHECK';

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Ensure a log metric filter and an alarm exists for AWS Organizations changes.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html',
  };

}
