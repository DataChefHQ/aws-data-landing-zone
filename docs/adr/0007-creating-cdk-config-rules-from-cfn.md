# Creating CDK Config Rules from CloudFormation

**Status:** accepted

**Deciders:** Rehan van der Merwe

**Last updated:** 2024-05-10

## Context

There are no constructs for AWS Config Conformance Packs Rules in the CDK. This is because they are deployed as CFN 
stacks as opposed to CDK constructs. The CDK constructs are created by reading the Conformance Pack CloudFormation YAML
in the https://github.com/awslabs/aws-config-rules/tree/master/aws-config-conformance-packs repository as directed by 
the documentation https://docs.aws.amazon.com/config/latest/developerguide/conformance-packs.html.

There are CDK constructs for AWS Config Rule Identifiers but the parameters are not defined in CDK, the caller has 
to pass that in as an untyped JSON object.

We have twp options: 

The first is to store these YAML CFN conformance packs and then use the CDK L1 construct https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_config.CfnConformancePack.html
which translates to the `AWS::Config::ConformancePack` CFN resource and deploy them together with this 1 resource. 

The second option is to create CDK constructs for each of the conformance packs config rules individually and then
deploy them as a group together symbolizing a conformance pack. 

## Decision

We decided on option two. Creating CDK constructs for each of the conformance packs config rules individually and then
deploying them as a group together symbolizing a conformance pack. This will allow us to have more control over the
config rules and conformance packs and will make it easier to manage them in the future.

Benefits include:
- Input parameters are strongly typed and can easily be changed.
- Config Rules can easily be with reason and can be used in our account reporting.
- It's easier to manage and configure the conformance packs with overlapping rules.

The CFN to CDK generating script has to handle a few edge cases like: 
1. There is no `AWS_CONFIG_PROCESS_CHECK` rule identifier in the CDK `config.ManagedRuleIdentifiers` class. Some custom
logic is required: 

A normal rule:
```yml
  CloudTrailCloudWatchLogsEnabled:
    Properties:
      ConfigRuleName: cloud-trail-cloud-watch-logs-enabled
      Source:
        Owner: AWS
        SourceIdentifier: CLOUD_TRAIL_CLOUD_WATCH_LOGS_ENABLED
    Type: AWS::Config::ConfigRule
```

Becomes `CloudTrailCloudWatchLogsEnabled.ts`
```typescript
/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import * as config from 'aws-cdk-lib/aws-config';
import {DlzConfigRuleReportItem, IDlzConfigRule} from '../rule';

/**
 * Checks whether AWS CloudTrail trails are configured to send logs to Amazon CloudWatch Logs.
 * https://docs.aws.amazon.com/config/latest/developerguide/cloud-trail-cloud-watch-logs-enabled.html
 */
export class CloudTrailCloudWatchLogsEnabled implements IDlzConfigRule {
  readonly configRuleName = 'cloud-trail-cloud-watch-logs-enabled';
  readonly description = 'Checks whether AWS CloudTrail trails are configured to send logs to Amazon CloudWatch Logs. https://docs.aws.amazon.com/config/latest/developerguide/cloud-trail-cloud-watch-logs-enabled.html';
  readonly identifier = config.ManagedRuleIdentifiers.CLOUD_TRAIL_CLOUD_WATCH_LOGS_ENABLED;
  
  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Checks whether AWS CloudTrail trails are configured to send logs to Amazon CloudWatch Logs.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/cloud-trail-cloud-watch-logs-enabled.html',
  };
  
}
```

Whereas an `AWS_CONFIG_PROCESS_CHECK` becomes:
```yml
  AccountContactDetailsConfigured:
    Properties:
      ConfigRuleName: account-contact-details-configured
      Description: Ensure the contact email and telephone number for AWS accounts are current and map to more than one individual in your organization. Within the My Account section of the console ensure correct information is specified in the Contact Information section.
      Source:
        Owner: AWS
        SourceIdentifier: AWS_CONFIG_PROCESS_CHECK
    Type: AWS::Config::ConfigRule
```

Becomes:
```typescript
/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

import {DlzConfigRuleReportItem, IDlzConfigRule} from '../rule';

/**
 * Ensure the contact email and telephone number for AWS accounts are current and map to more than one individual in your organization. Within the My Account section of the console ensure correct information is specified in the Contact Information section.
 * https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html
 */
export class ProcessCheckAccountContactDetailsConfigured implements IDlzConfigRule {
  readonly configRuleName = 'account-contact-details-configured';
  readonly description = 'Ensure the contact email and telephone number for AWS accounts are current and map to more than one individual in your organization. Within the My Account section of the console ensure correct information is specified in the Contact Information section. h';
  readonly identifier = 'AWS_CONFIG_PROCESS_CHECK';
  
  readonly reportItem: DlzConfigRuleReportItem = {
    description: 'Ensure the contact email and telephone number for AWS accounts are current and map to more than one individual in your organization. Within the My Account section of the console ensure correct information is specified in the Contact Information section.',
    externalLink: 'https://docs.aws.amazon.com/config/latest/developerguide/aws-config-process-check.html',
  };
  
}
```

## Consequences

