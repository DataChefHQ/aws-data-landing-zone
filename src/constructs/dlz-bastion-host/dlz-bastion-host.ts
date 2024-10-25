import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { BastionHost } from '../../data-landing-zone';
import { SSM_PARAMETERS_DLZ } from '../../stacks/organization/constants';

export interface DlzBastionHostProps {
  readonly bastion: BastionHost;
  readonly vpcId: string;
  readonly subnetId: string;
}

export class DlzBastionHost {
  public readonly ec2: ec2.CfnInstance;
  public readonly securityGroup: ec2.CfnSecurityGroup;

  constructor(scope: Construct, id: string, props: DlzBastionHostProps) {
    this.securityGroup = new ec2.CfnSecurityGroup(scope, `${id}-security-group`, {
      vpcId: props.vpcId,
      groupName: `${id}-security-group`,
      groupDescription: `Security group for Bastion Host ${id}`,
      securityGroupIngress: [],
      securityGroupEgress: [],
    });

    new ec2.CfnSecurityGroupIngress(scope, `${id}-security-group-self-inbound`, {
      groupId: this.securityGroup.attrGroupId,
      ipProtocol: '-1',
      sourceSecurityGroupId: this.securityGroup.attrGroupId,
    });

    const role = new iam.Role(scope, `${id}-role`, {
      roleName: `${id}-role`,
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'),
      ],
    });
    const ec2InstanceProfile = new iam.CfnInstanceProfile(scope, `${id}-profile`, {
      roles: [role.roleName],
    });

    this.ec2 = new ec2.CfnInstance(scope, `${id}`, {
      instanceType: props.bastion.instanceType.toString(),
      imageId: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2023,
        cpuType: props.bastion.instanceType.architecture == ec2.InstanceArchitecture.ARM_64 ?
          ec2.AmazonLinuxCpuType.ARM_64 : undefined,
      }).getImage(scope).imageId,
      subnetId: props.subnetId,
      securityGroupIds: [this.securityGroup.ref],
      tags: [{ key: 'Name', value: id }],
      iamInstanceProfile: ec2InstanceProfile.ref,
    });
    this.ec2.addDependency(this.securityGroup);
    this.ec2.addDependency(ec2InstanceProfile);

    new ssm.StringParameter(scope, `${id}-ssm-sec-group-id`, {
      parameterName: `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}bastion/${props.bastion.name}/security-group/id`,
      stringValue: this.securityGroup.attrId,
    });
  }
}