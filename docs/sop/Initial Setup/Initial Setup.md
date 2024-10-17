# Initial Setup

## Create Control Tower

1. Create a new root AWS account by following <https://portal.aws.amazon.com/billing/signup>
   - Be sure to use an email address that is not already associated with an AWS account and that you can access.
   - Store the username and password in a secure place.
   - You will have to link a Credit card to the account.
1. Log into the account and navigate to Control Tower (CT)
1. Make a choice on what you want your "Global" region to be. This is the region where you CT will be deployed. It is
    recommended to use one of the main regions that have support for most of the services. The `eu-west-1` or `us-east-1` regions are usually good choices.
1. TODO: Explain more of the steps involved here, think need to manually click on the "Enable IAM Identity Center" button.
1. Create the Organization OUs by following the steps in [Create Organization OUs](../Create%20Organization%20OUs/Create%20Organization%20OUs.md)
1. Create two AWS accounts by following the steps in [Create an AWS Account](../Create%20an%20AWS%20Account/Create%20an%20AWS%20Account.md)
   1. Create a `Develop` account
   1. Create a `Production` account

## (OPTIONALLY) Configure Slack in the Management and Audit Account

If you specify notifications to be delivered to a Slack channel, a once-off setup is required to configure the Slack and
AWS integration before specifying Slack channel details in the CDK.

1. Log into the Management account and go to the AWS Chatbot service. Enable slack integration and follow the
   instructions to link the AWS Chatbot to your Slack workspace.
1. Repeat for the Audit account.

## Configure the CDK

> [!WARNING]
> OUTDATED

1. Create a new CDK project and fill in account numbers and other relevant information. Ensure that the regions that you specify in the config aligns with what is CT. Ex:

   ```ts
    export const config: DataLandingZoneProps = {
      localProfile: "ct-sandbox-exported",
      accounts: {
        management: {
          accountId: '11111111',
        },
        log: {
          accountId: '2222222',
        },
        audit: {
          accountId: '3333333',
        },
        develop: {
          accountId: '4444444',
        },
        production: {
          accountId: '5555555',
        },
      },
      regions: {
        global: Region.EU_WEST_1,
        regional: [Region.US_EAST_1],
      }
    };
   ```
