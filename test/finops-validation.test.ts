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

const minimalCur = (extra: any = {}) => ({
  exports: { standard: { exportType: 'STANDARD_CUR_2_0' } },
  ...extra,
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
      validateLegacyRootFinOpsProps(baseProps({ budgets: [], cur: {} })),
    ).toThrow(/moved under 'finOps': budgets, cur/);
  });
});

describe('validateFinOpsConfig — preconditions', () => {
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

  test('throws when finOps.dataExports is set but the FinOps account is missing', () => {
    expect(() =>
      validateFinOpsConfig(baseProps({ finOps: { dataExports: minimalCur() } })),
    ).toThrow(/'finOps.dataExports' requires 'org.ous.sharedServices.accounts.finOps'/);
  });

  test('logs an info message when the FinOps account is configured but cur is not', () => {
    validateFinOpsConfig(withFinOpsAccount());
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/dormant/));
  });

  test('passes silently when both finOps.dataExports and the FinOps account are configured (us-east-1)', () => {
    validateFinOpsConfig(withFinOpsAccount({ finOps: { dataExports: minimalCur() } }));
    expect(logSpy).not.toHaveBeenCalled();
  });

  test('warns when destinationRegion is not us-east-1', () => {
    validateFinOpsConfig(withFinOpsAccount({
      finOps: { dataExports: minimalCur({ destinationRegion: 'eu-central-1' }) },
    }));
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/destinationRegion='eu-central-1'/));
  });
});

describe('validateFinOpsConfig — legacy single-export shape', () => {
  test('rejects top-level exportName with a migration hint', () => {
    expect(() =>
      validateFinOpsConfig(withFinOpsAccount({
        finOps: { dataExports: { exportName: 'dlz-cur-2' } },
      })),
    ).toThrow(/legacy single-export shape.*exportName/);
  });

  test('rejects top-level exportConfig with a migration hint', () => {
    expect(() =>
      validateFinOpsConfig(withFinOpsAccount({
        finOps: { dataExports: { exportConfig: { timeGranularity: 'HOURLY' } } },
      })),
    ).toThrow(/legacy single-export shape.*exportConfig/);
  });

  test('rejects missing exports with a migration hint', () => {
    expect(() =>
      validateFinOpsConfig(withFinOpsAccount({ finOps: { dataExports: {} } })),
    ).toThrow(/'finOps.dataExports.exports' is required/);
  });

  test('rejects empty exports map', () => {
    expect(() =>
      validateFinOpsConfig(withFinOpsAccount({ finOps: { dataExports: { exports: {} } } })),
    ).toThrow(/must contain at least one entry/);
  });
});

describe('validateFinOpsConfig — uniqueness', () => {
  test('passes for five distinct export types under default ids', () => {
    expect(() => validateFinOpsConfig(withFinOpsAccount({
      finOps: {
        dataExports: {
          exports: {
            standard: { exportType: 'STANDARD_CUR_2_0' },
            'focus-1-0': { exportType: 'FOCUS_1_2' },
            'focus-1-2': { exportType: 'FOCUS_1_2' },
            cor: { exportType: 'COST_OPTIMIZATION_RECOMMENDATIONS' },
            carbon: { exportType: 'CARBON_EMISSIONS' },
          },
        },
      },
    }))).not.toThrow();
  });

  test('throws when two entries resolve to the same exportName', () => {
    expect(() => validateFinOpsConfig(withFinOpsAccount({
      finOps: {
        dataExports: {
          exports: {
            a: { exportType: 'STANDARD_CUR_2_0', exportName: 'team-cur' },
            b: { exportType: 'FOCUS_1_2', exportName: 'team-cur' },
          },
        },
      },
    }))).toThrow(/duplicate exportName 'team-cur'/);
  });

  test('throws when two entries resolve to the same S3 path', () => {
    expect(() => validateFinOpsConfig(withFinOpsAccount({
      finOps: {
        dataExports: {
          exports: {
            a: { exportType: 'STANDARD_CUR_2_0', destinationPrefix: 'reports', exportName: 'shared' },
            b: { exportType: 'FOCUS_1_2', destinationPrefix: 'reports', exportName: 'shared' },
          },
        },
      },
    }))).toThrow(/duplicate exportName 'shared'/);
  });

  test('throws when two entries resolve to the same Glue table name', () => {
    expect(() => validateFinOpsConfig(withFinOpsAccount({
      finOps: {
        dataExports: {
          exports: {
            a: { exportType: 'STANDARD_CUR_2_0', glueTableName: 'cur_shared' },
            b: { exportType: 'FOCUS_1_2', glueTableName: 'cur_shared' },
          },
        },
      },
    }))).toThrow(/duplicate Glue table name 'cur_shared'/);
  });
});

describe('validateFinOpsConfig — queryStatement safety', () => {
  test('rejects SELECT * in queryStatement', () => {
    expect(() => validateFinOpsConfig(withFinOpsAccount({
      finOps: {
        dataExports: {
          exports: {
            standard: {
              exportType: 'STANDARD_CUR_2_0',
              config: { queryStatement: 'SELECT * FROM COST_AND_USAGE_REPORT' },
            },
          },
        },
      },
    }))).toThrow(/uses 'SELECT \*', which BCM Data Exports rejects/);
  });

  test('rejects SELECT * with leading whitespace + mixed case', () => {
    expect(() => validateFinOpsConfig(withFinOpsAccount({
      finOps: {
        dataExports: {
          exports: {
            focus: {
              exportType: 'FOCUS_1_2',
              config: { queryStatement: '  select * from FOCUS_1_2_AWS' },
            },
          },
        },
      },
    }))).toThrow(/SELECT \*/);
  });

  test('allows an explicit column projection', () => {
    expect(() => validateFinOpsConfig(withFinOpsAccount({
      finOps: {
        dataExports: {
          exports: {
            standard: {
              exportType: 'STANDARD_CUR_2_0',
              config: { queryStatement: 'SELECT line_item_unblended_cost FROM COST_AND_USAGE_REPORT' },
            },
          },
        },
      },
    }))).not.toThrow();
  });
});

describe('validateFinOpsConfig — CUR 2.0 manual-discount-compatibility', () => {
  test('rejects projecting `discount` while includeManualDiscountCompatibility=true', () => {
    expect(() => validateFinOpsConfig(withFinOpsAccount({
      finOps: {
        dataExports: {
          exports: {
            standard: {
              exportType: 'STANDARD_CUR_2_0',
              config: {
                includeManualDiscountCompatibility: true,
                queryColumns: ['bill_payer_account_id', 'discount'],
              },
            },
          },
        },
      },
    }))).toThrow(/includeManualDiscountCompatibility=true.*'discount'/);
  });

  test('allows the flag without explicit columns', () => {
    expect(() => validateFinOpsConfig(withFinOpsAccount({
      finOps: {
        dataExports: {
          exports: {
            standard: {
              exportType: 'STANDARD_CUR_2_0',
              config: { includeManualDiscountCompatibility: true },
            },
          },
        },
      },
    }))).not.toThrow();
  });
});
