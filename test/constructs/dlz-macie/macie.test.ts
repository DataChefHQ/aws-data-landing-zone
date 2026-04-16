import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import {
  MacieDelegatedAdmin,
  MacieMembers,
  MacieOrgConfig,
} from '../../../src/constructs/dlz-macie';

describe('MacieDelegatedAdmin construct', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');
  new MacieDelegatedAdmin(stack, 'TestAdmin', {
    managementAccountId: '999888777666',
    auditAccountId: '123456789012',
  });
  const template = Template.fromStack(stack);

  test('creates the custom resource with auditAccountId', () => {
    template.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      auditAccountId: '123456789012',
    });
  });
});

describe('MacieOrgConfig construct', () => {
  test('creates custom resource with autoEnable=true', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    new MacieOrgConfig(stack, 'TestOrgConfig', {
      autoEnable: true,
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      autoEnable: 'true',
    });
  });

  test('creates custom resource with autoEnable=false', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    new MacieOrgConfig(stack, 'TestOrgConfig', {
      autoEnable: false,
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      autoEnable: 'false',
    });
  });
});

describe('MacieMembers construct', () => {
  test('serializes enrollAccounts in properties', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    new MacieMembers(stack, 'TestMembers', {
      enrollAccounts: [
        { accountId: '111111111111', email: 'a@example.com' },
        { accountId: '222222222222', email: 'b@example.com' },
      ],
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      enrollAccounts: Match.stringLikeRegexp('111111111111'),
    });
  });

  test('serializes disenrollAccountIds in properties', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    new MacieMembers(stack, 'TestMembers', {
      disenrollAccountIds: ['333333333333', '444444444444'],
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      disenrollAccountIds: Match.stringLikeRegexp('333333333333'),
    });
  });

  test('omits enrollAccounts and disenrollAccountIds when empty', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    new MacieMembers(stack, 'TestMembers', {});
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      enrollAccounts: Match.absent(),
      disenrollAccountIds: Match.absent(),
    });
  });
});
