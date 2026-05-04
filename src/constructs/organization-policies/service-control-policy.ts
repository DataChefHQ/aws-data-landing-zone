import * as iam from 'aws-cdk-lib/aws-iam';
import * as organizations from 'aws-cdk-lib/aws-organizations';
import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { IReportResource, ReportResource, ReportType } from '../../lib/report';

export interface DlzServiceControlPolicyProps {
  readonly statements: iam.PolicyStatement[];

  /* Copied from CfnPolicyProps because can not use Omit */
  readonly description?: string;
  readonly name: string;
  readonly tags?: Array<cdk.CfnTag>;
  readonly targetIds?: Array<string>;
}

export class DlzServiceControlPolicy implements IReportResource {
  public readonly policy: organizations.CfnPolicy;
  public readonly reportResource: ReportResource;

  constructor(scope: Construct, id: string, props: DlzServiceControlPolicyProps) {
    this.policy = new organizations.CfnPolicy(scope,
      id, {
        name: props.name,
        type: 'SERVICE_CONTROL_POLICY',
        description: props.description,
        targetIds: props.targetIds,
        content: new iam.PolicyDocument({ statements: props.statements }).toJSON(),
      });

    const statementNames = props.statements.map((statement) => statement.sid);

    this.reportResource = {
      type: ReportType.SERVICE_CONTROL_POLICY,
      name: props.name,
      description: statementNames.join(', '),
      externalLink: '',
    };
  }
}
