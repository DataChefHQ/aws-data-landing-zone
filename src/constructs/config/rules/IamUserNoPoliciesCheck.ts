/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks that none of your IAM users have policies attached. IAM users must inherit permissions from IAM groups or roles.
 * https://docs.aws.amazon.com/config/latest/developerguide/iam-user-no-policies-check.html
 */
export class IamUserNoPoliciesCheck implements IDlzConfigRule {
  readonly configRuleName = 'iam-user-no-policies-check';
  readonly description = 'Checks that none of your IAM users have policies attached. IAM users must inherit permissions from IAM groups or roles. https://docs.aws.amazon.com/config/latest/developerguide/iam-user-no-policies-check.html';
  readonly identifier = config.ManagedRuleIdentifiers.IAM_USER_NO_POLICIES_CHECK;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks that none of your IAM users have policies attached. IAM users must inherit permissions from IAM groups or roles.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/iam-user-no-policies-check.html',
  };

}
