/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks the IAM policies that you create for Allow statements that grant permissions to all actions on all resources.
 * https://docs.aws.amazon.com/config/latest/developerguide/iam-policy-no-statements-with-admin-access.html
 */
export class IamPolicyNoStatementsWithAdminAccess implements IDlzConfigRule {
  readonly configRuleName = 'iam-policy-no-statements-with-admin-access';
  readonly description = 'Checks the IAM policies that you create for Allow statements that grant permissions to all actions on all resources. https://docs.aws.amazon.com/config/latest/developerguide/iam-policy-no-statements-with-admin-access.html';
  readonly identifier = config.ManagedRuleIdentifiers.IAM_POLICY_NO_STATEMENTS_WITH_ADMIN_ACCESS;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks the IAM policies that you create for Allow statements that grant permissions to all actions on all resources.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/iam-policy-no-statements-with-admin-access.html',
  };

}
