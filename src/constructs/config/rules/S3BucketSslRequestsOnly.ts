/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks whether S3 buckets have policies that require requests to use Secure Socket Layer (SSL).
 * https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-ssl-requests-only.html
 */
export class S3BucketSslRequestsOnly implements IDlzConfigRule {
  readonly configRuleName = 's3-bucket-ssl-requests-only';
  readonly description = 'Checks whether S3 buckets have policies that require requests to use Secure Socket Layer (SSL). https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-ssl-requests-only.html';
  readonly identifier = config.ManagedRuleIdentifiers.S3_BUCKET_SSL_REQUESTS_ONLY;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether S3 buckets have policies that require requests to use Secure Socket Layer (SSL).',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-ssl-requests-only.html',
  };

}
