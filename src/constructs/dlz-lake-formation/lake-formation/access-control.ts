import * as crypto from 'crypto';
import { Stack } from 'aws-cdk-lib';
import * as lf from 'aws-cdk-lib/aws-lakeformation';
import { Construct } from 'constructs';
import { DatabaseAction, TableAction, TagAction } from './actions';
import { DlzLakeFormationAccessControlProps, LFTag, LFTagSharable } from './interfaces';

export class DlzLakeFormationAccessControl extends Construct {
  private account: string;
  private lfTags: Record<string, lf.CfnTag> = {};

  constructor(private scope: Construct, private id: string, private props: DlzLakeFormationAccessControlProps) {
    super(scope, id);
    this.account = Stack.of(scope).account;

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

    const { withinAccount = [], withExternalAccount = [] } = share;
    const shares = [...withinAccount, ...withExternalAccount];

    for (const shareOptions of shares) {
      const { principals, specificValues, tagActions, tagActionsWithGrant = [] } = shareOptions;
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