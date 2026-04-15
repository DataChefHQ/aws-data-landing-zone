import * as fs from 'fs';
import * as path from 'path';
import { CustomResource, CustomResourceProvider, CustomResourceProviderRuntime, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { GuardDutyFeatureCfn } from './guardduty-types';
import { IReportResource, ReportResource, ReportType } from '../../lib';


export interface GuardDutyOrgConfigProps {
  /**
   * Auto-enable setting for new or all organization member accounts.
   */
  readonly autoEnableOrgMembers: 'ALL' | 'NEW' | 'NONE';

  /**
   * Baseline features in CFN format. Each feature's AutoEnable will be set
   * to `autoEnableOrgMembers` if ENABLED, or 'NONE' if DISABLED.
   */
  readonly features: GuardDutyFeatureCfn[];
}


/**
 * Configures GuardDuty organization-level settings from the delegated admin account.
 * Replaces the AWS::GuardDuty::OrganizationConfiguration CloudFormation resource
 * with a custom resource that calls the UpdateOrganizationConfiguration API directly.
 *
 * Must be deployed in the delegated admin (audit) account.
 */
export class GuardDutyOrgConfig extends Construct implements IReportResource {

  public static fetchCodeDirectory(): string {
    const dir = path.join(__dirname, 'lambda', 'guardduty-org-config');
    if (fs.existsSync(path.join(dir, 'index.js'))) {
      return dir;
    }
    return path.join(__dirname, '..', '..', '..', 'assets', 'constructs', 'dlz-guardduty', 'lambda', 'guardduty-org-config');
  }

  readonly reportResource: ReportResource;

  constructor(scope: Construct, id: string, props: GuardDutyOrgConfigProps) {
    super(scope, id);

    const featuresPayload = props.features.map(f => ({
      name: f.name,
      status: f.status,
      autoEnable: f.status === 'ENABLED' ? props.autoEnableOrgMembers : 'NONE',
    }));

    const customResourceProvider = CustomResourceProvider.getOrCreateProvider(this,
      'Custom::DlzGuardDutyOrgConfig',
      {
        useCfnResponseWrapper: true,
        codeDirectory: GuardDutyOrgConfig.fetchCodeDirectory(),
        runtime: CustomResourceProviderRuntime.NODEJS_22_X,
        timeout: Duration.seconds(30),
        policyStatements: [{
          Effect: 'Allow',
          Action: [
            'guardduty:UpdateDetector',
            'guardduty:UpdateOrganizationConfiguration',
            'guardduty:ListDetectors',
          ],
          Resource: '*',
        }],
      },
    );

    new CustomResource(this, 'CustomResource', {
      serviceToken: customResourceProvider.serviceToken,
      properties: {
        physicalResourceId: id,
        autoEnableOrgMembers: props.autoEnableOrgMembers,
        features: JSON.stringify(featuresPayload),
      },
    });

    const enabledFeatures = featuresPayload.filter(f => f.autoEnable !== 'NONE').map(f => f.name);
    this.reportResource = {
      type: ReportType.GUARDDUTY,
      name: 'GuardDuty Org Config',
      description: enabledFeatures.length > 0
        ? `AutoEnable=${props.autoEnableOrgMembers}, features: ${enabledFeatures.join(', ')}`
        : `AutoEnable=${props.autoEnableOrgMembers}`,
      externalLink: '',
    };
  }
}
