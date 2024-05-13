/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

export interface RestrictedCommonPortsProps {
  /** @default 3389 */
  blockedPort3: number;
}

/**
 * Checks whether the security groups in use do not allow unrestricted incoming TCP traffic to the specified ports.
 * https://docs.aws.amazon.com/config/latest/developerguide/restricted-incoming-traffic.html
 */
export class RestrictedCommonPorts implements IDlzConfigRule {
  readonly configRuleName = 'restricted-common-ports';
  readonly description = 'Checks whether the security groups in use do not allow unrestricted incoming TCP traffic to the specified ports. https://docs.aws.amazon.com/config/latest/developerguide/restricted-incoming-traffic.html';
  readonly identifier = config.ManagedRuleIdentifiers.EC2_SECURITY_GROUPS_RESTRICTED_INCOMING_TRAFFIC;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether the security groups in use do not allow unrestricted incoming TCP traffic to the specified ports.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/restricted-incoming-traffic.html',
  };
  readonly inputParameters: { [p: string]: any };
  constructor(props?: RestrictedCommonPortsProps) {
    this.inputParameters = props ?? {
      blockedPort3: 3389,
    };
  }
}
