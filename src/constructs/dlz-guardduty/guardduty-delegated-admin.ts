import * as fs from 'fs';
import * as path from 'path';
import { CustomResource, CustomResourceProvider, CustomResourceProviderRuntime, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { IReportResource, ReportResource, ReportType } from '../../lib';


export interface GuardDutyDelegatedAdminProps {
  /**
   * The management account ID. Used to scope IAM policy resources.
   */
  readonly managementAccountId: string;
  /**
   * The account ID to designate as the GuardDuty delegated administrator.
   */
  readonly auditAccountId: string;
}


/**
 * Designates an account as the GuardDuty delegated administrator for the organization.
 * Enables AWS service access for GuardDuty in AWS Organizations and registers the
 * specified account as the delegated administrator.
 *
 * Must be deployed in the management account.
 */
export class GuardDutyDelegatedAdmin extends Construct implements IReportResource {

  public static fetchCodeDirectory(): string {
    const dir = path.join(__dirname, 'lambda', 'guardduty-delegated-admin');
    if (fs.existsSync(path.join(dir, 'index.js'))) {
      return dir;
    }
    // During development/testing, __dirname points to src/ where only .ts exists.
    // Fall back to the bundled assets directory created by esbuild during pre-compile.
    return path.join(__dirname, '..', '..', '..', 'assets', 'constructs', 'dlz-guardduty', 'lambda', 'guardduty-delegated-admin');
  }

  readonly reportResource: ReportResource;

  constructor(scope: Construct, id: string, props: GuardDutyDelegatedAdminProps) {
    super(scope, id);
    const customResourceProvider = CustomResourceProvider.getOrCreateProvider(this,
      'Custom::DlzGuardDutyDelegatedAdmin',
      {
        useCfnResponseWrapper: true,
        codeDirectory: GuardDutyDelegatedAdmin.fetchCodeDirectory(),
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
              'guardduty:CreateDetector',
              'guardduty:ListDetectors',
              'guardduty:EnableOrganizationAdminAccount',
              'guardduty:DisableOrganizationAdminAccount',
              'guardduty:ListOrganizationAdminAccounts',
            ],
            Resource: '*',
          },
          {
            Effect: 'Allow',
            Action: 'iam:CreateServiceLinkedRole',
            Resource: `arn:aws:iam::${props.managementAccountId}:role/aws-service-role/guardduty.amazonaws.com/AWSServiceRoleForAmazonGuardDuty`,
            Condition: {
              StringLike: {
                'iam:AWSServiceName': 'guardduty.amazonaws.com',
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
      type: ReportType.GUARDDUTY_DELEGATED_ADMIN,
      name: ReportType.GUARDDUTY_DELEGATED_ADMIN,
      description: `Delegated to ${props.auditAccountId}`,
      externalLink: '',
    };
  }
}
