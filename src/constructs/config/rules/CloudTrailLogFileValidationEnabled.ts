/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks whether AWS CloudTrail creates a signed digest file with logs.
 * https://docs.aws.amazon.com/config/latest/developerguide/cloud-trail-log-file-validation-enabled.html
 */
export class CloudTrailLogFileValidationEnabled implements IDlzConfigRule {
  readonly configRuleName = 'cloud-trail-log-file-validation-enabled';
  readonly description = 'Checks whether AWS CloudTrail creates a signed digest file with logs. https://docs.aws.amazon.com/config/latest/developerguide/cloud-trail-log-file-validation-enabled.html';
  readonly identifier = config.ManagedRuleIdentifiers.CLOUD_TRAIL_LOG_FILE_VALIDATION_ENABLED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether AWS CloudTrail creates a signed digest file with logs.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/cloud-trail-log-file-validation-enabled.html',
  };

}
