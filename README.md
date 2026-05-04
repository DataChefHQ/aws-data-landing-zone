# Data Landing Zone

<!-- TOC -->
* [Getting Started](#getting-started)
  * [Typescript](#typescript)
  * [Python](#python-example)
* [Key Features](#key-features)
* [Intended Audience](#intended-audience)
* [Core Principles](#core-principles)
* [Integrated AWS Services](#integrated-aws-services)
* [How it works](#how-it-works)
* [Sponsors](#sponsors)
* [Contributing](#contributing)
* [Docs](#docs)
* [Roadmap](#roadmap)
<!-- TOC -->

The **Data Landing Zone (DLZ)** is a CDK construct designed to accelerate AI and data-related projects. It provides an
opinionated Landing Zone, laying the foundation for a multi-account AWS strategy, so you can focus on delivering data
and AI solutions.

The DLZ can be deployed in existing AWS Organizations or used in greenfield projects. It supports setups ranging
from small organizations with a few accounts to large enterprises with hundreds of accounts.

See the Documentation Website: https://datalandingzone.com/ for more information. 

The CDK construct is available in both TypeScript and Python. Example GitHub repositories showing usage:
- [TypeScript Example GitHub Repo](https://github.com/DataChefHQ/aws-data-landing-zone-example-typescript)
- [Python Example GitHub Repo](https://github.com/DataChefHQ/aws-data-landing-zone-example-python)

## Getting Started

### Typescript

Install the [aws-data-landing-zone](https://www.npmjs.com/package/aws-data-landing-zone) CDK construct from NPM:

```bash
npm install aws-data-landing-zone
```

Use the construct as a stack in your CDK application. Replace the `organizationId`, `ouId`, `ous`, `accountId`, and
`regions` with your own values as per AWS Control Tower & AWS Organizations.

The example below shows a simple DLZ setup with two accounts, one for development and one for production, creating
two non-overlapping VPCs in two regions in each account.

```ts
import {App} from 'aws-cdk-lib';
import { DataLandingZone, Defaults } from 'aws-data-landing-zone';

const app = new App();
const dlz = new DataLandingZone(app, {
  ...
  regions: {
    global: Region.EU_WEST_1,
    regional: [Region.US_EAST_1],
  },
  budgets: [
    ...Defaults.budgets(100, 20, {
      slack: slackBudgetNotifications,
      emails: ['you@org.com'],
    }),
  ],
  denyServiceList: ['ecs:*'],
  // For full control over the deny-services baseline, use scpBaselineStatements
  // instead. Cannot be combined with denyServiceList. Mandatory-tags SCP is
  // always appended after these statements.
  // scpBaselineStatements: [
  //   ScpDenyRootUserActions.statement(),
  //   ScpDenyLeavingOrganization.statement(),
  // ],
  // SCP statements applied to every workload account of a given type, layered on
  // top of the org-wide baseline (deny-services + mandatory-tags SCP).
  // Merge order: baseline -> account-type -> per-account. Additive only.
  scpStatementsByAccountType: {
    development: [
      ScpDenyReservedCapacityPurchases.statement(),
      ScpDenySavingsPlanPurchases.statement(),
    ],
    production: [
      ScpDenyDisablingSecurityServices.statement(),
      ScpDenyRootUserActions.statement(),
      ScpDenyLeavingOrganization.statement(),
    ],
  },
  guardDuty: {
    autoEnableOrgMembers: 'NEW', // Can be ALL, NEW or NONE, Default is NONE
  },
  organization: {
    organizationId: 'o-0f5h921gk9',
    root: { accounts: { management: { accountId: '123456789012', }, }, },
    ous: {
      workloads: {
        ouId: 'ou-h2l0-gjr36ikn',
        accounts: [{
            name: 'development',
            accountId: '123456789012',
            type: DlzAccountType.DEVELOP,
            vpcs: [
              Defaults.vpcClassB3Private3Public(0, Region.EU_WEST_1), // CIDR 10.0.0./19
              Defaults.vpcClassB3Private3Public(1, Region.US_EAST_1), // CIDR 10.1.0./19
            ]
          },{
            name: 'production',
            accountId: '123456789012',
            type: DlzAccountType.PRODUCTION,
            guardDutyEnabled: true, // Only when we use NEW, this will enroll an old account into GuardDuty
            guardDutyFeatures: {
              eksAuditLogs: true,
              rdsLoginEvents: true,
            },
            // Per-account SCP statements layered on top of the org-wide baseline.
            // Additive only: cannot weaken the deny-services baseline or the mandatory-tags SCP.
            // Use the importable presets in `scp-presets/` for common controls,
            // or write your own iam.PolicyStatement instances.
            scpStatements: [
              ScpDenyDisablingSecurityServices.statement(),
              ScpDenyRootUserActions.statement(),
              ScpDenyActionsOutsideRegions.statement(['eu-west-1', 'us-east-1']),
            ],
            ...
          },

          ...AS MANY ACCOUNTS AS DESIRED...
          ]
      },
   },
   ...
  },
  network: {
    nats: [
      {
        name: "development-eu-west-1-internet-access",
        location: new NetworkAddress('development', Region.EU_WEST_1, 'default', 'public', 'public-1'),
        allowAccessFrom: [
          new NetworkAddress('development', Region.EU_WEST_1, 'default', 'private')
        ],
        type: {
          gateway: {
            eip: ... //Optional
          }
        }
      },
    ],
    bastionHosts: [
      {
        name: 'default',
        location: new NetworkAddress('development', Region.EU_WEST_1, 'default', 'private', 'private-1'),
        instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
      }
    ]
  }
});
```

Continue reading [Getting Started](https://datalandingzone.com/getting-started/) on the DLZ documentation site.


### Python

Install the [aws-data-landing-zone](https://pypi.org/project/aws-data-landing-zone/#description) CDK construct from PyPi:

```bash
pip install aws-data-landing-zone
```

Use the construct as a stack in your CDK application. Replace the `organizationId`, `ouId`, `ous`, `accountId`, and
`regions` with your own values as per AWS Control Tower & AWS Organizations.

The example below shows a simple DLZ setup with two accounts, one for development and one for production, creating
two non-overlapping VPCs in two regions in each account.

```python
import aws_cdk as cdk
import aws_data_landing_zone as dlz

app = cdk.App()
dlz.DataLandingZone(app,
    ...
    regions=dlz.DlzRegions(
        global_=dlz.Region.EU_WEST_1,
        regional=[dlz.Region.US_EAST_1],
    ),
    guard_duty=dlz.DlzGuardDutyProps(
        auto_enable_org_members='NEW', # Can be ALL, NEW or NONE, Default is NONE
    ),
    budgets=[
        *dlz.Defaults.budgets(
            100,
            20,
            slack=slack_budget_notifications,
            emails=["you@org.com"],
        ),
    ],
    deny_service_list=["ecs:*"],
    # For full control over the deny-services baseline, use scp_baseline_statements
    # instead. Cannot be combined with deny_service_list. Mandatory-tags SCP is
    # always appended after these statements.
    # scp_baseline_statements=[
    #     dlz.ScpDenyRootUserActions.statement(),
    #     dlz.ScpDenyLeavingOrganization.statement(),
    # ],
    # SCP statements applied to every workload account of a given type, layered on
    # top of the org-wide baseline (deny-services + mandatory-tags SCP).
    # Merge order: baseline -> account-type -> per-account. Additive only.
    scp_statements_by_account_type=dlz.ScpStatementsByAccountType(
        development=[
            dlz.ScpDenyReservedCapacityPurchases.statement(),
            dlz.ScpDenySavingsPlanPurchases.statement(),
        ],
        production=[
            dlz.ScpDenyDisablingSecurityServices.statement(),
            dlz.ScpDenyRootUserActions.statement(),
            dlz.ScpDenyLeavingOrganization.statement(),
        ],
    ),
    organization=dlz.DLzOrganization(
        organization_id='o-0f5h921gk9',
        root=dlz.RootOptions(
            accounts=dlz.OrgRootAccounts(
                management=dlz.DLzManagementAccount(account_id='123456789012'),
            ),
        ),
        ous=dlz.OrgOus(
            workloads=dlz.OrgOuWorkloads(
                ou_id='ou-h2l0-gjr36ikn',
                accounts=[
                    dlz.DLzAccount(
                        name='development',
                        account_id='123456789012',
                        type=dlz.DlzAccountType.DEVELOP,
                        vpcs: [
                            dlz.Defaults.vpc_class_b3_private3_public(0, dlz.Region.EU_WEST_1), # CIDR 10.0.0./19
                            dlz.Defaults.vpc_class_b3_private3_public(1, dlz.Region.US_EAST_1), # CIDR 10.1.0./19
                        ]
                    ),
                    dlz.DLzAccount(
                        name='production',
                        account_id='123456789012',
                        type=dlz.DlzAccountType.PRODUCTION,
                        guard_duty_enabled: True, # Only when we use NEW, this will enroll an old account into GuardDuty
                        guard_duty_features=dlz.DlzGuardDutyFeaturesProps(
                            s3_data_events=False,
                            eks_audit_logs=True,
                            ebs_malware_protection=False,
                            rds_login_events=False,
                            lambda_network_logs=False,
                            runtime_monitoring=False,
                        ),
                        # Per-account SCP statements layered on top of the org-wide baseline.
                        # Additive only: cannot weaken the deny-services baseline or the mandatory-tags SCP.
                        # Use the importable presets in `scp-presets/` for common controls,
                        # or write your own iam.PolicyStatement instances.
                        scp_statements=[
                            dlz.ScpDenyDisablingSecurityServices.statement(),
                            dlz.ScpDenyRootUserActions.statement(),
                            dlz.ScpDenyActionsOutsideRegions.statement(['eu-west-1', 'us-east-1']),
                        ],
                    ),
                ],
            ),
        )
    ),
    network={
        "nats": [
            {
                "name": "development-eu-west-1-internet-access",
                "location": NetworkAddress(
                  "development",  str(Region.EU_WEST_1), "default", "public", "public-1",
                ),
                "allow_access_from": [
                    NetworkAddress(
                        "development", str(Region.EU_WEST_1), "default", "private"
                    ),
                ],
                "type": {
                    "gateway": {
                    },
                },
            },
        ],
        "bastion_hosts": [
            {
                "name": "default",
                "location": NetworkAddress(
                    "development",  str(Region.EU_WEST_1), "default", "public", "public-1",
                ),
                "instance_type": ec2.InstanceType.of(
                    ec2.InstanceClass.T3, ec2.InstanceSize.MICRO
                ),
            }
        ]
    }
)
```

Continue reading [Getting Started](https://datalandingzone.com/getting-started/) on the DLZ documentation site.

## Key Features

Notable features of the DLZ include:

- A CDK construct that can be used in TS and Python
- Opinionated but configurable and extendable. Each stack and nested component can be extended if needed.
- Leverages AWS Control Tower. Works with existing or new AWS Control Tower setups.
- Suitable for greenfield projects or integration with existing AWS resources.
- Deployable using any build systems like GitHub, GitLab, Jenkins, or locally.
- Generates compliance reports, reporting the Control Tower Standards, SecurityHub controls, Config Rules and
  Service Control Policies enabled in each account.
- Implements an internal wave- and stage-based deployment strategy for dependency management.
- Includes helper scripts and Standard Operating Procedures (SOPs) for routine tasks.
- Accompanied by comprehensive documentation.

## Intended Audience

The DLZ handles the responsibilities and routine tasks typically managed by a Cloud Center of Excellence (CCoE) team.
It's easy enough for Data Engineers to use on their own, but flexible enough to be customized and fine-tuned by
experienced Cloud Engineers.

It's important to establish the following responsibilities to understand what is in and out of scope for the DLZ:
- **In scope** - Any CCoE responsibilities and tasks, such as account management, security, networking, compliance, etc.
- **Out of scope** - Application development, data engineering, and data science tasks.

## Core Principles

The DLZ adheres to the following principles:

1. Opinionated but configurable defaults to suit diverse needs.
2. High levels of automation with manual SOPs where needed.
3. Simplicity and ease of understanding over complexity
4. Focused scope, limited to Landing Zone responsibilities.

## Integrated AWS Services

- **AWS Organizations:** Seamless multi-account management.
- **AWS Budgets:** Track spending by tags with notifications via Slack, Teams, or email.
- **Service Control Policies (SCPs):** Manage service deny lists.
- **Tag Policies:** Enforce resource tagging for spend tracking and ownership.
- **Control Tower Controls:** Opinionated defaults for preventive, detective, and proactive standards.
- **AWS Security Hub** and **AWS Config:** Additional standards not covered by Control Tower. Notifications are
  delivered via Slack, Teams, or email
- **Network Management:**
    - Non-overlapping **VPCs** across accounts.
    - **NAT Gateways** or instances for outbound private access.
    - **VPC Peering** for cross-account/region communication.
    - **Bastion Hosts** with **AWS SSM** for secure private resource access.
    - Simplified routing configurations.
- **IAM Identity Center (SSO):**
    - User management with **AWS Identity Store** or external IDPs (e.g., Google, Active Directory).
    - Manage **Permission Sets**
    - Manage **Access Groups** to assign Users to Accounts with a given Permission Set
- **Permission Boundaries:** Prevent privilege escalation for all IAM roles and users.
- Configure **Lake Formation** for Data Lake management, including:
    - General settings, like admins, version and setting hybrid iam mode
    - Create **Tags** and specify their permissions for use within the same account and when sharing to other accounts.
    - Optionally, set **Tag Permissions** on Tags. This is usually out of scope for DLZ, but can be configured.

## Service Control Policy presets

DLZ ships a library of importable SCP presets under `src/constructs/organization-policies/scp-presets/` that you can attach to any account via `DLzAccount.scpStatements`, or to every account of a given type via `DataLandingZoneProps.scpStatementsByAccountType`. Each preset is one file, one class, one `static statement()` method.

Statements are merged additively in the order: org-wide baseline → per-account-type → per-account. Deeper tiers can add deny rules but cannot weaken broader tiers.

TypeScript:

```ts
scpStatementsByAccountType: {
  production: [
    ScpDenyDisablingSecurityServices.statement(),
    ScpDenyRootUserActions.statement(),
  ],
  development: [
    ScpDenyReservedCapacityPurchases.statement(),
  ],
}
```

Python:

```python
scp_statements_by_account_type=dlz.ScpStatementsByAccountType(
    production=[
        dlz.ScpDenyDisablingSecurityServices.statement(),
        dlz.ScpDenyRootUserActions.statement(),
    ],
    development=[
        dlz.ScpDenyReservedCapacityPurchases.statement(),
    ],
)
```

**Risk legend:**
- 🟢 Low risk — typically safe to attach as-is.
- 🟡 Medium risk — has a common gotcha; read the `@remarks` before attaching.
- 🔴 High risk — easy to break legitimate workloads; attach only after deliberate review and a break-glass plan.

**Foundation presets** (used internally by DLZ to build the org-wide baseline; importable for custom stacks):

| Preset | What it denies | Risk |
|---|---|---|
| `ScpDenyServiceActions(serviceActions)` | A caller-supplied list of service actions across all resources. Backs `DataLandingZoneProps.denyServiceList` (and the default deny-services portion of `scpBaselineStatements`). | 🟢 |
| `ScpDenyCfnStacksWithoutStandardTags(tags)` | `cloudformation:CreateStack` unless every required tag is present. Backs the mandatory-tags SCP. | 🟡 |
| `ScpDenyIamWithoutPermissionsBoundary` | Creating/modifying IAM users or roles unless the `IamPolicyPermissionBoundaryPolicy` boundary is attached (4 statements). Pairs with `iamPolicyPermissionBoundary` prop. | 🟡 |

**Opt-in CCoE presets** (attach to `DLzAccount.scpStatements` as needed):

| Preset | What it denies | Risk |
|---|---|---|
| `ScpDenyLeavingOrganization` | `organizations:LeaveOrganization` from the member account. | 🟢 |
| `ScpDenyRootCredentialsManagementInMemberAccounts` | Direct member-account root use, while permitting AWS-Organizations centralized root sessions (`aws:AssumedRoot`). | 🟢 |
| `ScpDenyBedrockProvisionedThroughput` | Creation/modification of Bedrock provisioned model throughput (committed capacity). On-demand inference still works. | 🟢 |
| `ScpDenyDedicatedInfraAndSubscriptions` | Outposts, Snowball clusters, Shield Advanced subscriptions, and ACM Private CA. | 🟢 |
| `ScpDenyRootUserActions` | All actions performed by the account root user. | 🟡 |
| `ScpDenySavingsPlanPurchases` | Creation of Savings Plans (1- or 3-year compute spend commitments). | 🟡 |
| `ScpDenyReservedCapacityPurchases` | Reserved Instance and reserved-capacity purchases across EC2/RDS/DynamoDB/ElastiCache/Redshift/OpenSearch. | 🟡 |
| `ScpDenyMarketplaceSubscriptions` | AWS Marketplace product subscriptions and agreement-approval acceptance. | 🟡 |
| `ScpDenyDomainRegistrations` | Route 53 domain registrations, **renewals**, and transfers. | 🟡 |
| `ScpDenyS3PublicAccessBypass` | Disabling or removing S3 Block Public Access at the account or bucket level. | 🟡 |
| `ScpDenyDisablingSecurityServices` | Disabling/deleting CloudTrail, AWS Config, GuardDuty, Security Hub, or Macie. Only `AWSControlTowerExecution` is exempted. | 🟡 |
| `ScpDenyS3ObjectLockAndRetention` | S3 (and S3 Object Lambda) object retention, legal-hold, governance bypass, and bucket Object Lock configuration. **Also blocks legitimate WORM/compliance use.** | 🔴 |
| `ScpDenyGlacierVaultLock` | Initiating or completing a Glacier Vault Lock policy. **Also blocks compliance immutability.** | 🔴 |
| `ScpDenyBackupVaultLock` | Enabling AWS Backup Vault Lock. **Also blocks ransomware-resistant backups.** | 🔴 |
| `ScpDenyActionsOutsideRegions(allowedRegions)` | All regional API calls outside an explicit allow-list, exempting AWS global services. **Highest blast radius — a wrong region list denies every regional API call.** | 🔴 |

> **Note on the AWS 5120-byte SCP body limit:** combining all 15 presets at once exceeds the quota by a few hundred bytes. Pick a subset; `ScpDenyActionsOutsideRegions` alone is ~1500 bytes. The merge step (`ScpMerge.validate`) catches over-budget combinations at synth time.

## How it works

The DLZ defines all accounts and resources in a single CDK construct that can be used in Typescript or Python CDK
project.

The DLZ deploys resources into specified AWS accounts. These accounts must be created manually (SOP provided) in the
workloads OU, and their Account IDs must be provided in the DLZ configuration. Each account is designated
as either `development` or `production` to enable controlled, staged deployments, including the option for manual
approvals in production environments.

The construct processes the provided configuration to create logical deployment layers for resources. Each layer
consists of a Global Wave and optionally one or more Regional Waves. This structure ensures that all `global` stacks
for the accounts are deployed before the `regional` stacks. Resources in the `global` stack are region-independent, such
as IAM roles, whereas resources like VPCs can be deployed in both `global` and `regional` stacks if configured as such.

Continue reading the [Introduction](https://datalandingzone.com/introduction/) on the Data Landing Zone documentation site.

## Sponsors
Proudly sponsored and created by [DataChef](https://datachef.co.za/)

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for more info

## Docs
Can be found at https://datalandingzone.com/

## Roadmap
Can be found in the [here](https://github.com/orgs/DataChefHQ/projects/4)
