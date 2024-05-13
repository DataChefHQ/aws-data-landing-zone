/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import { DlzConfigRuleReportItem, IDlzConfigRule } from '../rule';

/**
 * Checks whether Amazon Relational Database Service (Amazon RDS) DB snapshots are encrypted.
 * https://docs.aws.amazon.com/config/latest/developerguide/rds-snapshot-encrypted.html
 */
export class RdsSnapshotEncrypted implements IDlzConfigRule {
  readonly configRuleName = 'rds-snapshot-encrypted';
  readonly description = 'Checks whether Amazon Relational Database Service (Amazon RDS) DB snapshots are encrypted. https://docs.aws.amazon.com/config/latest/developerguide/rds-snapshot-encrypted.html';
  readonly identifier = config.ManagedRuleIdentifiers.RDS_SNAPSHOT_ENCRYPTED;

  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether Amazon Relational Database Service (Amazon RDS) DB snapshots are encrypted.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/rds-snapshot-encrypted.html',
  };

}
