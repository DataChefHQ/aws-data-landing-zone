import { Construct } from 'constructs';
import { DlzAccountBudgetsProps } from './account-budgets-types';
import { DLzAccount, GlobalVariablesBudgetSnsCacheRecord } from '../../data-landing-zone-types';
import { DlzBudget } from '../dlz-budget';

export * from './account-budgets-types';

/**
 * Per-account and per-cost-center budgets.
 *
 * Iterates the workload accounts and:
 *   - For each account with `monthlyBudget` set, creates a `DlzBudget` filtered to that
 *     account via the `LinkedAccount` cost filter (carried as a tag on the AWS Budget itself).
 *   - When `perCostCenterRollup` is enabled, also creates one roll-up budget per unique
 *     `CostCenter` value, summing across accounts that share the value.
 *
 * Composes the existing `DlzBudget` primitive — does not introduce a new budget shape.
 */
export class DlzAccountBudgets extends Construct {

  constructor(
    scope: Construct,
    id: string,
    props: DlzAccountBudgetsProps,
    accounts: DLzAccount[],
    budgetSnsCache: Record<string, GlobalVariablesBudgetSnsCacheRecord>,
  ) {
    super(scope, id);

    for (const account of accounts) {
      if (account.monthlyBudget === undefined) continue;
      new DlzBudget(this, `account-${account.name}`, {
        name: `dlz-account-${account.name}`,
        amount: account.monthlyBudget,
        forTags: { LinkedAccount: account.accountId },
        subscribers: props.defaultSubscribers,
      }, budgetSnsCache);
    }

    if (props.perCostCenterRollup) {
      const totalsByCostCenter = new Map<string, number>();
      for (const account of accounts) {
        if (!account.costCenter || account.monthlyBudget === undefined) continue;
        totalsByCostCenter.set(
          account.costCenter,
          (totalsByCostCenter.get(account.costCenter) ?? 0) + account.monthlyBudget,
        );
      }
      for (const [costCenter, total] of totalsByCostCenter) {
        new DlzBudget(this, `costcenter-${costCenter}`, {
          name: `dlz-costcenter-${costCenter}`,
          amount: total,
          forTags: { CostCenter: costCenter },
          subscribers: props.defaultSubscribers,
        }, budgetSnsCache);
      }
    }
  }
}
