import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import {
  DlzTagComplianceCentralAlert,
  DlzTagComplianceForwardingRule,
} from '../src/constructs/dlz-tag-compliance-alert';

const MANDATORY_TAG_KEYS = ['Owner', 'Project', 'Environment', 'CostCenter', 'Name'];

function centralTemplate(props: { emails?: string[]; slacks?: any[] }) {
  const stack = new Stack(new App(), 'test', { env: { account: '111111111111', region: 'eu-west-1' } });
  new DlzTagComplianceCentralAlert(stack, 'central', {
    organizationId: 'o-abcd1234',
    mandatoryTagKeys: MANDATORY_TAG_KEYS,
    emails: props.emails,
    slacks: props.slacks,
  });
  return Template.fromStack(stack);
}

describe('DlzTagComplianceCentralAlert', () => {
  test('creates a dedicated event bus with the shared constant name', () => {
    const t = centralTemplate({ emails: ['tags@example.com'] });
    t.hasResourceProperties('AWS::Events::EventBus', Match.objectLike({
      Name: DlzTagComplianceCentralAlert.BUS_NAME,
    }));
  });

  test('scopes the bus resource policy to the organization', () => {
    const t = centralTemplate({ emails: ['tags@example.com'] });
    t.hasResourceProperties('AWS::Events::EventBusPolicy', Match.objectLike({
      Statement: Match.objectLike({
        Action: 'events:PutEvents',
        Condition: { StringEquals: { 'aws:PrincipalOrgID': 'o-abcd1234' } },
      }),
    }));
  });

  test('routes NON_COMPLIANT findings on the central bus to an SNS topic', () => {
    const t = centralTemplate({ emails: ['tags@example.com'] });
    t.resourceCountIs('AWS::SNS::Topic', 1);
    t.hasResourceProperties('AWS::Events::Rule', Match.objectLike({
      EventBusName: Match.anyValue(),
      EventPattern: Match.objectLike({
        'source': ['aws.config'],
        'detail-type': ['Config Rules Compliance Change'],
        'detail': {
          messageType: ['ComplianceChangeNotification'],
          newEvaluationResult: { complianceType: ['NON_COMPLIANT'] },
        },
      }),
    }));
  });

  test('formats via a Lambda that looks up the account name and publishes to the topic', () => {
    const t = centralTemplate({ emails: ['tags@example.com'] });
    // Formatter Lambda on Node 22 with the topic ARN in its env.
    t.hasResourceProperties('AWS::Lambda::Function', Match.objectLike({
      Runtime: 'nodejs22.x',
      Handler: 'index.handler',
      Environment: {
        Variables: Match.objectLike({
          TOPIC_ARN: Match.anyValue(),
          READ_ROLE_NAME: Match.anyValue(),
          MANDATORY_TAG_KEYS: 'Owner,Project,Environment,CostCenter,Name',
        }),
      },
    }));
    // Least-privilege: can resolve the account id -> name and owner (SlackId tag).
    t.hasResourceProperties('AWS::IAM::Policy', Match.objectLike({
      PolicyDocument: Match.objectLike({
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: ['organizations:DescribeAccount', 'organizations:ListTagsForResource'],
            Effect: 'Allow',
            Resource: '*',
          }),
        ]),
      }),
    }));
    // Can assume the read role in any account that reports a finding, and nothing else.
    t.hasResourceProperties('AWS::IAM::Policy', Match.objectLike({
      PolicyDocument: Match.objectLike({
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Resource: Match.stringLikeRegexp('^arn:aws:iam::\\*:role/dlz-'),
          }),
        ]),
      }),
    }));
  });

  test('holds findings in a delay queue with a dead-letter queue, and reads them from there', () => {
    const t = centralTemplate({ emails: ['tags@example.com'] });
    t.hasResourceProperties('AWS::SQS::Queue', Match.objectLike({
      DelaySeconds: 120,
      RedrivePolicy: Match.objectLike({ maxReceiveCount: 3 }),
    }));
    t.resourceCountIs('AWS::Lambda::EventSourceMapping', 1);
  });

  test('the central rule targets the queue, not the formatter directly', () => {
    const t = centralTemplate({ emails: ['tags@example.com'] });
    const rules = t.findResources('AWS::Events::Rule');
    const targets = Object.values(rules).flatMap(rule => rule.Properties.Targets);
    expect(targets).toHaveLength(1);
    expect(targets[0].Arn['Fn::GetAtt'][0]).toMatch(/findings/i);
  });

  test('subscribes every email to the topic', () => {
    const t = centralTemplate({ emails: ['a@example.com', 'b@example.com'] });
    t.resourceCountIs('AWS::SNS::Subscription', 2);
    for (const email of ['a@example.com', 'b@example.com']) {
      t.hasResourceProperties('AWS::SNS::Subscription', Match.objectLike({ Protocol: 'email', Endpoint: email }));
    }
  });

  test('creates a notify-only Slack channel config with an un-suffixed stable name', () => {
    const t = centralTemplate({
      slacks: [{ slackChannelConfigurationName: 'aws-tags-alerts', slackWorkspaceId: 'T1', slackChannelId: 'C1' }],
    });
    t.hasResourceProperties('AWS::Chatbot::SlackChannelConfiguration', Match.objectLike({
      SlackChannelId: 'C1',
      SlackWorkspaceId: 'T1',
      ConfigurationName: 'aws-tags-alerts',
    }));
  });

  test('throws when no email or slack channel is given', () => {
    const stack = new Stack(new App(), 'test');
    expect(() => new DlzTagComplianceCentralAlert(stack, 'central', {
      organizationId: 'o-abcd1234',
      mandatoryTagKeys: MANDATORY_TAG_KEYS,
    })).toThrow(/at least one email or slack channel/);
  });

  test('busArn is built from the management account id and global region', () => {
    expect(DlzTagComplianceCentralAlert.busArn('111111111111', 'eu-west-1'))
      .toBe(`arn:aws:events:eu-west-1:111111111111:event-bus/${DlzTagComplianceCentralAlert.BUS_NAME}`);
  });
});

describe('DlzTagComplianceForwardingRule', () => {
  const centralBusArn = DlzTagComplianceCentralAlert.busArn('999999999999', 'eu-west-1');

  function forwardingTemplate() {
    const stack = new Stack(new App(), 'test', { env: { account: '111111111111', region: 'eu-central-1' } });
    new DlzTagComplianceForwardingRule(stack, 'forward', {
      configRuleNames: ['config-required-tags'],
      centralBusArn,
    });
    return Template.fromStack(stack);
  }

  test('forwards NON_COMPLIANT findings for the given rules to the central bus', () => {
    const t = forwardingTemplate();
    t.hasResourceProperties('AWS::Events::Rule', Match.objectLike({
      EventPattern: Match.objectLike({
        'source': ['aws.config'],
        'detail-type': ['Config Rules Compliance Change'],
        'detail': {
          messageType: ['ComplianceChangeNotification'],
          configRuleName: ['config-required-tags'],
          newEvaluationResult: { complianceType: ['NON_COMPLIANT'] },
        },
      }),
      Targets: Match.arrayWith([Match.objectLike({ Arn: centralBusArn })]),
    }));
  });

  test('grants the rule role PutEvents scoped to the central bus only', () => {
    const t = forwardingTemplate();
    t.hasResourceProperties('AWS::IAM::Policy', Match.objectLike({
      PolicyDocument: Match.objectLike({
        Statement: Match.arrayWith([Match.objectLike({
          Action: 'events:PutEvents',
          Effect: 'Allow',
          Resource: centralBusArn,
        })]),
      }),
    }));
  });

  test('creates no local SNS topic or Chatbot config (central-only fan-out)', () => {
    const t = forwardingTemplate();
    t.resourceCountIs('AWS::SNS::Topic', 0);
    t.resourceCountIs('AWS::Chatbot::SlackChannelConfiguration', 0);
  });
});
