import { awscdk, javascript } from 'projen';
import { ArrowParens, TrailingComma } from 'projen/lib/javascript';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'DataChefHQ',
  authorAddress: 'hi@datachef.co',
  cdkVersion: '2.133.0',
  defaultReleaseBranch: 'main',
  // https://github.com/projen/projen/pull/3459/files Not yet in the latest projen template started
  jsiiVersion: '~5.3.0',
  typescriptVersion: '~5.3.0',
  name: 'recipes_data-landing-zone_data-landing-zone',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/DataChefHQ/recipes_data-landing-zone_data-landing-zone.git',
  prettierOptions: {
    settings: {
      printWidth: 120,
      useTabs: false,
      tabWidth: 2,
      semi: true,
      singleQuote: true,
      bracketSpacing: true,
      trailingComma: TrailingComma.ES5,
      arrowParens: ArrowParens.ALWAYS,
    },
  },
  pullRequestTemplate: false,
  githubOptions: {
    pullRequestLintOptions: {
      semanticTitleOptions: {
        types: ['feat', 'fix', 'docs', 'ci', 'chore'],
      },
    },
  },
  workflowNodeVersion: '18',
  publishToPypi: {
    distName: 'recipes_dlz',
    module: 'recipes_dlz',
  },
  /* Runtime dependencies of this module that are jsii-enabled. */
  // deps: [ ],
  /*  Runtime dependencies of this module that are NOT jsii-enabled. */
  bundledDeps: ['execa@5.1.1', '@aws-sdk/client-sts', '@aws-sdk/credential-providers'],
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

project.package.addEngine('node', '~18.*');
project.package.addEngine('npm', '~9.*');

project.synth();