import { App } from 'aws-cdk-lib';
import {
  DataLandingZone, DataLandingZoneProps,
  DlzAccountType,
  Region,
} from '../src';
import { NetworkAddress } from '../src/constructs/dlz-vpc/network-address';

//@ts-ignore
import {
  DlzResources,
  findDlzSsmReaderLogicalId,
  getDlzResources,
} from "./helpers.test";
import {SSM_PARAMETERS_DLZ} from "../src/stacks/organization/constants";





/**
 * Default VPC with 3 private and 3 public subnets. Each subnet has a /19 CIDR block.
 * The VPC CIDR is `10.${thirdOctetMask}.0.0/16`
 * @param thirdOctetMask T
 * @param region
 */
function defaultVpcClasB3Private3Public(thirdOctetMask: number, region: Region) {
  return {
    name: 'default',
    region: region,
    cidr: '10.'+thirdOctetMask+'.0.0/16',
    subnets: [
      /* Evenly divide, each /19 = 8k hosts */
      {
        segment: 'private',
        name: 'private-1',
        cidr: '10.'+thirdOctetMask+'.0.0/19',
        az: region+'a',
      },
      {
        segment: 'private',
        name: 'private-2',
        cidr: '10.'+thirdOctetMask+'.32.0/19',
        az: region+'b',
      },
      {
        segment: 'private',
        name: 'private-3',
        cidr: '10.'+thirdOctetMask+'.64.0/19',
        az: region+'c',
      },
      {
        segment: 'public',
        name: 'public-1',
        cidr: '10.'+thirdOctetMask+'.96.0/19',
        az: region+'a',
      },
      {
        segment: 'public',
        name: 'public-2',
        cidr: '10.'+thirdOctetMask+'.128.0/19',
        az: region+'b',
      },
      {
        segment: 'public',
        name: 'public-3',
        cidr: '10.'+thirdOctetMask+'.160.0/19',
        az: region+'c',
      }
      /* Remaining:
      *  - 10.0.192.0/19
      *  - 10.0.224.0/19
      * */
    ]
  }
}

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
              defaultVpcClasB3Private3Public(0, Region.US_EAST_1),
              defaultVpcClasB3Private3Public(1, Region.EU_WEST_1),
            ],
          },
          {
            name: 'production',
            accountId: '234567890123',
            type: DlzAccountType.PRODUCTION,
            vpcs: [
              defaultVpcClasB3Private3Public(2, Region.US_EAST_1),
              defaultVpcClasB3Private3Public(3, Region.EU_WEST_1),
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
}

/* Disable Jest's console.log that adds the location of log lines. Only applies when debugging/stops within a test.
* Not a full run of all tests. */
// eslint-disable-next-line @typescript-eslint/no-require-imports
global.console = require('console');

// Vpc Peering Test (vpt)
describe('vpt.1 Single Dev Subnet eu-west-1 to Single Prod Subnet us-east-1 - source-to-destination - Different region', () => {

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
              direction: 'source-to-destination',
            },
            // {
            //   source: new NetworkAddress('development', Region.EU_WEST_1, 'default', 'public'),
            //   destination: NetworkAddress.fromString('production.us-east-1.default.public'),
            //   direction: 'source-to-destination',
            // }
          ],
        }
      }
    }

    const dataLandingZone = new DataLandingZone(app, config);
    dlzResources = getDlzResources(dataLandingZone);
  })

  test('Peering Role and VPC Peering Connection', () => {
    /* Check that the VPC Peering Role is created in NCP1 within the destination account and allows the source account to assume it */
    dlzResources.prod.workload.ncp1.global.template.hasResourceProperties('AWS::IAM::Role', {
      RoleName: 'dlz-ncp1-global-vpc-peering-role-for-development',
      Description: 'VPC Peering Role for \'development\' to \'production\'',
      AssumeRolePolicyDocument: {
        Statement: [
          {
            "Action": "sts:AssumeRole",
            "Effect": "Allow",
            "Principal": {
              "AWS": {
                "Fn::Join": [
                  "",
                  [
                    "arn:",
                    {
                      "Ref": "AWS::Partition"
                    },
                    ":iam::"+dlzResources.dev.workload.ncp1.global.stack.accountId+":root"
                  ]
                ]
              }
            }
          }
        ],
      },
    });
    /* Get the logical ID of the peering role defined in NCP1 above within the destination account */
    const vpcPeeringRolesKey = `${dlzResources.dev.workload.ncp2.global.stack.accountId}-${dlzResources.prod.workload.ncp2.global.stack.accountId}`;
    const peeringRoleLogicalId = findDlzSsmReaderLogicalId(
      dlzResources.dev.workload.ncp2.global.template,
      dlzResources.prod.workload.ncp1.global.stack.accountId,
      dlzResources.prod.workload.ncp1.global.stack.region,
      `${SSM_PARAMETERS_DLZ.NETWORKING_VPC_PEERING_ROLE_PREFIX}${vpcPeeringRolesKey}`);
    expect(peeringRoleLogicalId).toBeDefined();

    /* Get the logical ID of the peering VPC defined in REGIONAL of the destination account */
    const peeringVpcLogicalId = findDlzSsmReaderLogicalId(
      dlzResources.dev.workload.ncp2.global.template,
      dlzResources.prod.workload.base.regional.stack.accountId,
      dlzResources.prod.workload.base.regional.stack.region,
      `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/production.us-east-1.default/id`);
    expect(peeringVpcLogicalId).toBeDefined();

    /* Get the logical ID of the owner VPC defined in GLOBAL of the source account */
    const ownerVpcLogicalId = findDlzSsmReaderLogicalId(
      dlzResources.dev.workload.ncp2.global.template,
      dlzResources.dev.workload.base.global.stack.accountId,
      dlzResources.dev.workload.base.global.stack.region,
      `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/development.eu-west-1.default/id`);
    expect(peeringVpcLogicalId).toBeDefined();


    dlzResources.dev.workload.ncp2.global.template.resourceCountIs('AWS::EC2::VPCPeeringConnection', 1);
    dlzResources.dev.workload.ncp2.regional.template.resourceCountIs('AWS::EC2::VPCPeeringConnection', 0);
    dlzResources.dev.workload.ncp2.global.template.hasResourceProperties(
      'AWS::EC2::VPCPeeringConnection', {
        VpcId: {
          "Fn::GetAtt": [
            ownerVpcLogicalId,
            "Parameter.Value"
          ]
        },
        PeerVpcId: {
          "Fn::GetAtt": [
            peeringVpcLogicalId,
            "Parameter.Value"
          ]
        },
        PeerOwnerId: dlzResources.prod.workload.ncp2.global.stack.accountId,
        PeerRegion: "us-east-1",
        PeerRoleArn: {
          "Fn::GetAtt": [
            peeringRoleLogicalId,
            "Parameter.Value"
          ]
        },
      });
  });

  test('Routes', () => {
    /* Find the logical ID of the route table defined in GLOBAL of the source account */
    const routeTableLogicalId = findDlzSsmReaderLogicalId(
      dlzResources.dev.workload.ncp3.global.template,
      dlzResources.dev.workload.ncp1.global.stack.accountId,
      dlzResources.dev.workload.ncp1.global.stack.region,
      "/dlz/networking-entity/vpc/development.eu-west-1.default.private/id");

    /* Find the logical ID of the VPC Peering Connection defined in GLOBAL of the source account */
    const vpcPeeringConnectionLogicalId = findDlzSsmReaderLogicalId(
      dlzResources.dev.workload.ncp3.global.template,
      dlzResources.dev.workload.ncp2.global.stack.accountId,
      dlzResources.dev.workload.ncp2.global.stack.region,
      `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/development.eu-west-1.default/peer/production.us-east-1.default/id`,);
    expect(vpcPeeringConnectionLogicalId).toBeDefined();

    /* Check that the Routes are correct in the source account going to the destination */
    const prodREgionalPrivateSubnets = [
      '10.2.0.0/19',
      '10.2.32.0/19',
      '10.2.64.0/19'
    ];
    dlzResources.dev.workload.ncp3.global.template.resourceCountIs('AWS::EC2::Route', 3);
    dlzResources.dev.workload.ncp3.regional.template.resourceCountIs('AWS::EC2::Route', 0);
    for(const subnet of prodREgionalPrivateSubnets) {
      dlzResources.dev.workload.ncp3.global.template.hasResourceProperties('AWS::EC2::Route', {
        DestinationCidrBlock: subnet,
        RouteTableId: {
          "Fn::GetAtt": [
            routeTableLogicalId,
            "Parameter.Value"
          ]
        },
        VpcPeeringConnectionId: {
          "Fn::GetAtt": [
            vpcPeeringConnectionLogicalId,
            "Parameter.Value"
          ]
        },
      });
    }

  })
});



function ncp1CheckVpcPeeringRoleCreation(dlzResources: DlzResources, definedInAccountType: 'prod' | 'dev', roleNameSuffix: string,
                                     roleDescriptionSuffix: string, toBeAssumedByAccountType: 'prod' | 'dev') {
  dlzResources[definedInAccountType].workload.ncp1.global.template.hasResourceProperties('AWS::IAM::Role', {
    RoleName: `dlz-ncp1-global-vpc-peering-role-for-${roleNameSuffix}`,
    Description: `VPC Peering Role for ${roleDescriptionSuffix}`,
    AssumeRolePolicyDocument: {
      Statement: [
        {
          "Action": "sts:AssumeRole",
          "Effect": "Allow",
          "Principal": {
            "AWS": {
              "Fn::Join": [
                "",
                [
                  "arn:",
                  {
                    "Ref": "AWS::Partition"
                  },
                  `:iam::${dlzResources[toBeAssumedByAccountType].workload.ncp1.global.stack.accountId}:root`
                ]
              ]
            }
          }
        }
      ],
    },
  });
}

function ncp2CheckVpcPeeringConnection(dlzResources: DlzResources,
                                   fromAccount: 'prod' | 'dev', fromRegion: "global" | "regional",
                                   toAccount: 'prod' | 'dev', toRegion: "global" | "regional",
                                   fromVpcAddress: string, toVpcAddress: string
                                   ) {

  /* Get the logical ID of the peering role defined in NCP1 above within the destination account */
  const vpcPeeringRolesKey = `${dlzResources[fromAccount].workload.ncp2.global.stack.accountId}-${dlzResources[toAccount].workload.ncp2.global.stack.accountId}`;
  const peeringRoleLogicalId = findDlzSsmReaderLogicalId(
    dlzResources[fromAccount].workload.ncp2[fromRegion].template,
    dlzResources[toAccount].workload.ncp1.global.stack.accountId,
    dlzResources[toAccount].workload.ncp1.global.stack.region,
    `${SSM_PARAMETERS_DLZ.NETWORKING_VPC_PEERING_ROLE_PREFIX}${vpcPeeringRolesKey}`);
  expect(peeringRoleLogicalId).toBeDefined();

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

  dlzResources[fromAccount].workload.ncp2[fromRegion].template.resourceCountIs('AWS::EC2::VPCPeeringConnection', 1);
  dlzResources[fromAccount].workload.ncp2[fromRegion].template.hasResourceProperties(
    'AWS::EC2::VPCPeeringConnection', {
      VpcId: {
        "Fn::GetAtt": [
          ownerVpcLogicalId,
          "Parameter.Value"
        ]
      },
      PeerVpcId: {
        "Fn::GetAtt": [
          peeringVpcLogicalId,
          "Parameter.Value"
        ]
      },
      PeerOwnerId: dlzResources[toAccount].workload.ncp2[fromRegion].stack.accountId,
      PeerRegion: toRegion === 'global' ? "eu-west-1" : "us-east-1",
      PeerRoleArn: {
        "Fn::GetAtt": [
          peeringRoleLogicalId,
          "Parameter.Value"
        ]
      },
    });
}

function ncp3CheckRoutes(dlzResources: DlzResources,
                         inAccount: 'prod' | 'dev', inRegion: "global" | "regional",
                         routeTablePartialAdress: string,
                         peeringConnectionFromVpcAdress: string,
                         peeringConnectionToVpcAdress: string,
                         destinationSubnetCidrs: string[])
{
  /* Find the logical ID of the route table defined in GLOBAL of the source account */
  const routeTableLogicalId = findDlzSsmReaderLogicalId(
    dlzResources[inAccount].workload.ncp3[inRegion].template,
    dlzResources[inAccount].workload.base[inRegion].stack.accountId,
    dlzResources[inAccount].workload.base[inRegion].stack.region,
    `/dlz/networking-entity/vpc/${routeTablePartialAdress}/id`);
  // development.eu-west-1.default.private

  /* Find the logical ID of the VPC Peering Connection defined in GLOBAL of the source account */
  const vpcPeeringConnectionLogicalId = findDlzSsmReaderLogicalId(
    dlzResources[inAccount].workload.ncp3[inRegion].template,
    dlzResources[inAccount].workload.ncp2[inRegion].stack.accountId,
    dlzResources[inAccount].workload.ncp2[inRegion].stack.region,
    `${SSM_PARAMETERS_DLZ.NETWORKING_ENTITY_PREFIX}vpc/${peeringConnectionFromVpcAdress}/peer/${peeringConnectionToVpcAdress}/id`,);
  // development.eu-west-1.default/peer/production.us-east-1.default
  expect(vpcPeeringConnectionLogicalId).toBeDefined();

  /* Check that the Routes are correct in the source account going to the destination */
  // const prodRegionalPrivateSubnets = [
  //   '10.2.0.0/19',
  //   '10.2.32.0/19',
  //   '10.2.64.0/19'
  // ];
  dlzResources[inAccount].workload.ncp3[inRegion].template.resourceCountIs('AWS::EC2::Route', 3);
  for(const subnet of destinationSubnetCidrs) {
    dlzResources[inAccount].workload.ncp3[inRegion].template.hasResourceProperties('AWS::EC2::Route', {
      DestinationCidrBlock: subnet,
      RouteTableId: {
        "Fn::GetAtt": [
          routeTableLogicalId,
          "Parameter.Value"
        ]
      },
      VpcPeeringConnectionId: {
        "Fn::GetAtt": [
          vpcPeeringConnectionLogicalId,
          "Parameter.Value"
        ]
      },
    });
  }
}

describe('vpt.2 Single Dev Subnet eu-west-1 to Single Prod Subnet us-east-1 - bidirectional - Different region', () => {

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
              direction: 'bidirectional',
            }
          ],
        }
      }
    }

    const dataLandingZone = new DataLandingZone(app, config);
    dlzResources = getDlzResources(dataLandingZone);
  })

  test('Peering Role', () => {
    ncp1CheckVpcPeeringRoleCreation(dlzResources, 'prod', 'development', '\'development\' to \'production\'', "dev");
    ncp1CheckVpcPeeringRoleCreation(dlzResources, 'dev', 'production', '\'production\' to \'development\'', 'prod');
  });

  test('VPC Peering Connection', () => {
    ncp2CheckVpcPeeringConnection(dlzResources,
      'dev', 'global',
      'prod', 'regional',
      'development.eu-west-1.default', 'production.us-east-1.default'
      );
    ncp2CheckVpcPeeringConnection(dlzResources,
      'prod', 'regional',
      'dev', 'global',
      'production.us-east-1.default', 'development.eu-west-1.default'
    );
  });

  test('Routes', () => {
    ncp3CheckRoutes(dlzResources, 'dev', 'global',
      'development.eu-west-1.default.private',
      'development.eu-west-1.default', 'production.us-east-1.default',
      [
        '10.2.0.0/19',
        '10.2.32.0/19',
        '10.2.64.0/19'
      ]);
    ncp3CheckRoutes(dlzResources, 'prod', 'regional',
      'production.us-east-1.default.private',
      'production.us-east-1.default','development.eu-west-1.default',
      [
        '10.1.0.0/19',
        '10.1.32.0/19',
        '10.1.64.0/19'
      ]);
  });

});


