import * as fs from 'fs';
import * as path from 'path';
import { CustomResource, CustomResourceProvider, CustomResourceProviderRuntime, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DlzGuardDutyFeaturesProps, mapFeaturesToCfn } from './guardduty-types';
import { IReportResource, ReportResource, ReportType } from '../../lib';

/**
 * A group of accounts that share the same GuardDuty feature configuration.
 */
export interface GuardDutyMemberFeatureGroup {
  readonly accountIds: string[];
  readonly features: DlzGuardDutyFeaturesProps;
}

/**
 * Account details for GuardDuty enrollment.
 */
export interface GuardDutyEnrollAccount {
  readonly accountId: string;
  readonly email: string;
}

export interface GuardDutyMemberFeaturesProps {
  /**
   * Accounts to explicitly enroll in GuardDuty via CreateMembers.
   * Used when `autoEnableOrgMembers` is not `'ALL'` and accounts need explicit enrollment.
   */
  readonly enrollAccounts?: GuardDutyEnrollAccount[];

  /**
   * Account IDs to disenroll from GuardDuty via DisassociateMembers + DeleteMembers.
   * Used when `autoEnableOrgMembers` is `'NEW'` and accounts have `guardDutyEnabled: false`.
   */
  readonly disenrollAccountIds?: string[];

  /**
   * Groups of accounts with their desired feature configurations.
   * Accounts sharing the same feature set are batched into a single API call.
   */
  readonly memberFeatureGroups?: GuardDutyMemberFeatureGroup[];
}

/**
 * Configures GuardDuty features on specific member accounts from the delegated admin account.
 * Uses the UpdateMemberDetectors API to apply per-account feature configurations.
 *
 * Must be deployed in the delegated admin (audit) account.
 */
export class GuardDutyMemberFeatures extends Construct implements IReportResource {

  public static fetchCodeDirectory(): string {
    const dir = path.join(__dirname, 'lambda', 'guardduty-member-features');
    if (fs.existsSync(path.join(dir, 'index.js'))) {
      return dir;
    }
    return path.join(__dirname, '..', '..', '..', 'assets', 'constructs', 'dlz-guardduty', 'lambda', 'guardduty-member-features');
  }

  readonly reportResource: ReportResource;

  constructor(scope: Construct, id: string, props: GuardDutyMemberFeaturesProps) {
    super(scope, id);

    const featureGroups = props.memberFeatureGroups ?? [];
    const serializedGroups = featureGroups.map(group => ({
      accountIds: group.accountIds,
      features: mapFeaturesToCfn(group.features),
    }));

    const customResourceProvider = CustomResourceProvider.getOrCreateProvider(this,
      'Custom::DlzGuardDutyMemberFeatures',
      {
        useCfnResponseWrapper: true,
        codeDirectory: GuardDutyMemberFeatures.fetchCodeDirectory(),
        runtime: CustomResourceProviderRuntime.NODEJS_22_X,
        timeout: Duration.seconds(120),
        policyStatements: [{
          Effect: 'Allow',
          Action: [
            'guardduty:CreateMembers',
            'guardduty:DeleteMembers',
            'guardduty:DisassociateMembers',
            'guardduty:GetMembers',
            'guardduty:ListMembers',
            'guardduty:UpdateMemberDetectors',
            'guardduty:ListDetectors',
            'guardduty:GetMemberDetectors',
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
    if (serializedGroups.length > 0) {
      crProperties.memberFeatureGroups = JSON.stringify(serializedGroups);
    }

    new CustomResource(this, 'CustomResource', {
      serviceToken: customResourceProvider.serviceToken,
      properties: crProperties,
    });

    const enrollCount = props.enrollAccounts?.length ?? 0;
    const disenrollCount = props.disenrollAccountIds?.length ?? 0;
    const featureCount = featureGroups.reduce((sum, g) => sum + g.accountIds.length, 0);
    const parts: string[] = [];
    if (enrollCount > 0) {
      parts.push(`${enrollCount} enrolled`);
    }
    if (disenrollCount > 0) {
      parts.push(`${disenrollCount} disenrolled`);
    }
    if (featureCount > 0) {
      parts.push(`${featureCount} with feature overrides`);
    }
    this.reportResource = {
      type: ReportType.GUARDDUTY,
      name: 'GuardDuty Members',
      description: parts.join(', '),
      externalLink: '',
    };
  }
}
