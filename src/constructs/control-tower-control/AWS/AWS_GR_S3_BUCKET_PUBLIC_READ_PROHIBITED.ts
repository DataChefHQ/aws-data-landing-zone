import {DlzControlTowerControlFormat, IDlzControlTowerControl} from "../index";
import {Region} from "../../../data-landing-zone";
import {DlzControlTowerStandardControls} from "../index";

/**
 * Secure access to data stored in Amazon S3 buckets by detecting whether public read access is allowed.
 *
 * Format:Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#s3-disallow-public-read
 */
export class AWS_GR_S3_BUCKET_PUBLIC_READ_PROHIBITED implements IDlzControlTowerControl {
  public readonly controlFriendlyName = DlzControlTowerStandardControls['AWS-GR_S3_BUCKET_PUBLIC_READ_PROHIBITED'];
  public readonly description = 'Secure access to data stored in Amazon S3 buckets by detecting whether public read access is allowed.';
  public readonly format = DlzControlTowerControlFormat.LEGACY;
  public readonly externalLink = 'https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#s3-disallow-public-read';
  public readonly controlIdName = {
    [Region.EU_WEST_1]: 'AWS-GR_S3_BUCKET_PUBLIC_READ_PROHIBITED',
    [Region.US_EAST_1]: 'AWS-GR_S3_BUCKET_PUBLIC_READ_PROHIBITED',
  };
}