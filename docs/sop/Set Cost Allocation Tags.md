# Set Cost Allocation Tags

**Last reviewed:** 10 April 2024

Tags need to be enabled for cost allocation to be used in Cost Explorer and Budgets. After enabling tags it can take
up to 24 hours for the tags to appear in the Cost Explorer.

## Use the script 

1. Run the script to set the cost allocation tags. It will set the Owner, Project and Environment as well as anything 
specified in the `props.additionalMandatoryTags` property:

```ts 
await scripts.cost.setCostAllocationTags(config);
```


## Manually

1. Login to the ControlTower main account.
1. Navigate to the Billing Console > Cost Allocation Tags.
1. Click on the `Activate` button next to each tag that you want to activate. We want to activate the following tags:
   - `Owner`
   - `Project`
   - `Environment`
   - + any tags specified in the `props.additionalMandatoryTags` property