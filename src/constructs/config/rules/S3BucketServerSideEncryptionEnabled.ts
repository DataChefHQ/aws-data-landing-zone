/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks that your Amazon S3 bucket either has Amazon S3 default encryption enabled or that the S3 bucket policy explicitly denies put-object requests without server side encryption that uses AES-256 or AWS Key Management Service.
 * https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-server-side-encryption-enabled.html
 */
export class S3BucketServerSideEncryptionEnabled implements IDlzConfigRule {
  readonly configRuleName = 's3-bucket-server-side-encryption-enabled';
  readonly description = 'Checks that your Amazon S3 bucket either has Amazon S3 default encryption enabled or that the S3 bucket policy explicitly denies put-object requests without server side encryption that uses AES-256 or AWS Key Management Service. https://docs.aws.amazon.co';
  readonly identifier = config.ManagedRuleIdentifiers.S3_BUCKET_SERVER_SIDE_ENCRYPTION_ENABLED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks that your Amazon S3 bucket either has Amazon S3 default encryption enabled or that the S3 bucket policy explicitly denies put-object requests without server side encryption that uses AES-256 or AWS Key Management Service.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-server-side-encryption-enabled.html',
  };

}
