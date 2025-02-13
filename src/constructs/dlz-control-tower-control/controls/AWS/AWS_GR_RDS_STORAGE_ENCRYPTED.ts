import { DlzControlTowerControlFormat, IDlzControlTowerControl, DlzControlTowerStandardControls } from '../index';

/**
 * Detect Amazon RDS database instances that are not encrypting their underlying storage.
 *
 * Format: Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#disallow-rds-storage-unencrypted
 */
export class AWS_GR_RDS_STORAGE_ENCRYPTED implements IDlzControlTowerControl {
  public readonly controlFriendlyName = DlzControlTowerStandardControls.AWS_GR_RDS_STORAGE_ENCRYPTED;
  public readonly description = 'Detect Amazon RDS database instances that are not encrypting their underlying storage.';
  public readonly format = DlzControlTowerControlFormat.LEGACY;
  public readonly externalLink = 'https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#disallow-rds-storage-unencrypted';
  public readonly controlIdName = {
    euWest1: 'AWS-GR_RDS_STORAGE_ENCRYPTED',
    usEast1: 'AWS-GR_RDS_STORAGE_ENCRYPTED',
  };
}