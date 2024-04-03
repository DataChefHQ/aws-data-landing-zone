import * as config from 'aws-cdk-lib/aws-config';
import {DlzStack} from "../../constructs";
import {DataLandingZoneProps} from "../../data-landing-zone";
import {PropsOrDefaults} from "../../defaults";

export class SharedOrganization {
  constructor(private stack: DlzStack, private props: DataLandingZoneProps) {
    this.configRules();
  }

  private configRules() {
     this.configRuleRequiredTags();
     //TODO: More
  }

  private configRuleRequiredTags()
  {
    const tags = PropsOrDefaults.getOrganizationTags(this.props);
    const inputParameters:Record<string, string> = {};
    let tagIndex = 1;
    for (const key in tags) {
      inputParameters[`tag${tagIndex++}Key`] = tags[key].name;
    }
    new config.ManagedRule(this.stack,
      this.stack.resourceName("dlz-config-required-tags"), {
        configRuleName: this.stack.resourceName("dlz-config-required-tags"),
        identifier: config.ManagedRuleIdentifiers.REQUIRED_TAGS,
        inputParameters: inputParameters
      });
  }


}