import * as fs from 'fs';
import * as path from 'path';
import { CustomResource, CustomResourceProvider, CustomResourceProviderRuntime, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { IReportResource, ReportResource, ReportType } from '../../lib';


/**
 * Account details for Macie enrollment.
 */
export interface MacieEnrollAccount {
  readonly accountId: string;
  readonly email: string;
}

export interface MacieMembersProps {
  /**
   * Accounts to explicitly enroll in Macie via CreateMember.
   * Used when existing accounts need explicit enrollment.
   */
  readonly enrollAccounts?: MacieEnrollAccount[];

  /**
   * Account IDs to disenroll from Macie via DisassociateMember + DeleteMember.
   */
  readonly disenrollAccountIds?: string[];
}


/**
 * Manages Macie member account enrollment from the delegated admin account.
 * Enrolls and disenrolls member accounts as needed.
 *
 * Must be deployed in the delegated admin (audit) account.
 */
export class MacieMembers extends Construct implements IReportResource {

  public static fetchCodeDirectory(): string {
    const dir = path.join(__dirname, 'lambda', 'macie-members');
    if (fs.existsSync(path.join(dir, 'index.js'))) {
      return dir;
    }
    return path.join(__dirname, '..', '..', '..', 'assets', 'constructs', 'dlz-macie', 'lambda', 'macie-members');
  }

  readonly reportResource: ReportResource;

  constructor(scope: Construct, id: string, props: MacieMembersProps) {
    super(scope, id);

    const customResourceProvider = CustomResourceProvider.getOrCreateProvider(this,
      'Custom::DlzMacieMembers',
      {
        useCfnResponseWrapper: true,
        codeDirectory: MacieMembers.fetchCodeDirectory(),
        runtime: CustomResourceProviderRuntime.NODEJS_22_X,
        timeout: Duration.seconds(120),
        policyStatements: [{
          Effect: 'Allow',
          Action: [
            'macie2:CreateMember',
            'macie2:DeleteMember',
            'macie2:DisassociateMember',
            'macie2:GetMember',
            'macie2:ListMembers',
          ],
          Resource: '*',
        }],
      },
    );

    const crProperties: Record<string, string> = {
      physicalResourceId: id,
    };
    if (props.enrollAccounts && props.enrollAccounts.length > 0) {
      crProperties.enrollAccounts = JSON.stringify(props.enrollAccounts);
    }
    if (props.disenrollAccountIds && props.disenrollAccountIds.length > 0) {
      crProperties.disenrollAccountIds = JSON.stringify(props.disenrollAccountIds);
    }

    new CustomResource(this, 'CustomResource', {
      serviceToken: customResourceProvider.serviceToken,
      properties: crProperties,
    });

    const enrollCount = props.enrollAccounts?.length ?? 0;
    const disenrollCount = props.disenrollAccountIds?.length ?? 0;
    const parts: string[] = [];
    if (enrollCount > 0) {
      parts.push(`${enrollCount} enrolled`);
    }
    if (disenrollCount > 0) {
      parts.push(`${disenrollCount} disenrolled`);
    }
    this.reportResource = {
      type: ReportType.MACIE,
      name: 'Macie Members',
      description: parts.join(', '),
      externalLink: '',
    };
  }
}
