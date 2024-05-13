/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

export interface S3BucketVersioningEnabledProps {
  /** @default true */
  isMfaDeleteEnabled: boolean;
}

/**
 * Checks whether versioning is enabled for your S3 buckets.
 * https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-versioning-enabled.html
 */
export class S3BucketVersioningEnabled implements IDlzConfigRule {
  readonly configRuleName = 's3-bucket-versioning-enabled';
  readonly description = 'Checks whether versioning is enabled for your S3 buckets. https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-versioning-enabled.html';
  readonly identifier = config.ManagedRuleIdentifiers.S3_BUCKET_VERSIONING_ENABLED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether versioning is enabled for your S3 buckets.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-versioning-enabled.html',
  };
  readonly inputParameters: { [p: string]: any };
  constructor(props?: S3BucketVersioningEnabledProps) {
    this.inputParameters = props ?? {
      isMfaDeleteEnabled: true,
    };
  }
}
