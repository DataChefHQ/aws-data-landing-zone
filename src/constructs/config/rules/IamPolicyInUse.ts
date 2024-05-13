/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

export interface IamPolicyInUseProps {
  /** @default arn:aws:iam::aws:policy/AWSSupportAccess */
  policyARN: string;
}

/**
 * Checks whether the IAM policy ARN is attached to an IAM user, or an IAM group with one or more IAM users, or an IAM role with one or more trusted entity.
 * https://docs.aws.amazon.com/config/latest/developerguide/iam-policy-in-use.html
 */
export class IamPolicyInUse implements IDlzConfigRule {
  readonly configRuleName = 'iam-policy-in-use';
  readonly description = 'Checks whether the IAM policy ARN is attached to an IAM user, or an IAM group with one or more IAM users, or an IAM role with one or more trusted entity. https://docs.aws.amazon.com/config/latest/developerguide/iam-policy-in-use.html';
  readonly identifier = config.ManagedRuleIdentifiers.IAM_POLICY_IN_USE;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether the IAM policy ARN is attached to an IAM user, or an IAM group with one or more IAM users, or an IAM role with one or more trusted entity.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/iam-policy-in-use.html',
  };
  readonly inputParameters: { [p: string]: any };
  constructor(props?: IamPolicyInUseProps) {
    this.inputParameters = props ?? {
      policyARN: 'arn:aws:iam::aws:policy/AWSSupportAccess',
    };
  }
}
