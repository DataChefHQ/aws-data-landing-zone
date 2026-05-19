import { BudgetSubscribers } from '../dlz-budget';

export interface DlzAccountBudgetsProps {
  /**
   * Subscribers for the per-account and per-cost-center budgets. Set `snsTopicName` to
   * share an SNS topic with org-level budgets.
   */
  readonly defaultSubscribers: BudgetSubscribers;

  /**
   * Also create a roll-up budget per unique `CostCenter` value, summing across accounts
   * that share the value.
   * @default false
   */
  readonly perCostCenterRollup?: boolean;
}
