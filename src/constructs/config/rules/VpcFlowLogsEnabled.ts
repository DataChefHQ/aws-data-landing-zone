/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks whether Amazon Virtual Private Cloud flow logs are found and enabled for Amazon VPC.
 * https://docs.aws.amazon.com/config/latest/developerguide/vpc-flow-logs-enabled.html
 */
export class VpcFlowLogsEnabled implements IDlzConfigRule {
  readonly configRuleName = 'vpc-flow-logs-enabled';
  readonly description = 'Checks whether Amazon Virtual Private Cloud flow logs are found and enabled for Amazon VPC. https://docs.aws.amazon.com/config/latest/developerguide/vpc-flow-logs-enabled.html';
  readonly identifier = config.ManagedRuleIdentifiers.VPC_FLOW_LOGS_ENABLED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether Amazon Virtual Private Cloud flow logs are found and enabled for Amazon VPC.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/vpc-flow-logs-enabled.html',
  };

}
