import { DlzControlTowerControlFormat, IDlzControlTowerControl, DlzControlTowerStandardControls } from '../index';

/**
 * This control detects whether MFA is enabled for AWS IAM users.
 *
 * Format: Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/elective-controls.html#disallow-access-mfa
 */
export class AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS implements IDlzControlTowerControl {
  public readonly controlFriendlyName = DlzControlTowerStandardControls.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS;
  public readonly description = 'This control detects whether MFA is enabled for AWS IAM users.';
  public readonly format = DlzControlTowerControlFormat.LEGACY;
  public readonly externalLink = 'https://docs.aws.amazon.com/controltower/latest/userguide/elective-controls.html#disallow-access-mfa';
  public readonly controlIdName = {
    euWest1: 'AWS-GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS',
    usEast1: 'AWS-GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS',
  };
}