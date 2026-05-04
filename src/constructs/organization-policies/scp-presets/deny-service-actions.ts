import * as iam from 'aws-cdk-lib/aws-iam';
import { ControlTowerExemption } from './control-tower-exemption';

/** Denies a caller-supplied list of service actions (e.g. `['eks:*', 'ecs:*']`). */
export class ScpDenyServiceActions {
  public static statement(serviceActions: string[]): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'DenyServiceActions',
      effect: iam.Effect.DENY,
      actions: serviceActions,
      resources: ['*'],
      conditions: ControlTowerExemption.arnNotLike(),
    });
  }
}
