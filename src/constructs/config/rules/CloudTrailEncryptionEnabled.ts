/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks whether AWS CloudTrail is configured to use the server side encryption (SSE) AWS Key Management Service (AWS KMS) customer master key (CMK) encryption.
 * https://docs.aws.amazon.com/config/latest/developerguide/cloud-trail-encryption-enabled.html
 */
export class CloudTrailEncryptionEnabled implements IDlzConfigRule {
  readonly configRuleName = 'cloud-trail-encryption-enabled';
  readonly description = 'Checks whether AWS CloudTrail is configured to use the server side encryption (SSE) AWS Key Management Service (AWS KMS) customer master key (CMK) encryption. https://docs.aws.amazon.com/config/latest/developerguide/cloud-trail-encryption-enabled.html';
  readonly identifier = config.ManagedRuleIdentifiers.CLOUD_TRAIL_ENCRYPTION_ENABLED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether AWS CloudTrail is configured to use the server side encryption (SSE) AWS Key Management Service (AWS KMS) customer master key (CMK) encryption.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/cloud-trail-encryption-enabled.html',
  };

}
