import { DefaultStackSynthesizer, Stack } from 'aws-cdk-lib';
import * as lf from 'aws-cdk-lib/aws-lakeformation';
import { Construct } from 'constructs';
import { DlzLakeFormationSetupProps } from './interfaces';

export class DlzLakeFormationSetup extends Construct {
  public dataLakeSettings: lf.CfnDataLakeSettings;

  constructor(private scope: Construct, private id: string, private props: DlzLakeFormationSetupProps) {
    super(scope, id);
    // NOTE: this resource MUST be a dependency of ANY OTHER lake formation stuff
    this.dataLakeSettings = this.setUpLFSettings();
  }

  private setUpLFSettings() {
    const { admins, hybridMode, crossAccountVersion } = this.props;
    const synthesizer = Stack.of(this.scope).synthesizer as DefaultStackSynthesizer;
    const cfnAdmin = synthesizer.cloudFormationExecutionRoleArn.replace('${AWS::Partition}', 'aws');
    const lfAdmins = [{ dataLakePrincipalIdentifier: cfnAdmin }];
    for (const admin of admins) {
      lfAdmins.push({ dataLakePrincipalIdentifier: admin });
    }

    const defaultPermissions = hybridMode
      ? [{ principal: { dataLakePrincipalIdentifier: 'IAM_ALLOWED_PRINCIPALS' }, permissions: ['ALL'] }]
      : [];

    return new lf.CfnDataLakeSettings(this.scope, `${this.id}-data-lake-settings`, {
      admins: lfAdmins,
      createDatabaseDefaultPermissions: defaultPermissions,
      createTableDefaultPermissions: defaultPermissions,
      parameters: { CROSS_ACCOUNT_VERSION: crossAccountVersion },
    });
  }
}