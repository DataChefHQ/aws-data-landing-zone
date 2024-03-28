import {IControlTowerControl} from "../index";
import {Region} from "../../../data-landing-zone";
import {ControlTowerStandardControls} from "../index";

/**
 * Secure access to data stored in Amazon S3 buckets by detecting whether public read access is allowed.
 *
 * Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#s3-disallow-public-read
 */
export class AWS_GR_S3_BUCKET_PUBLIC_READ_PROHIBITED implements IControlTowerControl {
  public readonly controlFriendlyName = ControlTowerStandardControls['AWS-GR_S3_BUCKET_PUBLIC_READ_PROHIBITED'];
  public readonly controlIdName = {
    [Region.EU_WEST_1]: 'AWS-GR_S3_BUCKET_PUBLIC_READ_PROHIBITED',
    [Region.US_EAST_1]: 'AWS-GR_S3_BUCKET_PUBLIC_READ_PROHIBITED',
  };
}