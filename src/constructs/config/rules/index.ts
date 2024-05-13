/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import { AccessKeysRotated } from './AccessKeysRotated';
import { AccountPartOfOrganizations } from './AccountPartOfOrganizations';
import { CloudTrailCloudWatchLogsEnabled } from './CloudTrailCloudWatchLogsEnabled';
import { CloudTrailEncryptionEnabled } from './CloudTrailEncryptionEnabled';
import { CloudTrailLogFileValidationEnabled } from './CloudTrailLogFileValidationEnabled';
import { CloudtrailS3DataeventsEnabled } from './CloudtrailS3DataeventsEnabled';
import { CmkBackingKeyRotationEnabled } from './CmkBackingKeyRotationEnabled';
import { Ec2EbsEncryptionByDefault } from './Ec2EbsEncryptionByDefault';
import { Ec2InstanceProfileAttached } from './Ec2InstanceProfileAttached';
import { EncryptedVolumes } from './EncryptedVolumes';
import { IamNoInlinePolicyCheck } from './IamNoInlinePolicyCheck';
import { IamPasswordPolicy } from './IamPasswordPolicy';
import { IamPolicyInUse } from './IamPolicyInUse';
import { IamPolicyNoStatementsWithAdminAccess } from './IamPolicyNoStatementsWithAdminAccess';
import { IamRootAccessKeyCheck } from './IamRootAccessKeyCheck';
import { IamUserGroupMembershipCheck } from './IamUserGroupMembershipCheck';
import { IamUserNoPoliciesCheck } from './IamUserNoPoliciesCheck';
import { IamUserUnusedCredentialsCheck } from './IamUserUnusedCredentialsCheck';
import { MfaEnabledForIamConsoleAccess } from './MfaEnabledForIamConsoleAccess';
import { MultiRegionCloudtrailEnabled } from './MultiRegionCloudtrailEnabled';
import { RdsSnapshotEncrypted } from './RdsSnapshotEncrypted';
import {RestrictedSsh} from './RestrictedSsh';
import { RdsStorageEncrypted } from './RdsStorageEncrypted';
import { RestrictedCommonPorts } from './RestrictedCommonPorts';
import { RootAccountHardwareMfaEnabled } from './RootAccountHardwareMfaEnabled';
import { RootAccountMfaEnabled } from './RootAccountMfaEnabled';
import { S3AccountLevelPublicAccessBlocksPeriodic } from './S3AccountLevelPublicAccessBlocksPeriodic';
import { S3BucketLevelPublicAccessProhibited } from './S3BucketLevelPublicAccessProhibited';
import { S3BucketLoggingEnabled } from './S3BucketLoggingEnabled';
import { S3BucketPublicReadProhibited } from './S3BucketPublicReadProhibited';
import { S3BucketPublicWriteProhibited } from './S3BucketPublicWriteProhibited';
import { S3BucketServerSideEncryptionEnabled } from './S3BucketServerSideEncryptionEnabled';
import { S3BucketSslRequestsOnly } from './S3BucketSslRequestsOnly';
import {S3BucketVersioningEnabled} from './S3BucketVersioningEnabled';
import {ProcessCheckAccountContactDetailsConfigured} from './ProcessCheckAccountContactDetailsConfigured';
import {ProcessCheckAccountSecurityContactConfigured} from './ProcessCheckAccountSecurityContactConfigured';
import {ProcessCheckRootAccountRegularUse} from './ProcessCheckRootAccountRegularUse';
import {ProcessCheckIamUserConsoleAndApiAccessAtCreation} from './ProcessCheckIamUserConsoleAndApiAccessAtCreation';
import {ProcessCheckIamUserSingleAccessKey} from './ProcessCheckIamUserSingleAccessKey';
import {ProcessCheckIamExpiredCertificates} from './ProcessCheckIamExpiredCertificates';
import {ProcessCheckIamAccessAnalyzerEnabled} from './ProcessCheckIamAccessAnalyzerEnabled';
import {ProcessCheckAlarmUnauthorizedApiCalls} from './ProcessCheckAlarmUnauthorizedApiCalls';
import {ProcessCheckAlarmSignInWithoutMfa} from './ProcessCheckAlarmSignInWithoutMfa';
import {ProcessCheckAlarmRootAccountUse} from './ProcessCheckAlarmRootAccountUse';
import {ProcessCheckAlarmIamPolicyChange} from './ProcessCheckAlarmIamPolicyChange';
import {ProcessCheckAlarmCloudtrailConfigChange} from './ProcessCheckAlarmCloudtrailConfigChange';
import {ProcessCheckAlarmS3BucketPolicyChange} from './ProcessCheckAlarmS3BucketPolicyChange';
import {ProcessCheckAlarmVpcNetworkGatewayChange} from './ProcessCheckAlarmVpcNetworkGatewayChange';
import {ProcessCheckAlarmVpcRouteTableChange} from './ProcessCheckAlarmVpcRouteTableChange';
import {ProcessCheckAlarmVpcChange} from './ProcessCheckAlarmVpcChange';
import {ProcessCheckAlarmOrganizationsChange} from './ProcessCheckAlarmOrganizationsChange';
import {ProcessCheckVpcNetworkaclOpenAdminPorts} from './ProcessCheckVpcNetworkaclOpenAdminPorts';
import { VpcDefaultSecurityGroupClosed } from './VpcDefaultSecurityGroupClosed';
import { VpcFlowLogsEnabled } from './VpcFlowLogsEnabled';
import { ProcessCheckConfigEnabledAllRegions } from './ProcessCheckConfigEnabledAllRegions';
import { ProcessCheckAlarmConsoleAuthFailures } from './ProcessCheckAlarmConsoleAuthFailures';
import { ProcessCheckAlarmKmsDisableOrDeleteCmk } from './ProcessCheckAlarmKmsDisableOrDeleteCmk';
import { ProcessCheckAlarmAwsConfigChange } from './ProcessCheckAlarmAwsConfigChange';
import { ProcessCheckAlarmVpcSecrityGroupChange } from './ProcessCheckAlarmVpcSecrityGroupChange';
import { ProcessCheckAlarmVpcNaclChange } from './ProcessCheckAlarmVpcNaclChange';
import { ProcessCheckVpcPeeringLeastAccess } from './ProcessCheckVpcPeeringLeastAccess';
import { IDlzConfigRule } from '../rule';

/**
 * Available Config Rules
 */
export enum ConfigRule {
  /**
   * Checks whether the active access keys are rotated within the number of days specified in maxAccessKeyAge.
   * https://docs.aws.amazon.com/config/latest/developerguide/access-keys-rotated.html
  */
  ACCESS_KEYS_ROTATED = 'ACCESS_KEYS_ROTATED',

  /**
   * Checks whether AWS CloudTrail trails are configured to send logs to Amazon CloudWatch Logs.
   * https://docs.aws.amazon.com/config/latest/developerguide/cloud-trail-cloud-watch-logs-enabled.html
  */
  CLOUD_TRAIL_CLOUD_WATCH_LOGS_ENABLED = 'CLOUD_TRAIL_CLOUD_WATCH_LOGS_ENABLED',

  /**
   * Check that Amazon Elastic Block Store (EBS) encryption is enabled by default.
   * https://docs.aws.amazon.com/config/latest/developerguide/ec2-ebs-encryption-by-default.html
  */
  EC2_EBS_ENCRYPTION_BY_DEFAULT = 'EC2_EBS_ENCRYPTION_BY_DEFAULT',

  /**
   * Checks whether the EBS volumes that are in an attached state are encrypted.
   * https://docs.aws.amazon.com/config/latest/developerguide/encrypted-volumes.html
  */
  ENCRYPTED_VOLUMES = 'ENCRYPTED_VOLUMES',

  /**
   * Checks that inline policy feature is not in use.
   * https://docs.aws.amazon.com/config/latest/developerguide/iam-no-inline-policy-check.html
  */
  IAM_NO_INLINE_POLICY_CHECK = 'IAM_NO_INLINE_POLICY_CHECK',

  /**
   * Checks whether the account password policy for IAM users meets the specified requirements indicated in the parameters.
   * https://docs.aws.amazon.com/config/latest/developerguide/iam-password-policy.html
  */
  IAM_PASSWORD_POLICY = 'IAM_PASSWORD_POLICY',

  /**
   * Checks whether the IAM policy ARN is attached to an IAM user, or an IAM group with one or more IAM users, or an IAM role with one or more trusted entity.
   * https://docs.aws.amazon.com/config/latest/developerguide/iam-policy-in-use.html
  */
  IAM_POLICY_IN_USE = 'IAM_POLICY_IN_USE',

  /**
   * Checks the IAM policies that you create for Allow statements that grant permissions to all actions on all resources.
   * https://docs.aws.amazon.com/config/latest/developerguide/iam-policy-no-statements-with-admin-access.html
  */
  IAM_POLICY_NO_STATEMENTS_WITH_ADMIN_ACCESS = 'IAM_POLICY_NO_STATEMENTS_WITH_ADMIN_ACCESS',

  /**
   * Checks whether the root user access key is available.
   * https://docs.aws.amazon.com/config/latest/developerguide/iam-root-access-key-check.html
  */
  IAM_ROOT_ACCESS_KEY_CHECK = 'IAM_ROOT_ACCESS_KEY_CHECK',

  /**
   * Checks whether IAM users are members of at least one IAM group.
   * https://docs.aws.amazon.com/config/latest/developerguide/iam-user-group-membership-check.html
  */
  IAM_USER_GROUP_MEMBERSHIP_CHECK = 'IAM_USER_GROUP_MEMBERSHIP_CHECK',

  /**
   * Checks that none of your IAM users have policies attached. IAM users must inherit permissions from IAM groups or roles.
   * https://docs.aws.amazon.com/config/latest/developerguide/iam-user-no-policies-check.html
  */
  IAM_USER_NO_POLICIES_CHECK = 'IAM_USER_NO_POLICIES_CHECK',

  /**
   * Checks whether your AWS Identity and Access Management (IAM) users have passwords or active access keys that have not been used within the specified number of days you provided.
   * https://docs.aws.amazon.com/config/latest/developerguide/iam-user-unused-credentials-check.html
  */
  IAM_USER_UNUSED_CREDENTIALS_CHECK = 'IAM_USER_UNUSED_CREDENTIALS_CHECK',

  /**
   * Checks whether the incoming SSH traffic for the security groups is accessible.
   * https://docs.aws.amazon.com/config/latest/developerguide/incoming-ssh-disabled.html
  */
  INCOMING_SSH_DISABLED = 'INCOMING_SSH_DISABLED',

  /**
   * Checks whether AWS Multi-Factor Authentication (MFA) is enabled for all IAM users that use a console password.
   * https://docs.aws.amazon.com/config/latest/developerguide/mfa-enabled-for-iam-console-access.html
  */
  MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS = 'MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS',

  /**
   * Checks that there is at least one multi-region AWS CloudTrail.
   * https://docs.aws.amazon.com/config/latest/developerguide/multi-region-cloud-trail-enabled.html
  */
  MULTI_REGION_CLOUD_TRAIL_ENABLED = 'MULTI_REGION_CLOUD_TRAIL_ENABLED',

  /**
   * Checks whether Amazon Relational Database Service (Amazon RDS) DB snapshots are encrypted.
   * https://docs.aws.amazon.com/config/latest/developerguide/rds-snapshot-encrypted.html
  */
  RDS_SNAPSHOT_ENCRYPTED = 'RDS_SNAPSHOT_ENCRYPTED',

  /**
   * Checks whether storage encryption is enabled for your RDS DB instances.
   * https://docs.aws.amazon.com/config/latest/developerguide/rds-storage-encrypted.html
  */
  RDS_STORAGE_ENCRYPTED = 'RDS_STORAGE_ENCRYPTED',

  /**
   * Checks whether the security groups in use do not allow unrestricted incoming TCP traffic to the specified ports.
   * https://docs.aws.amazon.com/config/latest/developerguide/restricted-incoming-traffic.html
  */
  RESTRICTED_INCOMING_TRAFFIC = 'RESTRICTED_INCOMING_TRAFFIC',

  /**
   * Checks whether users of your AWS account require a multi-factor authentication (MFA) device to sign in with root credentials.
   * https://docs.aws.amazon.com/config/latest/developerguide/root-account-mfa-enabled.html
  */
  ROOT_ACCOUNT_MFA_ENABLED = 'ROOT_ACCOUNT_MFA_ENABLED',

  /**
   * Checks if the required public access block settings are configured from account level.
   * https://docs.aws.amazon.com/config/latest/developerguide/s3-account-level-public-access-blocks-periodic.html
  */
  S3_ACCOUNT_LEVEL_PUBLIC_ACCESS_BLOCKS_PERIODIC = 'S3_ACCOUNT_LEVEL_PUBLIC_ACCESS_BLOCKS_PERIODIC',

  /**
   * Checks if Amazon Simple Storage Service (Amazon S3) buckets are publicly accessible.
   * https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-level-public-access-prohibited.html
  */
  S3_BUCKET_LEVEL_PUBLIC_ACCESS_PROHIBITED = 'S3_BUCKET_LEVEL_PUBLIC_ACCESS_PROHIBITED',

  /**
   * Checks whether logging is enabled for your S3 buckets.
   * https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-logging-enabled.html
  */
  S3_BUCKET_LOGGING_ENABLED = 'S3_BUCKET_LOGGING_ENABLED',

  /**
   * Checks if your Amazon S3 buckets do not allow public read access.
   * https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-public-read-prohibited.html
  */
  S3_BUCKET_PUBLIC_READ_PROHIBITED = 'S3_BUCKET_PUBLIC_READ_PROHIBITED',

  /**
   * Checks that your Amazon S3 buckets do not allow public write access.
   * https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-public-write-prohibited.html
  */
  S3_BUCKET_PUBLIC_WRITE_PROHIBITED = 'S3_BUCKET_PUBLIC_WRITE_PROHIBITED',

  /**
   * Checks whether versioning is enabled for your S3 buckets.
   * https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-versioning-enabled.html
  */
  S3_BUCKET_VERSIONING_ENABLED = 'S3_BUCKET_VERSIONING_ENABLED',

  /**
   * Ensure the contact email and telephone number for AWS accounts are current and map to more than one individual in your organization. Within the My Account section of the console ensure correct information is specified in the Contact Information section.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_ACCOUNT_CONTACT_DETAILS_CONFIGURED = 'AWS_CONFIG_PROCESS_CHECK_ACCOUNT_CONTACT_DETAILS_CONFIGURED',

  /**
   * Ensure the contact email and telephone number for the your organizations security team are current. Within the My Account section of the AWS Management Console ensure the correct information is specified in the Security section.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_ACCOUNT_SECURITY_CONTACT_CONFIGURED = 'AWS_CONFIG_PROCESS_CHECK_ACCOUNT_SECURITY_CONTACT_CONFIGURED',

  /**
   * Ensure the use of the root account is avoided for everyday tasks. Within IAM, run a credential report to examine when the root user was last used.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_ROOT_ACCOUNT_REGULAR_USE = 'AWS_CONFIG_PROCESS_CHECK_ROOT_ACCOUNT_REGULAR_USE',

  /**
   * Ensure access keys are not setup during the initial user setup for all IAM users that have a console password. For all IAM users with console access, compare the user \'Creation time` to the Access Key `Created` date.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_IAM_USER_CONSOLE_AND_API_ACCESS_AT_CREATION = 'AWS_CONFIG_PROCESS_CHECK_IAM_USER_CONSOLE_AND_API_ACCESS_AT_CREATION',

  /**
   * Ensure there is only one active access key available for any single IAM user. For all IAM users check that there is only one active key used within the Security Credentials tab for each user within IAM.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_IAM_USER_SINGLE_ACCESS_KEY = 'AWS_CONFIG_PROCESS_CHECK_IAM_USER_SINGLE_ACCESS_KEY',

  /**
   * Ensure that all the expired SSL/TLS certificates stored in IAM are removed. From the command line with the installed AWS CLI run the \'aws iam list-server-certificates\' command and determine if there are any expired server certificates.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_IAM_EXPIRED_CERTIFICATES = 'AWS_CONFIG_PROCESS_CHECK_IAM_EXPIRED_CERTIFICATES',

  /**
   * Ensure that IAM Access analyzer is enabled. Within the IAM section of the console, select Access analyzer and ensure that the STATUS is set to Active.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_IAM_ACCESS_ANALYZER_ENABLED = 'AWS_CONFIG_PROCESS_CHECK_IAM_ACCESS_ANALYZER_ENABLED',

  /**
   * Ensure a log metric filter and an alarm exists for unauthorized API calls.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_ALARM_UNAUTHORIZED_API_CALLS = 'AWS_CONFIG_PROCESS_CHECK_ALARM_UNAUTHORIZED_API_CALLS',

  /**
   * Ensure a log metric filter and an alarm exists for AWS Management Console sign-in without Multi-Factor Authentication (MFA).
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_ALARM_SIGN_IN_WITHOUT_MFA = 'AWS_CONFIG_PROCESS_CHECK_ALARM_SIGN_IN_WITHOUT_MFA',

  /**
   * Ensure a log metric filter and an alarm exists for usage of the root account.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_ALARM_ROOT_ACCOUNT_USE = 'AWS_CONFIG_PROCESS_CHECK_ALARM_ROOT_ACCOUNT_USE',

  /**
   * Ensure a log metric filter and an alarm exists for IAM policy changes.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_ALARM_IAM_POLICY_CHANGE = 'AWS_CONFIG_PROCESS_CHECK_ALARM_IAM_POLICY_CHANGE',

  /**
   * Ensure a log metric filter and an alarm exists for AWS CloudTrail configuration changes.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_ALARM_CLOUDTRAIL_CONFIG_CHANGE = 'AWS_CONFIG_PROCESS_CHECK_ALARM_CLOUDTRAIL_CONFIG_CHANGE',

  /**
   * Ensure a log metric filter and an alarm exists for Amazon S3 bucket policy changes.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_ALARM_S3_BUCKET_POLICY_CHANGE = 'AWS_CONFIG_PROCESS_CHECK_ALARM_S3_BUCKET_POLICY_CHANGE',

  /**
   * Ensure a log metric filter and an alarm exists for changes to network gateways.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_NETWORK_GATEWAY_CHANGE = 'AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_NETWORK_GATEWAY_CHANGE',

  /**
   * Ensure a log metric filter and an alarm exists for route table changes.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_ROUTE_TABLE_CHANGE = 'AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_ROUTE_TABLE_CHANGE',

  /**
   * Ensure a log metric filter and an alarm exists for Amazon Virtual Private Cloud (VPC) changes.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_CHANGE = 'AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_CHANGE',

  /**
   * Ensure a log metric filter and an alarm exists for AWS Organizations changes.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_ALARM_ORGANIZATIONS_CHANGE = 'AWS_CONFIG_PROCESS_CHECK_ALARM_ORGANIZATIONS_CHANGE',

  /**
   * Ensure no network ACLs allow public ingress to the remote server administration ports. Within the VPC section of the console, ensure there are network ACLs with a source of \'0.0.0.0/0\' with allowing ports or port ranges including remote server admin ports.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_VPC_NETWORKACL_OPEN_ADMIN_PORTS = 'AWS_CONFIG_PROCESS_CHECK_VPC_NETWORKACL_OPEN_ADMIN_PORTS',

  /**
   * Checks whether AWS account is part of AWS Organizations.
   * https://docs.aws.amazon.com/config/latest/developerguide/account-part-of-organizations.html
  */
  ACCOUNT_PART_OF_ORGANIZATIONS = 'ACCOUNT_PART_OF_ORGANIZATIONS',

  /**
   * Checks whether AWS CloudTrail is configured to use the server side encryption (SSE) AWS Key Management Service (AWS KMS) customer master key (CMK) encryption.
   * https://docs.aws.amazon.com/config/latest/developerguide/cloud-trail-encryption-enabled.html
  */
  CLOUD_TRAIL_ENCRYPTION_ENABLED = 'CLOUD_TRAIL_ENCRYPTION_ENABLED',

  /**
   * Checks whether AWS CloudTrail creates a signed digest file with logs.
   * https://docs.aws.amazon.com/config/latest/developerguide/cloud-trail-log-file-validation-enabled.html
  */
  CLOUD_TRAIL_LOG_FILE_VALIDATION_ENABLED = 'CLOUD_TRAIL_LOG_FILE_VALIDATION_ENABLED',

  /**
   * Checks whether at least one AWS CloudTrail trail is logging Amazon S3 data events for all S3 buckets.
   * https://docs.aws.amazon.com/config/latest/developerguide/cloudtrail-s3-dataevents-enabled.html
  */
  CLOUDTRAIL_S3_DATAEVENTS_ENABLED = 'CLOUDTRAIL_S3_DATAEVENTS_ENABLED',

  /**
   * Checks that key rotation is enabled for each key and matches to the key ID of the customer created customer master key (CMK).
   * https://docs.aws.amazon.com/config/latest/developerguide/cmk-backing-key-rotation-enabled.html
  */
  CMK_BACKING_KEY_ROTATION_ENABLED = 'CMK_BACKING_KEY_ROTATION_ENABLED',

  /**
   * Checks whether your AWS account is enabled to use multi-factor authentication (MFA) hardware device to sign in with root credentials.
   * https://docs.aws.amazon.com/config/latest/developerguide/root-account-hardware-mfa-enabled.html
  */
  ROOT_ACCOUNT_HARDWARE_MFA_ENABLED = 'ROOT_ACCOUNT_HARDWARE_MFA_ENABLED',

  /**
   * Checks that your Amazon S3 bucket either has Amazon S3 default encryption enabled or that the S3 bucket policy explicitly denies put-object requests without server side encryption that uses AES-256 or AWS Key Management Service.
   * https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-server-side-encryption-enabled.html
  */
  S3_BUCKET_SERVER_SIDE_ENCRYPTION_ENABLED = 'S3_BUCKET_SERVER_SIDE_ENCRYPTION_ENABLED',

  /**
   * Checks whether S3 buckets have policies that require requests to use Secure Socket Layer (SSL).
   * https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-ssl-requests-only.html
  */
  S3_BUCKET_SSL_REQUESTS_ONLY = 'S3_BUCKET_SSL_REQUESTS_ONLY',

  /**
   * Checks that the default security group of any Amazon Virtual Private Cloud (VPC) does not allow inbound or outbound traffic. The rule returns NOT_APPLICABLE if the security group is not default.
   * https://docs.aws.amazon.com/config/latest/developerguide/vpc-default-security-group-closed.html
  */
  VPC_DEFAULT_SECURITY_GROUP_CLOSED = 'VPC_DEFAULT_SECURITY_GROUP_CLOSED',

  /**
   * Checks whether Amazon Virtual Private Cloud flow logs are found and enabled for Amazon VPC.
   * https://docs.aws.amazon.com/config/latest/developerguide/vpc-flow-logs-enabled.html
  */
  VPC_FLOW_LOGS_ENABLED = 'VPC_FLOW_LOGS_ENABLED',

  /**
   * Ensure AWS Config is enabled in all AWS Regions. Within the AWS Config section of the console, for each Region enabled ensure the AWS Config recorder is configured correctly. Ensure recording of global AWS resources is enabled at least in one Region.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_CONFIG_ENABLED_ALL_REGIONS = 'AWS_CONFIG_PROCESS_CHECK_CONFIG_ENABLED_ALL_REGIONS',

  /**
   * Checks if an Amazon Elastic Compute Cloud (Amazon EC2) instance has an Identity and Access Management (IAM) profile attached to it. This rule is NON_COMPLIANT if no IAM profile is attached to the Amazon EC2 instance.
   * https://docs.aws.amazon.com/config/latest/developerguide/ec2-instance-profile-attached.html
  */
  EC2_INSTANCE_PROFILE_ATTACHED = 'EC2_INSTANCE_PROFILE_ATTACHED',

  /**
   * Ensure a log metric filter and an alarm exists for AWS Management Console authentication failures.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_ALARM_CONSOLE_AUTH_FAILURES = 'AWS_CONFIG_PROCESS_CHECK_ALARM_CONSOLE_AUTH_FAILURES',

  /**
   * Ensure a log metric filter and an alarm exists for disabling or scheduled deletion of customer created CMKs.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_ALARM_KMS_DISABLE_OR_DELETE_CMK = 'AWS_CONFIG_PROCESS_CHECK_ALARM_KMS_DISABLE_OR_DELETE_CMK',

  /**
   * Ensure a log metric filter and an alarm exists for AWS Config configuration changes.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_ALARM_AWS_CONFIG_CHANGE = 'AWS_CONFIG_PROCESS_CHECK_ALARM_AWS_CONFIG_CHANGE',

  /**
   * Ensure a log metric filter and an alarm exists for security group changes.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_SECRITY_GROUP_CHANGE = 'AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_SECRITY_GROUP_CHANGE',

  /**
   * Ensure a log metric filter and an alarm exists for changes to Network Access Control Lists (NACL).
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_NACL_CHANGE = 'AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_NACL_CHANGE',

  /**
   * Ensure the routing tables for Amazon VPC peering are "least access". Within the VPC section of the console, examine the route table entries to ensure that the least number of subnets or hosts are required to accomplish the purpose for peering are routable.
   * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
  */
  AWS_CONFIG_PROCESS_CHECK_VPC_PEERING_LEAST_ACCESS = 'AWS_CONFIG_PROCESS_CHECK_VPC_PEERING_LEAST_ACCESS',
}

/**
 * Map of Config Rules so that a control can be referenced by its name
 * @internal
 * */
export class ConfigRuleMappings {

  /**
   * @internal
   * */
  public static all() {
    const standardControlsMap: Record<ConfigRule, IDlzConfigRule> = {
      ACCESS_KEYS_ROTATED: new AccessKeysRotated(),
      CLOUD_TRAIL_CLOUD_WATCH_LOGS_ENABLED: new CloudTrailCloudWatchLogsEnabled(),
      EC2_EBS_ENCRYPTION_BY_DEFAULT: new Ec2EbsEncryptionByDefault(),
      ENCRYPTED_VOLUMES: new EncryptedVolumes(),
      IAM_NO_INLINE_POLICY_CHECK: new IamNoInlinePolicyCheck(),
      IAM_PASSWORD_POLICY: new IamPasswordPolicy(),
      IAM_POLICY_IN_USE: new IamPolicyInUse(),
      IAM_POLICY_NO_STATEMENTS_WITH_ADMIN_ACCESS: new IamPolicyNoStatementsWithAdminAccess(),
      IAM_ROOT_ACCESS_KEY_CHECK: new IamRootAccessKeyCheck(),
      IAM_USER_GROUP_MEMBERSHIP_CHECK: new IamUserGroupMembershipCheck(),
      IAM_USER_NO_POLICIES_CHECK: new IamUserNoPoliciesCheck(),
      IAM_USER_UNUSED_CREDENTIALS_CHECK: new IamUserUnusedCredentialsCheck(),
      INCOMING_SSH_DISABLED: new RestrictedSsh(),
      MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS: new MfaEnabledForIamConsoleAccess(),
      MULTI_REGION_CLOUD_TRAIL_ENABLED: new MultiRegionCloudtrailEnabled(),
      RDS_SNAPSHOT_ENCRYPTED: new RdsSnapshotEncrypted(),
      RDS_STORAGE_ENCRYPTED: new RdsStorageEncrypted(),
      RESTRICTED_INCOMING_TRAFFIC: new RestrictedCommonPorts(),
      ROOT_ACCOUNT_MFA_ENABLED: new RootAccountMfaEnabled(),
      S3_ACCOUNT_LEVEL_PUBLIC_ACCESS_BLOCKS_PERIODIC: new S3AccountLevelPublicAccessBlocksPeriodic(),
      S3_BUCKET_LEVEL_PUBLIC_ACCESS_PROHIBITED: new S3BucketLevelPublicAccessProhibited(),
      S3_BUCKET_LOGGING_ENABLED: new S3BucketLoggingEnabled(),
      S3_BUCKET_PUBLIC_READ_PROHIBITED: new S3BucketPublicReadProhibited(),
      S3_BUCKET_PUBLIC_WRITE_PROHIBITED: new S3BucketPublicWriteProhibited(),
      S3_BUCKET_VERSIONING_ENABLED: new S3BucketVersioningEnabled(),
      AWS_CONFIG_PROCESS_CHECK_ACCOUNT_CONTACT_DETAILS_CONFIGURED: new ProcessCheckAccountContactDetailsConfigured(),
      AWS_CONFIG_PROCESS_CHECK_ACCOUNT_SECURITY_CONTACT_CONFIGURED: new ProcessCheckAccountSecurityContactConfigured(),
      AWS_CONFIG_PROCESS_CHECK_ROOT_ACCOUNT_REGULAR_USE: new ProcessCheckRootAccountRegularUse(),
      AWS_CONFIG_PROCESS_CHECK_IAM_USER_CONSOLE_AND_API_ACCESS_AT_CREATION: new ProcessCheckIamUserConsoleAndApiAccessAtCreation(),
      AWS_CONFIG_PROCESS_CHECK_IAM_USER_SINGLE_ACCESS_KEY: new ProcessCheckIamUserSingleAccessKey(),
      AWS_CONFIG_PROCESS_CHECK_IAM_EXPIRED_CERTIFICATES: new ProcessCheckIamExpiredCertificates(),
      AWS_CONFIG_PROCESS_CHECK_IAM_ACCESS_ANALYZER_ENABLED: new ProcessCheckIamAccessAnalyzerEnabled(),
      AWS_CONFIG_PROCESS_CHECK_ALARM_UNAUTHORIZED_API_CALLS: new ProcessCheckAlarmUnauthorizedApiCalls(),
      AWS_CONFIG_PROCESS_CHECK_ALARM_SIGN_IN_WITHOUT_MFA: new ProcessCheckAlarmSignInWithoutMfa(),
      AWS_CONFIG_PROCESS_CHECK_ALARM_ROOT_ACCOUNT_USE: new ProcessCheckAlarmRootAccountUse(),
      AWS_CONFIG_PROCESS_CHECK_ALARM_IAM_POLICY_CHANGE: new ProcessCheckAlarmIamPolicyChange(),
      AWS_CONFIG_PROCESS_CHECK_ALARM_CLOUDTRAIL_CONFIG_CHANGE: new ProcessCheckAlarmCloudtrailConfigChange(),
      AWS_CONFIG_PROCESS_CHECK_ALARM_S3_BUCKET_POLICY_CHANGE: new ProcessCheckAlarmS3BucketPolicyChange(),
      AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_NETWORK_GATEWAY_CHANGE: new ProcessCheckAlarmVpcNetworkGatewayChange(),
      AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_ROUTE_TABLE_CHANGE: new ProcessCheckAlarmVpcRouteTableChange(),
      AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_CHANGE: new ProcessCheckAlarmVpcChange(),
      AWS_CONFIG_PROCESS_CHECK_ALARM_ORGANIZATIONS_CHANGE: new ProcessCheckAlarmOrganizationsChange(),
      AWS_CONFIG_PROCESS_CHECK_VPC_NETWORKACL_OPEN_ADMIN_PORTS: new ProcessCheckVpcNetworkaclOpenAdminPorts(),
      ACCOUNT_PART_OF_ORGANIZATIONS: new AccountPartOfOrganizations(),
      CLOUD_TRAIL_ENCRYPTION_ENABLED: new CloudTrailEncryptionEnabled(),
      CLOUD_TRAIL_LOG_FILE_VALIDATION_ENABLED: new CloudTrailLogFileValidationEnabled(),
      CLOUDTRAIL_S3_DATAEVENTS_ENABLED: new CloudtrailS3DataeventsEnabled(),
      CMK_BACKING_KEY_ROTATION_ENABLED: new CmkBackingKeyRotationEnabled(),
      ROOT_ACCOUNT_HARDWARE_MFA_ENABLED: new RootAccountHardwareMfaEnabled(),
      S3_BUCKET_SERVER_SIDE_ENCRYPTION_ENABLED: new S3BucketServerSideEncryptionEnabled(),
      S3_BUCKET_SSL_REQUESTS_ONLY: new S3BucketSslRequestsOnly(),
      VPC_DEFAULT_SECURITY_GROUP_CLOSED: new VpcDefaultSecurityGroupClosed(),
      VPC_FLOW_LOGS_ENABLED: new VpcFlowLogsEnabled(),
      AWS_CONFIG_PROCESS_CHECK_CONFIG_ENABLED_ALL_REGIONS: new ProcessCheckConfigEnabledAllRegions(),
      EC2_INSTANCE_PROFILE_ATTACHED: new Ec2InstanceProfileAttached(),
      AWS_CONFIG_PROCESS_CHECK_ALARM_CONSOLE_AUTH_FAILURES: new ProcessCheckAlarmConsoleAuthFailures(),
      AWS_CONFIG_PROCESS_CHECK_ALARM_KMS_DISABLE_OR_DELETE_CMK: new ProcessCheckAlarmKmsDisableOrDeleteCmk(),
      AWS_CONFIG_PROCESS_CHECK_ALARM_AWS_CONFIG_CHANGE: new ProcessCheckAlarmAwsConfigChange(),
      AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_SECRITY_GROUP_CHANGE: new ProcessCheckAlarmVpcSecrityGroupChange(),
      AWS_CONFIG_PROCESS_CHECK_ALARM_VPC_NACL_CHANGE: new ProcessCheckAlarmVpcNaclChange(),
      AWS_CONFIG_PROCESS_CHECK_VPC_PEERING_LEAST_ACCESS: new ProcessCheckVpcPeeringLeastAccess(),
    };
    return standardControlsMap;
  }
}
