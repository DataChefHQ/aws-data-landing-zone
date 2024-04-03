# Tag Strategy

**Status:** accepted

**Deciders:** Rehan van der Merwe

**Last updated:** 2024-04-03

## Context

We need to ensure that *all resources have mandatory tags applied to them. This is to ensure that we can track the 
cost of resources and who created them. 

## Decision

We define mandatory tags which can be seen in `Defaults.mandatoryTags()` which are:
- `Owner`, the team responsible for the resource
- `Project`, the project the resource is part of
- `Environment`, the environment the resource is part of

Similarly to the SCPs, we apply them to an Account level to allow for easy customization in the future if needed. For 
now all accounts have the same mandatory tags.

The following AWS services are used to ensure tagging:
1. A tag policy on the account for the above keys.
2. An SCP on the account that all CFN Stacks must have these tags when created.
3. An AWS Config rule that checks for these tags on all resources the rule supports. It does not support all resources
   but the important ones like `AWS::CloudFormation::Stack` will apply its own tags to the resources it creates.
   See the config rule [required-tags](https://docs.aws.amazon.com/config/latest/developerguide/required-tags.html) for more info.

For all stacks created by DLZ construct we tag it as follows:
- `Owner`: infra
- `Project`: dlz
- `Environment`: dlz

## Consequences

Not everything is tagged. We can not add Tags to the StackSets that Control Tower uses to deploy stacks.
These resources and stacks must be marked as Resolved in SecurityHub and ignored for now until we find away around this. 

We are not enforcing Tags. It is possible to enforce tags using the SCP but we would have to list all resources and 
this will use valuable characters in the SCP. We thus only check for the tags on the creation of CFN Stacks. It is more 
difficult to do when updating stacks and that can be done in the future.

