import { DlzControlTowerControlFormat, IDlzControlTowerControl } from '../index';
import { DlzControlTowerStandardControls } from '../index';

/**
 * Secure your AWS accounts by disallowing account access with root user credentials, which are credentials of the
 * account owner and allow unrestricted access to all resources in the account. We recommend that you instead
 * create AWS Identity and Access Management (IAM) users for everyday interaction with your AWS account.
 *
 * Format: Legacy Control
 * https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#disallow-root-auser-actions
 */
export class AWS_GR_RESTRICT_ROOT_USER implements IDlzControlTowerControl {
  public readonly controlFriendlyName = DlzControlTowerStandardControls.AWS_GR_RESTRICT_ROOT_USER;
  public readonly description = 'Secure your AWS accounts by disallowing account access with root user credentials, which are credentials of the account owner and allow unrestricted access to all resources in the account.';
  public readonly format = DlzControlTowerControlFormat.LEGACY;
  public readonly externalLink = 'https://docs.aws.amazon.com/controltower/latest/userguide/strongly-recommended-controls.html#disallow-root-auser-actions';
  public readonly controlIdName = {
    euWest1: 'AWS-GR_RESTRICT_ROOT_USER',
    usEast1: 'AWS-GR_RESTRICT_ROOT_USER',
  };
}