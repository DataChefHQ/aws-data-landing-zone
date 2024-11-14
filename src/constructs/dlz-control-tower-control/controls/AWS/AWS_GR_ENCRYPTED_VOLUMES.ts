import { DlzControlTowerControlFormat, IDlzControlTowerControl, DlzControlTowerStandardControls } from '../index';

/**
 * Detect if the EBS volumes that are attached to an Amazon EC2 instance are encrypted.
 *
 * Format: Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#ebs-enable-encryption
 */
export class AWS_GR_ENCRYPTED_VOLUMES implements IDlzControlTowerControl {
  public readonly controlFriendlyName = DlzControlTowerStandardControls.AWS_GR_ENCRYPTED_VOLUMES;
  public readonly description = 'Detect if the EBS volumes that are attached to an Amazon EC2 instance are encrypted.';
  public readonly format = DlzControlTowerControlFormat.LEGACY;
  public readonly externalLink = 'https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#ebs-enable-encryption';
  public readonly controlIdName = {
    euWest1: 'AWS-GR_ENCRYPTED_VOLUMES',
    usEast1: 'AWS-GR_ENCRYPTED_VOLUMES',
  };
}