import { Region } from '../../data-landing-zone';


export interface ControlTowerControlIdNameProps {
  [Region.EU_WEST_1]: string;
  [Region.US_EAST_1]: string;
}

export interface IControlTowerControl {
  /**
   * The short name of the control, example: AWS-GR_ENCRYPTED_VOLUMES
   */
  controlFriendlyName: string;
  /**
   * The control ID name used to construct the controlIdentifier, example: AWS-GR_ENCRYPTED_VOLUMES
   * This can differ from the controlFriendlyName for newer controls
   */
  controlIdName: ControlTowerControlIdNameProps;

  /**
   * Optional parameters for the control
   */
  parameters?: Record<string, any>;
}

export * from './AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS';
export * from './SH_SecretsManager_3';