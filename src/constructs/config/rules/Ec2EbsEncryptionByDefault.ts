/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Check that Amazon Elastic Block Store (EBS) encryption is enabled by default.
 * https://docs.aws.amazon.com/config/latest/developerguide/ec2-ebs-encryption-by-default.html
 */
export class Ec2EbsEncryptionByDefault implements IDlzConfigRule {
  readonly configRuleName = 'ec2-ebs-encryption-by-default';
  readonly description = 'Check that Amazon Elastic Block Store (EBS) encryption is enabled by default. https://docs.aws.amazon.com/config/latest/developerguide/ec2-ebs-encryption-by-default.html';
  readonly identifier = config.ManagedRuleIdentifiers.EC2_EBS_ENCRYPTION_BY_DEFAULT;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Check that Amazon Elastic Block Store (EBS) encryption is enabled by default.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/ec2-ebs-encryption-by-default.html',
  };

}
