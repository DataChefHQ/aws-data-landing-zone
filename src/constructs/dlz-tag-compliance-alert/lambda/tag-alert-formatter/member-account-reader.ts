import { CloudTrailClient, LookupEventsCommand } from '@aws-sdk/client-cloudtrail';
import { ConfigServiceClient, GetResourceConfigHistoryCommand } from '@aws-sdk/client-config-service';
import { ResourceGroupsTaggingAPIClient, GetResourcesCommand } from '@aws-sdk/client-resource-groups-tagging-api';
import { STSClient, AssumeRoleCommand } from '@aws-sdk/client-sts';

/** How far back to look for the event that created the resource. */
const CREATION_LOOKBACK_HOURS = 24;

export interface AwsCredentials {
  readonly accessKeyId: string;
  readonly secretAccessKey: string;
  readonly sessionToken: string;
}

export interface CreatorLookup {
  /** `true` when an AWS service created the resource, so nobody should be alerted about it. */
  readonly createdByAwsService: boolean;
  /** Readable creator, e.g. `user` or `role/GitHubDeploy`. Absent when no event was found. */
  readonly createdBy?: string;
  /** `true` when no creation event was found in the lookback window. */
  readonly noEventFound: boolean;
}

const sts = new STSClient({});
const credentialsCache: Record<string, AwsCredentials> = {};

export async function assumeReadRole(accountId: string, roleName: string): Promise<AwsCredentials> {
  const cached = credentialsCache[accountId];
  if (cached) {
    return cached;
  }
  const assumed = await sts.send(new AssumeRoleCommand({
    RoleArn: `arn:aws:iam::${accountId}:role/${roleName}`,
    RoleSessionName: 'dlz-tag-alert-formatter',
    DurationSeconds: 900,
  }));
  const credentials: AwsCredentials = {
    accessKeyId: assumed.Credentials!.AccessKeyId!,
    secretAccessKey: assumed.Credentials!.SecretAccessKey!,
    sessionToken: assumed.Credentials!.SessionToken!,
  };
  credentialsCache[accountId] = credentials;
  return credentials;
}

export interface RecordedResource {
  readonly arn?: string;
  readonly resourceName?: string;
  readonly tagKeys: string[];
}

/**
 * The resource as AWS Config last recorded it. The compliance event carries only a resource type
 * and id, so this is where the ARN and the resource name come from — the ARN to read live tags
 * with, the name to search CloudTrail with.
 */
export async function recordedResource(
  resourceType: string,
  resourceId: string,
  region: string,
  credentials: AwsCredentials,
): Promise<RecordedResource> {
  const configService = new ConfigServiceClient({ region, credentials });
  const response = await configService.send(new GetResourceConfigHistoryCommand({
    resourceType: resourceType as any,
    resourceId,
    limit: 1,
  }));
  const item = response.configurationItems?.[0];
  const tags = item?.tags ?? {};
  return {
    arn: item?.arn,
    resourceName: item?.resourceName,
    tagKeys: Object.entries(tags).filter(([, value]) => value).map(([key]) => key),
  };
}

/**
 * Tag keys the resource carries right now, read from the resource itself rather than from the
 * configuration item that triggered the finding. AWS Config evaluates a resource as soon as it
 * appears, which is often before its tags are applied, so the finding can already be stale.
 *
 * `GetResources` omits resources that have never been tagged, so an empty result means no tags.
 */
export async function liveTagKeys(
  arn: string,
  region: string,
  credentials: AwsCredentials,
): Promise<string[]> {
  const tagging = new ResourceGroupsTaggingAPIClient({ region, credentials });
  const response = await tagging.send(new GetResourcesCommand({ ResourceARNList: [arn] }));
  const tags = response.ResourceTagMappingList?.[0]?.Tags ?? [];
  return tags.filter(tag => tag.Value).map(tag => tag.Key!);
}

/**
 * Who created the resource, from its CloudTrail history.
 *
 * `userIdentity.invokedBy` is documented to be present only when an AWS service made the request —
 * it covers forward access sessions, service principals, service-linked roles and service roles —
 * so it is the whole test. A resource whose recent history is entirely AWS-driven was made by AWS
 * and cannot be tagged by us.
 *
 * The lookback is deliberately short. Config reports a resource as non-compliant once, when it
 * first appears, so a finding arriving now is about a resource created just now. Finding no event
 * means the resource is older than the window, and an old resource is out of scope.
 */
export async function lookupCreator(
  resourceName: string,
  region: string,
  credentials: AwsCredentials,
  now: Date,
): Promise<CreatorLookup> {
  const cloudTrail = new CloudTrailClient({ region, credentials });
  const response = await cloudTrail.send(new LookupEventsCommand({
    LookupAttributes: [{ AttributeKey: 'ResourceName', AttributeValue: resourceName }],
    StartTime: new Date(now.getTime() - CREATION_LOOKBACK_HOURS * 60 * 60 * 1000),
    EndTime: now,
  }));

  const events = response.Events ?? [];
  if (events.length === 0) {
    return { createdByAwsService: false, noEventFound: true };
  }

  const identities = events.map(event => userIdentityOf(event.CloudTrailEvent));
  const humanIdentity = identities.find(identity => identity && !identity.awsService);
  if (!humanIdentity) {
    return { createdByAwsService: true, noEventFound: false };
  }
  return { createdByAwsService: false, createdBy: humanIdentity.name, noEventFound: false };
}

interface EventIdentity {
  readonly awsService: boolean;
  readonly name: string;
}

function userIdentityOf(cloudTrailEvent?: string): EventIdentity | undefined {
  if (!cloudTrailEvent) {
    return undefined;
  }
  let parsed;
  try {
    parsed = JSON.parse(cloudTrailEvent);
  } catch {
    return undefined;
  }
  const identity = parsed.userIdentity ?? {};
  const awsService = identity.invokedBy !== undefined
    || identity.type === 'AWSService'
    || `${identity.sessionContext?.sessionIssuer?.arn ?? ''}`.includes(':role/aws-service-role/');
  return { awsService, name: readableName(identity) };
}

function readableName(identity: Record<string, any>): string {
  const roleName = identity.sessionContext?.sessionIssuer?.userName;
  if (identity.userName && roleName) {
    return `${identity.userName} (role: ${roleName})`;
  }
  return identity.userName ?? roleName ?? identity.type ?? 'unknown';
}
