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
import { DataLandingZone } from 'aws-data-landing-zone';

const app = new App();
const dlz = new DataLandingZone(app, {
  ...
  regions: {
    global: Region.EU_WEST_1,
    regional: [Region.US_EAST_1],
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
              Defaults.vpcClassB3Private3Public(0, Region.US_EAST_1),
              Defaults.vpcClassB3Private3Public(1, Region.EU_WEST_1),
            ],
          },{
            name: 'production',
            accountId: '123456789012',
            type: DlzAccountType.PRODUCTION,
            vpcs: [
              Defaults.vpcClassB3Private3Public(2, Region.US_EAST_1),
              Defaults.vpcClassB3Private3Public(3, Region.EU_WEST_1),
            ],
          },

          ...AS MANY ACCOUNTS AS DESIRED...
                
          ]
      },
   },
   ...
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
#!/usr/bin/env python3
import aws_cdk as cdk
import aws_data_landing_zone as dlz

app = cdk.App()
dlz.DataLandingZone(app,
    local_profile="ct-sandbox-exported",
    regions=dlz.DlzRegions(
        global_=dlz.Region.EU_WEST_1,
        regional=[dlz.Region.US_EAST_1],
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
                        vpcs=[
                            dlz.Defaults.vpc_class_b3_private3_public(0, dlz.Region.US_EAST_1),
                            dlz.Defaults.vpc_class_b3_private3_public(1, dlz.Region.EU_WEST_1),
                        ]
                    ),
                    dlz.DLzAccount(
                        name='production',
                        account_id='123456789012',
                        type=dlz.DlzAccountType.PRODUCTION,
                        vpcs=[
                            dlz.Defaults.vpc_class_b3_private3_public(2, dlz.Region.US_EAST_1),
                            dlz.Defaults.vpc_class_b3_private3_public(3, dlz.Region.EU_WEST_1),
                        ]
                    ),
                ],
            ),
        )
    ),
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
