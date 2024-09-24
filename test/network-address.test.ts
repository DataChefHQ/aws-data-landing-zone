// import * as assert from 'assert';
import {DLzAccount, NetworkAddress, NetworkEntityVpc, DlzAccountNetworks, DlzAccountNetwork} from "../src";
import * as ec2 from 'aws-cdk-lib/aws-ec2';
const jestConsole = console;


/* AccountA */
const dlzAccountDev = { accountId: '111', name: "dev" } as DLzAccount;
const devVpcUsEast1Default: NetworkEntityVpc = {
  address: new NetworkAddress(dlzAccountDev.name, 'us-east-1', 'default'),
  vpc: { cidrBlock: '10.0.0.0/16' } as ec2.CfnVPC,
  routeTables: [
    {
      address: new NetworkAddress(dlzAccountDev.name, 'us-east-1', 'default', 'private'),
      routeTable: { attrRouteTableId: '' } as ec2.CfnRouteTable,
      subnets: [
        {
          address: new NetworkAddress(dlzAccountDev.name, 'us-east-1', 'default', 'private', 'subnet1'),
          subnet: { attrCidrBlock: '' } as ec2.CfnSubnet
        },
        {
          address: new NetworkAddress(dlzAccountDev.name, 'us-east-1', 'default', 'private', 'subnet2'),
          subnet: { attrCidrBlock: '' } as ec2.CfnSubnet
        }
      ]
    },
    {
      address: new NetworkAddress(dlzAccountDev.name, 'us-east-1', 'default', 'public'),
      routeTable: { attrRouteTableId: '' } as ec2.CfnRouteTable,
      subnets: [
        {
          address: new NetworkAddress(dlzAccountDev.name, 'us-east-1', 'default', 'public', 'subnet1'),
          subnet: { attrCidrBlock: '' } as ec2.CfnSubnet
        },
        {
          address: new NetworkAddress(dlzAccountDev.name, 'us-east-1', 'default', 'public', 'subnet2'),
          subnet: { attrCidrBlock: '' } as ec2.CfnSubnet
        }
      ]
    }
  ]
};
const devVpcUsEast1Second: NetworkEntityVpc = {
  address: new NetworkAddress(dlzAccountDev.name, 'us-east-1', 'second'),
  vpc: { cidrBlock: '10.0.0.1/16' } as ec2.CfnVPC,
  routeTables: [
    {
      address: new NetworkAddress(dlzAccountDev.name, 'us-east-1', 'second', 'private'),
      routeTable: { attrRouteTableId: '' } as ec2.CfnRouteTable,
      subnets: [
        {
          address: new NetworkAddress(dlzAccountDev.name, 'us-east-1', 'second', 'private', 'subnet1'),
          subnet: { attrCidrBlock: '' } as ec2.CfnSubnet
        },
        {
          address: new NetworkAddress(dlzAccountDev.name, 'us-east-1', 'second', 'private', 'subnet2'),
          subnet: { attrCidrBlock: '' } as ec2.CfnSubnet
        }
      ]
    },
    {
      address: new NetworkAddress(dlzAccountDev.name, 'us-east-1', 'second', 'public'),
      routeTable: { attrRouteTableId: '' } as ec2.CfnRouteTable,
      subnets: [
        {
          address: new NetworkAddress(dlzAccountDev.name, 'us-east-1', 'second', 'public', 'subnet1'),
          subnet: { attrCidrBlock: '' } as ec2.CfnSubnet
        },
        {
          address: new NetworkAddress(dlzAccountDev.name, 'us-east-1', 'second', 'public', 'subnet2'),
          subnet: { attrCidrBlock: '' } as ec2.CfnSubnet
        }
      ]
    }
  ]
};
const devVpcEuWest1: NetworkEntityVpc = {
  address: new NetworkAddress(dlzAccountDev.name,  'eu-west-1', 'default'),
  vpc: { cidrBlock: '10.0.0.2/16' } as ec2.CfnVPC,
  routeTables: []
};

/* AccountProd */
const accountProd = { accountId: '111', name: "prod" } as DLzAccount;
const prodVpcUsEast1: NetworkEntityVpc = {
  address: new NetworkAddress(accountProd.name, 'us-east-1', 'default'),
  vpc: { cidrBlock: '10.0.0.3/16' } as ec2.CfnVPC,
  routeTables: [
    {
      address: new NetworkAddress(accountProd.name, 'us-east-1', 'default', 'private'),
      routeTable: { attrRouteTableId: '' } as ec2.CfnRouteTable,
      subnets: [
        {
          address: new NetworkAddress(accountProd.name, 'us-east-1', 'default', 'private', 'subnet1'),
          subnet: { attrCidrBlock: '' } as ec2.CfnSubnet
        },
        {
          address: new NetworkAddress(accountProd.name, 'us-east-1', 'default', 'private', 'subnet2'),
          subnet: { attrCidrBlock: '' } as ec2.CfnSubnet
        }
      ]
    },
    {
      address: new NetworkAddress(accountProd.name, 'us-east-1', 'default', 'public'),
      routeTable: { attrRouteTableId: '' } as ec2.CfnRouteTable,
      subnets: [
        {
          address: new NetworkAddress(accountProd.name, 'us-east-1', 'default', 'public', 'subnet1'),
          subnet: { attrCidrBlock: '' } as ec2.CfnSubnet
        },
        {
          address: new NetworkAddress(accountProd.name, 'us-east-1', 'default', 'public', 'subnet2'),
          subnet: { attrCidrBlock: '' } as ec2.CfnSubnet
        }
      ]
    }
  ]
};
const prodVpcEuWest1: NetworkEntityVpc = {
  address: new NetworkAddress(accountProd.name,  'eu-west-1', 'default'),
  vpc: { cidrBlock: '10.0.0.4/16' } as ec2.CfnVPC,
  routeTables: [
    {
      address: new NetworkAddress(accountProd.name, 'eu-west-1', 'default', 'private'),
      routeTable: { attrRouteTableId: '' } as ec2.CfnRouteTable,
      subnets: [
        {
          address: new NetworkAddress(accountProd.name, 'eu-west-1', 'default', 'private', 'subnet1'),
          subnet: { attrCidrBlock: '' } as ec2.CfnSubnet
        },
        {
          address: new NetworkAddress(accountProd.name, 'eu-west-1', 'default', 'private', 'subnet2'),
          subnet: { attrCidrBlock: '' } as ec2.CfnSubnet
        }
      ]
    },
    {
      address: new NetworkAddress(accountProd.name, 'eu-west-1', 'default', 'public'),
      routeTable: { attrRouteTableId: '' } as ec2.CfnRouteTable,
      subnets: [
        {
          address: new NetworkAddress(accountProd.name, 'eu-west-1', 'default', 'public', 'subnet1'),
          subnet: { attrCidrBlock: '' } as ec2.CfnSubnet
        },
        {
          address: new NetworkAddress(accountProd.name, 'eu-west-1', 'default', 'public', 'subnet2'),
          subnet: { attrCidrBlock: '' } as ec2.CfnSubnet
        }
      ]
    }
  ]
};


describe('NetworkAddress - getEntitiesForAddress', () => {

  const networkEntities = new DlzAccountNetworks();
  /* Do not use the .add methods as it depends on this method, prepare as it should be after .add */
  networkEntities["dlzAccountNetworks"] = [
    {
      dlzAccount: dlzAccountDev,
      vpcs: [devVpcUsEast1Default, devVpcUsEast1Second, devVpcEuWest1]
    },
    {
      dlzAccount: accountProd,
      vpcs: [prodVpcUsEast1, prodVpcEuWest1]
    }
  ];

  beforeEach(() => {
    /* Disable Jest's console.log that adds the location of log lines */
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    global.console = require('console');
  });
  afterEach(() => {
    /* Restore Jest's console */
    global.console = jestConsole;
  });


  function expectAccount(result: DlzAccountNetwork[] | undefined) {
    expect(result).toHaveLength(1);
    expect(result![0].dlzAccount.accountId).toBe(dlzAccountDev.accountId);
    expect(result![0].vpcs).toHaveLength(3);
    expect(result![0].vpcs[0].address.toString()).toBe('dev.us-east-1.default');
    expect(result![0].vpcs[1].address.toString()).toBe('dev.us-east-1.second');
    expect(result![0].vpcs[2].address.toString()).toBe('dev.eu-west-1.default');
  }
  test('matchOn - account', () => {
    const networkAddress = new NetworkAddress(dlzAccountDev.name);
    const result = networkEntities.getEntitiesForAddress(networkAddress, 'account');
    expectAccount(result);
  });


  function expectRegion(result: DlzAccountNetwork[] | undefined) {
    expect(result).toHaveLength(1);
    expect(result![0].dlzAccount.accountId).toBe(dlzAccountDev.accountId);
    expect(result![0].vpcs).toHaveLength(2);
    expect(result![0].vpcs[0].address.toString()).toBe('dev.us-east-1.default');
    expect(result![0].vpcs[1].address.toString()).toBe('dev.us-east-1.second');
  }
  test('matchOn - region', () => {
    /* Full network Address, we want to find the NetworkEntities for the address's region */
    const networkAddress = new NetworkAddress(dlzAccountDev.name, 'us-east-1', "default", "private", "subnet1");
    const result = networkEntities.getEntitiesForAddress(networkAddress, 'region');
    expectRegion(result);
  });

  function expectVpc(result: DlzAccountNetwork[] | undefined) {
    expect(result).toHaveLength(1);
    expect(result![0].dlzAccount.accountId).toBe(dlzAccountDev.accountId);
    expect(result![0].vpcs).toHaveLength(1);
    expect(result![0].vpcs[0].address.toString()).toBe('dev.us-east-1.default');
    expect(result![0].vpcs[0].routeTables).toHaveLength(2);
  }
  test('matchOn - vpc', () => {
    /* Full network Address, we want to find the NetworkEntities for the address's vpc */
    const networkAddress = new NetworkAddress(dlzAccountDev.name, 'us-east-1', "default", "private", "subnet1");
    const result = networkEntities.getEntitiesForAddress(networkAddress, 'vpc');
    expectVpc(result);
  });

  function expectSegment(result: DlzAccountNetwork[] | undefined) {
    expect(result).toHaveLength(1);
    expect(result![0].dlzAccount.accountId).toBe(dlzAccountDev.accountId);
    expect(result![0].vpcs).toHaveLength(1);
    expect(result![0].vpcs[0].address.toString()).toBe('dev.us-east-1.default');
    expect(result![0].vpcs[0].routeTables).toHaveLength(1);
    expect(result![0].vpcs[0].routeTables[0].address.toString()).toBe('dev.us-east-1.default.private');
    expect(result![0].vpcs[0].routeTables[0].subnets).toHaveLength(2);
  }
  test('matchOn - segment', () => {
    /* Full network Address, we want to find the NetworkEntities for the address's segment */
    const networkAddress = new NetworkAddress(dlzAccountDev.name, 'us-east-1', "default", "private", "subnet1");
    const result = networkEntities.getEntitiesForAddress(networkAddress, 'segment');
    expectSegment(result);
  });

  function expectSubnet(result: DlzAccountNetwork[] | undefined) {
    expect(result).toHaveLength(1);
    expect(result![0].dlzAccount.accountId).toBe(dlzAccountDev.accountId);
    expect(result![0].vpcs).toHaveLength(1);
    expect(result![0].vpcs[0].address.toString()).toBe('dev.us-east-1.default');
    expect(result![0].vpcs[0].routeTables).toHaveLength(1);
    expect(result![0].vpcs[0].routeTables[0].address.toString()).toBe('dev.us-east-1.default.private');
    expect(result![0].vpcs[0].routeTables[0].subnets).toHaveLength(1);
    expect(result![0].vpcs[0].routeTables[0].subnets[0].address.toString()).toBe('dev.us-east-1.default.private.subnet1');
  }
  test('matchOn - subnet', () => {
    /* Full network Address, we want to find the NetworkEntities for the address's subnet */
    const networkAddress = new NetworkAddress(dlzAccountDev.name, 'us-east-1', "default", "private", "subnet1");
    const result = networkEntities.getEntitiesForAddress(networkAddress, 'subnet');
    expectSubnet(result);
  });

  test('matchOn - undefined', () => {
    //Create a for loop and a network address for each part of the address then evaluate if it returns the expected result
    const testCases = [
      {
        address: new NetworkAddress(dlzAccountDev.name),
        expected: expectAccount
      },
      {
        address: new NetworkAddress(dlzAccountDev.name, 'us-east-1'),
        expected: expectRegion
      },
      {
        address: new NetworkAddress(dlzAccountDev.name, 'us-east-1', "default"),
        expected: expectVpc
      },
      {
        address: new NetworkAddress(dlzAccountDev.name, 'us-east-1', "default", "private"),
        expected: expectSegment
      },
      {
        address: new NetworkAddress(dlzAccountDev.name, 'us-east-1', "default", "private", "subnet1"),
        expected: expectSubnet
      }
    ];

    for (const testCase of testCases) {
      const result = networkEntities.getEntitiesForAddress(testCase.address);
      testCase.expected(result);
    }
  });
});


describe('NetworkEntities - add', () => {

  beforeEach(() => {
    /* Disable Jest's console.log that adds the location of log lines */
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    global.console = require('console');
  });
  afterEach(() => {
    /* Restore Jest's console */
    global.console = jestConsole;
  });

});

