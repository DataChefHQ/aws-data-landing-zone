import { DlzControlTowerControlFormat, IDlzControlTowerControl, DlzControlTowerStandardControls } from '../index';

/**
 * Detect whether root user has Multi-Factor Authentication (MFA) enabled.
 *
 * Format: Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#enable-root-mfa
 */
export class AWS_GR_ROOT_ACCOUNT_MFA_ENABLED implements IDlzControlTowerControl {
  public readonly controlFriendlyName = DlzControlTowerStandardControls.AWS_GR_ROOT_ACCOUNT_MFA_ENABLED;
  public readonly description = 'Detect whether root user has Multi-Factor Authentication (MFA) enabled.';
  public readonly format = DlzControlTowerControlFormat.LEGACY;
  public readonly externalLink = 'https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#enable-root-mfa';
  public readonly controlIdName = {
    euWest1: 'AWS-GR_ROOT_ACCOUNT_MFA_ENABLED',
    usEast1: 'AWS-GR_ROOT_ACCOUNT_MFA_ENABLED',
  };
}