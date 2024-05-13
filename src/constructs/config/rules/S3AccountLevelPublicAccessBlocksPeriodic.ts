/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

export interface S3AccountLevelPublicAccessBlocksPeriodicProps {
  /** @default True */
  BlockPublicAcls: string;
  /** @default True */
  BlockPublicPolicy: string;
  /** @default True */
  IgnorePublicAcls: string;
  /** @default True */
  RestrictPublicBuckets: string;
}

/**
 * Checks if the required public access block settings are configured from account level.
 * https://docs.aws.amazon.com/config/latest/developerguide/s3-account-level-public-access-blocks-periodic.html
 */
export class S3AccountLevelPublicAccessBlocksPeriodic implements IDlzConfigRule {
  readonly configRuleName = 's3-account-level-public-access-blocks-periodic';
  readonly description = 'Checks if the required public access block settings are configured from account level. https://docs.aws.amazon.com/config/latest/developerguide/s3-account-level-public-access-blocks-periodic.html';
  readonly identifier = config.ManagedRuleIdentifiers.S3_ACCOUNT_LEVEL_PUBLIC_ACCESS_BLOCKS_PERIODIC;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks if the required public access block settings are configured from account level.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/s3-account-level-public-access-blocks-periodic.html',
  };
  readonly inputParameters: { [p: string]: any };
  constructor(props?: S3AccountLevelPublicAccessBlocksPeriodicProps) {
    this.inputParameters = props ?? {
      BlockPublicAcls: 'True',
      BlockPublicPolicy: 'True',
      IgnorePublicAcls: 'True',
      RestrictPublicBuckets: 'True',
    };
  }
}
