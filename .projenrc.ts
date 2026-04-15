import { awscdk, javascript, JsonPatch } from 'projen';
import { ArrowParens, TrailingComma } from 'projen/lib/javascript';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'DataChefHQ',
  authorAddress: 'hi@datachef.co',
  cdkVersion: '2.248.0',
  defaultReleaseBranch: 'main',
  constructsVersion: '10.6.0',
  cdkVersionPinning: false,
  jsiiVersion: '^5.9.37',
  typescriptVersion: '^5.9',
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
  workflowNodeVersion: '22',
  compat: true,
  publishToPypi: {
    distName: 'aws-data-landing-zone',
    module: 'aws_data_landing_zone',
  },
  deps: [
    'cdk-express-pipeline@^1.6.0',
  ],
  peerDeps: [
    'cdk-express-pipeline@^1.6.0',
  ],
  bundledDeps: [
    '@aws-sdk/client-sts@^3.1030.0',
    '@aws-sdk/credential-providers@^3.1030.0',
    '@aws-sdk/client-cost-explorer@^3.1030.0',
    '@aws-sdk/client-identitystore@^3.1030.0',
    '@aws-sdk/client-sso-admin@^3.1030.0',
    '@aws-sdk/client-iam@^3.1030.0',
    '@aws-sdk/client-cloudformation@^3.1030.0',
    '@aws-sdk/client-guardduty@^3.1030.0',
    '@aws-sdk/client-organizations@^3.1030.0',
    'js-yaml@^4.1',
    '@types/js-yaml',
    'table',
  ],
  devDeps: ['husky', '@types/aws-lambda', '@types/aws-sdk', '@types/node@^22', 'cdk-express-pipeline@^1.6.0'],
  jestOptions: {
    jestConfig: {
      moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs', 'cjs', 'jsx', 'json', 'node'], // https://jestjs.io/docs/configuration#modulefileextensions-arraystring
    },
  },
});


project.bundler.addBundle('./src/constructs/iam-identity-center/identity-store-user-lambda/', {
  platform: 'node',
  target: 'node22',
  sourcemap: true,
  externals: ['aws-sdk'],
});
project.bundler.addBundle('./src/constructs/iam/lambda/iam-account-alias/', {
  platform: 'node',
  target: 'node22',
  sourcemap: true,
  externals: ['aws-sdk'],
});
project.bundler.addBundle('./src/constructs/dlz-guardduty/lambda/guardduty-delegated-admin/', {
  platform: 'node',
  target: 'node22',
  sourcemap: true,
  externals: ['aws-sdk'],
});
project.bundler.addBundle('./src/constructs/dlz-guardduty/lambda/guardduty-member-features/', {
  platform: 'node',
  target: 'node22',
  sourcemap: true,
  externals: ['aws-sdk'],
});
project.bundler.addBundle('./src/constructs/dlz-guardduty/lambda/guardduty-org-config/', {
  platform: 'node',
  target: 'node22',
  sourcemap: true,
  externals: ['aws-sdk'],
});

project.eslint!.addRules({
  'no-bitwise': 'off',
});

project.package.addEngine('node', '^22');
project.package.addEngine('npm', '^10');


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