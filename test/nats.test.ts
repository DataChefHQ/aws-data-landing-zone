import { App } from 'aws-cdk-lib';
import { InstanceClass, InstanceSize, InstanceType } from 'aws-cdk-lib/aws-ec2';
import {
  DlzResources,
  getDlzResources,
  //@ts-ignore
} from './helpers.test';
import {
  DataLandingZone, DataLandingZoneProps,
  DlzAccountType,
  Region,
} from '../src';
import { NetworkAddress } from '../src/constructs/dlz-vpc/network-address';

//@ts-ignore
import { SSM_PARAMETERS_DLZ } from '../src/stacks/organization/constants';


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
      },
      /* Remaining:
      *  - 10.0.192.0/19
      *  - 10.0.224.0/19
      * */
    ],
  };
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

  printDeploymentOrder: false,
  saveReport: false,
  printReport: false,
};

/* Disable Jest's console.log that adds the location of log lines. Only applies when debugging/stops within a test.
* Not a full run of all tests. */
// eslint-disable-next-line @typescript-eslint/no-require-imports
global.console = require('console');

describe('nat.1 Private route table to single NAT in public subnet - NAT GW', () => {

  let dlzResources: DlzResources;
  beforeAll(() => {
    const app = new App();
    const config: DataLandingZoneProps = {
      ...configBase,
      network: {
        nats: [
          {
            name: 'development-eu-west-1-internet-access',
            location: new NetworkAddress('development', Region.EU_WEST_1, 'default', 'public', 'public-1'),
            allowAccessFrom: [
              new NetworkAddress('development', Region.EU_WEST_1, 'default', 'private'),
            ],
            type: {
              gateway: {},
            },
          },
        ],
      },
    };

    const dataLandingZone = new DataLandingZone(app, config);
    dlzResources = getDlzResources(dataLandingZone);
  });

  test('Single IGW is created', () => {
    const { template } = dlzResources.dev.workload.base.global;
    template.resourceCountIs('AWS::EC2::InternetGateway', 1);
  });

  test('Routes from NAT to IGW', () => {
    const { template } = dlzResources.dev.workload.base.global;
    template.hasResource('AWS::EC2::Route', {
      Properties: {
        DestinationCidrBlock: '0.0.0.0/0',
        GatewayId: {
          'Fn::GetAtt': [
            'vpcigwvpcdefault',
            'InternetGatewayId',
          ],
        },
        RouteTableId: {
          Ref: 'vpcpublic',
        },
      },
    });
  });

  test('Routes from the private subnet to the NAT', () => {
    const { template } = dlzResources.dev.workload.base.global;
    template.hasResource('AWS::EC2::Route', {
      Properties: {
        DestinationCidrBlock: '0.0.0.0/0',
        NatGatewayId: {
          Ref: 'vpcdevelopmenteuwest1internetaccessnat',
        },
        RouteTableId: {
          Ref: 'vpcprivate',
        },
      },
    });
  });

});

describe('nat.1 Private route table to single NAT in public subnet - NAT Instance', () => {

  let dlzResources: DlzResources;
  beforeAll(() => {
    const app = new App();
    const config: DataLandingZoneProps = {
      ...configBase,
      network: {
        nats: [
          {
            name: 'development-eu-west-1-internet-access',
            location: new NetworkAddress('development', Region.EU_WEST_1, 'default', 'public', 'public-1'),
            allowAccessFrom: [
              new NetworkAddress('development', Region.EU_WEST_1, 'default', 'private'),
            ],
            type: {
              instance: {
                instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
              },
            },
          },
        ],
      },
    };

    const dataLandingZone = new DataLandingZone(app, config);
    dlzResources = getDlzResources(dataLandingZone);
  });

  test('Single IGW and NAt Instance is created', () => {
    const { template } = dlzResources.dev.workload.base.global;
    template.resourceCountIs('AWS::EC2::InternetGateway', 1);
    template.resourceCountIs('AWS::EC2::Instance', 1);
  });


  test('Routes from NAT to IGW', () => {
    const { template } = dlzResources.dev.workload.base.global;
    template.hasResource('AWS::EC2::Route', {
      Properties: {
        DestinationCidrBlock: '0.0.0.0/0',
        GatewayId: {
          'Fn::GetAtt': [
            'vpcigwvpcdefault',
            'InternetGatewayId',
          ],
        },
        RouteTableId: {
          Ref: 'vpcpublic',
        },
      },
    });
  });

  test('Routes from the private subnet to the NAT', () => {
    const { template } = dlzResources.dev.workload.base.global;
    template.hasResource('AWS::EC2::Route', {
      Properties: {
        DestinationCidrBlock: '0.0.0.0/0',
        InstanceId: {
          Ref: 'vpcdevelopmenteuwest1internetaccessnati',
        },
        RouteTableId: {
          Ref: 'vpcprivate',
        },
      },
    });
  });

});

describe('nat.2 Each route tables in the private subnet/AZ routes a NAT in the same public subnet AZ', () => {

  let dlzResources: DlzResources;
  beforeAll(() => {
    const app = new App();

    /* Override the default network we usually have */
    const region = Region.EU_WEST_1;
    const thirdOctetMask = 0;
    // @ts-ignore
    // eslint-disable-next-line dot-notation
    configBase.organization.ous.workloads.accounts[0]['vpcs'] = [
      {
        name: 'default',
        region: region,
        cidr: '10.'+thirdOctetMask+'.0.0/16',
        subnets: [
          {
            segment: 'private-1',
            name: 'private-1-s', //s stands for subnet, coz complaining about name duplication
            cidr: '10.'+thirdOctetMask+'.0.0/19',
            az: region+'a',
          },
          {
            segment: 'private-2',
            name: 'private-2-s',
            cidr: '10.'+thirdOctetMask+'.32.0/19',
            az: region+'b',
          },
          {
            segment: 'private-3',
            name: 'private-3-s',
            cidr: '10.'+thirdOctetMask+'.64.0/19',
            az: region+'c',
          },
          {
            segment: 'public-1',
            name: 'public-1-s',
            cidr: '10.'+thirdOctetMask+'.96.0/19',
            az: region+'a',
          },
          {
            segment: 'public-2',
            name: 'public-2-s',
            cidr: '10.'+thirdOctetMask+'.128.0/19',
            az: region+'b',
          },
          {
            segment: 'public-3',
            name: 'public-3-s',
            cidr: '10.'+thirdOctetMask+'.160.0/19',
            az: region+'c',
          },
        ],
      },
    ];

    const config: DataLandingZoneProps = {
      ...configBase,
      network: {
        nats: [
          {
            name: 'development-eu-west-1-internet-access-AZ-a',
            location: new NetworkAddress('development', Region.EU_WEST_1, 'default', 'public-1', 'public-1-s'),
            allowAccessFrom: [
              new NetworkAddress('development', Region.EU_WEST_1, 'default', 'private-1'),
            ],
            type: {
              gateway: {},
            },
          },
          {
            name: 'development-eu-west-1-internet-access-AZ-b',
            location: new NetworkAddress('development', Region.EU_WEST_1, 'default', 'public-2', 'public-2-s'),
            allowAccessFrom: [
              new NetworkAddress('development', Region.EU_WEST_1, 'default', 'private-2'),
            ],
            type: {
              gateway: {},
            },
          },
          {
            name: 'development-eu-west-1-internet-access-AZ-c',
            location: new NetworkAddress('development', Region.EU_WEST_1, 'default', 'public-3', 'public-3-s'),
            allowAccessFrom: [
              new NetworkAddress('development', Region.EU_WEST_1, 'default', 'private-3'),
            ],
            type: {
              gateway: {},
            },
          },
        ],
      },
    };

    const dataLandingZone = new DataLandingZone(app, config);
    dlzResources = getDlzResources(dataLandingZone);
  });

  test('Single IGW is created', () => {
    const { template } = dlzResources.dev.workload.base.global;
    template.resourceCountIs('AWS::EC2::InternetGateway', 1);
  });

  test('Routes from NAT to IGW', () => {
    const { template } = dlzResources.dev.workload.base.global;
    template.hasResource('AWS::EC2::Route', {
      Properties: {
        DestinationCidrBlock: '0.0.0.0/0',
        GatewayId: {
          'Fn::GetAtt': [
            'vpcigwvpcdefault',
            'InternetGatewayId',
          ],
        },
        RouteTableId: {
          Ref: 'vpcpublic1',
        },
      },
    });
    template.hasResource('AWS::EC2::Route', {
      Properties: {
        DestinationCidrBlock: '0.0.0.0/0',
        GatewayId: {
          'Fn::GetAtt': [
            'vpcigwvpcdefault',
            'InternetGatewayId',
          ],
        },
        RouteTableId: {
          Ref: 'vpcpublic2',
        },
      },
    });
    template.hasResource('AWS::EC2::Route', {
      Properties: {
        DestinationCidrBlock: '0.0.0.0/0',
        GatewayId: {
          'Fn::GetAtt': [
            'vpcigwvpcdefault',
            'InternetGatewayId',
          ],
        },
        RouteTableId: {
          Ref: 'vpcpublic3',
        },
      },
    });
  });

  test('Routes from the private subnet to the NAT', () => {
    const { template } = dlzResources.dev.workload.base.global;
    template.hasResource('AWS::EC2::Route', {
      Properties: {
        DestinationCidrBlock: '0.0.0.0/0',
        NatGatewayId: {
          Ref: 'vpcdevelopmenteuwest1internetaccessAZanat',
        },
        RouteTableId: {
          Ref: 'vpcprivate1',
        },
      },
    });
    template.hasResource('AWS::EC2::Route', {
      Properties: {
        DestinationCidrBlock: '0.0.0.0/0',
        NatGatewayId: {
          Ref: 'vpcdevelopmenteuwest1internetaccessAZbnat',
        },
        RouteTableId: {
          Ref: 'vpcprivate2',
        },
      },
    });
    template.hasResource('AWS::EC2::Route', {
      Properties: {
        DestinationCidrBlock: '0.0.0.0/0',
        NatGatewayId: {
          Ref: 'vpcdevelopmenteuwest1internetaccessAZcnat',
        },
        RouteTableId: {
          Ref: 'vpcprivate3',
        },
      },
    });
  });

});
