import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { DlzStack } from '../../constructs';
import {
  ControlTowerEnabledControl,
  IControlTowerControl,
} from '../../constructs/control-tower-control';

import { DlzStackProps } from '../../constructs';
import {DataLandingZoneProps, Ou, Region} from '../../data-landing-zone';
import { limitCfnExecutions } from '../../lib/cfn-utils';
import { Annotations } from 'aws-cdk-lib';
import {ServiceControlPolicy} from "../../constructs/organization-policies";
import {TagPolicy} from "../../constructs/organization-policies/tag-policy";
import {PropsOrDefaults} from "../../defaults";

export class ManagementStack extends DlzStack {
  public readonly topic: sns.Topic;

  constructor(scope: Construct, stackProps: DlzStackProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    this.topic = new sns.Topic(this, this.resourceName('test-topic'), {
      displayName: this.resourceName('test-topic'),
      topicName: this.resourceName('test-topic'),
    });

    this.rootControls();

    this.workloadAccountsOrgPolicies();
    this.suspendedOuPolicies();
  }

  /**
   * Control Tower Controls applied on all OUs
   */
  private rootControls() {
    const allOus = [Ou.SECURITY, Ou.WORKLOADS, Ou.SUSPENDED];
    console.assert(this.props.regions.global === Region.EU_WEST_1);

    const standardControls = ControlTowerEnabledControl.standardControls();
    const controls: IControlTowerControl[] = [
      standardControls["AWS-GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS"],
      standardControls["AWS-GR_ENCRYPTED_VOLUMES"],
      standardControls["AWS-GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK"],
      standardControls["AWS-GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED"],
      standardControls["AWS-GR_RDS_STORAGE_ENCRYPTED"],
      standardControls["AWS-GR_RESTRICTED_SSH"],
      standardControls["AWS-GR_RESTRICT_ROOT_USER"],
      standardControls["AWS-GR_RESTRICT_ROOT_USER_ACCESS_KEYS"],
      standardControls["AWS-GR_ROOT_ACCOUNT_MFA_ENABLED"],
      standardControls["AWS-GR_S3_BUCKET_PUBLIC_READ_PROHIBITED"],
      standardControls["AWS-GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED"],
      standardControls["SH.SecretsManager.3"],
    ];

    const enabledControls: Construct[] = [];
    for(const control of controls)
    {
      for (const ou of allOus)
      {
        if(ou === Ou.SECURITY && !ControlTowerEnabledControl.canBeAppliedToSecurityOU(control))
        {
          Annotations.of(this).addInfo(`Skipping control ${control.controlFriendlyName} for the Security OU, not supported.`);
          continue;
        }

        enabledControls.push(
          new ControlTowerEnabledControl(this,
            this.resourceName(control.controlFriendlyName + ou), {
              controlTowerAccountId: this.props.organization.rootAccounts.management.accountId,
              organizationId: this.props.organization.organizationId,
              controlTowerRegion: this.props.regions.global,
              appliedOu: this.props.organization.ous[ou].ouId,
              control: control,
            }).control);
      }
    }
    limitCfnExecutions(enabledControls, 10);
  }

  /**
   * Service Control Policies and Tag Policies applied at the account level to enable customization per account
   */
  workloadAccountsOrgPolicies() {
    const denyService = PropsOrDefaults.getDenyServiceList(this.props);
    const tags = PropsOrDefaults.getOrganizationTags(this.props);

    const commonStatements = [
      ServiceControlPolicy.denyServiceActionStatements(denyService),
      ServiceControlPolicy.denyCfnStacksWithoutStandardTags(tags)
    ]

    new ServiceControlPolicy(this,
      this.resourceName('scp-development-account'), {
        name: this.resourceName('scp-development-account'),
        description: 'SCP statements applied to the development account',
        targetIds: [
          this.props.organization.ous.workloads.accounts.develop.accountId,
        ],
        statements: [
          ...commonStatements
        ],
      });
    new TagPolicy(this,
      this.resourceName('tag-policy-development-account'), {
        name: this.resourceName('tag-policy-development-account'),
        description: 'Tag policy for the development account',
        targetIds: [this.props.organization.ous.workloads.accounts.develop.accountId],
        policyTags: tags
      });

    new ServiceControlPolicy(this,
      this.resourceName('scp-production-account'), {
        name: this.resourceName('scp-production-account'),
        description: 'SCP statements applied to the production account',
        targetIds: [
          this.props.organization.ous.workloads.accounts.production.accountId,
        ],
        statements: [
          ...commonStatements
        ],
      });
    new TagPolicy(this,
      this.resourceName('tag-policy-production-account'), {
        name: this.resourceName('tag-policy-production-account'),
        description: 'Tag policy for the production account',
        targetIds: [this.props.organization.ous.workloads.accounts.production.accountId],
        policyTags: tags
      });
  }

  /**
   * Service Control Policies and Tag Policies  applied at the OU level because we won't need any customizations per account
   */
  suspendedOuPolicies() {
    const tags = PropsOrDefaults.getOrganizationTags(this.props);

    new ServiceControlPolicy(this,
      this.resourceName('scp-suspended-ou'), {
        name: this.resourceName('scp-suspended-ou'),
        description: 'SCP statements applied to the suspended OU',
        targetIds: [
          this.props.organization.ous.suspended.ouId,
        ],
        statements: [
          ServiceControlPolicy.denyServiceActionStatements(["*"])
        ]
      });
    new TagPolicy(this,
      this.resourceName('tag-policy-suspended-ou'), {
        name: this.resourceName('tag-policy-suspended-ou'),
        description: 'Tag policy for the suspended OU',
        targetIds: [this.props.organization.ous.suspended.ouId],
        policyTags: tags
      });
  }
}
