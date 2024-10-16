import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRule } from '../../../../constructs/config/index';
import { DlzStack, DlzVpc } from '../../../../constructs/index';
import { DataLandingZoneProps, DLzAccount, GlobalVariables } from '../../../../data-landing-zone';
import { PropsOrDefaults } from '../../../../defaults';
import { Report } from '../../../../lib/report';


export class Shared {
  constructor(private stack: DlzStack, private props: DataLandingZoneProps, private dlzAccount: DLzAccount,
    private globals: GlobalVariables) {
  }

  public configRuleRequiredTags() {
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
        configRuleName: this.stack.resourceName('dlz-config-required-tags'),
        identifier: config.ManagedRuleIdentifiers.REQUIRED_TAGS,
        inputParameters: inputParameters,
        reportItem: {
          description: 'Checks resources for tags: ' + tags.map(tag => tag.name).join(', '),
          externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/required-tags.html',
        },
      });
    Report.addReportForAccountRegion(this.stack.accountName, this.stack.region, rule.reportResource);
  }


  public createVpcs() {
    const vpcsForRegion = this.dlzAccount.vpcs?.filter(vpc => vpc.region === this.stack.region) || [];
    for (const dlzVpcProp of vpcsForRegion) {
      const dlzVpc = new DlzVpc(this.dlzAccount, this.stack, dlzVpcProp, this.props.network?.nats);
      this.globals.dlzAccountNetworks.add(this.dlzAccount, dlzVpc.networkEntityVpc);
    }
  }

}