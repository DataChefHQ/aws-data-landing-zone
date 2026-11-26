import { chmod, mkdtemp, readFile, rm, writeFile } from 'fs/promises';
import * as os from 'os';
import * as path from 'path';
import { load } from 'js-yaml';
import { DataLandingZoneProps, DlzAccountType, DlzAwsNukeFilterType, Region, Scripts } from '../src';
import { assumeRole } from '../src/scripts/lib/helpers';

// AWS is the only boundary replaced; the aws-nuke binary is a real process (a stub script)
jest.mock('../src/scripts/lib/helpers', () => ({
  ...jest.requireActual('../src/scripts/lib/helpers'),
  assumeRole: jest.fn(async () => ({ AccessKeyId: 'id', SecretAccessKey: 'secret', SessionToken: 'token' })),
}));

const SANDBOX_ID = '111111111111';
const PRODUCTION_ID = '222222222222';

function props(awsNuke?: DataLandingZoneProps['awsNuke']): DataLandingZoneProps {
  return {
    localProfile: 'test',
    regions: { global: Region.EU_WEST_1, regional: [Region.US_EAST_1] },
    mandatoryTags: { owner: [], project: [], environment: [], costCenter: [], name: [] },
    securityHubNotifications: [],
    organization: {
      organizationId: 'o-awsnuketest',
      root: { accounts: { management: { accountId: '999999999999' } } },
      ous: {
        security: {
          ouId: 'ou-security',
          accounts: { log: { accountId: '333333333333' }, audit: { accountId: '444444444444' } },
        },
        workloads: {
          ouId: 'ou-workloads',
          accounts: [
            { name: 'sandbox', accountId: SANDBOX_ID, type: DlzAccountType.DEVELOP },
            { name: 'prod', accountId: PRODUCTION_ID, type: DlzAccountType.PRODUCTION },
          ],
        },
        suspended: { ouId: 'ou-suspended' },
      },
    },
    awsNuke,
  };
}

let dir: string;

async function writeAwsNukeStub(exitCode: number) {
  const binary = path.join(dir, 'aws-nuke');
  await writeFile(binary, `#!/bin/sh\nexit ${exitCode}\n`);
  await chmod(binary, 0o755);
}

beforeEach(async () => {
  dir = await mkdtemp(path.join(os.tmpdir(), 'dlz-aws-nuke-'));
  jest.mocked(assumeRole).mockClear();
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

test('refuses to nuke a production workload account but allows a dry run', async () => {
  await writeAwsNukeStub(0);

  await expect(new Scripts().awsNuke(props(), dir, './aws-nuke', 'prod', false))
    .rejects.toThrow(`Refusing to nuke prod (${PRODUCTION_ID}) because it is a production account.`);
  expect(assumeRole).not.toHaveBeenCalled();

  await expect(new Scripts().awsNuke(props(), dir, './aws-nuke', 'prod', true)).resolves.toBeUndefined();
});

test('keeps the resources that match the awsNuke filters', async () => {
  await writeAwsNukeStub(0);
  const awsNuke = {
    filters: [
      { value: 'security-baseline-*', type: DlzAwsNukeFilterType.GLOB },
      { value: 'infra', property: 'tag:Owner' },
    ],
  };

  await new Scripts().awsNuke(props(awsNuke), dir, './aws-nuke', 'sandbox', true);

  const config = load(await readFile(path.join(dir, 'aws-nuke-config.yml'), 'utf8')) as any;
  expect(config.accounts[SANDBOX_ID].filters.__global__).toEqual(expect.arrayContaining([
    { type: 'glob', value: 'security-baseline-*' },
    { property: 'tag:Owner', value: 'infra' },
  ]));
});

test('reports an AWS Nuke failure as an error instead of exiting the process', async () => {
  await writeAwsNukeStub(1);

  await expect(new Scripts().awsNuke(props(), dir, './aws-nuke', 'sandbox', false))
    .rejects.toThrow(`AWS Nuke failed on sandbox (${SANDBOX_ID}).`);
});
