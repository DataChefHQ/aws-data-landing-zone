import { Region } from '../../../../data-landing-zone';
import { DlzControlTowerControlFormat, IDlzControlTowerControl } from '../index';
import { DlzControlTowerSpecializedControls } from '../index';

export interface CT_MULTISERVICE_PV_1Props {
  /**
   * Specifies the Regions selected, in which the OU is allowed to operate. This parameter is mandatory.
   * */
  AllowedRegions: Region[];

  /**
   * Specifies the IAM principals that are exempt from this control, so that they are allowed to operate certain
   * AWS services globally.
   */
  ExemptedPrincipalARNs?: string[];

  /**
   * Specifies actions that are exempt from this control, so that the actions are allowed.
   */
  ExemptedActions?: string[];
}

/**
 * Deny access to AWS based on the requested AWS Region for an organizational unit
 *
 * This control disallows access to unlisted operations in global and regional AWS services, outside of the specified
 * Regions for an organizational unit (OU).
 *
 * If you enforce this control, the configurations for the OU can conflict with the landing zone version of this
 * control. For more information, see "Policy evaluation of SCP controls" in Region deny control applied to the OU.
 *
 * This is considered a specialized control by Control Tower, and will not be in the ControlsMap.
 *
 * Format: Standard Control
 * Owner: SCP
 * https://docs.aws.amazon.com/controltower/latest/userguide/ou-region-deny.html
 * */
export class CT_MULTISERVICE_PV_1 implements IDlzControlTowerControl {
  public readonly controlFriendlyName = DlzControlTowerSpecializedControls.CT_MULTISERVICE_PV_1;
  public readonly description = 'Deny access to AWS based on the requested AWS Region for an organizational unit';
  public readonly format = DlzControlTowerControlFormat.STANDARD;
  public readonly externalLink = 'https://docs.aws.amazon.com/controltower/latest/userguide/ou-region-deny.html';
  public readonly controlIdName = {
    euWest1: 'LGTPYJYCCRAP',
    usEast1: 'JBVFPCBYGPJM',
  };
  public readonly parameters?: Record<string, any>;
  constructor(props?: CT_MULTISERVICE_PV_1Props) {
    this.parameters = props as Record<string, any>;
  }
}