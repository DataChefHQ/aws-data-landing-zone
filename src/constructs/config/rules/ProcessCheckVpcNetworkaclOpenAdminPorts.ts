/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Ensure no network ACLs allow public ingress to the remote server administration ports. Within the VPC section of the console, ensure there are network ACLs with a source of \'0.0.0.0/0\' with allowing ports or port ranges including remote server admin ports.
 * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
 */
export class ProcessCheckVpcNetworkaclOpenAdminPorts implements IDlzConfigRule {
  readonly configRuleName = 'vpc-networkacl-open-admin-ports';
  readonly description = 'Ensure no network ACLs allow public ingress to the remote server administration ports. Within the VPC section of the console, ensure there are network ACLs with a source of \'0.0.0.0/0\' with allowing ports or port ranges including remote server admin por';
  readonly identifier = 'AWS_CONFIG_PROCESS_CHECK';

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Ensure no network ACLs allow public ingress to the remote server administration ports. Within the VPC section of the console, ensure there are network ACLs with a source of \'0.0.0.0/0\' with allowing ports or port ranges including remote server admin ports.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html',
  };

}
