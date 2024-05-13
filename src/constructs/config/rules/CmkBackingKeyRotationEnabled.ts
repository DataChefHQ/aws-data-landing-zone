/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks that key rotation is enabled for each key and matches to the key ID of the customer created customer master key (CMK).
 * https://docs.aws.amazon.com/config/latest/developerguide/cmk-backing-key-rotation-enabled.html
 */
export class CmkBackingKeyRotationEnabled implements IDlzConfigRule {
  readonly configRuleName = 'cmk-backing-key-rotation-enabled';
  readonly description = 'Checks that key rotation is enabled for each key and matches to the key ID of the customer created customer master key (CMK). https://docs.aws.amazon.com/config/latest/developerguide/cmk-backing-key-rotation-enabled.html';
  readonly identifier = config.ManagedRuleIdentifiers.CMK_BACKING_KEY_ROTATION_ENABLED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks that key rotation is enabled for each key and matches to the key ID of the customer created customer master key (CMK).',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/cmk-backing-key-rotation-enabled.html',
  };

}
