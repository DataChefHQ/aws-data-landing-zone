import * as iam from 'aws-cdk-lib/aws-iam';
import { DataLandingZoneProps } from '../src/data-landing-zone-types';
import { PropsOrDefaults } from '../src/defaults';

const baseProps: Pick<DataLandingZoneProps, 'mandatoryTags'> = {
  mandatoryTags: {
    owner: undefined,
    project: undefined,
    environment: undefined,
    costCenter: undefined,
    domain: undefined,
  },
};

const propsWith = (extra: Partial<DataLandingZoneProps>): DataLandingZoneProps =>
  ({ ...baseProps, ...extra } as DataLandingZoneProps);

const findStatement = (statements: iam.PolicyStatement[], sid: string) =>
  statements.find(s => s.toJSON().Sid === sid);

describe('PropsOrDefaults.getScpBaseline', () => {
  test('default path: only the mandatory-tags statement is emitted', () => {
    const result = PropsOrDefaults.getScpBaseline(propsWith({}));

    expect(result).toHaveLength(1);
    expect(findStatement(result, 'DenyCfnStacksWithoutStandardTags')).toBeDefined();
  });

  test('scpBaselineStatements override: caller statements come first, mandatory tags appended', () => {
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
    expect(findStatement(result, 'DenyCfnStacksWithoutStandardTags')).toBeDefined();
  });

  test('scpBaselineStatements: [] is allowed; only the mandatory-tags statement is emitted', () => {
    const result = PropsOrDefaults.getScpBaseline(propsWith({ scpBaselineStatements: [] }));

    expect(result).toHaveLength(1);
    expect(findStatement(result, 'DenyCfnStacksWithoutStandardTags')).toBeDefined();
  });
});
