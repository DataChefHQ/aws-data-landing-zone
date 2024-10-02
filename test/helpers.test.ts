import * as assert from 'assert';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { DataLandingZone } from '../src';

test('no op', () => {
  console.log('no op, just want to keep the Test helpers close to the tests and not in the /src directory as tsconfig commands');
});

export type DlzResources = ReturnType<typeof getDlzResources>;
export function getDlzResources(dataLandingZone: DataLandingZone) {
  function getStackAndTemplate(stackId: string) {
    const allStacks = [
      ...dataLandingZone.workloadGlobalStacks,
      ...dataLandingZone.workloadRegionalStacks,
      ...dataLandingZone.workloadGlobalNetworkConnectionsPhase1Stacks,
      ...dataLandingZone.workloadGlobalNetworkConnectionsPhase2Stacks,
      ...dataLandingZone.workloadRegionalNetworkConnectionsPhase2Stacks,
      ...dataLandingZone.workloadGlobalNetworkConnectionsPhase3Stacks,
      ...dataLandingZone.workloadRegionalNetworkConnectionsPhase3Stacks,
    ];
    const stack = allStacks.find(stck => stck.id === stackId);
    assert.ok(stack);
    const template = Template.fromStack(stack);
    return { stack, template };
  }

  return {
    dev: {
      workload: {
        base: {
          global: getStackAndTemplate('workloads--development--global--eu-west-1'),
          regional: getStackAndTemplate('workloads--development--regional--us-east-1'),
        },
        ncp1: {
          global: getStackAndTemplate('workloads--development--ncp1-global--eu-west-1'),
        },
        ncp2: {
          global: getStackAndTemplate('workloads--development--ncp2-global--eu-west-1'),
          regional: getStackAndTemplate('workloads--development--ncp2-regional--us-east-1'),
        },
        ncp3: {
          global: getStackAndTemplate('workloads--development--ncp3-global--eu-west-1'),
          regional: getStackAndTemplate('workloads--development--ncp3-regional--us-east-1'),
        },
      },
    },
    prod: {
      workload: {
        base: {
          global: getStackAndTemplate('workloads--production--global--eu-west-1'),
          regional: getStackAndTemplate('workloads--production--regional--us-east-1'),
        },
        ncp1: {
          global: getStackAndTemplate('workloads--production--ncp1-global--eu-west-1'),
        },
        ncp2: {
          global: getStackAndTemplate('workloads--production--ncp2-global--eu-west-1'),
          regional: getStackAndTemplate('workloads--production--ncp2-regional--us-east-1'),
        },
        ncp3: {
          global: getStackAndTemplate('workloads--production--ncp3-global--eu-west-1'),
          regional: getStackAndTemplate('workloads--production--ncp3-regional--us-east-1'),
        },
      },

    },
  };
}

/**
 *
 * @param template The template the CustomResource is defined in
 * @param accountId That the SSM param is defined in
 * @param region That the SSM param is defined in
 * @param name Name of the SSM param
 */
export function findDlzSsmReaderLogicalId(template: Template, accountId: string, region: string, name: string) {
  const dlzSsmReader = Object.entries(template.findResources('Custom::DlzSsmReader'))
    .map(([key, value]) => {
      const props = JSON.parse(value.Properties.Create);
      return { logicalId: key, properties: { ...props } };
    })
    .find(ssmReader =>
      ssmReader.properties.assumedRoleArn.includes(accountId) &&
      ssmReader.properties.region === region &&
      ssmReader.properties.parameters.Name === name,
    );

  if (!dlzSsmReader?.logicalId) {
    console.error(`Could not find matching Custom::DlzSsmReader resources for: ${accountId}, ${region}, ${name}`);
    console.error('Below are all the Custom::DlzSsmReader resources found in the template:');
    const mappedDlzSsmParams = Object.entries(template.findResources('Custom::DlzSsmReader'))
      .map(([key, value]) => {
        const props = JSON.parse(value.Properties.Create);
        return { logicalId: key, region: props.region, assumedRoleArn: props.assumedRoleArn, name: props.parameters.Name };
      });
    console.error(mappedDlzSsmParams);
  }

  return dlzSsmReader?.logicalId;
}

export function getResourceLogicalIdFromProperties(template: Template, resource: string,
  properties: {[key: string]: any}) {
  const foundResources = Object.entries(template.findResources(resource))
    .map(([key, value]) => {
      return { logicalId: key, ...value };
    });
  let matchingResource;
  for (const foundResource of foundResources) {
    const matcher = Match.objectLike(properties);
    const result = matcher.test(foundResource);
    if (result.isSuccess) {
      matchingResource = foundResource;
      break;
    }
  }

  return matchingResource?.logicalId;
}


