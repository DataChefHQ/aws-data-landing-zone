/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks if Amazon Simple Storage Service (Amazon S3) buckets are publicly accessible.
 * https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-level-public-access-prohibited.html
 */
export class S3BucketLevelPublicAccessProhibited implements IDlzConfigRule {
  readonly configRuleName = 's3-bucket-level-public-access-prohibited';
  readonly description = 'Checks if Amazon Simple Storage Service (Amazon S3) buckets are publicly accessible. https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-level-public-access-prohibited.html';
  readonly identifier = config.ManagedRuleIdentifiers.S3_BUCKET_LEVEL_PUBLIC_ACCESS_PROHIBITED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks if Amazon Simple Storage Service (Amazon S3) buckets are publicly accessible.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-level-public-access-prohibited.html',
  };

}
