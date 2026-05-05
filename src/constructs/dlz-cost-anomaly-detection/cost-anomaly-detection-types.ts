import { BudgetSubscribers } from '../dlz-budget';

/**
 * Dimension to monitor for cost anomalies. `SERVICE` watches AWS service spend
 * (the broadest, lowest-noise default). `LINKED_ACCOUNT` watches per-account spend.
 */
export type DlzAnomalyMonitorDimension = 'SERVICE' | 'LINKED_ACCOUNT';

export interface DlzAnomalyMonitorProps {
  /** Monitor name (1-1024 chars). Used as the SubscriptionName too. */
  readonly name: string;

  /**
   * Dimension to monitor. Mutually exclusive with `tagKey`.
   * @default - 'SERVICE' if neither dimension nor tagKey is set
   */
  readonly dimension?: DlzAnomalyMonitorDimension;

  /**
   * Cost-allocation tag key to scope the monitor to (e.g. `CostCenter`, `Project`).
   * When set, the monitor type becomes `CUSTOM` and matches resources tagged with this key.
   * Mutually exclusive with `dimension`.
   */
  readonly tagKey?: string;

  /**
   * Notification threshold in USD. Anomalies whose total impact exceeds this value
   * trigger a subscription notification.
   */
  readonly thresholdUsd: number;

  /**
   * How often to send subscription notifications.
   * `IMMEDIATE` is only valid with the `SNS` channel; `DAILY` and `WEEKLY` are summaries.
   * @default 'IMMEDIATE'
   */
  readonly frequency?: 'DAILY' | 'IMMEDIATE' | 'WEEKLY';

  /** Notification destination. Reuses the same shape as DlzBudget so SNS topics consolidate. */
  readonly subscribers: BudgetSubscribers;
}

export interface DlzCostAnomalyDetectionProps {
  /**
   * One or more cost-anomaly monitors to provision in the management account.
   * Each monitor produces an `AWS::CE::AnomalyMonitor` plus an `AWS::CE::AnomalySubscription`.
   */
  readonly monitors: DlzAnomalyMonitorProps[];
}
