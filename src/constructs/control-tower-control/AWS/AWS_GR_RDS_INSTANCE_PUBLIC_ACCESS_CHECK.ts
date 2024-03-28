import {IControlTowerControl} from "../index";
import {Region} from "../../../data-landing-zone";
import {ControlTowerStandardControls} from "../index";

/**
 * Detect Amazon RDS database instances that allow public access.
 *
 * Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#disallow-rds-public-access
 */
export class AWS_GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK implements IControlTowerControl {
  public readonly controlFriendlyName = ControlTowerStandardControls['AWS-GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK'];
  public readonly controlIdName = {
    [Region.EU_WEST_1]: 'AWS-GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK',
    [Region.US_EAST_1]: 'AWS-GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK',
  };
}