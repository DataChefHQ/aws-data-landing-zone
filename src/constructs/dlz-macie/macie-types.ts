/**
 * Organization-level Macie configuration.
 * When specified on `DataLandingZoneProps`, configures Macie at the organization level
 * and delegates administration to the security audit account.
 */
export interface DlzMacieProps {
  /**
   * Master switch for Macie. When false, no Macie constructs are created
   * (delegated admin, org config, member enrollment are all skipped).
   * Note: omitting `macie` entirely from `DataLandingZoneProps` also means
   * no Macie — this flag is for explicitly disabling when the config block exists.
   * @default true
   */
  readonly enabled?: boolean;

  /**
   * Auto-enable Macie for new organization member accounts.
   * When true, new accounts joining the org are automatically enabled by AWS.
   * Existing accounts must be explicitly enrolled via `macieEnabled: true` on `DLzAccount`.
   * Maps directly to the Macie `UpdateOrganizationConfiguration` API `autoEnable` boolean.
   * @default false
   */
  readonly autoEnable?: boolean;
}
