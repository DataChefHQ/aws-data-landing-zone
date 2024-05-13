/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Ensure access keys are not setup during the initial user setup for all IAM users that have a console password. For all IAM users with console access, compare the user \'Creation time` to the Access Key `Created` date.
 * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
 */
export class ProcessCheckIamUserConsoleAndApiAccessAtCreation implements IDlzConfigRule {
  readonly configRuleName = 'iam-user-console-and-api-access-at-creation';
  readonly description = 'Ensure access keys are not setup during the initial user setup for all IAM users that have a console password. For all IAM users with console access, compare the user \'Creation time` to the Access Key `Created` date. https://docs.aws.amazon.com/config/la';
  readonly identifier = 'AWS_CONFIG_PROCESS_CHECK';

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Ensure access keys are not setup during the initial user setup for all IAM users that have a console password. For all IAM users with console access, compare the user \'Creation time` to the Access Key `Created` date.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html',
  };

}
