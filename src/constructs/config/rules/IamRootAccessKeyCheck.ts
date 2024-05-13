/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks whether the root user access key is available.
 * https://docs.aws.amazon.com/config/latest/developerguide/iam-root-access-key-check.html
 */
export class IamRootAccessKeyCheck implements IDlzConfigRule {
  readonly configRuleName = 'iam-root-access-key-check';
  readonly description = 'Checks whether the root user access key is available. https://docs.aws.amazon.com/config/latest/developerguide/iam-root-access-key-check.html';
  readonly identifier = config.ManagedRuleIdentifiers.IAM_ROOT_ACCESS_KEY_CHECK;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether the root user access key is available.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/iam-root-access-key-check.html',
  };

}
