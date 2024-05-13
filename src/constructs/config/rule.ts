import * as config from 'aws-cdk-lib/aws-config';
import { MaximumExecutionFrequency, RuleScope } from 'aws-cdk-lib/aws-config/lib/rule';
import { Construct } from 'constructs';
import { IReportResource, ReportResource, ReportType } from '../../lib/report';
// import {toUpperSnake} from "../../lib";

export interface DlzConfigRuleReportItem {
  readonly description: string;
  readonly externalLink: string;
}

export interface IDlzConfigRule {
  /* From config.ManagedRuleProps, JSII limitation, have to copy for Behavioral Interface */

  /**
   * The identifier of the AWS managed rule.
   *
   * @see https://docs.aws.amazon.com/config/latest/developerguide/managed-rules-by-aws-config.html
   */
  readonly identifier: string;
  /**
   * A name for the AWS Config rule.
   */
  readonly configRuleName: string;
  /**
   * A description about this AWS Config rule.
   *
   * @default - No description
   */
  readonly description?: string;
  /**
   * Input parameter values that are passed to the AWS Config rule. Maximum length of 256 characters.
   *
   * @default - No input parameters
   */
  readonly inputParameters?: {
    [key: string]: any;
  };
  /**
   * The maximum frequency at which the AWS Config rule runs evaluations.
   *
   * @default MaximumExecutionFrequency.TWENTY_FOUR_HOURS
   */
  readonly maximumExecutionFrequency?: MaximumExecutionFrequency;
  /**
   * Defines which resources trigger an evaluation for an AWS Config rule.
   *
   * @default - evaluations for the rule are triggered when any resource in the recording group changes.
   */
  readonly ruleScope?: RuleScope;

  readonly reportItem: DlzConfigRuleReportItem;
}

export interface DlzConfigRuleProps extends config.ManagedRuleProps {
  readonly reportItem: DlzConfigRuleReportItem;
}
export class DlzConfigRule implements IReportResource {
  public readonly managedRule: config.ManagedRule;
  public readonly reportResource: ReportResource;

  constructor(scope: Construct, id: string, props: DlzConfigRuleProps) {
    this.managedRule = new config.ManagedRule(scope, id, props);

    // props.identifier === "AWS_CONFIG_PROCESS_CHECK" ? "AWS_CONFIG_PROCESS_CHECK_" + toUpperSnake(props.configRuleName) : props.configRuleName
    this.reportResource = {
      type: ReportType.CONFIG_RULE,
      name: props.identifier,
      description: props.reportItem.description,
      externalLink: props.reportItem.externalLink,
    };
  }
}
