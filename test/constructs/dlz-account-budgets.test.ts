import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { DlzAccountBudgets } from '../../src/constructs/dlz-account-budgets';
import { DLzAccount, DlzAccountType, GlobalVariablesBudgetSnsCacheRecord } from '../../src/data-landing-zone-types';

const account = (overrides: Partial<DLzAccount> & { name: string; accountId: string }): DLzAccount => ({
  type: DlzAccountType.PRODUCTION,
  ...overrides,
});

const synth = (
  perCostCenterRollup: boolean,
  accounts: DLzAccount[],
) => {
  const app = new App();
  const stack = new Stack(app, 'TestStack', { env: { account: '111111111111', region: 'us-east-1' } });
  const cache: Record<string, GlobalVariablesBudgetSnsCacheRecord> = {};
  new DlzAccountBudgets(
    stack,
    'TestBudgets',
    {
      defaultSubscribers: { emails: ['ops@example.com'] },
      perCostCenterRollup,
    },
    accounts,
    cache,
  );
  return Template.fromStack(stack);
};

describe('DlzAccountBudgets', () => {
  test('creates a per-account budget for each account with monthlyBudget', () => {
    const t = synth(false, [
      account({ name: 'team-a', accountId: '111111111111', monthlyBudget: 100 }),
      account({ name: 'team-b', accountId: '222222222222', monthlyBudget: 250 }),
    ]);
    t.resourceCountIs('AWS::Budgets::Budget', 2);
    t.hasResourceProperties('AWS::Budgets::Budget', {
      Budget: Match.objectLike({
        BudgetName: 'dlz-account-team-a',
        BudgetLimit: { Amount: 100 },
        CostFilters: { TagKeyValue: ['user:LinkedAccount$111111111111'] },
      }),
    });
  });

  test('skips accounts without monthlyBudget', () => {
    const t = synth(false, [
      account({ name: 'team-a', accountId: '111111111111', monthlyBudget: 100 }),
      account({ name: 'team-b', accountId: '222222222222' }), // no budget
    ]);
    t.resourceCountIs('AWS::Budgets::Budget', 1);
  });

  test('does not create roll-up budgets when perCostCenterRollup=false', () => {
    const t = synth(false, [
      account({ name: 'a', accountId: '111111111111', monthlyBudget: 100, costCenter: 'finance' }),
      account({ name: 'b', accountId: '222222222222', monthlyBudget: 200, costCenter: 'finance' }),
    ]);
    t.resourceCountIs('AWS::Budgets::Budget', 2);
  });

  test('creates a roll-up budget per cost-center summing monthlyBudget across accounts', () => {
    const t = synth(true, [
      account({ name: 'a', accountId: '111111111111', monthlyBudget: 100, costCenter: 'finance' }),
      account({ name: 'b', accountId: '222222222222', monthlyBudget: 200, costCenter: 'finance' }),
      account({ name: 'c', accountId: '333333333333', monthlyBudget: 50, costCenter: 'data' }),
    ]);
    // 3 per-account budgets + 2 roll-ups (finance, data)
    t.resourceCountIs('AWS::Budgets::Budget', 5);
    t.hasResourceProperties('AWS::Budgets::Budget', {
      Budget: Match.objectLike({
        BudgetName: 'dlz-costcenter-finance',
        BudgetLimit: { Amount: 300 },
        CostFilters: { TagKeyValue: ['user:CostCenter$finance'] },
      }),
    });
    t.hasResourceProperties('AWS::Budgets::Budget', {
      Budget: Match.objectLike({
        BudgetName: 'dlz-costcenter-data',
        BudgetLimit: { Amount: 50 },
      }),
    });
  });

  test('does not create roll-up budgets for accounts missing costCenter', () => {
    const t = synth(true, [
      account({ name: 'a', accountId: '111111111111', monthlyBudget: 100 }), // no costCenter
      account({ name: 'b', accountId: '222222222222', monthlyBudget: 50, costCenter: 'data' }),
    ]);
    // 2 per-account + 1 roll-up (only data)
    t.resourceCountIs('AWS::Budgets::Budget', 3);
  });
});
