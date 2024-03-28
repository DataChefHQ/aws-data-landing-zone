import { IControlTowerControl } from './index';
import { Region } from '../../data-landing-zone';


export interface SH_SecretsManager_3Props {
  /**
   * Maximum number of days that a secret can remain unused
   * @default 90
   * Minimum: 1, Maximum: 365
   */
  unusedForDays: number;
}

/**
 * This control checks whether your secrets have been accessed within a specified number of days. The default value
 * is 90 days. Secrets that have not been accessed even once within the number days you define, fail this check.
 *
 * Owner: Security Hub
 * https://docs.aws.amazon.com/securityhub/latest/userguide/secretsmanager-controls.html#secretsmanager-3
 * */
export class SH_SecretsManager_3 implements IControlTowerControl {
  public controlFriendlyName: string = 'SH.SecretsManager.3';
  public controlIdName = {
    [Region.EU_WEST_1]: 'KRZOMDMWLCLU',
    [Region.US_EAST_1]: 'QQURRKYALIYF',
  };
  public parameters?: Record<string, any>;
  constructor(props?: SH_SecretsManager_3Props) {

    if (!props) {
      props = {
        unusedForDays: 90,
      };
    }
    this.parameters = props as Record<string, any>;
  }
}