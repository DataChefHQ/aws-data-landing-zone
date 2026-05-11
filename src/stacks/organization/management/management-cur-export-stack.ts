import { Construct } from 'constructs';
import { DLZ_CUR_DEFAULTS, DlzCurExport } from '../../../constructs/dlz-cur';
import { DlzStack, DlzStackProps } from '../../../constructs/dlz-stack/index';
import { DataLandingZoneProps } from '../../../data-landing-zone-types';
import { PropsOrDefaults } from '../../../defaults';

/**
 * Management-account stack pinned to us-east-1 for the BCM Data Exports CUR resource.
 * `AWS::BCMDataExports::Export` only exists in us-east-1; the destination bucket can
 * live anywhere.
 */
export class ManagementCurExportStack extends DlzStack {

  constructor(scope: Construct, stackProps: DlzStackProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    if (this.props.finOps?.cur) {
      this.curExport();
    }
  }

  private curExport() {
    const cur = this.props.finOps!.cur!;
    const finOpsAccountId = this.props.organization.ous.sharedServices!.accounts.finOps!.accountId;
    const destinationRegion = cur.destinationRegion ?? DLZ_CUR_DEFAULTS.destinationRegion;
    const exportName = cur.exportName ?? DLZ_CUR_DEFAULTS.exportName;
    const bucketName = `${cur.bucketNamePrefix ?? DLZ_CUR_DEFAULTS.bucketNamePrefix}-${finOpsAccountId}-${destinationRegion}`;

    const tagKeys = PropsOrDefaults.getOrganizationTags(this.props).map(t => t.name);

    new DlzCurExport(this, this.resourceName('cur-export'), {
      destinationBucketArn: `arn:aws:s3:::${bucketName}`,
      destinationBucketRegion: destinationRegion,
      destinationBucketOwnerAccountId: finOpsAccountId,
      destinationPrefix: cur.destinationPrefix ?? DLZ_CUR_DEFAULTS.destinationPrefix,
      exportName,
      costAllocationTagKeys: cur.activateCostAllocationTags === false ? [] : tagKeys,
      exportConfig: cur.exportConfig,
    });
  }
}
