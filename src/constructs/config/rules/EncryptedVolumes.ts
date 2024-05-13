/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks whether the EBS volumes that are in an attached state are encrypted.
 * https://docs.aws.amazon.com/config/latest/developerguide/encrypted-volumes.html
 */
export class EncryptedVolumes implements IDlzConfigRule {
  readonly configRuleName = 'encrypted-volumes';
  readonly description = 'Checks whether the EBS volumes that are in an attached state are encrypted. https://docs.aws.amazon.com/config/latest/developerguide/encrypted-volumes.html';
  readonly identifier = config.ManagedRuleIdentifiers.EBS_ENCRYPTED_VOLUMES;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether the EBS volumes that are in an attached state are encrypted.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/encrypted-volumes.html',
  };

}
