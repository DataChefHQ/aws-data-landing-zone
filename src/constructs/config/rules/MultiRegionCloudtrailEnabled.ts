/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks that there is at least one multi-region AWS CloudTrail.
 * https://docs.aws.amazon.com/config/latest/developerguide/multi-region-cloud-trail-enabled.html
 */
export class MultiRegionCloudtrailEnabled implements IDlzConfigRule {
  readonly configRuleName = 'multi-region-cloudtrail-enabled';
  readonly description = 'Checks that there is at least one multi-region AWS CloudTrail. https://docs.aws.amazon.com/config/latest/developerguide/multi-region-cloud-trail-enabled.html';
  readonly identifier = config.ManagedRuleIdentifiers.CLOUDTRAIL_MULTI_REGION_ENABLED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks that there is at least one multi-region AWS CloudTrail.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/multi-region-cloud-trail-enabled.html',
  };

}
