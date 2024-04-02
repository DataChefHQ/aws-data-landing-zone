import {ControlTowerControlFormat, IControlTowerControl} from "../index";
import {Region} from "../../../data-landing-zone";
import {ControlTowerStandardControls} from "../index";

/**
 * Detect whether root user has Multi-Factor Authentication (MFA) enabled.
 *
 * Format: Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#enable-root-mfa
 */
export class AWS_GR_ROOT_ACCOUNT_MFA_ENABLED implements IControlTowerControl {
  public readonly controlFriendlyName = ControlTowerStandardControls['AWS-GR_ROOT_ACCOUNT_MFA_ENABLED'];
  public readonly description = 'Detect whether root user has Multi-Factor Authentication (MFA) enabled.';
  public readonly format = ControlTowerControlFormat.LEGACY;
  public readonly externalLink = 'https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#enable-root-mfa';
  public readonly controlIdName = {
    [Region.EU_WEST_1]: 'AWS-GR_ROOT_ACCOUNT_MFA_ENABLED',
    [Region.US_EAST_1]: 'AWS-GR_ROOT_ACCOUNT_MFA_ENABLED',
  };
}