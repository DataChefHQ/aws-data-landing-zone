import { DlzControlTowerControlFormat, IDlzControlTowerControl, DlzControlTowerStandardControls } from '../index';

/**
 * Detect Amazon RDS database instances that allow public access.
 *
 * Format: Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#disallow-rds-public-access
 */
export class AWS_GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED implements IDlzControlTowerControl {
  public readonly controlFriendlyName = DlzControlTowerStandardControls.AWS_GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED;
  public readonly description = 'Detect Amazon RDS database instances that allow public access.';
  public readonly format = DlzControlTowerControlFormat.LEGACY;
  public readonly externalLink = 'https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#disallow-rds-public-access';
  public readonly controlIdName = {
    euWest1: 'AWS-GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED',
    usEast1: 'AWS-GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED',
  };
}