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