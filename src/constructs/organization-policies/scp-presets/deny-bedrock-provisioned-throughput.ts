import * as iam from 'aws-cdk-lib/aws-iam';
import { ControlTowerExemption } from './control-tower-exemption';

/** Denies Bedrock provisioned model throughput (on-demand inference still works). */
export class ScpDenyBedrockProvisionedThroughput {
  public static statement(): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'DenyBedrockProvisionedThroughput',
      effect: iam.Effect.DENY,
      actions: [
        'bedrock:CreateProvisionedModelThroughput',
        'bedrock:UpdateProvisionedModelThroughput',
      ],
      resources: ['*'],
      conditions: ControlTowerExemption.arnNotLike(),
    });
  }
}
