import {Region} from '../../data-landing-zone';
import {CfnTag} from "aws-cdk-lib";
import * as controltower from "aws-cdk-lib/aws-controltower";
import {Construct} from "constructs";
import * as assert from "assert";
import * as SH from "./SH";
import * as AWS from "./AWS";


/**
 * Controls that do not take parameters
 */
export enum ControlTowerStandardControls {
  'AWS-GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS' = 'AWS-GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS',
  'SH.SecretsManager.3' = 'SH.SecretsManager.3',
}

/**
 * Controls that take parameters
 */
export enum ControlTowerSpecializedControls {
  'CT.MULTISERVICE.PV.1' = 'CT.MULTISERVICE.PV.1',
}

// Has to be a property on the class, if we initiate (with `new AWS.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS()`) the
// control here it creates a circular dependency, so have to defer creating the class
// export const ControlTowerStandardControlsMap: Record<ControlTowerStandardControls, IControlTowerControl> = {
//   [ControlTowerStandardControls['AWS-GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS']]: new AWS.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS(),
//   [ControlTowerStandardControls["SH.SecretsManager.3"]]: new SH.SH_SecretsManager_3(),
// };

export interface ControlTowerControlIdNameProps {
  [Region.EU_WEST_1]: string;
  [Region.US_EAST_1]: string;
}

export interface IControlTowerControl {
  /**
   * The short name of the control, example: AWS-GR_ENCRYPTED_VOLUMES
   */
  readonly controlFriendlyName: ControlTowerStandardControls | ControlTowerSpecializedControls;
  /**
   * The control ID name used to construct the controlIdentifier, example: AWS-GR_ENCRYPTED_VOLUMES
   * This can differ from the controlFriendlyName for newer controls
   */
  readonly controlIdName: ControlTowerControlIdNameProps;

  /**
   * Optional parameters for the control
   */
  readonly parameters?: Record<string, any>;
}

export interface ControlTowerEnabledControlProps {
  controlTowerRegion: Region;
  controlTowerAccountId: string;
  organizationId: string;
  appliedOu: string;
  control: IControlTowerControl;
  tags?: CfnTag[];
}

export class ControlTowerEnabledControl {
  readonly control: controltower.CfnEnabledControl;

  constructor(scope: Construct, id: string, props: ControlTowerEnabledControlProps) {

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
  }

  public static standardControls() {
    const map: Record<ControlTowerStandardControls, IControlTowerControl> = {
      [ControlTowerStandardControls['AWS-GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS']]: new AWS.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS(),
      [ControlTowerStandardControls["SH.SecretsManager.3"]]: new SH.SH_SecretsManager_3(),
    };
    return map;
  }
}

