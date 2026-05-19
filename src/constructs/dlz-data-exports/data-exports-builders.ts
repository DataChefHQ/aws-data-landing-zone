import {
  DLZ_CARBON_EMISSIONS_DEFAULT_QUERY_COLUMNS,
  DLZ_COR_DEFAULT_QUERY_COLUMNS,
  DLZ_CUR_DEFAULT_QUERY_COLUMNS_STANDARD,
  DLZ_DATA_EXPORTS_DEFAULTS,
  DLZ_CUR_OPTIONAL_QUERY_COLUMNS_STANDARD,
  DLZ_FOCUS_1_2_DEFAULT_QUERY_COLUMNS,
  DlzCorExport,
  DlzDataExportEntry,
  DlzDataExportType,
  DlzFocus12Export,
  DlzStandardCur20Export,
} from './data-exports-types';

const TABLE_NAMES: Record<DlzDataExportType, string> = {
  STANDARD_CUR_2_0: 'COST_AND_USAGE_REPORT',
  FOCUS_1_2: 'FOCUS_1_2_AWS',
  COST_OPTIMIZATION_RECOMMENDATIONS: 'COST_OPTIMIZATION_RECOMMENDATIONS',
  CARBON_EMISSIONS: 'CARBON_EMISSIONS',
};

export function tableNameFor(entry: DlzDataExportEntry): string {
  return TABLE_NAMES[entry.exportType];
}

export function buildQueryStatement(entry: DlzDataExportEntry): string {
  if (entry.config?.queryStatement) {
    return entry.config.queryStatement;
  }
  const cols = resolveColumns(entry);
  return `SELECT ${cols.join(', ')} FROM ${tableNameFor(entry)}`;
}

function resolveColumns(entry: DlzDataExportEntry): string[] {
  switch (entry.exportType) {
    case 'STANDARD_CUR_2_0':
      return resolveStandardCurColumns(entry);
    case 'FOCUS_1_2':
      return takeOrDefault(entry, DLZ_FOCUS_1_2_DEFAULT_QUERY_COLUMNS);
    case 'COST_OPTIMIZATION_RECOMMENDATIONS':
      return takeOrDefault(entry, DLZ_COR_DEFAULT_QUERY_COLUMNS);
    case 'CARBON_EMISSIONS':
      return takeOrDefault(entry, DLZ_CARBON_EMISSIONS_DEFAULT_QUERY_COLUMNS);
  }
}

function takeOrDefault(
  entry: Exclude<DlzDataExportEntry, DlzStandardCur20Export>,
  fallback: readonly string[],
): string[] {
  const cols = entry.config?.queryColumns;
  return cols && cols.length > 0 ? [...cols] : [...fallback];
}

function resolveStandardCurColumns(entry: DlzStandardCur20Export): string[] {
  const cfg = entry.config ?? {};
  const base = cfg.queryColumns?.length ? cfg.queryColumns : DLZ_CUR_DEFAULT_QUERY_COLUMNS_STANDARD;
  const cols: string[] = [...base];
  const seen = new Set(cols);
  const append = (extras: readonly string[]) => {
    for (const c of extras) {
      if (!seen.has(c)) {
        cols.push(c);
        seen.add(c);
      }
    }
  };
  if (cfg.includeCapacityReservationData === true) {
    append(DLZ_CUR_OPTIONAL_QUERY_COLUMNS_STANDARD.capacityReservationData);
  }
  if (cfg.includeIamPrincipalData === true) {
    append(DLZ_CUR_OPTIONAL_QUERY_COLUMNS_STANDARD.iamPrincipalData);
  }
  return cols;
}

export function buildTableConfigurations(entry: DlzDataExportEntry): Record<string, Record<string, string>> {
  return { [tableNameFor(entry)]: buildTableProperties(entry) };
}

function buildTableProperties(entry: DlzDataExportEntry): Record<string, string> {
  switch (entry.exportType) {
    case 'STANDARD_CUR_2_0':
      return buildStandardCurProperties(entry);
    case 'FOCUS_1_2':
      return buildFocus12Properties(entry);
    case 'COST_OPTIMIZATION_RECOMMENDATIONS':
      return buildCorProperties(entry);
    case 'CARBON_EMISSIONS':
      return {};
  }
}

function buildStandardCurProperties(entry: DlzStandardCur20Export): Record<string, string> {
  const cfg = entry.config ?? {};
  const props: Record<string, string> = {
    TIME_GRANULARITY: cfg.timeGranularity ?? 'HOURLY',
    INCLUDE_RESOURCES: boolStr(cfg.includeResources ?? true),
    INCLUDE_SPLIT_COST_ALLOCATION_DATA: boolStr(cfg.includeSplitCostAllocationData ?? true),
  };
  if (cfg.includeCapacityReservationData !== undefined) {
    props.INCLUDE_CAPACITY_RESERVATION_DATA = boolStr(cfg.includeCapacityReservationData);
  }
  if (cfg.includeIamPrincipalData !== undefined) {
    props.INCLUDE_IAM_PRINCIPAL_DATA = boolStr(cfg.includeIamPrincipalData);
  }
  if (cfg.includeManualDiscountCompatibility !== undefined) {
    props.INCLUDE_MANUAL_DISCOUNT_COMPATIBILITY = boolStr(cfg.includeManualDiscountCompatibility);
  }
  return props;
}

function buildFocus12Properties(entry: DlzFocus12Export): Record<string, string> {
  return { TIME_GRANULARITY: entry.config?.timeGranularity ?? 'DAILY' };
}

function buildCorProperties(entry: DlzCorExport): Record<string, string> {
  const cfg = entry.config ?? {};
  return {
    INCLUDE_ALL_RECOMMENDATIONS: boolStr(cfg.includeAllRecommendations ?? false),
    FILTER: cfg.filter ? JSON.stringify(cfg.filter) : '{}',
  };
}

function boolStr(v: boolean): string {
  return v ? 'TRUE' : 'FALSE';
}

export function resolveOutput(entry: DlzDataExportEntry): { format: 'PARQUET' | 'TEXT_OR_CSV'; compression: 'PARQUET' | 'GZIP' } {
  const format = entry.output?.format ?? DLZ_DATA_EXPORTS_DEFAULTS.output.format;
  const compression = entry.output?.compression ?? (format === 'PARQUET' ? 'PARQUET' : 'GZIP');
  return { format, compression };
}

export function buildDataPath(destinationPrefix: string, exportName: string): string {
  return destinationPrefix === '' ? exportName : `${destinationPrefix}/${exportName}`;
}

export function buildDescription(entry: DlzDataExportEntry): string {
  switch (entry.exportType) {
    case 'STANDARD_CUR_2_0':
      return 'DLZ Cost and Usage Report 2.0 export';
    case 'FOCUS_1_2':
      return 'DLZ FOCUS 1.2 with AWS columns export';
    case 'COST_OPTIMIZATION_RECOMMENDATIONS':
      return 'DLZ Cost Optimization Recommendations export';
    case 'CARBON_EMISSIONS':
      return 'DLZ Carbon Emissions export';
  }
}
