# Bring an existing AWS Account

TODO: Complete list

1. Add the account under the right OU in the CDK construct.

## Networking

Each account must have non overlapping VPC CIDRs.

If the account has overlapping CIDRs with other accounts it is recommended to create a new VPC with the CDK account's vpc
properties and then migrate the resources to the new VPC. If that's not possible consider CloudFormation imports.
It's important to note that the CDK construct will remove any existing VPCs. This creates the opportunity for migrating
to the new VPC gradually or allows leaving the resources in the old VPC indefinitely.
