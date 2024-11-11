# Bastion hosts

The Data Landing Zone provides bastion hosts that can be accessed via AWS SSM Session Manager. This allows secure
access without the need for SSH keys and an inbound internet connection (security group rule).

The Bastion host (EC2 instance) allows all outbound traffic so that it can communicate to the AWS SSM services over the 
public internet. If this is not desired, access the bastion host security group and change the rules to only allow
traffic within the VPC. Be sure to configuring the necessary VPC endpoints for communication with AWS SSM.

## Creating a bastion host

A Bastion host can be added to the `network` section of the configuration.

```ts
const configBase: DataLandingZoneProps = {
    ...
    ous: {
      ...
      workloads: {
        ouId: 'ou-vh4d-nc2zzf9z',
        accounts: [
          {
            name: 'development',
            accountId: '381491899779',
            type: DlzAccountType.DEVELOP,
            vpcs: [
              {
                name: 'default',
                region: Region.EU_WEST_1,
                cidr: '10.0.0.0/16',
                /* Evenly divide, each /19 = 8k hosts */
                routeTables: [
                  {
                    name: 'private',
                    subnets: [
                      {
                        name: 'private-1',
                        cidr: '10.0.0.0/19',
                        az: 'us-east-1a',
                      },
                      {
                        name: 'private-2',
                        cidr: '10.1.0.0/19',
                        az: 'us-east-1b',
                      },
                      ...more subnets
                     ],
                  },
                ],
              }
            ]
          },
        ],
      },
    },
  },
  network: {
    bastionHosts: [
      {
        name: 'default',
        location: new NetworkAddress('development', Region.EU_WEST_1, 'default', 'private', 'private-1'),
        instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
      }
    ]
  },
  ...
};
```
Notes:
- The `name` property is optional, but if not provided, it will default to `default`. It only needs to be specified
  if you have multiple bastion hosts in the same stack (account + region combination).
- The `location` property must specify a specific subnet to deploy in. We recommend you choose a private subnet to
  minimize your security attack surface.
- The `instanceType` property is the size of the EC2 instance. Amazon Linux 2023 will be used as the image.

## Allowing a resource to be accessed via the bastion host

The Bastion host does not allow any inbound traffic outside its own security group. To allow a resource to be accessed
via the bastion host, you must add the bastion host security group to that resource's security groups that you are 
trying to access.

For example, if you have an RDS instance that you want to access via the bastion host, you must add the bastion
host's security group to the RDS instance's security groups.

The Bastion host security group ID can be found in AWS SSM Parameter Store with the following path:
```
dlz/bastion/${name}/security-group/id
```

The following code provides a snippet of what this would look like in CDK:
```typescript
    // Create a security group for the RDS instance
    const rdsSecurityGroup = new ec2.SecurityGroup(this, 'RdsSecurityGroup', {
      description: 'Security group for RDS instance',
    });
    rdsSecurityGroup.addIngressRule(c2.Peer.anyIpv4(), ec2.Port.tcp(5432));
    
    // Retrieve the Bastion security group ID from SSM Parameter Store, given its name is `default`
    const bastionSecurityGroupId = ssm.StringParameter.valueForStringParameter(this, 'dlz/bastion/default/security-group/id');

    // Import a construct of the Bastion Security group
    const bastionSecurityGroup = ec2.SecurityGroup.fromSecurityGroupId(this, 'BastionSecurityGroup', bastionSecurityGroupId);

    // Attach the Bastion security group to the RDS instance
    new rds.DatabaseInstance(this, 'MyRDS', {
      ...
      securityGroups: [
        rdsSecurityGroup,
        bastionSecurityGroup   <<<
      ],
      ...
    });
```

## Accessing the bastion host

> [!IMPORTANT]  
> Ensure the Bastion host can access the AWS endpoints to use the AWS SSM Session Manager. This is done by allowing
> communication over the internet (default) or as alternative, manually configure VPC endpoints for private VPC
> communication.

The bastion host can be accessed via the [AWS SSM Session Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html).

The following parameters are used in the scripts:
- `PROFILE` - The AWS CLI profile to use, omit if using the default profile (also remove --profile).
- `EC2_BASTION_ID` - The EC2 instance ID of the bastion host, look this up manually using the CLI/Console.
- `RDS_ENDPOINT` - The RDS endpoint to connect to.

```bash
PROFILE=""
EC2_BASTION_ID=""

aws ssm start-session \
    --profile "$PROFILE" \
    --target "EC2_BASTION_ID" 
```

Connecting to Bastion on its own is not that usefull, as you would have to run commands on the bastion itself. It's best used 
for port forwarding your local ports to access resources in the VPC. The following command will forward local port
5432 to an RDS, also port 5432, in the private subnet.

```bash
PROFILE=""
INSTANCE_ID=""
RDS_ENDPOINT=""
PORT=5432

aws ssm start-session \
    --profile "$PROFILE" \
    --target "$INSTANCE_ID" \
    --document-name AWS-StartPortForwardingSessionToRemoteHost \
    --parameters "{\"host\":[\"$RDS_ENDPOINT\"],\"portNumber\":[\"$PORT\"],\"localPortNumber\":[\"$PORT\"]}"
```

This enables us to connect to the RDS instance with a GUI locally by using address `localhost` and port `5432`.


