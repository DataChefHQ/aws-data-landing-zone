/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks whether logging is enabled for your S3 buckets.
 * https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-logging-enabled.html
 */
export class S3BucketLoggingEnabled implements IDlzConfigRule {
  readonly configRuleName = 's3-bucket-logging-enabled';
  readonly description = 'Checks whether logging is enabled for your S3 buckets. https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-logging-enabled.html';
  readonly identifier = config.ManagedRuleIdentifiers.S3_BUCKET_LOGGING_ENABLED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether logging is enabled for your S3 buckets.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-logging-enabled.html',
  };

}
