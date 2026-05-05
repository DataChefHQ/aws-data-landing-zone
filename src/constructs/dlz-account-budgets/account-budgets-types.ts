import { BudgetSubscribers } from '../dlz-budget';

export interface DlzAccountBudgetsProps {
  /**
   * Default subscribers for the per-account / per-cost-center budgets created by this
   * construct. Reuses `BudgetSubscribers` so the underlying SNS topic can be shared with
   * org-level budgets via the same `snsTopicName`.
   */
  readonly defaultSubscribers: BudgetSubscribers;

  /**
   * If true, also create a roll-up budget per unique `CostCenter` value across the
   * configured workload accounts. Useful for finance to track total spend by cost center
   * without having to sum per-account budgets manually.
   *
   * @default false
   */
  readonly perCostCenterRollup?: boolean;
}
