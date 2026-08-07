export type AlertOutcome =
  | 'alert_sent'
  | 'dropped_already_tagged'
  | 'dropped_aws_service'
  | 'dropped_no_event'
  | 'dropped_not_recorded'
  | 'lookup_failed';

const NAMESPACE = 'DlzTagCompliance';

/**
 * Counts every decision the formatter makes, as CloudWatch Embedded Metric Format on stdout — no
 * API call, no extra permission.
 *
 * The filters here deliberately throw findings away, so silence in the Slack channel has two very
 * different causes: everything is tagged, or the filters are wrong. These counters are the only way
 * to tell those apart.
 */
export function recordOutcome(outcome: AlertOutcome, context: Record<string, string>): void {
  console.log(JSON.stringify({
    _aws: {
      Timestamp: Date.now(),
      CloudWatchMetrics: [{
        Namespace: NAMESPACE,
        Dimensions: [[]],
        Metrics: [{ Name: outcome, Unit: 'Count' }],
      }],
    },
    [outcome]: 1,
    ...context,
  }));
}
