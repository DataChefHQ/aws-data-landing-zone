import * as assert from 'assert';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { DataLandingZone } from '../src';

test('no op', () => {
  // no op, just want to keep the Test helpers close to the tests and not in the /src directory as tsconfig commands
  expect(true).toBe(true);
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
          global: getStackAndTemplate('workloads--base--global_development--development_eu-west-1'),
          regional: getStackAndTemplate('workloads--base--regional_development--development_us-east-1'),
        },
        ncp1: {
          global: getStackAndTemplate('workloads--ncp1--global_development--development_eu-west-1'),
        },
        ncp2: {
          global: getStackAndTemplate('workloads--ncp2--global_development--development_eu-west-1'),
          regional: getStackAndTemplate('workloads--ncp2--regional_development--development_us-east-1'),
        },
        ncp3: {
          global: getStackAndTemplate('workloads--ncp3--global_development--development_eu-west-1'),
          regional: getStackAndTemplate('workloads--ncp3--regional_development--development_us-east-1'),
        },
      },
    },
    prod: {
      workload: {
        base: {
          global: getStackAndTemplate('workloads--base--global_production--production_eu-west-1'),
          regional: getStackAndTemplate('workloads--base--regional_production--production_us-east-1'),
        },
        ncp1: {
          global: getStackAndTemplate('workloads--ncp1--global_production--production_eu-west-1'),
        },
        ncp2: {
          global: getStackAndTemplate('workloads--ncp2--global_production--production_eu-west-1'),
          regional: getStackAndTemplate('workloads--ncp2--regional_production--production_us-east-1'),
        },
        ncp3: {
          global: getStackAndTemplate('workloads--ncp3--global_production--production_eu-west-1'),
          regional: getStackAndTemplate('workloads--ncp3--regional_production--production_us-east-1'),
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


export function cdkTemplateToJson(template: Template, normalizeAssetPaths: boolean = true) {
  const json = template.toJSON();
  if (normalizeAssetPaths) {
    const lambdas = template.findResources('AWS::Lambda::Function');
    const keys = Object.keys(lambdas);
    for (const key of keys) {
      json.Resources[key].Properties.Code.S3Key = 'REMOVED-BECAUSE-WE-ARE-NOT-INTERESTED-IN-ASSET-CHANGES';
    }
  }
  return json;
}