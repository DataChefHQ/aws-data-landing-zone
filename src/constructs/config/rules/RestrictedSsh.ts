/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks whether the incoming SSH traffic for the security groups is accessible.
 * https://docs.aws.amazon.com/config/latest/developerguide/incoming-ssh-disabled.html
 */
export class RestrictedSsh implements IDlzConfigRule {
  readonly configRuleName = 'restricted-ssh';
  readonly description = 'Checks whether the incoming SSH traffic for the security groups is accessible. https://docs.aws.amazon.com/config/latest/developerguide/incoming-ssh-disabled.html';
  readonly identifier = config.ManagedRuleIdentifiers.EC2_SECURITY_GROUPS_INCOMING_SSH_DISABLED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether the incoming SSH traffic for the security groups is accessible.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/incoming-ssh-disabled.html',
  };

}
