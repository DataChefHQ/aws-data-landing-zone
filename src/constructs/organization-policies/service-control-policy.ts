import * as organizations from "aws-cdk-lib/aws-organizations";
import * as iam from "aws-cdk-lib/aws-iam";
import {CfnPolicyProps} from "aws-cdk-lib/aws-organizations/lib/organizations.generated";
import {Construct} from "constructs";
import {DlzTag} from "./tag-policy";
import {IReportResource, ReportResource, ReportType} from "../../lib/report";

const excludeCtRoles = {
  "ArnNotLike": {
    "aws:PrincipalARN": [
      "arn:aws:iam::*:role/AWSControlTowerExecution"
    ]
  }
}

export interface DlzServiceControlPolicyProps extends  Omit<CfnPolicyProps, "type" | "content"> {
  readonly statements: iam.PolicyStatement[];
}

export class DlzServiceControlPolicy implements IReportResource {
  public readonly policy: organizations.CfnPolicy;
  public readonly reportResource: ReportResource;

  constructor(scope: Construct, id: string, props: DlzServiceControlPolicyProps) {
    this.policy = new organizations.CfnPolicy(scope,
      id, {
        name: props.name,
        type: "SERVICE_CONTROL_POLICY",
        description: props.description,
        targetIds: props.targetIds,
        content: new iam.PolicyDocument({statements: props.statements}).toJSON(),
      });

    const statementNames = props.statements.map((statement) => statement.sid);

    this.reportResource = {
      type: ReportType.ServiceControlPolicy,
      name: props.name,
      description: statementNames.join(", "),
      externalLink: ""
    }
  }

  public static denyServiceActionStatements(serviceActions: string[]) {
    return new iam.PolicyStatement({
      sid: 'DenyServiceActions',
      effect: iam.Effect.DENY,
      actions: serviceActions,
      resources: ["*"],
      conditions: excludeCtRoles,
    })
  }

  public static denyCfnStacksWithoutStandardTags(tags: DlzTag[]) {
    return new iam.PolicyStatement({
      sid: 'DenyCfnStacksWithoutStandardTags',
      effect: iam.Effect.DENY,
      actions: ["cloudformation:CreateStack"],
      resources: ["*"],
      conditions: {
        "Null": tags.reduce<Record<string, boolean>>((acc ,tag) => {
          acc[`aws:RequestTag/${tag.name}`] = true;
          return acc;
        }, {})
      }
    })
  }
}

