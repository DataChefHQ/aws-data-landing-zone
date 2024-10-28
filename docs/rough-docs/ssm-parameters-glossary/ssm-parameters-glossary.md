# SSM Parameters Glossary

## `/dlz/networking-entity/bastion/${bastion.name}/security-group/id`

### Scope: External

The security group ID of the bastion host [link](../bastion-hosts/bastion-hosts.md).

- **bastion.name** - The name of the bastion host. Property is optional, but if not provided, it will default to `default`.

---

## `/dlz/networking-entity/vpc/${vpcAddress}/id`

### Scope: External

The VPC ID of the VPC.

- **vpcAddress** - The address of the VPC.

---

## `/dlz/networking-entity/vpc/${routeTableAddress}/id`

### Scope: External

The route table ID of the route table.

- **routeTableAddress** - The address of the route table.

---

## `/dlz/networking-entity/vpc/${subnetAddress}/id`

### Scope: External

The subnet ID of the subnet.

- **subnetAddress** - The address of the subnet.

---

## `/dlz/sns/default-notification/arn`

### Scope: External

The ARN of the default notification topic.

---

## `/dlz/iam/permission-boundary-policy/arn`

### Scope: External

The ARN of the permission boundary policy.

---

## `/dlz/networking/vpc-peering-role-arn--${vpcPeeringRolesKey}`

### Scope: Internal

The ARN of the VPC peering role.

- **vpcPeeringRolesKey** - The key used to identify the VPC peering role.

---

## `/dlz/networking-entity/vpc/${fromVpc.address}/peer/${toVpc.address}/id`

### Scope: Internal

The ID of the VPC peering connection.

- **fromVpc.address** - The address of the source VPC.
- **toVpc.address** - The address of the destination VPC.

---
