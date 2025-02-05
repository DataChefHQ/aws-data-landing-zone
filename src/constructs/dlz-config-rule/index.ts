import * as config from 'aws-cdk-lib/aws-config';
import { Construct } from 'constructs';
import { IReportResource, ReportResource, ReportType } from '../../lib/report';

export interface DlzConfigRuleProps extends config.ManagedRuleProps {
  readonly reportItem: Omit<ReportResource, 'type' | 'name'>;
}

export class DlzConfigRule implements IReportResource {
  public readonly managedRule: config.ManagedRule;
  public readonly reportResource: ReportResource;

  constructor(scope: Construct, id: string, props: DlzConfigRuleProps) {
    this.managedRule = new config.ManagedRule(scope, id, props);
    this.reportResource = {
      type: ReportType.CONFIG_RULE,
      name: props.identifier,
      description: props.reportItem.description,
      externalLink: props.reportItem.externalLink,
    };
  }
}
