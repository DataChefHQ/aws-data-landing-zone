import {NetworkEntities} from "../../../constructs/dlz-vpc/network-entity";
import * as iam from "aws-cdk-lib/aws-iam";

export const networkEntities = new NetworkEntities();

/* The key is the combination of the account ids */
export let vpcPeeringRoles: { [key: string]: iam.IRole } = {};
