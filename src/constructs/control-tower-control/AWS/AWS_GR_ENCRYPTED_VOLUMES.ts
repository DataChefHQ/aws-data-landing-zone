import {ControlTowerControlFormat, IControlTowerControl} from "../index";
import {Region} from "../../../data-landing-zone";
import {ControlTowerStandardControls} from "../index";

/**
 * Detect if the EBS volumes that are attached to an Amazon EC2 instance are encrypted.
 *
 * Format: Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#ebs-enable-encryption
 */
export class AWS_GR_ENCRYPTED_VOLUMES implements IControlTowerControl {
  public readonly controlFriendlyName = ControlTowerStandardControls['AWS-GR_ENCRYPTED_VOLUMES'];
  public readonly description = 'Detect if the EBS volumes that are attached to an Amazon EC2 instance are encrypted.';
  public readonly format = ControlTowerControlFormat.LEGACY;
  public readonly externalLink = 'https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#ebs-enable-encryption';
  public readonly controlIdName = {
    [Region.EU_WEST_1]: 'AWS-GR_ENCRYPTED_VOLUMES',
    [Region.US_EAST_1]: 'AWS-GR_ENCRYPTED_VOLUMES',
  };
}