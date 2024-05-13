/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Ensure a log metric filter and an alarm exists for disabling or scheduled deletion of customer created CMKs.
 * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
 */
export class ProcessCheckAlarmKmsDisableOrDeleteCmk implements IDlzConfigRule {
  readonly configRuleName = 'alarm-kms-disable-or-delete-cmk';
  readonly description = 'Ensure a log metric filter and an alarm exists for disabling or scheduled deletion of customer created CMKs. https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html';
  readonly identifier = 'AWS_CONFIG_PROCESS_CHECK';

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Ensure a log metric filter and an alarm exists for disabling or scheduled deletion of customer created CMKs.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html',
  };

}
