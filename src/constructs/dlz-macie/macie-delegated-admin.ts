import * as fs from 'fs';
import * as path from 'path';
import { CustomResource, CustomResourceProvider, CustomResourceProviderRuntime, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { IReportResource, ReportResource, ReportType } from '../../lib';


export interface MacieDelegatedAdminProps {
  /**
   * The management account ID. Used to scope IAM policy resources.
   */
  readonly managementAccountId: string;
  /**
   * The account ID to designate as the Macie delegated administrator.
   */
  readonly auditAccountId: string;
}


/**
 * Designates an account as the Macie delegated administrator for the organization.
 * Enables AWS service access for Macie in AWS Organizations and registers the
 * specified account as the delegated administrator.
 *
 * Must be deployed in the management account.
 */
export class MacieDelegatedAdmin extends Construct implements IReportResource {

  public static fetchCodeDirectory(): string {
    const dir = path.join(__dirname, 'lambda', 'macie-delegated-admin');
    if (fs.existsSync(path.join(dir, 'index.js'))) {
      return dir;
    }
    // During development/testing, __dirname points to src/ where only .ts exists.
    // Fall back to the bundled assets directory created by esbuild during pre-compile.
    return path.join(__dirname, '..', '..', '..', 'assets', 'constructs', 'dlz-macie', 'lambda', 'macie-delegated-admin');
  }

  readonly reportResource: ReportResource;

  constructor(scope: Construct, id: string, props: MacieDelegatedAdminProps) {
    super(scope, id);
    const customResourceProvider = CustomResourceProvider.getOrCreateProvider(this,
      'Custom::DlzMacieDelegatedAdmin',
      {
        useCfnResponseWrapper: true,
        codeDirectory: MacieDelegatedAdmin.fetchCodeDirectory(),
        runtime: CustomResourceProviderRuntime.NODEJS_22_X,
        timeout: Duration.seconds(60),
        policyStatements: [
          {
            Effect: 'Allow',
            Action: [
              'organizations:EnableAWSServiceAccess',
              'organizations:DisableAWSServiceAccess',
              'organizations:RegisterDelegatedAdministrator',
              'organizations:ListDelegatedAdministrators',
              'organizations:ListAWSServiceAccessForOrganization',
              'organizations:DescribeOrganizationalUnit',
              'organizations:DescribeAccount',
              'organizations:DescribeOrganization',
              'organizations:ListAccounts',
              'macie2:EnableMacie',
              'macie2:EnableOrganizationAdminAccount',
              'macie2:DisableOrganizationAdminAccount',
              'macie2:ListOrganizationAdminAccounts',
            ],
            Resource: '*',
          },
          {
            Effect: 'Allow',
            Action: 'iam:CreateServiceLinkedRole',
            Resource: `arn:aws:iam::${props.managementAccountId}:role/aws-service-role/macie.amazonaws.com/AWSServiceRoleForAmazonMacie`,
            Condition: {
              StringLike: {
                'iam:AWSServiceName': 'macie.amazonaws.com',
              },
            },
          },
        ],
      },
    );

    new CustomResource(this, 'CustomResource', {
      serviceToken: customResourceProvider.serviceToken,
      properties: {
        physicalResourceId: id,
        auditAccountId: props.auditAccountId,
      },
    });

    this.reportResource = {
      type: ReportType.MACIE_DELEGATED_ADMIN,
      name: ReportType.MACIE_DELEGATED_ADMIN,
      description: `Delegated to ${props.auditAccountId}`,
      externalLink: '',
    };
  }
}
