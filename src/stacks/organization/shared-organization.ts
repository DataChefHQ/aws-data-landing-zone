import * as config from 'aws-cdk-lib/aws-config';
import { Construct } from 'constructs';
import { ConfigRule, DlzStack } from '../../constructs';
import { ConfigRuleMappings, DlzConfigRule, IDlzConfigRule } from '../../constructs/config';
import { DataLandingZoneProps } from '../../data-landing-zone';
import { PropsOrDefaults } from '../../defaults';
import { Report } from '../../lib/report';

export class SharedOrganization {
  constructor(private stack: DlzStack, private props: DataLandingZoneProps) {
    this.configRules();
  }

  private configRules() {
    this.configRuleRequiredTags();
    this.accountConfigRules();
  }

  private accountConfigRules() {

    const configRules = ConfigRuleMappings.all();
    const ouRules = this.props.organization.root.configRules;
    const accountRules = this.props.organization.ous.workloads.accounts.find(acc => acc.name === this.stack.accountName);
    let rules: ConfigRule[] = [];

    // If the Account rules property is defined
    if (accountRules!.configRules) {
      // If Account rules is an empty array, do not apply any rules
      // If Account rules is specified, use the Account Rules instead of the OU rules
      rules = accountRules!.configRules;
    } else if (ouRules) {
      // If Account rules are not defined, use the OU Rules if they exists
      rules = ouRules;
    }
    if (rules.length === 0) {
      return;
    }

    const selectedRules: IDlzConfigRule[] = [];
    for (const rule of rules) {
      selectedRules.push(configRules[rule]);
    }

    const enabledRules: Construct[] = [];
    for (const rule of selectedRules) {
      const enabledRule = new DlzConfigRule(this.stack,
        this.stack.resourceName(rule.configRuleName), {
          configRuleName: 'dlz-config-'+rule.configRuleName,
          identifier: rule.identifier,
          inputParameters: rule.inputParameters,
          description: rule.description,
          maximumExecutionFrequency: rule.maximumExecutionFrequency,
          reportItem: {
            description: rule.reportItem.description,
            externalLink: rule.reportItem.externalLink,
          },
        });

      enabledRules.push(enabledRule.managedRule);
      Report.addReportForAccountRegion(this.stack.accountName, this.stack.region, enabledRule.reportResource);
    }
    // Might not be needed, let's add it only if we hit the limit
    // limitCfnExecutions(enabledRules, 20);
  }

  private configRuleRequiredTags() {
    const tags = PropsOrDefaults.getOrganizationTags(this.props);
    const inputParameters: Record<string, string> = {};
    let tagIndex = 1;
    for (const key in tags) {
      inputParameters[`tag${tagIndex}Key`] = tags[key].name;
      if (tags[key].values) {
        inputParameters[`tag${tagIndex}Value`] = tags[key].values!.join(',');
      }
      tagIndex++;
    }

    const rule = new DlzConfigRule(this.stack,
      this.stack.resourceName('dlz-config-required-tags'), {
        configRuleName: 'dlz-config-'+config.ManagedRuleIdentifiers.REQUIRED_TAGS,
        identifier: config.ManagedRuleIdentifiers.REQUIRED_TAGS,
        inputParameters: inputParameters,
        reportItem: {
          description: 'Checks resources for tags: ' + tags.map(tag => tag.name).join(', '),
          externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/required-tags.html',
        },
      });
    Report.addReportForAccountRegion(this.stack.accountName, this.stack.region, rule.reportResource);
  }

}