import { validateFinOpsConfig, validateLegacyRootFinOpsProps } from '../src/lib/finops-validation';
import { Logger } from '../src/lib/logger';

const baseProps = (overrides: any = {}): any => ({
  organization: {
    ous: {
      sharedServices: undefined,
      ...overrides.ous,
    },
  },
  ...overrides,
});

const withFinOpsAccount = (overrides: any = {}) => baseProps({
  ous: {
    sharedServices: {
      accounts: {
        finOps: { accountId: '111111111111', name: 'finops', type: 'production' },
      },
    },
  },
  ...overrides,
});

describe('validateLegacyRootFinOpsProps', () => {
  test('passes when no legacy props are present', () => {
    expect(() => validateLegacyRootFinOpsProps(baseProps())).not.toThrow();
  });

  test.each([
    ['budgets', { budgets: [] }],
    ['accountBudgets', { accountBudgets: { defaultSubscribers: { emails: [] } } }],
    ['costAnomalyDetection', { costAnomalyDetection: { monitors: [] } }],
    ['cur', { cur: {} }],
  ])('throws a migration error when legacy %s is set at the root', (key, extra) => {
    expect(() => validateLegacyRootFinOpsProps(baseProps(extra))).toThrow(
      new RegExp(`moved under 'finOps': ${key}`),
    );
  });

  test('lists every legacy prop in the migration error', () => {
    expect(() =>
      validateLegacyRootFinOpsProps(baseProps({
        budgets: [],
        cur: {},
      })),
    ).toThrow(/moved under 'finOps': budgets, cur/);
  });
});

describe('validateFinOpsConfig', () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(Logger, 'log').mockImplementation(() => {});
  });
  afterEach(() => {
    logSpy.mockRestore();
  });

  test('passes silently when neither cur nor a FinOps account is configured', () => {
    expect(() => validateFinOpsConfig(baseProps())).not.toThrow();
    expect(logSpy).not.toHaveBeenCalled();
  });

  test('throws when finOps.cur is set but the FinOps account is missing', () => {
    expect(() =>
      validateFinOpsConfig(baseProps({ finOps: { cur: {} } })),
    ).toThrow(/'finOps.cur' requires 'org.ous.sharedServices.accounts.finOps'/);
  });

  test('logs an info message when the FinOps account is configured but cur is not', () => {
    validateFinOpsConfig(withFinOpsAccount());
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/dormant/));
  });

  test('passes silently when both finOps.cur and the FinOps account are configured (us-east-1)', () => {
    validateFinOpsConfig(withFinOpsAccount({ finOps: { cur: {} } }));
    expect(logSpy).not.toHaveBeenCalled();
  });

  test('warns when destinationRegion is not us-east-1', () => {
    validateFinOpsConfig(withFinOpsAccount({
      finOps: { cur: { destinationRegion: 'eu-central-1' } },
    }));
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/destinationRegion='eu-central-1'/));
  });

  test('does not warn when destinationRegion is explicitly us-east-1', () => {
    validateFinOpsConfig(withFinOpsAccount({
      finOps: { cur: { destinationRegion: 'us-east-1' } },
    }));
    expect(logSpy).not.toHaveBeenCalled();
  });
});
