/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks whether at least one AWS CloudTrail trail is logging Amazon S3 data events for all S3 buckets.
 * https://docs.aws.amazon.com/config/latest/developerguide/cloudtrail-s3-dataevents-enabled.html
 */
export class CloudtrailS3DataeventsEnabled implements IDlzConfigRule {
  readonly configRuleName = 'cloudtrail-s3-dataevents-enabled';
  readonly description = 'Checks whether at least one AWS CloudTrail trail is logging Amazon S3 data events for all S3 buckets. https://docs.aws.amazon.com/config/latest/developerguide/cloudtrail-s3-dataevents-enabled.html';
  readonly identifier = config.ManagedRuleIdentifiers.CLOUDTRAIL_S3_DATAEVENTS_ENABLED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether at least one AWS CloudTrail trail is logging Amazon S3 data events for all S3 buckets.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/cloudtrail-s3-dataevents-enabled.html',
  };

}
