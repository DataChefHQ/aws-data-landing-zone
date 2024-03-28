import { IControlTowerControl } from './index';
import { Region } from '../../data-landing-zone';

/**
 * This control detects whether MFA is enabled for AWS IAM users. You can protect your account by requiring MFA for all
 * AWS users in the account. MFA requires an additional authentication code after the user name and password are
 * successful. This control does not change the status of the account.
 *
 * Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/elective-controls.html#disallow-access-mfa
 */
export class AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS implements IControlTowerControl {
  public controlFriendlyName: string = 'AWS-GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS';
  public controlIdName = {
    [Region.EU_WEST_1]: 'AWS-GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS',
    [Region.US_EAST_1]: 'AWS-GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS',
  };
  public parameters?: Record<string, any>;
}