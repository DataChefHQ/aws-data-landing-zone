import childProcess, { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { STS } from '@aws-sdk/client-sts';
import { DataLandingZoneProps, Region } from '../src/data-landing-zone-types';
import { Scripts } from '../src/scripts';

test('bootstrap assets log to a private retained bucket without changing the vendor deployment contract', () => {
  const directory = mkdtempSync(join(tmpdir(), 'dlz-bootstrap-test-'));
  try {
    const baseline = JSON.parse(execFileSync('cdk', ['bootstrap', '--show-template', '--json', '--ci=false'], { encoding: 'utf8' }));
    const path = join(directory, 'template.json');
    // Run the real generator in CI mode: recent CDK CLIs otherwise mix info with JSON.
    execFileSync(process.execPath, ['-r', 'ts-node/register', '-e',
      'require("./src/scripts/lib/bootstrap-template").writeBootstrapAccessLoggingTemplate(process.argv[1])', path], { env: { ...process.env, CI: 'true' } });
    const template = JSON.parse(readFileSync(path, 'utf8'));
    const source = template.Resources.StagingBucket;
    expect(source.Properties.LoggingConfiguration).toEqual({
      DestinationBucketName: { Ref: 'FileAssetsAccessLogsBucket' }, LogFilePrefix: 'cdk-assets/',
    });
    expect(source.DependsOn).toContain('FileAssetsAccessLogsBucketPolicy');
    const bucket = template.Resources.FileAssetsAccessLogsBucket;
    expect(bucket.DeletionPolicy).toBe('Retain');
    expect(bucket.UpdateReplacePolicy).toBe('Retain');
    expect(bucket.Properties).toMatchObject({
      OwnershipControls: { Rules: [{ ObjectOwnership: 'BucketOwnerEnforced' }] },
      BucketEncryption: { ServerSideEncryptionConfiguration: [{ ServerSideEncryptionByDefault: { SSEAlgorithm: 'AES256' } }] },
      PublicAccessBlockConfiguration: { BlockPublicAcls: true, BlockPublicPolicy: true, IgnorePublicAcls: true, RestrictPublicBuckets: true },
      VersioningConfiguration: { Status: 'Enabled' },
      LifecycleConfiguration: { Rules: [{ Id: 'ExpireAccessLogs', Status: 'Enabled', ExpirationInDays: 365, NoncurrentVersionExpiration: { NoncurrentDays: 365 } }] },
    });
    expect(bucket.Properties.LoggingConfiguration).toBeUndefined();
    const statements = template.Resources.FileAssetsAccessLogsBucketPolicy.Properties.PolicyDocument.Statement;
    expect(statements).toContainEqual({
      Effect: 'Allow',
      Principal: { Service: 'logging.s3.amazonaws.com' },
      Action: 's3:PutObject',
      Resource: { 'Fn::Join': ['', [{ 'Fn::GetAtt': ['FileAssetsAccessLogsBucket', 'Arn'] }, '/cdk-assets/*']] },
      Condition: {
        StringEquals: { 'aws:SourceAccount': { Ref: 'AWS::AccountId' } },
        ArnLike: { 'aws:SourceArn': { 'Fn::Join': ['', ['arn:', { Ref: 'AWS::Partition' }, ':s3:::', baseline.Resources.StagingBucket.Properties.BucketName]] } },
      },
    });
    expect(statements).toContainEqual(expect.objectContaining({ Effect: 'Deny', Action: 's3:*', Principal: '*', Condition: { Bool: { 'aws:SecureTransport': 'false' } } }));
    // The provider's template is an independent baseline for the bootstrap contract.
    delete source.Properties.LoggingConfiguration;
    delete source.DependsOn;
    delete template.Resources.FileAssetsAccessLogsBucket;
    delete template.Resources.FileAssetsAccessLogsBucketPolicy;
    expect(template).toEqual(baseline);
  } finally {
    rmSync(directory, { recursive: true });
  }
});

test('bootstrap keeps defaults, applies logging to every environment, and refuses to replace existing logging', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'dlz-bootstrap-script-test-'));
  const originalCwd = process.cwd();
  const originalPath = process.env.PATH;
  const template = execFileSync('cdk', ['bootstrap', '--show-template', '--json', '--ci=false'], { encoding: 'utf8' });
  const trace = join(directory, 'commands.jsonl');
  writeFileSync(join(directory, 'vendor.json'), template);
  // A local CLI substitute records inputs; only the AWS STS boundary is mocked.
  writeFileSync(join(directory, 'cdk'), `#!/usr/bin/env node
const fs = require('fs');
const args = process.argv.slice(2);
if (args.includes('--show-template')) process.stdout.write(fs.readFileSync(${JSON.stringify(join(directory, 'vendor.json'))}));
else {
  fs.appendFileSync(${JSON.stringify(trace)}, JSON.stringify(args) + '\\n');
  if (args[0] === 'synth') fs.mkdirSync('cdk.out', {recursive: true});
}
`, { mode: 0o755 });
  const sts = jest.spyOn(STS.prototype, 'send').mockImplementation(async () => ({
    Credentials: { AccessKeyId: 'test', SecretAccessKey: 'test', SessionToken: 'test' },
  }));
  // Jest isolates process.env; forward it at the native subprocess boundary too.
  const nativeCapture = childProcess.execFileSync;
  const capture = jest.spyOn(childProcess, 'execFileSync').mockImplementation((file, args, options) =>
    nativeCapture(file, args, { ...options, env: process.env }));
  try {
    process.chdir(directory);
    process.env.PATH = `${directory}:${originalPath}`;
    const props = {
      localProfile: 'test',
      regions: { global: Region.EU_WEST_1, regional: [Region.US_EAST_1] },
      organization: {
        root: { accounts: { management: { accountId: '111111111111' } } },
        ous: {
          security: { accounts: { log: { accountId: '222222222222' }, audit: { accountId: '333333333333' } } },
          workloads: { accounts: [{ accountId: '444444444444' }] },
          sharedServices: { accounts: { finOps: { accountId: '555555555555' } } },
        },
      },
      finOps: { dataExports: {} },
    } as DataLandingZoneProps;
    const scripts = new Scripts();
    await scripts.boostrapAll(props);
    const defaultCommands = readFileSync(trace, 'utf8').trim().split('\n').map(line => JSON.parse(line) as string[]);
    expect(defaultCommands.some(command => command.includes('--template'))).toBe(false);
    writeFileSync(trace, '');
    await scripts.boostrapAll({ ...props, bootstrapAccessLogging: true });
    const commands = readFileSync(trace, 'utf8').trim().split('\n').map(line => JSON.parse(line) as string[]);
    expect(commands.filter(command => command[0] === 'synth')).toHaveLength(1);
    const bootstraps = commands.filter(command => command[0] === 'bootstrap');
    expect(bootstraps.map(command => command.find(arg => arg.startsWith('aws://'))).sort()).toEqual([
      'aws://111111111111/eu-west-1', 'aws://111111111111/us-east-1',
      'aws://222222222222/eu-west-1', 'aws://222222222222/us-east-1',
      'aws://333333333333/eu-west-1', 'aws://333333333333/us-east-1',
      'aws://444444444444/eu-west-1', 'aws://444444444444/us-east-1',
      'aws://555555555555/eu-west-1', 'aws://555555555555/us-east-1',
    ]);
    for (const command of bootstraps) {
      expect(command[command.indexOf('--template') + 1]).toBe('cdk.out/dlz-bootstrap-access-logging.json');
      expect(command).not.toContain('--force');
    }
    expect(JSON.parse(readFileSync('cdk.out/dlz-bootstrap-access-logging.json', 'utf8')).Resources.StagingBucket.Properties.LoggingConfiguration)
      .toBeDefined();
    const existing = JSON.parse(template);
    existing.Resources.StagingBucket.Properties.LoggingConfiguration = { DestinationBucketName: 'existing-logs' };
    writeFileSync(join(directory, 'vendor.json'), JSON.stringify(existing));
    writeFileSync(trace, '');
    await expect(scripts.boostrapAll({ ...props, bootstrapAccessLogging: true })).rejects.toThrow('refusing to overwrite asset logging');
    expect(readFileSync(trace, 'utf8').trim().split('\n').map(line => JSON.parse(line)[0])).toEqual(['synth']);
  } finally {
    sts.mockRestore();
    capture.mockRestore();
    process.chdir(originalCwd);
    process.env.PATH = originalPath;
    rmSync(directory, { recursive: true });
  }
});
