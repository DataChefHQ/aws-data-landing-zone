# FAQ

## What is teh difference between Standard and Specialized CT Controls?
 
Standard controls have no parameters. Specialized controls have parameters that are specific to the control. There is 
only 1 implementation of a specialized control and that is `CT.MULTISERVICE.PV.1` which is a little controversial as it
overlaps with the CT Region selector, so not sure if we should enable it. 

The CFN for the `AWS::ControlTower::EnabledControl` resource makes provision for parameters but they are almost never 
used. We made provision for it in code for future use, as the only specialized control was introduced recently, it 
might be a signal that more will be introduced in the future.

- https://docs.aws.amazon.com/controltower/latest/userguide/enable-controls-on-ou.html
- https://docs.aws.amazon.com/controltower/latest/userguide/enable-controls.html

## Why can't I apply controls to the Security OU? 

Only controls that start with `AWS-` can deploy to ALL OUs. Control Tower block us from deploying controls that start 
with anything else to the Security OU. The reason for this is unknown, no documentation has been found, but the 
assumption is that they don't want us to mess with the Security OU.

## Why is there no Controls applied to the Management Account? 

The Management Account is a special account that is not in any OU. CT Controls can only be applied to OUs. We follow
the lead of AWS and do not apply any controls, Config rules, SCPs or SecurityHub Standards to it.

## Why can some classes like the controls be upper snake case?
JSII allows this because there is nothing that directly exposes the class to the outside world. So its ignored by JSII. 
An example is the `AWS_GR_ENCRYPTED_VOLUMES` class. Its not exposed in the upper level `index.ts` files and ignored by
JSII.

## Why use SSM Parameters if both stacks are in the same account?
We don't want CloudFormation Exports used downstream to be dynamically created. If an export value is no longer needed
by a downstream stack then it will be removed. But the downstream stack still depends on the exported value, it has not
been deployed. 

For example, the VPC is created in StackA. StackB depends on StackA and it uses the VPC ID. The VPC ID is then 
automatically/dynamically exported by StackA to be used in StackB. If StackB decided to no longer use the VPC ID in
StackA, then the export value will be removed. But StackB still depends on the VPC ID when StackA is deployed. So
CloudFormation will error that the export value is still in use. 

The workaround is to first deploy StackB and only StackB, to break the dependency that it has on StackA's exported 
value. Then only can you deploy StackA.

To prevent users from running into this "1 way door" issue, we decided to use SSM Parameters even if the stacks are 
in the same account.


## CloudFormation Errors

### Resource handler returned message: "Invalid request provided: NoAvailableConfigurationRecorder"

You are trying to create a Config rule in an Account that has not enabled AWS Config. This should ideally never happen
as ControlTower will enable it when enabling Mandatory CT Controls tha make use of Config. If you are seeing this error
it is likely that you are trying to create a Config rule in the Management account, which you should not.

