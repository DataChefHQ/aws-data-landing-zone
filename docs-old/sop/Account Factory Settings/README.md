# Account Factory Settings

## Network Configuration

VPCs will be defined in code and Control Tower must not create any VPCs. There is no single option to toggle VPC
creation off in Control Tower, from the [AWS documentation](https://docs.aws.amazon.com/controltower/latest/userguide/configure-without-vpc.html)
the following steps are required to disable VPC creation:

1. Navigate to `Account Factory` in the Control Tower AWS Console.
1. Edit the `Network configuration`
1. Disable `Internet-accessible subnet`
1. Set `Maximum number of private subnets` to 0
1. Deselect all `Regions for VPC creation`
1. Save

![img_7.png](img_7.png)
