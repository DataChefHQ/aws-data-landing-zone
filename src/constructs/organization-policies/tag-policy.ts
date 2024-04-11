import * as organizations from 'aws-cdk-lib/aws-organizations';
import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { IReportResource, ReportResource, ReportType } from '../../lib/report';


export interface DlzTag {
  readonly name: string;
}
export interface DlzTagPolicyProps {
  readonly policyTags: DlzTag[];

  /* Copied from CfnPolicyProps because can not use Omit */
  readonly description?: string;
  readonly name: string;
  readonly tags?: Array<cdk.CfnTag>;
  readonly targetIds?: Array<string>;
}

type PolicyTags = {
  [key: string]: {
    tag_key: {
      '@@assign': string;
    };
  };
};

export class DlzTagPolicy implements IReportResource {
  public readonly policy: organizations.CfnPolicy;
  public readonly reportResource: ReportResource;

  constructor(scope: Construct, id: string, props: DlzTagPolicyProps) {
    let policyTags = props.policyTags.reduce<PolicyTags>((acc, tag) => {
      acc[tag.name] = {
        tag_key: {
          '@@assign': tag.name, //Makes it case-sensitive
        },
      };
      return acc;
    }, {});

    this.policy = new organizations.CfnPolicy(scope,
      id, {
        name: props.name,
        type: 'TAG_POLICY',
        description: props.description,
        targetIds: props.targetIds,
        content: {
          tags: policyTags,
        },
      });
    this.reportResource = {
      type: ReportType.TAG_POLICY,
      name: props.name,
      description: props.description || '',
      externalLink: '',
    };
  }
}