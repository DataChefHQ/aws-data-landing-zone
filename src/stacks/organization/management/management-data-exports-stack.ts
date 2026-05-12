import { Construct } from 'constructs';
import {
  DLZ_DATA_EXPORTS_DEFAULTS,
  DlzDataExport,
  DlzDataExportsTagActivation,
} from '../../../constructs/dlz-data-exports';
import { DlzStack, DlzStackProps } from '../../../constructs/dlz-stack/index';
import { DataLandingZoneProps } from '../../../data-landing-zone-types';
import { PropsOrDefaults } from '../../../defaults';

/** BCM Data Exports is us-east-1-only; the stack is pinned there. */
export class ManagementDataExportsStack extends DlzStack {

  constructor(scope: Construct, stackProps: DlzStackProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    if (this.props.finOps?.dataExports) {
      this.curExports();
    }
  }

  private curExports() {
    const cur = this.props.finOps!.dataExports!;
    const finOpsAccountId = this.props.organization.ous.sharedServices!.accounts.finOps!.accountId;
    const destinationRegion = cur.destinationRegion ?? DLZ_DATA_EXPORTS_DEFAULTS.destinationRegion;
    const bucketName = `${cur.bucketNamePrefix ?? DLZ_DATA_EXPORTS_DEFAULTS.bucketNamePrefix}-${finOpsAccountId}-${destinationRegion}`;
    const destinationBucketArn = `arn:aws:s3:::${bucketName}`;

    for (const [entryId, entry] of Object.entries(cur.exports)) {
      new DlzDataExport(this, this.resourceName(`data-export-${entryId}`), {
        entryId,
        entry,
        destinationBucketArn,
        destinationBucketRegion: destinationRegion,
        destinationBucketOwnerAccountId: finOpsAccountId,
      });
    }

    if (cur.activateCostAllocationTags !== false) {
      const tagKeys = PropsOrDefaults.getOrganizationTags(this.props).map(t => t.name);
      new DlzDataExportsTagActivation(this, this.resourceName('data-exports-tag-activation'), { tagKeys });
    }
  }
}
