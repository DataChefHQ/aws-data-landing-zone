//eslint-disable-next-line @typescript-eslint/no-require-imports
import execa = require('execa');

export async function runCommand(
  command: string,
  args: string,
  options: {
    stdout?: 'inherit' | 'pipe' | 'ignore';
    stderr?: 'inherit' | 'pipe' | 'ignore';
    env?: Record<string, string>;
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
