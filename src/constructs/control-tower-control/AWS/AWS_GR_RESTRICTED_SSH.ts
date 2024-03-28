import {IControlTowerControl} from "../index";
import {Region} from "../../../data-landing-zone";
import {ControlTowerStandardControls} from "../index";

/**
 * Detect unrestricted connectivity to remote console services such as SSH.
 *
 * Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#ssh-disallow-internet
 */
export class AWS_GR_RESTRICTED_SSH implements IControlTowerControl {
  public readonly controlFriendlyName = ControlTowerStandardControls['AWS-GR_RESTRICTED_SSH'];
  public readonly controlIdName = {
    [Region.EU_WEST_1]: 'AWS-GR_RESTRICTED_SSH',
    [Region.US_EAST_1]: 'AWS-GR_RESTRICTED_SSH',
  };
}