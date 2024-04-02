import {ControlTowerControlFormat, IControlTowerControl} from "../index";
import {Region} from "../../../data-landing-zone";
import {ControlTowerStandardControls} from "../index";

/**
 * This control detects whether MFA is enabled for AWS IAM users.
 *
 * Format: Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/elective-controls.html#disallow-access-mfa
 */
export class AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS implements IControlTowerControl {
  public readonly controlFriendlyName = ControlTowerStandardControls['AWS-GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS'];
  public readonly description = 'This control detects whether MFA is enabled for AWS IAM users.';
  public readonly format = ControlTowerControlFormat.LEGACY;
  public readonly externalLink = 'https://docs.aws.amazon.com/controltower/latest/userguide/elective-controls.html#disallow-access-mfa'
  public readonly controlIdName = {
    [Region.EU_WEST_1]: 'AWS-GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS',
    [Region.US_EAST_1]: 'AWS-GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS',
  };
}