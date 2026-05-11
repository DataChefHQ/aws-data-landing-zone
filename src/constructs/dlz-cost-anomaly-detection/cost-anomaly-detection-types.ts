import { BudgetSubscribers } from '../dlz-budget';

export type DlzAnomalyMonitorDimension = 'SERVICE' | 'LINKED_ACCOUNT';

export interface DlzAnomalyMonitorProps {
  readonly name: string;

  /** Mutually exclusive with `tagKey`. @default 'SERVICE' */
  readonly dimension?: DlzAnomalyMonitorDimension;

  /** Cost-allocation tag key to scope the monitor to. Mutually exclusive with `dimension`. */
  readonly tagKey?: string;

  /** Notification threshold in USD. */
  readonly thresholdUsd: number;

  /** `IMMEDIATE` requires SNS; `DAILY`/`WEEKLY` are summaries. @default 'IMMEDIATE' */
  readonly frequency?: 'DAILY' | 'IMMEDIATE' | 'WEEKLY';

  /** Reuses BudgetSubscribers so SNS topics can consolidate with budget alerts. */
  readonly subscribers: BudgetSubscribers;
}

export interface DlzCostAnomalyDetectionProps {
  readonly monitors: DlzAnomalyMonitorProps[];
}
