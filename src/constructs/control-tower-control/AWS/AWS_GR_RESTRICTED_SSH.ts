import {DlzControlTowerControlFormat, IDlzControlTowerControl} from "../index";
import {Region} from "../../../data-landing-zone";
import {DlzControlTowerStandardControls} from "../index";

/**
 * Detect unrestricted connectivity to remote console services such as SSH.
 *
 * Format: Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#ssh-disallow-internet
 */
export class AWS_GR_RESTRICTED_SSH implements IDlzControlTowerControl {
  public readonly controlFriendlyName = DlzControlTowerStandardControls['AWS-GR_RESTRICTED_SSH'];
  public readonly description = 'Detect unrestricted connectivity to remote console services such as SSH.';
  public readonly format = DlzControlTowerControlFormat.LEGACY;
  public readonly externalLink = 'https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#ssh-disallow-internet';
  public readonly controlIdName = {
    [Region.EU_WEST_1]: 'AWS-GR_RESTRICTED_SSH',
    [Region.US_EAST_1]: 'AWS-GR_RESTRICTED_SSH',
  };
}