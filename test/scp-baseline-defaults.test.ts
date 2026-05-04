import * as iam from 'aws-cdk-lib/aws-iam';
import { DataLandingZoneProps } from '../src/data-landing-zone-types';
import { Defaults, PropsOrDefaults } from '../src/defaults';

const baseProps: Pick<DataLandingZoneProps, 'mandatoryTags'> = {
  mandatoryTags: {
    owner: undefined,
    project: undefined,
    environment: undefined,
  },
};

const propsWith = (extra: Partial<DataLandingZoneProps>): DataLandingZoneProps =>
  ({ ...baseProps, ...extra } as DataLandingZoneProps);

const findStatement = (statements: iam.PolicyStatement[], sid: string) =>
  statements.find(s => s.toJSON().Sid === sid);

describe('Defaults.denyServiceList', () => {
  test('default is an empty list', () => {
    expect(Defaults.denyServiceList()).toEqual([]);
  });
});

describe('PropsOrDefaults.getScpBaseline', () => {
  test('default path: only the mandatory-tags statement is emitted', () => {
    const result = PropsOrDefaults.getScpBaseline(propsWith({}));

    expect(result).toHaveLength(1);
    expect(findStatement(result, 'DenyCfnStacksWithoutStandardTags')).toBeDefined();
    expect(findStatement(result, 'DenyServiceActions')).toBeUndefined();
  });

  test('explicit denyServiceList: emits a deny-services statement plus mandatory tags', () => {
    const result = PropsOrDefaults.getScpBaseline(propsWith({ denyServiceList: ['ecs:*'] }));

    expect(result).toHaveLength(2);
    const deny = findStatement(result, 'DenyServiceActions');
    expect(deny).toBeDefined();
    // CDK collapses single-element Action arrays to a string in JSON output.
    expect(deny!.toJSON().Action).toEqual('ecs:*');
    expect(findStatement(result, 'DenyCfnStacksWithoutStandardTags')).toBeDefined();
  });

  test('explicit empty denyServiceList: only the mandatory-tags statement is emitted', () => {
    const result = PropsOrDefaults.getScpBaseline(propsWith({ denyServiceList: [] }));

    expect(result).toHaveLength(1);
    expect(findStatement(result, 'DenyServiceActions')).toBeUndefined();
    expect(findStatement(result, 'DenyCfnStacksWithoutStandardTags')).toBeDefined();
  });

  test('scpBaselineStatements override: replaces deny-services, mandatory tags still appended', () => {
    const customDeny = new iam.PolicyStatement({
      sid: 'DenyRootUser',
      effect: iam.Effect.DENY,
      actions: ['*'],
      resources: ['*'],
      conditions: { StringLike: { 'aws:PrincipalArn': ['arn:aws:iam::*:root'] } },
    });

    const result = PropsOrDefaults.getScpBaseline(
      propsWith({ scpBaselineStatements: [customDeny] }),
    );

    expect(result).toHaveLength(2);
    expect(findStatement(result, 'DenyRootUser')).toBeDefined();
    expect(findStatement(result, 'DenyServiceActions')).toBeUndefined();
    expect(findStatement(result, 'DenyCfnStacksWithoutStandardTags')).toBeDefined();
  });

  test('scpBaselineStatements: [] is allowed; only the mandatory-tags statement is emitted', () => {
    const result = PropsOrDefaults.getScpBaseline(propsWith({ scpBaselineStatements: [] }));

    expect(result).toHaveLength(1);
    expect(findStatement(result, 'DenyCfnStacksWithoutStandardTags')).toBeDefined();
  });

  test('throws when both scpBaselineStatements and denyServiceList are set', () => {
    expect(() =>
      PropsOrDefaults.getScpBaseline(
        propsWith({
          scpBaselineStatements: [],
          denyServiceList: ['ecs:*'],
        }),
      ),
    ).toThrow(/cannot set both `scpBaselineStatements` and `denyServiceList`/);
  });
});
