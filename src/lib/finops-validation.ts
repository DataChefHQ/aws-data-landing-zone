import {
  buildDataPath,
  DLZ_DATA_EXPORTS_DEFAULTS,
  DlzDataExportEntry,
  DlzDataExportsProps,
  deriveDefaultExportName,
  deriveDefaultGlueTableName,
} from '../constructs/dlz-data-exports';
import { DataLandingZoneProps } from '../data-landing-zone-types';
import { Logger } from './logger';

/** Pre-grouping props moved under `finOps`; TS can't catch this for `as any` callers. */
export function validateLegacyRootFinOpsProps(props: DataLandingZoneProps): void {
  const legacy = props as unknown as Record<string, unknown>;
  const moved: string[] = [];
  if (legacy.budgets !== undefined) moved.push('budgets');
  if (legacy.accountBudgets !== undefined) moved.push('accountBudgets');
  if (legacy.costAnomalyDetection !== undefined) moved.push('costAnomalyDetection');
  if (legacy.cur !== undefined) moved.push('cur');
  if (moved.length === 0) return;

  throw new Error(
    `[FinOps] The following props moved under 'finOps': ${moved.join(', ')}. ` +
    `Update your config: replace top-level '${moved[0]}: ...' with 'finOps: { ${moved[0]}: ... }'. ` +
    'See docs/components/finops for the new shape.',
  );
}

export function validateFinOpsConfig(props: DataLandingZoneProps): void {
  rejectLegacyCurProp(props.finOps);

  const finOpsAccountConfigured = !!props.organization.ous.sharedServices?.accounts.finOps;
  const cur = props.finOps?.dataExports;
  const curConfigured = !!cur;

  if (curConfigured && !finOpsAccountConfigured) {
    throw new Error(
      "'finOps.dataExports' requires 'org.ous.sharedServices.accounts.finOps' to be configured. " +
      'Provision a FinOps account in AWS Organizations and add it under ' +
      "org.ous.sharedServices.accounts.finOps, or remove 'finOps.dataExports'.",
    );
  }

  if (finOpsAccountConfigured && !curConfigured) {
    Logger.log(
      "[FinOps] Info: 'org.ous.sharedServices.accounts.finOps' is configured but no FinOps " +
      'capabilities (CUR) are enabled. The account is provisioned but dormant. Configure ' +
      "'finOps.dataExports' to start delivering cost data.",
    );
  }

  if (!cur) return;

  rejectLegacyFlatCurShape(cur);
  validateCurExports(cur);
  warnIfCorWithoutCohOptIn(cur);

  const destinationRegion = cur.destinationRegion ?? DLZ_DATA_EXPORTS_DEFAULTS.destinationRegion;
  if (destinationRegion !== 'us-east-1') {
    Logger.log(
      `[FinOps] Warning: dataExports.destinationRegion='${destinationRegion}'. The CUR export is forced to us-east-1 ` +
      '(BCM Data Exports is a us-east-1-only API), but the destination bucket lives in your chosen region. ' +
      'Glue + Athena + downstream tooling must deploy in the same region as the bucket. Cross-region S3 GETs ' +
      'by consumers in other regions are not free.',
    );
  }
}

function rejectLegacyFlatCurShape(cur: DlzDataExportsProps): void {
  const flat = cur as unknown as Record<string, unknown>;
  const legacyKeys = ['exportName', 'destinationPrefix', 'glueDatabaseName', 'exportConfig'];
  const found = legacyKeys.filter(k => flat[k] !== undefined);
  if (found.length > 0) {
    throw new Error(
      `[FinOps] 'finOps.dataExports' uses the legacy single-export shape (top-level ${found.map(k => `'${k}'`).join(', ')}). ` +
      "Move per-export fields under 'finOps.dataExports.exports.<id>' and tag each entry with an 'exportType' " +
      "('STANDARD_CUR_2_0' | 'FOCUS_1_2' | 'COST_OPTIMIZATION_RECOMMENDATIONS' | 'CARBON_EMISSIONS'). " +
      "Example: { cur: { exports: { standard: { exportType: 'STANDARD_CUR_2_0' } } } }.",
    );
  }
  if (flat.exports === undefined) {
    throw new Error(
      "[FinOps] 'finOps.dataExports.exports' is required and must contain at least one entry. " +
      "Add an export keyed by a stable id, e.g. { cur: { exports: { standard: { exportType: 'STANDARD_CUR_2_0' } } } }.",
    );
  }
}

function validateCurExports(cur: DlzDataExportsProps): void {
  const entries = Object.entries(cur.exports);
  if (entries.length === 0) {
    throw new Error(
      "[FinOps] 'finOps.dataExports.exports' must contain at least one entry. " +
      "Add an export keyed by a stable id, or remove 'finOps.dataExports'.",
    );
  }

  const seenExportNames = new Map<string, string>();
  const seenDataPaths = new Map<string, string>();
  const seenGlueTables = new Map<string, string>();

  for (const [entryId, entry] of entries) {
    rejectSelectStar(entryId, entry);
    rejectIncompatibleManualDiscount(entryId, entry);
    rejectMismatchedOutputPair(entryId, entry);

    const exportName = entry.exportName ?? deriveDefaultExportName(entryId);
    const destinationPrefix = entry.destinationPrefix ?? DLZ_DATA_EXPORTS_DEFAULTS.destinationPrefix;
    const glueTableName = entry.glueTableName ?? deriveDefaultGlueTableName(entryId);
    const dataPath = buildDataPath(destinationPrefix, exportName);

    const priorExportName = seenExportNames.get(exportName);
    if (priorExportName !== undefined) {
      throw new Error(
        `[FinOps] 'finOps.dataExports.exports' resolves to duplicate exportName '${exportName}' ` +
        `between '${priorExportName}' and '${entryId}'. Each export name must be unique within the bucket; ` +
        "override one entry's `exportName` to disambiguate.",
      );
    }
    seenExportNames.set(exportName, entryId);

    const priorDataPath = seenDataPaths.get(dataPath);
    if (priorDataPath !== undefined) {
      throw new Error(
        `[FinOps] 'finOps.dataExports.exports' resolves to duplicate S3 path '${dataPath}' ` +
        `between '${priorDataPath}' and '${entryId}'. Override 'destinationPrefix' on one entry to disambiguate.`,
      );
    }
    seenDataPaths.set(dataPath, entryId);

    const priorGlueTable = seenGlueTables.get(glueTableName);
    if (priorGlueTable !== undefined) {
      throw new Error(
        `[FinOps] 'finOps.dataExports.exports' resolves to duplicate Glue table name '${glueTableName}' ` +
        `between '${priorGlueTable}' and '${entryId}'. Override 'glueTableName' on one entry to disambiguate.`,
      );
    }
    seenGlueTables.set(glueTableName, entryId);
  }
}

function rejectSelectStar(entryId: string, entry: DlzDataExportEntry): void {
  const stmt = entry.config?.queryStatement;
  if (!stmt) return;
  if (/^\s*select\s+\*/i.test(stmt)) {
    throw new Error(
      `[FinOps] 'finOps.dataExports.exports.${entryId}.config.queryStatement' uses 'SELECT *', which BCM Data Exports rejects. ` +
      "Enumerate columns explicitly (use `queryColumns: [...]` for projection, or `queryStatement: 'SELECT <cols> FROM <table>'`).",
    );
  }
}

function rejectMismatchedOutputPair(entryId: string, entry: DlzDataExportEntry): void {
  const output = entry.output;
  if (!output?.format || !output?.compression) return;
  const valid =
    (output.format === 'PARQUET' && output.compression === 'PARQUET') ||
    (output.format === 'TEXT_OR_CSV' && output.compression === 'GZIP');
  if (!valid) {
    throw new Error(
      `[FinOps] 'finOps.dataExports.exports.${entryId}.output': format='${output.format}' is incompatible with compression='${output.compression}'. ` +
      'BCM Data Exports only accepts PARQUET+PARQUET or TEXT_OR_CSV+GZIP. Pick one of those pairs (or omit `compression` to default it).',
    );
  }
}

function rejectIncompatibleManualDiscount(entryId: string, entry: DlzDataExportEntry): void {
  if (entry.exportType !== 'STANDARD_CUR_2_0') return;
  const cfg = entry.config;
  if (!cfg?.includeManualDiscountCompatibility) return;
  const cols = cfg.queryColumns;
  if (!cols) return;
  // The flag removes `discount` / `discount_total_discount` from the schema.
  const forbidden = ['discount', 'discount_total_discount'];
  const offenders = cols.filter(c => forbidden.includes(c));
  if (offenders.length > 0) {
    throw new Error(
      `[FinOps] 'finOps.dataExports.exports.${entryId}': 'includeManualDiscountCompatibility=true' removes ` +
      `${offenders.map(c => `'${c}'`).join(' / ')} from the schema, but 'queryColumns' still projects them. ` +
      'Remove those columns from `queryColumns` or unset `includeManualDiscountCompatibility`.',
    );
  }
}

function rejectLegacyCurProp(finOps: unknown): void {
  if (!finOps || typeof finOps !== 'object') return;
  const f = finOps as Record<string, unknown>;
  if (f.cur === undefined) return;
  throw new Error(
    "[FinOps] 'finOps.cur' was renamed to 'finOps.dataExports' (the construct now covers " +
    'CUR 2.0, FOCUS 1.2, Cost Optimization Recommendations, and Carbon Emissions). ' +
    "Rename the prop: replace 'finOps: { cur: { ... } }' with 'finOps: { dataExports: { ... } }'.",
  );
}

function warnIfCorWithoutCohOptIn(cur: DlzDataExportsProps): void {
  const hasCor = Object.values(cur.exports).some(e => e.exportType === 'COST_OPTIMIZATION_RECOMMENDATIONS');
  if (!hasCor) return;
  Logger.log(
    "[FinOps] Reminder: 'COST_OPTIMIZATION_RECOMMENDATIONS' exports require " +
    'org-wide opt-in to both Compute Optimizer and Cost Optimization Hub ' +
    '(see docs for the CLI commands), AND a 24–48h wait for Compute Optimizer ' +
    'to complete its initial scan. Verify with ' +
    '`aws cost-optimization-hub list-recommendations` returning >0 items before ' +
    'deploying the COR export.',
  );
}
