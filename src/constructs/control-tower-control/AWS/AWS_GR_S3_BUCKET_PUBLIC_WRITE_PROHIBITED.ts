import {ControlTowerControlFormat, IControlTowerControl} from "../index";
import {Region} from "../../../data-landing-zone";
import {ControlTowerStandardControls} from "../index";

/**
 * Secure access to data stored in Amazon S3 buckets by detecting whether public write access is allowed.
 *
 * Format: Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#s3-disallow-public-write
 */
export class AWS_GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED implements IControlTowerControl {
  public readonly controlFriendlyName = ControlTowerStandardControls['AWS-GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED'];
  public readonly description = 'Secure access to data stored in Amazon S3 buckets by detecting whether public write access is allowed.';
  public readonly format = ControlTowerControlFormat.LEGACY;
  public readonly externalLink = 'https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#s3-disallow-public-write';
  public readonly controlIdName = {
    [Region.EU_WEST_1]: 'AWS-GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED',
    [Region.US_EAST_1]: 'AWS-GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED',
  };
}