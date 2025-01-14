import { AssumeRoleCommand, STS } from '@aws-sdk/client-sts';
import { fromIni } from '@aws-sdk/credential-providers';
//eslint-disable-next-line @typescript-eslint/no-require-imports
import execa = require('execa');

export async function runCommand(
  command: string,
  args: string,
  options: {
    stdout?: 'inherit' | 'pipe' | 'ignore';
    stderr?: 'inherit' | 'pipe' | 'ignore';
    env?: Record<string, string>;
    cwd?: string;
  } = {
  },
  echoCommand: boolean = true,
  exitProcessOnError: boolean = true,
) {

  if (echoCommand) console.log('> Running:', command, args);

  const resp = await execa(command, args.split(' '), {
    stdout: options.stdout || 'inherit',
    stderr: options.stderr || 'inherit',
    env: options.env,
    cwd: options.cwd,
    preferLocal: true,
    reject: false,
    shell: true,
  });

  if (resp.exitCode !== 0) {
    if (exitProcessOnError) {
      console.error(resp.stderr || resp.stdout);
      process.exit(1);
    } else {throw new Error(resp.stderr || resp.stdout);}
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