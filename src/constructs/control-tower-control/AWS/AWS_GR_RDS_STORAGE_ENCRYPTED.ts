import {ControlTowerControlFormat, IControlTowerControl} from "../index";
import {Region} from "../../../data-landing-zone";
import {ControlTowerStandardControls} from "../index";

/**
 * Detect Amazon RDS database instances that are not encrypting their underlying storage.
 *
 * Format: Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#disallow-rds-storage-unencrypted
 */
export class AWS_GR_RDS_STORAGE_ENCRYPTED implements IControlTowerControl {
  public readonly controlFriendlyName = ControlTowerStandardControls['AWS-GR_RDS_STORAGE_ENCRYPTED'];
  public readonly description = 'Detect Amazon RDS database instances that are not encrypting their underlying storage.';
  public readonly format = ControlTowerControlFormat.LEGACY;
  public readonly externalLink = 'https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#disallow-rds-storage-unencrypted'
  public readonly controlIdName = {
    [Region.EU_WEST_1]: 'AWS-GR_RDS_STORAGE_ENCRYPTED',
    [Region.US_EAST_1]: 'AWS-GR_RDS_STORAGE_ENCRYPTED',
  };
}