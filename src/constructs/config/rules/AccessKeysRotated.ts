/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

export interface AccessKeysRotatedProps {
  /** @default 90 */
  maxAccessKeyAge: number;
}

/**
 * Checks whether the active access keys are rotated within the number of days specified in maxAccessKeyAge.
 * https://docs.aws.amazon.com/config/latest/developerguide/access-keys-rotated.html
 */
export class AccessKeysRotated implements IDlzConfigRule {
  readonly configRuleName = 'access-keys-rotated';
  readonly description = 'Checks whether the active access keys are rotated within the number of days specified in maxAccessKeyAge. https://docs.aws.amazon.com/config/latest/developerguide/access-keys-rotated.html';
  readonly identifier = config.ManagedRuleIdentifiers.ACCESS_KEYS_ROTATED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether the active access keys are rotated within the number of days specified in maxAccessKeyAge.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/access-keys-rotated.html',
  };
  readonly inputParameters: { [p: string]: any };
  constructor(props?: AccessKeysRotatedProps) {
    this.inputParameters = props ?? {
      maxAccessKeyAge: 90,
    };
  }
}
