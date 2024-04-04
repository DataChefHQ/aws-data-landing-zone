import {DlzControlTowerControlFormat, IDlzControlTowerControl} from "../index";
import {Region} from "../../../data-landing-zone";
import {DlzControlTowerStandardControls} from "../";

/**
 * This control checks whether your secrets have been accessed within a specified number of days. The default value
 * is 90 days. Secrets that have not been accessed even once within the number days you define, fail this check.
 *
 * Format: Standard Control
 * Owner: Security Hub
 * https://docs.aws.amazon.com/securityhub/latest/userguide/secretsmanager-controls.html#secretsmanager-3
 * */
export class SH_SecretsManager_3 implements IDlzControlTowerControl {
  public readonly controlFriendlyName = DlzControlTowerStandardControls["SH.SecretsManager.3"];
  public readonly description = 'This control checks whether your secrets have been accessed within a specified number of days.';
  public readonly format = DlzControlTowerControlFormat.STANDARD;
  public readonly externalLink = 'https://docs.aws.amazon.com/securityhub/latest/userguide/secretsmanager-controls.html#secretsmanager-3';
  public readonly controlIdName = {
    [Region.EU_WEST_1]: 'KRZOMDMWLCLU',
    [Region.US_EAST_1]: 'QQURRKYALIYF',
  };
}

