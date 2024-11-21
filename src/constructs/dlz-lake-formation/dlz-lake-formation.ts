import * as crypto from 'crypto';
import { CfnResource, DefaultStackSynthesizer, Stack } from 'aws-cdk-lib';
import * as lf from 'aws-cdk-lib/aws-lakeformation';
import { Construct } from 'constructs';
import { DatabaseAction, TableAction, TagAction } from './actions';
import { DlzLakeFormationProps, LFTag, LFTagSharable } from './interfaces';

const DEFAULTS: Partial<DlzLakeFormationProps> = {
  hybridMode: false,
  crossAccountVersion: 4,
};

export class DlzLakeFormation {
  // TODO: finish these 2 @rehanvdm
  public static roleFromPermissionSet(_permissionSetName: string) { }
  public static roleForAccount(_accountName: string) { }

  private props: DlzLakeFormationProps;
  private account: string;
  private dataLakeSettings: lf.CfnDataLakeSettings;
  private lfTags: Record<string, lf.CfnTag> = {};
  private resources: CfnResource[] = [];

  constructor(private scope: Construct, private id: string, userProps: DlzLakeFormationProps) {
    this.props = { ...DEFAULTS, ...userProps };
    this.account = Stack.of(scope).account;
    this.dataLakeSettings = this.setUpLFSettings();

    for (const tag of this.props.tags) {
      this.createTag(tag);
      this.shareTag(tag);

      for (const admin of this.props.admins) {
        const tagWithWildcard = { tagKey: tag.tagKey, tagValues: ['*'] };
        const allTagActions = [TagAction.ALTER, TagAction.ASSOCIATE, TagAction.DESCRIBE, TagAction.DROP];
        this.grantPermissionOnTag(admin, tagWithWildcard, allTagActions, allTagActions);
      }
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

    for (const resource of this.resources) {
      resource.addDependency(this.dataLakeSettings);
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

    // WARN: Currently broken due to AWS API!!! See https://github.com/pulumi/pulumi-aws/issues/4366
    const defaultPermissions = hybridMode
      ? [{ principal: { dataLakePrincipalIdentifier: 'IAM_ALLOWED_PRINCIPALS' }, permissions: ['ALL'] }]
      : [];

    return new lf.CfnDataLakeSettings(this.scope, `${this.id}-data-lake-settings`, {
      admins: lfAdmins,
      createDatabaseDefaultPermissions: defaultPermissions,
      createTableDefaultPermissions: defaultPermissions,
      parameters: { CROSS_ACCOUNT_VERSION: crossAccountVersion },
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
    this.resources.push(lfTag);
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
      permission.addDependency(this.lfTags[tagKey]);
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
