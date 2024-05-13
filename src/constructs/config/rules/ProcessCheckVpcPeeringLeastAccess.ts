/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Ensure the routing tables for Amazon VPC peering are "least access". Within the VPC section of the console, examine the route table entries to ensure that the least number of subnets or hosts are required to accomplish the purpose for peering are routable.
 * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
 */
export class ProcessCheckVpcPeeringLeastAccess implements IDlzConfigRule {
  readonly configRuleName = 'vpc-peering-least-access';
  readonly description = 'Ensure the routing tables for Amazon VPC peering are "least access". Within the VPC section of the console, examine the route table entries to ensure that the least number of subnets or hosts are required to accomplish the purpose for peering are routable';
  readonly identifier = 'AWS_CONFIG_PROCESS_CHECK';

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Ensure the routing tables for Amazon VPC peering are "least access". Within the VPC section of the console, examine the route table entries to ensure that the least number of subnets or hosts are required to accomplish the purpose for peering are routable.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html',
  };

}
