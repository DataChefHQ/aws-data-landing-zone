import * as bootstrap from './bootstrap';
import * as cost from './cost-allocation-tags';
import * as deploy from './deploy';
import * as diff from './diff';
import { DataLandingZoneProps } from '../data-landing-zone-types';

export class Scripts {
  public static async boostrapAll(props: DataLandingZoneProps, bootstrapRoleName: string = 'AWSControlTowerExecution') {
    return bootstrap.all(props, bootstrapRoleName);
  }
  public static async diffAll(props: DataLandingZoneProps) {
    return diff.all(props);
  }
  public static async diffSelect(props: DataLandingZoneProps, id: string) {
    return diff.select(props, id);
  }
  public static async deployAll(props: DataLandingZoneProps) {
    return deploy.all(props);
  }
  public static async deploySelect(props: DataLandingZoneProps, id: string) {
    return deploy.select(props, id);
  }
  public static async configureCostAllocationTags(props: DataLandingZoneProps) {
    return cost.setCostAllocationTags(props);
  }
}

export default Scripts;