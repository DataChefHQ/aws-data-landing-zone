import * as organizations from "aws-cdk-lib/aws-organizations";
import {CfnPolicyProps} from "aws-cdk-lib/aws-organizations/lib/organizations.generated";
import {Construct} from "constructs";


export interface Tag {
  name: string;
}
export interface TagPolicyProps extends  Omit<CfnPolicyProps, "type" | "content"> {
  readonly policyTags: Tag[];
}

type PolicyTags = {
  [key: string]: {
    tag_key: {
      "@@assign": string
    }
  }
};

export class TagPolicy {
  public readonly policy: organizations.CfnPolicy;

  constructor(scope: Construct, id: string, props: TagPolicyProps) {
    let policyTags = props.policyTags.reduce<PolicyTags>((acc, tag) => {
      acc[tag.name] = {
        "tag_key": {
          "@@assign": tag.name //Makes it case-sensitive
        }
      };
      return acc;
    }, {});

    this.policy = new organizations.CfnPolicy(scope,
      id, {
        name: props.name,
        type: "TAG_POLICY",
        description: props.description,
        targetIds: props.targetIds,
        content: {
          "tags": policyTags
        },
      });
  }
}