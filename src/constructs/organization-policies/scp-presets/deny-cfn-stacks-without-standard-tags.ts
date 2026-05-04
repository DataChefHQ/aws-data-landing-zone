import * as iam from 'aws-cdk-lib/aws-iam';
import { DlzTag } from '../tag-policy';

/** Denies CloudFormation stack creation unless required tags are present (and match values, if constrained). */
export class ScpDenyCfnStacksWithoutStandardTags {
  public static statement(tags: DlzTag[]): iam.PolicyStatement {
    return new iam.PolicyStatement({
      sid: 'DenyCfnStacksWithoutStandardTags',
      effect: iam.Effect.DENY,
      actions: ['cloudformation:CreateStack'],
      resources: ['*'],
      conditions: {
        Null: tags.reduce<Record<string, string[] | boolean>>((acc, tag) => {
          acc[`aws:RequestTag/${tag.name}`] = tag.values ? tag.values : true;
          return acc;
        }, {}),
      },
    });
  }
}
