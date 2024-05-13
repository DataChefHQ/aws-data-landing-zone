/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks that inline policy feature is not in use.
 * https://docs.aws.amazon.com/config/latest/developerguide/iam-no-inline-policy-check.html
 */
export class IamNoInlinePolicyCheck implements IDlzConfigRule {
  readonly configRuleName = 'iam-no-inline-policy-check';
  readonly description = 'Checks that inline policy feature is not in use. https://docs.aws.amazon.com/config/latest/developerguide/iam-no-inline-policy-check.html';
  readonly identifier = config.ManagedRuleIdentifiers.IAM_NO_INLINE_POLICY_CHECK;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks that inline policy feature is not in use.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/iam-no-inline-policy-check.html',
  };

}
