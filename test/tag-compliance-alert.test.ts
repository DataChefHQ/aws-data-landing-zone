import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { DlzTagComplianceAlert } from '../src/constructs/dlz-tag-compliance-alert';

function template(emails: string[]) {
  const stack = new Stack(new App(), 'test', { env: { account: '111111111111', region: 'eu-west-1' } });
  new DlzTagComplianceAlert(stack, 'alert', {
    configRuleNames: ['dlz-config-required-tags'],
    emails,
  });
  return Template.fromStack(stack);
}

describe('DlzTagComplianceAlert', () => {
  test('routes NON_COMPLIANT config findings for the given rules to an SNS topic', () => {
    const t = template(['tags@example.com']);
    t.resourceCountIs('AWS::SNS::Topic', 1);
    t.hasResourceProperties('AWS::Events::Rule', Match.objectLike({
      EventPattern: Match.objectLike({
        'source': ['aws.config'],
        'detail-type': ['Config Rules Compliance Change'],
        'detail': {
          messageType: ['ComplianceChangeNotification'],
          configRuleName: ['dlz-config-required-tags'],
          newEvaluationResult: { complianceType: ['NON_COMPLIANT'] },
        },
      }),
    }));
  });

  test('subscribes every email to the topic', () => {
    const t = template(['a@example.com', 'b@example.com']);
    t.resourceCountIs('AWS::SNS::Subscription', 2);
    for (const email of ['a@example.com', 'b@example.com']) {
      t.hasResourceProperties('AWS::SNS::Subscription', Match.objectLike({
        Protocol: 'email',
        Endpoint: email,
      }));
    }
  });

  test('the EventBridge rule targets the SNS topic', () => {
    const t = template(['tags@example.com']);
    t.hasResourceProperties('AWS::Events::Rule', Match.objectLike({
      Targets: Match.arrayWith([Match.objectLike({ Arn: Match.anyValue() })]),
    }));
  });

  test('creates a notify-only Slack channel config subscribed to the topic', () => {
    const stack = new Stack(new App(), 'test', { env: { account: '111111111111', region: 'eu-west-1' } });
    new DlzTagComplianceAlert(stack, 'alert', {
      configRuleNames: ['dlz-config-required-tags'],
      slacks: [{ slackChannelConfigurationName: 'aws-tags-alerts', slackWorkspaceId: 'T1', slackChannelId: 'C1' }],
    });
    const t = Template.fromStack(stack);
    t.hasResourceProperties('AWS::Chatbot::SlackChannelConfiguration', Match.objectLike({
      SlackChannelId: 'C1',
      SlackWorkspaceId: 'T1',
      ConfigurationName: 'aws-tags-alerts-eu-west-1',
    }));
  });

  test('throws when no email or slack channel is given', () => {
    const stack = new Stack(new App(), 'test');
    expect(() => new DlzTagComplianceAlert(stack, 'alert', { configRuleNames: ['r'] }))
      .toThrow(/at least one email or slack channel/);
  });
});
