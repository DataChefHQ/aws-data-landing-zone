# Cross stack, region and account references

**Status:** accepted

**Deciders:** Rehan van der Merwe

**Last updated:** 2024-10-01

## Context

We have multiple stacks that need to reference resources in other stacks, regions and accounts. For example, 
a VPC ID is required from a VPC in the Regional stack. The Network Connection Phase 1 (NCP1) stack that is in the same 
account and region requires the VPC ID from the Regional stack. 

If we pass it using CDK/TS code, a Stack Export will
be created. But this creates tight coupling between the stacks, such that if you remove the usage of the VPC ID in the
NCP1 stack, the Regional stack will try to remove the Stack Export, but it can not, because it is still being used in the
NCP1 stack.

There are many ways around it, like first deploying the NCP1 stack and then the Regional stack, but we don't want the 
user to have to worry and manually resolve this cyclic dependency issue.

## Decision

We decided to use SSM Parameters everywhere, even within the same Account and Region to prevent any cyclic dependency
issues. 

A new AWS Custom Resource will be used to get an SSM Parameter from any Account and Region. It works by assuming the role in
the account and region the SSM Parameter is, then it gets the SSM Parameter and returns it to the stack that requested
it. This method is used over the Resource Access Manager (RAM) because we don't need to jump through hoops to accept 
invitations.

So in order to fetch an SSM Parameter, you would need the:
- Account ID and Region it is in, these will be used to assume a role, that has the same name in every account and region.
- The SSM Parameter name.

The `DlzSsmReader` construct can be seen in `/src/constructs/dlz-ssm-reader/dlz-ssm-reader.ts`.

## Consequences

The only complexity is to deploy the role that needs to be used by this custom resource. That is easily overcome by
deploying the role in the Global stack of each account, since IAM is global. The `DlzSsmReader` construct can only be
used after the Global or Regional stacks are deployed. 
