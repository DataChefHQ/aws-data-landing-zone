import * as assert from 'assert';
import { CfnTag } from 'aws-cdk-lib';
import * as controltower from 'aws-cdk-lib/aws-controltower';
import { Construct } from 'constructs';
import { IControlTowerControl } from './control-tower-controls';
import { Region } from '../data-landing-zone';

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

}