# SOPs

## What is a SOP?

Standard Operating Procedures (SOPs) are a set of instructions that describe all the relevant steps and activities
of a process or procedure. SOPs are essential for ensuring that processes are carried out consistently and correctly.

We use SOPs to document all ClickOps operations. Include all relevant information and use screenshots where necessary.

## Available SOPs

- [Initial Setup](./Initial%20Setup/README.md) will set up the CDK project and the Control Tower account.
- [Create Organization OUs](./Create%20Organization%20OUs/README.md) should be followed when creating the required OUs in the
  AWS Organization. This should be done before creating any accounts. We create three OUs: `Workloads`, `Suspended`,
  and `Sandbox`.
- [Create an AWS Account](./Create%20an%20AWS%20Account/README.md) should be followed when creating a new AWS account. We create two
  accounts: `Develop` and `Production` in the `Workloads` OU. This SOP can be used to create `Sandbox` accounts as well.
- [Set Cost Allocation Tags](./Set%20Cost%20Allocation%20Tags/README.md) will set the cost allocation tags in the main Organization
  account used for billing.
- [Add a new Control Tower Control](./Add%20a%20new%20Control%20Tower%20Control/README.md) will add a new control to the Control Tower
  account.
- [Bring an existing AWS Account](./Bring%20an%20existing%20AWS%20Account/README.md) will migrate an existing AWS account to the
  CDK project.
- [IAM Identity Center](./IAM%20Identity%20Center/README.md) will set up IAM Identity Center in the AWS environment.

---

## Format

We are using a basic format of a SOP, that can be seen [here](template.md). Feel free to deviate from the template but
make sure all relevant info is included.

> [!IMPORTANT]
> Do not number in order like:
>
> 1.
> 2.
> 3. But instead only use 1. for all steps. The markdown GUI will automatically number the steps for you when you view it.
>    So, just use 1. for all steps, like:
> 4.
> 5.
> 6.

---
