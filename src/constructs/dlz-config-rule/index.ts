import * as config from 'aws-cdk-lib/aws-config';
import { Construct } from 'constructs';
import { IReportResource, ReportResource, ReportType } from '../../lib/report';

export interface DlzConfigRuleProps extends config.CustomPolicyProps {
  readonly reportItem: Omit<ReportResource, 'type' | 'name'>;
}

export class DlzConfigRule implements IReportResource {
  public readonly customPolicy: config.CustomPolicy;
  public readonly reportResource: ReportResource;

  constructor(scope: Construct, id: string, props: DlzConfigRuleProps) {
    this.customPolicy = new config.CustomPolicy(scope, id, props);
    this.reportResource = {
      type: ReportType.CONFIG_RULE,
      name: props.configRuleName ?? id,
      description: props.reportItem.description,
      externalLink: props.reportItem.externalLink,
    };
  }
}
