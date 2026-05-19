import { Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DLZ_DATA_EXPORTS_DEFAULTS, DlzDataExportsDataPlane } from '../../../../constructs/dlz-data-exports';
import { DlzStack, DlzStackProps } from '../../../../constructs/dlz-stack/index';
import { DataLandingZoneProps, DlzAccountType } from '../../../../data-landing-zone-types';

/** Wave-ordered before the management wave so the bucket exists when BCM creates exports. */
export class FinOpsGlobalStack extends DlzStack {

  constructor(scope: Construct, stackProps: DlzStackProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    const overrides = this.props.finOps?.accountTags ?? {};
    Tags.of(this).add('Owner', overrides.owner ?? 'infra');
    Tags.of(this).add('Project', overrides.project ?? 'dlz');
    Tags.of(this).add('Environment', overrides.environment ?? DlzAccountType.PRODUCTION);
    Tags.of(this).add('CostCenter', overrides.costCenter ?? 'dlz');
    Tags.of(this).add('Domain', overrides.domain ?? 'foundation');

    if (this.props.finOps?.dataExports) {
      this.curDataPlane();
    }
  }

  private curDataPlane() {
    const cur = this.props.finOps!.dataExports!;
    new DlzDataExportsDataPlane(this, this.resourceName('cur-data-plane'), {
      managementAccountId: this.props.organization.root.accounts.management.accountId,
      destinationRegion: cur.destinationRegion ?? DLZ_DATA_EXPORTS_DEFAULTS.destinationRegion,
      bucketNamePrefix: cur.bucketNamePrefix ?? DLZ_DATA_EXPORTS_DEFAULTS.bucketNamePrefix,
      exports: cur.exports,
      dataPlaneConfig: cur.dataPlaneConfig,
    });
  }
}
