import * as bootstrap from './bootstrap';
import * as cost from './cost-allocation-tags';
import * as deploy from './deploy';
import * as diff from './diff';
import { DataLandingZoneProps, ForceNoPythonArgumentLifting } from '../data-landing-zone-types';

export class Scripts {

  /**
   * Bootstraps all accounts in all regions as defined by the config
   * @param props
   * @param bootstrapRoleName
   */
  public async boostrapAll(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
    return bootstrap.all(props, bootstrapRoleName);
  }

  /**
   * CDK diff all stacks
   * @param props
   * @param _ Ignore this parameter, it is used to force a consistent interface across TS and Python usage
   */
  public async diffAll(props: DataLandingZoneProps, _: ForceNoPythonArgumentLifting = {}) {
    return diff.all(props);
  }

  /**
   * CDK diff stacks identified by the id
   * @param props
   * @param id
   */
  public async diffSelect(props: DataLandingZoneProps, id: string) {
    return diff.select(props, id);
  }

  /**
   * CDK deploy all stacks
   * @param props
   * @param _ Ignore this parameter, it is used to force a consistent interface across TS and Python usage
   */
  public async deployAll(props: DataLandingZoneProps, _: ForceNoPythonArgumentLifting = {}) {
    return deploy.all(props);
  }

  /**
   * CDK deploy stacks identified by the id
   * @param props
   * @param id
   */
  public async deploySelect(props: DataLandingZoneProps, id: string) {
    return deploy.select(props, id);
  }

  /**
   * Sets the Cost Allocation Tags for the organization
   * @param props
   * @param _ Ignore this parameter, it is used to force a consistent interface across TS and Python usage
   */
  public async configureCostAllocationTags(props: DataLandingZoneProps, _: ForceNoPythonArgumentLifting = {}) {
    return cost.setCostAllocationTags(props);
  }
}

export default Scripts;