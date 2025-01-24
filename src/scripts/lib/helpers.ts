import { spawn } from 'child_process';
import { AssumeRoleCommand, STS } from '@aws-sdk/client-sts';
import { fromIni } from '@aws-sdk/credential-providers';

export async function runCommand(
  command: string,
  args: string,
  options: {
    env?: Record<string, string>;
    cwd?: string;
  } = {},
  outputPrefix: string = '',
  echoCommand: boolean = true,
  exitProcessOnError: boolean = true,
) {

  if (echoCommand) console.log(outputPrefix + '> Running:', command, args);

  const argsArray = args.split(' ');
  const child = spawn(command, argsArray, {
    stdio: ['inherit', 'pipe', 'pipe'],
    env: {
      ...process.env,
      ...options.env,
      FORCE_COLOR: 'true',
    },
    cwd: options.cwd,
    shell: true,
  });

  let stdoutAll = '';
  let stderrAll = '';

  let stdoutLineBuffer = '';
  child.stdout.on('data', (data) => {
    stdoutAll += data;
    stdoutLineBuffer += data;
    let lines = stdoutLineBuffer.split('\n');
    stdoutLineBuffer = lines.pop() || '';
    lines.forEach(line => console.log(outputPrefix + line));
  });

  let stderrLineBuffer = '';
  child.stderr.on('data', (data) => {
    stderrAll += data;
    stderrLineBuffer += data;
    let lines = stderrLineBuffer.split('\n');
    stderrLineBuffer = lines.pop() || '';
    lines.forEach(line => console.log(outputPrefix + line));
  });

  const exitCode = await new Promise<number>((resolve, reject) => {
    child.on('close', resolve);
    child.on('error', reject);
  });

  if (exitCode !== 0) {
    if (exitProcessOnError) {
      process.exit(1);
    } else {
      throw new Error((stderrAll || stdoutAll).split('\n').map((line) => outputPrefix+line.trim()).join('\n'));
    }
  }
}

export async function assumeRole(profile: string, region: string, roleArn: string, sessionName: string) {
  const stsClient = new STS({
    region,
    credentials: !process.env.CI ? fromIni({
      profile,
    }) : undefined,
  });

  const response = await stsClient.send(new AssumeRoleCommand({
    RoleArn: roleArn,
    RoleSessionName: sessionName,
  }));
  if (!response.Credentials) {throw new Error('No credentials returned from AssumeRole');}

  return response.Credentials;
}