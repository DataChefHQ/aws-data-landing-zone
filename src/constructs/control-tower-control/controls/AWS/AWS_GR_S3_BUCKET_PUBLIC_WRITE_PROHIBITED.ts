import { DlzControlTowerControlFormat, IDlzControlTowerControl } from '../index';
import { DlzControlTowerStandardControls } from '../index';

/**
 * Secure access to data stored in Amazon S3 buckets by detecting whether public write access is allowed.
 *
 * Format: Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#s3-disallow-public-write
 */
export class AWS_GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED implements IDlzControlTowerControl {
  public readonly controlFriendlyName = DlzControlTowerStandardControls.AWS_GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED;
  public readonly description = 'Secure access to data stored in Amazon S3 buckets by detecting whether public write access is allowed.';
  public readonly format = DlzControlTowerControlFormat.LEGACY;
  public readonly externalLink = 'https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#s3-disallow-public-write';
  public readonly controlIdName = {
    euWest1: 'AWS-GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED',
    usEast1: 'AWS-GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED',
  };
}