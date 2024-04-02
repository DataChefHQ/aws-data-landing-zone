import {ControlTowerControlFormat, IControlTowerControl} from "../index";
import {Region} from "../../../data-landing-zone";
import {ControlTowerStandardControls} from "../index";

/**
 * Secure your AWS accounts by disallowing account access with root user credentials, which are credentials of the
 * account owner and allow unrestricted access to all resources in the account. We recommend that you instead
 * create AWS Identity and Access Management (IAM) users for everyday interaction with your AWS account.
 *
 * Format: Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#disallow-root-auser-actions
 */
export class AWS_GR_RESTRICT_ROOT_USER implements IControlTowerControl {
  public readonly controlFriendlyName = ControlTowerStandardControls['AWS-GR_RESTRICT_ROOT_USER'];
  public readonly description = 'Secure your AWS accounts by disallowing account access with root user credentials, which are credentials of the account owner and allow unrestricted access to all resources in the account.';
  public readonly format = ControlTowerControlFormat.LEGACY;
  public readonly externalLink = 'https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#disallow-root-auser-actions'
  public readonly controlIdName = {
    [Region.EU_WEST_1]: 'AWS-GR_RESTRICT_ROOT_USER',
    [Region.US_EAST_1]: 'AWS-GR_RESTRICT_ROOT_USER',
  };
}