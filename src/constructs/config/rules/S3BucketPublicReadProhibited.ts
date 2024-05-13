/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks if your Amazon S3 buckets do not allow public read access.
 * https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-public-read-prohibited.html
 */
export class S3BucketPublicReadProhibited implements IDlzConfigRule {
  readonly configRuleName = 's3-bucket-public-read-prohibited';
  readonly description = 'Checks if your Amazon S3 buckets do not allow public read access. https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-public-read-prohibited.html';
  readonly identifier = config.ManagedRuleIdentifiers.S3_BUCKET_PUBLIC_READ_PROHIBITED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks if your Amazon S3 buckets do not allow public read access.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-public-read-prohibited.html',
  };

}
