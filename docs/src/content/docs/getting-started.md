---
title: Getting Started with AWS Data Landing Zone
description: Step-by-step guide to configuring and deploying the AWS Data Landing Zone
---

# Getting Started

This guide will walk you through the process of configuring and deploying the
**AWS Data Landing Zone**. The landing zone simplifies the setup of a secure,
scalable, and well-architected multi-account AWS environment. Let’s get started!

---

## Prerequisites

Before you begin, ensure you have the following tools installed and configured:

- **AWS CLI**: Installed and configured with credentials that have admin access.
- **Node.js**: Version 14 or higher.
- **AWS CDK**: Installed globally using `npm install -g aws-cdk`.
- **Git**: For cloning repositories.

---

## Step 1: Create a New CDK Project

To get started, create a new AWS CDK project:

```bash
mkdir my-data-landing-zone
cd my-data-landing-zone
cdk init app --language=typescript
```

This initializes a new CDK project with the necessary files and folder structure.

---

## Step 2: Add the DataChef AWS Data Landing Zone Package

Add the **DataChef** Data Landing Zone as a dependency to your project:

```bash
npm install @DataChefHQ/data-landing-zone
```

---

## Step 3: Configuration

Create a configuration file (`config.ts`) in the `lib` folder to define your
Data Landing Zone setup. Below is a sample configuration and explanation of
its components.

### 3.1 Basic Configuration

Set the AWS profile and regions to use:

```
ts
export const config: DataLandingZoneProps = {
  localProfile: 'ct-sandbox-exported',
  regions: {
    global: Region.EU_WEST_1,
    regional: [Region.US_EAST_1],
  },
};

```

- **`localProfile`**: AWS CLI profile for deployment.
- **`regions`**: Define global and regional AWS regions.

### 3.2 Notifications and Budgets

Configure Slack notifications and budgets:

```
ts
defaultNotification: {
  slack: {
    slackChannelConfigurationName: 'new-channel-default-notifications',
    slackWorkspaceId: 'T18TH0JEQ',
    slackChannelId: 'C07TGPMR26P',
  },
},
budgets: [
  {
    name: 'backend',
    forTags: { owner: 'backend' },
    amount: 100,
    subscribers: {
      slack: slackBudgetNotifications,
      emails: ['team@example.com'],
    },
  },
],

```

- **Slack notifications**: Alerts for budgets and other events.
- **Budgets**: Set spending limits and assign alerts.

### 3.3 Organizational Structure

Define your AWS Organization and accounts:

```
ts
organization: {
  organizationId: 'o-05ev6vk6fa',
  root: {
    accounts: {
      management: {
        accountId: '882070149987',
      },
    },
    controls: [
      ...Defaults.rootControls(),
      DlzControlTowerStandardControls.SH_SECRETS_MANAGER_3,
    ],
  },
  ous: {
    security: {
      ouId: 'ou-vh4d-lpyovlyp',
      accounts: {
        log: {
          accountId: '730335597466',
        },
        audit: {
          accountId: '851725452335',
        },
      },
    },
    workloads: {
      ouId: 'ou-vh4d-nc2zzf9z',
      accounts: [
        {
          name: 'development',
          accountId: '381491899779',
          type: DlzAccountType.DEVELOP,
          vpcs: [
            defaultVpcClasB3Private3Public(0, Region.US_EAST_1),
            defaultVpcClasB3Private3Public(1, Region.EU_WEST_1),
          ],
        },
        {
          name: 'production',
          accountId: '891377027267',
          type: DlzAccountType.PRODUCTION,
          vpcs: [
            defaultVpcClasB3Private3Public(2, Region.US_EAST_1),
            defaultVpcClasB3Private3Public(3, Region.EU_WEST_1),
          ],
        },
      ],
    },
  },
};

```

- **`organizationId`**: AWS Organization ID.
- **Accounts**: Management, security, and workload accounts.
- **VPCs**: Define networks for each account.

---

## Step 4: Add the Landing Zone to Your CDK Stack

In your `lib/my-data-landing-zone-stack.ts` file, add the Data Landing Zone construct:

```
ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DataLandingZone } from '@DataChefHQ/data-landing-zone';
import { config } from './config';

export class MyDataLandingZoneStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new DataLandingZone(this, 'MyDataLandingZone', config);
  }
}

```

---

## Step 5: Deploy the Landing Zone

### 5.1 Bootstrap the Environment

Bootstrap your environment to prepare it for CDK deployments:

```bash
cdk bootstrap aws://ACCOUNT_ID/REGION

```

### 5.2 Deploy the Stacks

Deploy the stack you created:

```bash
bash
cdk deploy

```

### 5.3 Verify Deployment

Once deployment completes, verify the resources in the AWS Management Console.

---

## Next Steps

- Explore the documentation to learn more about advanced configurations.
- Customize the stacks to meet your specific organizational needs.
- Add additional controls or policies as required.
