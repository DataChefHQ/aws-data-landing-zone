import { Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * The maximum number of resources/constructs that can be created/updated/deleted at a given time. This is to avoid
 * hitting the CloudFormation resource limits that are per service/resource. For example, we can only create 10
 * ControlTower Controls at a time. This would make sure that we don't hit the limit and only create 10 at a time.
 * @param constructs
 * @param max
 */
export function limitCfnExecutions(constructs: Construct[], max: number): void {
  const chunks: Construct[][] = [];
  while (constructs.length > 0) {
    chunks.push(constructs.splice(0, max));
  }

  /* Let each chunk of constructs depend on each element in the previous chunk */
  for (let i = 1; i < chunks.length; i++) {
    const chunk = chunks[i];
    const previousChunk = chunks[i - 1];
    setDependencies(chunk, previousChunk);
  }
}

/**
 * Set dependencies between resources in the current chunk and resources in the previous chunk.
 */
function setDependencies(currentChunk: Construct[], previousChunk: Construct[]): void {
  for (const resource of currentChunk) {
    for (const previousChunkResource of previousChunk) {
      resource.node.addDependency(previousChunkResource);
    }
  }
}


/**
 * Changes a CDK Duration to an ISO8601 string in the format of PTxHxM
 * For example, 1 hour and 30 minutes would be PT1H30M
 * @param duration
 */
export function durationToIso8601(duration: Duration): string {
  const totalMinutes = duration.toMinutes();
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let isoString = 'PT';
  if (hours > 0) {
    isoString += `${hours}H`;
  }
  if (minutes > 0) {
    isoString += `${minutes}M`;
  }

  return isoString;
}