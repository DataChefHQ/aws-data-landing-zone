import * as fs from 'fs';
import * as path from 'path';
import { CustomResource, CustomResourceProvider, CustomResourceProviderRuntime, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { IReportResource, ReportResource, ReportType } from '../../lib';


export interface MacieOrgConfigProps {
  /**
   * Auto-enable Macie for new organization member accounts.
   * Maps directly to the Macie API `autoEnable` boolean.
   */
  readonly autoEnable: boolean;
}


/**
 * Configures Macie organization-level settings from the delegated admin account.
 * Enables the Macie session and configures auto-enable for new member accounts.
 *
 * Must be deployed in the delegated admin (audit) account.
 */
export class MacieOrgConfig extends Construct implements IReportResource {

  public static fetchCodeDirectory(): string {
    const dir = path.join(__dirname, 'lambda', 'macie-org-config');
    if (fs.existsSync(path.join(dir, 'index.js'))) {
      return dir;
    }
    return path.join(__dirname, '..', '..', '..', 'assets', 'constructs', 'dlz-macie', 'lambda', 'macie-org-config');
  }

  readonly reportResource: ReportResource;

  constructor(scope: Construct, id: string, props: MacieOrgConfigProps) {
    super(scope, id);

    const customResourceProvider = CustomResourceProvider.getOrCreateProvider(this,
      'Custom::DlzMacieOrgConfig',
      {
        useCfnResponseWrapper: true,
        codeDirectory: MacieOrgConfig.fetchCodeDirectory(),
        runtime: CustomResourceProviderRuntime.NODEJS_22_X,
        timeout: Duration.seconds(30),
        policyStatements: [{
          Effect: 'Allow',
          Action: [
            'macie2:EnableMacie',
            'macie2:UpdateOrganizationConfiguration',
            'macie2:DescribeOrganizationConfiguration',
          ],
          Resource: '*',
        }],
      },
    );

    new CustomResource(this, 'CustomResource', {
      serviceToken: customResourceProvider.serviceToken,
      properties: {
        physicalResourceId: id,
        autoEnable: props.autoEnable.toString(),
      },
    });

    this.reportResource = {
      type: ReportType.MACIE,
      name: 'Macie Org Config',
      description: `AutoEnable=${props.autoEnable}`,
      externalLink: '',
    };
  }
}
