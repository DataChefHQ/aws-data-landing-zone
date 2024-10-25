# SSM Parameters Glossary

## `/dlz/networking-entity/bastion/${bastion.name}/security-group/id`

The security group ID of the bastion host

- **bastion.name** - The name of the bastion host.

---

## `/dlz/networking-entity/vpc/${vpcAddress}/id`

The VPC ID of the VPC.

- **vpcAddress** - The address of the VPC.

---

## `/dlz/networking-entity/vpc/${routeTableAddress}/id`

The route table ID of the route table.

- **routeTableAddress** - The address of the route table.

---

## `/dlz/networking-entity/vpc/${subnetAddress}/id`

The subnet ID of the subnet.

- **subnetAddress** - The address of the subnet.

---

## `/dlz/sns/default-notification/arn`

The ARN of the default notification topic.

---

## `/dlz/iam/permission-boundary-policy/arn`

The ARN of the permission boundary policy.

---

## `/dlz/networking/vpc-peering-role-arn--${vpcPeeringRolesKey}`

The ARN of the VPC peering role.

- **vpcPeeringRolesKey** - The key used to identify the VPC peering role.

---

## `/dlz/networking-entity/vpc/${fromVpc.address}/peer/${toVpc.address}/id`

The ID of the VPC peering connection.

- **fromVpc.address** - The address of the source VPC.
- **toVpc.address** - The address of the destination VPC.

---