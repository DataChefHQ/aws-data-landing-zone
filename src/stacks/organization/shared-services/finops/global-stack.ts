import { Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DLZ_CUR_DEFAULTS, DlzCurDataPlane } from '../../../../constructs/dlz-cur';
import { DlzStack, DlzStackProps } from '../../../../constructs/dlz-stack/index';
import { DataLandingZoneProps, DlzAccountType } from '../../../../data-landing-zone-types';

/**
 * FinOps-account global stack. Hosts the CUR data-plane (S3 + Glue) when `finOps.cur`
 * is configured. Wave-ordered before the management wave so the bucket exists before
 * the BCM export points at it.
 */
export class FinOpsGlobalStack extends DlzStack {

  constructor(scope: Construct, stackProps: DlzStackProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    const overrides = this.props.finOps?.accountTags ?? {};
    Tags.of(this).add('Owner', overrides.owner ?? 'infra');
    Tags.of(this).add('Project', overrides.project ?? 'dlz');
    Tags.of(this).add('Environment', overrides.environment ?? DlzAccountType.PRODUCTION);
    Tags.of(this).add('CostCenter', overrides.costCenter ?? 'dlz');
    Tags.of(this).add('Domain', overrides.domain ?? 'foundation');

    if (this.props.finOps?.cur) {
      this.curDataPlane();
    }
  }

  private curDataPlane() {
    const cur = this.props.finOps!.cur!;
    new DlzCurDataPlane(this, this.resourceName('cur-data-plane'), {
      managementAccountId: this.props.organization.root.accounts.management.accountId,
      destinationRegion: cur.destinationRegion ?? DLZ_CUR_DEFAULTS.destinationRegion,
      bucketNamePrefix: cur.bucketNamePrefix ?? DLZ_CUR_DEFAULTS.bucketNamePrefix,
      destinationPrefix: cur.destinationPrefix ?? DLZ_CUR_DEFAULTS.destinationPrefix,
      exportName: cur.exportName ?? DLZ_CUR_DEFAULTS.exportName,
      glueDatabaseName: cur.glueDatabaseName ?? DLZ_CUR_DEFAULTS.glueDatabaseName,
      dataPlaneConfig: cur.dataPlaneConfig,
    });
  }
}
