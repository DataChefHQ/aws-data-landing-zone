# SOPs

## What is a SOP?

Standard Operating Procedures (SOPs) are a set of instructions that describe all the relevant steps and activities
of a process or procedure. SOPs are essential for ensuring that processes are carried out consistently and correctly.

We use SOPs to document all ClickOps operations. Include all relevant information and use screenshots where necessary.

## Available SOPs

- [Initial Setup](initial-setup.md) should be followed when starting a greenfield project.
- [Create Organization OUs](create-organization-ous.md) should be followed when creating the required OUs in the
   AWS Organization. This should be done before creating any accounts. We create three OUs: `Workloads`, `Suspended`, 
   and `Sandbox`.
- [Create an AWS Account](create-an-aws-account.md) should be followed when creating a new AWS account. We create two 
   accounts: `Develop` and `Production` in the `Workloads` OU. This SOP can be used to create `Sandbox` accounts as well.

--- 

## Format
We are using a basic format of a SOP, that can be seen [here](template.md). Feel free to deviate from the template but
make sure all relevant info is included.

> [!IMPORTANT]
> Do not number in order like:
> 1. 
> 2. 
> 3. 
> But instead only use 1. for all steps. The markdown GUI will automatically number the steps for you when you view it.
> So, just use 1. for all steps, like: 
> 1.
> 1.
> 1. 