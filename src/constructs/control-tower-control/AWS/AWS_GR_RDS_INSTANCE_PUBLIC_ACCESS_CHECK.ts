import {DlzControlTowerControlFormat, IDlzControlTowerControl} from "../index";
import {Region} from "../../../data-landing-zone";
import {DlzControlTowerStandardControls} from "../index";

/**
 * Detect Amazon RDS database instances that allow public access.
 *
 * Format: Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#disallow-rds-public-access
 */
export class AWS_GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK implements IDlzControlTowerControl {
  public readonly controlFriendlyName = DlzControlTowerStandardControls['AWS-GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK'];
  public readonly description = 'Detect Amazon RDS database instances that allow public access.';
  public readonly format = DlzControlTowerControlFormat.LEGACY;
  public readonly externalLink = 'https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#disallow-rds-public-access'
  public readonly controlIdName = {
    [Region.EU_WEST_1]: 'AWS-GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK',
    [Region.US_EAST_1]: 'AWS-GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK',
  };
}