/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Ensure AWS Config is enabled in all AWS Regions. Within the AWS Config section of the console, for each Region enabled ensure the AWS Config recorder is configured correctly. Ensure recording of global AWS resources is enabled at least in one Region.
 * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
 */
export class ProcessCheckConfigEnabledAllRegions implements IDlzConfigRule {
  readonly configRuleName = 'config-enabled-all-regions';
  readonly description = 'Ensure AWS Config is enabled in all AWS Regions. Within the AWS Config section of the console, for each Region enabled ensure the AWS Config recorder is configured correctly. Ensure recording of global AWS resources is enabled at least in one Region. http';
  readonly identifier = 'AWS_CONFIG_PROCESS_CHECK';

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Ensure AWS Config is enabled in all AWS Regions. Within the AWS Config section of the console, for each Region enabled ensure the AWS Config recorder is configured correctly. Ensure recording of global AWS resources is enabled at least in one Region.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html',
  };

}
