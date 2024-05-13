/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks if an Amazon Elastic Compute Cloud (Amazon EC2) instance has an Identity and Access Management (IAM) profile attached to it. This rule is NON_COMPLIANT if no IAM profile is attached to the Amazon EC2 instance.
 * https://docs.aws.amazon.com/config/latest/developerguide/ec2-instance-profile-attached.html
 */
export class Ec2InstanceProfileAttached implements IDlzConfigRule {
  readonly configRuleName = 'ec2-instance-profile-attached';
  readonly description = 'Checks if an Amazon Elastic Compute Cloud (Amazon EC2) instance has an Identity and Access Management (IAM) profile attached to it. This rule is NON_COMPLIANT if no IAM profile is attached to the Amazon EC2 instance. https://docs.aws.amazon.com/config/lat';
  readonly identifier = config.ManagedRuleIdentifiers.EC2_INSTANCE_PROFILE_ATTACHED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks if an Amazon Elastic Compute Cloud (Amazon EC2) instance has an Identity and Access Management (IAM) profile attached to it. This rule is NON_COMPLIANT if no IAM profile is attached to the Amazon EC2 instance.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/ec2-instance-profile-attached.html',
  };

}
