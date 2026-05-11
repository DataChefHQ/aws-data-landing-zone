import { DataLandingZoneProps } from '../data-landing-zone-types';
import { Logger } from './logger';

/**
 * Fail fast on the pre-grouping config shape (top-level `budgets`/`accountBudgets`/
 * `costAnomalyDetection`/`cur`). These all moved under `finOps`. TS can't catch this
 * for callers using `as any` or stale generated bindings.
 */
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
  const finOpsAccountConfigured = !!props.organization.ous.sharedServices?.accounts.finOps;
  const curConfigured = !!props.finOps?.cur;

  if (curConfigured && !finOpsAccountConfigured) {
    throw new Error(
      "'finOps.cur' requires 'org.ous.sharedServices.accounts.finOps' to be configured. " +
      'Provision a FinOps account in AWS Organizations and add it under ' +
      "org.ous.sharedServices.accounts.finOps, or remove 'finOps.cur'.",
    );
  }

  if (finOpsAccountConfigured && !curConfigured) {
    Logger.log(
      "[FinOps] Info: 'org.ous.sharedServices.accounts.finOps' is configured but no FinOps " +
      'capabilities (CUR) are enabled. The account is provisioned but dormant. Configure ' +
      "'finOps.cur' to start delivering cost data.",
    );
  }

  if (curConfigured) {
    const destinationRegion = props.finOps!.cur!.destinationRegion ?? 'us-east-1';
    if (destinationRegion !== 'us-east-1') {
      Logger.log(
        `[FinOps] Warning: cur.destinationRegion='${destinationRegion}'. The CUR export is forced to us-east-1 ` +
        '(BCM Data Exports is a us-east-1-only API), but the destination bucket lives in your chosen region. ' +
        'Glue + Athena + downstream tooling must deploy in the same region as the bucket. Cross-region S3 GETs ' +
        'by consumers in other regions are not free.',
      );
    }
  }
}
