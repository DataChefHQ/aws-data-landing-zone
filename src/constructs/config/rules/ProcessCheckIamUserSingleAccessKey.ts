/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Ensure there is only one active access key available for any single IAM user. For all IAM users check that there is only one active key used within the Security Credentials tab for each user within IAM.
 * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
 */
export class ProcessCheckIamUserSingleAccessKey implements IDlzConfigRule {
  readonly configRuleName = 'iam-user-single-access-key';
  readonly description = 'Ensure there is only one active access key available for any single IAM user. For all IAM users check that there is only one active key used within the Security Credentials tab for each user within IAM. https://docs.aws.amazon.com/config/latest/developerg';
  readonly identifier = 'AWS_CONFIG_PROCESS_CHECK';

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Ensure there is only one active access key available for any single IAM user. For all IAM users check that there is only one active key used within the Security Credentials tab for each user within IAM.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html',
  };

}
