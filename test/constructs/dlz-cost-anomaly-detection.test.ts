import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as sns from 'aws-cdk-lib/aws-sns';
import {
  DlzCostAnomalyDetection,
  DlzCostAnomalyDetectionProps,
} from '../../src/constructs/dlz-cost-anomaly-detection';
import { GlobalVariablesBudgetSnsCacheRecord } from '../../src/data-landing-zone-types';

const synth = (props: DlzCostAnomalyDetectionProps, cache: Record<string, GlobalVariablesBudgetSnsCacheRecord> = {}) => {
  const app = new App();
  const stack = new Stack(app, 'TestStack', { env: { account: '111111111111', region: 'us-east-1' } });
  new DlzCostAnomalyDetection(stack, 'TestAnomaly', props, cache);
  return { stack, template: Template.fromStack(stack) };
};

describe('DlzCostAnomalyDetection', () => {
  test('creates a DIMENSIONAL monitor with default SERVICE dimension', () => {
    const { template } = synth({
      monitors: [{
        name: 'service-monitor',
        thresholdUsd: 100,
        subscribers: { emails: ['ops@example.com'] },
      }],
    });

    template.hasResourceProperties('AWS::CE::AnomalyMonitor', {
      MonitorName: 'service-monitor',
      MonitorType: 'DIMENSIONAL',
      MonitorDimension: 'SERVICE',
    });
    template.hasResourceProperties('AWS::CE::AnomalySubscription', {
      SubscriptionName: 'service-monitor',
      Threshold: 100,
      Frequency: 'IMMEDIATE',
    });
  });

  test('creates a CUSTOM monitor when tagKey is set', () => {
    const { template } = synth({
      monitors: [{
        name: 'tag-monitor',
        tagKey: 'CostCenter',
        thresholdUsd: 50,
        subscribers: { emails: ['ops@example.com'] },
      }],
    });

    template.hasResourceProperties('AWS::CE::AnomalyMonitor', {
      MonitorName: 'tag-monitor',
      MonitorType: 'CUSTOM',
      MonitorSpecification: Match.stringLikeRegexp('CostCenter'),
    });
  });

  test('rejects monitors that set both dimension and tagKey', () => {
    expect(() =>
      synth({
        monitors: [{
          name: 'bad-monitor',
          dimension: 'SERVICE',
          tagKey: 'CostCenter',
          thresholdUsd: 10,
          subscribers: { emails: ['ops@example.com'] },
        }],
      }),
    ).toThrow(/mutually exclusive/);
  });

  test('reuses a cached SNS topic when the topic name matches', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack', { env: { account: '111111111111', region: 'us-east-1' } });
    const cachedTopic = new sns.Topic(stack, 'pre-existing-topic', { topicName: 'shared' });
    const cache: Record<string, GlobalVariablesBudgetSnsCacheRecord> = {
      shared: { topic: cachedTopic, subscribers: { snsTopicName: 'shared' } },
    };

    new DlzCostAnomalyDetection(stack, 'TestAnomaly', {
      monitors: [{
        name: 'monitor-a',
        thresholdUsd: 100,
        subscribers: { snsTopicName: 'shared' },
      }],
    }, cache);

    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::SNS::Topic', 1);
  });

  test('subscribes the anomaly subscription to the resolved topic', () => {
    const { template } = synth({
      monitors: [{
        name: 'service-monitor',
        thresholdUsd: 100,
        subscribers: { emails: ['ops@example.com'] },
      }],
    });
    template.hasResourceProperties('AWS::CE::AnomalySubscription', {
      Subscribers: Match.arrayWith([
        Match.objectLike({ Type: 'SNS' }),
      ]),
    });
  });
});
