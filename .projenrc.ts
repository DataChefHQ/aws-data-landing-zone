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
  name: '@DataChefHQ/data-landing-zone', //TODO: Change back when using NPM
  // name: 'data-landing-zone', //TODO: Change back when using NPM
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/DataChefHQ/recipes_data-landing-zone_data-landing-zone.git',
  tsconfig: {
    compilerOptions: {
      sourceMap: true,
      inlineSourceMap: true,
    },
  },
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
  workflowNodeVersion: '20',
  // Publishing disabled as no secrets are set yet.
  publishToPypi: {
    distName: 'recipes_dlz',
    module: 'recipes_dlz',
  },
  /* Runtime dependencies of this module that are jsii-enabled. */
  // deps: [ ],
  /*  Runtime dependencies of this module that are NOT jsii-enabled. */
  bundledDeps: ['execa@5.1.1', '@aws-sdk/client-sts', '@aws-sdk/credential-providers', '@aws-sdk/client-cost-explorer', 'table', 'aws-lambda', '@aws-sdk/client-identitystore', '@aws-sdk/client-sso-admin', '@aws-sdk/client-ssm', '@aws-sdk/client-sts'],
  // description: undefined,
  /* Build dependencies for this repo/module. */
  devDeps: ['husky', '@types/aws-lambda', '@types/aws-sdk', '@types/node'],
  /* The "name" in package.json. */
  // packageName: undefined,
  jestOptions: {
    jestConfig: {
      moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs', 'cjs', 'jsx', 'json', 'node'], // https://jestjs.io/docs/configuration#modulefileextensions-arraystring
    },
  },
  npmRegistryUrl: 'https://npm.pkg.github.com',
});


project.bundler.addBundle('./src/constructs/iam-identity-center/identity-store-user-lambda/', {
  platform: 'node',
  target: 'node20',
  sourcemap: true,
  externals: ['aws-sdk'],
});

project.eslint!.addRules({
  'no-bitwise': 'off',
});

project.package.addEngine('node', '~20.*');
project.package.addEngine('npm', '~10.*');

// `publishToPypi` needs to be specified above for the `package:python` command to be available to be used locally.
// The `release.yml` GH Workflow will fail to publish a new GH release as teh secrets have not been set to publish to
// PyPi in the `release_python` job. The GitHub release depends on both of these jobs. For now we need to remove the
// `release_python` dependency so that the GH release is created. This is needed for Projen to know what the next
// version is when it publishes.
const releaseWorkflow = project.tryFindObjectFile('.github/workflows/release.yml');
releaseWorkflow?.addOverride('jobs.release_github.needs', ['release', 'release_npm']);

// Need to clear before compiling and packaging. Have to remove these because they are not cleared for some reason,
// only new files are added and it causes issues especially because when changing the folder structure the whole time.
const clear = project.addTask('clear-lib-and-dist');
clear.exec('rm -rf lib/ dist/');

// Only run husky if not in CI, in the post install script
project.package.setScript('prepare', 'if [ "$CI" = "true" ]; then echo "CI detected, not running husky"; else husky; fi');

project.gitignore.addPatterns('.dlz-reports');
project.gitignore.addPatterns('.idea');
project.gitignore.addPatterns('*.js');
project.gitignore.addPatterns('*.js.map');
project.gitignore.addPatterns('*.d.ts');
project.gitignore.addPatterns('*.DS_Store');

project.synth();