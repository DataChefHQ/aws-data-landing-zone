/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks whether AWS CloudTrail trails are configured to send logs to Amazon CloudWatch Logs.
 * https://docs.aws.amazon.com/config/latest/developerguide/cloud-trail-cloud-watch-logs-enabled.html
 */
export class CloudTrailCloudWatchLogsEnabled implements IDlzConfigRule {
  readonly configRuleName = 'cloud-trail-cloud-watch-logs-enabled';
  readonly description = 'Checks whether AWS CloudTrail trails are configured to send logs to Amazon CloudWatch Logs. https://docs.aws.amazon.com/config/latest/developerguide/cloud-trail-cloud-watch-logs-enabled.html';
  readonly identifier = config.ManagedRuleIdentifiers.CLOUD_TRAIL_CLOUD_WATCH_LOGS_ENABLED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether AWS CloudTrail trails are configured to send logs to Amazon CloudWatch Logs.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/cloud-trail-cloud-watch-logs-enabled.html',
  };

}
