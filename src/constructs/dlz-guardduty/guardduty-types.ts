/**
 * Individual GuardDuty protection feature toggles.
 * All features are disabled by default.
 */
export interface DlzGuardDutyFeaturesProps {
  /**
   * Monitor S3 data access events for threat detection.
   * @default false
   */
  readonly s3DataEvents?: boolean;

  /**
   * Monitor Kubernetes audit logs for EKS clusters.
   * @default false
   */
  readonly eksAuditLogs?: boolean;

  /**
   * Scan EBS volumes for malware when GuardDuty detects suspicious behavior on an EC2 instance.
   * Agentless, triggered by findings.
   * @default false
   */
  readonly ebsMalwareProtection?: boolean;

  /**
   * Monitor RDS login activity for anomalous access patterns.
   * @default false
   */
  readonly rdsLoginEvents?: boolean;

  /**
   * Monitor Lambda function network activity for threats.
   * @default false
   */
  readonly lambdaNetworkLogs?: boolean;

  /**
   * Runtime monitoring for EC2, ECS, and EKS workloads.
   * @default false
   */
  readonly runtimeMonitoring?: boolean;
}

export interface GuardDutyFeatureCfn {
  readonly name: string;
  readonly status: string;
}

const FEATURE_KEYS: { key: keyof DlzGuardDutyFeaturesProps; cfnName: string }[] = [
  { key: 's3DataEvents', cfnName: 'S3_DATA_EVENTS' },
  { key: 'eksAuditLogs', cfnName: 'EKS_AUDIT_LOGS' },
  { key: 'ebsMalwareProtection', cfnName: 'EBS_MALWARE_PROTECTION' },
  { key: 'rdsLoginEvents', cfnName: 'RDS_LOGIN_EVENTS' },
  { key: 'lambdaNetworkLogs', cfnName: 'LAMBDA_NETWORK_LOGS' },
  { key: 'runtimeMonitoring', cfnName: 'RUNTIME_MONITORING' },
];

/**
 * Maps feature props to the CloudFormation/API feature format.
 */
export function mapFeaturesToCfn(features: DlzGuardDutyFeaturesProps): GuardDutyFeatureCfn[] {
  return FEATURE_KEYS.map(f => ({
    name: f.cfnName,
    status: features[f.key] ? 'ENABLED' : 'DISABLED',
  }));
}

/**
 * Merges two feature sets using OR logic.
 * The result has a feature enabled if EITHER input has it enabled.
 */
export function mergeFeatures(
  baseline: DlzGuardDutyFeaturesProps,
  override: DlzGuardDutyFeaturesProps,
): DlzGuardDutyFeaturesProps {
  const result: Record<string, boolean | undefined> = {};
  for (const f of FEATURE_KEYS) {
    result[f.key] = baseline[f.key] || override[f.key];
  }
  return result as DlzGuardDutyFeaturesProps;
}

export interface DlzGuardDutyProps {
  /**
   * How to auto-enable GuardDuty for organization member accounts.
   * - 'ALL': Enable for all existing and new member accounts
   * - 'NEW': Enable only for new member accounts
   * - 'NONE': Do not auto-enable
   * @default 'NONE'
   */
  readonly autoEnableOrgMembers?: 'NEW' | 'ALL' | 'NONE';

  /**
   * GuardDuty protection features applied to the delegated admin detector
   * and auto-enabled at the organization level.
   * Individual accounts can add extra features via `DLzAccount.guardDutyFeatures`.
   * @default Defaults.guardDutyFeatures() (all features disabled)
   */
  readonly features?: DlzGuardDutyFeaturesProps;
}
