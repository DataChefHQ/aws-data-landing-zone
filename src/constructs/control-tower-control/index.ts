import {Region} from '../../data-landing-zone';
import {CfnTag} from "aws-cdk-lib";
import * as controltower from "aws-cdk-lib/aws-controltower";
import {Construct} from "constructs";
import * as assert from "assert";
import * as SH from "./SH";
import * as AWS from "./AWS";
import {IReportResource, ReportResource, ReportType} from "../../lib/report";


/**
 * Controls that do not take parameters
 */
export enum DlzControlTowerStandardControls {
  'AWS-GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS' = 'AWS-GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS',
  'AWS-GR_ENCRYPTED_VOLUMES' = 'AWS-GR_ENCRYPTED_VOLUMES',
  'AWS-GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK' = 'AWS-GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK',
  'AWS-GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED' = 'AWS-GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED',
  'AWS-GR_RDS_STORAGE_ENCRYPTED' = 'AWS-GR_RDS_STORAGE_ENCRYPTED',
  'AWS-GR_RESTRICTED_SSH' = 'AWS-GR_RESTRICTED_SSH',
  'AWS-GR_RESTRICT_ROOT_USER' = 'AWS-GR_RESTRICT_ROOT_USER',
  'AWS-GR_RESTRICT_ROOT_USER_ACCESS_KEYS' = 'AWS-GR_RESTRICT_ROOT_USER_ACCESS_KEYS',
  'AWS-GR_ROOT_ACCOUNT_MFA_ENABLED' = 'AWS-GR_ROOT_ACCOUNT_MFA_ENABLED',
  'AWS-GR_S3_BUCKET_PUBLIC_READ_PROHIBITED' = 'AWS-GR_S3_BUCKET_PUBLIC_READ_PROHIBITED',
  'AWS-GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED' = 'AWS-GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED',
  'SH.SecretsManager.3' = 'SH.SecretsManager.3',
}

/**
 * Controls that take parameters
 */
export enum DlzControlTowerSpecializedControls {
  'CT.MULTISERVICE.PV.1' = 'CT.MULTISERVICE.PV.1',
}

// Has to be a property on the class, if we initiate (with `new AWS.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS()`) the
// control here it creates a circular dependency, so have to defer creating the class
// export const ControlTowerStandardControlsMap: Record<ControlTowerStandardControls, IControlTowerControl> = {
//   [ControlTowerStandardControls['AWS-GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS']]: new AWS.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS(),
//   [ControlTowerStandardControls["SH.SecretsManager.3"]]: new SH.SH_SecretsManager_3(),
// };

export interface DlzControlTowerControlIdNameProps {
  [Region.EU_WEST_1]: string;
  [Region.US_EAST_1]: string;
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

export interface DlzControlTowerEnabledControlProps {
  controlTowerRegion: Region;
  controlTowerAccountId: string;
  organizationId: string;
  appliedOu: string;
  control: IDlzControlTowerControl;
  tags?: CfnTag[];
}

export class DlzControlTowerEnabledControl implements IReportResource {
  readonly control: controltower.CfnEnabledControl;
  public readonly reportResource: ReportResource;

  constructor(scope: Construct, id: string, props: DlzControlTowerEnabledControlProps) {

    assert.ok([Region.EU_WEST_1, Region.US_EAST_1].includes(props.controlTowerRegion),
      `Control Tower region must be one of ${Region.EU_WEST_1} or ${Region.US_EAST_1}`);

    let parameters: {key: string; value: any}[] | undefined = undefined;
    if (props.control.parameters) {
      parameters = Object.entries(props.control.parameters).map(([key, value]) => {
        return {
          key: key,
          value: value,
        };
      });
    }

    assert.ok(props.controlTowerRegion in props.control.controlIdName,
      `Control ID Name for region ${props.controlTowerRegion} not found in control ${props.control.controlFriendlyName}`);

    //@ts-ignore The assert above ensures that the region is in the controlIdName
    const controlIdName = props.control.controlIdName[props.controlTowerRegion];

    this.control = new controltower.CfnEnabledControl(scope, id, {
      controlIdentifier: `arn:aws:controltower:${props.controlTowerRegion}::control/${controlIdName}`,
      targetIdentifier: `arn:aws:organizations::${props.controlTowerAccountId}:ou/${props.organizationId}/${props.appliedOu}`,
      parameters,
      tags: props.tags,
    });
    this.reportResource = {
      type: ReportType.ControlTowerControl,
      name: props.control.controlFriendlyName,
      description: props.control.description,
      externalLink: props.control.externalLink,
    }
  }

  public static standardControls() {
    const map: Record<DlzControlTowerStandardControls, IDlzControlTowerControl> = {
      [DlzControlTowerStandardControls['AWS-GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS']]: new AWS.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS(),
      [DlzControlTowerStandardControls['AWS-GR_ENCRYPTED_VOLUMES']]: new AWS.AWS_GR_ENCRYPTED_VOLUMES(),
      [DlzControlTowerStandardControls['AWS-GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK']]: new AWS.AWS_GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK(),
      [DlzControlTowerStandardControls['AWS-GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED']]: new AWS.AWS_GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED(),
      [DlzControlTowerStandardControls['AWS-GR_RDS_STORAGE_ENCRYPTED']]: new AWS.AWS_GR_RDS_STORAGE_ENCRYPTED(),
      [DlzControlTowerStandardControls['AWS-GR_RESTRICTED_SSH']]: new AWS.AWS_GR_RESTRICTED_SSH(),
      [DlzControlTowerStandardControls['AWS-GR_RESTRICT_ROOT_USER']]: new AWS.AWS_GR_RESTRICT_ROOT_USER(),
      [DlzControlTowerStandardControls['AWS-GR_RESTRICT_ROOT_USER_ACCESS_KEYS']]: new AWS.AWS_GR_RESTRICT_ROOT_USER_ACCESS_KEYS(),
      [DlzControlTowerStandardControls['AWS-GR_ROOT_ACCOUNT_MFA_ENABLED']]: new AWS.AWS_GR_ROOT_ACCOUNT_MFA_ENABLED(),
      [DlzControlTowerStandardControls['AWS-GR_S3_BUCKET_PUBLIC_READ_PROHIBITED']]: new AWS.AWS_GR_S3_BUCKET_PUBLIC_READ_PROHIBITED(),
      [DlzControlTowerStandardControls['AWS-GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED']]: new AWS.AWS_GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED(),
      [DlzControlTowerStandardControls["SH.SecretsManager.3"]]: new SH.SH_SecretsManager_3(),
    };
    return map;
  }

  /**
   * Check if the control can be applied to the Security OU. Only LEGACY controls can be applied to the Security OU.
   */
  public static canBeAppliedToSecurityOU(control: IDlzControlTowerControl): boolean {
    return control.format === DlzControlTowerControlFormat.LEGACY;
  }
}

