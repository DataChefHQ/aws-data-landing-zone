import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { DlzStack } from '../../constructs';
import { DlzStackProps } from '../../constructs/dlz-stack';
import {
  ControlTowerEnabledControl,
  ControlTowerEnabledControlProps
} from "../../constructs/control-tower-control";
import {DataLandingZoneProps, Ou, Region} from "../../data-landing-zone";
import {AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS} from "../../constructs/control-tower-controls";
import {SH_SecretsManager_3} from "../../constructs/control-tower-controls/SH_SecretsManager_3";
import {limitCfnExecutions} from "../../lib/cfn-utils";

export interface ManagementStackProps extends DataLandingZoneProps { }

export class ManagementStack extends DlzStack {
  public readonly topic: sns.Topic;

  constructor(scope: Construct, stackProps: DlzStackProps, private props: ManagementStackProps) {
    super(scope, stackProps);

    this.topic = new sns.Topic(this, this.resourceName('test-topic'), {
      displayName: this.resourceName('test-topic'),
      topicName: this.resourceName('test-topic'),
    });

    this.rootControls();
  }

  /**
   * Control Tower Controls applied on all OUs
   */
  private rootControls() {
    const allOus = [Ou.SECURITY, Ou.WORKLOADS];
    console.assert(this.props.regions.global === Region.EU_WEST_1)

    const controlProps: Pick<ControlTowerEnabledControlProps, "controlTowerAccountId" | "organizationId" | "controlTowerRegion"> = {
      controlTowerAccountId: this.props.organization.rootAccounts.management.accountId,
      organizationId: this.props.organization.organizationId,
      controlTowerRegion: this.props.regions.global,
    }

    const allControls: Construct[] = [];
    for (const ou of allOus)
    {
      allControls.push(
        new ControlTowerEnabledControl(this,
          this.resourceName('AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS' + ou), {
            ...controlProps,
            appliedOu: this.props.organization.ous[ou].ouId,
            control: new AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS()
          }).control);

      allControls.push(
        new ControlTowerEnabledControl(this,
          this.resourceName('SH_SecretsManager_3' + ou), {
            ...controlProps,
            appliedOu: this.props.organization.ous[ou].ouId,
            control: new SH_SecretsManager_3({
              unusedForDays: 365
            })
          }).control);
    }
    limitCfnExecutions(allControls,10);

  }
}
