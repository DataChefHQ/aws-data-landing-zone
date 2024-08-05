import * as config from 'aws-cdk-lib/aws-config';
import { DlzStack, DlzVpc, DlzVpcProps } from '../../constructs';
import { DlzConfigRule } from '../../constructs/config';
import { NetworkEntities } from '../../constructs/dlz-vpc/network-entity';
import { DataLandingZoneProps, DLzAccount } from '../../data-landing-zone';
import { PropsOrDefaults } from '../../defaults';
import { Report } from '../../lib/report';

const networkEntities = new NetworkEntities();

export class SharedOrganization {
  constructor(private stack: DlzStack, private props: DataLandingZoneProps) {
  }

  public configRules() {
    this.configRuleRequiredTags();
    //TODO: More
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

  public createVpcs(dlzAccount: DLzAccount, dlzVpcProps: DlzVpcProps[]) {
    for (const dlzVpcProp of dlzVpcProps) {
      const dlzVpc = new DlzVpc(dlzAccount, this.stack, dlzVpcProp);
      networkEntities.add(dlzVpc.networkEntity);
    }
  }

}