import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { DlzStack } from '../../constructs';
import {
  ControlTowerEnabledControl,
  IControlTowerControl,
} from '../../constructs/control-tower-control';

import { DlzStackProps } from '../../constructs';
import { DataLandingZoneProps, Ou, Region } from '../../data-landing-zone';
import { limitCfnExecutions } from '../../lib/cfn-utils';

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
    console.assert(this.props.regions.global === Region.EU_WEST_1);

    const standardControls = ControlTowerEnabledControl.standardControls();
    const controls: IControlTowerControl[] = [
      standardControls["AWS-GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS"],
      standardControls["SH.SecretsManager.3"],
    ];

    const enabledControls: Construct[] = [];
    for(const control of controls)
    {
      for (const ou of allOus)
      {
        enabledControls.push(
          new ControlTowerEnabledControl(this,
            this.resourceName(control.controlFriendlyName + ou), {
              controlTowerAccountId: this.props.organization.rootAccounts.management.accountId,
              organizationId: this.props.organization.organizationId,
              controlTowerRegion: this.props.regions.global,
              appliedOu: this.props.organization.ous[ou].ouId,
              control: control,
            }).control);
      }
    }
    limitCfnExecutions(enabledControls, 10);

  }
}
