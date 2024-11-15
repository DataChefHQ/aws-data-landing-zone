// responsibility matrix:
// - admins
// - LF version
// - access mode (LF only or hybrid)
// - optional, LF-Tags
// - optional, LF-tags permissions x-account
// - optional, DataLake permissions x-AccountChatbots, limited to tags (what does this mean?)

import { Stack } from 'aws-cdk-lib';
import { CfnDataLakeSettings } from 'aws-cdk-lib/aws-lakeformation';
import { Construct } from 'constructs';

enum PermissionMode {
  LF_ONLY = 'LakeFormation',
  HYBRID = 'Hybrid-IAM',
}

interface DlzLakeFormationBaseSettings {
  /** A list of strings representing the IAM role names. */
  lakeFormationAdmins: string[];
  /** Select LF_ONLY for Lake Formation permissions or HYBRID for both IAM and Lake Formation. */
  permissionMode: PermissionMode;
}

export interface DlzLakeFormationProps {
  lakeFormationBaseSettings: DlzLakeFormationBaseSettings;
}

export class DlzLakeFormation {
  private scope: Construct;
  private id: string;
  // private props: DlzLakeFormationProps;

  constructor(scope: Construct, id: string, props: DlzLakeFormationProps) {
    this.scope = scope;
    this.id = id;

    this.setUpLFSettings(props.lakeFormationBaseSettings);
  }

  private setUpLFSettings(lfSettings: DlzLakeFormationBaseSettings) {
    const { lakeFormationAdmins, permissionMode } = lfSettings;

    const admins = lakeFormationAdmins.map((adminRole) => ({
      dataLakePrincipalIdentifier: Stack.of(this.scope).formatArn({
        service: 'iam',
        resource: 'role',
        region: '',
        account: Stack.of(this.scope).account,
        resourceName: adminRole,
      }),
    }));
    // TODO: MAYBE add cloudFormationExecutionRoleArn to list of admins
    // (not sure how, could not reproduce example here:
    //  https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lakeformation-readme.html#example
    // ). Cc. @rehanvdm

    const defaultPermissions =
      permissionMode === PermissionMode.LF_ONLY
        ? []
        : [
          {
            principal: {
              dataLakePrincipalIdentifier: 'IAM_ALLOWED_PRINCIPALS',
            },
            permissions: ['ALL'],
          },
        ];

    new CfnDataLakeSettings(this.scope, `${this.id}-data-lake-settings`, {
      admins: admins,
      createDatabaseDefaultPermissions: defaultPermissions,
      createTableDefaultPermissions: defaultPermissions,
    });
  }
}
