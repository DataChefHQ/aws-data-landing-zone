export interface DlzCurBucketEncryption {
  /**
   * KMS key ARN for SSE-KMS. Omit for SSE-S3 (default; avoids cross-account KMS
   * key-policy work). When set, ensure the key policy grants
   * `bcm-data-exports.amazonaws.com` `kms:GenerateDataKey*` and `kms:Decrypt`.
   */
  readonly kmsKeyArn?: string;
}

export interface DlzCurLifecycleConfig {
  /**
   * Master switch. `false` keeps every object in S3 Standard indefinitely — sandbox only;
   * the construct emits a synth-time warning so prod doesn't ship without retention.
   * @default true
   */
  readonly enabled?: boolean;

  /** @default 90 */
  readonly transitionToInfrequentAccessDays?: number;

  /** Glacier Instant Retrieval — still queryable by Athena. @default 365 */
  readonly transitionToGlacierDays?: number;

  /**
   * Object expiration. `0` keeps objects forever (transitions still apply).
   * Minimum 395 enforced when non-zero so YoY comparisons stay possible.
   * @default 2555 (~7 years)
   */
  readonly expirationDays?: number;
}

export interface DlzCurExportConfig {
  /** @default 'HOURLY' */
  readonly timeGranularity?: 'HOURLY' | 'DAILY' | 'MONTHLY';

  /** @default 'PARQUET' */
  readonly format?: 'PARQUET' | 'TEXT_OR_CSV';

  /** @default 'PARQUET' */
  readonly compression?: 'PARQUET' | 'GZIP';

  /** @default true */
  readonly includeResources?: boolean;

  /** @default true */
  readonly includeSplitCostAllocationData?: boolean;

  /**
   * Adds 3 `capacity_reservation_*` columns. Data populates from 2025-11-01.
   * @default false
   */
  readonly includeCapacityReservationData?: boolean;

  /**
   * Adds the `line_item_iam_principal` column (Bedrock caller-identity allocation).
   * Data populates from 2026-04-08.
   * @default false
   */
  readonly includeIamPrincipalData?: boolean;

  /** @default 'OVERWRITE_REPORT' */
  readonly overwriteBehavior?: 'OVERWRITE_REPORT' | 'CREATE_NEW_REPORT';

  /**
   * Full SQL override. Use when you need a non-trivial projection / filter / aggregation.
   * BCM does not support `SELECT *`. When set, `queryColumns` and flag-driven extensions
   * are ignored — you own the full SQL.
   */
  readonly queryStatement?: string;

  /**
   * Columns to project. Falls back to {@link DLZ_CUR_DEFAULT_QUERY_COLUMNS} when undefined
   * or empty. To extend the defaults, spread them: `[...DLZ_CUR_DEFAULT_QUERY_COLUMNS, 'foo']`.
   * Flag-driven columns are appended automatically.
   */
  readonly queryColumns?: string[];
}

export interface DlzCurDataPlaneConfig {
  /** @default - SSE-S3 */
  readonly encryption?: DlzCurBucketEncryption;

  /** @default true */
  readonly versioning?: boolean;

  /** @default true */
  readonly accessLogging?: boolean;

  readonly lifecycle?: DlzCurLifecycleConfig;

  /** @default 'cron(0 6 * * ? *)' */
  readonly glueCrawlerSchedule?: string;

  /**
   * Extra accounts granted `s3:GetObject` and `s3:ListBucket` on the CUR data.
   * @default []
   */
  readonly additionalReadAccountIds?: string[];

  /**
   * Athena workgroup + query-results bucket. Without this, AWS Athena prompts
   * users to "set up a query result location in Amazon S3" before any query
   * runs — DLZ ships the workgroup so consumers can query CUR data day-1.
   * @default - enabled with sane defaults
   */
  readonly athena?: DlzCurAthenaConfig;
}

export interface DlzCurAthenaConfig {
  /**
   * When `false`, no workgroup or results bucket is created. Operators that
   * already run a central Athena workgroup can opt out and point downstream
   * tooling at their own results location.
   * @default true
   */
  readonly enabled?: boolean;

  /** @default 'dlz-cur' */
  readonly workgroupName?: string;

  /**
   * Bucket name is `{prefix}-{finOpsAccountId}-{destinationRegion}`.
   * @default 'dlz-cur-athena-results'
   */
  readonly resultsBucketNamePrefix?: string;

  /**
   * Days before query results expire. `0` keeps results forever (don't — they
   * accumulate and aren't useful past a few days). Min 1.
   * @default 30
   */
  readonly resultsExpirationDays?: number;

  /**
   * Per-query bytes-scanned limit. Athena cancels queries scanning more bytes
   * than this — useful as a runaway-cost guardrail. Min 10 MB enforced by
   * Athena. Omit for no limit.
   * @default - no limit
   */
  readonly bytesScannedCutoffPerQuery?: number;

  /**
   * Athena engine version. v3 is the current default and supports more
   * Parquet / Iceberg features than v2.
   * @default 3
   */
  readonly engineVersion?: 2 | 3;

  /**
   * Publish per-query CloudWatch metrics for the workgroup.
   * @default true
   */
  readonly publishCloudWatchMetrics?: boolean;
}

export interface DlzCurProps {
  /**
   * Destination S3 bucket region. The export resource itself is always pinned to
   * `us-east-1` (BCM Data Exports is a us-east-1-only API); only the bucket moves.
   * @default 'us-east-1'
   */
  readonly destinationRegion?: string;

  /** @default 'dlz-cur-2' */
  readonly exportName?: string;

  /**
   * Optional S3 path segment prepended in front of the export name. BCM's layout
   * is `<bucket>/<destinationPrefix>/<exportName>/{data,metadata}/...`. Default
   * is empty, giving the flat `<bucket>/<exportName>/{data,metadata}/...` layout.
   * Set this only if you need the bucket to host multiple exports under separate
   * folders.
   * @default '' (no prefix; flat layout)
   */
  readonly destinationPrefix?: string;

  /** Bucket name is `{prefix}-{finOpsAccountId}-{destinationRegion}`. @default 'dlz-cur' */
  readonly bucketNamePrefix?: string;

  /** @default 'dlz_cur_2' */
  readonly glueDatabaseName?: string;

  /**
   * Activate the 5 mandatory tags (plus any `additionalMandatoryTags`) as Cost Allocation Tags.
   * @default true
   */
  readonly activateCostAllocationTags?: boolean;

  readonly exportConfig?: DlzCurExportConfig;

  readonly dataPlaneConfig?: DlzCurDataPlaneConfig;
}

/**
 * Default CUR 2.0 columns. BCM Data Exports does NOT accept `SELECT *` — the API
 * rejects wildcards with a generic 400 "Invalid QueryStatement", so we enumerate.
 * Covers all standard columns when `INCLUDE_RESOURCES` and `INCLUDE_SPLIT_COST_ALLOCATION_DATA`
 * are TRUE (the DLZ defaults). Flag-gated columns are in {@link DLZ_CUR_OPTIONAL_QUERY_COLUMNS}.
 */
export const DLZ_CUR_DEFAULT_QUERY_COLUMNS = [
  'bill_bill_type',
  'bill_billing_entity',
  'bill_billing_period_end_date',
  'bill_billing_period_start_date',
  'bill_invoice_id',
  'bill_invoicing_entity',
  'bill_payer_account_id',
  'bill_payer_account_name',
  'cost_category',
  'discount',
  'discount_bundled_discount',
  'discount_total_discount',
  'identity_line_item_id',
  'identity_time_interval',
  'line_item_availability_zone',
  'line_item_blended_cost',
  'line_item_blended_rate',
  'line_item_currency_code',
  'line_item_legal_entity',
  'line_item_line_item_description',
  'line_item_line_item_type',
  'line_item_net_unblended_cost',
  'line_item_net_unblended_rate',
  'line_item_normalization_factor',
  'line_item_normalized_usage_amount',
  'line_item_operation',
  'line_item_product_code',
  'line_item_resource_id',
  'line_item_tax_type',
  'line_item_unblended_cost',
  'line_item_unblended_rate',
  'line_item_usage_account_id',
  'line_item_usage_account_name',
  'line_item_usage_amount',
  'line_item_usage_end_date',
  'line_item_usage_start_date',
  'line_item_usage_type',
  'line_item_user_identifier',
  'pricing_currency',
  'pricing_lease_contract_length',
  'pricing_offering_class',
  'pricing_public_on_demand_cost',
  'pricing_public_on_demand_rate',
  'pricing_purchase_option',
  'pricing_rate_code',
  'pricing_rate_id',
  'pricing_term',
  'pricing_unit',
  'product',
  'product_comment',
  'product_fee_code',
  'product_fee_description',
  'product_from_location',
  'product_from_location_type',
  'product_from_region_code',
  'product_instance_family',
  'product_instance_type',
  'product_instancesku',
  'product_location',
  'product_location_type',
  'product_operation',
  'product_pricing_unit',
  'product_product_family',
  'product_region_code',
  'product_servicecode',
  'product_sku',
  'product_to_location',
  'product_to_location_type',
  'product_to_region_code',
  'product_usagetype',
  'reservation_amortized_upfront_cost_for_usage',
  'reservation_amortized_upfront_fee_for_billing_period',
  'reservation_availability_zone',
  'reservation_effective_cost',
  'reservation_end_time',
  'reservation_modification_status',
  'reservation_net_amortized_upfront_cost_for_usage',
  'reservation_net_amortized_upfront_fee_for_billing_period',
  'reservation_net_effective_cost',
  'reservation_net_recurring_fee_for_usage',
  'reservation_net_unused_amortized_upfront_fee_for_billing_period',
  'reservation_net_unused_recurring_fee',
  'reservation_net_upfront_value',
  'reservation_normalized_units_per_reservation',
  'reservation_number_of_reservations',
  'reservation_recurring_fee_for_usage',
  'reservation_reservation_a_r_n',
  'reservation_start_time',
  'reservation_subscription_id',
  'reservation_total_reserved_normalized_units',
  'reservation_total_reserved_units',
  'reservation_units_per_reservation',
  'reservation_unused_amortized_upfront_fee_for_billing_period',
  'reservation_unused_normalized_unit_quantity',
  'reservation_unused_quantity',
  'reservation_unused_recurring_fee',
  'reservation_upfront_value',
  'resource_tags',
  'savings_plan_amortized_upfront_commitment_for_billing_period',
  'savings_plan_end_time',
  'savings_plan_instance_type_family',
  'savings_plan_net_amortized_upfront_commitment_for_billing_period',
  'savings_plan_net_recurring_commitment_for_billing_period',
  'savings_plan_net_savings_plan_effective_cost',
  'savings_plan_offering_type',
  'savings_plan_payment_option',
  'savings_plan_purchase_term',
  'savings_plan_recurring_commitment_for_billing_period',
  'savings_plan_region',
  'savings_plan_savings_plan_a_r_n',
  'savings_plan_savings_plan_effective_cost',
  'savings_plan_savings_plan_rate',
  'savings_plan_start_time',
  'savings_plan_total_commitment_to_date',
  'savings_plan_used_commitment',
  'split_line_item_actual_usage',
  'split_line_item_net_split_cost',
  'split_line_item_net_unused_cost',
  'split_line_item_parent_resource_id',
  'split_line_item_public_on_demand_split_cost',
  'split_line_item_public_on_demand_unused_cost',
  'split_line_item_reserved_usage',
  'split_line_item_split_cost',
  'split_line_item_split_usage',
  'split_line_item_split_usage_ratio',
  'split_line_item_unused_cost',
  'tags',
];

export const DLZ_CUR_OPTIONAL_QUERY_COLUMNS = {
  capacityReservationData: [
    'capacity_reservation_capacity_reservation_arn',
    'capacity_reservation_capacity_reservation_status',
    'capacity_reservation_capacity_reservation_type',
  ],
  iamPrincipalData: [
    'line_item_iam_principal',
  ],
};

export const DLZ_CUR_DEFAULTS = {
  exportName: 'dlz-cur-2',
  destinationPrefix: '',
  bucketNamePrefix: 'dlz-cur',
  glueDatabaseName: 'dlz_cur_2',
  destinationRegion: 'us-east-1',
  exportRegion: 'us-east-1' as const,
  glueCrawlerSchedule: 'cron(0 6 * * ? *)',
  queryStatement: `SELECT ${DLZ_CUR_DEFAULT_QUERY_COLUMNS.join(', ')} FROM COST_AND_USAGE_REPORT`,
  lifecycle: {
    transitionToInfrequentAccessDays: 90,
    transitionToGlacierDays: 365,
    expirationDays: 2555,
    minExpirationDays: 395,
  },
  athena: {
    enabled: true,
    workgroupName: 'dlz-cur',
    resultsBucketNamePrefix: 'dlz-cur-athena-results',
    resultsExpirationDays: 30,
    engineVersion: 3 as const,
    publishCloudWatchMetrics: true,
  },
};
