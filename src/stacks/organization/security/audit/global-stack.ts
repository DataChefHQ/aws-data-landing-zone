import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';
import { AccountChatbots, DlzStack } from '../../../../constructs';
import { GuardDutyMemberFeatures, GuardDutyMemberFeatureGroup } from '../../../../constructs/dlz-guardduty/guardduty-member-features';
import { GuardDutyOrgConfig } from '../../../../constructs/dlz-guardduty/guardduty-org-config';
import { mapFeaturesToCfn, mergeFeatures } from '../../../../constructs/dlz-guardduty/guardduty-types';
import { MacieMembers } from '../../../../constructs/dlz-macie/macie-members';
import { MacieOrgConfig } from '../../../../constructs/dlz-macie/macie-org-config';
import { DlzStackProps } from '../../../../constructs/dlz-stack/index';

import { DataLandingZoneProps } from '../../../../data-landing-zone-types';
import { PropsOrDefaults } from '../../../../defaults';
import { ReportType } from '../../../../lib';
import { Report } from '../../../../lib/report';

export class AuditGlobalStack extends DlzStack {
  constructor(scope: Construct, stackProps: DlzStackProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    this.securityHubNotifications();

    if (this.props.guardDuty) {
      this.guardDuty();
    }

    if (this.props.macie && this.props.macie.enabled !== false) {
      this.macie();
    }
  }

  public securityHubNotifications() {
    let denyAllPolicy: iam.ManagedPolicy | undefined;
    for (const notification of this.props.securityHubNotifications) {
      const idPrefix = `sh-notification-${notification.id}`;
      const topic = new sns.Topic(this, this.resourceName(`${idPrefix}-topic`), {
        displayName: this.resourceName(`${idPrefix}-topic`),
        topicName: this.resourceName(`${idPrefix}-topic`),
      });

      const severity = notification.severity ? {
        Severity: {
          Label: notification.severity,
        },
      } : { };
      const workflowStatus = notification.workflowStatus ? {
        Workflow: {
          Status: notification.workflowStatus,
        },
      } : { };

      const securityHubRule = new events.Rule(this, this.resourceName(`${idPrefix}-rule`), {
        ruleName: this.resourceName(`${idPrefix}-rule`),
        eventPattern: {
          source: ['aws.securityhub'],
          detailType: ['Security Hub Findings - Imported'],
          detail: {
            findings: {
              RecordState: ['ACTIVE'],
              ...severity,
              ...workflowStatus,
            },
          },
        },
      });
      securityHubRule.addTarget(new targets.SnsTopic(topic));


      if (notification.notification.emails) {
        for (let emailAddress of notification.notification.emails) {
          topic.addSubscription(new subscriptions.EmailSubscription(emailAddress));
        }
      }


      if (notification.notification.slack) {
        if (!denyAllPolicy) {
          denyAllPolicy = new iam.ManagedPolicy(this, this.resourceName(`${idPrefix}-deny-all-guardrail-policies`), {
            managedPolicyName: this.resourceName(`${idPrefix}-deny-all-guardrail-policies`),
            description: 'Deny all guardrail policies',
            statements: [
              new iam.PolicyStatement({
                effect: iam.Effect.DENY,
                actions: ['*'],
                resources: ['*'],
              }),
            ],
          });
        }

        if (!AccountChatbots.existsSlackChannel(this, notification.notification.slack)) {
          const id = this.resourceName(`slack-bot-${notification.notification.slack.slackWorkspaceId}-${notification.notification.slack.slackChannelId}`);
          AccountChatbots.addSlackChannel(this, id, {
            ...notification.notification.slack,
            guardrailPolicies: [
              denyAllPolicy,
            ],
          });
        }

        const slackChannel = AccountChatbots.findSlackChannel(this, notification.notification.slack);
        slackChannel.addNotificationTopic(topic);
      }
    }

  }

  /**
   * GuardDuty detector and organization configuration in the delegated admin (audit) account.
   * Also applies per-account feature overrides for workload accounts that specify guardDutyFeatures.
   */
  private guardDuty() {
    const baselineFeatures = PropsOrDefaults.getGuardDutyFeatures(this.props);
    const autoEnableOrgMembers = this.props.guardDuty!.autoEnableOrgMembers ?? 'NONE';
    const baselineCfn = mapFeaturesToCfn(baselineFeatures);

    // Org config: imports existing detector (auto-created by delegated admin designation),
    // updates its features, and configures organization-level auto-enable settings.
    const orgConfig = new GuardDutyOrgConfig(this, this.resourceName('guardduty-org-config'), {
      autoEnableOrgMembers: autoEnableOrgMembers,
      features: baselineCfn,
    });

    const enabledFeatures = baselineCfn.filter(f => f.status === 'ENABLED').map(f => f.name);
    Report.addReportForAccountRegion(
      'audit',
      this.props.regions.global,
      {
        type: ReportType.GUARDDUTY,
        name: ReportType.GUARDDUTY,
        description: enabledFeatures.length > 0
          ? `Detector + features: ${enabledFeatures.join(', ')}`
          : 'Detector (basic monitoring only)',
        externalLink: '',
      },
    );

    // Per-account enrollment and additive feature overrides.
    // Org baseline is the floor — per-account can only ADD features (OR merge).
    // 'ALL' auto-enrolls everyone, 'NEW' requires guardDutyEnabled, 'NONE' blocks enrollment.
    const workloadAccounts = this.props.organization.ous.workloads.accounts;
    const baselineKey = JSON.stringify(baselineFeatures);

    const enrollAccounts = autoEnableOrgMembers === 'NEW'
      ? workloadAccounts.filter(a => a.guardDutyEnabled).map(a => ({
        accountId: a.accountId,
        email: a.email ?? 'noreply@example.com',
      }))
      : [];

    const disenrollAccountIds = autoEnableOrgMembers === 'NEW'
      ? workloadAccounts.filter(a => a.guardDutyEnabled === false).map(a => a.accountId)
      : [];

    // Group accounts with extra features (beyond baseline) by their merged feature set
    const featureGroupMap = new Map<string, GuardDutyMemberFeatureGroup>();
    for (const account of workloadAccounts) {
      if (!account.guardDutyFeatures) continue;
      const merged = mergeFeatures(baselineFeatures, account.guardDutyFeatures);
      const key = JSON.stringify(merged);
      if (key === baselineKey) continue;
      if (!featureGroupMap.has(key)) {
        featureGroupMap.set(key, { accountIds: [], features: merged });
      }
      featureGroupMap.get(key)!.accountIds.push(account.accountId);
    }
    const memberFeatureGroups = featureGroupMap.size > 0
      ? [...featureGroupMap.values()]
      : undefined;

    if (enrollAccounts.length > 0 || disenrollAccountIds.length > 0 || memberFeatureGroups) {
      const members = new GuardDutyMemberFeatures(this,
        this.resourceName('guardduty-member-features'), {
          enrollAccounts: enrollAccounts.length > 0 ? enrollAccounts : undefined,
          disenrollAccountIds: disenrollAccountIds.length > 0 ? disenrollAccountIds : undefined,
          memberFeatureGroups,
        });
      members.node.addDependency(orgConfig);

      Report.addReportForAccountRegion(
        'audit',
        this.props.regions.global,
        members.reportResource,
      );
    }
  }

  /**
   * Macie organization configuration and member enrollment in the delegated admin (audit) account.
   */
  private macie() {
    const macieProps = this.props.macie!;
    const autoEnable = macieProps.autoEnable ?? false;

    // Org config: enables Macie session, configures auto-enable for new members
    const orgConfig = new MacieOrgConfig(this, this.resourceName('macie-org-config'), {
      autoEnable,
    });
    Report.addReportForAccountRegion(
      'audit',
      this.props.regions.global,
      orgConfig.reportResource,
    );

    // Member enrollment: only accounts with macieEnabled === true are enrolled.
    // autoEnable controls the AWS API for new accounts joining the org,
    // but explicit enrollment of existing accounts always requires macieEnabled: true.
    // Accounts with macieEnabled === false are disenrolled.
    const workloadAccounts = this.props.organization.ous.workloads.accounts;

    const enrollAccounts = workloadAccounts
      .filter(a => a.macieEnabled === true)
      .map(a => ({ accountId: a.accountId, email: a.email ?? 'noreply@example.com' }));

    const disenrollAccountIds = workloadAccounts
      .filter(a => a.macieEnabled === false)
      .map(a => a.accountId);

    if (enrollAccounts.length > 0 || disenrollAccountIds.length > 0) {
      const members = new MacieMembers(this,
        this.resourceName('macie-members'), {
          enrollAccounts: enrollAccounts.length > 0 ? enrollAccounts : undefined,
          disenrollAccountIds: disenrollAccountIds.length > 0 ? disenrollAccountIds : undefined,
        });
      members.node.addDependency(orgConfig);

      Report.addReportForAccountRegion(
        'audit',
        this.props.regions.global,
        members.reportResource,
      );
    }
  }
}
