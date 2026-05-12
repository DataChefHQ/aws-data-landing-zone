export interface DlzDataExportsBucketEncryption {
  /** SSE-KMS key ARN. Omit for SSE-S3. Key policy must allow `bcm-data-exports.amazonaws.com`. */
  readonly kmsKeyArn?: string;
}

export interface DlzDataExportsLifecycleConfig {
  readonly enabled?: boolean;
  readonly transitionToInfrequentAccessDays?: number;
  readonly transitionToGlacierDays?: number;
  /** `0` keeps objects forever; minimum 395 enforced when non-zero (YoY comparisons). */
  readonly expirationDays?: number;
}

/**
 * BCM only accepts paired PARQUET+PARQUET or TEXT_OR_CSV+GZIP. JSII can't
 * express the pairing as a discriminated union; enforced in `validateFinOpsConfig`.
 */
export interface DlzDataExportOutputConfig {
  readonly format?: 'PARQUET' | 'TEXT_OR_CSV';
  readonly compression?: 'PARQUET' | 'GZIP';
}

export interface DlzStandardCur20Config {
  readonly timeGranularity?: 'HOURLY' | 'DAILY' | 'MONTHLY';
  readonly includeResources?: boolean;
  readonly includeSplitCostAllocationData?: boolean;
  /** Adds `capacity_reservation_*` columns. Data populates from 2025-11-01. */
  readonly includeCapacityReservationData?: boolean;
  /** Adds `line_item_iam_principal`. Data populates from 2026-04-08. */
  readonly includeIamPrincipalData?: boolean;
  /** Removes `discount` / `discount_total_discount`; only relevant under Discount Automation. */
  readonly includeManualDiscountCompatibility?: boolean;
  /** Full SQL override. `SELECT *` is rejected by BCM. */
  readonly queryStatement?: string;
  readonly queryColumns?: string[];
}

export interface DlzFocus12Config {
  readonly timeGranularity?: 'HOURLY' | 'DAILY' | 'MONTHLY';
  readonly queryStatement?: string;
  readonly queryColumns?: string[];
}

export interface DlzCorFilterTag {
  readonly key: string;
  readonly values: string[];
}

export interface DlzCorFilter {
  readonly accountIds?: string[];
  readonly resourceTypes?: string[];
  readonly recommendationIds?: string[];
  readonly actionTypes?: string[];
  readonly implementationEfforts?: string[];
  readonly tags?: DlzCorFilterTag[];
  readonly restartNeeded?: boolean;
  readonly rollbackPossible?: boolean;
}

export interface DlzCorConfig {
  /** `false` dedupes to highest-savings recommendation per resource. */
  readonly includeAllRecommendations?: boolean;
  /** Serialized to JSON and embedded under `TableConfigurations.FILTER`. */
  readonly filter?: DlzCorFilter;
  readonly queryStatement?: string;
  readonly queryColumns?: string[];
}

export interface DlzCarbonEmissionsConfig {
  readonly queryStatement?: string;
  readonly queryColumns?: string[];
}

interface DlzDataExportEntryBase {
  readonly exportName?: string;
  readonly destinationPrefix?: string;
  readonly glueTableName?: string;
  readonly output?: DlzDataExportOutputConfig;
  readonly overwriteBehavior?: 'OVERWRITE_REPORT' | 'CREATE_NEW_REPORT';
}

export interface DlzStandardCur20Export extends DlzDataExportEntryBase {
  readonly exportType: 'STANDARD_CUR_2_0';
  readonly config?: DlzStandardCur20Config;
}

export interface DlzFocus12Export extends DlzDataExportEntryBase {
  readonly exportType: 'FOCUS_1_2';
  readonly config?: DlzFocus12Config;
}

export interface DlzCorExport extends DlzDataExportEntryBase {
  readonly exportType: 'COST_OPTIMIZATION_RECOMMENDATIONS';
  readonly config?: DlzCorConfig;
}

export interface DlzCarbonEmissionsExport extends DlzDataExportEntryBase {
  readonly exportType: 'CARBON_EMISSIONS';
  readonly config?: DlzCarbonEmissionsConfig;
}

export type DlzDataExportEntry =
  | DlzStandardCur20Export
  | DlzFocus12Export
  | DlzCorExport
  | DlzCarbonEmissionsExport;

export type DlzDataExportType = DlzDataExportEntry['exportType'];

export interface DlzDataExportsAthenaConfig {
  readonly enabled?: boolean;
  readonly workgroupName?: string;
  readonly resultsBucketNamePrefix?: string;
  readonly resultsExpirationDays?: number;
  readonly bytesScannedCutoffPerQuery?: number;
  readonly engineVersion?: 2 | 3;
  readonly publishCloudWatchMetrics?: boolean;
  /**
   * Cascade-delete named queries when the workgroup is deleted (including
   * the Replace triggered by a workgroup-name change). Default is `true` so
   * renames stay hands-off. Set `false` only if you save important queries
   * directly in this workgroup and want to be forced to export them
   * manually before a rename.
   */
  readonly recursiveDeleteOption?: boolean;
}

export interface DlzDataExportsDataPlaneConfig {
  readonly encryption?: DlzDataExportsBucketEncryption;
  readonly versioning?: boolean;
  readonly accessLogging?: boolean;
  readonly lifecycle?: DlzDataExportsLifecycleConfig;
  readonly glueCrawlerSchedule?: string;
  readonly glueDatabaseName?: string;
  readonly additionalReadAccountIds?: string[];
  readonly athena?: DlzDataExportsAthenaConfig;
}

export interface DlzDataExportsProps {
  readonly destinationRegion?: string;
  /** Bucket name is `{prefix}-{finOpsAccountId}-{destinationRegion}`. */
  readonly bucketNamePrefix?: string;
  /** One-shot org-wide toggle; runs once at the management-stack level. */
  readonly activateCostAllocationTags?: boolean;
  readonly dataPlaneConfig?: DlzDataExportsDataPlaneConfig;
  /**
   * Keyed map of exports. All entries land in one shared S3 bucket and one
   * shared Glue database. Resolved export names, destination paths, and Glue
   * table names must each be unique within the map.
   */
  readonly exports: { readonly [id: string]: DlzDataExportEntry };
}

export const DLZ_DATA_EXPORTS_DEFAULTS = {
  bucketNamePrefix: 'dlz-finops',
  destinationRegion: 'us-east-1',
  exportRegion: 'us-east-1' as const,
  glueDatabaseName: 'dlz_finops',
  glueTablePrefix: 'finops_',
  glueCrawlerSchedule: 'cron(0 6 * * ? *)',
  destinationPrefix: '',
  output: { format: 'PARQUET' as const, compression: 'PARQUET' as const },
  overwriteBehavior: 'OVERWRITE_REPORT' as const,
  lifecycle: {
    transitionToInfrequentAccessDays: 90,
    transitionToGlacierDays: 365,
    expirationDays: 2555,
    minExpirationDays: 395,
  },
  athena: {
    enabled: true,
    workgroupName: 'dlz-finops',
    resultsBucketNamePrefix: 'dlz-finops-athena-results',
    resultsExpirationDays: 30,
    engineVersion: 3 as const,
    publishCloudWatchMetrics: true,
    recursiveDeleteOption: true,
  },
};

// BCM rejects `SELECT *`; column lists are required.

export const DLZ_CUR_DEFAULT_QUERY_COLUMNS_STANDARD = [
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

export const DLZ_CUR_OPTIONAL_QUERY_COLUMNS_STANDARD = {
  capacityReservationData: [
    'capacity_reservation_capacity_reservation_arn',
    'capacity_reservation_capacity_reservation_status',
    'capacity_reservation_capacity_reservation_type',
  ],
  iamPrincipalData: [
    'line_item_iam_principal',
  ],
};

// Verified against https://docs.aws.amazon.com/cur/latest/userguide/table-dictionary-focus-1-2-aws-columns.html
export const DLZ_FOCUS_1_2_DEFAULT_QUERY_COLUMNS = [
  'AvailabilityZone',
  'BilledCost',
  'BillingAccountId',
  'BillingAccountName',
  'BillingAccountType',
  'BillingCurrency',
  'BillingPeriodEnd',
  'BillingPeriodStart',
  'CapacityReservationId',
  'CapacityReservationStatus',
  'ChargeCategory',
  'ChargeClass',
  'ChargeDescription',
  'ChargeFrequency',
  'ChargePeriodEnd',
  'ChargePeriodStart',
  'CommitmentDiscountCategory',
  'CommitmentDiscountId',
  'CommitmentDiscountName',
  'CommitmentDiscountQuantity',
  'CommitmentDiscountStatus',
  'CommitmentDiscountType',
  'CommitmentDiscountUnit',
  'ConsumedQuantity',
  'ConsumedUnit',
  'ContractedCost',
  'ContractedUnitPrice',
  'EffectiveCost',
  'InvoiceId',
  'InvoiceIssuerName',
  'ListCost',
  'ListUnitPrice',
  'PricingCategory',
  'PricingCurrency',
  'PricingCurrencyContractedUnitPrice',
  'PricingCurrencyEffectiveCost',
  'PricingCurrencyListUnitPrice',
  'PricingQuantity',
  'PricingUnit',
  'ProviderName',
  'PublisherName',
  'RegionId',
  'RegionName',
  'ResourceId',
  'ResourceName',
  'ResourceType',
  'ServiceCategory',
  'ServiceName',
  'ServiceSubcategory',
  'SkuId',
  'SkuMeter',
  'SkuPriceDetails',
  'SkuPriceId',
  'SubAccountId',
  'SubAccountName',
  'SubAccountType',
  'Tags',
  'x_Discounts',
  'x_Operation',
  'x_ServiceCode',
];

// Verified against https://docs.aws.amazon.com/cur/latest/userguide/table-dictionary-cor-columns.html
export const DLZ_COR_DEFAULT_QUERY_COLUMNS = [
  'account_id',
  'account_name',
  'action_type',
  'currency_code',
  'current_resource_details',
  'current_resource_summary',
  'current_resource_type',
  'estimated_monthly_cost_after_discount',
  'estimated_monthly_cost_before_discount',
  'estimated_monthly_savings_after_discount',
  'estimated_monthly_savings_before_discount',
  'estimated_savings_percentage_after_discount',
  'estimated_savings_percentage_before_discount',
  'implementation_effort',
  'last_refresh_timestamp',
  'recommendation_id',
  'recommendation_lookback_period_in_days',
  'recommendation_source',
  'recommended_resource_details',
  'recommended_resource_summary',
  'recommended_resource_type',
  'region',
  'resource_arn',
  'restart_needed',
  'rollback_possible',
  'tags',
];

// Verified against https://docs.aws.amazon.com/cur/latest/userguide/carbon-emissions-columns.html
export const DLZ_CARBON_EMISSIONS_DEFAULT_QUERY_COLUMNS = [
  'last_refresh_timestamp',
  'location',
  'model_version',
  'payer_account_id',
  'product_code',
  'region_code',
  'total_lbm_emissions_unit',
  'total_lbm_emissions_value',
  'total_mbm_emissions_unit',
  'total_mbm_emissions_value',
  'total_scope_1_emissions_unit',
  'total_scope_1_emissions_value',
  'total_scope_2_lbm_emissions_unit',
  'total_scope_2_lbm_emissions_value',
  'total_scope_2_mbm_emissions_unit',
  'total_scope_2_mbm_emissions_value',
  'total_scope_3_lbm_emissions_unit',
  'total_scope_3_lbm_emissions_value',
  'total_scope_3_mbm_emissions_unit',
  'total_scope_3_mbm_emissions_value',
  'usage_account_id',
  'usage_period_end',
  'usage_period_start',
];

export function deriveDefaultExportName(id: string): string {
  return `dlz-${id.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase()}`;
}

export function deriveDefaultGlueTableName(id: string): string {
  return `${DLZ_DATA_EXPORTS_DEFAULTS.glueTablePrefix}${id.replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase()}`;
}
