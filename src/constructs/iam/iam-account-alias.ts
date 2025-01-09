import * as path from 'path';
import { CustomResource, CustomResourceProvider, CustomResourceProviderRuntime, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { IReportResource, ReportResource, ReportType } from '../../lib';


export interface IamAccountAliasProps {
  /**
   * Must be not more than 63 characters. Valid characters are a-z, 0-9, and - (hyphen).
   */
  readonly accountAlias: string;
}


/**
 * Set the IAM Account Alias
 */
export class IamAccountAlias extends Construct implements IReportResource {

  public static fetchCodeDirectory(): string {
    return path.join(__dirname, 'lambda', 'iam-account-alias');
  }

  readonly reportResource: ReportResource;

  constructor(scope: Construct, id: string, props: IamAccountAliasProps) {
    super(scope, id);
    const customResourceProvider = CustomResourceProvider.getOrCreateProvider(this,
      'Custom::DlzIamAccountAlias',
      {
        useCfnResponseWrapper: true,
        codeDirectory: IamAccountAlias.fetchCodeDirectory(),
        runtime: CustomResourceProviderRuntime.NODEJS_18_X,
        timeout: Duration.seconds(15),
        policyStatements: [{
          Effect: 'Allow',
          Action: [
            'iam:CreateAccountAlias',
            'iam:DeleteAccountAlias',
            'iam:ListAccountAliases',
          ],
          Resource: '*',
        }],
      },
    );

    new CustomResource(this, 'CustomResource', {
      serviceToken: customResourceProvider.serviceToken,
      properties: {
        physicalResourceId: id,
        accountAlias: props.accountAlias,
      },
    });

    this.reportResource = {
      type: ReportType.IAM_ACCOUNT_ALIAS,
      name: ReportType.IAM_ACCOUNT_ALIAS,
      description: props.accountAlias,
      externalLink: '',
    };
  }


}