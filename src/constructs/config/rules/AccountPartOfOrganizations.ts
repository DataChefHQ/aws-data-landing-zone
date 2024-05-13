/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks whether AWS account is part of AWS Organizations.
 * https://docs.aws.amazon.com/config/latest/developerguide/account-part-of-organizations.html
 */
export class AccountPartOfOrganizations implements IDlzConfigRule {
  readonly configRuleName = 'account-part-of-organizations';
  readonly description = 'Checks whether AWS account is part of AWS Organizations. https://docs.aws.amazon.com/config/latest/developerguide/account-part-of-organizations.html';
  readonly identifier = config.ManagedRuleIdentifiers.ACCOUNT_PART_OF_ORGANIZATIONS;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether AWS account is part of AWS Organizations.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/account-part-of-organizations.html',
  };

}
