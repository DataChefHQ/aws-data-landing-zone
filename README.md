# Data Landing Zone

## Directory structure

The directory structure in `src/organization` will always map directly to the AWS Orgainzation structure. 
We don't nest OUs because it has partial support in AWS Control Tower. This means the structure will always be in the 
form of Level 1 OUs, Level 2 accounts (or account types) and Level 3 stacks. This can be visually represented as follows:
```
src/stacks/organization
├── root-stack.ts
├── /ou1
│   └── /account1 OR /account-type
│       ├── stack1.ts
│       └── stack2.ts
```

An Account Type can be seen as the "template" used for the stacks in the account. For example, you might have multiple
develop accounts for different teams/projects: 
``` 
dev-project1
dev-project2
dev-project3
department-a-dev
```

These accounts will all have the same `develop` stacks in them. The same applies for production.

Example of current layout and organization:
```
src/stacks/organization
├── management-stack.ts
├── security
│   ├── log (account)
│   │   ├── global-stack.ts
│   │   └── regional-stack.ts
│   └── audit (account)
│       ├── global-stack.ts
│       └── regional-stack.ts
├── workloads
│   ├── develop (account type)
│   │   ├── global-stack.ts
│   │   └── regional-stack.ts
│   └── production (account type)
│       ├── global-stack.ts
│       └── regional-stack.ts
└── sandbox
    └── sandbox (account type) 
        ├── global-stack.ts
        └── regional-stack.ts
```

Shared code between stacks, accounts and OUs will be placed as close to possible to the usage. In the example below the 
shared code is at the OU level and can be used by all the stacks in all accounts in that OU. If the shared code was within
the `log` folder, it would only be available to the stacks in the `log` folder/account. Nothing enforces this 
convention, but it is a good practice to follow.
```
src/stacks/organization
├── management-stack.ts
├── security
│   ├── shared-workloads.ts    <<<
│   ├── log
│   │   ├── global-stack.ts
│   │   └── regional-stack.ts
│   └── audit
│       ├── global-stack.ts
│       └── regional-stack.ts
```

## Stacks

Each account will have a `global-stack.ts` and a `regional-stack.ts` by default. Most of the time their contents will
be the same, but the `global-stack.ts` will contain extra resources that are global to the account, like IAM roles,
DNS records, etc. The global stack will be in the same global region as the management account and the regional stack
will be deployed in each region that is specified. 

### Stack IDs

Stack IDs have a specific convention so that it enables us to selectively decide what stacks need to be deployed. 
``` 
ou--account--stack--region
```

Double dashes are used to separate the different parts of the stack ID and will not be used in any stack name. Example
of a few stack ids: 
```
root--management--global--eu-west-1
security--log--global--eu-west-1
security--log--regional--us-east-1
security--log--regional--us-west-1
security--auidt--global--eu-west-1
security--auidt--regional--us-east-1
security--auidt--regional--us-west-1
```

This enables the following patterns of deployment:
- `cdk deploy "security--**"` will deploy all stacks in the Security account.
- `cdk deploy "security--log--**"` will deploy all stacks in the Log account.
- `cdk deploy "security--log--regional--**"` will deploy all regional stacks in the Log account.
- `cdk deploy "*--eu-west-1"` will deploy all stacks in the `eu-west-1` region.

We will not make use of these different patterns now, its nice for local testing but the pipelines will always deploy
all stacks. It is just good to have this option as it is setting the construct id of the stack which is a one way door.

## Stack Names
The Stack ID is only used to identify the stack in the CDK, the stack name is what is used in AWS. All stack names 
will be prefixed with `dlz-`. All resources within a stack will prefix their name with the stack name. This is to 
ensure that all resources are easily identifiable as part of the Data Landing Zone. 

For example, the stack ID `security--log--global--eu-west-1`:
- Will have a stack name of `dlz-global`
- A resource like an SNS topic will be `dlz-global-my-topic`

### Stack deployment order

Global stacks will always be deployed before the regional stacks such that the regional stacks can depend on the global
resources. Similarly, the management account will also be deployed first and then all the other accounts.

Legend: 
🌊 - Waves are deployed sequentially
🔲 - Stage are deployed in parallel within a wave
📄 - Stack, indentation shows deployment order, where an indented stack depends on the non lesser indented stack.

The concept of Waves and Stages are concepts and not real AWS resources/constructs.

``` 
🌊 All
    🔲 Management
        📄 root--management--global--eu-west-1
            📄 security--log--global--eu-west-1
                📄 security--log--regional--us-east-1
                📄 security--log--regional--us-west-1
            📄 security--auidt--global--eu-west-1
                📄 security--auidt--regional--us-east-1
                📄 security--auidt--regional--us-west-1
                
🌊 Workloads
    🔲 Develop
        📄 workloads--develop--global--eu-west-1
            📄 workloads--develop--regional--us-east-1
            📄 workloads--develop--regional--us-west-1
    🔲 Production
        📄 workloads--production--global--eu-west-1
            📄 workloads--production--regional--us-east-1
            📄 workloads--production--regional--us-west-1
```


## Testing the package locally

### TypeScript

Add a script to the `package.json` file in the root of the project:

```json
...
  "scripts": {
    "npm-link-manual-rehan": "npm uninstall recipes_data-landing-zone_data && ln -s /Users/rehanvandermerwe/DataChef/Projects/recipes_data-landing-zone_data-landing-zone /Users/rehanvandermerwe/DataChef/Projects/recipes_data-landing-zone_data-landing-zone-sandbox/node_modules"
}
...
```

It is NOT needed to run this script everytime a change is made, only when the package is first installed.

### Python

Create a bash script in the root of the project called `install-locally.sh` with the following content, replacing 
with your correct paths:

```bash
npm run compile --prefix /Users/rehanvandermerwe/DataChef/Projects/recipes_data-landing-zone_data-landing-zone
npm run package:python --prefix /Users/rehanvandermerwe/DataChef/Projects/recipes_data-landing-zone_data-landing-zone
tar -xf /Users/rehanvandermerwe/DataChef/Projects/recipes_data-landing-zone_data-landing-zone/dist/python/recipes_dlz-0.0.0.tar.gz
python3 -m pip install -e recipes_dlz-0.0.0
```

Note that `recipes_dlz` ia thE name we specified in the `projenrc.ts` file.

This needs to be run everytime a change is made and it is needed to test in Python.

## Alternative Testing the package locally

### Data Landing Zone

On the data-landing-zone project root run the following command:

```bash
./npm-link-manual.sh
```

This will run the watch command and do an npm link setting up your project to use as a local package.

### TypeScript

In the typescript project at the root of the project run the following command:

```bash
npm run npm-link-manual
```

This will link the local package to the typescript project pointing to your data-landing-zone project.
