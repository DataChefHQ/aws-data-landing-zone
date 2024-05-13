/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

export interface IamUserUnusedCredentialsCheckProps {
  /** @default 45 */
  maxCredentialUsageAge: number;
}

/**
 * Checks whether your AWS Identity and Access Management (IAM) users have passwords or active access keys that have not been used within the specified number of days you provided.
 * https://docs.aws.amazon.com/config/latest/developerguide/iam-user-unused-credentials-check.html
 */
export class IamUserUnusedCredentialsCheck implements IDlzConfigRule {
  readonly configRuleName = 'iam-user-unused-credentials-check';
  readonly description = 'Checks whether your AWS Identity and Access Management (IAM) users have passwords or active access keys that have not been used within the specified number of days you provided. https://docs.aws.amazon.com/config/latest/developerguide/iam-user-unused-cred';
  readonly identifier = config.ManagedRuleIdentifiers.IAM_USER_UNUSED_CREDENTIALS_CHECK;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether your AWS Identity and Access Management (IAM) users have passwords or active access keys that have not been used within the specified number of days you provided.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/iam-user-unused-credentials-check.html',
  };
  readonly inputParameters: { [p: string]: any };
  constructor(props?: IamUserUnusedCredentialsCheckProps) {
    this.inputParameters = props ?? {
      maxCredentialUsageAge: 45,
    };
  }
}
