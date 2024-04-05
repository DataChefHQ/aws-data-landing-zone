import * as assert from 'assert';
import { CfnTag } from 'aws-cdk-lib';
import * as controltower from 'aws-cdk-lib/aws-controltower';
import { Construct } from 'constructs';
import { DlzControlTowerControlFormat, IDlzControlTowerControl } from './controls';
import { Region } from '../../data-landing-zone';
import { kebabToCamelCase } from '../../lib';
import { IReportResource, ReportResource, ReportType } from '../../lib';


export interface DlzControlTowerEnabledControlProps {
  readonly controlTowerRegion: Region;
  readonly controlTowerAccountId: string;
  readonly organizationId: string;
  readonly appliedOu: string;
  readonly control: IDlzControlTowerControl;
  readonly tags?: CfnTag[];
}

export class DlzControlTowerEnabledControl implements IReportResource {
  readonly control: controltower.CfnEnabledControl;
  public readonly reportResource: ReportResource;

  constructor(scope: Construct, id: string, props: DlzControlTowerEnabledControlProps) {

    let parameters: {key: string; value: any}[] | undefined = undefined;
    if (props.control.parameters) {
      parameters = Object.entries(props.control.parameters).map(([key, value]) => {
        return {
          key: key,
          value: value,
        };
      });
    }

    /* These are the only regions which have correct `controlIdentifier` which are specified per region */
    assert.ok([Region.EU_WEST_1, Region.US_EAST_1].includes(props.controlTowerRegion),
      `Control Tower region must be one of ${Region.EU_WEST_1} or ${Region.US_EAST_1}`);

    /* We have to do this because JSII forces our hand to make all interface properties camelCase and all regions are
     * kebab case. So we have to go  `eu-west-1` to `euWest1` */
    const controlTowerRegionCamelCase = kebabToCamelCase(props.controlTowerRegion);
    assert.ok(controlTowerRegionCamelCase in props.control.controlIdName,
      `Control ID Name for region ${props.controlTowerRegion} not found in control ${props.control.controlFriendlyName}`);

    //@ts-ignore The assert above ensures that the region is in the controlIdName
    const controlIdName = props.control.controlIdName[controlTowerRegionCamelCase];

    this.control = new controltower.CfnEnabledControl(scope, id, {
      controlIdentifier: `arn:aws:controltower:${props.controlTowerRegion}::control/${controlIdName}`,
      targetIdentifier: `arn:aws:organizations::${props.controlTowerAccountId}:ou/${props.organizationId}/${props.appliedOu}`,
      parameters,
      tags: props.tags,
    });
    this.reportResource = {
      type: ReportType.CONTROL_TOWER_CONTROL,
      name: props.control.controlFriendlyName,
      description: props.control.description,
      externalLink: props.control.externalLink,
    };
  }

  /**
   * Check if the control can be applied to the Security OU. Only LEGACY controls can be applied to the Security OU.
   */
  public static canBeAppliedToSecurityOU(control: IDlzControlTowerControl): boolean {
    return control.format === DlzControlTowerControlFormat.LEGACY;
  }
}


