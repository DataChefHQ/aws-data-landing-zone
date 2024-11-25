import { DlzLakeFormation, DlzStack } from '../../../../constructs';
import { DLzAccount } from '../../../../data-landing-zone-types';

export class Shared {
  constructor(private stack: DlzStack, private dlzAccount: DLzAccount) {
  }

  public createLakeFormation() {
    if (!this.dlzAccount.lakeFormation) {
      return;
    }
    const lfForRegion = this.dlzAccount.lakeFormation?.filter(lf => lf.region === this.stack.region) || [];
    if (lfForRegion.length > 1) {
      throw new Error('Only one Lake Formation per region is supported');
    }
    if (lfForRegion.length === 0) {
      return;
    }
    new DlzLakeFormation(this.stack, this.stack.resourceName('lf'), lfForRegion[0]);
  }
}
