import { DatabaseAction, TableAction, TagAction, TagActionExternal } from './actions';
import { Region } from '../../data-landing-zone-types';

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
  readonly tagActionsWithGrant?: TagAction[];
}

export interface SharedExternal extends BaseSharedTagProps {
  /**
   * A list of actions that can be performed on the tag. Only `TagAction.DESCRIBE` and `TagAction.ASSOCIATE` are allowed.
   */
  readonly tagActions: TagActionExternal[];
  /**
   * A list of actions on the tag with grant option, allowing grantees to further grant these permissions.
   */
  readonly tagActionsWithGrant?: TagActionExternal[];
}

export interface ShareProps {
  /**
   * Configurations for sharing LF-Tags with principals within the same AWS account.
   */
  readonly withinAccount?: SharedInternal[];
  /**
   * Configurations for sharing LF-Tags with external AWS accounts.
   */
  readonly withExternalAccount?: SharedExternal[];
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
   * The region where LakeFormation will be created in
   */
  readonly region: Region;
  /**
   * A list of strings representing the IAM role ARNs.
   */
  readonly admins: string[];
  /**
   * OPTIONAL - Select `true` to use both IAM and Lake Formation for data access, or `false` to use Lake Formation only. Defaults to `false`.
   * @note Hybrid mode is only recommended for accounts that already have a data lake managed via IAM permissions.
   * For new accounts or accounts that don't have a data lake yet, it is strongly recommended to use Lake Formation only.
   * @note `false` is currently not working due to issue with AWS API.
   * You will have do disable hybrid mode manually via the AWS console.
   * See {@link https://github.com/pulumi/pulumi-aws/issues/4366}
   */
  readonly hybridMode?: boolean;
  /**
   * OPTIONAL - Version for cross-account data sharing. Defaults to `4`. Read more {@link https://docs.aws.amazon.com/lake-formation/latest/dg/cross-account.html | here}.
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