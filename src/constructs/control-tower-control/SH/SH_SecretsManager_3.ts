import {IControlTowerControl} from "../index";
import {Region} from "../../../data-landing-zone";
import {ControlTowerStandardControls} from "../";

/**
 * This control checks whether your secrets have been accessed within a specified number of days. The default value
 * is 90 days. Secrets that have not been accessed even once within the number days you define, fail this check.
 *
 * Owner: Security Hub
 * https://docs.aws.amazon.com/securityhub/latest/userguide/secretsmanager-controls.html#secretsmanager-3
 * */
export class SH_SecretsManager_3 implements IControlTowerControl {
  public readonly controlFriendlyName = ControlTowerStandardControls["SH.SecretsManager.3"];
  public readonly controlIdName = {
    [Region.EU_WEST_1]: 'KRZOMDMWLCLU',
    [Region.US_EAST_1]: 'QQURRKYALIYF',
  };
}

