import * as organizations from "aws-cdk-lib/aws-organizations";
import {CfnPolicyProps} from "aws-cdk-lib/aws-organizations/lib/organizations.generated";
import {Construct} from "constructs";
import {IReportResource, ReportResource, ReportType} from "../../lib/report";


export interface DlzTag {
  name: string;
}
export interface DlzTagPolicyProps extends  Omit<CfnPolicyProps, "type" | "content"> {
  readonly policyTags: DlzTag[];
}

type PolicyTags = {
  [key: string]: {
    tag_key: {
      "@@assign": string
    }
  }
};

export class DlzTagPolicy implements IReportResource {
  public readonly policy: organizations.CfnPolicy;
  public readonly reportResource: ReportResource;

  constructor(scope: Construct, id: string, props: DlzTagPolicyProps) {
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
    this.reportResource = {
      type: ReportType.TagPolicy,
      name: props.name,
      description: props.description || "",
      externalLink: ""
    }
  }
}