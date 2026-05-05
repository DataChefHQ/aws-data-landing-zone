/**
 * Encryption configuration for the CUR data-plane bucket.
 *
 * When `kmsKeyArn` is omitted the bucket falls back to SSE-S3 (S3-managed keys),
 * which avoids cross-account KMS key-policy work. When set, the construct switches
 * to SSE-KMS and adds `billingreports.amazonaws.com` to the key policy.
 */
export interface DlzCurBucketEncryption {
  /**
   * KMS key ARN for SSE-KMS. Omit for SSE-S3.
   */
  readonly kmsKeyArn?: string;
}

export interface DlzCurLifecycleConfig {
  /**
   * Master switch for lifecycle rules. When `false`, ALL transitions and expirations
   * are skipped — every object stays in S3 Standard indefinitely. Intended for
   * testing / sandbox deployments. The construct emits a synth-time warning when this
   * is set so prod deployments don't ship without retention by accident.
   * @default true
   */
  readonly enabled?: boolean;

  /**
   * Days before transitioning to S3 Standard-IA.
   * @default 90
   */
  readonly transitionToInfrequentAccessDays?: number;

  /**
   * Days before transitioning to Glacier Instant Retrieval (still queryable by Athena).
   * @default 365
   */
  readonly transitionToGlacierDays?: number;

  /**
   * Days before object expiration. Set to `0` to keep objects forever (transitions still apply).
   * Minimum 395 enforced when non-zero so YoY comparisons stay possible.
   * @default 2555 (~7 years)
   */
  readonly expirationDays?: number;
}

export interface DlzCurExportConfig {
  /**
   * Time granularity. `HOURLY` is required for resource-level cost analysis.
   * @default 'HOURLY'
   */
  readonly timeGranularity?: 'HOURLY' | 'DAILY' | 'MONTHLY';

  /**
   * Output format.
   * @default 'PARQUET' (Athena/QuickSight efficiency; Parquet scans 10-100× cheaper than CSV)
   */
  readonly format?: 'PARQUET' | 'TEXT_OR_CSV';

  /**
   * Compression codec.
   * @default 'PARQUET' (Snappy via Parquet's native compression)
   */
  readonly compression?: 'PARQUET' | 'GZIP';

  /**
   * Include per-resource detail.
   * @default true (per-resource cost attribution)
   */
  readonly includeResources?: boolean;

  /**
   * Include split cost allocation data — required for shared-services proportional allocation.
   * @default true (FinOps Layer 1 instrumentation requirement)
   */
  readonly includeSplitCostAllocationData?: boolean;

  /**
   * Include manual discount compatibility columns. Only flip for orgs with private pricing agreements.
   * @default false
   */
  readonly includeManualDiscountCompatibility?: boolean;

  /**
   * Overwrite vs. create-new behavior.
   * @default 'OVERWRITE_REPORT' (idempotent; bucket size grows linearly)
   */
  readonly overwriteBehavior?: 'OVERWRITE_REPORT' | 'CREATE_NEW_REPORT';
}

export interface DlzCurDataPlaneConfig {
  /**
   * Bucket-level encryption.
   * @default - SSE-S3 (avoids cross-account KMS key-policy work)
   */
  readonly encryption?: DlzCurBucketEncryption;

  /**
   * Bucket versioning.
   * @default true (cheap durability; CUR's OVERWRITE_REPORT semantics coexist fine)
   */
  readonly versioning?: boolean;

  /**
   * S3 access logging to a sibling logs bucket in the same account.
   * @default true (auditability)
   */
  readonly accessLogging?: boolean;

  /**
   * Lifecycle rules. See {@link DlzCurLifecycleConfig.enabled} for the testing opt-out.
   */
  readonly lifecycle?: DlzCurLifecycleConfig;

  /**
   * Glue crawler schedule (cron expression).
   * @default 'cron(0 6 * * ? *)' (daily 06:00 UTC, after CUR has delivered the morning's data)
   */
  readonly glueCrawlerSchedule?: string;

  /**
   * Additional accounts (beyond the FinOps account itself) granted `s3:GetObject` and
   * `glue:Get*` on the CUR data. SSO/IAM Identity Center bindings are deployment-specific
   * and remain out of scope.
   * @default []
   */
  readonly additionalReadAccountIds?: string[];
}

export interface DlzCurProps {
  /**
   * Region for the destination S3 bucket. The export definition itself is forced to
   * `us-east-1` because BCM Data Exports is a us-east-1-only API. Cross-region delivery
   * by AWS is free; cross-region S3 GETs by consumers are not.
   *
   * When set to anything other than 'us-east-1' the construct emits a synth-time warning
   * (Glue + Athena + downstream tooling must deploy in the same region as the bucket).
   *
   * @default 'us-east-1'
   */
  readonly destinationRegion?: string;

  /**
   * Export name. Becomes part of the BCM Data Exports `aws:SourceArn` used in the bucket policy.
   * @default 'dlz-cur-2'
   */
  readonly exportName?: string;

  /**
   * Bucket-name prefix. Full name is `{prefix}-{destinationAccountId}-{region}`.
   * @default 'dlz-cur'
   */
  readonly bucketNamePrefix?: string;

  /** @default 'dlz_cur_2' */
  readonly glueDatabaseName?: string;

  /**
   * Activate cost allocation tags so they appear in CUR. Activates the 5 mandatory tags
   * plus any `additionalMandatoryTags`.
   * @default true
   */
  readonly activateCostAllocationTags?: boolean;

  /** Export-shape tuning. Defaults match FinOps best practice. */
  readonly exportConfig?: DlzCurExportConfig;

  /** Data-plane (S3 + Glue + lifecycle) tuning. */
  readonly dataPlaneConfig?: DlzCurDataPlaneConfig;
}

export const DLZ_CUR_DEFAULTS = {
  exportName: 'dlz-cur-2',
  bucketNamePrefix: 'dlz-cur',
  glueDatabaseName: 'dlz_cur_2',
  destinationRegion: 'us-east-1',
  exportRegion: 'us-east-1' as const,
  glueCrawlerSchedule: 'cron(0 6 * * ? *)',
  lifecycle: {
    transitionToInfrequentAccessDays: 90,
    transitionToGlacierDays: 365,
    expirationDays: 2555,
    minExpirationDays: 395,
  },
};
