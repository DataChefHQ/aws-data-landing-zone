# Account Level Service Control Policy

**Status:** accepted

**Deciders:** Rehan van der Merwe

**Last updated:** 2024-04-02

## Context

We need SCPs that might not be possible to enable through Control Tower. After creating an AWS Account using the 
CT AF, there are 4 SCPs applied to the account. There is a maximum of 5 SCPs that can be applied to an account. 
Which leaves us with 1 SCP that can be applied to the account. 

## Decision

We will create a single SCP that will be applied to the account or the OU but not both. 

For Workload OU accounts, the 
SCP will be applied on the account level so that we can customize the SCP content per account. For example, we might
want to be more restrictive in the production account than the development account. If we applied the SCP to the OU,
then we won't be able to apply another SCP on the production account because we are already on the 5 SCPs per account. 

The exception is the Suspended OU, the SCP will be applied to the OU level. This is because we don't need to customize the SCP
per account and we can apply the same SCP that denies all to the OU that then applies it to all the accounts in the OU.

All SCPs will be ignored if using the `AWSControlTowerExecution` role. This is to ensure that the SCPs don't interfere 
with the ControlTower stacks and resources. 

## Consequences

There is a length limit of 5,120 charters for the SCP content, so we have to be careful not to exceed it. There is no 
other way around it, so we have to be mindful when adding new statements to the SCP.