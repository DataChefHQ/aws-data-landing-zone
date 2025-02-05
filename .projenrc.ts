import { awscdk, javascript, JsonPatch } from 'projen';
import { ArrowParens, TrailingComma } from 'projen/lib/javascript';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'DataChefHQ',
  authorAddress: 'hi@datachef.co',
  cdkVersion: '2.133.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.5.0',
  typescriptVersion: '~5.5.0',
  name: 'aws-data-landing-zone',
  description: 'AWS CDK Data Landing Zone construct',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/DataChefHQ/aws-data-landing-zone.git',
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
  publishToPypi: {
    distName: 'aws-data-landing-zone',
    module: 'aws_data_landing_zone',
  },
  /* Runtime dependencies of this module that are jsii-enabled. Must be defined in peerDeps as well */
  deps: [
    'cdk-express-pipeline',
  ],
  peerDeps: [
    'cdk-express-pipeline',
  ],
  /*  Runtime dependencies of this module that are NOT jsii-enabled. */
  bundledDeps: [
    '@aws-sdk/client-sts',
    '@aws-sdk/credential-providers',
    '@aws-sdk/client-cost-explorer',
    'table',
    '@aws-sdk/client-identitystore',
    '@aws-sdk/client-sso-admin',
    '@aws-sdk/client-iam',
    '@aws-sdk/client-cloudformation',
    'js-yaml',
    '@types/js-yaml',
  ],
  /* Build dependencies for this repo/module. */
  devDeps: ['husky', '@types/aws-lambda', '@types/aws-sdk', '@types/node'],
  /* The "name" in package.json. */
  // packageName: undefined,
  jestOptions: {
    jestConfig: {
      moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs', 'cjs', 'jsx', 'json', 'node'], // https://jestjs.io/docs/configuration#modulefileextensions-arraystring
    },
  },
});


project.bundler.addBundle('./src/constructs/iam-identity-center/identity-store-user-lambda/', {
  platform: 'node',
  target: 'node18',
  sourcemap: true,
  externals: ['aws-sdk'],
});
project.bundler.addBundle('./src/constructs/iam/lambda/iam-account-alias/', {
  platform: 'node',
  target: 'node18',
  sourcemap: true,
  externals: ['aws-sdk'],
});

project.eslint!.addRules({
  'no-bitwise': 'off',
});

project.package.addEngine('node', '~20.*');
project.package.addEngine('npm', '~10.*');


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
project.gitignore.addPatterns('.vscode/');

project.tasks.tryFind('docgen')?.exec('bash post-docgen.sh');

const ghReleaseWorkflow = project.tryFindObjectFile('.github/workflows/release.yml');
ghReleaseWorkflow?.patch(JsonPatch.add('/on/push/paths-ignore', ['docs/**']));

project.synth();