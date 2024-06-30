# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### AuditGlobalStack <a name="AuditGlobalStack" id="data-landing-zone.AuditGlobalStack"></a>

#### Initializers <a name="Initializers" id="data-landing-zone.AuditGlobalStack.Initializer"></a>

```typescript
import { AuditGlobalStack } from 'data-landing-zone'

new AuditGlobalStack(scope: Construct, stackProps: DlzStackProps, props: DataLandingZoneProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.AuditGlobalStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#data-landing-zone.AuditGlobalStack.Initializer.parameter.stackProps">stackProps</a></code> | <code><a href="#data-landing-zone.DlzStackProps">DlzStackProps</a></code> | *No description.* |
| <code><a href="#data-landing-zone.AuditGlobalStack.Initializer.parameter.props">props</a></code> | <code><a href="#data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="data-landing-zone.AuditGlobalStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `stackProps`<sup>Required</sup> <a name="stackProps" id="data-landing-zone.AuditGlobalStack.Initializer.parameter.stackProps"></a>

- *Type:* <a href="#data-landing-zone.DlzStackProps">DlzStackProps</a>

---

##### `props`<sup>Required</sup> <a name="props" id="data-landing-zone.AuditGlobalStack.Initializer.parameter.props"></a>

- *Type:* <a href="#data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.AuditGlobalStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#data-landing-zone.AuditGlobalStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#data-landing-zone.AuditGlobalStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#data-landing-zone.AuditGlobalStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#data-landing-zone.AuditGlobalStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#data-landing-zone.AuditGlobalStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#data-landing-zone.AuditGlobalStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#data-landing-zone.AuditGlobalStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#data-landing-zone.AuditGlobalStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#data-landing-zone.AuditGlobalStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#data-landing-zone.AuditGlobalStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#data-landing-zone.AuditGlobalStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#data-landing-zone.AuditGlobalStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#data-landing-zone.AuditGlobalStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#data-landing-zone.AuditGlobalStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#data-landing-zone.AuditGlobalStack.resourceName">resourceName</a></code> | Create unique ResourceNames. |
| <code><a href="#data-landing-zone.AuditGlobalStack.securityHubNotifications">securityHubNotifications</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="data-landing-zone.AuditGlobalStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="data-landing-zone.AuditGlobalStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="data-landing-zone.AuditGlobalStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="data-landing-zone.AuditGlobalStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="data-landing-zone.AuditGlobalStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="data-landing-zone.AuditGlobalStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="data-landing-zone.AuditGlobalStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="data-landing-zone.AuditGlobalStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="data-landing-zone.AuditGlobalStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="data-landing-zone.AuditGlobalStack.exportStringListValue"></a>

```typescript
public exportStringListValue(exportedValue: any, options?: ExportValueOptions): string[]
```

Create a CloudFormation Export for a string list value.

Returns a string list representing the corresponding `Fn.importValue()`
expression for this Export. The export expression is automatically wrapped with an
`Fn::Join` and the import value with an `Fn::Split`, since CloudFormation can only
export strings. You can control the name for the export by passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

See `exportValue` for an example of this process.

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.AuditGlobalStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.AuditGlobalStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="data-landing-zone.AuditGlobalStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a string value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
  stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
  remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
  will make sure the CloudFormation Export continues to exist while the relationship
  between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.AuditGlobalStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.AuditGlobalStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="data-landing-zone.AuditGlobalStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

  arn:{partition}:{service}:{region}:{account}:{resource}{sep}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="data-landing-zone.AuditGlobalStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="data-landing-zone.AuditGlobalStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="data-landing-zone.AuditGlobalStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="data-landing-zone.AuditGlobalStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="data-landing-zone.AuditGlobalStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="data-landing-zone.AuditGlobalStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="data-landing-zone.AuditGlobalStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="data-landing-zone.AuditGlobalStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="data-landing-zone.AuditGlobalStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="data-landing-zone.AuditGlobalStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="data-landing-zone.AuditGlobalStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="data-landing-zone.AuditGlobalStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.AuditGlobalStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="data-landing-zone.AuditGlobalStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="data-landing-zone.AuditGlobalStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="data-landing-zone.AuditGlobalStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="data-landing-zone.AuditGlobalStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.AuditGlobalStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="data-landing-zone.AuditGlobalStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="data-landing-zone.AuditGlobalStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.AuditGlobalStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="data-landing-zone.AuditGlobalStack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="data-landing-zone.AuditGlobalStack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

##### `securityHubNotifications` <a name="securityHubNotifications" id="data-landing-zone.AuditGlobalStack.securityHubNotifications"></a>

```typescript
public securityHubNotifications(): void
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.AuditGlobalStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#data-landing-zone.AuditGlobalStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#data-landing-zone.AuditGlobalStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="data-landing-zone.AuditGlobalStack.isConstruct"></a>

```typescript
import { AuditGlobalStack } from 'data-landing-zone'

AuditGlobalStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.AuditGlobalStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="data-landing-zone.AuditGlobalStack.isStack"></a>

```typescript
import { AuditGlobalStack } from 'data-landing-zone'

AuditGlobalStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.AuditGlobalStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="data-landing-zone.AuditGlobalStack.of"></a>

```typescript
import { AuditGlobalStack } from 'data-landing-zone'

AuditGlobalStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="data-landing-zone.AuditGlobalStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.AuditGlobalStack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="data-landing-zone.AuditGlobalStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="data-landing-zone.AuditGlobalStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
   either be a concrete account (e.g. `585695031111`) or the
   `Aws.ACCOUNT_ID` token.
3. `Aws.ACCOUNT_ID`, which represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="data-landing-zone.AuditGlobalStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="data-landing-zone.AuditGlobalStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="data-landing-zone.AuditGlobalStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="data-landing-zone.AuditGlobalStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="data-landing-zone.AuditGlobalStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.ACCOUNT_ID` or `Aws.REGION`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="data-landing-zone.AuditGlobalStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="data-landing-zone.AuditGlobalStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="data-landing-zone.AuditGlobalStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="data-landing-zone.AuditGlobalStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
   either be a concrete region (e.g. `us-west-2`) or the `Aws.REGION`
   token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="data-landing-zone.AuditGlobalStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="data-landing-zone.AuditGlobalStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.STACK_NAME` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="data-landing-zone.AuditGlobalStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="data-landing-zone.AuditGlobalStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="data-landing-zone.AuditGlobalStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="data-landing-zone.AuditGlobalStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="data-landing-zone.AuditGlobalStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="data-landing-zone.AuditGlobalStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="data-landing-zone.AuditGlobalStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="data-landing-zone.AuditGlobalStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="data-landing-zone.AuditGlobalStack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="data-landing-zone.AuditGlobalStack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### AuditRegionalStack <a name="AuditRegionalStack" id="data-landing-zone.AuditRegionalStack"></a>

#### Initializers <a name="Initializers" id="data-landing-zone.AuditRegionalStack.Initializer"></a>

```typescript
import { AuditRegionalStack } from 'data-landing-zone'

new AuditRegionalStack(scope: Construct, props: DlzStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.AuditRegionalStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#data-landing-zone.AuditRegionalStack.Initializer.parameter.props">props</a></code> | <code><a href="#data-landing-zone.DlzStackProps">DlzStackProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="data-landing-zone.AuditRegionalStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `props`<sup>Required</sup> <a name="props" id="data-landing-zone.AuditRegionalStack.Initializer.parameter.props"></a>

- *Type:* <a href="#data-landing-zone.DlzStackProps">DlzStackProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.AuditRegionalStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#data-landing-zone.AuditRegionalStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#data-landing-zone.AuditRegionalStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#data-landing-zone.AuditRegionalStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#data-landing-zone.AuditRegionalStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#data-landing-zone.AuditRegionalStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#data-landing-zone.AuditRegionalStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#data-landing-zone.AuditRegionalStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#data-landing-zone.AuditRegionalStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#data-landing-zone.AuditRegionalStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#data-landing-zone.AuditRegionalStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#data-landing-zone.AuditRegionalStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#data-landing-zone.AuditRegionalStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#data-landing-zone.AuditRegionalStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#data-landing-zone.AuditRegionalStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#data-landing-zone.AuditRegionalStack.resourceName">resourceName</a></code> | Create unique ResourceNames. |

---

##### `toString` <a name="toString" id="data-landing-zone.AuditRegionalStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="data-landing-zone.AuditRegionalStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="data-landing-zone.AuditRegionalStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="data-landing-zone.AuditRegionalStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="data-landing-zone.AuditRegionalStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="data-landing-zone.AuditRegionalStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="data-landing-zone.AuditRegionalStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="data-landing-zone.AuditRegionalStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="data-landing-zone.AuditRegionalStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="data-landing-zone.AuditRegionalStack.exportStringListValue"></a>

```typescript
public exportStringListValue(exportedValue: any, options?: ExportValueOptions): string[]
```

Create a CloudFormation Export for a string list value.

Returns a string list representing the corresponding `Fn.importValue()`
expression for this Export. The export expression is automatically wrapped with an
`Fn::Join` and the import value with an `Fn::Split`, since CloudFormation can only
export strings. You can control the name for the export by passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

See `exportValue` for an example of this process.

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.AuditRegionalStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.AuditRegionalStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="data-landing-zone.AuditRegionalStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a string value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
  stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
  remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
  will make sure the CloudFormation Export continues to exist while the relationship
  between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.AuditRegionalStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.AuditRegionalStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="data-landing-zone.AuditRegionalStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

  arn:{partition}:{service}:{region}:{account}:{resource}{sep}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="data-landing-zone.AuditRegionalStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="data-landing-zone.AuditRegionalStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="data-landing-zone.AuditRegionalStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="data-landing-zone.AuditRegionalStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="data-landing-zone.AuditRegionalStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="data-landing-zone.AuditRegionalStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="data-landing-zone.AuditRegionalStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="data-landing-zone.AuditRegionalStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="data-landing-zone.AuditRegionalStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="data-landing-zone.AuditRegionalStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="data-landing-zone.AuditRegionalStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="data-landing-zone.AuditRegionalStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.AuditRegionalStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="data-landing-zone.AuditRegionalStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="data-landing-zone.AuditRegionalStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="data-landing-zone.AuditRegionalStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="data-landing-zone.AuditRegionalStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.AuditRegionalStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="data-landing-zone.AuditRegionalStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="data-landing-zone.AuditRegionalStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.AuditRegionalStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="data-landing-zone.AuditRegionalStack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="data-landing-zone.AuditRegionalStack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.AuditRegionalStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#data-landing-zone.AuditRegionalStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#data-landing-zone.AuditRegionalStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="data-landing-zone.AuditRegionalStack.isConstruct"></a>

```typescript
import { AuditRegionalStack } from 'data-landing-zone'

AuditRegionalStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.AuditRegionalStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="data-landing-zone.AuditRegionalStack.isStack"></a>

```typescript
import { AuditRegionalStack } from 'data-landing-zone'

AuditRegionalStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.AuditRegionalStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="data-landing-zone.AuditRegionalStack.of"></a>

```typescript
import { AuditRegionalStack } from 'data-landing-zone'

AuditRegionalStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="data-landing-zone.AuditRegionalStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.AuditRegionalStack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="data-landing-zone.AuditRegionalStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="data-landing-zone.AuditRegionalStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
   either be a concrete account (e.g. `585695031111`) or the
   `Aws.ACCOUNT_ID` token.
3. `Aws.ACCOUNT_ID`, which represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="data-landing-zone.AuditRegionalStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="data-landing-zone.AuditRegionalStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="data-landing-zone.AuditRegionalStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="data-landing-zone.AuditRegionalStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="data-landing-zone.AuditRegionalStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.ACCOUNT_ID` or `Aws.REGION`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="data-landing-zone.AuditRegionalStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="data-landing-zone.AuditRegionalStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="data-landing-zone.AuditRegionalStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="data-landing-zone.AuditRegionalStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
   either be a concrete region (e.g. `us-west-2`) or the `Aws.REGION`
   token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="data-landing-zone.AuditRegionalStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="data-landing-zone.AuditRegionalStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.STACK_NAME` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="data-landing-zone.AuditRegionalStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="data-landing-zone.AuditRegionalStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="data-landing-zone.AuditRegionalStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="data-landing-zone.AuditRegionalStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="data-landing-zone.AuditRegionalStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="data-landing-zone.AuditRegionalStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="data-landing-zone.AuditRegionalStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="data-landing-zone.AuditRegionalStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="data-landing-zone.AuditRegionalStack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="data-landing-zone.AuditRegionalStack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### DevelopGlobalStack <a name="DevelopGlobalStack" id="data-landing-zone.DevelopGlobalStack"></a>

#### Initializers <a name="Initializers" id="data-landing-zone.DevelopGlobalStack.Initializer"></a>

```typescript
import { DevelopGlobalStack } from 'data-landing-zone'

new DevelopGlobalStack(scope: Construct, stackProps: DlzStackProps, props: DataLandingZoneProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DevelopGlobalStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#data-landing-zone.DevelopGlobalStack.Initializer.parameter.stackProps">stackProps</a></code> | <code><a href="#data-landing-zone.DlzStackProps">DlzStackProps</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DevelopGlobalStack.Initializer.parameter.props">props</a></code> | <code><a href="#data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="data-landing-zone.DevelopGlobalStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `stackProps`<sup>Required</sup> <a name="stackProps" id="data-landing-zone.DevelopGlobalStack.Initializer.parameter.stackProps"></a>

- *Type:* <a href="#data-landing-zone.DlzStackProps">DlzStackProps</a>

---

##### `props`<sup>Required</sup> <a name="props" id="data-landing-zone.DevelopGlobalStack.Initializer.parameter.props"></a>

- *Type:* <a href="#data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.DevelopGlobalStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.resourceName">resourceName</a></code> | Create unique ResourceNames. |

---

##### `toString` <a name="toString" id="data-landing-zone.DevelopGlobalStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="data-landing-zone.DevelopGlobalStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="data-landing-zone.DevelopGlobalStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="data-landing-zone.DevelopGlobalStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="data-landing-zone.DevelopGlobalStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="data-landing-zone.DevelopGlobalStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="data-landing-zone.DevelopGlobalStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="data-landing-zone.DevelopGlobalStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="data-landing-zone.DevelopGlobalStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="data-landing-zone.DevelopGlobalStack.exportStringListValue"></a>

```typescript
public exportStringListValue(exportedValue: any, options?: ExportValueOptions): string[]
```

Create a CloudFormation Export for a string list value.

Returns a string list representing the corresponding `Fn.importValue()`
expression for this Export. The export expression is automatically wrapped with an
`Fn::Join` and the import value with an `Fn::Split`, since CloudFormation can only
export strings. You can control the name for the export by passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

See `exportValue` for an example of this process.

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.DevelopGlobalStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.DevelopGlobalStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="data-landing-zone.DevelopGlobalStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a string value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
  stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
  remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
  will make sure the CloudFormation Export continues to exist while the relationship
  between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.DevelopGlobalStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.DevelopGlobalStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="data-landing-zone.DevelopGlobalStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

  arn:{partition}:{service}:{region}:{account}:{resource}{sep}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="data-landing-zone.DevelopGlobalStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="data-landing-zone.DevelopGlobalStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="data-landing-zone.DevelopGlobalStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="data-landing-zone.DevelopGlobalStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="data-landing-zone.DevelopGlobalStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="data-landing-zone.DevelopGlobalStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="data-landing-zone.DevelopGlobalStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="data-landing-zone.DevelopGlobalStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="data-landing-zone.DevelopGlobalStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="data-landing-zone.DevelopGlobalStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="data-landing-zone.DevelopGlobalStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="data-landing-zone.DevelopGlobalStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.DevelopGlobalStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="data-landing-zone.DevelopGlobalStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="data-landing-zone.DevelopGlobalStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="data-landing-zone.DevelopGlobalStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="data-landing-zone.DevelopGlobalStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.DevelopGlobalStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="data-landing-zone.DevelopGlobalStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="data-landing-zone.DevelopGlobalStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.DevelopGlobalStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="data-landing-zone.DevelopGlobalStack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="data-landing-zone.DevelopGlobalStack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.DevelopGlobalStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="data-landing-zone.DevelopGlobalStack.isConstruct"></a>

```typescript
import { DevelopGlobalStack } from 'data-landing-zone'

DevelopGlobalStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.DevelopGlobalStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="data-landing-zone.DevelopGlobalStack.isStack"></a>

```typescript
import { DevelopGlobalStack } from 'data-landing-zone'

DevelopGlobalStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.DevelopGlobalStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="data-landing-zone.DevelopGlobalStack.of"></a>

```typescript
import { DevelopGlobalStack } from 'data-landing-zone'

DevelopGlobalStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="data-landing-zone.DevelopGlobalStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DevelopGlobalStack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="data-landing-zone.DevelopGlobalStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="data-landing-zone.DevelopGlobalStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
   either be a concrete account (e.g. `585695031111`) or the
   `Aws.ACCOUNT_ID` token.
3. `Aws.ACCOUNT_ID`, which represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="data-landing-zone.DevelopGlobalStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="data-landing-zone.DevelopGlobalStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="data-landing-zone.DevelopGlobalStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="data-landing-zone.DevelopGlobalStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="data-landing-zone.DevelopGlobalStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.ACCOUNT_ID` or `Aws.REGION`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="data-landing-zone.DevelopGlobalStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="data-landing-zone.DevelopGlobalStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="data-landing-zone.DevelopGlobalStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="data-landing-zone.DevelopGlobalStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
   either be a concrete region (e.g. `us-west-2`) or the `Aws.REGION`
   token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="data-landing-zone.DevelopGlobalStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="data-landing-zone.DevelopGlobalStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.STACK_NAME` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="data-landing-zone.DevelopGlobalStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="data-landing-zone.DevelopGlobalStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="data-landing-zone.DevelopGlobalStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="data-landing-zone.DevelopGlobalStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="data-landing-zone.DevelopGlobalStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="data-landing-zone.DevelopGlobalStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="data-landing-zone.DevelopGlobalStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="data-landing-zone.DevelopGlobalStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="data-landing-zone.DevelopGlobalStack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="data-landing-zone.DevelopGlobalStack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### DevelopRegionalStack <a name="DevelopRegionalStack" id="data-landing-zone.DevelopRegionalStack"></a>

#### Initializers <a name="Initializers" id="data-landing-zone.DevelopRegionalStack.Initializer"></a>

```typescript
import { DevelopRegionalStack } from 'data-landing-zone'

new DevelopRegionalStack(scope: Construct, stackProps: DlzStackProps, props: DataLandingZoneProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DevelopRegionalStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#data-landing-zone.DevelopRegionalStack.Initializer.parameter.stackProps">stackProps</a></code> | <code><a href="#data-landing-zone.DlzStackProps">DlzStackProps</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DevelopRegionalStack.Initializer.parameter.props">props</a></code> | <code><a href="#data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="data-landing-zone.DevelopRegionalStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `stackProps`<sup>Required</sup> <a name="stackProps" id="data-landing-zone.DevelopRegionalStack.Initializer.parameter.stackProps"></a>

- *Type:* <a href="#data-landing-zone.DlzStackProps">DlzStackProps</a>

---

##### `props`<sup>Required</sup> <a name="props" id="data-landing-zone.DevelopRegionalStack.Initializer.parameter.props"></a>

- *Type:* <a href="#data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.DevelopRegionalStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.resourceName">resourceName</a></code> | Create unique ResourceNames. |

---

##### `toString` <a name="toString" id="data-landing-zone.DevelopRegionalStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="data-landing-zone.DevelopRegionalStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="data-landing-zone.DevelopRegionalStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="data-landing-zone.DevelopRegionalStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="data-landing-zone.DevelopRegionalStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="data-landing-zone.DevelopRegionalStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="data-landing-zone.DevelopRegionalStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="data-landing-zone.DevelopRegionalStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="data-landing-zone.DevelopRegionalStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="data-landing-zone.DevelopRegionalStack.exportStringListValue"></a>

```typescript
public exportStringListValue(exportedValue: any, options?: ExportValueOptions): string[]
```

Create a CloudFormation Export for a string list value.

Returns a string list representing the corresponding `Fn.importValue()`
expression for this Export. The export expression is automatically wrapped with an
`Fn::Join` and the import value with an `Fn::Split`, since CloudFormation can only
export strings. You can control the name for the export by passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

See `exportValue` for an example of this process.

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.DevelopRegionalStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.DevelopRegionalStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="data-landing-zone.DevelopRegionalStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a string value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
  stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
  remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
  will make sure the CloudFormation Export continues to exist while the relationship
  between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.DevelopRegionalStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.DevelopRegionalStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="data-landing-zone.DevelopRegionalStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

  arn:{partition}:{service}:{region}:{account}:{resource}{sep}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="data-landing-zone.DevelopRegionalStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="data-landing-zone.DevelopRegionalStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="data-landing-zone.DevelopRegionalStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="data-landing-zone.DevelopRegionalStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="data-landing-zone.DevelopRegionalStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="data-landing-zone.DevelopRegionalStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="data-landing-zone.DevelopRegionalStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="data-landing-zone.DevelopRegionalStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="data-landing-zone.DevelopRegionalStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="data-landing-zone.DevelopRegionalStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="data-landing-zone.DevelopRegionalStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="data-landing-zone.DevelopRegionalStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.DevelopRegionalStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="data-landing-zone.DevelopRegionalStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="data-landing-zone.DevelopRegionalStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="data-landing-zone.DevelopRegionalStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="data-landing-zone.DevelopRegionalStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.DevelopRegionalStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="data-landing-zone.DevelopRegionalStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="data-landing-zone.DevelopRegionalStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.DevelopRegionalStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="data-landing-zone.DevelopRegionalStack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="data-landing-zone.DevelopRegionalStack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.DevelopRegionalStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="data-landing-zone.DevelopRegionalStack.isConstruct"></a>

```typescript
import { DevelopRegionalStack } from 'data-landing-zone'

DevelopRegionalStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.DevelopRegionalStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="data-landing-zone.DevelopRegionalStack.isStack"></a>

```typescript
import { DevelopRegionalStack } from 'data-landing-zone'

DevelopRegionalStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.DevelopRegionalStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="data-landing-zone.DevelopRegionalStack.of"></a>

```typescript
import { DevelopRegionalStack } from 'data-landing-zone'

DevelopRegionalStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="data-landing-zone.DevelopRegionalStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DevelopRegionalStack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="data-landing-zone.DevelopRegionalStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="data-landing-zone.DevelopRegionalStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
   either be a concrete account (e.g. `585695031111`) or the
   `Aws.ACCOUNT_ID` token.
3. `Aws.ACCOUNT_ID`, which represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="data-landing-zone.DevelopRegionalStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="data-landing-zone.DevelopRegionalStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="data-landing-zone.DevelopRegionalStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="data-landing-zone.DevelopRegionalStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="data-landing-zone.DevelopRegionalStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.ACCOUNT_ID` or `Aws.REGION`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="data-landing-zone.DevelopRegionalStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="data-landing-zone.DevelopRegionalStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="data-landing-zone.DevelopRegionalStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="data-landing-zone.DevelopRegionalStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
   either be a concrete region (e.g. `us-west-2`) or the `Aws.REGION`
   token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="data-landing-zone.DevelopRegionalStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="data-landing-zone.DevelopRegionalStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.STACK_NAME` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="data-landing-zone.DevelopRegionalStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="data-landing-zone.DevelopRegionalStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="data-landing-zone.DevelopRegionalStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="data-landing-zone.DevelopRegionalStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="data-landing-zone.DevelopRegionalStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="data-landing-zone.DevelopRegionalStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="data-landing-zone.DevelopRegionalStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="data-landing-zone.DevelopRegionalStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="data-landing-zone.DevelopRegionalStack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="data-landing-zone.DevelopRegionalStack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### DlzStack <a name="DlzStack" id="data-landing-zone.DlzStack"></a>

#### Initializers <a name="Initializers" id="data-landing-zone.DlzStack.Initializer"></a>

```typescript
import { DlzStack } from 'data-landing-zone'

new DlzStack(scope: Construct, props: DlzStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DlzStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzStack.Initializer.parameter.props">props</a></code> | <code><a href="#data-landing-zone.DlzStackProps">DlzStackProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="data-landing-zone.DlzStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `props`<sup>Required</sup> <a name="props" id="data-landing-zone.DlzStack.Initializer.parameter.props"></a>

- *Type:* <a href="#data-landing-zone.DlzStackProps">DlzStackProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.DlzStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#data-landing-zone.DlzStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#data-landing-zone.DlzStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#data-landing-zone.DlzStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#data-landing-zone.DlzStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#data-landing-zone.DlzStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#data-landing-zone.DlzStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#data-landing-zone.DlzStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#data-landing-zone.DlzStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#data-landing-zone.DlzStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#data-landing-zone.DlzStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#data-landing-zone.DlzStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#data-landing-zone.DlzStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#data-landing-zone.DlzStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#data-landing-zone.DlzStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#data-landing-zone.DlzStack.resourceName">resourceName</a></code> | Create unique ResourceNames. |

---

##### `toString` <a name="toString" id="data-landing-zone.DlzStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="data-landing-zone.DlzStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="data-landing-zone.DlzStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="data-landing-zone.DlzStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="data-landing-zone.DlzStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="data-landing-zone.DlzStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="data-landing-zone.DlzStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="data-landing-zone.DlzStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="data-landing-zone.DlzStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="data-landing-zone.DlzStack.exportStringListValue"></a>

```typescript
public exportStringListValue(exportedValue: any, options?: ExportValueOptions): string[]
```

Create a CloudFormation Export for a string list value.

Returns a string list representing the corresponding `Fn.importValue()`
expression for this Export. The export expression is automatically wrapped with an
`Fn::Join` and the import value with an `Fn::Split`, since CloudFormation can only
export strings. You can control the name for the export by passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

See `exportValue` for an example of this process.

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.DlzStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.DlzStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="data-landing-zone.DlzStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a string value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
  stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
  remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
  will make sure the CloudFormation Export continues to exist while the relationship
  between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.DlzStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.DlzStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="data-landing-zone.DlzStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

  arn:{partition}:{service}:{region}:{account}:{resource}{sep}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="data-landing-zone.DlzStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="data-landing-zone.DlzStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="data-landing-zone.DlzStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="data-landing-zone.DlzStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="data-landing-zone.DlzStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="data-landing-zone.DlzStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="data-landing-zone.DlzStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="data-landing-zone.DlzStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="data-landing-zone.DlzStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="data-landing-zone.DlzStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="data-landing-zone.DlzStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="data-landing-zone.DlzStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.DlzStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="data-landing-zone.DlzStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="data-landing-zone.DlzStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="data-landing-zone.DlzStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="data-landing-zone.DlzStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.DlzStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="data-landing-zone.DlzStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="data-landing-zone.DlzStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.DlzStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="data-landing-zone.DlzStack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="data-landing-zone.DlzStack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.DlzStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#data-landing-zone.DlzStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#data-landing-zone.DlzStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="data-landing-zone.DlzStack.isConstruct"></a>

```typescript
import { DlzStack } from 'data-landing-zone'

DlzStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.DlzStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="data-landing-zone.DlzStack.isStack"></a>

```typescript
import { DlzStack } from 'data-landing-zone'

DlzStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.DlzStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="data-landing-zone.DlzStack.of"></a>

```typescript
import { DlzStack } from 'data-landing-zone'

DlzStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="data-landing-zone.DlzStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DlzStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#data-landing-zone.DlzStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#data-landing-zone.DlzStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#data-landing-zone.DlzStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#data-landing-zone.DlzStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#data-landing-zone.DlzStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#data-landing-zone.DlzStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#data-landing-zone.DlzStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#data-landing-zone.DlzStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#data-landing-zone.DlzStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#data-landing-zone.DlzStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#data-landing-zone.DlzStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#data-landing-zone.DlzStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#data-landing-zone.DlzStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#data-landing-zone.DlzStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#data-landing-zone.DlzStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#data-landing-zone.DlzStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#data-landing-zone.DlzStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#data-landing-zone.DlzStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#data-landing-zone.DlzStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#data-landing-zone.DlzStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#data-landing-zone.DlzStack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzStack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="data-landing-zone.DlzStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="data-landing-zone.DlzStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
   either be a concrete account (e.g. `585695031111`) or the
   `Aws.ACCOUNT_ID` token.
3. `Aws.ACCOUNT_ID`, which represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="data-landing-zone.DlzStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="data-landing-zone.DlzStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="data-landing-zone.DlzStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="data-landing-zone.DlzStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="data-landing-zone.DlzStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.ACCOUNT_ID` or `Aws.REGION`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="data-landing-zone.DlzStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="data-landing-zone.DlzStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="data-landing-zone.DlzStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="data-landing-zone.DlzStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
   either be a concrete region (e.g. `us-west-2`) or the `Aws.REGION`
   token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="data-landing-zone.DlzStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="data-landing-zone.DlzStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.STACK_NAME` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="data-landing-zone.DlzStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="data-landing-zone.DlzStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="data-landing-zone.DlzStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="data-landing-zone.DlzStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="data-landing-zone.DlzStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="data-landing-zone.DlzStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="data-landing-zone.DlzStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="data-landing-zone.DlzStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="data-landing-zone.DlzStack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="data-landing-zone.DlzStack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### LogGlobalStack <a name="LogGlobalStack" id="data-landing-zone.LogGlobalStack"></a>

#### Initializers <a name="Initializers" id="data-landing-zone.LogGlobalStack.Initializer"></a>

```typescript
import { LogGlobalStack } from 'data-landing-zone'

new LogGlobalStack(scope: Construct, props: DlzStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.LogGlobalStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#data-landing-zone.LogGlobalStack.Initializer.parameter.props">props</a></code> | <code><a href="#data-landing-zone.DlzStackProps">DlzStackProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="data-landing-zone.LogGlobalStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `props`<sup>Required</sup> <a name="props" id="data-landing-zone.LogGlobalStack.Initializer.parameter.props"></a>

- *Type:* <a href="#data-landing-zone.DlzStackProps">DlzStackProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.LogGlobalStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#data-landing-zone.LogGlobalStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#data-landing-zone.LogGlobalStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#data-landing-zone.LogGlobalStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#data-landing-zone.LogGlobalStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#data-landing-zone.LogGlobalStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#data-landing-zone.LogGlobalStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#data-landing-zone.LogGlobalStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#data-landing-zone.LogGlobalStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#data-landing-zone.LogGlobalStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#data-landing-zone.LogGlobalStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#data-landing-zone.LogGlobalStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#data-landing-zone.LogGlobalStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#data-landing-zone.LogGlobalStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#data-landing-zone.LogGlobalStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#data-landing-zone.LogGlobalStack.resourceName">resourceName</a></code> | Create unique ResourceNames. |

---

##### `toString` <a name="toString" id="data-landing-zone.LogGlobalStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="data-landing-zone.LogGlobalStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="data-landing-zone.LogGlobalStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="data-landing-zone.LogGlobalStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="data-landing-zone.LogGlobalStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="data-landing-zone.LogGlobalStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="data-landing-zone.LogGlobalStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="data-landing-zone.LogGlobalStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="data-landing-zone.LogGlobalStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="data-landing-zone.LogGlobalStack.exportStringListValue"></a>

```typescript
public exportStringListValue(exportedValue: any, options?: ExportValueOptions): string[]
```

Create a CloudFormation Export for a string list value.

Returns a string list representing the corresponding `Fn.importValue()`
expression for this Export. The export expression is automatically wrapped with an
`Fn::Join` and the import value with an `Fn::Split`, since CloudFormation can only
export strings. You can control the name for the export by passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

See `exportValue` for an example of this process.

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.LogGlobalStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.LogGlobalStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="data-landing-zone.LogGlobalStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a string value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
  stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
  remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
  will make sure the CloudFormation Export continues to exist while the relationship
  between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.LogGlobalStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.LogGlobalStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="data-landing-zone.LogGlobalStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

  arn:{partition}:{service}:{region}:{account}:{resource}{sep}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="data-landing-zone.LogGlobalStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="data-landing-zone.LogGlobalStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="data-landing-zone.LogGlobalStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="data-landing-zone.LogGlobalStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="data-landing-zone.LogGlobalStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="data-landing-zone.LogGlobalStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="data-landing-zone.LogGlobalStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="data-landing-zone.LogGlobalStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="data-landing-zone.LogGlobalStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="data-landing-zone.LogGlobalStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="data-landing-zone.LogGlobalStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="data-landing-zone.LogGlobalStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.LogGlobalStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="data-landing-zone.LogGlobalStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="data-landing-zone.LogGlobalStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="data-landing-zone.LogGlobalStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="data-landing-zone.LogGlobalStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.LogGlobalStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="data-landing-zone.LogGlobalStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="data-landing-zone.LogGlobalStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.LogGlobalStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="data-landing-zone.LogGlobalStack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="data-landing-zone.LogGlobalStack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.LogGlobalStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#data-landing-zone.LogGlobalStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#data-landing-zone.LogGlobalStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="data-landing-zone.LogGlobalStack.isConstruct"></a>

```typescript
import { LogGlobalStack } from 'data-landing-zone'

LogGlobalStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.LogGlobalStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="data-landing-zone.LogGlobalStack.isStack"></a>

```typescript
import { LogGlobalStack } from 'data-landing-zone'

LogGlobalStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.LogGlobalStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="data-landing-zone.LogGlobalStack.of"></a>

```typescript
import { LogGlobalStack } from 'data-landing-zone'

LogGlobalStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="data-landing-zone.LogGlobalStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.LogGlobalStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#data-landing-zone.LogGlobalStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#data-landing-zone.LogGlobalStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#data-landing-zone.LogGlobalStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#data-landing-zone.LogGlobalStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#data-landing-zone.LogGlobalStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#data-landing-zone.LogGlobalStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#data-landing-zone.LogGlobalStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#data-landing-zone.LogGlobalStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#data-landing-zone.LogGlobalStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#data-landing-zone.LogGlobalStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#data-landing-zone.LogGlobalStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#data-landing-zone.LogGlobalStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#data-landing-zone.LogGlobalStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#data-landing-zone.LogGlobalStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#data-landing-zone.LogGlobalStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#data-landing-zone.LogGlobalStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#data-landing-zone.LogGlobalStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#data-landing-zone.LogGlobalStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#data-landing-zone.LogGlobalStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#data-landing-zone.LogGlobalStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#data-landing-zone.LogGlobalStack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.LogGlobalStack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="data-landing-zone.LogGlobalStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="data-landing-zone.LogGlobalStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
   either be a concrete account (e.g. `585695031111`) or the
   `Aws.ACCOUNT_ID` token.
3. `Aws.ACCOUNT_ID`, which represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="data-landing-zone.LogGlobalStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="data-landing-zone.LogGlobalStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="data-landing-zone.LogGlobalStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="data-landing-zone.LogGlobalStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="data-landing-zone.LogGlobalStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.ACCOUNT_ID` or `Aws.REGION`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="data-landing-zone.LogGlobalStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="data-landing-zone.LogGlobalStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="data-landing-zone.LogGlobalStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="data-landing-zone.LogGlobalStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
   either be a concrete region (e.g. `us-west-2`) or the `Aws.REGION`
   token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="data-landing-zone.LogGlobalStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="data-landing-zone.LogGlobalStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.STACK_NAME` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="data-landing-zone.LogGlobalStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="data-landing-zone.LogGlobalStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="data-landing-zone.LogGlobalStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="data-landing-zone.LogGlobalStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="data-landing-zone.LogGlobalStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="data-landing-zone.LogGlobalStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="data-landing-zone.LogGlobalStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="data-landing-zone.LogGlobalStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="data-landing-zone.LogGlobalStack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="data-landing-zone.LogGlobalStack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### LogRegionalStack <a name="LogRegionalStack" id="data-landing-zone.LogRegionalStack"></a>

#### Initializers <a name="Initializers" id="data-landing-zone.LogRegionalStack.Initializer"></a>

```typescript
import { LogRegionalStack } from 'data-landing-zone'

new LogRegionalStack(scope: Construct, props: DlzStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.LogRegionalStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#data-landing-zone.LogRegionalStack.Initializer.parameter.props">props</a></code> | <code><a href="#data-landing-zone.DlzStackProps">DlzStackProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="data-landing-zone.LogRegionalStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `props`<sup>Required</sup> <a name="props" id="data-landing-zone.LogRegionalStack.Initializer.parameter.props"></a>

- *Type:* <a href="#data-landing-zone.DlzStackProps">DlzStackProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.LogRegionalStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#data-landing-zone.LogRegionalStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#data-landing-zone.LogRegionalStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#data-landing-zone.LogRegionalStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#data-landing-zone.LogRegionalStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#data-landing-zone.LogRegionalStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#data-landing-zone.LogRegionalStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#data-landing-zone.LogRegionalStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#data-landing-zone.LogRegionalStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#data-landing-zone.LogRegionalStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#data-landing-zone.LogRegionalStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#data-landing-zone.LogRegionalStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#data-landing-zone.LogRegionalStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#data-landing-zone.LogRegionalStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#data-landing-zone.LogRegionalStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#data-landing-zone.LogRegionalStack.resourceName">resourceName</a></code> | Create unique ResourceNames. |

---

##### `toString` <a name="toString" id="data-landing-zone.LogRegionalStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="data-landing-zone.LogRegionalStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="data-landing-zone.LogRegionalStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="data-landing-zone.LogRegionalStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="data-landing-zone.LogRegionalStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="data-landing-zone.LogRegionalStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="data-landing-zone.LogRegionalStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="data-landing-zone.LogRegionalStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="data-landing-zone.LogRegionalStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="data-landing-zone.LogRegionalStack.exportStringListValue"></a>

```typescript
public exportStringListValue(exportedValue: any, options?: ExportValueOptions): string[]
```

Create a CloudFormation Export for a string list value.

Returns a string list representing the corresponding `Fn.importValue()`
expression for this Export. The export expression is automatically wrapped with an
`Fn::Join` and the import value with an `Fn::Split`, since CloudFormation can only
export strings. You can control the name for the export by passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

See `exportValue` for an example of this process.

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.LogRegionalStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.LogRegionalStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="data-landing-zone.LogRegionalStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a string value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
  stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
  remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
  will make sure the CloudFormation Export continues to exist while the relationship
  between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.LogRegionalStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.LogRegionalStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="data-landing-zone.LogRegionalStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

  arn:{partition}:{service}:{region}:{account}:{resource}{sep}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="data-landing-zone.LogRegionalStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="data-landing-zone.LogRegionalStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="data-landing-zone.LogRegionalStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="data-landing-zone.LogRegionalStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="data-landing-zone.LogRegionalStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="data-landing-zone.LogRegionalStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="data-landing-zone.LogRegionalStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="data-landing-zone.LogRegionalStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="data-landing-zone.LogRegionalStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="data-landing-zone.LogRegionalStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="data-landing-zone.LogRegionalStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="data-landing-zone.LogRegionalStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.LogRegionalStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="data-landing-zone.LogRegionalStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="data-landing-zone.LogRegionalStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="data-landing-zone.LogRegionalStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="data-landing-zone.LogRegionalStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.LogRegionalStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="data-landing-zone.LogRegionalStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="data-landing-zone.LogRegionalStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.LogRegionalStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="data-landing-zone.LogRegionalStack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="data-landing-zone.LogRegionalStack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.LogRegionalStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#data-landing-zone.LogRegionalStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#data-landing-zone.LogRegionalStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="data-landing-zone.LogRegionalStack.isConstruct"></a>

```typescript
import { LogRegionalStack } from 'data-landing-zone'

LogRegionalStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.LogRegionalStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="data-landing-zone.LogRegionalStack.isStack"></a>

```typescript
import { LogRegionalStack } from 'data-landing-zone'

LogRegionalStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.LogRegionalStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="data-landing-zone.LogRegionalStack.of"></a>

```typescript
import { LogRegionalStack } from 'data-landing-zone'

LogRegionalStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="data-landing-zone.LogRegionalStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.LogRegionalStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#data-landing-zone.LogRegionalStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#data-landing-zone.LogRegionalStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#data-landing-zone.LogRegionalStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#data-landing-zone.LogRegionalStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#data-landing-zone.LogRegionalStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#data-landing-zone.LogRegionalStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#data-landing-zone.LogRegionalStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#data-landing-zone.LogRegionalStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#data-landing-zone.LogRegionalStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#data-landing-zone.LogRegionalStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#data-landing-zone.LogRegionalStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#data-landing-zone.LogRegionalStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#data-landing-zone.LogRegionalStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#data-landing-zone.LogRegionalStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#data-landing-zone.LogRegionalStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#data-landing-zone.LogRegionalStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#data-landing-zone.LogRegionalStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#data-landing-zone.LogRegionalStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#data-landing-zone.LogRegionalStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#data-landing-zone.LogRegionalStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#data-landing-zone.LogRegionalStack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.LogRegionalStack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="data-landing-zone.LogRegionalStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="data-landing-zone.LogRegionalStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
   either be a concrete account (e.g. `585695031111`) or the
   `Aws.ACCOUNT_ID` token.
3. `Aws.ACCOUNT_ID`, which represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="data-landing-zone.LogRegionalStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="data-landing-zone.LogRegionalStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="data-landing-zone.LogRegionalStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="data-landing-zone.LogRegionalStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="data-landing-zone.LogRegionalStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.ACCOUNT_ID` or `Aws.REGION`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="data-landing-zone.LogRegionalStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="data-landing-zone.LogRegionalStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="data-landing-zone.LogRegionalStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="data-landing-zone.LogRegionalStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
   either be a concrete region (e.g. `us-west-2`) or the `Aws.REGION`
   token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="data-landing-zone.LogRegionalStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="data-landing-zone.LogRegionalStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.STACK_NAME` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="data-landing-zone.LogRegionalStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="data-landing-zone.LogRegionalStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="data-landing-zone.LogRegionalStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="data-landing-zone.LogRegionalStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="data-landing-zone.LogRegionalStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="data-landing-zone.LogRegionalStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="data-landing-zone.LogRegionalStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="data-landing-zone.LogRegionalStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="data-landing-zone.LogRegionalStack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="data-landing-zone.LogRegionalStack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### ManagementStack <a name="ManagementStack" id="data-landing-zone.ManagementStack"></a>

#### Initializers <a name="Initializers" id="data-landing-zone.ManagementStack.Initializer"></a>

```typescript
import { ManagementStack } from 'data-landing-zone'

new ManagementStack(scope: Construct, stackProps: DlzStackProps, props: DataLandingZoneProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.ManagementStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#data-landing-zone.ManagementStack.Initializer.parameter.stackProps">stackProps</a></code> | <code><a href="#data-landing-zone.DlzStackProps">DlzStackProps</a></code> | *No description.* |
| <code><a href="#data-landing-zone.ManagementStack.Initializer.parameter.props">props</a></code> | <code><a href="#data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="data-landing-zone.ManagementStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `stackProps`<sup>Required</sup> <a name="stackProps" id="data-landing-zone.ManagementStack.Initializer.parameter.stackProps"></a>

- *Type:* <a href="#data-landing-zone.DlzStackProps">DlzStackProps</a>

---

##### `props`<sup>Required</sup> <a name="props" id="data-landing-zone.ManagementStack.Initializer.parameter.props"></a>

- *Type:* <a href="#data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.ManagementStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#data-landing-zone.ManagementStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#data-landing-zone.ManagementStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#data-landing-zone.ManagementStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#data-landing-zone.ManagementStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#data-landing-zone.ManagementStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#data-landing-zone.ManagementStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#data-landing-zone.ManagementStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#data-landing-zone.ManagementStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#data-landing-zone.ManagementStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#data-landing-zone.ManagementStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#data-landing-zone.ManagementStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#data-landing-zone.ManagementStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#data-landing-zone.ManagementStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#data-landing-zone.ManagementStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#data-landing-zone.ManagementStack.resourceName">resourceName</a></code> | Create unique ResourceNames. |
| <code><a href="#data-landing-zone.ManagementStack.budgets">budgets</a></code> | *No description.* |
| <code><a href="#data-landing-zone.ManagementStack.deploymentPlatformGitHub">deploymentPlatformGitHub</a></code> | *No description.* |
| <code><a href="#data-landing-zone.ManagementStack.suspendedOuPolicies">suspendedOuPolicies</a></code> | Service Control Policies and Tag Policies  applied at the OU level because we won't need any customizations per account. |
| <code><a href="#data-landing-zone.ManagementStack.workloadAccountsOrgPolicies">workloadAccountsOrgPolicies</a></code> | Service Control Policies and Tag Policies applied at the account level to enable customization per account. |

---

##### `toString` <a name="toString" id="data-landing-zone.ManagementStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="data-landing-zone.ManagementStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="data-landing-zone.ManagementStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="data-landing-zone.ManagementStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="data-landing-zone.ManagementStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="data-landing-zone.ManagementStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="data-landing-zone.ManagementStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="data-landing-zone.ManagementStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="data-landing-zone.ManagementStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="data-landing-zone.ManagementStack.exportStringListValue"></a>

```typescript
public exportStringListValue(exportedValue: any, options?: ExportValueOptions): string[]
```

Create a CloudFormation Export for a string list value.

Returns a string list representing the corresponding `Fn.importValue()`
expression for this Export. The export expression is automatically wrapped with an
`Fn::Join` and the import value with an `Fn::Split`, since CloudFormation can only
export strings. You can control the name for the export by passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

See `exportValue` for an example of this process.

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.ManagementStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.ManagementStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="data-landing-zone.ManagementStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a string value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
  stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
  remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
  will make sure the CloudFormation Export continues to exist while the relationship
  between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.ManagementStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.ManagementStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="data-landing-zone.ManagementStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

  arn:{partition}:{service}:{region}:{account}:{resource}{sep}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="data-landing-zone.ManagementStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="data-landing-zone.ManagementStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="data-landing-zone.ManagementStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="data-landing-zone.ManagementStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="data-landing-zone.ManagementStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="data-landing-zone.ManagementStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="data-landing-zone.ManagementStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="data-landing-zone.ManagementStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="data-landing-zone.ManagementStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="data-landing-zone.ManagementStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="data-landing-zone.ManagementStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="data-landing-zone.ManagementStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.ManagementStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="data-landing-zone.ManagementStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="data-landing-zone.ManagementStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="data-landing-zone.ManagementStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="data-landing-zone.ManagementStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.ManagementStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="data-landing-zone.ManagementStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="data-landing-zone.ManagementStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.ManagementStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="data-landing-zone.ManagementStack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="data-landing-zone.ManagementStack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

##### `budgets` <a name="budgets" id="data-landing-zone.ManagementStack.budgets"></a>

```typescript
public budgets(): void
```

##### `deploymentPlatformGitHub` <a name="deploymentPlatformGitHub" id="data-landing-zone.ManagementStack.deploymentPlatformGitHub"></a>

```typescript
public deploymentPlatformGitHub(): void
```

##### `suspendedOuPolicies` <a name="suspendedOuPolicies" id="data-landing-zone.ManagementStack.suspendedOuPolicies"></a>

```typescript
public suspendedOuPolicies(): void
```

Service Control Policies and Tag Policies  applied at the OU level because we won't need any customizations per account.

##### `workloadAccountsOrgPolicies` <a name="workloadAccountsOrgPolicies" id="data-landing-zone.ManagementStack.workloadAccountsOrgPolicies"></a>

```typescript
public workloadAccountsOrgPolicies(): void
```

Service Control Policies and Tag Policies applied at the account level to enable customization per account.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.ManagementStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#data-landing-zone.ManagementStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#data-landing-zone.ManagementStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="data-landing-zone.ManagementStack.isConstruct"></a>

```typescript
import { ManagementStack } from 'data-landing-zone'

ManagementStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.ManagementStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="data-landing-zone.ManagementStack.isStack"></a>

```typescript
import { ManagementStack } from 'data-landing-zone'

ManagementStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.ManagementStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="data-landing-zone.ManagementStack.of"></a>

```typescript
import { ManagementStack } from 'data-landing-zone'

ManagementStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="data-landing-zone.ManagementStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.ManagementStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#data-landing-zone.ManagementStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#data-landing-zone.ManagementStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#data-landing-zone.ManagementStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#data-landing-zone.ManagementStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#data-landing-zone.ManagementStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#data-landing-zone.ManagementStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#data-landing-zone.ManagementStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#data-landing-zone.ManagementStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#data-landing-zone.ManagementStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#data-landing-zone.ManagementStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#data-landing-zone.ManagementStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#data-landing-zone.ManagementStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#data-landing-zone.ManagementStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#data-landing-zone.ManagementStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#data-landing-zone.ManagementStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#data-landing-zone.ManagementStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#data-landing-zone.ManagementStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#data-landing-zone.ManagementStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#data-landing-zone.ManagementStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#data-landing-zone.ManagementStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#data-landing-zone.ManagementStack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.ManagementStack.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.ManagementStack.property.topic">topic</a></code> | <code>aws-cdk-lib.aws_sns.Topic</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="data-landing-zone.ManagementStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="data-landing-zone.ManagementStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
   either be a concrete account (e.g. `585695031111`) or the
   `Aws.ACCOUNT_ID` token.
3. `Aws.ACCOUNT_ID`, which represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="data-landing-zone.ManagementStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="data-landing-zone.ManagementStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="data-landing-zone.ManagementStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="data-landing-zone.ManagementStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="data-landing-zone.ManagementStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.ACCOUNT_ID` or `Aws.REGION`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="data-landing-zone.ManagementStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="data-landing-zone.ManagementStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="data-landing-zone.ManagementStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="data-landing-zone.ManagementStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
   either be a concrete region (e.g. `us-west-2`) or the `Aws.REGION`
   token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="data-landing-zone.ManagementStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="data-landing-zone.ManagementStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.STACK_NAME` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="data-landing-zone.ManagementStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="data-landing-zone.ManagementStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="data-landing-zone.ManagementStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="data-landing-zone.ManagementStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="data-landing-zone.ManagementStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="data-landing-zone.ManagementStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="data-landing-zone.ManagementStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="data-landing-zone.ManagementStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="data-landing-zone.ManagementStack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="data-landing-zone.ManagementStack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `topic`<sup>Required</sup> <a name="topic" id="data-landing-zone.ManagementStack.property.topic"></a>

```typescript
public readonly topic: Topic;
```

- *Type:* aws-cdk-lib.aws_sns.Topic

---


### ProductionGlobalStack <a name="ProductionGlobalStack" id="data-landing-zone.ProductionGlobalStack"></a>

#### Initializers <a name="Initializers" id="data-landing-zone.ProductionGlobalStack.Initializer"></a>

```typescript
import { ProductionGlobalStack } from 'data-landing-zone'

new ProductionGlobalStack(scope: Construct, stackProps: DlzStackProps, props: DataLandingZoneProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.ProductionGlobalStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#data-landing-zone.ProductionGlobalStack.Initializer.parameter.stackProps">stackProps</a></code> | <code><a href="#data-landing-zone.DlzStackProps">DlzStackProps</a></code> | *No description.* |
| <code><a href="#data-landing-zone.ProductionGlobalStack.Initializer.parameter.props">props</a></code> | <code><a href="#data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="data-landing-zone.ProductionGlobalStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `stackProps`<sup>Required</sup> <a name="stackProps" id="data-landing-zone.ProductionGlobalStack.Initializer.parameter.stackProps"></a>

- *Type:* <a href="#data-landing-zone.DlzStackProps">DlzStackProps</a>

---

##### `props`<sup>Required</sup> <a name="props" id="data-landing-zone.ProductionGlobalStack.Initializer.parameter.props"></a>

- *Type:* <a href="#data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.ProductionGlobalStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.resourceName">resourceName</a></code> | Create unique ResourceNames. |

---

##### `toString` <a name="toString" id="data-landing-zone.ProductionGlobalStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="data-landing-zone.ProductionGlobalStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="data-landing-zone.ProductionGlobalStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="data-landing-zone.ProductionGlobalStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="data-landing-zone.ProductionGlobalStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="data-landing-zone.ProductionGlobalStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="data-landing-zone.ProductionGlobalStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="data-landing-zone.ProductionGlobalStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="data-landing-zone.ProductionGlobalStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="data-landing-zone.ProductionGlobalStack.exportStringListValue"></a>

```typescript
public exportStringListValue(exportedValue: any, options?: ExportValueOptions): string[]
```

Create a CloudFormation Export for a string list value.

Returns a string list representing the corresponding `Fn.importValue()`
expression for this Export. The export expression is automatically wrapped with an
`Fn::Join` and the import value with an `Fn::Split`, since CloudFormation can only
export strings. You can control the name for the export by passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

See `exportValue` for an example of this process.

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.ProductionGlobalStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.ProductionGlobalStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="data-landing-zone.ProductionGlobalStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a string value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
  stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
  remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
  will make sure the CloudFormation Export continues to exist while the relationship
  between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.ProductionGlobalStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.ProductionGlobalStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="data-landing-zone.ProductionGlobalStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

  arn:{partition}:{service}:{region}:{account}:{resource}{sep}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="data-landing-zone.ProductionGlobalStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="data-landing-zone.ProductionGlobalStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="data-landing-zone.ProductionGlobalStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="data-landing-zone.ProductionGlobalStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="data-landing-zone.ProductionGlobalStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="data-landing-zone.ProductionGlobalStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="data-landing-zone.ProductionGlobalStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="data-landing-zone.ProductionGlobalStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="data-landing-zone.ProductionGlobalStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="data-landing-zone.ProductionGlobalStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="data-landing-zone.ProductionGlobalStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="data-landing-zone.ProductionGlobalStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.ProductionGlobalStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="data-landing-zone.ProductionGlobalStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="data-landing-zone.ProductionGlobalStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="data-landing-zone.ProductionGlobalStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="data-landing-zone.ProductionGlobalStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.ProductionGlobalStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="data-landing-zone.ProductionGlobalStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="data-landing-zone.ProductionGlobalStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.ProductionGlobalStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="data-landing-zone.ProductionGlobalStack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="data-landing-zone.ProductionGlobalStack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.ProductionGlobalStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="data-landing-zone.ProductionGlobalStack.isConstruct"></a>

```typescript
import { ProductionGlobalStack } from 'data-landing-zone'

ProductionGlobalStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.ProductionGlobalStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="data-landing-zone.ProductionGlobalStack.isStack"></a>

```typescript
import { ProductionGlobalStack } from 'data-landing-zone'

ProductionGlobalStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.ProductionGlobalStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="data-landing-zone.ProductionGlobalStack.of"></a>

```typescript
import { ProductionGlobalStack } from 'data-landing-zone'

ProductionGlobalStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="data-landing-zone.ProductionGlobalStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.ProductionGlobalStack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="data-landing-zone.ProductionGlobalStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="data-landing-zone.ProductionGlobalStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
   either be a concrete account (e.g. `585695031111`) or the
   `Aws.ACCOUNT_ID` token.
3. `Aws.ACCOUNT_ID`, which represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="data-landing-zone.ProductionGlobalStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="data-landing-zone.ProductionGlobalStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="data-landing-zone.ProductionGlobalStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="data-landing-zone.ProductionGlobalStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="data-landing-zone.ProductionGlobalStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.ACCOUNT_ID` or `Aws.REGION`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="data-landing-zone.ProductionGlobalStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="data-landing-zone.ProductionGlobalStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="data-landing-zone.ProductionGlobalStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="data-landing-zone.ProductionGlobalStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
   either be a concrete region (e.g. `us-west-2`) or the `Aws.REGION`
   token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="data-landing-zone.ProductionGlobalStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="data-landing-zone.ProductionGlobalStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.STACK_NAME` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="data-landing-zone.ProductionGlobalStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="data-landing-zone.ProductionGlobalStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="data-landing-zone.ProductionGlobalStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="data-landing-zone.ProductionGlobalStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="data-landing-zone.ProductionGlobalStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="data-landing-zone.ProductionGlobalStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="data-landing-zone.ProductionGlobalStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="data-landing-zone.ProductionGlobalStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="data-landing-zone.ProductionGlobalStack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="data-landing-zone.ProductionGlobalStack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### ProductionRegionalStack <a name="ProductionRegionalStack" id="data-landing-zone.ProductionRegionalStack"></a>

#### Initializers <a name="Initializers" id="data-landing-zone.ProductionRegionalStack.Initializer"></a>

```typescript
import { ProductionRegionalStack } from 'data-landing-zone'

new ProductionRegionalStack(scope: Construct, stackProps: DlzStackProps, props: DataLandingZoneProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.ProductionRegionalStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#data-landing-zone.ProductionRegionalStack.Initializer.parameter.stackProps">stackProps</a></code> | <code><a href="#data-landing-zone.DlzStackProps">DlzStackProps</a></code> | *No description.* |
| <code><a href="#data-landing-zone.ProductionRegionalStack.Initializer.parameter.props">props</a></code> | <code><a href="#data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="data-landing-zone.ProductionRegionalStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `stackProps`<sup>Required</sup> <a name="stackProps" id="data-landing-zone.ProductionRegionalStack.Initializer.parameter.stackProps"></a>

- *Type:* <a href="#data-landing-zone.DlzStackProps">DlzStackProps</a>

---

##### `props`<sup>Required</sup> <a name="props" id="data-landing-zone.ProductionRegionalStack.Initializer.parameter.props"></a>

- *Type:* <a href="#data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.ProductionRegionalStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.resourceName">resourceName</a></code> | Create unique ResourceNames. |

---

##### `toString` <a name="toString" id="data-landing-zone.ProductionRegionalStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="data-landing-zone.ProductionRegionalStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="data-landing-zone.ProductionRegionalStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="data-landing-zone.ProductionRegionalStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="data-landing-zone.ProductionRegionalStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="data-landing-zone.ProductionRegionalStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="data-landing-zone.ProductionRegionalStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="data-landing-zone.ProductionRegionalStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="data-landing-zone.ProductionRegionalStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="data-landing-zone.ProductionRegionalStack.exportStringListValue"></a>

```typescript
public exportStringListValue(exportedValue: any, options?: ExportValueOptions): string[]
```

Create a CloudFormation Export for a string list value.

Returns a string list representing the corresponding `Fn.importValue()`
expression for this Export. The export expression is automatically wrapped with an
`Fn::Join` and the import value with an `Fn::Split`, since CloudFormation can only
export strings. You can control the name for the export by passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

See `exportValue` for an example of this process.

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.ProductionRegionalStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.ProductionRegionalStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="data-landing-zone.ProductionRegionalStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a string value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
  stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
  remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
  will make sure the CloudFormation Export continues to exist while the relationship
  between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="data-landing-zone.ProductionRegionalStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="data-landing-zone.ProductionRegionalStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="data-landing-zone.ProductionRegionalStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

  arn:{partition}:{service}:{region}:{account}:{resource}{sep}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="data-landing-zone.ProductionRegionalStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="data-landing-zone.ProductionRegionalStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="data-landing-zone.ProductionRegionalStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="data-landing-zone.ProductionRegionalStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="data-landing-zone.ProductionRegionalStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="data-landing-zone.ProductionRegionalStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="data-landing-zone.ProductionRegionalStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="data-landing-zone.ProductionRegionalStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="data-landing-zone.ProductionRegionalStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="data-landing-zone.ProductionRegionalStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="data-landing-zone.ProductionRegionalStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="data-landing-zone.ProductionRegionalStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.ProductionRegionalStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="data-landing-zone.ProductionRegionalStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="data-landing-zone.ProductionRegionalStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="data-landing-zone.ProductionRegionalStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="data-landing-zone.ProductionRegionalStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.ProductionRegionalStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="data-landing-zone.ProductionRegionalStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="data-landing-zone.ProductionRegionalStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="data-landing-zone.ProductionRegionalStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="data-landing-zone.ProductionRegionalStack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="data-landing-zone.ProductionRegionalStack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.ProductionRegionalStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="data-landing-zone.ProductionRegionalStack.isConstruct"></a>

```typescript
import { ProductionRegionalStack } from 'data-landing-zone'

ProductionRegionalStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.ProductionRegionalStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="data-landing-zone.ProductionRegionalStack.isStack"></a>

```typescript
import { ProductionRegionalStack } from 'data-landing-zone'

ProductionRegionalStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="data-landing-zone.ProductionRegionalStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="data-landing-zone.ProductionRegionalStack.of"></a>

```typescript
import { ProductionRegionalStack } from 'data-landing-zone'

ProductionRegionalStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="data-landing-zone.ProductionRegionalStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.ProductionRegionalStack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="data-landing-zone.ProductionRegionalStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="data-landing-zone.ProductionRegionalStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
   either be a concrete account (e.g. `585695031111`) or the
   `Aws.ACCOUNT_ID` token.
3. `Aws.ACCOUNT_ID`, which represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="data-landing-zone.ProductionRegionalStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="data-landing-zone.ProductionRegionalStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="data-landing-zone.ProductionRegionalStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="data-landing-zone.ProductionRegionalStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="data-landing-zone.ProductionRegionalStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.ACCOUNT_ID` or `Aws.REGION`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="data-landing-zone.ProductionRegionalStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="data-landing-zone.ProductionRegionalStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="data-landing-zone.ProductionRegionalStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="data-landing-zone.ProductionRegionalStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
   either be a concrete region (e.g. `us-west-2`) or the `Aws.REGION`
   token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="data-landing-zone.ProductionRegionalStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="data-landing-zone.ProductionRegionalStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.STACK_NAME` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="data-landing-zone.ProductionRegionalStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="data-landing-zone.ProductionRegionalStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="data-landing-zone.ProductionRegionalStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="data-landing-zone.ProductionRegionalStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="data-landing-zone.ProductionRegionalStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="data-landing-zone.ProductionRegionalStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="data-landing-zone.ProductionRegionalStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="data-landing-zone.ProductionRegionalStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="data-landing-zone.ProductionRegionalStack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="data-landing-zone.ProductionRegionalStack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### AuditStacks <a name="AuditStacks" id="data-landing-zone.AuditStacks"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.AuditStacks.Initializer"></a>

```typescript
import { AuditStacks } from 'data-landing-zone'

const auditStacks: AuditStacks = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.AuditStacks.property.global">global</a></code> | <code><a href="#data-landing-zone.AuditGlobalStack">AuditGlobalStack</a></code> | *No description.* |
| <code><a href="#data-landing-zone.AuditStacks.property.regional">regional</a></code> | <code><a href="#data-landing-zone.AuditRegionalStack">AuditRegionalStack</a>[]</code> | *No description.* |

---

##### `global`<sup>Required</sup> <a name="global" id="data-landing-zone.AuditStacks.property.global"></a>

```typescript
public readonly global: AuditGlobalStack;
```

- *Type:* <a href="#data-landing-zone.AuditGlobalStack">AuditGlobalStack</a>

---

##### `regional`<sup>Required</sup> <a name="regional" id="data-landing-zone.AuditStacks.property.regional"></a>

```typescript
public readonly regional: AuditRegionalStack[];
```

- *Type:* <a href="#data-landing-zone.AuditRegionalStack">AuditRegionalStack</a>[]

---

### BudgetProps <a name="BudgetProps" id="data-landing-zone.BudgetProps"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.BudgetProps.Initializer"></a>

```typescript
import { BudgetProps } from 'data-landing-zone'

const budgetProps: BudgetProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.BudgetProps.property.amount">amount</a></code> | <code>number</code> | *No description.* |
| <code><a href="#data-landing-zone.BudgetProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.BudgetProps.property.subscribers">subscribers</a></code> | <code><a href="#data-landing-zone.BudgetSubscribers">BudgetSubscribers</a></code> | *No description.* |
| <code><a href="#data-landing-zone.BudgetProps.property.forTags">forTags</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |

---

##### `amount`<sup>Required</sup> <a name="amount" id="data-landing-zone.BudgetProps.property.amount"></a>

```typescript
public readonly amount: number;
```

- *Type:* number

---

##### `name`<sup>Required</sup> <a name="name" id="data-landing-zone.BudgetProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `subscribers`<sup>Required</sup> <a name="subscribers" id="data-landing-zone.BudgetProps.property.subscribers"></a>

```typescript
public readonly subscribers: BudgetSubscribers;
```

- *Type:* <a href="#data-landing-zone.BudgetSubscribers">BudgetSubscribers</a>

---

##### `forTags`<sup>Optional</sup> <a name="forTags" id="data-landing-zone.BudgetProps.property.forTags"></a>

```typescript
public readonly forTags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

### BudgetSubscribers <a name="BudgetSubscribers" id="data-landing-zone.BudgetSubscribers"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.BudgetSubscribers.Initializer"></a>

```typescript
import { BudgetSubscribers } from 'data-landing-zone'

const budgetSubscribers: BudgetSubscribers = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.BudgetSubscribers.property.emails">emails</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#data-landing-zone.BudgetSubscribers.property.slack">slack</a></code> | <code><a href="#data-landing-zone.SlackChannel">SlackChannel</a></code> | *No description.* |

---

##### `emails`<sup>Optional</sup> <a name="emails" id="data-landing-zone.BudgetSubscribers.property.emails"></a>

```typescript
public readonly emails: string[];
```

- *Type:* string[]

---

##### `slack`<sup>Optional</sup> <a name="slack" id="data-landing-zone.BudgetSubscribers.property.slack"></a>

```typescript
public readonly slack: SlackChannel;
```

- *Type:* <a href="#data-landing-zone.SlackChannel">SlackChannel</a>

---

### DataLandingZoneProps <a name="DataLandingZoneProps" id="data-landing-zone.DataLandingZoneProps"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.DataLandingZoneProps.Initializer"></a>

```typescript
import { DataLandingZoneProps } from 'data-landing-zone'

const dataLandingZoneProps: DataLandingZoneProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DataLandingZoneProps.property.budgets">budgets</a></code> | <code><a href="#data-landing-zone.BudgetProps">BudgetProps</a>[]</code> | *No description.* |
| <code><a href="#data-landing-zone.DataLandingZoneProps.property.localProfile">localProfile</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DataLandingZoneProps.property.mandatoryTags">mandatoryTags</a></code> | <code><a href="#data-landing-zone.MandatoryTags">MandatoryTags</a></code> | The values of the mandatory tags that all resources must have. |
| <code><a href="#data-landing-zone.DataLandingZoneProps.property.organization">organization</a></code> | <code><a href="#data-landing-zone.DLzOrganization">DLzOrganization</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DataLandingZoneProps.property.regions">regions</a></code> | <code><a href="#data-landing-zone.DlzRegions">DlzRegions</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DataLandingZoneProps.property.securityHubNotifications">securityHubNotifications</a></code> | <code><a href="#data-landing-zone.SecurityHubNotification">SecurityHubNotification</a>[]</code> | *No description.* |
| <code><a href="#data-landing-zone.DataLandingZoneProps.property.additionalMandatoryTags">additionalMandatoryTags</a></code> | <code><a href="#data-landing-zone.DlzTag">DlzTag</a>[]</code> | List of additional mandatory tags that all resources must have. Not all resources support tags, this is a best-effort. |
| <code><a href="#data-landing-zone.DataLandingZoneProps.property.denyServiceList">denyServiceList</a></code> | <code>string[]</code> | List of services to deny in the organization SCP. |
| <code><a href="#data-landing-zone.DataLandingZoneProps.property.deploymentPlatform">deploymentPlatform</a></code> | <code><a href="#data-landing-zone.DeploymentPlatform">DeploymentPlatform</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DataLandingZoneProps.property.printDeploymentOrder">printDeploymentOrder</a></code> | <code>boolean</code> | Print the deployment order to the console. |
| <code><a href="#data-landing-zone.DataLandingZoneProps.property.printReport">printReport</a></code> | <code>boolean</code> | Print the report grouped by account, type and aggregated regions to the console. |
| <code><a href="#data-landing-zone.DataLandingZoneProps.property.saveReport">saveReport</a></code> | <code>boolean</code> | Save the raw report items and the reports grouped by account to a `./.dlz-reports` folder. |

---

##### `budgets`<sup>Required</sup> <a name="budgets" id="data-landing-zone.DataLandingZoneProps.property.budgets"></a>

```typescript
public readonly budgets: BudgetProps[];
```

- *Type:* <a href="#data-landing-zone.BudgetProps">BudgetProps</a>[]

---

##### `localProfile`<sup>Required</sup> <a name="localProfile" id="data-landing-zone.DataLandingZoneProps.property.localProfile"></a>

```typescript
public readonly localProfile: string;
```

- *Type:* string

---

##### `mandatoryTags`<sup>Required</sup> <a name="mandatoryTags" id="data-landing-zone.DataLandingZoneProps.property.mandatoryTags"></a>

```typescript
public readonly mandatoryTags: MandatoryTags;
```

- *Type:* <a href="#data-landing-zone.MandatoryTags">MandatoryTags</a>

The values of the mandatory tags that all resources must have.

The following values are already specified and used by the DLZ constructs
- Owner: [infra]
- Project: [dlz]
- Environment: [dlz]

---

##### `organization`<sup>Required</sup> <a name="organization" id="data-landing-zone.DataLandingZoneProps.property.organization"></a>

```typescript
public readonly organization: DLzOrganization;
```

- *Type:* <a href="#data-landing-zone.DLzOrganization">DLzOrganization</a>

---

##### `regions`<sup>Required</sup> <a name="regions" id="data-landing-zone.DataLandingZoneProps.property.regions"></a>

```typescript
public readonly regions: DlzRegions;
```

- *Type:* <a href="#data-landing-zone.DlzRegions">DlzRegions</a>

---

##### `securityHubNotifications`<sup>Required</sup> <a name="securityHubNotifications" id="data-landing-zone.DataLandingZoneProps.property.securityHubNotifications"></a>

```typescript
public readonly securityHubNotifications: SecurityHubNotification[];
```

- *Type:* <a href="#data-landing-zone.SecurityHubNotification">SecurityHubNotification</a>[]

---

##### `additionalMandatoryTags`<sup>Optional</sup> <a name="additionalMandatoryTags" id="data-landing-zone.DataLandingZoneProps.property.additionalMandatoryTags"></a>

```typescript
public readonly additionalMandatoryTags: DlzTag[];
```

- *Type:* <a href="#data-landing-zone.DlzTag">DlzTag</a>[]
- *Default:* Defaults.mandatoryTags()

List of additional mandatory tags that all resources must have. Not all resources support tags, this is a best-effort.

Mandatory tags are defined in Defaults.mandatoryTags() which are:
- Owner, the team responsible for the resource
- Project, the project the resource is part of
- Environment, the environment the resource is part of

It creates:
1. A tag policy in the organization
2. An SCP on the organization that all CFN stacks must have these tags when created
3. An AWS Config rule that checks for these tags on all CFN stacks and resources

For all stacks created by DLZ the following tags are applied:
- Owner: infra
- Project: dlz
- Environment: dlz

---

##### `denyServiceList`<sup>Optional</sup> <a name="denyServiceList" id="data-landing-zone.DataLandingZoneProps.property.denyServiceList"></a>

```typescript
public readonly denyServiceList: string[];
```

- *Type:* string[]
- *Default:* DataLandingZone.defaultDenyServiceList()

List of services to deny in the organization SCP.

If not specified, the default defined by

---

##### `deploymentPlatform`<sup>Optional</sup> <a name="deploymentPlatform" id="data-landing-zone.DataLandingZoneProps.property.deploymentPlatform"></a>

```typescript
public readonly deploymentPlatform: DeploymentPlatform;
```

- *Type:* <a href="#data-landing-zone.DeploymentPlatform">DeploymentPlatform</a>

---

##### `printDeploymentOrder`<sup>Optional</sup> <a name="printDeploymentOrder" id="data-landing-zone.DataLandingZoneProps.property.printDeploymentOrder"></a>

```typescript
public readonly printDeploymentOrder: boolean;
```

- *Type:* boolean
- *Default:* true

Print the deployment order to the console.

---

##### `printReport`<sup>Optional</sup> <a name="printReport" id="data-landing-zone.DataLandingZoneProps.property.printReport"></a>

```typescript
public readonly printReport: boolean;
```

- *Type:* boolean
- *Default:* true

Print the report grouped by account, type and aggregated regions to the console.

---

##### `saveReport`<sup>Optional</sup> <a name="saveReport" id="data-landing-zone.DataLandingZoneProps.property.saveReport"></a>

```typescript
public readonly saveReport: boolean;
```

- *Type:* boolean
- *Default:* true

Save the raw report items and the reports grouped by account to a `./.dlz-reports` folder.

---

### DeploymentPlatform <a name="DeploymentPlatform" id="data-landing-zone.DeploymentPlatform"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.DeploymentPlatform.Initializer"></a>

```typescript
import { DeploymentPlatform } from 'data-landing-zone'

const deploymentPlatform: DeploymentPlatform = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DeploymentPlatform.property.gitHub">gitHub</a></code> | <code><a href="#data-landing-zone.DeploymentPlatformGitHub">DeploymentPlatformGitHub</a></code> | *No description.* |

---

##### `gitHub`<sup>Optional</sup> <a name="gitHub" id="data-landing-zone.DeploymentPlatform.property.gitHub"></a>

```typescript
public readonly gitHub: DeploymentPlatformGitHub;
```

- *Type:* <a href="#data-landing-zone.DeploymentPlatformGitHub">DeploymentPlatformGitHub</a>

---

### DeploymentPlatformGitHub <a name="DeploymentPlatformGitHub" id="data-landing-zone.DeploymentPlatformGitHub"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.DeploymentPlatformGitHub.Initializer"></a>

```typescript
import { DeploymentPlatformGitHub } from 'data-landing-zone'

const deploymentPlatformGitHub: DeploymentPlatformGitHub = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DeploymentPlatformGitHub.property.references">references</a></code> | <code><a href="#data-landing-zone.GitHubReference">GitHubReference</a>[]</code> | *No description.* |

---

##### `references`<sup>Required</sup> <a name="references" id="data-landing-zone.DeploymentPlatformGitHub.property.references"></a>

```typescript
public readonly references: GitHubReference[];
```

- *Type:* <a href="#data-landing-zone.GitHubReference">GitHubReference</a>[]

---

### DevelopAccountStacks <a name="DevelopAccountStacks" id="data-landing-zone.DevelopAccountStacks"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.DevelopAccountStacks.Initializer"></a>

```typescript
import { DevelopAccountStacks } from 'data-landing-zone'

const developAccountStacks: DevelopAccountStacks = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DevelopAccountStacks.property.accountId">accountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DevelopAccountStacks.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DevelopAccountStacks.property.stacks">stacks</a></code> | <code><a href="#data-landing-zone.DevelopStacks">DevelopStacks</a></code> | *No description.* |

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="data-landing-zone.DevelopAccountStacks.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="data-landing-zone.DevelopAccountStacks.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `stacks`<sup>Required</sup> <a name="stacks" id="data-landing-zone.DevelopAccountStacks.property.stacks"></a>

```typescript
public readonly stacks: DevelopStacks;
```

- *Type:* <a href="#data-landing-zone.DevelopStacks">DevelopStacks</a>

---

### DevelopStacks <a name="DevelopStacks" id="data-landing-zone.DevelopStacks"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.DevelopStacks.Initializer"></a>

```typescript
import { DevelopStacks } from 'data-landing-zone'

const developStacks: DevelopStacks = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DevelopStacks.property.global">global</a></code> | <code><a href="#data-landing-zone.DevelopGlobalStack">DevelopGlobalStack</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DevelopStacks.property.regional">regional</a></code> | <code><a href="#data-landing-zone.DevelopRegionalStack">DevelopRegionalStack</a>[]</code> | *No description.* |

---

##### `global`<sup>Required</sup> <a name="global" id="data-landing-zone.DevelopStacks.property.global"></a>

```typescript
public readonly global: DevelopGlobalStack;
```

- *Type:* <a href="#data-landing-zone.DevelopGlobalStack">DevelopGlobalStack</a>

---

##### `regional`<sup>Required</sup> <a name="regional" id="data-landing-zone.DevelopStacks.property.regional"></a>

```typescript
public readonly regional: DevelopRegionalStack[];
```

- *Type:* <a href="#data-landing-zone.DevelopRegionalStack">DevelopRegionalStack</a>[]

---

### DLzAccount <a name="DLzAccount" id="data-landing-zone.DLzAccount"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.DLzAccount.Initializer"></a>

```typescript
import { DLzAccount } from 'data-landing-zone'

const dLzAccount: DLzAccount = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DLzAccount.property.accountId">accountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DLzAccount.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DLzAccount.property.type">type</a></code> | <code><a href="#data-landing-zone.DlzAccountType">DlzAccountType</a></code> | *No description.* |

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="data-landing-zone.DLzAccount.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="data-landing-zone.DLzAccount.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `type`<sup>Required</sup> <a name="type" id="data-landing-zone.DLzAccount.property.type"></a>

```typescript
public readonly type: DlzAccountType;
```

- *Type:* <a href="#data-landing-zone.DlzAccountType">DlzAccountType</a>

---

### DlzControlTowerControlIdNameProps <a name="DlzControlTowerControlIdNameProps" id="data-landing-zone.DlzControlTowerControlIdNameProps"></a>

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Do not export any of the controls in the folders, they do not conform to JSII, class names are snake case caps and the controlIdName properties are also snake case caps. This will cause the JSII build to fail. !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

#### Initializer <a name="Initializer" id="data-landing-zone.DlzControlTowerControlIdNameProps.Initializer"></a>

```typescript
import { DlzControlTowerControlIdNameProps } from 'data-landing-zone'

const dlzControlTowerControlIdNameProps: DlzControlTowerControlIdNameProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DlzControlTowerControlIdNameProps.property.euWest1">euWest1</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerControlIdNameProps.property.usEast1">usEast1</a></code> | <code>string</code> | *No description.* |

---

##### `euWest1`<sup>Required</sup> <a name="euWest1" id="data-landing-zone.DlzControlTowerControlIdNameProps.property.euWest1"></a>

```typescript
public readonly euWest1: string;
```

- *Type:* string

---

##### `usEast1`<sup>Required</sup> <a name="usEast1" id="data-landing-zone.DlzControlTowerControlIdNameProps.property.usEast1"></a>

```typescript
public readonly usEast1: string;
```

- *Type:* string

---

### DlzControlTowerEnabledControlProps <a name="DlzControlTowerEnabledControlProps" id="data-landing-zone.DlzControlTowerEnabledControlProps"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.DlzControlTowerEnabledControlProps.Initializer"></a>

```typescript
import { DlzControlTowerEnabledControlProps } from 'data-landing-zone'

const dlzControlTowerEnabledControlProps: DlzControlTowerEnabledControlProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DlzControlTowerEnabledControlProps.property.appliedOu">appliedOu</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerEnabledControlProps.property.control">control</a></code> | <code><a href="#data-landing-zone.IDlzControlTowerControl">IDlzControlTowerControl</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerEnabledControlProps.property.controlTowerAccountId">controlTowerAccountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerEnabledControlProps.property.controlTowerRegion">controlTowerRegion</a></code> | <code><a href="#data-landing-zone.Region">Region</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerEnabledControlProps.property.organizationId">organizationId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerEnabledControlProps.property.tags">tags</a></code> | <code>aws-cdk-lib.CfnTag[]</code> | *No description.* |

---

##### `appliedOu`<sup>Required</sup> <a name="appliedOu" id="data-landing-zone.DlzControlTowerEnabledControlProps.property.appliedOu"></a>

```typescript
public readonly appliedOu: string;
```

- *Type:* string

---

##### `control`<sup>Required</sup> <a name="control" id="data-landing-zone.DlzControlTowerEnabledControlProps.property.control"></a>

```typescript
public readonly control: IDlzControlTowerControl;
```

- *Type:* <a href="#data-landing-zone.IDlzControlTowerControl">IDlzControlTowerControl</a>

---

##### `controlTowerAccountId`<sup>Required</sup> <a name="controlTowerAccountId" id="data-landing-zone.DlzControlTowerEnabledControlProps.property.controlTowerAccountId"></a>

```typescript
public readonly controlTowerAccountId: string;
```

- *Type:* string

---

##### `controlTowerRegion`<sup>Required</sup> <a name="controlTowerRegion" id="data-landing-zone.DlzControlTowerEnabledControlProps.property.controlTowerRegion"></a>

```typescript
public readonly controlTowerRegion: Region;
```

- *Type:* <a href="#data-landing-zone.Region">Region</a>

---

##### `organizationId`<sup>Required</sup> <a name="organizationId" id="data-landing-zone.DlzControlTowerEnabledControlProps.property.organizationId"></a>

```typescript
public readonly organizationId: string;
```

- *Type:* string

---

##### `tags`<sup>Optional</sup> <a name="tags" id="data-landing-zone.DlzControlTowerEnabledControlProps.property.tags"></a>

```typescript
public readonly tags: CfnTag[];
```

- *Type:* aws-cdk-lib.CfnTag[]

---

### DLzManagementAccount <a name="DLzManagementAccount" id="data-landing-zone.DLzManagementAccount"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.DLzManagementAccount.Initializer"></a>

```typescript
import { DLzManagementAccount } from 'data-landing-zone'

const dLzManagementAccount: DLzManagementAccount = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DLzManagementAccount.property.accountId">accountId</a></code> | <code>string</code> | *No description.* |

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="data-landing-zone.DLzManagementAccount.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

---

### DLzOrganization <a name="DLzOrganization" id="data-landing-zone.DLzOrganization"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.DLzOrganization.Initializer"></a>

```typescript
import { DLzOrganization } from 'data-landing-zone'

const dLzOrganization: DLzOrganization = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DLzOrganization.property.organizationId">organizationId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DLzOrganization.property.ous">ous</a></code> | <code><a href="#data-landing-zone.OrgOus">OrgOus</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DLzOrganization.property.root">root</a></code> | <code><a href="#data-landing-zone.RootOptions">RootOptions</a></code> | *No description.* |

---

##### `organizationId`<sup>Required</sup> <a name="organizationId" id="data-landing-zone.DLzOrganization.property.organizationId"></a>

```typescript
public readonly organizationId: string;
```

- *Type:* string

---

##### `ous`<sup>Required</sup> <a name="ous" id="data-landing-zone.DLzOrganization.property.ous"></a>

```typescript
public readonly ous: OrgOus;
```

- *Type:* <a href="#data-landing-zone.OrgOus">OrgOus</a>

---

##### `root`<sup>Required</sup> <a name="root" id="data-landing-zone.DLzOrganization.property.root"></a>

```typescript
public readonly root: RootOptions;
```

- *Type:* <a href="#data-landing-zone.RootOptions">RootOptions</a>

---

### DlzRegions <a name="DlzRegions" id="data-landing-zone.DlzRegions"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.DlzRegions.Initializer"></a>

```typescript
import { DlzRegions } from 'data-landing-zone'

const dlzRegions: DlzRegions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DlzRegions.property.global">global</a></code> | <code><a href="#data-landing-zone.Region">Region</a></code> | Also known as the Home region for Control Tower. |
| <code><a href="#data-landing-zone.DlzRegions.property.regional">regional</a></code> | <code><a href="#data-landing-zone.Region">Region</a>[]</code> | The other regions to support (do not specify the global region again). |

---

##### `global`<sup>Required</sup> <a name="global" id="data-landing-zone.DlzRegions.property.global"></a>

```typescript
public readonly global: Region;
```

- *Type:* <a href="#data-landing-zone.Region">Region</a>

Also known as the Home region for Control Tower.

---

##### `regional`<sup>Required</sup> <a name="regional" id="data-landing-zone.DlzRegions.property.regional"></a>

```typescript
public readonly regional: Region[];
```

- *Type:* <a href="#data-landing-zone.Region">Region</a>[]

The other regions to support (do not specify the global region again).

---

### DlzServiceControlPolicyProps <a name="DlzServiceControlPolicyProps" id="data-landing-zone.DlzServiceControlPolicyProps"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.DlzServiceControlPolicyProps.Initializer"></a>

```typescript
import { DlzServiceControlPolicyProps } from 'data-landing-zone'

const dlzServiceControlPolicyProps: DlzServiceControlPolicyProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DlzServiceControlPolicyProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzServiceControlPolicyProps.property.statements">statements</a></code> | <code>aws-cdk-lib.aws_iam.PolicyStatement[]</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzServiceControlPolicyProps.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzServiceControlPolicyProps.property.tags">tags</a></code> | <code>aws-cdk-lib.CfnTag[]</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzServiceControlPolicyProps.property.targetIds">targetIds</a></code> | <code>string[]</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="data-landing-zone.DlzServiceControlPolicyProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `statements`<sup>Required</sup> <a name="statements" id="data-landing-zone.DlzServiceControlPolicyProps.property.statements"></a>

```typescript
public readonly statements: PolicyStatement[];
```

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement[]

---

##### `description`<sup>Optional</sup> <a name="description" id="data-landing-zone.DlzServiceControlPolicyProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `tags`<sup>Optional</sup> <a name="tags" id="data-landing-zone.DlzServiceControlPolicyProps.property.tags"></a>

```typescript
public readonly tags: CfnTag[];
```

- *Type:* aws-cdk-lib.CfnTag[]

---

##### `targetIds`<sup>Optional</sup> <a name="targetIds" id="data-landing-zone.DlzServiceControlPolicyProps.property.targetIds"></a>

```typescript
public readonly targetIds: string[];
```

- *Type:* string[]

---

### DlzStackNameProps <a name="DlzStackNameProps" id="data-landing-zone.DlzStackNameProps"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.DlzStackNameProps.Initializer"></a>

```typescript
import { DlzStackNameProps } from 'data-landing-zone'

const dlzStackNameProps: DlzStackNameProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DlzStackNameProps.property.region">region</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzStackNameProps.property.stack">stack</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzStackNameProps.property.account">account</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzStackNameProps.property.ou">ou</a></code> | <code>string</code> | *No description.* |

---

##### `region`<sup>Required</sup> <a name="region" id="data-landing-zone.DlzStackNameProps.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

---

##### `stack`<sup>Required</sup> <a name="stack" id="data-landing-zone.DlzStackNameProps.property.stack"></a>

```typescript
public readonly stack: string;
```

- *Type:* string

---

##### `account`<sup>Optional</sup> <a name="account" id="data-landing-zone.DlzStackNameProps.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

---

##### `ou`<sup>Optional</sup> <a name="ou" id="data-landing-zone.DlzStackNameProps.property.ou"></a>

```typescript
public readonly ou: string;
```

- *Type:* string

---

### DlzStackProps <a name="DlzStackProps" id="data-landing-zone.DlzStackProps"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.DlzStackProps.Initializer"></a>

```typescript
import { DlzStackProps } from 'data-landing-zone'

const dlzStackProps: DlzStackProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DlzStackProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzStackProps.property.name">name</a></code> | <code><a href="#data-landing-zone.DlzStackNameProps">DlzStackNameProps</a></code> | *No description.* |

---

##### `env`<sup>Required</sup> <a name="env" id="data-landing-zone.DlzStackProps.property.env"></a>

```typescript
public readonly env: Environment;
```

- *Type:* aws-cdk-lib.Environment

---

##### `name`<sup>Required</sup> <a name="name" id="data-landing-zone.DlzStackProps.property.name"></a>

```typescript
public readonly name: DlzStackNameProps;
```

- *Type:* <a href="#data-landing-zone.DlzStackNameProps">DlzStackNameProps</a>

---

### DlzTag <a name="DlzTag" id="data-landing-zone.DlzTag"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.DlzTag.Initializer"></a>

```typescript
import { DlzTag } from 'data-landing-zone'

const dlzTag: DlzTag = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DlzTag.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzTag.property.values">values</a></code> | <code>string[]</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="data-landing-zone.DlzTag.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `values`<sup>Optional</sup> <a name="values" id="data-landing-zone.DlzTag.property.values"></a>

```typescript
public readonly values: string[];
```

- *Type:* string[]

---

### DlzTagPolicyProps <a name="DlzTagPolicyProps" id="data-landing-zone.DlzTagPolicyProps"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.DlzTagPolicyProps.Initializer"></a>

```typescript
import { DlzTagPolicyProps } from 'data-landing-zone'

const dlzTagPolicyProps: DlzTagPolicyProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DlzTagPolicyProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzTagPolicyProps.property.policyTags">policyTags</a></code> | <code><a href="#data-landing-zone.DlzTag">DlzTag</a>[]</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzTagPolicyProps.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzTagPolicyProps.property.tags">tags</a></code> | <code>aws-cdk-lib.CfnTag[]</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzTagPolicyProps.property.targetIds">targetIds</a></code> | <code>string[]</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="data-landing-zone.DlzTagPolicyProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `policyTags`<sup>Required</sup> <a name="policyTags" id="data-landing-zone.DlzTagPolicyProps.property.policyTags"></a>

```typescript
public readonly policyTags: DlzTag[];
```

- *Type:* <a href="#data-landing-zone.DlzTag">DlzTag</a>[]

---

##### `description`<sup>Optional</sup> <a name="description" id="data-landing-zone.DlzTagPolicyProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `tags`<sup>Optional</sup> <a name="tags" id="data-landing-zone.DlzTagPolicyProps.property.tags"></a>

```typescript
public readonly tags: CfnTag[];
```

- *Type:* aws-cdk-lib.CfnTag[]

---

##### `targetIds`<sup>Optional</sup> <a name="targetIds" id="data-landing-zone.DlzTagPolicyProps.property.targetIds"></a>

```typescript
public readonly targetIds: string[];
```

- *Type:* string[]

---

### GitHubReference <a name="GitHubReference" id="data-landing-zone.GitHubReference"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.GitHubReference.Initializer"></a>

```typescript
import { GitHubReference } from 'data-landing-zone'

const gitHubReference: GitHubReference = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.GitHubReference.property.owner">owner</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.GitHubReference.property.repo">repo</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.GitHubReference.property.filter">filter</a></code> | <code>string</code> | *No description.* |

---

##### `owner`<sup>Required</sup> <a name="owner" id="data-landing-zone.GitHubReference.property.owner"></a>

```typescript
public readonly owner: string;
```

- *Type:* string

---

##### `repo`<sup>Required</sup> <a name="repo" id="data-landing-zone.GitHubReference.property.repo"></a>

```typescript
public readonly repo: string;
```

- *Type:* string

---

##### `filter`<sup>Optional</sup> <a name="filter" id="data-landing-zone.GitHubReference.property.filter"></a>

```typescript
public readonly filter: string;
```

- *Type:* string

---

### LogStacks <a name="LogStacks" id="data-landing-zone.LogStacks"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.LogStacks.Initializer"></a>

```typescript
import { LogStacks } from 'data-landing-zone'

const logStacks: LogStacks = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.LogStacks.property.global">global</a></code> | <code><a href="#data-landing-zone.LogGlobalStack">LogGlobalStack</a></code> | *No description.* |
| <code><a href="#data-landing-zone.LogStacks.property.regional">regional</a></code> | <code><a href="#data-landing-zone.LogGlobalStack">LogGlobalStack</a>[]</code> | *No description.* |

---

##### `global`<sup>Required</sup> <a name="global" id="data-landing-zone.LogStacks.property.global"></a>

```typescript
public readonly global: LogGlobalStack;
```

- *Type:* <a href="#data-landing-zone.LogGlobalStack">LogGlobalStack</a>

---

##### `regional`<sup>Required</sup> <a name="regional" id="data-landing-zone.LogStacks.property.regional"></a>

```typescript
public readonly regional: LogGlobalStack[];
```

- *Type:* <a href="#data-landing-zone.LogGlobalStack">LogGlobalStack</a>[]

---

### MandatoryTags <a name="MandatoryTags" id="data-landing-zone.MandatoryTags"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.MandatoryTags.Initializer"></a>

```typescript
import { MandatoryTags } from 'data-landing-zone'

const mandatoryTags: MandatoryTags = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.MandatoryTags.property.environment">environment</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#data-landing-zone.MandatoryTags.property.owner">owner</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#data-landing-zone.MandatoryTags.property.project">project</a></code> | <code>string[]</code> | *No description.* |

---

##### `environment`<sup>Required</sup> <a name="environment" id="data-landing-zone.MandatoryTags.property.environment"></a>

```typescript
public readonly environment: string[];
```

- *Type:* string[]

---

##### `owner`<sup>Required</sup> <a name="owner" id="data-landing-zone.MandatoryTags.property.owner"></a>

```typescript
public readonly owner: string[];
```

- *Type:* string[]

---

##### `project`<sup>Required</sup> <a name="project" id="data-landing-zone.MandatoryTags.property.project"></a>

```typescript
public readonly project: string[];
```

- *Type:* string[]

---

### OrgOus <a name="OrgOus" id="data-landing-zone.OrgOus"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.OrgOus.Initializer"></a>

```typescript
import { OrgOus } from 'data-landing-zone'

const orgOus: OrgOus = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.OrgOus.property.security">security</a></code> | <code><a href="#data-landing-zone.OrgOuSecurity">OrgOuSecurity</a></code> | *No description.* |
| <code><a href="#data-landing-zone.OrgOus.property.suspended">suspended</a></code> | <code><a href="#data-landing-zone.OrgOuSuspended">OrgOuSuspended</a></code> | *No description.* |
| <code><a href="#data-landing-zone.OrgOus.property.workloads">workloads</a></code> | <code><a href="#data-landing-zone.OrgOuWorkloads">OrgOuWorkloads</a></code> | *No description.* |

---

##### `security`<sup>Required</sup> <a name="security" id="data-landing-zone.OrgOus.property.security"></a>

```typescript
public readonly security: OrgOuSecurity;
```

- *Type:* <a href="#data-landing-zone.OrgOuSecurity">OrgOuSecurity</a>

---

##### `suspended`<sup>Required</sup> <a name="suspended" id="data-landing-zone.OrgOus.property.suspended"></a>

```typescript
public readonly suspended: OrgOuSuspended;
```

- *Type:* <a href="#data-landing-zone.OrgOuSuspended">OrgOuSuspended</a>

---

##### `workloads`<sup>Required</sup> <a name="workloads" id="data-landing-zone.OrgOus.property.workloads"></a>

```typescript
public readonly workloads: OrgOuWorkloads;
```

- *Type:* <a href="#data-landing-zone.OrgOuWorkloads">OrgOuWorkloads</a>

---

### OrgOuSecurity <a name="OrgOuSecurity" id="data-landing-zone.OrgOuSecurity"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.OrgOuSecurity.Initializer"></a>

```typescript
import { OrgOuSecurity } from 'data-landing-zone'

const orgOuSecurity: OrgOuSecurity = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.OrgOuSecurity.property.accounts">accounts</a></code> | <code><a href="#data-landing-zone.OrgOuSecurityAccounts">OrgOuSecurityAccounts</a></code> | *No description.* |
| <code><a href="#data-landing-zone.OrgOuSecurity.property.ouId">ouId</a></code> | <code>string</code> | *No description.* |

---

##### `accounts`<sup>Required</sup> <a name="accounts" id="data-landing-zone.OrgOuSecurity.property.accounts"></a>

```typescript
public readonly accounts: OrgOuSecurityAccounts;
```

- *Type:* <a href="#data-landing-zone.OrgOuSecurityAccounts">OrgOuSecurityAccounts</a>

---

##### `ouId`<sup>Required</sup> <a name="ouId" id="data-landing-zone.OrgOuSecurity.property.ouId"></a>

```typescript
public readonly ouId: string;
```

- *Type:* string

---

### OrgOuSecurityAccounts <a name="OrgOuSecurityAccounts" id="data-landing-zone.OrgOuSecurityAccounts"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.OrgOuSecurityAccounts.Initializer"></a>

```typescript
import { OrgOuSecurityAccounts } from 'data-landing-zone'

const orgOuSecurityAccounts: OrgOuSecurityAccounts = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.OrgOuSecurityAccounts.property.audit">audit</a></code> | <code><a href="#data-landing-zone.DLzManagementAccount">DLzManagementAccount</a></code> | *No description.* |
| <code><a href="#data-landing-zone.OrgOuSecurityAccounts.property.log">log</a></code> | <code><a href="#data-landing-zone.DLzManagementAccount">DLzManagementAccount</a></code> | *No description.* |

---

##### `audit`<sup>Required</sup> <a name="audit" id="data-landing-zone.OrgOuSecurityAccounts.property.audit"></a>

```typescript
public readonly audit: DLzManagementAccount;
```

- *Type:* <a href="#data-landing-zone.DLzManagementAccount">DLzManagementAccount</a>

---

##### `log`<sup>Required</sup> <a name="log" id="data-landing-zone.OrgOuSecurityAccounts.property.log"></a>

```typescript
public readonly log: DLzManagementAccount;
```

- *Type:* <a href="#data-landing-zone.DLzManagementAccount">DLzManagementAccount</a>

---

### OrgOuSuspended <a name="OrgOuSuspended" id="data-landing-zone.OrgOuSuspended"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.OrgOuSuspended.Initializer"></a>

```typescript
import { OrgOuSuspended } from 'data-landing-zone'

const orgOuSuspended: OrgOuSuspended = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.OrgOuSuspended.property.ouId">ouId</a></code> | <code>string</code> | *No description.* |

---

##### `ouId`<sup>Required</sup> <a name="ouId" id="data-landing-zone.OrgOuSuspended.property.ouId"></a>

```typescript
public readonly ouId: string;
```

- *Type:* string

---

### OrgOuWorkloads <a name="OrgOuWorkloads" id="data-landing-zone.OrgOuWorkloads"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.OrgOuWorkloads.Initializer"></a>

```typescript
import { OrgOuWorkloads } from 'data-landing-zone'

const orgOuWorkloads: OrgOuWorkloads = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.OrgOuWorkloads.property.accounts">accounts</a></code> | <code><a href="#data-landing-zone.DLzAccount">DLzAccount</a>[]</code> | *No description.* |
| <code><a href="#data-landing-zone.OrgOuWorkloads.property.ouId">ouId</a></code> | <code>string</code> | *No description.* |

---

##### `accounts`<sup>Required</sup> <a name="accounts" id="data-landing-zone.OrgOuWorkloads.property.accounts"></a>

```typescript
public readonly accounts: DLzAccount[];
```

- *Type:* <a href="#data-landing-zone.DLzAccount">DLzAccount</a>[]

---

##### `ouId`<sup>Required</sup> <a name="ouId" id="data-landing-zone.OrgOuWorkloads.property.ouId"></a>

```typescript
public readonly ouId: string;
```

- *Type:* string

---

### OrgRootAccounts <a name="OrgRootAccounts" id="data-landing-zone.OrgRootAccounts"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.OrgRootAccounts.Initializer"></a>

```typescript
import { OrgRootAccounts } from 'data-landing-zone'

const orgRootAccounts: OrgRootAccounts = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.OrgRootAccounts.property.management">management</a></code> | <code><a href="#data-landing-zone.DLzManagementAccount">DLzManagementAccount</a></code> | *No description.* |

---

##### `management`<sup>Required</sup> <a name="management" id="data-landing-zone.OrgRootAccounts.property.management"></a>

```typescript
public readonly management: DLzManagementAccount;
```

- *Type:* <a href="#data-landing-zone.DLzManagementAccount">DLzManagementAccount</a>

---

### PartialOu <a name="PartialOu" id="data-landing-zone.PartialOu"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.PartialOu.Initializer"></a>

```typescript
import { PartialOu } from 'data-landing-zone'

const partialOu: PartialOu = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.PartialOu.property.ouId">ouId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.PartialOu.property.accounts">accounts</a></code> | <code><a href="#data-landing-zone.DLzAccount">DLzAccount</a>[]</code> | *No description.* |

---

##### `ouId`<sup>Required</sup> <a name="ouId" id="data-landing-zone.PartialOu.property.ouId"></a>

```typescript
public readonly ouId: string;
```

- *Type:* string

---

##### `accounts`<sup>Optional</sup> <a name="accounts" id="data-landing-zone.PartialOu.property.accounts"></a>

```typescript
public readonly accounts: DLzAccount[];
```

- *Type:* <a href="#data-landing-zone.DLzAccount">DLzAccount</a>[]

---

### ProductionAccountStacks <a name="ProductionAccountStacks" id="data-landing-zone.ProductionAccountStacks"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.ProductionAccountStacks.Initializer"></a>

```typescript
import { ProductionAccountStacks } from 'data-landing-zone'

const productionAccountStacks: ProductionAccountStacks = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.ProductionAccountStacks.property.accountId">accountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.ProductionAccountStacks.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.ProductionAccountStacks.property.stacks">stacks</a></code> | <code><a href="#data-landing-zone.ProductionStacks">ProductionStacks</a></code> | *No description.* |

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="data-landing-zone.ProductionAccountStacks.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="data-landing-zone.ProductionAccountStacks.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `stacks`<sup>Required</sup> <a name="stacks" id="data-landing-zone.ProductionAccountStacks.property.stacks"></a>

```typescript
public readonly stacks: ProductionStacks;
```

- *Type:* <a href="#data-landing-zone.ProductionStacks">ProductionStacks</a>

---

### ProductionStacks <a name="ProductionStacks" id="data-landing-zone.ProductionStacks"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.ProductionStacks.Initializer"></a>

```typescript
import { ProductionStacks } from 'data-landing-zone'

const productionStacks: ProductionStacks = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.ProductionStacks.property.global">global</a></code> | <code><a href="#data-landing-zone.ProductionGlobalStack">ProductionGlobalStack</a></code> | *No description.* |
| <code><a href="#data-landing-zone.ProductionStacks.property.regional">regional</a></code> | <code><a href="#data-landing-zone.ProductionRegionalStack">ProductionRegionalStack</a>[]</code> | *No description.* |

---

##### `global`<sup>Required</sup> <a name="global" id="data-landing-zone.ProductionStacks.property.global"></a>

```typescript
public readonly global: ProductionGlobalStack;
```

- *Type:* <a href="#data-landing-zone.ProductionGlobalStack">ProductionGlobalStack</a>

---

##### `regional`<sup>Required</sup> <a name="regional" id="data-landing-zone.ProductionStacks.property.regional"></a>

```typescript
public readonly regional: ProductionRegionalStack[];
```

- *Type:* <a href="#data-landing-zone.ProductionRegionalStack">ProductionRegionalStack</a>[]

---

### ReportItem <a name="ReportItem" id="data-landing-zone.ReportItem"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.ReportItem.Initializer"></a>

```typescript
import { ReportItem } from 'data-landing-zone'

const reportItem: ReportItem = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.ReportItem.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.ReportItem.property.externalLink">externalLink</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.ReportItem.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.ReportItem.property.type">type</a></code> | <code><a href="#data-landing-zone.ReportType">ReportType</a></code> | *No description.* |
| <code><a href="#data-landing-zone.ReportItem.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.ReportItem.property.appliedFrom">appliedFrom</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.ReportItem.property.region">region</a></code> | <code>string</code> | *No description.* |

---

##### `description`<sup>Required</sup> <a name="description" id="data-landing-zone.ReportItem.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `externalLink`<sup>Required</sup> <a name="externalLink" id="data-landing-zone.ReportItem.property.externalLink"></a>

```typescript
public readonly externalLink: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="data-landing-zone.ReportItem.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `type`<sup>Required</sup> <a name="type" id="data-landing-zone.ReportItem.property.type"></a>

```typescript
public readonly type: ReportType;
```

- *Type:* <a href="#data-landing-zone.ReportType">ReportType</a>

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="data-landing-zone.ReportItem.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `appliedFrom`<sup>Required</sup> <a name="appliedFrom" id="data-landing-zone.ReportItem.property.appliedFrom"></a>

```typescript
public readonly appliedFrom: string;
```

- *Type:* string

---

##### `region`<sup>Required</sup> <a name="region" id="data-landing-zone.ReportItem.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

---

### ReportResource <a name="ReportResource" id="data-landing-zone.ReportResource"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.ReportResource.Initializer"></a>

```typescript
import { ReportResource } from 'data-landing-zone'

const reportResource: ReportResource = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.ReportResource.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.ReportResource.property.externalLink">externalLink</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.ReportResource.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.ReportResource.property.type">type</a></code> | <code><a href="#data-landing-zone.ReportType">ReportType</a></code> | *No description.* |

---

##### `description`<sup>Required</sup> <a name="description" id="data-landing-zone.ReportResource.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `externalLink`<sup>Required</sup> <a name="externalLink" id="data-landing-zone.ReportResource.property.externalLink"></a>

```typescript
public readonly externalLink: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="data-landing-zone.ReportResource.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `type`<sup>Required</sup> <a name="type" id="data-landing-zone.ReportResource.property.type"></a>

```typescript
public readonly type: ReportType;
```

- *Type:* <a href="#data-landing-zone.ReportType">ReportType</a>

---

### RootOptions <a name="RootOptions" id="data-landing-zone.RootOptions"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.RootOptions.Initializer"></a>

```typescript
import { RootOptions } from 'data-landing-zone'

const rootOptions: RootOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.RootOptions.property.accounts">accounts</a></code> | <code><a href="#data-landing-zone.OrgRootAccounts">OrgRootAccounts</a></code> | *No description.* |
| <code><a href="#data-landing-zone.RootOptions.property.controls">controls</a></code> | <code><a href="#data-landing-zone.DlzControlTowerStandardControls">DlzControlTowerStandardControls</a>[]</code> | Control Tower Controls applied to all the OUs in the organization. |

---

##### `accounts`<sup>Required</sup> <a name="accounts" id="data-landing-zone.RootOptions.property.accounts"></a>

```typescript
public readonly accounts: OrgRootAccounts;
```

- *Type:* <a href="#data-landing-zone.OrgRootAccounts">OrgRootAccounts</a>

---

##### `controls`<sup>Optional</sup> <a name="controls" id="data-landing-zone.RootOptions.property.controls"></a>

```typescript
public readonly controls: DlzControlTowerStandardControls[];
```

- *Type:* <a href="#data-landing-zone.DlzControlTowerStandardControls">DlzControlTowerStandardControls</a>[]

Control Tower Controls applied to all the OUs in the organization.

---

### SecurityHubNotification <a name="SecurityHubNotification" id="data-landing-zone.SecurityHubNotification"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.SecurityHubNotification.Initializer"></a>

```typescript
import { SecurityHubNotification } from 'data-landing-zone'

const securityHubNotification: SecurityHubNotification = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.SecurityHubNotification.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.SecurityHubNotification.property.notification">notification</a></code> | <code><a href="#data-landing-zone.SecurityHubNotificationProps">SecurityHubNotificationProps</a></code> | *No description.* |
| <code><a href="#data-landing-zone.SecurityHubNotification.property.severity">severity</a></code> | <code><a href="#data-landing-zone.SecurityHubNotificationSeverity">SecurityHubNotificationSeverity</a>[]</code> | *No description.* |
| <code><a href="#data-landing-zone.SecurityHubNotification.property.workflowStatus">workflowStatus</a></code> | <code><a href="#data-landing-zone.SecurityHubNotificationSWorkflowStatus">SecurityHubNotificationSWorkflowStatus</a>[]</code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="data-landing-zone.SecurityHubNotification.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `notification`<sup>Required</sup> <a name="notification" id="data-landing-zone.SecurityHubNotification.property.notification"></a>

```typescript
public readonly notification: SecurityHubNotificationProps;
```

- *Type:* <a href="#data-landing-zone.SecurityHubNotificationProps">SecurityHubNotificationProps</a>

---

##### `severity`<sup>Optional</sup> <a name="severity" id="data-landing-zone.SecurityHubNotification.property.severity"></a>

```typescript
public readonly severity: SecurityHubNotificationSeverity[];
```

- *Type:* <a href="#data-landing-zone.SecurityHubNotificationSeverity">SecurityHubNotificationSeverity</a>[]

---

##### `workflowStatus`<sup>Optional</sup> <a name="workflowStatus" id="data-landing-zone.SecurityHubNotification.property.workflowStatus"></a>

```typescript
public readonly workflowStatus: SecurityHubNotificationSWorkflowStatus[];
```

- *Type:* <a href="#data-landing-zone.SecurityHubNotificationSWorkflowStatus">SecurityHubNotificationSWorkflowStatus</a>[]

---

### SecurityHubNotificationProps <a name="SecurityHubNotificationProps" id="data-landing-zone.SecurityHubNotificationProps"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.SecurityHubNotificationProps.Initializer"></a>

```typescript
import { SecurityHubNotificationProps } from 'data-landing-zone'

const securityHubNotificationProps: SecurityHubNotificationProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.SecurityHubNotificationProps.property.emails">emails</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#data-landing-zone.SecurityHubNotificationProps.property.slack">slack</a></code> | <code><a href="#data-landing-zone.SlackChannel">SlackChannel</a></code> | *No description.* |

---

##### `emails`<sup>Optional</sup> <a name="emails" id="data-landing-zone.SecurityHubNotificationProps.property.emails"></a>

```typescript
public readonly emails: string[];
```

- *Type:* string[]

---

##### `slack`<sup>Optional</sup> <a name="slack" id="data-landing-zone.SecurityHubNotificationProps.property.slack"></a>

```typescript
public readonly slack: SlackChannel;
```

- *Type:* <a href="#data-landing-zone.SlackChannel">SlackChannel</a>

---

### SlackChannel <a name="SlackChannel" id="data-landing-zone.SlackChannel"></a>

#### Initializer <a name="Initializer" id="data-landing-zone.SlackChannel.Initializer"></a>

```typescript
import { SlackChannel } from 'data-landing-zone'

const slackChannel: SlackChannel = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.SlackChannel.property.slackChannelConfigurationName">slackChannelConfigurationName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.SlackChannel.property.slackChannelId">slackChannelId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.SlackChannel.property.slackWorkspaceId">slackWorkspaceId</a></code> | <code>string</code> | *No description.* |

---

##### `slackChannelConfigurationName`<sup>Required</sup> <a name="slackChannelConfigurationName" id="data-landing-zone.SlackChannel.property.slackChannelConfigurationName"></a>

```typescript
public readonly slackChannelConfigurationName: string;
```

- *Type:* string

---

##### `slackChannelId`<sup>Required</sup> <a name="slackChannelId" id="data-landing-zone.SlackChannel.property.slackChannelId"></a>

```typescript
public readonly slackChannelId: string;
```

- *Type:* string

---

##### `slackWorkspaceId`<sup>Required</sup> <a name="slackWorkspaceId" id="data-landing-zone.SlackChannel.property.slackWorkspaceId"></a>

```typescript
public readonly slackWorkspaceId: string;
```

- *Type:* string

---

## Classes <a name="Classes" id="Classes"></a>

### AccountChatbots <a name="AccountChatbots" id="data-landing-zone.AccountChatbots"></a>

#### Initializers <a name="Initializers" id="data-landing-zone.AccountChatbots.Initializer"></a>

```typescript
import { AccountChatbots } from 'data-landing-zone'

new AccountChatbots()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.AccountChatbots.addSlackChannel">addSlackChannel</a></code> | *No description.* |
| <code><a href="#data-landing-zone.AccountChatbots.existsSlackChannel">existsSlackChannel</a></code> | *No description.* |
| <code><a href="#data-landing-zone.AccountChatbots.findSlackChannel">findSlackChannel</a></code> | *No description.* |

---

##### `addSlackChannel` <a name="addSlackChannel" id="data-landing-zone.AccountChatbots.addSlackChannel"></a>

```typescript
import { AccountChatbots } from 'data-landing-zone'

AccountChatbots.addSlackChannel(scope: Construct, id: string, chatbotProps: SlackChannelConfigurationProps)
```

###### `scope`<sup>Required</sup> <a name="scope" id="data-landing-zone.AccountChatbots.addSlackChannel.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="data-landing-zone.AccountChatbots.addSlackChannel.parameter.id"></a>

- *Type:* string

---

###### `chatbotProps`<sup>Required</sup> <a name="chatbotProps" id="data-landing-zone.AccountChatbots.addSlackChannel.parameter.chatbotProps"></a>

- *Type:* aws-cdk-lib.aws_chatbot.SlackChannelConfigurationProps

---

##### `existsSlackChannel` <a name="existsSlackChannel" id="data-landing-zone.AccountChatbots.existsSlackChannel"></a>

```typescript
import { AccountChatbots } from 'data-landing-zone'

AccountChatbots.existsSlackChannel(scope: Construct, chatbotProps: SlackChannel)
```

###### `scope`<sup>Required</sup> <a name="scope" id="data-landing-zone.AccountChatbots.existsSlackChannel.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `chatbotProps`<sup>Required</sup> <a name="chatbotProps" id="data-landing-zone.AccountChatbots.existsSlackChannel.parameter.chatbotProps"></a>

- *Type:* <a href="#data-landing-zone.SlackChannel">SlackChannel</a>

---

##### `findSlackChannel` <a name="findSlackChannel" id="data-landing-zone.AccountChatbots.findSlackChannel"></a>

```typescript
import { AccountChatbots } from 'data-landing-zone'

AccountChatbots.findSlackChannel(scope: Construct, chatbotProps: SlackChannel)
```

###### `scope`<sup>Required</sup> <a name="scope" id="data-landing-zone.AccountChatbots.findSlackChannel.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `chatbotProps`<sup>Required</sup> <a name="chatbotProps" id="data-landing-zone.AccountChatbots.findSlackChannel.parameter.chatbotProps"></a>

- *Type:* <a href="#data-landing-zone.SlackChannel">SlackChannel</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.AccountChatbots.property.slackChatBots">slackChatBots</a></code> | <code>{[ key: string ]: aws-cdk-lib.aws_chatbot.SlackChannelConfiguration}</code> | *No description.* |

---

##### `slackChatBots`<sup>Required</sup> <a name="slackChatBots" id="data-landing-zone.AccountChatbots.property.slackChatBots"></a>

```typescript
public readonly slackChatBots: {[ key: string ]: SlackChannelConfiguration};
```

- *Type:* {[ key: string ]: aws-cdk-lib.aws_chatbot.SlackChannelConfiguration}

---


### Budget <a name="Budget" id="data-landing-zone.Budget"></a>

#### Initializers <a name="Initializers" id="data-landing-zone.Budget.Initializer"></a>

```typescript
import { Budget } from 'data-landing-zone'

new Budget(scope: Construct, id: string, props: BudgetProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.Budget.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#data-landing-zone.Budget.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.Budget.Initializer.parameter.props">props</a></code> | <code><a href="#data-landing-zone.BudgetProps">BudgetProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="data-landing-zone.Budget.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="data-landing-zone.Budget.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="data-landing-zone.Budget.Initializer.parameter.props"></a>

- *Type:* <a href="#data-landing-zone.BudgetProps">BudgetProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.Budget.property.cfnBudget">cfnBudget</a></code> | <code>aws-cdk-lib.aws_budgets.CfnBudget</code> | *No description.* |
| <code><a href="#data-landing-zone.Budget.property.notificationTopic">notificationTopic</a></code> | <code>aws-cdk-lib.aws_sns.Topic</code> | *No description.* |

---

##### `cfnBudget`<sup>Required</sup> <a name="cfnBudget" id="data-landing-zone.Budget.property.cfnBudget"></a>

```typescript
public readonly cfnBudget: CfnBudget;
```

- *Type:* aws-cdk-lib.aws_budgets.CfnBudget

---

##### `notificationTopic`<sup>Required</sup> <a name="notificationTopic" id="data-landing-zone.Budget.property.notificationTopic"></a>

```typescript
public readonly notificationTopic: Topic;
```

- *Type:* aws-cdk-lib.aws_sns.Topic

---


### DataLandingZone <a name="DataLandingZone" id="data-landing-zone.DataLandingZone"></a>

#### Initializers <a name="Initializers" id="data-landing-zone.DataLandingZone.Initializer"></a>

```typescript
import { DataLandingZone } from 'data-landing-zone'

new DataLandingZone(app: App, props: DataLandingZoneProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DataLandingZone.Initializer.parameter.app">app</a></code> | <code>aws-cdk-lib.App</code> | *No description.* |
| <code><a href="#data-landing-zone.DataLandingZone.Initializer.parameter.props">props</a></code> | <code><a href="#data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a></code> | *No description.* |

---

##### `app`<sup>Required</sup> <a name="app" id="data-landing-zone.DataLandingZone.Initializer.parameter.app"></a>

- *Type:* aws-cdk-lib.App

---

##### `props`<sup>Required</sup> <a name="props" id="data-landing-zone.DataLandingZone.Initializer.parameter.props"></a>

- *Type:* <a href="#data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.DataLandingZone.stageAudit">stageAudit</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DataLandingZone.stageLog">stageLog</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DataLandingZone.stageManagement">stageManagement</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DataLandingZone.stageWorkloadDevelopType">stageWorkloadDevelopType</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DataLandingZone.stageWorkloadProductionType">stageWorkloadProductionType</a></code> | *No description.* |

---

##### `stageAudit` <a name="stageAudit" id="data-landing-zone.DataLandingZone.stageAudit"></a>

```typescript
public stageAudit(): AuditGlobalStack | AuditRegionalStack[]
```

##### `stageLog` <a name="stageLog" id="data-landing-zone.DataLandingZone.stageLog"></a>

```typescript
public stageLog(): LogGlobalStack[]
```

##### `stageManagement` <a name="stageManagement" id="data-landing-zone.DataLandingZone.stageManagement"></a>

```typescript
public stageManagement(): ManagementStack[]
```

##### `stageWorkloadDevelopType` <a name="stageWorkloadDevelopType" id="data-landing-zone.DataLandingZone.stageWorkloadDevelopType"></a>

```typescript
public stageWorkloadDevelopType(): DlzStack[]
```

##### `stageWorkloadProductionType` <a name="stageWorkloadProductionType" id="data-landing-zone.DataLandingZone.stageWorkloadProductionType"></a>

```typescript
public stageWorkloadProductionType(): DlzStack[]
```


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DataLandingZone.property.auditStacks">auditStacks</a></code> | <code><a href="#data-landing-zone.AuditStacks">AuditStacks</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DataLandingZone.property.developAccountStacks">developAccountStacks</a></code> | <code><a href="#data-landing-zone.DevelopAccountStacks">DevelopAccountStacks</a>[]</code> | *No description.* |
| <code><a href="#data-landing-zone.DataLandingZone.property.logStacks">logStacks</a></code> | <code><a href="#data-landing-zone.LogStacks">LogStacks</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DataLandingZone.property.managementStack">managementStack</a></code> | <code><a href="#data-landing-zone.ManagementStack">ManagementStack</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DataLandingZone.property.productionAccountStacks">productionAccountStacks</a></code> | <code><a href="#data-landing-zone.ProductionAccountStacks">ProductionAccountStacks</a>[]</code> | *No description.* |

---

##### `auditStacks`<sup>Required</sup> <a name="auditStacks" id="data-landing-zone.DataLandingZone.property.auditStacks"></a>

```typescript
public readonly auditStacks: AuditStacks;
```

- *Type:* <a href="#data-landing-zone.AuditStacks">AuditStacks</a>

---

##### `developAccountStacks`<sup>Required</sup> <a name="developAccountStacks" id="data-landing-zone.DataLandingZone.property.developAccountStacks"></a>

```typescript
public readonly developAccountStacks: DevelopAccountStacks[];
```

- *Type:* <a href="#data-landing-zone.DevelopAccountStacks">DevelopAccountStacks</a>[]

---

##### `logStacks`<sup>Required</sup> <a name="logStacks" id="data-landing-zone.DataLandingZone.property.logStacks"></a>

```typescript
public readonly logStacks: LogStacks;
```

- *Type:* <a href="#data-landing-zone.LogStacks">LogStacks</a>

---

##### `managementStack`<sup>Required</sup> <a name="managementStack" id="data-landing-zone.DataLandingZone.property.managementStack"></a>

```typescript
public readonly managementStack: ManagementStack;
```

- *Type:* <a href="#data-landing-zone.ManagementStack">ManagementStack</a>

---

##### `productionAccountStacks`<sup>Required</sup> <a name="productionAccountStacks" id="data-landing-zone.DataLandingZone.property.productionAccountStacks"></a>

```typescript
public readonly productionAccountStacks: ProductionAccountStacks[];
```

- *Type:* <a href="#data-landing-zone.ProductionAccountStacks">ProductionAccountStacks</a>[]

---


### Defaults <a name="Defaults" id="data-landing-zone.Defaults"></a>

#### Initializers <a name="Initializers" id="data-landing-zone.Defaults.Initializer"></a>

```typescript
import { Defaults } from 'data-landing-zone'

new Defaults()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.Defaults.budgets">budgets</a></code> | Budgets for the organization. |
| <code><a href="#data-landing-zone.Defaults.denyServiceList">denyServiceList</a></code> | * List of services that are denied in the organization. |
| <code><a href="#data-landing-zone.Defaults.mandatoryTags">mandatoryTags</a></code> | * Mandatory tags for the organization. |
| <code><a href="#data-landing-zone.Defaults.rootControls">rootControls</a></code> | Control Tower Controls applied to all the OUs in the organization. |

---

##### `budgets` <a name="budgets" id="data-landing-zone.Defaults.budgets"></a>

```typescript
import { Defaults } from 'data-landing-zone'

Defaults.budgets(orgTotal: number, infraDlz: number, subscribers: BudgetSubscribers)
```

Budgets for the organization.

###### `orgTotal`<sup>Required</sup> <a name="orgTotal" id="data-landing-zone.Defaults.budgets.parameter.orgTotal"></a>

- *Type:* number

Total budget for the organization in USD.

---

###### `infraDlz`<sup>Required</sup> <a name="infraDlz" id="data-landing-zone.Defaults.budgets.parameter.infraDlz"></a>

- *Type:* number

Budget for this DLZ project identified by tags Owner=infra, Project=dlz in USD.

---

###### `subscribers`<sup>Required</sup> <a name="subscribers" id="data-landing-zone.Defaults.budgets.parameter.subscribers"></a>

- *Type:* <a href="#data-landing-zone.BudgetSubscribers">BudgetSubscribers</a>

Subscribers for the budget.

---

##### `denyServiceList` <a name="denyServiceList" id="data-landing-zone.Defaults.denyServiceList"></a>

```typescript
import { Defaults } from 'data-landing-zone'

Defaults.denyServiceList()
```

* List of services that are denied in the organization.

##### `mandatoryTags` <a name="mandatoryTags" id="data-landing-zone.Defaults.mandatoryTags"></a>

```typescript
import { Defaults } from 'data-landing-zone'

Defaults.mandatoryTags(props: DataLandingZoneProps)
```

* Mandatory tags for the organization.

###### `props`<sup>Required</sup> <a name="props" id="data-landing-zone.Defaults.mandatoryTags.parameter.props"></a>

- *Type:* <a href="#data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a>

---

##### `rootControls` <a name="rootControls" id="data-landing-zone.Defaults.rootControls"></a>

```typescript
import { Defaults } from 'data-landing-zone'

Defaults.rootControls()
```

Control Tower Controls applied to all the OUs in the organization.



### DlzControlTowerEnabledControl <a name="DlzControlTowerEnabledControl" id="data-landing-zone.DlzControlTowerEnabledControl"></a>

- *Implements:* <a href="#data-landing-zone.IReportResource">IReportResource</a>

#### Initializers <a name="Initializers" id="data-landing-zone.DlzControlTowerEnabledControl.Initializer"></a>

```typescript
import { DlzControlTowerEnabledControl } from 'data-landing-zone'

new DlzControlTowerEnabledControl(scope: Construct, id: string, props: DlzControlTowerEnabledControlProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DlzControlTowerEnabledControl.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerEnabledControl.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerEnabledControl.Initializer.parameter.props">props</a></code> | <code><a href="#data-landing-zone.DlzControlTowerEnabledControlProps">DlzControlTowerEnabledControlProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="data-landing-zone.DlzControlTowerEnabledControl.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="data-landing-zone.DlzControlTowerEnabledControl.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="data-landing-zone.DlzControlTowerEnabledControl.Initializer.parameter.props"></a>

- *Type:* <a href="#data-landing-zone.DlzControlTowerEnabledControlProps">DlzControlTowerEnabledControlProps</a>

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.DlzControlTowerEnabledControl.canBeAppliedToSecurityOU">canBeAppliedToSecurityOU</a></code> | Check if the control can be applied to the Security OU. |

---

##### `canBeAppliedToSecurityOU` <a name="canBeAppliedToSecurityOU" id="data-landing-zone.DlzControlTowerEnabledControl.canBeAppliedToSecurityOU"></a>

```typescript
import { DlzControlTowerEnabledControl } from 'data-landing-zone'

DlzControlTowerEnabledControl.canBeAppliedToSecurityOU(control: IDlzControlTowerControl)
```

Check if the control can be applied to the Security OU.

Only LEGACY controls can be applied to the Security OU.

###### `control`<sup>Required</sup> <a name="control" id="data-landing-zone.DlzControlTowerEnabledControl.canBeAppliedToSecurityOU.parameter.control"></a>

- *Type:* <a href="#data-landing-zone.IDlzControlTowerControl">IDlzControlTowerControl</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DlzControlTowerEnabledControl.property.control">control</a></code> | <code>aws-cdk-lib.aws_controltower.CfnEnabledControl</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerEnabledControl.property.reportResource">reportResource</a></code> | <code><a href="#data-landing-zone.ReportResource">ReportResource</a></code> | *No description.* |

---

##### `control`<sup>Required</sup> <a name="control" id="data-landing-zone.DlzControlTowerEnabledControl.property.control"></a>

```typescript
public readonly control: CfnEnabledControl;
```

- *Type:* aws-cdk-lib.aws_controltower.CfnEnabledControl

---

##### `reportResource`<sup>Required</sup> <a name="reportResource" id="data-landing-zone.DlzControlTowerEnabledControl.property.reportResource"></a>

```typescript
public readonly reportResource: ReportResource;
```

- *Type:* <a href="#data-landing-zone.ReportResource">ReportResource</a>

---


### DlzServiceControlPolicy <a name="DlzServiceControlPolicy" id="data-landing-zone.DlzServiceControlPolicy"></a>

- *Implements:* <a href="#data-landing-zone.IReportResource">IReportResource</a>

#### Initializers <a name="Initializers" id="data-landing-zone.DlzServiceControlPolicy.Initializer"></a>

```typescript
import { DlzServiceControlPolicy } from 'data-landing-zone'

new DlzServiceControlPolicy(scope: Construct, id: string, props: DlzServiceControlPolicyProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DlzServiceControlPolicy.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzServiceControlPolicy.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzServiceControlPolicy.Initializer.parameter.props">props</a></code> | <code><a href="#data-landing-zone.DlzServiceControlPolicyProps">DlzServiceControlPolicyProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="data-landing-zone.DlzServiceControlPolicy.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="data-landing-zone.DlzServiceControlPolicy.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="data-landing-zone.DlzServiceControlPolicy.Initializer.parameter.props"></a>

- *Type:* <a href="#data-landing-zone.DlzServiceControlPolicyProps">DlzServiceControlPolicyProps</a>

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.DlzServiceControlPolicy.denyCfnStacksWithoutStandardTags">denyCfnStacksWithoutStandardTags</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DlzServiceControlPolicy.denyServiceActionStatements">denyServiceActionStatements</a></code> | *No description.* |

---

##### `denyCfnStacksWithoutStandardTags` <a name="denyCfnStacksWithoutStandardTags" id="data-landing-zone.DlzServiceControlPolicy.denyCfnStacksWithoutStandardTags"></a>

```typescript
import { DlzServiceControlPolicy } from 'data-landing-zone'

DlzServiceControlPolicy.denyCfnStacksWithoutStandardTags(tags: DlzTag[])
```

###### `tags`<sup>Required</sup> <a name="tags" id="data-landing-zone.DlzServiceControlPolicy.denyCfnStacksWithoutStandardTags.parameter.tags"></a>

- *Type:* <a href="#data-landing-zone.DlzTag">DlzTag</a>[]

---

##### `denyServiceActionStatements` <a name="denyServiceActionStatements" id="data-landing-zone.DlzServiceControlPolicy.denyServiceActionStatements"></a>

```typescript
import { DlzServiceControlPolicy } from 'data-landing-zone'

DlzServiceControlPolicy.denyServiceActionStatements(serviceActions: string[])
```

###### `serviceActions`<sup>Required</sup> <a name="serviceActions" id="data-landing-zone.DlzServiceControlPolicy.denyServiceActionStatements.parameter.serviceActions"></a>

- *Type:* string[]

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DlzServiceControlPolicy.property.policy">policy</a></code> | <code>aws-cdk-lib.aws_organizations.CfnPolicy</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzServiceControlPolicy.property.reportResource">reportResource</a></code> | <code><a href="#data-landing-zone.ReportResource">ReportResource</a></code> | *No description.* |

---

##### `policy`<sup>Required</sup> <a name="policy" id="data-landing-zone.DlzServiceControlPolicy.property.policy"></a>

```typescript
public readonly policy: CfnPolicy;
```

- *Type:* aws-cdk-lib.aws_organizations.CfnPolicy

---

##### `reportResource`<sup>Required</sup> <a name="reportResource" id="data-landing-zone.DlzServiceControlPolicy.property.reportResource"></a>

```typescript
public readonly reportResource: ReportResource;
```

- *Type:* <a href="#data-landing-zone.ReportResource">ReportResource</a>

---


### DlzTagPolicy <a name="DlzTagPolicy" id="data-landing-zone.DlzTagPolicy"></a>

- *Implements:* <a href="#data-landing-zone.IReportResource">IReportResource</a>

#### Initializers <a name="Initializers" id="data-landing-zone.DlzTagPolicy.Initializer"></a>

```typescript
import { DlzTagPolicy } from 'data-landing-zone'

new DlzTagPolicy(scope: Construct, id: string, props: DlzTagPolicyProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DlzTagPolicy.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzTagPolicy.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzTagPolicy.Initializer.parameter.props">props</a></code> | <code><a href="#data-landing-zone.DlzTagPolicyProps">DlzTagPolicyProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="data-landing-zone.DlzTagPolicy.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="data-landing-zone.DlzTagPolicy.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="data-landing-zone.DlzTagPolicy.Initializer.parameter.props"></a>

- *Type:* <a href="#data-landing-zone.DlzTagPolicyProps">DlzTagPolicyProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.DlzTagPolicy.property.policy">policy</a></code> | <code>aws-cdk-lib.aws_organizations.CfnPolicy</code> | *No description.* |
| <code><a href="#data-landing-zone.DlzTagPolicy.property.reportResource">reportResource</a></code> | <code><a href="#data-landing-zone.ReportResource">ReportResource</a></code> | *No description.* |

---

##### `policy`<sup>Required</sup> <a name="policy" id="data-landing-zone.DlzTagPolicy.property.policy"></a>

```typescript
public readonly policy: CfnPolicy;
```

- *Type:* aws-cdk-lib.aws_organizations.CfnPolicy

---

##### `reportResource`<sup>Required</sup> <a name="reportResource" id="data-landing-zone.DlzTagPolicy.property.reportResource"></a>

```typescript
public readonly reportResource: ReportResource;
```

- *Type:* <a href="#data-landing-zone.ReportResource">ReportResource</a>

---


### Report <a name="Report" id="data-landing-zone.Report"></a>

#### Initializers <a name="Initializers" id="data-landing-zone.Report.Initializer"></a>

```typescript
import { Report } from 'data-landing-zone'

new Report()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.Report.addReportForAccountRegion">addReportForAccountRegion</a></code> | *No description.* |
| <code><a href="#data-landing-zone.Report.addReportForAccountRegions">addReportForAccountRegions</a></code> | *No description.* |
| <code><a href="#data-landing-zone.Report.addReportForOuAccountRegions">addReportForOuAccountRegions</a></code> | *No description.* |
| <code><a href="#data-landing-zone.Report.addReportForSecurityOuAccountRegions">addReportForSecurityOuAccountRegions</a></code> | *No description.* |
| <code><a href="#data-landing-zone.Report.printConsoleReport">printConsoleReport</a></code> | *No description.* |
| <code><a href="#data-landing-zone.Report.saveConsoleReport">saveConsoleReport</a></code> | *No description.* |

---

##### `addReportForAccountRegion` <a name="addReportForAccountRegion" id="data-landing-zone.Report.addReportForAccountRegion"></a>

```typescript
import { Report } from 'data-landing-zone'

Report.addReportForAccountRegion(accountName: string, region: string, reportResource: ReportResource)
```

###### `accountName`<sup>Required</sup> <a name="accountName" id="data-landing-zone.Report.addReportForAccountRegion.parameter.accountName"></a>

- *Type:* string

---

###### `region`<sup>Required</sup> <a name="region" id="data-landing-zone.Report.addReportForAccountRegion.parameter.region"></a>

- *Type:* string

---

###### `reportResource`<sup>Required</sup> <a name="reportResource" id="data-landing-zone.Report.addReportForAccountRegion.parameter.reportResource"></a>

- *Type:* <a href="#data-landing-zone.ReportResource">ReportResource</a>

---

##### `addReportForAccountRegions` <a name="addReportForAccountRegions" id="data-landing-zone.Report.addReportForAccountRegions"></a>

```typescript
import { Report } from 'data-landing-zone'

Report.addReportForAccountRegions(accountName: string, regions: DlzRegions, reportResource: ReportResource)
```

###### `accountName`<sup>Required</sup> <a name="accountName" id="data-landing-zone.Report.addReportForAccountRegions.parameter.accountName"></a>

- *Type:* string

---

###### `regions`<sup>Required</sup> <a name="regions" id="data-landing-zone.Report.addReportForAccountRegions.parameter.regions"></a>

- *Type:* <a href="#data-landing-zone.DlzRegions">DlzRegions</a>

---

###### `reportResource`<sup>Required</sup> <a name="reportResource" id="data-landing-zone.Report.addReportForAccountRegions.parameter.reportResource"></a>

- *Type:* <a href="#data-landing-zone.ReportResource">ReportResource</a>

---

##### `addReportForOuAccountRegions` <a name="addReportForOuAccountRegions" id="data-landing-zone.Report.addReportForOuAccountRegions"></a>

```typescript
import { Report } from 'data-landing-zone'

Report.addReportForOuAccountRegions(partialOu: PartialOu, regions: DlzRegions, reportResource: ReportResource)
```

###### `partialOu`<sup>Required</sup> <a name="partialOu" id="data-landing-zone.Report.addReportForOuAccountRegions.parameter.partialOu"></a>

- *Type:* <a href="#data-landing-zone.PartialOu">PartialOu</a>

---

###### `regions`<sup>Required</sup> <a name="regions" id="data-landing-zone.Report.addReportForOuAccountRegions.parameter.regions"></a>

- *Type:* <a href="#data-landing-zone.DlzRegions">DlzRegions</a>

---

###### `reportResource`<sup>Required</sup> <a name="reportResource" id="data-landing-zone.Report.addReportForOuAccountRegions.parameter.reportResource"></a>

- *Type:* <a href="#data-landing-zone.ReportResource">ReportResource</a>

---

##### `addReportForSecurityOuAccountRegions` <a name="addReportForSecurityOuAccountRegions" id="data-landing-zone.Report.addReportForSecurityOuAccountRegions"></a>

```typescript
import { Report } from 'data-landing-zone'

Report.addReportForSecurityOuAccountRegions(securityOu: OrgOuSecurity, regions: DlzRegions, reportResource: ReportResource)
```

###### `securityOu`<sup>Required</sup> <a name="securityOu" id="data-landing-zone.Report.addReportForSecurityOuAccountRegions.parameter.securityOu"></a>

- *Type:* <a href="#data-landing-zone.OrgOuSecurity">OrgOuSecurity</a>

---

###### `regions`<sup>Required</sup> <a name="regions" id="data-landing-zone.Report.addReportForSecurityOuAccountRegions.parameter.regions"></a>

- *Type:* <a href="#data-landing-zone.DlzRegions">DlzRegions</a>

---

###### `reportResource`<sup>Required</sup> <a name="reportResource" id="data-landing-zone.Report.addReportForSecurityOuAccountRegions.parameter.reportResource"></a>

- *Type:* <a href="#data-landing-zone.ReportResource">ReportResource</a>

---

##### `printConsoleReport` <a name="printConsoleReport" id="data-landing-zone.Report.printConsoleReport"></a>

```typescript
import { Report } from 'data-landing-zone'

Report.printConsoleReport()
```

##### `saveConsoleReport` <a name="saveConsoleReport" id="data-landing-zone.Report.saveConsoleReport"></a>

```typescript
import { Report } from 'data-landing-zone'

Report.saveConsoleReport()
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.Report.property.reports">reports</a></code> | <code><a href="#data-landing-zone.ReportItem">ReportItem</a>[]</code> | *No description.* |

---

##### `reports`<sup>Required</sup> <a name="reports" id="data-landing-zone.Report.property.reports"></a>

```typescript
public readonly reports: ReportItem[];
```

- *Type:* <a href="#data-landing-zone.ReportItem">ReportItem</a>[]

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IDlzControlTowerControl <a name="IDlzControlTowerControl" id="data-landing-zone.IDlzControlTowerControl"></a>

- *Implemented By:* <a href="#data-landing-zone.IDlzControlTowerControl">IDlzControlTowerControl</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.IDlzControlTowerControl.property.controlFriendlyName">controlFriendlyName</a></code> | <code><a href="#data-landing-zone.DlzControlTowerStandardControls">DlzControlTowerStandardControls</a> \| <a href="#data-landing-zone.DlzControlTowerSpecializedControls">DlzControlTowerSpecializedControls</a></code> | The short name of the control, example: AWS-GR_ENCRYPTED_VOLUMES. |
| <code><a href="#data-landing-zone.IDlzControlTowerControl.property.controlIdName">controlIdName</a></code> | <code><a href="#data-landing-zone.DlzControlTowerControlIdNameProps">DlzControlTowerControlIdNameProps</a></code> | The control ID name used to construct the controlIdentifier, example: AWS-GR_ENCRYPTED_VOLUMES This can differ from the controlFriendlyName for newer controls. |
| <code><a href="#data-landing-zone.IDlzControlTowerControl.property.description">description</a></code> | <code>string</code> | Description of the control. |
| <code><a href="#data-landing-zone.IDlzControlTowerControl.property.externalLink">externalLink</a></code> | <code>string</code> | External link to the control documentation. |
| <code><a href="#data-landing-zone.IDlzControlTowerControl.property.format">format</a></code> | <code><a href="#data-landing-zone.DlzControlTowerControlFormat">DlzControlTowerControlFormat</a></code> | The format of the control, LEGACY or STANDARD LEGACY controls include the control name in the controlIdentifier STANDARD controls do not include the control name in the controlIdentifier and can not be applied to the Security OU. |
| <code><a href="#data-landing-zone.IDlzControlTowerControl.property.parameters">parameters</a></code> | <code>{[ key: string ]: any}</code> | Optional parameters for the control. |

---

##### `controlFriendlyName`<sup>Required</sup> <a name="controlFriendlyName" id="data-landing-zone.IDlzControlTowerControl.property.controlFriendlyName"></a>

```typescript
public readonly controlFriendlyName: DlzControlTowerStandardControls | DlzControlTowerSpecializedControls;
```

- *Type:* <a href="#data-landing-zone.DlzControlTowerStandardControls">DlzControlTowerStandardControls</a> | <a href="#data-landing-zone.DlzControlTowerSpecializedControls">DlzControlTowerSpecializedControls</a>

The short name of the control, example: AWS-GR_ENCRYPTED_VOLUMES.

---

##### `controlIdName`<sup>Required</sup> <a name="controlIdName" id="data-landing-zone.IDlzControlTowerControl.property.controlIdName"></a>

```typescript
public readonly controlIdName: DlzControlTowerControlIdNameProps;
```

- *Type:* <a href="#data-landing-zone.DlzControlTowerControlIdNameProps">DlzControlTowerControlIdNameProps</a>

The control ID name used to construct the controlIdentifier, example: AWS-GR_ENCRYPTED_VOLUMES This can differ from the controlFriendlyName for newer controls.

---

##### `description`<sup>Required</sup> <a name="description" id="data-landing-zone.IDlzControlTowerControl.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Description of the control.

---

##### `externalLink`<sup>Required</sup> <a name="externalLink" id="data-landing-zone.IDlzControlTowerControl.property.externalLink"></a>

```typescript
public readonly externalLink: string;
```

- *Type:* string

External link to the control documentation.

---

##### `format`<sup>Required</sup> <a name="format" id="data-landing-zone.IDlzControlTowerControl.property.format"></a>

```typescript
public readonly format: DlzControlTowerControlFormat;
```

- *Type:* <a href="#data-landing-zone.DlzControlTowerControlFormat">DlzControlTowerControlFormat</a>

The format of the control, LEGACY or STANDARD LEGACY controls include the control name in the controlIdentifier STANDARD controls do not include the control name in the controlIdentifier and can not be applied to the Security OU.

---

##### `parameters`<sup>Optional</sup> <a name="parameters" id="data-landing-zone.IDlzControlTowerControl.property.parameters"></a>

```typescript
public readonly parameters: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Optional parameters for the control.

---

### IReportResource <a name="IReportResource" id="data-landing-zone.IReportResource"></a>

- *Implemented By:* <a href="#data-landing-zone.DlzControlTowerEnabledControl">DlzControlTowerEnabledControl</a>, <a href="#data-landing-zone.DlzServiceControlPolicy">DlzServiceControlPolicy</a>, <a href="#data-landing-zone.DlzTagPolicy">DlzTagPolicy</a>, <a href="#data-landing-zone.IReportResource">IReportResource</a>

Behavioral, used with Inheritance.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#data-landing-zone.IReportResource.property.reportResource">reportResource</a></code> | <code><a href="#data-landing-zone.ReportResource">ReportResource</a></code> | *No description.* |

---

##### `reportResource`<sup>Required</sup> <a name="reportResource" id="data-landing-zone.IReportResource.property.reportResource"></a>

```typescript
public readonly reportResource: ReportResource;
```

- *Type:* <a href="#data-landing-zone.ReportResource">ReportResource</a>

---

## Enums <a name="Enums" id="Enums"></a>

### DlzAccountType <a name="DlzAccountType" id="data-landing-zone.DlzAccountType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.DlzAccountType.DEVELOP">DEVELOP</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DlzAccountType.PRODUCTION">PRODUCTION</a></code> | *No description.* |

---

##### `DEVELOP` <a name="DEVELOP" id="data-landing-zone.DlzAccountType.DEVELOP"></a>

---


##### `PRODUCTION` <a name="PRODUCTION" id="data-landing-zone.DlzAccountType.PRODUCTION"></a>

---


### DlzControlTowerControlFormat <a name="DlzControlTowerControlFormat" id="data-landing-zone.DlzControlTowerControlFormat"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.DlzControlTowerControlFormat.LEGACY">LEGACY</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerControlFormat.STANDARD">STANDARD</a></code> | *No description.* |

---

##### `LEGACY` <a name="LEGACY" id="data-landing-zone.DlzControlTowerControlFormat.LEGACY"></a>

---


##### `STANDARD` <a name="STANDARD" id="data-landing-zone.DlzControlTowerControlFormat.STANDARD"></a>

---


### DlzControlTowerSpecializedControls <a name="DlzControlTowerSpecializedControls" id="data-landing-zone.DlzControlTowerSpecializedControls"></a>

Controls that take parameters.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.DlzControlTowerSpecializedControls.CT_MULTISERVICE_PV_1">CT_MULTISERVICE_PV_1</a></code> | *No description.* |

---

##### `CT_MULTISERVICE_PV_1` <a name="CT_MULTISERVICE_PV_1" id="data-landing-zone.DlzControlTowerSpecializedControls.CT_MULTISERVICE_PV_1"></a>

---


### DlzControlTowerStandardControls <a name="DlzControlTowerStandardControls" id="data-landing-zone.DlzControlTowerStandardControls"></a>

Controls that do not take parameters.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.DlzControlTowerStandardControls.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS">AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerStandardControls.AWS_GR_ENCRYPTED_VOLUMES">AWS_GR_ENCRYPTED_VOLUMES</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK">AWS_GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED">AWS_GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RDS_STORAGE_ENCRYPTED">AWS_GR_RDS_STORAGE_ENCRYPTED</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RESTRICTED_SSH">AWS_GR_RESTRICTED_SSH</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RESTRICT_ROOT_USER">AWS_GR_RESTRICT_ROOT_USER</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RESTRICT_ROOT_USER_ACCESS_KEYS">AWS_GR_RESTRICT_ROOT_USER_ACCESS_KEYS</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerStandardControls.AWS_GR_ROOT_ACCOUNT_MFA_ENABLED">AWS_GR_ROOT_ACCOUNT_MFA_ENABLED</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerStandardControls.AWS_GR_S3_BUCKET_PUBLIC_READ_PROHIBITED">AWS_GR_S3_BUCKET_PUBLIC_READ_PROHIBITED</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerStandardControls.AWS_GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED">AWS_GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED</a></code> | *No description.* |
| <code><a href="#data-landing-zone.DlzControlTowerStandardControls.SH_SECRETS_MANAGER_3">SH_SECRETS_MANAGER_3</a></code> | *No description.* |

---

##### `AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS` <a name="AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS" id="data-landing-zone.DlzControlTowerStandardControls.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS"></a>

---


##### `AWS_GR_ENCRYPTED_VOLUMES` <a name="AWS_GR_ENCRYPTED_VOLUMES" id="data-landing-zone.DlzControlTowerStandardControls.AWS_GR_ENCRYPTED_VOLUMES"></a>

---


##### `AWS_GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK` <a name="AWS_GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK" id="data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK"></a>

---


##### `AWS_GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED` <a name="AWS_GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED" id="data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED"></a>

---


##### `AWS_GR_RDS_STORAGE_ENCRYPTED` <a name="AWS_GR_RDS_STORAGE_ENCRYPTED" id="data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RDS_STORAGE_ENCRYPTED"></a>

---


##### `AWS_GR_RESTRICTED_SSH` <a name="AWS_GR_RESTRICTED_SSH" id="data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RESTRICTED_SSH"></a>

---


##### `AWS_GR_RESTRICT_ROOT_USER` <a name="AWS_GR_RESTRICT_ROOT_USER" id="data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RESTRICT_ROOT_USER"></a>

---


##### `AWS_GR_RESTRICT_ROOT_USER_ACCESS_KEYS` <a name="AWS_GR_RESTRICT_ROOT_USER_ACCESS_KEYS" id="data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RESTRICT_ROOT_USER_ACCESS_KEYS"></a>

---


##### `AWS_GR_ROOT_ACCOUNT_MFA_ENABLED` <a name="AWS_GR_ROOT_ACCOUNT_MFA_ENABLED" id="data-landing-zone.DlzControlTowerStandardControls.AWS_GR_ROOT_ACCOUNT_MFA_ENABLED"></a>

---


##### `AWS_GR_S3_BUCKET_PUBLIC_READ_PROHIBITED` <a name="AWS_GR_S3_BUCKET_PUBLIC_READ_PROHIBITED" id="data-landing-zone.DlzControlTowerStandardControls.AWS_GR_S3_BUCKET_PUBLIC_READ_PROHIBITED"></a>

---


##### `AWS_GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED` <a name="AWS_GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED" id="data-landing-zone.DlzControlTowerStandardControls.AWS_GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED"></a>

---


##### `SH_SECRETS_MANAGER_3` <a name="SH_SECRETS_MANAGER_3" id="data-landing-zone.DlzControlTowerStandardControls.SH_SECRETS_MANAGER_3"></a>

---


### Ou <a name="Ou" id="data-landing-zone.Ou"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.Ou.SECURITY">SECURITY</a></code> | *No description.* |
| <code><a href="#data-landing-zone.Ou.WORKLOADS">WORKLOADS</a></code> | *No description.* |
| <code><a href="#data-landing-zone.Ou.SUSPENDED">SUSPENDED</a></code> | *No description.* |

---

##### `SECURITY` <a name="SECURITY" id="data-landing-zone.Ou.SECURITY"></a>

---


##### `WORKLOADS` <a name="WORKLOADS" id="data-landing-zone.Ou.WORKLOADS"></a>

---


##### `SUSPENDED` <a name="SUSPENDED" id="data-landing-zone.Ou.SUSPENDED"></a>

---


### Region <a name="Region" id="data-landing-zone.Region"></a>

Control Tower Supported Regions as listed here https://docs.aws.amazon.com/controltower/latest/userguide/region-how.html with the regions that might have partial or no support for SecurityHub Standard mentioned in the comment https://docs.aws.amazon.com/controltower/latest/userguide/security-hub-controls.html#sh-unsupported-regions Last updated: 22 Mar 2024.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.Region.US_EAST_1">US_EAST_1</a></code> | N. |
| <code><a href="#data-landing-zone.Region.US_EAST_2">US_EAST_2</a></code> | Ohio. |
| <code><a href="#data-landing-zone.Region.US_WEST_1">US_WEST_1</a></code> | N. |
| <code><a href="#data-landing-zone.Region.US_WEST_2">US_WEST_2</a></code> | Oregon. |
| <code><a href="#data-landing-zone.Region.CA_CENTRAL_1">CA_CENTRAL_1</a></code> | Canada (Central). |
| <code><a href="#data-landing-zone.Region.EU_WEST_1">EU_WEST_1</a></code> | Ireland. |
| <code><a href="#data-landing-zone.Region.EU_WEST_2">EU_WEST_2</a></code> | London. |
| <code><a href="#data-landing-zone.Region.EU_WEST_3">EU_WEST_3</a></code> | Paris. |
| <code><a href="#data-landing-zone.Region.EU_CENTRAL_1">EU_CENTRAL_1</a></code> | Frankfurt. |
| <code><a href="#data-landing-zone.Region.EU_CENTRAL_2">EU_CENTRAL_2</a></code> | Zurich. |
| <code><a href="#data-landing-zone.Region.EU_NORTH_1">EU_NORTH_1</a></code> | Stockholm. |
| <code><a href="#data-landing-zone.Region.EU_SOUTH_1">EU_SOUTH_1</a></code> | Milan. |
| <code><a href="#data-landing-zone.Region.EU_SOUTH_2">EU_SOUTH_2</a></code> | Spain. |
| <code><a href="#data-landing-zone.Region.AP_NORTHEAST_1">AP_NORTHEAST_1</a></code> | Tokyo. |
| <code><a href="#data-landing-zone.Region.AP_NORTHEAST_2">AP_NORTHEAST_2</a></code> | Seoul. |
| <code><a href="#data-landing-zone.Region.AP_NORTHEAST_3">AP_NORTHEAST_3</a></code> | Osaka. |
| <code><a href="#data-landing-zone.Region.AP_SOUTHEAST_1">AP_SOUTHEAST_1</a></code> | Singapore. |
| <code><a href="#data-landing-zone.Region.AP_SOUTHEAST_2">AP_SOUTHEAST_2</a></code> | Sydney, Melbourne. |
| <code><a href="#data-landing-zone.Region.AP_SOUTHEAST_3">AP_SOUTHEAST_3</a></code> | Jakarta No Control Tower SecurityHub Standard support. |
| <code><a href="#data-landing-zone.Region.AP_SOUTHEAST_4">AP_SOUTHEAST_4</a></code> | Melbourne No Control Tower SecurityHub Standard support. |
| <code><a href="#data-landing-zone.Region.AP_EAST_1">AP_EAST_1</a></code> | Hong Kong No Control Tower SecurityHub Standard support. |
| <code><a href="#data-landing-zone.Region.SA_EAST_1">SA_EAST_1</a></code> | Sao Paulo. |
| <code><a href="#data-landing-zone.Region.AF_SOUTH_1">AF_SOUTH_1</a></code> | Cape Town No Control Tower SecurityHub Standard support. |
| <code><a href="#data-landing-zone.Region.ME_SOUTH_1">ME_SOUTH_1</a></code> | Bahrain, UAE, Tel Aviv No Control Tower SecurityHub Standard support. |
| <code><a href="#data-landing-zone.Region.ME_CENTRAL_1">ME_CENTRAL_1</a></code> | UAE No Control Tower SecurityHub Standard support. |
| <code><a href="#data-landing-zone.Region.IL_CENTRAL_1">IL_CENTRAL_1</a></code> | Israel No Control Tower SecurityHub Standard support. |
| <code><a href="#data-landing-zone.Region.AP_SOUTH_2">AP_SOUTH_2</a></code> | Hyderabad No Control Tower SecurityHub Standard support. |

---

##### `US_EAST_1` <a name="US_EAST_1" id="data-landing-zone.Region.US_EAST_1"></a>

N.

Virginia

---


##### `US_EAST_2` <a name="US_EAST_2" id="data-landing-zone.Region.US_EAST_2"></a>

Ohio.

---


##### `US_WEST_1` <a name="US_WEST_1" id="data-landing-zone.Region.US_WEST_1"></a>

N.

California

---


##### `US_WEST_2` <a name="US_WEST_2" id="data-landing-zone.Region.US_WEST_2"></a>

Oregon.

---


##### `CA_CENTRAL_1` <a name="CA_CENTRAL_1" id="data-landing-zone.Region.CA_CENTRAL_1"></a>

Canada (Central).

---


##### `EU_WEST_1` <a name="EU_WEST_1" id="data-landing-zone.Region.EU_WEST_1"></a>

Ireland.

---


##### `EU_WEST_2` <a name="EU_WEST_2" id="data-landing-zone.Region.EU_WEST_2"></a>

London.

---


##### `EU_WEST_3` <a name="EU_WEST_3" id="data-landing-zone.Region.EU_WEST_3"></a>

Paris.

---


##### `EU_CENTRAL_1` <a name="EU_CENTRAL_1" id="data-landing-zone.Region.EU_CENTRAL_1"></a>

Frankfurt.

---


##### `EU_CENTRAL_2` <a name="EU_CENTRAL_2" id="data-landing-zone.Region.EU_CENTRAL_2"></a>

Zurich.

---


##### `EU_NORTH_1` <a name="EU_NORTH_1" id="data-landing-zone.Region.EU_NORTH_1"></a>

Stockholm.

---


##### `EU_SOUTH_1` <a name="EU_SOUTH_1" id="data-landing-zone.Region.EU_SOUTH_1"></a>

Milan.

---


##### `EU_SOUTH_2` <a name="EU_SOUTH_2" id="data-landing-zone.Region.EU_SOUTH_2"></a>

Spain.

---


##### `AP_NORTHEAST_1` <a name="AP_NORTHEAST_1" id="data-landing-zone.Region.AP_NORTHEAST_1"></a>

Tokyo.

---


##### `AP_NORTHEAST_2` <a name="AP_NORTHEAST_2" id="data-landing-zone.Region.AP_NORTHEAST_2"></a>

Seoul.

---


##### `AP_NORTHEAST_3` <a name="AP_NORTHEAST_3" id="data-landing-zone.Region.AP_NORTHEAST_3"></a>

Osaka.

---


##### `AP_SOUTHEAST_1` <a name="AP_SOUTHEAST_1" id="data-landing-zone.Region.AP_SOUTHEAST_1"></a>

Singapore.

---


##### `AP_SOUTHEAST_2` <a name="AP_SOUTHEAST_2" id="data-landing-zone.Region.AP_SOUTHEAST_2"></a>

Sydney, Melbourne.

---


##### `AP_SOUTHEAST_3` <a name="AP_SOUTHEAST_3" id="data-landing-zone.Region.AP_SOUTHEAST_3"></a>

Jakarta No Control Tower SecurityHub Standard support.

---


##### `AP_SOUTHEAST_4` <a name="AP_SOUTHEAST_4" id="data-landing-zone.Region.AP_SOUTHEAST_4"></a>

Melbourne No Control Tower SecurityHub Standard support.

---


##### `AP_EAST_1` <a name="AP_EAST_1" id="data-landing-zone.Region.AP_EAST_1"></a>

Hong Kong No Control Tower SecurityHub Standard support.

---


##### `SA_EAST_1` <a name="SA_EAST_1" id="data-landing-zone.Region.SA_EAST_1"></a>

Sao Paulo.

---


##### `AF_SOUTH_1` <a name="AF_SOUTH_1" id="data-landing-zone.Region.AF_SOUTH_1"></a>

Cape Town No Control Tower SecurityHub Standard support.

---


##### `ME_SOUTH_1` <a name="ME_SOUTH_1" id="data-landing-zone.Region.ME_SOUTH_1"></a>

Bahrain, UAE, Tel Aviv No Control Tower SecurityHub Standard support.

---


##### `ME_CENTRAL_1` <a name="ME_CENTRAL_1" id="data-landing-zone.Region.ME_CENTRAL_1"></a>

UAE No Control Tower SecurityHub Standard support.

---


##### `IL_CENTRAL_1` <a name="IL_CENTRAL_1" id="data-landing-zone.Region.IL_CENTRAL_1"></a>

Israel No Control Tower SecurityHub Standard support.

---


##### `AP_SOUTH_2` <a name="AP_SOUTH_2" id="data-landing-zone.Region.AP_SOUTH_2"></a>

Hyderabad No Control Tower SecurityHub Standard support.

---


### ReportType <a name="ReportType" id="data-landing-zone.ReportType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.ReportType.CONTROL_TOWER_CONTROL">CONTROL_TOWER_CONTROL</a></code> | *No description.* |
| <code><a href="#data-landing-zone.ReportType.CONFIG_RULE">CONFIG_RULE</a></code> | *No description.* |
| <code><a href="#data-landing-zone.ReportType.SECURITY_HUB_STANDARD">SECURITY_HUB_STANDARD</a></code> | *No description.* |
| <code><a href="#data-landing-zone.ReportType.TAG_POLICY">TAG_POLICY</a></code> | *No description.* |
| <code><a href="#data-landing-zone.ReportType.SERVICE_CONTROL_POLICY">SERVICE_CONTROL_POLICY</a></code> | *No description.* |

---

##### `CONTROL_TOWER_CONTROL` <a name="CONTROL_TOWER_CONTROL" id="data-landing-zone.ReportType.CONTROL_TOWER_CONTROL"></a>

---


##### `CONFIG_RULE` <a name="CONFIG_RULE" id="data-landing-zone.ReportType.CONFIG_RULE"></a>

---


##### `SECURITY_HUB_STANDARD` <a name="SECURITY_HUB_STANDARD" id="data-landing-zone.ReportType.SECURITY_HUB_STANDARD"></a>

---


##### `TAG_POLICY` <a name="TAG_POLICY" id="data-landing-zone.ReportType.TAG_POLICY"></a>

---


##### `SERVICE_CONTROL_POLICY` <a name="SERVICE_CONTROL_POLICY" id="data-landing-zone.ReportType.SERVICE_CONTROL_POLICY"></a>

---


### SecurityHubNotificationSeverity <a name="SecurityHubNotificationSeverity" id="data-landing-zone.SecurityHubNotificationSeverity"></a>

https://docs.aws.amazon.com/securityhub/1.0/APIReference/API_Severity.html.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.SecurityHubNotificationSeverity.INFORMATIONAL">INFORMATIONAL</a></code> | *No description.* |
| <code><a href="#data-landing-zone.SecurityHubNotificationSeverity.LOW">LOW</a></code> | *No description.* |
| <code><a href="#data-landing-zone.SecurityHubNotificationSeverity.MEDIUM">MEDIUM</a></code> | *No description.* |
| <code><a href="#data-landing-zone.SecurityHubNotificationSeverity.HIGH">HIGH</a></code> | *No description.* |
| <code><a href="#data-landing-zone.SecurityHubNotificationSeverity.CRITICAL">CRITICAL</a></code> | *No description.* |

---

##### `INFORMATIONAL` <a name="INFORMATIONAL" id="data-landing-zone.SecurityHubNotificationSeverity.INFORMATIONAL"></a>

---


##### `LOW` <a name="LOW" id="data-landing-zone.SecurityHubNotificationSeverity.LOW"></a>

---


##### `MEDIUM` <a name="MEDIUM" id="data-landing-zone.SecurityHubNotificationSeverity.MEDIUM"></a>

---


##### `HIGH` <a name="HIGH" id="data-landing-zone.SecurityHubNotificationSeverity.HIGH"></a>

---


##### `CRITICAL` <a name="CRITICAL" id="data-landing-zone.SecurityHubNotificationSeverity.CRITICAL"></a>

---


### SecurityHubNotificationSWorkflowStatus <a name="SecurityHubNotificationSWorkflowStatus" id="data-landing-zone.SecurityHubNotificationSWorkflowStatus"></a>

https://docs.aws.amazon.com/securityhub/1.0/APIReference/API_Workflow.html.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#data-landing-zone.SecurityHubNotificationSWorkflowStatus.NEW">NEW</a></code> | *No description.* |
| <code><a href="#data-landing-zone.SecurityHubNotificationSWorkflowStatus.NOTIFIED">NOTIFIED</a></code> | *No description.* |
| <code><a href="#data-landing-zone.SecurityHubNotificationSWorkflowStatus.SUPPRESSED">SUPPRESSED</a></code> | *No description.* |
| <code><a href="#data-landing-zone.SecurityHubNotificationSWorkflowStatus.RESOLVED">RESOLVED</a></code> | *No description.* |

---

##### `NEW` <a name="NEW" id="data-landing-zone.SecurityHubNotificationSWorkflowStatus.NEW"></a>

---


##### `NOTIFIED` <a name="NOTIFIED" id="data-landing-zone.SecurityHubNotificationSWorkflowStatus.NOTIFIED"></a>

---


##### `SUPPRESSED` <a name="SUPPRESSED" id="data-landing-zone.SecurityHubNotificationSWorkflowStatus.SUPPRESSED"></a>

---


##### `RESOLVED` <a name="RESOLVED" id="data-landing-zone.SecurityHubNotificationSWorkflowStatus.RESOLVED"></a>

---

