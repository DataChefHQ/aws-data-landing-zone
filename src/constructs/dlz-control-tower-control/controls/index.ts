import * as AWS from './AWS/index';
import * as SH from './SH/index';

/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not export any of the controls in the folders, they do not conform to JSII, class names are snake case caps and
 * the controlIdName properties are also snake case caps. This will cause the JSII build to fail.
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */

export interface DlzControlTowerControlIdNameProps {
  readonly euWest1: string;
  readonly usEast1: string;
}
export enum DlzControlTowerControlFormat {
  LEGACY = 'LEGACY',
  STANDARD = 'STANDARD',
}
export interface IDlzControlTowerControl {
  /**
   * The format of the control, LEGACY or STANDARD
   * LEGACY controls include the control name in the controlIdentifier
   * STANDARD controls do not include the control name in the controlIdentifier and can not be applied to the Security OU
   */
  readonly format: DlzControlTowerControlFormat;

  /**
   * The short name of the control, example: AWS-GR_ENCRYPTED_VOLUMES
   */
  readonly controlFriendlyName: DlzControlTowerStandardControls | DlzControlTowerSpecializedControls;
  /**
   * The control ID name used to construct the controlIdentifier, example: AWS-GR_ENCRYPTED_VOLUMES
   * This can differ from the controlFriendlyName for newer controls
   */
  readonly controlIdName: DlzControlTowerControlIdNameProps;

  /**
   * Optional parameters for the control
   */
  readonly parameters?: Record<string, any>;

  /**
   * Description of the control
   */
  readonly description: string;

  /**
   * External link to the control documentation
   */
  readonly externalLink: string;
}

/**
 * Controls that do not take parameters
 */
export enum DlzControlTowerStandardControls {
  'AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS' = 'AWS-GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS',
  'AWS_GR_ENCRYPTED_VOLUMES' = 'AWS-GR_ENCRYPTED_VOLUMES',
  'AWS_GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK' = 'AWS-GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK',
  'AWS_GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED' = 'AWS-GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED',
  'AWS_GR_RDS_STORAGE_ENCRYPTED' = 'AWS-GR_RDS_STORAGE_ENCRYPTED',
  'AWS_GR_RESTRICTED_SSH' = 'AWS-GR_RESTRICTED_SSH',
  'AWS_GR_RESTRICT_ROOT_USER' = 'AWS-GR_RESTRICT_ROOT_USER',
  'AWS_GR_RESTRICT_ROOT_USER_ACCESS_KEYS' = 'AWS-GR_RESTRICT_ROOT_USER_ACCESS_KEYS',
  'AWS_GR_ROOT_ACCOUNT_MFA_ENABLED' = 'AWS-GR_ROOT_ACCOUNT_MFA_ENABLED',
  'AWS_GR_S3_BUCKET_PUBLIC_READ_PROHIBITED' = 'AWS-GR_S3_BUCKET_PUBLIC_READ_PROHIBITED',
  'AWS_GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED' = 'AWS-GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED',
  'SH_SECRETS_MANAGER_3' = 'SH.SecretsManager.3',
}

/**
 * Controls that take parameters
 */
export enum DlzControlTowerSpecializedControls {
  'CT_MULTISERVICE_PV_1' = 'CT.MULTISERVICE.PV.1',
}


/**
 * Map of standard controls so that a control can be referenced by its name
 * @internal
 * */
export class ControlTowerControlMappings {

  /**
   * @internal
   * */
  public static standardControl() {
    const standardControlsMap: Record<DlzControlTowerStandardControls, IDlzControlTowerControl> = {
      [DlzControlTowerStandardControls.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS]: new AWS.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS(),
      [DlzControlTowerStandardControls.AWS_GR_ENCRYPTED_VOLUMES]: new AWS.AWS_GR_ENCRYPTED_VOLUMES(),
      [DlzControlTowerStandardControls.AWS_GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK]: new AWS.AWS_GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK(),
      [DlzControlTowerStandardControls.AWS_GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED]: new AWS.AWS_GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED(),
      [DlzControlTowerStandardControls.AWS_GR_RDS_STORAGE_ENCRYPTED]: new AWS.AWS_GR_RDS_STORAGE_ENCRYPTED(),
      [DlzControlTowerStandardControls.AWS_GR_RESTRICTED_SSH]: new AWS.AWS_GR_RESTRICTED_SSH(),
      [DlzControlTowerStandardControls.AWS_GR_RESTRICT_ROOT_USER]: new AWS.AWS_GR_RESTRICT_ROOT_USER(),
      [DlzControlTowerStandardControls.AWS_GR_RESTRICT_ROOT_USER_ACCESS_KEYS]: new AWS.AWS_GR_RESTRICT_ROOT_USER_ACCESS_KEYS(),
      [DlzControlTowerStandardControls.AWS_GR_ROOT_ACCOUNT_MFA_ENABLED]: new AWS.AWS_GR_ROOT_ACCOUNT_MFA_ENABLED(),
      [DlzControlTowerStandardControls.AWS_GR_S3_BUCKET_PUBLIC_READ_PROHIBITED]: new AWS.AWS_GR_S3_BUCKET_PUBLIC_READ_PROHIBITED(),
      [DlzControlTowerStandardControls.AWS_GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED]: new AWS.AWS_GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED(),
      [DlzControlTowerStandardControls.SH_SECRETS_MANAGER_3]: new SH.SH_SECRETS_MANAGER_3(),
    };
    return standardControlsMap;
  }
}