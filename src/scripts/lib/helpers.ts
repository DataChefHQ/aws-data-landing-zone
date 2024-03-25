import * as execa from 'execa';
import deasync = require("deasync");
import {spawn} from "child_process";

export async function CommandExec(command: string, args: string[], cwd?: string, echoOutputs = true)
{
  return new Promise((resolve, reject) =>
  {
    let allData = "";
    const call = spawn(command, args, {
      shell: true,
      windowsVerbatimArguments: true,
      cwd: cwd,
      env: { ...process.env, "FORCE_COLOR": "true" },
    });
    let errOutput = "";


    call.stdout.on('data', function (data)
    {
      allData += data.toString();
      echoOutputs && process.stdout.write(data.toString());
    });
    call.stderr.on('data', function (data)
    {
      errOutput = data.toString();
      echoOutputs && process.stderr.write(data.toString());
    });
    call.on('exit', function (code)
    {
      if (code == 0)
        resolve(allData);
      else
        reject(errOutput);
    });
  });
}


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

  console.log("RESP", resp.stdout, resp.stderr);

  if (resp.exitCode !== 0) {
    if (exitProcessOnError) {
      console.error(resp.stderr || resp.stdout);
      process.exit(1);
    }
    else {throw new Error(resp.stderr || resp.stdout);}
  }
  // else

}

export function syncFunction(fn: () => Promise<any>) {
  let done = false;
  (async () => {
    await fn();
    done = true;
  })(); //TODO think here catch

  deasync.loopWhile(() => !done);
}

export function syncFunctionSleep(fn: () => Promise<any>) {
  let done = false;
  (async () => {
    await fn();
    done = true;
  })();

  while(!done) {
    deasync.sleep(100);
  }
}