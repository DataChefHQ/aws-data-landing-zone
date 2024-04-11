# Multi stack deployment

**Status:** accepted

**Deciders:** Rehan van der Merwe

**Last updated:** 2024-03-26

## Context

We need to deploy stacks to multiple accounts and regions. Many times these stack resources will be the same in all 
deployed stacks, but the possibility should exist that the same stack can have different resources. A use case would
be to change the VPC CIDR in each deployed stack or use a NAT Instance instead of a NAT Gateway in a sandbox account.

## Decision

**We chose Option 2**, to use the native CDK deployment mechanism to deploy to multiple accounts and regions. 

### Option 1: Use Stack Sets

Stack Sets allow the user to deploy the same CFN stack to multiple accounts and regions. 
The downside is that the same resources and parameters will be deployed to all accounts and regions and it can not easily
be modified per account or region. The way around this is to use SSM parameters and look them up in the stack or use 
custom resource Lambda functions. This adds a fair amount of overhead and complexity, which can not be avoided.

With stack sets you can also not see a `diff` before deploying and it is also not something that is of interest if
stack sets are used as intended without any modifications per account or region. But that is not how it is used today, 
dynamic parameters/config values are used for control flow and to make the stacks more flexible. A big downside is that
these changes make StackSets non-deterministic and to make it worse it can not be reviewed with a changeset/`diff`
before deploying to ensure that the changes are safe.

The CDK also does not have good stack set support. There are some third party libraries that can be used, but all of 
them bring problems and limitations with them. 

Using stack sets within CDK essentially means we are deploying CFN that deploys CFN and that introduces more overhead 
and complexity than needed.

### Option 2: Use the native CDK deployment mechanism

CDK has built-in support for deploying to multiple accounts and regions. When bootstrapping accounts, a trust relationship can
be established with the management account to allow the CDK to deploy to every account and region within the organisation.

Within the CDK we use `.dependsOn` to ensure that the stacks are deployed in the correct order. We also leverage the 
`--concurrency` flag to deploy multiple stacks in parallel when possible. 

A big advantage is that we can see the `diff` before deploying and even have the ability to do manual approvals between
certain accounts and regions if needed. We also aim to store all config within the repo to make it deterministic and
easy to review.

## Consequences

Stack sets were created a long time ago to solve the problem of deploying the same stack to multiple accounts and regions.
It is not the best solution for our use case, as we want the flexibility to deploy the same stack with different resources
to different accounts and regions. The CDK deployment is a modern solution and better fit for our use case. 

There only downside is that we have to manage the dependencies between the stacks, but this is a one-time setup and will
not be visible to the end-user.

