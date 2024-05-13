/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks that the default security group of any Amazon Virtual Private Cloud (VPC) does not allow inbound or outbound traffic. The rule returns NOT_APPLICABLE if the security group is not default.
 * https://docs.aws.amazon.com/config/latest/developerguide/vpc-default-security-group-closed.html
 */
export class VpcDefaultSecurityGroupClosed implements IDlzConfigRule {
  readonly configRuleName = 'vpc-default-security-group-closed';
  readonly description = 'Checks that the default security group of any Amazon Virtual Private Cloud (VPC) does not allow inbound or outbound traffic. The rule returns NOT_APPLICABLE if the security group is not default. https://docs.aws.amazon.com/config/latest/developerguide/vpc';
  readonly identifier = config.ManagedRuleIdentifiers.VPC_DEFAULT_SECURITY_GROUP_CLOSED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks that the default security group of any Amazon Virtual Private Cloud (VPC) does not allow inbound or outbound traffic. The rule returns NOT_APPLICABLE if the security group is not default.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/vpc-default-security-group-closed.html',
  };

}
