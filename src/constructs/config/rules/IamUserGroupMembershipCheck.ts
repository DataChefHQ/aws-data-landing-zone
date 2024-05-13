/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks whether IAM users are members of at least one IAM group.
 * https://docs.aws.amazon.com/config/latest/developerguide/iam-user-group-membership-check.html
 */
export class IamUserGroupMembershipCheck implements IDlzConfigRule {
  readonly configRuleName = 'iam-user-group-membership-check';
  readonly description = 'Checks whether IAM users are members of at least one IAM group. https://docs.aws.amazon.com/config/latest/developerguide/iam-user-group-membership-check.html';
  readonly identifier = config.ManagedRuleIdentifiers.IAM_USER_GROUP_MEMBERSHIP_CHECK;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether IAM users are members of at least one IAM group.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/iam-user-group-membership-check.html',
  };

}
