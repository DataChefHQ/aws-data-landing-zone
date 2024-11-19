import * as crypto from 'crypto';
import { DefaultStackSynthesizer, Stack } from 'aws-cdk-lib';
import * as lf from 'aws-cdk-lib/aws-lakeformation';
import { Construct } from 'constructs';
import { DatabaseAction, TableAction, TagAction, TagActionExternal } from './actions';

export * from './actions';

export interface LFTag {
  readonly tagKey: string;
  readonly tagValues: string[];
}

export interface BaseSharedTagProps {
  /**
   * A list of principal identity ARNs (e.g., AWS accounts, IAM roles/users) that the permissions apply to.
   */
  readonly principals: string[];
  /**
   * OPTIONAL - A list of specific values of the tag that can be shared. All possible values if omitted.
   */
  readonly specificValues?: string[];
}

export interface SharedInternal extends BaseSharedTagProps {
  /**
   * A list of actions that can be performed on the tag.
   */
  readonly tagActions: TagAction[];
  /**
   * A list of actions on the tag with grant option, allowing grantees to further grant these permissions.
   */
  readonly tagActionsWithGrant: TagAction[];
}

export interface SharedExternal extends BaseSharedTagProps {
  /**
   * A list of actions that can be performed on the tag.
   */
  readonly tagActions: TagActionExternal[];
  /**
   * A list of actions on the tag with grant option, allowing grantees to further grant these permissions.
   */
  readonly tagActionsWithGrant: TagActionExternal[];
}

export interface ShareProps {
  /**
   * Configurations for sharing LF-Tags with principals within the same AWS account.
   */
  readonly withinAccount: SharedInternal[];
  /**
   * Configurations for sharing LF-Tags with external AWS accounts.
   */
  readonly withExternalAccount: SharedExternal[];
}

export interface LFTagSharable extends LFTag {
  /**
   * OPTIONAL - Configuration detailing how the tag can be shared with specified principals.
   */
  readonly share?: ShareProps;
}

export interface LakePermission {
  /**
   * A list of principal identity ARNs (e.g., AWS accounts, IAM roles/users) that the permissions apply to.
   */
  readonly principals: string[];
  /**
   * LF tags associated with the permissions, used to specify fine-grained access controls.
   */
  readonly tags: LFTag[];
  /**
   * Actions that can be performed on databases, using Lake Formation Tag Based Access Control.
   */
  readonly databaseActions: DatabaseAction[];
  /**
   * OPTIONAL - Actions on databases with grant option, allowing grantees to further grant these permissions.
   */
  readonly databaseActionsWithGrant?: DatabaseAction[];
  /**
   * OPTIONAL - Actions that can be performed on tables, using Lake Formation Lake Formation Tag Based Access Control.
   */
  readonly tableActions?: TableAction[];
  /**
   * OPTIONAL - Actions on tables with grant option, allowing grantees to further grant these permissions.
   */
  readonly tableActionsWithGrant?: TableAction[];
}

export interface DlzLakeFormationProps {
  /**
   * A list of strings representing the IAM role ARNs.
   */
  readonly admins: string[];
  /**
   * OPTIONAL - Select `LakeFormation` for Lake Formation permissions or `Hybrid` for both IAM and Lake Formation.
   */
  readonly hybridMode?: boolean;
  /**
   * OPTIONAL - Version for cross-account data sharing. Read more {@link https://docs.aws.amazon.com/lake-formation/latest/dg/cross-account.html | here}.
   */
  readonly crossAccountVersion?: 1 | 2 | 3 | 4;
  /**
   * A list of Lake Formation tags that can be shared across accounts and principals.
   */
  readonly tags: LFTagSharable[];
  /**
   * A list of permission settings, specifying which Lake Formation permissions apply to which principals.
   */
  readonly permissions: LakePermission[];
}

const DEFAULTS: Partial<DlzLakeFormationProps> = {
  hybridMode: false,
  crossAccountVersion: 4,
};

export class DlzLakeFormation {
  // TODO: finish this @rehanvdm
  public static roleFromPermissionSet(_permissionSetName: string) { }

  // TODO: finish this @rehanvdm
  public static roleForAccount(_accountName: string) { }

  private account: string;
  private props: DlzLakeFormationProps;
  private lfTags: Record<string, lf.CfnTag> = {};

  constructor(private scope: Construct, private id: string, userProps: DlzLakeFormationProps) {
    this.account = Stack.of(scope).account;
    this.props = { ...DEFAULTS, ...userProps };

    this.setUpLFSettings();

    for (const tag of this.props.tags) {
      this.createTag(tag);
      this.shareTag(tag);
    }

    for (const permission of this.props.permissions) {
      const {
        principals,
        tags,
        databaseActions,
        databaseActionsWithGrant = [],
        tableActions = [],
        tableActionsWithGrant = [],
      } = permission;
      for (const principal of principals) {
        this.grantPermissionOnDatabase(principal, tags, databaseActions, databaseActionsWithGrant);
        this.grantPermissionOnTable(principal, tags, tableActions, tableActionsWithGrant);
      }
    }
  }

  private setUpLFSettings() {
    const { admins, hybridMode, crossAccountVersion } = this.props;
    const synthesizer = Stack.of(this.scope).synthesizer as DefaultStackSynthesizer;
    const cfnAdmin = synthesizer.cloudFormationExecutionRoleArn.replace('${AWS::Partition}', 'aws');
    const lfAdmins = [{ dataLakePrincipalIdentifier: cfnAdmin }];
    for (const admin of admins) {
      lfAdmins.push({ dataLakePrincipalIdentifier: admin });
    }

    const defaultPermissions = hybridMode
      ? [{ principal: { dataLakePrincipalIdentifier: 'IAM_ALLOWED_PRINCIPALS' }, permissions: ['ALL'] }]
      : [];

    new lf.CfnDataLakeSettings(this.scope, `${this.id}-data-lake-settings`, {
      admins: lfAdmins,
      createDatabaseDefaultPermissions: defaultPermissions,
      createTableDefaultPermissions: defaultPermissions,
      parameters: { CrossAccountVersion: crossAccountVersion },
    });
  }

  private createTag(tag: LFTagSharable) {
    const { tagKey, tagValues } = tag;
    const lfTag = new lf.CfnTag(
      this.scope,
      `${this.id}-lftag-${tagKey}`,
      { tagKey, tagValues, catalogId: this.account },
    );
    this.lfTags[tagKey] = lfTag;
  }

  private shareTag(tag: LFTagSharable) {
    const { tagKey, tagValues, share } = tag;
    if (!share) return;

    const { withinAccount, withExternalAccount } = share;
    const shares = [...withinAccount, ...withExternalAccount];

    for (const shareOptions of shares) {
      const { principals, specificValues, tagActions, tagActionsWithGrant } = shareOptions;
      for (const principal of principals) {
        const sharedTag = { tagKey, tagValues: specificValues || tagValues };
        this.grantPermissionOnTag(principal, sharedTag, tagActions, tagActionsWithGrant);
      }
    }
  }

  private grantPermissionOnTag(
    principalIdentifier: string,
    tag: LFTag,
    permissions: TagAction[],
    grantablePermissions: TagAction[],
  ) {
    this._grantPermission(principalIdentifier, tag, 'TAG', permissions, grantablePermissions);
  }

  private grantPermissionOnDatabase(
    principalIdentifier: string,
    tags: LFTag[],
    permissions: DatabaseAction[],
    grantablePermissions: DatabaseAction[],
  ) {
    this._grantPermission(principalIdentifier, tags, 'DATABASE', permissions, grantablePermissions);
  }

  private grantPermissionOnTable(
    principalIdentifier: string,
    tags: LFTag[],
    permissions: TableAction[],
    grantablePermissions: TableAction[],
  ) {
    this._grantPermission(principalIdentifier, tags, 'TABLE', permissions, grantablePermissions);
  }

  private _grantPermission(
    principalIdentifier: string,
    tagOrTags: LFTag | LFTag[],
    resourceType: 'TAG' | 'DATABASE' | 'TABLE',
    permissions: (DatabaseAction | TableAction | TagAction)[],
    grantablePermissions: (DatabaseAction | TableAction | TagAction)[],
  ) {
    const tags = Array.isArray(tagOrTags) ? tagOrTags : [tagOrTags];
    const tagsHash = this._tagsHashValue(tags);
    const baseResourceProps = { catalogId: this.account };
    const resource = resourceType === 'TAG'
      ? { lfTag: { ...baseResourceProps, tagKey: tags[0].tagKey, tagValues: tags[0].tagValues } }
      : { lfTagPolicy: { ...baseResourceProps, resourceType: resourceType, expression: tags } };

    const permission = new lf.CfnPrincipalPermissions(
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

    for (const tag of tags) {
      const { tagKey } = tag;
      permission.node.addDependency(this.lfTags[tagKey]);
    }
  }

  private _tagsHashValue(tags: LFTag[]) {
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
