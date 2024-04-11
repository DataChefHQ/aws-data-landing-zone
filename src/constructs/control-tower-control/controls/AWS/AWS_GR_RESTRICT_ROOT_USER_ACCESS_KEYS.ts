import { DlzControlTowerControlFormat, IDlzControlTowerControl, DlzControlTowerStandardControls } from '../index';

/**
 * Secure your AWS accounts by disallowing creation of access keys for the root user, which will allow unrestricted
 * access to all resources in the account.
 *
 * Format: Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#disallow-root-access-keys
 */
export class AWS_GR_RESTRICT_ROOT_USER_ACCESS_KEYS implements IDlzControlTowerControl {
  public readonly controlFriendlyName = DlzControlTowerStandardControls.AWS_GR_RESTRICT_ROOT_USER_ACCESS_KEYS;
  public readonly description = 'Secure your AWS accounts by disallowing creation of access keys for the root user, which will allow unrestricted access to all resources in the account.';
  public readonly format = DlzControlTowerControlFormat.LEGACY;
  public readonly externalLink = 'https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#disallow-root-access-keys';
  public readonly controlIdName = {
    euWest1: 'AWS-GR_RESTRICT_ROOT_USER_ACCESS_KEYS',
    usEast1: 'AWS-GR_RESTRICT_ROOT_USER_ACCESS_KEYS',
  };
}