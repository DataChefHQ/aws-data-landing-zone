import { App } from 'aws-cdk-lib';
import {
  DlzResources,
  findDlzSsmReaderLogicalId,
  getDlzResources,
  //@ts-ignore
} from './helpers.test';
import {
  DataLandingZone, DataLandingZoneProps,
  DlzAccountType,
  Region,
} from '../src';
import { NetworkAddress } from '../src/constructs/dlz-vpc/network-address';
import { Defaults } from '../src/defaults';
//@ts-ignore
import { SSM_PARAMETERS_DLZ } from '../src/stacks/organization/constants';


const configBase: DataLandingZoneProps = {
  localProfile: 'ct-sandbox-exported',
  regions: {
    global: Region.EU_WEST_1,
    regional: [Region.US_EAST_1],
  },
  mandatoryTags: {
    owner: [],
    project: [],
    environment: [],
  },
  budgets: [],
  securityHubNotifications: [],
  organization: {
    organizationId: 'o-05ev6vk6fa',
    root: {
      accounts: {
        management: {
          accountId: '882070149987',
        },
      },
    },
    ous: {
      security: {
        ouId: 'ou-vh4d-lpyovlyp',
        accounts: {
          log: {
            accountId: '730335597466',
          },
          audit: {
            accountId: '851725452335',
          },
        },
      },
      workloads: {
        ouId: 'ou-vh4d-nc2zzf9z',
        accounts: [
          {
            name: 'development',
            accountId: '381491899779',
            type: DlzAccountType.DEVELOP,
            vpcs: [
              Defaults.defaultVpcClassB3Private3Public(Region.US_EAST_1, '10.0.0.0/16'),
              Defaults.defaultVpcClassB3Private3Public(Region.EU_WEST_1, '10.1.0.0/16'),
            ],
          },
          {
            name: 'production',
            accountId: '234567890123',
            type: DlzAccountType.PRODUCTION,
            vpcs: [
              Defaults.defaultVpcClassB3Private3Public(Region.US_EAST_1, '10.2.0.0/16'),
              Defaults.defaultVpcClassB3Private3Public(Region.EU_WEST_1, '10.3.0.0/16'),
            ],
          },
        ],
      },
      suspended: {
        ouId: 'ou-vh4d-rhcmhzsy',
      },
    },

  },
  network: {
    connections: {
      vpcPeering: [

      ],
    },
  },

  printDeploymentOrder: false,
  saveReport: false,
  printReport: false,
};

/* Disable Jest's console.log that adds the location of log lines. Only applies when debugging/stops within a test.
* Not a full run of all tests. */
// eslint-disable-next-line @typescript-eslint/no-require-imports
global.console = require('console');

function ncp1CheckVpcPeeringRoleCreation(dlzResources: DlzResources,
  definedInAccountType: 'prod' | 'dev',
  roleNameSuffix: string,
  roleDescriptionSuffix: string, toBeAssumedByAccountType: 'prod' | 'dev') {
  dlzResources[definedInAccountType].workload.ncp1.global.template.hasResourceProperties('AWS::IAM::Role', {
    RoleName: `dlz-ncp1-global-vpc-peering-role-for-${roleNameSuffix}`,
    Description: `VPC Peering Role for ${roleDescriptionSuffix}`,
    AssumeRolePolicyDocument: {
      Statement: [
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: {
            AWS: {
              'Fn::Join': [
                '',
                [
                  'arn:',
                  {
                    Ref: 'AWS::Partition',
                  },
                  `:iam::${dlzResources[toBeAssumedByAccountType].workload.ncp1.global.stack.accountId}:root`,
                ],
              ],
            },
          },
        },
      ],
    },
  });
}

function ncp2CheckVpcPeeringConnection(dlzResources: DlzResources,
  fromAccount: 'prod' | 'dev', fromRegion: 'global' | 'regional',
  toAccount: 'prod' | 'dev', toRegion: 'global' | 'regional',
  fromVpcAddress: string, toVpcAddress: string,
) {

  let peeringRoleLogicalId: string | undefined;
  if (fromAccount !== toAccount) {
    /* Get the logical ID of the peering role defined in NCP1 above within the destination account */
    const vpcPeeringRolesKey = `${dlzResources[fromAccount].workload.ncp2.global.stack.accountId}-${dlzResources[toAccount].workload.ncp2.global.stack.accountId}`;
    peeringRoleLogicalId = findDlzSsmReaderLogicalId(
      dlzResources[fromAccount].workload.ncp2[fromRegion].template,
      dlzResources[toAccount].workload.ncp1.global.stack.accountId,
      dlzResources[toAccount].workload.ncp1.global.stack.region,
      `${SSM_PARAMETERS_DLZ.NETWORKING_VPC_PEERING_ROLE_PREFIX}${vpcPeeringRolesKey}`);
    expect(peeringRoleLogicalId).toBeDefined();
  }

  /* Get the logical ID of the peering VPC defined in REGIONAL of the destination account */
  const peeringVpcLogicalId = findDlzSsmReaderLogicalId(
    // prod , us-east-1
    dlzResources[fromAccount].workload.ncp2[fromRegion].template,
    dlzResources[toAccount].workload.base[toRegion].stack.accountId,
    dlzResources[toAccount].workload.base[toRegion].stack.region,
    `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${toVpcAddress}/id`);
  expect(peeringVpcLogicalId).toBeDefined();

  /* Get the logical ID of the owner VPC defined in GLOBAL of the source account */
  const ownerVpcLogicalId = findDlzSsmReaderLogicalId(
    dlzResources[fromAccount].workload.ncp2[fromRegion].template,
    dlzResources[fromAccount].workload.base[fromRegion].stack.accountId,
    dlzResources[fromAccount].workload.base[fromRegion].stack.region,
    `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${fromVpcAddress}/id`);
  expect(ownerVpcLogicalId).toBeDefined();

  const peeringRoleArnMaybe = peeringRoleLogicalId ? {
    PeerRoleArn: {
      'Fn::GetAtt': [
        peeringRoleLogicalId,
        'Parameter.Value',
      ],
    },
  } : {};
  dlzResources[fromAccount].workload.ncp2[fromRegion].template.hasResourceProperties(
    'AWS::EC2::VPCPeeringConnection', {
      VpcId: {
        'Fn::GetAtt': [
          ownerVpcLogicalId,
          'Parameter.Value',
        ],
      },
      PeerVpcId: {
        'Fn::GetAtt': [
          peeringVpcLogicalId,
          'Parameter.Value',
        ],
      },
      PeerOwnerId: dlzResources[toAccount].workload.ncp2[fromRegion].stack.accountId,
      PeerRegion: toRegion === 'global' ? 'eu-west-1' : 'us-east-1',
      ...peeringRoleArnMaybe,
    });
}

type RoutesPeeringConnectionProps = {
  account: 'prod' | 'dev';
  region: 'global' | 'regional';
  fromVpcAddress: string;
  toVpcAddress: string;
}
function ncp3CheckRoutes(dlzResources: DlzResources,
  routesAccount: 'prod' | 'dev', routesRegion: 'global' | 'regional',
  routeTablePartialAddress: string,
  peering: RoutesPeeringConnectionProps,
  destinationSubnetCidrs: string[],
) {
  /* Find the logical ID of the route table defined in GLOBAL of the source account */
  const routeTableLogicalId = findDlzSsmReaderLogicalId(
    dlzResources[routesAccount].workload.ncp3[routesRegion].template,
    dlzResources[routesAccount].workload.base[routesRegion].stack.accountId,
    dlzResources[routesAccount].workload.base[routesRegion].stack.region,
    `/dlz/networking-entity/vpc/${routeTablePartialAddress}/id`);
  // development.eu-west-1.default.private

  /* Find the logical ID of the VPC Peering Connection defined in GLOBAL of the source account */
  const vpcPeeringConnectionLogicalId = findDlzSsmReaderLogicalId(
    dlzResources[peering.account].workload.ncp3[peering.region].template,
    dlzResources[peering.account].workload.ncp2[peering.region].stack.accountId,
    dlzResources[peering.account].workload.ncp2[peering.region].stack.region,
    `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${peering.fromVpcAddress}/peer/${peering.toVpcAddress}/id`);

  expect(vpcPeeringConnectionLogicalId).toBeDefined();

  for (const subnet of destinationSubnetCidrs) {
    dlzResources[routesAccount].workload.ncp3[routesRegion].template.hasResourceProperties('AWS::EC2::Route', {
      DestinationCidrBlock: subnet,
      RouteTableId: {
        'Fn::GetAtt': [
          routeTableLogicalId,
          'Parameter.Value',
        ],
      },
      VpcPeeringConnectionId: {
        'Fn::GetAtt': [
          vpcPeeringConnectionLogicalId,
          'Parameter.Value',
        ],
      },
    });
  }
}


describe('vpt.1 Single Dev global subnet to Single Prod Subnet regional subnet', () => {

  let dlzResources: DlzResources;
  beforeAll(() => {
    const app = new App();
    const config: DataLandingZoneProps = {
      ...configBase,
      network: {
        connections: {
          vpcPeering: [
            {
              source: new NetworkAddress('development', Region.EU_WEST_1, 'default', 'private'),
              destination: NetworkAddress.fromString('production.us-east-1.default.private'),
            },
          ],
        },
      },
    };

    const dataLandingZone = new DataLandingZone(app, config);
    dlzResources = getDlzResources(dataLandingZone);
  });

  test('Peering Role', () => {
    ncp1CheckVpcPeeringRoleCreation(dlzResources, 'prod', 'development', '\'development\' to \'production\'', 'dev');
  });

  test('VPC Peering Connection', () => {
    ncp2CheckVpcPeeringConnection(dlzResources,
      'dev', 'global',
      'prod', 'regional',
      'development.eu-west-1.default', 'production.us-east-1.default',
    );
  });

  test('Routes', () => {

    const peeringConnection: RoutesPeeringConnectionProps = {
      account: 'dev',
      region: 'global',
      fromVpcAddress: 'development.eu-west-1.default',
      toVpcAddress: 'production.us-east-1.default',
    };
    ncp3CheckRoutes(dlzResources,
      'dev', 'global',
      'development.eu-west-1.default.private',
      peeringConnection,
      [
        '10.2.0.0/19',
        '10.2.32.0/19',
        '10.2.64.0/19',
      ]);
    ncp3CheckRoutes(dlzResources,
      'prod', 'regional',
      'production.us-east-1.default.private',
      peeringConnection,
      [
        '10.1.0.0/19',
        '10.1.32.0/19',
        '10.1.64.0/19',
      ]);
  });

});

describe('vpt.2 All Dev VPCs subnets to Single Prod regional subnet', () => {

  let dlzResources: DlzResources;
  beforeAll(() => {
    const app = new App();
    const config: DataLandingZoneProps = {
      ...configBase,
      network: {
        connections: {
          vpcPeering: [
            {
              source: new NetworkAddress('development'),
              destination: NetworkAddress.fromString('production.us-east-1.default.private'),
            },
          ],
        },
      },
    };

    const dataLandingZone = new DataLandingZone(app, config);
    dlzResources = getDlzResources(dataLandingZone);
  });

  test('Peering Role', () => {
    ncp1CheckVpcPeeringRoleCreation(dlzResources, 'prod', 'development', '\'development\' to \'production\'', 'dev');

  });

  test('VPC Peering Connection', () => {
    ncp2CheckVpcPeeringConnection(dlzResources,
      'dev', 'global',
      'prod', 'regional',
      'development.eu-west-1.default', 'production.us-east-1.default',
    );
    ncp2CheckVpcPeeringConnection(dlzResources,
      'dev', 'regional',
      'prod', 'regional',
      'development.us-east-1.default', 'production.us-east-1.default',
    );
  });

  test('Routes', () => {
    const peeringConnectionDevGlobal: RoutesPeeringConnectionProps = {
      account: 'dev',
      region: 'global',
      fromVpcAddress: 'development.eu-west-1.default',
      toVpcAddress: 'production.us-east-1.default',
    };
    const peeringConnectionDevRegional: RoutesPeeringConnectionProps = {
      account: 'dev',
      region: 'regional',
      fromVpcAddress: 'development.us-east-1.default',
      toVpcAddress: 'production.us-east-1.default',
    };

    /* From Dev to Prod */
    ncp3CheckRoutes(dlzResources, 'dev', 'global',
      'development.eu-west-1.default.private',
      peeringConnectionDevGlobal,
      [
        '10.2.0.0/19',
        '10.2.32.0/19',
        '10.2.64.0/19',
      ]);
    ncp3CheckRoutes(dlzResources, 'dev', 'global',
      'development.eu-west-1.default.public',
      peeringConnectionDevGlobal,
      [
        '10.2.0.0/19',
        '10.2.32.0/19',
        '10.2.64.0/19',
      ]);
    dlzResources.dev.workload.ncp3.global.template.resourceCountIs('AWS::EC2::Route', 6);

    ncp3CheckRoutes(dlzResources, 'dev', 'regional',
      'development.us-east-1.default.private',
      peeringConnectionDevRegional,
      [
        '10.2.0.0/19',
        '10.2.32.0/19',
        '10.2.64.0/19',
      ]);
    ncp3CheckRoutes(dlzResources, 'dev', 'regional',
      'development.us-east-1.default.public',
      peeringConnectionDevRegional,
      [
        '10.2.0.0/19',
        '10.2.32.0/19',
        '10.2.64.0/19',
      ]);
    dlzResources.dev.workload.ncp3.regional.template.resourceCountIs('AWS::EC2::Route', 6);


    /* From Prod back to Dev */
    ncp3CheckRoutes(dlzResources, 'prod', 'regional',
      'production.us-east-1.default.private',
      peeringConnectionDevGlobal,
      [
        //ALL VPC dev global subnets
        '10.1.0.0/19',
        '10.1.32.0/19',
        '10.1.64.0/19',
        '10.1.96.0/19',
        '10.1.128.0/19',
        '10.1.160.0/19',

      ]);
    ncp3CheckRoutes(dlzResources, 'prod', 'regional',
      'production.us-east-1.default.private',
      peeringConnectionDevRegional,
      [
        //ALL VPC dev regional subnets
        '10.0.0.0/19',
        '10.0.32.0/19',
        '10.0.64.0/19',
        '10.0.96.0/19',
        '10.0.128.0/19',
        '10.0.160.0/19',
      ]);
    dlzResources.prod.workload.ncp3.regional.template.resourceCountIs('AWS::EC2::Route', 12);
  });

});

describe('vpt.3 All Dev VPCs Subnets to all Prod VPCs Subnets', () => {

  let dlzResources: DlzResources;
  beforeAll(() => {
    const app = new App();
    const config: DataLandingZoneProps = {
      ...configBase,
      network: {
        connections: {
          vpcPeering: [
            {
              source: new NetworkAddress('development'),
              destination: NetworkAddress.fromString('production'),
            },
          ],
        },
      },
    };

    const dataLandingZone = new DataLandingZone(app, config);
    dlzResources = getDlzResources(dataLandingZone);
  });

  test('Peering Role', () => {
    ncp1CheckVpcPeeringRoleCreation(dlzResources, 'prod', 'development', '\'development\' to \'production\'', 'dev');
  });

  test('VPC Peering Connection', () => {
    //NEW
    ncp2CheckVpcPeeringConnection(dlzResources,
      'dev', 'global',
      'prod', 'global',
      'development.eu-west-1.default', 'production.eu-west-1.default',
    );
    ncp2CheckVpcPeeringConnection(dlzResources,
      'dev', 'global',
      'prod', 'regional',
      'development.eu-west-1.default', 'production.us-east-1.default',
    );
    dlzResources.dev.workload.ncp2.global.template.resourceCountIs('AWS::EC2::VPCPeeringConnection', 2);

    // NEW
    ncp2CheckVpcPeeringConnection(dlzResources,
      'dev', 'regional',
      'prod', 'regional',
      'development.us-east-1.default', 'production.us-east-1.default',
    );
    ncp2CheckVpcPeeringConnection(dlzResources,
      'dev', 'regional',
      'prod', 'global',
      'development.us-east-1.default', 'production.eu-west-1.default',
    );
  });

  test('Routes', () => {

    /* DEV */
    /* Dev Global Private */
    ncp3CheckRoutes(dlzResources, 'dev', 'global',
      'development.eu-west-1.default.private',
      {
        account: 'dev',
        region: 'global',
        fromVpcAddress: 'development.eu-west-1.default',
        toVpcAddress: 'production.us-east-1.default',
      },
      [
        '10.2.0.0/19',
        '10.2.32.0/19',
        '10.2.64.0/19',
        '10.2.96.0/19',
        '10.2.128.0/19',
        '10.2.160.0/19',
      ]);
    ncp3CheckRoutes(dlzResources, 'dev', 'global',
      'development.eu-west-1.default.private',
      {
        account: 'dev',
        region: 'global',
        fromVpcAddress: 'development.eu-west-1.default',
        toVpcAddress: 'production.eu-west-1.default',
      },
      [
        '10.3.0.0/19',
        '10.3.32.0/19',
        '10.3.64.0/19',
        '10.3.96.0/19',
        '10.3.128.0/19',
        '10.3.160.0/19',
      ]);
    /* Dev Global Public */
    ncp3CheckRoutes(dlzResources, 'dev', 'global',
      'development.eu-west-1.default.public',
      {
        account: 'dev',
        region: 'global',
        fromVpcAddress: 'development.eu-west-1.default',
        toVpcAddress: 'production.us-east-1.default',
      },
      [
        '10.2.0.0/19',
        '10.2.32.0/19',
        '10.2.64.0/19',
        '10.2.96.0/19',
        '10.2.128.0/19',
        '10.2.160.0/19',
      ]);
    ncp3CheckRoutes(dlzResources, 'dev', 'global',
      'development.eu-west-1.default.public',
      {
        account: 'dev',
        region: 'global',
        fromVpcAddress: 'development.eu-west-1.default',
        toVpcAddress: 'production.eu-west-1.default',
      },
      [
        '10.3.0.0/19',
        '10.3.32.0/19',
        '10.3.64.0/19',
        '10.3.96.0/19',
        '10.3.128.0/19',
        '10.3.160.0/19',
      ]);
    dlzResources.dev.workload.ncp3.global.template.resourceCountIs('AWS::EC2::Route', 24);

    /* Dev Regional Private */
    ncp3CheckRoutes(dlzResources, 'dev', 'regional',
      'development.us-east-1.default.private',
      {
        account: 'dev',
        region: 'regional',
        fromVpcAddress: 'development.us-east-1.default',
        toVpcAddress: 'production.us-east-1.default',
      },
      [
        '10.2.0.0/19',
        '10.2.32.0/19',
        '10.2.64.0/19',
        '10.2.96.0/19',
        '10.2.128.0/19',
        '10.2.160.0/19',
      ]);
    ncp3CheckRoutes(dlzResources, 'dev', 'regional',
      'development.us-east-1.default.private',
      {
        account: 'dev',
        region: 'regional',
        fromVpcAddress: 'development.us-east-1.default',
        toVpcAddress: 'production.eu-west-1.default',
      },
      [
        '10.3.0.0/19',
        '10.3.32.0/19',
        '10.3.64.0/19',
        '10.3.96.0/19',
        '10.3.128.0/19',
        '10.3.160.0/19',
      ]);
    /* Dev Regional Public */
    ncp3CheckRoutes(dlzResources, 'dev', 'regional',
      'development.us-east-1.default.public',
      {
        account: 'dev',
        region: 'regional',
        fromVpcAddress: 'development.us-east-1.default',
        toVpcAddress: 'production.us-east-1.default',
      },
      [
        '10.2.0.0/19',
        '10.2.32.0/19',
        '10.2.64.0/19',
        '10.2.96.0/19',
        '10.2.128.0/19',
        '10.2.160.0/19',
      ]);
    ncp3CheckRoutes(dlzResources, 'dev', 'regional',
      'development.us-east-1.default.public',
      {
        account: 'dev',
        region: 'regional',
        fromVpcAddress: 'development.us-east-1.default',
        toVpcAddress: 'production.eu-west-1.default',
      },
      [
        '10.3.0.0/19',
        '10.3.32.0/19',
        '10.3.64.0/19',
        '10.3.96.0/19',
        '10.3.128.0/19',
        '10.3.160.0/19',
      ]);
    dlzResources.dev.workload.ncp3.global.template.resourceCountIs('AWS::EC2::Route', 24);
    dlzResources.dev.workload.ncp3.regional.template.resourceCountIs('AWS::EC2::Route', 24);

    // ======================================================================================================

    /* Prod */
    /* Prod Global Private */
    ncp3CheckRoutes(dlzResources, 'prod', 'global',
      'production.eu-west-1.default.private',
      {
        account: 'dev',
        region: 'global',
        fromVpcAddress: 'development.eu-west-1.default',
        toVpcAddress: 'production.eu-west-1.default',
      },
      [
        '10.1.0.0/19',
        '10.1.32.0/19',
        '10.1.64.0/19',
        '10.1.96.0/19',
        '10.1.128.0/19',
        '10.1.160.0/19',
      ]);
    ncp3CheckRoutes(dlzResources, 'prod', 'global',
      'production.eu-west-1.default.private',
      {
        account: 'dev',
        region: 'regional',
        fromVpcAddress: 'development.us-east-1.default',
        toVpcAddress: 'production.eu-west-1.default',
      },
      [
        '10.0.0.0/19',
        '10.0.32.0/19',
        '10.0.64.0/19',
        '10.0.96.0/19',
        '10.0.128.0/19',
        '10.0.160.0/19',
      ]);

    /* Dev Global Public */
    ncp3CheckRoutes(dlzResources, 'prod', 'regional',
      'production.us-east-1.default.public',
      {
        account: 'dev',
        region: 'global',
        fromVpcAddress: 'development.eu-west-1.default',
        toVpcAddress: 'production.us-east-1.default',
      },
      [
        '10.1.0.0/19',
        '10.1.32.0/19',
        '10.1.64.0/19',
        '10.1.96.0/19',
        '10.1.128.0/19',
        '10.1.160.0/19',
      ]);
    ncp3CheckRoutes(dlzResources, 'prod', 'regional',
      'production.us-east-1.default.public',
      {
        account: 'dev',
        region: 'regional',
        fromVpcAddress: 'development.us-east-1.default',
        toVpcAddress: 'production.us-east-1.default',
      },
      [
        '10.0.0.0/19',
        '10.0.32.0/19',
        '10.0.64.0/19',
        '10.0.96.0/19',
        '10.0.128.0/19',
        '10.0.160.0/19',
      ]);
    dlzResources.prod.workload.ncp3.global.template.resourceCountIs('AWS::EC2::Route', 24);
    dlzResources.prod.workload.ncp3.regional.template.resourceCountIs('AWS::EC2::Route', 24);

  });

});

describe('vpt.4 Private subnets of Dev Account global VPC to Dev Account regional VPC', () => {

  let dlzResources: DlzResources;
  beforeAll(() => {
    const app = new App();
    const config: DataLandingZoneProps = {
      ...configBase,
      network: {
        connections: {
          vpcPeering: [
            {
              source: new NetworkAddress('development', Region.EU_WEST_1, 'default', 'private'),
              destination: new NetworkAddress('development', Region.US_EAST_1, 'default', 'private'),
            },
          ],
        },
      },
    };

    const dataLandingZone = new DataLandingZone(app, config);
    dlzResources = getDlzResources(dataLandingZone);
  });

  test('No Peering Role', () => {
    dlzResources.dev.workload.ncp1.global.template.resourcePropertiesCountIs('AWS::IAM::Role', {
      RoleName: 'dlz-ncp1-global-vpc-peering-role-for-development',
      Description: "VPC Peering Role for 'development' to 'development'",
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              AWS: {
                'Fn::Join': [
                  '',
                  [
                    'arn:',
                    {
                      Ref: 'AWS::Partition',
                    },
                    `:iam::${dlzResources.dev.workload.ncp1.global.stack.accountId}:root`,
                  ],
                ],
              },
            },
          },
        ],
      },
    }, 0);
  });

  test('VPC Peering Connection', () => {
    ncp2CheckVpcPeeringConnection(dlzResources,
      'dev', 'global',
      'dev', 'regional',
      'development.eu-west-1.default', 'development.us-east-1.default',
    );
  });

  test('Routes', () => {
    const peeringConnection: RoutesPeeringConnectionProps = {
      account: 'dev',
      region: 'global',
      fromVpcAddress: 'development.eu-west-1.default',
      toVpcAddress: 'development.us-east-1.default',
    };
    ncp3CheckRoutes(dlzResources,
      'dev', 'global',
      'development.eu-west-1.default.private',
      peeringConnection,
      [
        '10.0.0.0/19',
        '10.0.32.0/19',
        '10.0.64.0/19',
      ]);
    ncp3CheckRoutes(dlzResources,
      'dev', 'regional',
      'development.us-east-1.default.private',
      peeringConnection,
      [
        '10.1.0.0/19',
        '10.1.32.0/19',
        '10.1.64.0/19',
      ]);
  });

});

describe('vpt.5 All Dev VPCs private subnets to Single Prod regional Subnet - Represented as two connections', () => {

  let dlzResources: DlzResources;
  beforeAll(() => {
    const app = new App();
    const config: DataLandingZoneProps = {
      ...configBase,
      network: {
        connections: {
          vpcPeering: [
            {
              source: new NetworkAddress('development', Region.EU_WEST_1, 'default', 'private'),
              destination: NetworkAddress.fromString('production.us-east-1.default.private'),
            },
            {
              source: new NetworkAddress('development', Region.US_EAST_1, 'default', 'private'),
              destination: NetworkAddress.fromString('production.us-east-1.default.private'),
            },
          ],
        },
      },
    };

    const dataLandingZone = new DataLandingZone(app, config);
    dlzResources = getDlzResources(dataLandingZone);
  });

  test('Peering Role', () => {
    ncp1CheckVpcPeeringRoleCreation(dlzResources, 'prod', 'development', '\'development\' to \'production\'', 'dev');
  });

  test('VPC Peering Connection', () => {
    ncp2CheckVpcPeeringConnection(dlzResources,
      'dev', 'global',
      'prod', 'regional',
      'development.eu-west-1.default', 'production.us-east-1.default',
    );
    ncp2CheckVpcPeeringConnection(dlzResources,
      'dev', 'regional',
      'prod', 'regional',
      'development.us-east-1.default', 'production.us-east-1.default',
    );
  });

  test('Routes', () => {
    const peeringConnectionDevGlobal: RoutesPeeringConnectionProps = {
      account: 'dev',
      region: 'global',
      fromVpcAddress: 'development.eu-west-1.default',
      toVpcAddress: 'production.us-east-1.default',
    };
    const peeringConnectionDevRegional: RoutesPeeringConnectionProps = {
      account: 'dev',
      region: 'regional',
      fromVpcAddress: 'development.us-east-1.default',
      toVpcAddress: 'production.us-east-1.default',
    };

    /* From Dev to Prod */
    ncp3CheckRoutes(dlzResources, 'dev', 'global',
      'development.eu-west-1.default.private',
      peeringConnectionDevGlobal,
      [
        '10.2.0.0/19',
        '10.2.32.0/19',
        '10.2.64.0/19',
      ]);
    dlzResources.dev.workload.ncp3.global.template.resourceCountIs('AWS::EC2::Route', 3);

    ncp3CheckRoutes(dlzResources, 'dev', 'regional',
      'development.us-east-1.default.private',
      peeringConnectionDevRegional,
      [
        '10.2.0.0/19',
        '10.2.32.0/19',
        '10.2.64.0/19',
      ]);
    dlzResources.dev.workload.ncp3.regional.template.resourceCountIs('AWS::EC2::Route', 3);


    /* From Prod back to Dev */
    ncp3CheckRoutes(dlzResources, 'prod', 'regional',
      'production.us-east-1.default.private',
      peeringConnectionDevGlobal,
      [
        //ALL VPC dev global subnets
        '10.1.0.0/19',
        '10.1.32.0/19',
        '10.1.64.0/19',
      ]);
    ncp3CheckRoutes(dlzResources, 'prod', 'regional',
      'production.us-east-1.default.private',
      peeringConnectionDevRegional,
      [
        //ALL VPC dev regional subnets
        '10.0.0.0/19',
        '10.0.32.0/19',
        '10.0.64.0/19',
      ]);
    dlzResources.prod.workload.ncp3.regional.template.resourceCountIs('AWS::EC2::Route', 6);
  });

});

describe('vpt.7 Negative Tests', () => {

  test('Negative - Specific Subnet specified as address', () => {

    const app = new App();
    const config: DataLandingZoneProps = {
      ...configBase,
      network: {
        connections: {
          vpcPeering: [
            {
              source: new NetworkAddress('development', Region.EU_WEST_1, 'default', 'private', 'private-1'),
              destination: NetworkAddress.fromString('production.us-east-1.default.private'),
            },
          ],
        },
      },
    };

    expect(() => new DataLandingZone(app, config)).toThrow('VPC Peering addresses ' +
      '(source: development.eu-west-1.default.private.private-1, destination: production.us-east-1.default.private) ' +
      'can not be specified on a subnet level, segment is the lowest');
  });

  test('Negative - Can not use VPC Peering within the same VPC', () => {

    const app = new App();
    const config: DataLandingZoneProps = {
      ...configBase,
      network: {
        connections: {
          vpcPeering: [
            {
              source: new NetworkAddress('development', Region.EU_WEST_1, 'default', 'private'),
              destination: new NetworkAddress('development', Region.EU_WEST_1, 'default', 'public'),
            },
          ],
        },
      },
    };

    expect(() => new DataLandingZone(app, config)).toThrow('VPC Peering ' +
      '(source: development.eu-west-1.default.private, destination: development.eu-west-1.default.public) ' +
      'can not be used within the same VPC');
  });

  test('Negative - Address does not exist', () => {

    const app = new App();
    const config: DataLandingZoneProps = {
      ...configBase,
      network: {
        connections: {
          vpcPeering: [
            {
              source: new NetworkAddress('development', Region.EU_WEST_1, 'default', 'private-XXXX'),
              destination: new NetworkAddress('development', Region.EU_WEST_1, 'default', 'public'),
            },
          ],
        },
      },
    };

    expect(() => new DataLandingZone(app, config)).toThrow('The VPC Peering \'source\' NetworkAddress ' +
      'development.eu-west-1.default.private-XXXX does not exist');
  });
});