import * as iam from 'aws-cdk-lib/aws-iam';
import { ControlTowerExemption } from './control-tower-exemption';

/** Denies Reserved Instance / reserved-capacity purchases (EC2, RDS, DynamoDB, ElastiCache, Redshift, OpenSearch). */
export class ScpDenyReservedCapacityPurchases {
  public static statement(): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'DenyReservedCapacityPurchases',
      effect: iam.Effect.DENY,
      actions: [
        'ec2:ModifyReservedInstances',
        'ec2:PurchaseHostReservation',
        'ec2:PurchaseReservedInstancesOffering',
        'ec2:PurchaseScheduledInstances',
        'rds:PurchaseReservedDBInstancesOffering',
        'dynamodb:PurchaseReservedCapacityOfferings',
        'elasticache:PurchaseReservedCacheNodesOffering',
        'redshift:PurchaseReservedNodeOffering',
        'es:PurchaseReservedElasticsearchInstanceOffering',
        'es:PurchaseReservedInstanceOffering',
      ],
      resources: ['*'],
      conditions: ControlTowerExemption.arnNotLike(),
    });
  }
}
