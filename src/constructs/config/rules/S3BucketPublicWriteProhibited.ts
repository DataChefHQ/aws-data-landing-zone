/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks that your Amazon S3 buckets do not allow public write access.
 * https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-public-write-prohibited.html
 */
export class S3BucketPublicWriteProhibited implements IDlzConfigRule {
  readonly configRuleName = 's3-bucket-public-write-prohibited';
  readonly description = 'Checks that your Amazon S3 buckets do not allow public write access. https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-public-write-prohibited.html';
  readonly identifier = config.ManagedRuleIdentifiers.S3_BUCKET_PUBLIC_WRITE_PROHIBITED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks that your Amazon S3 buckets do not allow public write access.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-public-write-prohibited.html',
  };

}
