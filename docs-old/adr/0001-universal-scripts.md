# Universal Scripts

**Status:** accepted

**Deciders:** Rehan van der Merwe

**Last updated:** 2024-03-25

## Context

We need universal scripts that can be run easily no matter the Language chosen for the Projen/CDK application. These scripts
will elevate some of the ClickOps work. This means that the scripts need to ship with the TS Project and be able to be
run in any Language.

## Decision

**We chose Option 2**, to write the scripts in TS and don't ship a broken version to other languages.

### Option 1: Write the scripts in TS and leverage JSII to interop them to other languages

Projen/JSII can not ship any files except for the JS and interop files for other languages. This means that we can not
ship bash scripts with the project, it will just be ignored. The solution is to write them in TS and export them
so that JSII transpiles/interops them correctly for other languages to use as well.

There are some difficulties with this approach. The scrips are async and they are not well-supported in JSII. They
work, but they are blocking, so we only get the command's output when it finishes, not as it is running. It is briefly
explained [here](https://github.com/aws/jsii/issues/4133#issuecomment-1580294668) that the communication is one-way IPC
between the Language (host) and the JSII interop(client) JS files.

The above problem does not exist for the TS usage of the package as no JSII interop is used there.

Another problem is that other languages (only tested Python) do not return the output in the correct order. The 
standard input/output/error streams is not working as expected. The output is concatenated and returned in the wrong 
order. There is no running theory onto why this is happening, but it probably has to do with the one way communication
problem mentioned above and the blocking nature of JSII. This is not something we can easily solve.

### Option 2: Write the scripts in TS and don't ship a broken version to other languages

This option is the same as Option 1, but we write in a specific way (no classes) so that JSII does not try to interop
the scripts to other languages. This way the scripts can only be run in TS and the other languages will have to write
their own scripts.

The usage of these scripts by the caller outside the package is simple:
```ts
await scripts.bootstrap.all(config);
```

The caller has to decide when to use it, below is the contents of new file they create, `scripts.ts` in the caller repo.
```ts
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { scripts } from 'recipes_data-landing-zone_data-landing-zone/src';
import {config} from "./config";

export async function entryFunction(functions: Record<string, () => any>)
{
  const argv = yargs(hideBin(process.argv))
    .option('function', {
      alias: 'f',
      describe: 'the function you want to run',
      choices: Object.keys(functions),
    })
    .demandOption(['f']).argv as any;

  // @ts-ignore
  await functions[argv.f]();
}

(async () => {
  await entryFunction({
    bootstrap: async () => {
       await scripts.bootstrap.all(config);
    },
  });
})();
```

The bootstrap script can then be accessed by using the `-f` or `--function` argument  run like this:
```bash
npx ts-node --prefer-ts-exts scripts -f=bootstrap
```
The `npx ts-node --prefer-ts-exts` is just to start a TS script using node and always prefer TS `script` file over JS file.

### Option 3: Write and store the scripts in a different repo/package

This needs exploring but will require more work. The scripts will need to be written in something like bash or if
in TS then it must be executed from other languages like Python. Having a universal config in that project's language 
*will not be possible, the config would have to be stored in something like JSON that can be read by the CDK language
and then the script language. This is a lot of work and will not be done now, but is the best solution in the long run.

## Consequences

Option 1 was explored in detail in https://github.com/DataChefHQ/aws-data-landing-zone/tree/feature/universal-scripts-failed-attempt
and https://github.com/DataChefHQ/aws-data-landing-zone-sandbox/tree/feature/universal-scripts-failed-attempt.
The projen project also contains a python test zip of how the scripts were used in Python. The TS version is working 
but the Python version is in a broken state. 

It is not possible to use Option 1, due to the blocking nature of JSII and the one-way IPC communication. We already 
got creative with methods while exploring this option, to the point that calling these hacks is appropriate.  

We chose Option 2 because it is the better implementation for the time being. The scripts are written in TS and can
only be used in a TS CDK project. Just like HCL is the language for Terraform, TS will be the language for the scripts.
The library will still be a projen project and use JSII to interop with other languages, but the scripts will not. 

A short-term solution is for other languages to install the NPM package and run the TS scripts from there. The 
long term solution is option 3, but that will require a lot more work and research. We can evaluate if that is needed
in the future depending on the amount of manual (non IaC) scripts we create.

