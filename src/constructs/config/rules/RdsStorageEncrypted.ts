/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks whether storage encryption is enabled for your RDS DB instances.
 * https://docs.aws.amazon.com/config/latest/developerguide/rds-storage-encrypted.html
 */
export class RdsStorageEncrypted implements IDlzConfigRule {
  readonly configRuleName = 'rds-storage-encrypted';
  readonly description = 'Checks whether storage encryption is enabled for your RDS DB instances. https://docs.aws.amazon.com/config/latest/developerguide/rds-storage-encrypted.html';
  readonly identifier = config.ManagedRuleIdentifiers.RDS_STORAGE_ENCRYPTED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether storage encryption is enabled for your RDS DB instances.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/rds-storage-encrypted.html',
  };

}
