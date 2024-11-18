import * as crypto from 'crypto';
import { DefaultStackSynthesizer, Stack } from 'aws-cdk-lib';
import * as lf from 'aws-cdk-lib/aws-lakeformation';
import { Construct } from 'constructs';
import { DatabaseAction, PermissionsForResource, TableAction, TagAction } from './actions';

export type PermissionMode = 'LakeFormation' | 'Hybrid';

export interface LFTag {
  readonly tagKey: string;
  readonly tagValues: string[];
}

export interface SharedTagProps {
  /** A list of principal identity ARNs (e.g., AWS accounts, IAM roles/users) that the permissions apply to. */
  readonly principals: string[];
  /** A list of specific values of the tag that can be shared. */
  readonly specificValues: string[];
  /** A list of actions that can be performed on the tag. */
  readonly permissions: TagAction[];
  /** A list of actions on the tag with grant option, allowing grantees to further grant these permissions. */
  readonly permissionsWithGrantOption: TagAction[];
}

export interface LFTagSharable extends LFTag {
  /**
   * OPTIONAL - A list of entities with which this LFTag can be shared,
   * along with specific values of the tag and associated permissions.
   */
  readonly shareWith?: SharedTagProps[];
}

export interface LakePermission {
  /** A list of principal identity ARNs (e.g., AWS accounts, IAM roles/users) that the permissions apply to. */
  readonly principals: string[];
  /** LF tags associated with the permissions, used to specify fine-grained access controls. */
  readonly tags: LFTag[];
  /** Actions that can be performed on databases, using Lake Formation Tag Based Access Control. */
  readonly database: DatabaseAction[];
  /** Actions on databases with grant option, allowing grantees to further grant these permissions. */
  readonly databaseWithGrant: DatabaseAction[];
  /** Actions that can be performed on tables, using Lake Formation Lake Formation Tag Based Access Control. */
  readonly table: TableAction[];
  /** Actions on tables with grant option, allowing grantees to further grant these permissions. */
  readonly tableWithGrant: TableAction[];
}

export interface DlzLakeFormationProps {
  /** A list of strings representing the IAM role ARNs. */
  readonly lakeFormationAdmins: string[];
  /** OPTIONAL - Select `LakeFormation` for Lake Formation permissions or `Hybrid` for both IAM and Lake Formation. */
  readonly permissionMode?: PermissionMode;
  /** OPTIONAL - Version for cross-account data sharing. Read more {@link https://docs.aws.amazon.com/lake-formation/latest/dg/cross-account.html | here}. */
  readonly crossAccountVersion?: 1 | 2 | 3;
  /** A list of Lake Formation tags that can be shared across accounts and principals. */
  readonly lakeFormationTags: LFTagSharable[];
  /** A list of permission settings, specifying which Lake Formation permissions apply to which principals. */
  readonly lakePermissions: LakePermission[];
}

const DEFAULTS: Partial<DlzLakeFormationProps> = {
  permissionMode: 'LakeFormation',
  crossAccountVersion: 3,
};

export class DlzLakeFormation {
  // TODO: finish this @rehanvdm
  public static roleFromPermissionSet(_permissionSetName: string) { }

  // TODO: finish this @rehanvdm
  public static roleForAccount(_accountName: string) { }

  private account: string;
  private props: DlzLakeFormationProps;

  constructor(private scope: Construct, private id: string, userProps: DlzLakeFormationProps) {
    this.account = Stack.of(scope).account;
    this.props = { ...DEFAULTS, ...userProps };

    this.setUpLFSettings();
    this.props.lakeFormationTags.forEach((tag) => {
      this.createTag(tag);
      this.shareTag(tag);
    });
    this.props.lakePermissions.forEach((permission) => {
      const { principals, tags, database, databaseWithGrant, table, tableWithGrant } = permission;
      principals.forEach((principal) => {
        this.grantPermission(principal, tags, 'DATABASE', database, databaseWithGrant);
        this.grantPermission(principal, tags, 'TABLE', table, tableWithGrant);
      });
    });
  }

  private setUpLFSettings() {
    const { lakeFormationAdmins, permissionMode, crossAccountVersion } = this.props;
    const synthesizer = Stack.of(this.scope).synthesizer as DefaultStackSynthesizer;
    const admins = [
      ...lakeFormationAdmins.map((adminRole) => ({
        dataLakePrincipalIdentifier: adminRole,
      })),
      {
        dataLakePrincipalIdentifier: synthesizer.cloudFormationExecutionRoleArn.replace('${AWS::Partition}', 'aws'),
      },
    ];
    const defaultPermissions =
      permissionMode === 'LakeFormation'
        ? []
        : [
          {
            principal: {
              dataLakePrincipalIdentifier: 'IAM_ALLOWED_PRINCIPALS',
            },
            permissions: ['ALL'],
          },
        ];

    new lf.CfnDataLakeSettings(this.scope, `${this.id}-data-lake-settings`, {
      admins: admins,
      createDatabaseDefaultPermissions: defaultPermissions,
      createTableDefaultPermissions: defaultPermissions,
      parameters: { CrossAccountVersion: crossAccountVersion },
    });
  }

  private createTag(tag: LFTagSharable) {
    const { tagKey, tagValues } = tag;
    new lf.CfnTag(
      this.scope,
      `${this.id}-lftag-${tagKey}`,
      { tagKey, tagValues, catalogId: this.account },
    );
  }

  private shareTag(tag: LFTagSharable) {
    const { shareWith } = tag;
    if (!shareWith) return;
    shareWith.forEach((share) => {
      const { principals, specificValues, permissions, permissionsWithGrantOption } = share;
      principals.forEach((principal) => {
        const sharedTag = { tagKey: tag.tagKey, tagValues: specificValues };
        this.grantPermission(principal, sharedTag, 'TAG', permissions, permissionsWithGrantOption);
      });
    });
  }

  // #region grantPermissionOverloads
  private grantPermission(
    principalIdentifier: string,
    tag: LFTag,
    resourceType: 'TAG',
    permissions: PermissionsForResource<'TAG'>[],
    grantablePermissions: PermissionsForResource<'TAG'>[]
  ): void;
  private grantPermission(
    principalIdentifier: string,
    tags: LFTag[],
    resourceType: 'DATABASE' | 'TABLE',
    permissions: PermissionsForResource<'DATABASE' | 'TABLE'>[],
    grantablePermissions: PermissionsForResource<'DATABASE' | 'TABLE'>[]
  ): void;
  // #endregion
  private grantPermission(
    principalIdentifier: string,
    tagOrTags: LFTag | LFTag[],
    resourceType: 'TAG' | 'DATABASE' | 'TABLE',
    permissions: PermissionsForResource<typeof resourceType>[],
    grantablePermissions: PermissionsForResource<typeof resourceType>[],
  ) {
    const tags = Array.isArray(tagOrTags) ? tagOrTags : [tagOrTags];
    const tagsHash = this._hashTags(tags);
    const baseResourceProps = { catalogId: this.account };
    const resource = resourceType === 'TAG'
      ? { lfTag: { ...baseResourceProps, tagKey: tags[0].tagKey, tagValues: tags[0].tagValues } }
      : { lfTagPolicy: { ...baseResourceProps, resourceType: resourceType, expression: tags } };

    new lf.CfnPrincipalPermissions(
      this.scope,
      `${this.id}-${principalIdentifier}-${resourceType.toLowerCase()}-grant-${tagsHash}`,
      {
        catalog: this.account,
        permissions: permissions,
        permissionsWithGrantOption: grantablePermissions,
        principal: { dataLakePrincipalIdentifier: principalIdentifier },
        resource: resource,
      },
    );
  }

  private _hashTags(tags: LFTag[]) {
    const serializedTags = JSON.stringify(
      tags
        .map((tag) => ({ key: tag.tagKey, values: tag.tagValues.sort() }))
        .sort((a, b) => a.key.localeCompare(b.key)),
    );
    return crypto
      .createHash('md5')
      .update(serializedTags)
      .digest('hex')
      .slice(0, 8);
  }
}
