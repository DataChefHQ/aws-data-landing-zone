import { Construct } from 'constructs';
import { DLZ_CUR_DEFAULTS, DlzCurDataPlane } from '../../../../constructs/dlz-cur';
import { DlzStack, DlzStackProps } from '../../../../constructs/dlz-stack/index';
import { DataLandingZoneProps } from '../../../../data-landing-zone-types';

/**
 * Global stack for the FinOps account (under the Shared Services OU). Hosts the CUR
 * data-plane resources (S3 bucket, bucket policy, Glue database + crawler) when `cur` is
 * configured.
 *
 * Synthesized only when `props.organization.ous.sharedServices.accounts.finOps` is set.
 * Wave-ordered before the management wave so the destination bucket exists before the
 * management-side `bcm-data-exports.CfnExport` is created.
 */
export class FinOpsGlobalStack extends DlzStack {

  constructor(scope: Construct, stackProps: DlzStackProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    if (this.props.finOps?.cur) {
      this.curDataPlane();
    }
  }

  private curDataPlane() {
    const cur = this.props.finOps!.cur!;
    new DlzCurDataPlane(this, this.resourceName('cur-data-plane'), {
      managementAccountId: this.props.organization.root.accounts.management.accountId,
      exportName: cur.exportName ?? DLZ_CUR_DEFAULTS.exportName,
      destinationRegion: cur.destinationRegion ?? DLZ_CUR_DEFAULTS.destinationRegion,
      bucketNamePrefix: cur.bucketNamePrefix ?? DLZ_CUR_DEFAULTS.bucketNamePrefix,
      destinationPrefix: cur.exportName ?? DLZ_CUR_DEFAULTS.exportName,
      glueDatabaseName: cur.glueDatabaseName ?? DLZ_CUR_DEFAULTS.glueDatabaseName,
      dataPlaneConfig: cur.dataPlaneConfig,
    });
  }
}
