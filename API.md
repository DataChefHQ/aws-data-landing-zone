# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### AuditGlobalStack <a name="AuditGlobalStack" id="@DataChefHQ/data-landing-zone.AuditGlobalStack"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.Initializer"></a>

```typescript
import { AuditGlobalStack } from '@DataChefHQ/data-landing-zone'

new AuditGlobalStack(scope: Construct, stackProps: DlzStackProps, props: DataLandingZoneProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.Initializer.parameter.stackProps">stackProps</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzStackProps">DlzStackProps</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `stackProps`<sup>Required</sup> <a name="stackProps" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.Initializer.parameter.stackProps"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzStackProps">DlzStackProps</a>

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.resourceName">resourceName</a></code> | Create unique ResourceNames. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.securityHubNotifications">securityHubNotifications</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.addTransform"></a>

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


###### `transform`<sup>Required</sup> <a name="transform" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.exportStringListValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.exportValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.formatArn"></a>

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

###### `components`<sup>Required</sup> <a name="components" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.getLogicalId"></a>

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

###### `element`<sup>Required</sup> <a name="element" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.regionalFact"></a>

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

###### `factName`<sup>Required</sup> <a name="factName" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

##### `securityHubNotifications` <a name="securityHubNotifications" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.securityHubNotifications"></a>

```typescript
public securityHubNotifications(): void
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.isConstruct"></a>

```typescript
import { AuditGlobalStack } from '@DataChefHQ/data-landing-zone'

AuditGlobalStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.isStack"></a>

```typescript
import { AuditGlobalStack } from '@DataChefHQ/data-landing-zone'

AuditGlobalStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.of"></a>

```typescript
import { AuditGlobalStack } from '@DataChefHQ/data-landing-zone'

AuditGlobalStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.accountId">accountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.account"></a>

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

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.availabilityZones"></a>

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

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.environment"></a>

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

##### `nested`<sup>Required</sup> <a name="nested" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.region"></a>

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

##### `stackId`<sup>Required</sup> <a name="stackId" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.stackId"></a>

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


##### `stackName`<sup>Required</sup> <a name="stackName" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.stackName"></a>

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

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.AuditGlobalStack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### AuditRegionalStack <a name="AuditRegionalStack" id="@DataChefHQ/data-landing-zone.AuditRegionalStack"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.Initializer"></a>

```typescript
import { AuditRegionalStack } from '@DataChefHQ/data-landing-zone'

new AuditRegionalStack(scope: Construct, props: DlzStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzStackProps">DlzStackProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzStackProps">DlzStackProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.resourceName">resourceName</a></code> | Create unique ResourceNames. |

---

##### `toString` <a name="toString" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.addTransform"></a>

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


###### `transform`<sup>Required</sup> <a name="transform" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.exportStringListValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.exportValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.formatArn"></a>

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

###### `components`<sup>Required</sup> <a name="components" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.getLogicalId"></a>

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

###### `element`<sup>Required</sup> <a name="element" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.regionalFact"></a>

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

###### `factName`<sup>Required</sup> <a name="factName" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.isConstruct"></a>

```typescript
import { AuditRegionalStack } from '@DataChefHQ/data-landing-zone'

AuditRegionalStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.isStack"></a>

```typescript
import { AuditRegionalStack } from '@DataChefHQ/data-landing-zone'

AuditRegionalStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.of"></a>

```typescript
import { AuditRegionalStack } from '@DataChefHQ/data-landing-zone'

AuditRegionalStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.accountId">accountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.account"></a>

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

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.availabilityZones"></a>

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

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.environment"></a>

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

##### `nested`<sup>Required</sup> <a name="nested" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.region"></a>

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

##### `stackId`<sup>Required</sup> <a name="stackId" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.stackId"></a>

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


##### `stackName`<sup>Required</sup> <a name="stackName" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.stackName"></a>

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

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.AuditRegionalStack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### DlzStack <a name="DlzStack" id="@DataChefHQ/data-landing-zone.DlzStack"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.DlzStack.Initializer"></a>

```typescript
import { DlzStack } from '@DataChefHQ/data-landing-zone'

new DlzStack(scope: Construct, props: DlzStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzStackProps">DlzStackProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.DlzStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.DlzStack.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzStackProps">DlzStackProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.resourceName">resourceName</a></code> | Create unique ResourceNames. |

---

##### `toString` <a name="toString" id="@DataChefHQ/data-landing-zone.DlzStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@DataChefHQ/data-landing-zone.DlzStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="@DataChefHQ/data-landing-zone.DlzStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="@DataChefHQ/data-landing-zone.DlzStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="@DataChefHQ/data-landing-zone.DlzStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="@DataChefHQ/data-landing-zone.DlzStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@DataChefHQ/data-landing-zone.DlzStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="@DataChefHQ/data-landing-zone.DlzStack.addTransform"></a>

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


###### `transform`<sup>Required</sup> <a name="transform" id="@DataChefHQ/data-landing-zone.DlzStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="@DataChefHQ/data-landing-zone.DlzStack.exportStringListValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.DlzStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.DlzStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="@DataChefHQ/data-landing-zone.DlzStack.exportValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.DlzStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.DlzStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="@DataChefHQ/data-landing-zone.DlzStack.formatArn"></a>

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

###### `components`<sup>Required</sup> <a name="components" id="@DataChefHQ/data-landing-zone.DlzStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="@DataChefHQ/data-landing-zone.DlzStack.getLogicalId"></a>

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

###### `element`<sup>Required</sup> <a name="element" id="@DataChefHQ/data-landing-zone.DlzStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="@DataChefHQ/data-landing-zone.DlzStack.regionalFact"></a>

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

###### `factName`<sup>Required</sup> <a name="factName" id="@DataChefHQ/data-landing-zone.DlzStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@DataChefHQ/data-landing-zone.DlzStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="@DataChefHQ/data-landing-zone.DlzStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="@DataChefHQ/data-landing-zone.DlzStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="@DataChefHQ/data-landing-zone.DlzStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="@DataChefHQ/data-landing-zone.DlzStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="@DataChefHQ/data-landing-zone.DlzStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="@DataChefHQ/data-landing-zone.DlzStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.DlzStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="@DataChefHQ/data-landing-zone.DlzStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="@DataChefHQ/data-landing-zone.DlzStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="@DataChefHQ/data-landing-zone.DlzStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="@DataChefHQ/data-landing-zone.DlzStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.DlzStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="@DataChefHQ/data-landing-zone.DlzStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="@DataChefHQ/data-landing-zone.DlzStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.DlzStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="@DataChefHQ/data-landing-zone.DlzStack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="@DataChefHQ/data-landing-zone.DlzStack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@DataChefHQ/data-landing-zone.DlzStack.isConstruct"></a>

```typescript
import { DlzStack } from '@DataChefHQ/data-landing-zone'

DlzStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.DlzStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@DataChefHQ/data-landing-zone.DlzStack.isStack"></a>

```typescript
import { DlzStack } from '@DataChefHQ/data-landing-zone'

DlzStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.DlzStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@DataChefHQ/data-landing-zone.DlzStack.of"></a>

```typescript
import { DlzStack } from '@DataChefHQ/data-landing-zone'

DlzStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="@DataChefHQ/data-landing-zone.DlzStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.accountId">accountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@DataChefHQ/data-landing-zone.DlzStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="@DataChefHQ/data-landing-zone.DlzStack.property.account"></a>

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

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@DataChefHQ/data-landing-zone.DlzStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@DataChefHQ/data-landing-zone.DlzStack.property.availabilityZones"></a>

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

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="@DataChefHQ/data-landing-zone.DlzStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@DataChefHQ/data-landing-zone.DlzStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="@DataChefHQ/data-landing-zone.DlzStack.property.environment"></a>

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

##### `nested`<sup>Required</sup> <a name="nested" id="@DataChefHQ/data-landing-zone.DlzStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="@DataChefHQ/data-landing-zone.DlzStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="@DataChefHQ/data-landing-zone.DlzStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.DlzStack.property.region"></a>

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

##### `stackId`<sup>Required</sup> <a name="stackId" id="@DataChefHQ/data-landing-zone.DlzStack.property.stackId"></a>

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


##### `stackName`<sup>Required</sup> <a name="stackName" id="@DataChefHQ/data-landing-zone.DlzStack.property.stackName"></a>

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

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@DataChefHQ/data-landing-zone.DlzStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@DataChefHQ/data-landing-zone.DlzStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="@DataChefHQ/data-landing-zone.DlzStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="@DataChefHQ/data-landing-zone.DlzStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="@DataChefHQ/data-landing-zone.DlzStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="@DataChefHQ/data-landing-zone.DlzStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="@DataChefHQ/data-landing-zone.DlzStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="@DataChefHQ/data-landing-zone.DlzStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@DataChefHQ/data-landing-zone.DlzStack.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="@DataChefHQ/data-landing-zone.DlzStack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.DlzStack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### IamIdentityCenterGroup <a name="IamIdentityCenterGroup" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroup"></a>

A group of users in the IAM Identity Center.

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroup.Initializer"></a>

```typescript
import { IamIdentityCenterGroup } from '@DataChefHQ/data-landing-zone'

new IamIdentityCenterGroup(scope: Construct, id: string, props: IamIdentityCenterGroupProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterGroup.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterGroup.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterGroup.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterGroupProps">IamIdentityCenterGroupProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroup.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroup.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroup.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterGroupProps">IamIdentityCenterGroupProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterGroup.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroup.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterGroup.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroup.isConstruct"></a>

```typescript
import { IamIdentityCenterGroup } from '@DataChefHQ/data-landing-zone'

IamIdentityCenterGroup.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroup.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterGroup.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroup.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### IdentityStoreUser <a name="IdentityStoreUser" id="@DataChefHQ/data-landing-zone.IdentityStoreUser"></a>

A user in the IAM Identity Center.

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.IdentityStoreUser.Initializer"></a>

```typescript
import { IdentityStoreUser } from '@DataChefHQ/data-landing-zone'

new IdentityStoreUser(scope: Construct, id: string, props: IdentityStoreUserPropsExt)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUser.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUser.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUser.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserPropsExt">IdentityStoreUserPropsExt</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.IdentityStoreUser.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.IdentityStoreUser.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.IdentityStoreUser.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserPropsExt">IdentityStoreUserPropsExt</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUser.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@DataChefHQ/data-landing-zone.IdentityStoreUser.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUser.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUser.fetchCodeDirectory">fetchCodeDirectory</a></code> | *No description.* |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@DataChefHQ/data-landing-zone.IdentityStoreUser.isConstruct"></a>

```typescript
import { IdentityStoreUser } from '@DataChefHQ/data-landing-zone'

IdentityStoreUser.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.IdentityStoreUser.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `fetchCodeDirectory` <a name="fetchCodeDirectory" id="@DataChefHQ/data-landing-zone.IdentityStoreUser.fetchCodeDirectory"></a>

```typescript
import { IdentityStoreUser } from '@DataChefHQ/data-landing-zone'

IdentityStoreUser.fetchCodeDirectory()
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUser.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUser.property.userId">userId</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@DataChefHQ/data-landing-zone.IdentityStoreUser.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `userId`<sup>Required</sup> <a name="userId" id="@DataChefHQ/data-landing-zone.IdentityStoreUser.property.userId"></a>

```typescript
public readonly userId: string;
```

- *Type:* string

---


### LogGlobalStack <a name="LogGlobalStack" id="@DataChefHQ/data-landing-zone.LogGlobalStack"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.LogGlobalStack.Initializer"></a>

```typescript
import { LogGlobalStack } from '@DataChefHQ/data-landing-zone'

new LogGlobalStack(scope: Construct, props: DlzStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzStackProps">DlzStackProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.LogGlobalStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.LogGlobalStack.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzStackProps">DlzStackProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.resourceName">resourceName</a></code> | Create unique ResourceNames. |

---

##### `toString` <a name="toString" id="@DataChefHQ/data-landing-zone.LogGlobalStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@DataChefHQ/data-landing-zone.LogGlobalStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="@DataChefHQ/data-landing-zone.LogGlobalStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="@DataChefHQ/data-landing-zone.LogGlobalStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="@DataChefHQ/data-landing-zone.LogGlobalStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="@DataChefHQ/data-landing-zone.LogGlobalStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@DataChefHQ/data-landing-zone.LogGlobalStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="@DataChefHQ/data-landing-zone.LogGlobalStack.addTransform"></a>

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


###### `transform`<sup>Required</sup> <a name="transform" id="@DataChefHQ/data-landing-zone.LogGlobalStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="@DataChefHQ/data-landing-zone.LogGlobalStack.exportStringListValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.LogGlobalStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.LogGlobalStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="@DataChefHQ/data-landing-zone.LogGlobalStack.exportValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.LogGlobalStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.LogGlobalStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="@DataChefHQ/data-landing-zone.LogGlobalStack.formatArn"></a>

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

###### `components`<sup>Required</sup> <a name="components" id="@DataChefHQ/data-landing-zone.LogGlobalStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="@DataChefHQ/data-landing-zone.LogGlobalStack.getLogicalId"></a>

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

###### `element`<sup>Required</sup> <a name="element" id="@DataChefHQ/data-landing-zone.LogGlobalStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="@DataChefHQ/data-landing-zone.LogGlobalStack.regionalFact"></a>

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

###### `factName`<sup>Required</sup> <a name="factName" id="@DataChefHQ/data-landing-zone.LogGlobalStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@DataChefHQ/data-landing-zone.LogGlobalStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="@DataChefHQ/data-landing-zone.LogGlobalStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="@DataChefHQ/data-landing-zone.LogGlobalStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="@DataChefHQ/data-landing-zone.LogGlobalStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="@DataChefHQ/data-landing-zone.LogGlobalStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="@DataChefHQ/data-landing-zone.LogGlobalStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="@DataChefHQ/data-landing-zone.LogGlobalStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.LogGlobalStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="@DataChefHQ/data-landing-zone.LogGlobalStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="@DataChefHQ/data-landing-zone.LogGlobalStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="@DataChefHQ/data-landing-zone.LogGlobalStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="@DataChefHQ/data-landing-zone.LogGlobalStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.LogGlobalStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="@DataChefHQ/data-landing-zone.LogGlobalStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="@DataChefHQ/data-landing-zone.LogGlobalStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.LogGlobalStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="@DataChefHQ/data-landing-zone.LogGlobalStack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="@DataChefHQ/data-landing-zone.LogGlobalStack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@DataChefHQ/data-landing-zone.LogGlobalStack.isConstruct"></a>

```typescript
import { LogGlobalStack } from '@DataChefHQ/data-landing-zone'

LogGlobalStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.LogGlobalStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@DataChefHQ/data-landing-zone.LogGlobalStack.isStack"></a>

```typescript
import { LogGlobalStack } from '@DataChefHQ/data-landing-zone'

LogGlobalStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.LogGlobalStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@DataChefHQ/data-landing-zone.LogGlobalStack.of"></a>

```typescript
import { LogGlobalStack } from '@DataChefHQ/data-landing-zone'

LogGlobalStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="@DataChefHQ/data-landing-zone.LogGlobalStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.accountId">accountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.account"></a>

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

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.availabilityZones"></a>

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

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.environment"></a>

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

##### `nested`<sup>Required</sup> <a name="nested" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.region"></a>

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

##### `stackId`<sup>Required</sup> <a name="stackId" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.stackId"></a>

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


##### `stackName`<sup>Required</sup> <a name="stackName" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.stackName"></a>

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

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.LogGlobalStack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### LogRegionalStack <a name="LogRegionalStack" id="@DataChefHQ/data-landing-zone.LogRegionalStack"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.LogRegionalStack.Initializer"></a>

```typescript
import { LogRegionalStack } from '@DataChefHQ/data-landing-zone'

new LogRegionalStack(scope: Construct, props: DlzStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzStackProps">DlzStackProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.LogRegionalStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.LogRegionalStack.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzStackProps">DlzStackProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.resourceName">resourceName</a></code> | Create unique ResourceNames. |

---

##### `toString` <a name="toString" id="@DataChefHQ/data-landing-zone.LogRegionalStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@DataChefHQ/data-landing-zone.LogRegionalStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="@DataChefHQ/data-landing-zone.LogRegionalStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="@DataChefHQ/data-landing-zone.LogRegionalStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="@DataChefHQ/data-landing-zone.LogRegionalStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="@DataChefHQ/data-landing-zone.LogRegionalStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@DataChefHQ/data-landing-zone.LogRegionalStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="@DataChefHQ/data-landing-zone.LogRegionalStack.addTransform"></a>

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


###### `transform`<sup>Required</sup> <a name="transform" id="@DataChefHQ/data-landing-zone.LogRegionalStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="@DataChefHQ/data-landing-zone.LogRegionalStack.exportStringListValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.LogRegionalStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.LogRegionalStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="@DataChefHQ/data-landing-zone.LogRegionalStack.exportValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.LogRegionalStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.LogRegionalStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="@DataChefHQ/data-landing-zone.LogRegionalStack.formatArn"></a>

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

###### `components`<sup>Required</sup> <a name="components" id="@DataChefHQ/data-landing-zone.LogRegionalStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="@DataChefHQ/data-landing-zone.LogRegionalStack.getLogicalId"></a>

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

###### `element`<sup>Required</sup> <a name="element" id="@DataChefHQ/data-landing-zone.LogRegionalStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="@DataChefHQ/data-landing-zone.LogRegionalStack.regionalFact"></a>

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

###### `factName`<sup>Required</sup> <a name="factName" id="@DataChefHQ/data-landing-zone.LogRegionalStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@DataChefHQ/data-landing-zone.LogRegionalStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="@DataChefHQ/data-landing-zone.LogRegionalStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="@DataChefHQ/data-landing-zone.LogRegionalStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="@DataChefHQ/data-landing-zone.LogRegionalStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="@DataChefHQ/data-landing-zone.LogRegionalStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="@DataChefHQ/data-landing-zone.LogRegionalStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="@DataChefHQ/data-landing-zone.LogRegionalStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.LogRegionalStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="@DataChefHQ/data-landing-zone.LogRegionalStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="@DataChefHQ/data-landing-zone.LogRegionalStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="@DataChefHQ/data-landing-zone.LogRegionalStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="@DataChefHQ/data-landing-zone.LogRegionalStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.LogRegionalStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="@DataChefHQ/data-landing-zone.LogRegionalStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="@DataChefHQ/data-landing-zone.LogRegionalStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.LogRegionalStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="@DataChefHQ/data-landing-zone.LogRegionalStack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="@DataChefHQ/data-landing-zone.LogRegionalStack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@DataChefHQ/data-landing-zone.LogRegionalStack.isConstruct"></a>

```typescript
import { LogRegionalStack } from '@DataChefHQ/data-landing-zone'

LogRegionalStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.LogRegionalStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@DataChefHQ/data-landing-zone.LogRegionalStack.isStack"></a>

```typescript
import { LogRegionalStack } from '@DataChefHQ/data-landing-zone'

LogRegionalStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.LogRegionalStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@DataChefHQ/data-landing-zone.LogRegionalStack.of"></a>

```typescript
import { LogRegionalStack } from '@DataChefHQ/data-landing-zone'

LogRegionalStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="@DataChefHQ/data-landing-zone.LogRegionalStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.accountId">accountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.LogRegionalStack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.account"></a>

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

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.availabilityZones"></a>

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

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.environment"></a>

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

##### `nested`<sup>Required</sup> <a name="nested" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.region"></a>

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

##### `stackId`<sup>Required</sup> <a name="stackId" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.stackId"></a>

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


##### `stackName`<sup>Required</sup> <a name="stackName" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.stackName"></a>

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

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.LogRegionalStack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### ManagementStack <a name="ManagementStack" id="@DataChefHQ/data-landing-zone.ManagementStack"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.ManagementStack.Initializer"></a>

```typescript
import { ManagementStack } from '@DataChefHQ/data-landing-zone'

new ManagementStack(scope: Construct, stackProps: DlzStackProps, props: DataLandingZoneProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.Initializer.parameter.stackProps">stackProps</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzStackProps">DlzStackProps</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.ManagementStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `stackProps`<sup>Required</sup> <a name="stackProps" id="@DataChefHQ/data-landing-zone.ManagementStack.Initializer.parameter.stackProps"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzStackProps">DlzStackProps</a>

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.ManagementStack.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.resourceName">resourceName</a></code> | Create unique ResourceNames. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.budgets">budgets</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.deploymentPlatformGitHub">deploymentPlatformGitHub</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.iamIdentityCenter">iamIdentityCenter</a></code> | IAM Identity Center. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.iamPermissionBoundary">iamPermissionBoundary</a></code> | IAM Policy Permission Boundary. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.suspendedOuPolicies">suspendedOuPolicies</a></code> | Service Control Policies and Tag Policies  applied at the OU level because we won't need any customizations per account. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.workloadAccountsOrgPolicies">workloadAccountsOrgPolicies</a></code> | Service Control Policies and Tag Policies applied at the account level to enable customization per account. |

---

##### `toString` <a name="toString" id="@DataChefHQ/data-landing-zone.ManagementStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@DataChefHQ/data-landing-zone.ManagementStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="@DataChefHQ/data-landing-zone.ManagementStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="@DataChefHQ/data-landing-zone.ManagementStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="@DataChefHQ/data-landing-zone.ManagementStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="@DataChefHQ/data-landing-zone.ManagementStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@DataChefHQ/data-landing-zone.ManagementStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="@DataChefHQ/data-landing-zone.ManagementStack.addTransform"></a>

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


###### `transform`<sup>Required</sup> <a name="transform" id="@DataChefHQ/data-landing-zone.ManagementStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="@DataChefHQ/data-landing-zone.ManagementStack.exportStringListValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.ManagementStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.ManagementStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="@DataChefHQ/data-landing-zone.ManagementStack.exportValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.ManagementStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.ManagementStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="@DataChefHQ/data-landing-zone.ManagementStack.formatArn"></a>

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

###### `components`<sup>Required</sup> <a name="components" id="@DataChefHQ/data-landing-zone.ManagementStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="@DataChefHQ/data-landing-zone.ManagementStack.getLogicalId"></a>

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

###### `element`<sup>Required</sup> <a name="element" id="@DataChefHQ/data-landing-zone.ManagementStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="@DataChefHQ/data-landing-zone.ManagementStack.regionalFact"></a>

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

###### `factName`<sup>Required</sup> <a name="factName" id="@DataChefHQ/data-landing-zone.ManagementStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@DataChefHQ/data-landing-zone.ManagementStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="@DataChefHQ/data-landing-zone.ManagementStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="@DataChefHQ/data-landing-zone.ManagementStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="@DataChefHQ/data-landing-zone.ManagementStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="@DataChefHQ/data-landing-zone.ManagementStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="@DataChefHQ/data-landing-zone.ManagementStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="@DataChefHQ/data-landing-zone.ManagementStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.ManagementStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="@DataChefHQ/data-landing-zone.ManagementStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="@DataChefHQ/data-landing-zone.ManagementStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="@DataChefHQ/data-landing-zone.ManagementStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="@DataChefHQ/data-landing-zone.ManagementStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.ManagementStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="@DataChefHQ/data-landing-zone.ManagementStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="@DataChefHQ/data-landing-zone.ManagementStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.ManagementStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="@DataChefHQ/data-landing-zone.ManagementStack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="@DataChefHQ/data-landing-zone.ManagementStack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

##### `budgets` <a name="budgets" id="@DataChefHQ/data-landing-zone.ManagementStack.budgets"></a>

```typescript
public budgets(): void
```

##### `deploymentPlatformGitHub` <a name="deploymentPlatformGitHub" id="@DataChefHQ/data-landing-zone.ManagementStack.deploymentPlatformGitHub"></a>

```typescript
public deploymentPlatformGitHub(): void
```

##### `iamIdentityCenter` <a name="iamIdentityCenter" id="@DataChefHQ/data-landing-zone.ManagementStack.iamIdentityCenter"></a>

```typescript
public iamIdentityCenter(): void
```

IAM Identity Center.

##### `iamPermissionBoundary` <a name="iamPermissionBoundary" id="@DataChefHQ/data-landing-zone.ManagementStack.iamPermissionBoundary"></a>

```typescript
public iamPermissionBoundary(): void
```

IAM Policy Permission Boundary.

##### `suspendedOuPolicies` <a name="suspendedOuPolicies" id="@DataChefHQ/data-landing-zone.ManagementStack.suspendedOuPolicies"></a>

```typescript
public suspendedOuPolicies(): void
```

Service Control Policies and Tag Policies  applied at the OU level because we won't need any customizations per account.

##### `workloadAccountsOrgPolicies` <a name="workloadAccountsOrgPolicies" id="@DataChefHQ/data-landing-zone.ManagementStack.workloadAccountsOrgPolicies"></a>

```typescript
public workloadAccountsOrgPolicies(): void
```

Service Control Policies and Tag Policies applied at the account level to enable customization per account.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@DataChefHQ/data-landing-zone.ManagementStack.isConstruct"></a>

```typescript
import { ManagementStack } from '@DataChefHQ/data-landing-zone'

ManagementStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.ManagementStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@DataChefHQ/data-landing-zone.ManagementStack.isStack"></a>

```typescript
import { ManagementStack } from '@DataChefHQ/data-landing-zone'

ManagementStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.ManagementStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@DataChefHQ/data-landing-zone.ManagementStack.of"></a>

```typescript
import { ManagementStack } from '@DataChefHQ/data-landing-zone'

ManagementStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="@DataChefHQ/data-landing-zone.ManagementStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.accountId">accountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@DataChefHQ/data-landing-zone.ManagementStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="@DataChefHQ/data-landing-zone.ManagementStack.property.account"></a>

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

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@DataChefHQ/data-landing-zone.ManagementStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@DataChefHQ/data-landing-zone.ManagementStack.property.availabilityZones"></a>

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

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="@DataChefHQ/data-landing-zone.ManagementStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@DataChefHQ/data-landing-zone.ManagementStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="@DataChefHQ/data-landing-zone.ManagementStack.property.environment"></a>

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

##### `nested`<sup>Required</sup> <a name="nested" id="@DataChefHQ/data-landing-zone.ManagementStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="@DataChefHQ/data-landing-zone.ManagementStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="@DataChefHQ/data-landing-zone.ManagementStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.ManagementStack.property.region"></a>

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

##### `stackId`<sup>Required</sup> <a name="stackId" id="@DataChefHQ/data-landing-zone.ManagementStack.property.stackId"></a>

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


##### `stackName`<sup>Required</sup> <a name="stackName" id="@DataChefHQ/data-landing-zone.ManagementStack.property.stackName"></a>

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

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@DataChefHQ/data-landing-zone.ManagementStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@DataChefHQ/data-landing-zone.ManagementStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="@DataChefHQ/data-landing-zone.ManagementStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="@DataChefHQ/data-landing-zone.ManagementStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="@DataChefHQ/data-landing-zone.ManagementStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="@DataChefHQ/data-landing-zone.ManagementStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="@DataChefHQ/data-landing-zone.ManagementStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="@DataChefHQ/data-landing-zone.ManagementStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@DataChefHQ/data-landing-zone.ManagementStack.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="@DataChefHQ/data-landing-zone.ManagementStack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.ManagementStack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### WorkloadGlobalNetworkConnectionsPhase1Stack <a name="WorkloadGlobalNetworkConnectionsPhase1Stack" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.Initializer"></a>

```typescript
import { WorkloadGlobalNetworkConnectionsPhase1Stack } from '@DataChefHQ/data-landing-zone'

new WorkloadGlobalNetworkConnectionsPhase1Stack(scope: Construct, workloadAccountProps: WorkloadAccountProps, props: DataLandingZoneProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.Initializer.parameter.workloadAccountProps">workloadAccountProps</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.WorkloadAccountProps">WorkloadAccountProps</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `workloadAccountProps`<sup>Required</sup> <a name="workloadAccountProps" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.Initializer.parameter.workloadAccountProps"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.WorkloadAccountProps">WorkloadAccountProps</a>

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.resourceName">resourceName</a></code> | Create unique ResourceNames. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.createPeeringRole">createPeeringRole</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.addTransform"></a>

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


###### `transform`<sup>Required</sup> <a name="transform" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.exportStringListValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.exportValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.formatArn"></a>

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

###### `components`<sup>Required</sup> <a name="components" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.getLogicalId"></a>

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

###### `element`<sup>Required</sup> <a name="element" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.regionalFact"></a>

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

###### `factName`<sup>Required</sup> <a name="factName" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

##### `createPeeringRole` <a name="createPeeringRole" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.createPeeringRole"></a>

```typescript
public createPeeringRole(from: DlzAccountNetwork, to: DlzAccountNetwork): void
```

###### `from`<sup>Required</sup> <a name="from" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.createPeeringRole.parameter.from"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzAccountNetwork">DlzAccountNetwork</a>

---

###### `to`<sup>Required</sup> <a name="to" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.createPeeringRole.parameter.to"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzAccountNetwork">DlzAccountNetwork</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.isConstruct"></a>

```typescript
import { WorkloadGlobalNetworkConnectionsPhase1Stack } from '@DataChefHQ/data-landing-zone'

WorkloadGlobalNetworkConnectionsPhase1Stack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.isStack"></a>

```typescript
import { WorkloadGlobalNetworkConnectionsPhase1Stack } from '@DataChefHQ/data-landing-zone'

WorkloadGlobalNetworkConnectionsPhase1Stack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.of"></a>

```typescript
import { WorkloadGlobalNetworkConnectionsPhase1Stack } from '@DataChefHQ/data-landing-zone'

WorkloadGlobalNetworkConnectionsPhase1Stack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.accountId">accountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.account"></a>

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

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.availabilityZones"></a>

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

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.environment"></a>

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

##### `nested`<sup>Required</sup> <a name="nested" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.region"></a>

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

##### `stackId`<sup>Required</sup> <a name="stackId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.stackId"></a>

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


##### `stackName`<sup>Required</sup> <a name="stackName" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.stackName"></a>

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

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### WorkloadGlobalNetworkConnectionsPhase2Stack <a name="WorkloadGlobalNetworkConnectionsPhase2Stack" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.Initializer"></a>

```typescript
import { WorkloadGlobalNetworkConnectionsPhase2Stack } from '@DataChefHQ/data-landing-zone'

new WorkloadGlobalNetworkConnectionsPhase2Stack(scope: Construct, workloadAccountProps: WorkloadAccountProps, props: DataLandingZoneProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.Initializer.parameter.workloadAccountProps">workloadAccountProps</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.WorkloadAccountProps">WorkloadAccountProps</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `workloadAccountProps`<sup>Required</sup> <a name="workloadAccountProps" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.Initializer.parameter.workloadAccountProps"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.WorkloadAccountProps">WorkloadAccountProps</a>

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.resourceName">resourceName</a></code> | Create unique ResourceNames. |

---

##### `toString` <a name="toString" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.addTransform"></a>

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


###### `transform`<sup>Required</sup> <a name="transform" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.exportStringListValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.exportValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.formatArn"></a>

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

###### `components`<sup>Required</sup> <a name="components" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.getLogicalId"></a>

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

###### `element`<sup>Required</sup> <a name="element" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.regionalFact"></a>

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

###### `factName`<sup>Required</sup> <a name="factName" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.isConstruct"></a>

```typescript
import { WorkloadGlobalNetworkConnectionsPhase2Stack } from '@DataChefHQ/data-landing-zone'

WorkloadGlobalNetworkConnectionsPhase2Stack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.isStack"></a>

```typescript
import { WorkloadGlobalNetworkConnectionsPhase2Stack } from '@DataChefHQ/data-landing-zone'

WorkloadGlobalNetworkConnectionsPhase2Stack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.of"></a>

```typescript
import { WorkloadGlobalNetworkConnectionsPhase2Stack } from '@DataChefHQ/data-landing-zone'

WorkloadGlobalNetworkConnectionsPhase2Stack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.accountId">accountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.account"></a>

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

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.availabilityZones"></a>

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

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.environment"></a>

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

##### `nested`<sup>Required</sup> <a name="nested" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.region"></a>

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

##### `stackId`<sup>Required</sup> <a name="stackId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.stackId"></a>

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


##### `stackName`<sup>Required</sup> <a name="stackName" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.stackName"></a>

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

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### WorkloadGlobalNetworkConnectionsPhase3Stack <a name="WorkloadGlobalNetworkConnectionsPhase3Stack" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.Initializer"></a>

```typescript
import { WorkloadGlobalNetworkConnectionsPhase3Stack } from '@DataChefHQ/data-landing-zone'

new WorkloadGlobalNetworkConnectionsPhase3Stack(scope: Construct, workloadAccountProps: WorkloadAccountProps, props: DataLandingZoneProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.Initializer.parameter.workloadAccountProps">workloadAccountProps</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.WorkloadAccountProps">WorkloadAccountProps</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `workloadAccountProps`<sup>Required</sup> <a name="workloadAccountProps" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.Initializer.parameter.workloadAccountProps"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.WorkloadAccountProps">WorkloadAccountProps</a>

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.resourceName">resourceName</a></code> | Create unique ResourceNames. |

---

##### `toString` <a name="toString" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.addTransform"></a>

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


###### `transform`<sup>Required</sup> <a name="transform" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.exportStringListValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.exportValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.formatArn"></a>

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

###### `components`<sup>Required</sup> <a name="components" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.getLogicalId"></a>

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

###### `element`<sup>Required</sup> <a name="element" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.regionalFact"></a>

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

###### `factName`<sup>Required</sup> <a name="factName" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.isConstruct"></a>

```typescript
import { WorkloadGlobalNetworkConnectionsPhase3Stack } from '@DataChefHQ/data-landing-zone'

WorkloadGlobalNetworkConnectionsPhase3Stack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.isStack"></a>

```typescript
import { WorkloadGlobalNetworkConnectionsPhase3Stack } from '@DataChefHQ/data-landing-zone'

WorkloadGlobalNetworkConnectionsPhase3Stack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.of"></a>

```typescript
import { WorkloadGlobalNetworkConnectionsPhase3Stack } from '@DataChefHQ/data-landing-zone'

WorkloadGlobalNetworkConnectionsPhase3Stack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.accountId">accountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.account"></a>

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

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.availabilityZones"></a>

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

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.environment"></a>

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

##### `nested`<sup>Required</sup> <a name="nested" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.region"></a>

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

##### `stackId`<sup>Required</sup> <a name="stackId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.stackId"></a>

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


##### `stackName`<sup>Required</sup> <a name="stackName" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.stackName"></a>

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

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### WorkloadGlobalStack <a name="WorkloadGlobalStack" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.Initializer"></a>

```typescript
import { WorkloadGlobalStack } from '@DataChefHQ/data-landing-zone'

new WorkloadGlobalStack(scope: Construct, workloadAccountProps: WorkloadAccountProps, props: DataLandingZoneProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.Initializer.parameter.workloadAccountProps">workloadAccountProps</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.WorkloadAccountProps">WorkloadAccountProps</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `workloadAccountProps`<sup>Required</sup> <a name="workloadAccountProps" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.Initializer.parameter.workloadAccountProps"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.WorkloadAccountProps">WorkloadAccountProps</a>

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.resourceName">resourceName</a></code> | Create unique ResourceNames. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.defaultNotifications">defaultNotifications</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.ssmAssumeCrossAccountRole">ssmAssumeCrossAccountRole</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.addTransform"></a>

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


###### `transform`<sup>Required</sup> <a name="transform" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.exportStringListValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.exportValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.formatArn"></a>

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

###### `components`<sup>Required</sup> <a name="components" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.getLogicalId"></a>

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

###### `element`<sup>Required</sup> <a name="element" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.regionalFact"></a>

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

###### `factName`<sup>Required</sup> <a name="factName" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

##### `defaultNotifications` <a name="defaultNotifications" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.defaultNotifications"></a>

```typescript
public defaultNotifications(): void
```

##### `ssmAssumeCrossAccountRole` <a name="ssmAssumeCrossAccountRole" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.ssmAssumeCrossAccountRole"></a>

```typescript
public ssmAssumeCrossAccountRole(): void
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.isConstruct"></a>

```typescript
import { WorkloadGlobalStack } from '@DataChefHQ/data-landing-zone'

WorkloadGlobalStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.isStack"></a>

```typescript
import { WorkloadGlobalStack } from '@DataChefHQ/data-landing-zone'

WorkloadGlobalStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.of"></a>

```typescript
import { WorkloadGlobalStack } from '@DataChefHQ/data-landing-zone'

WorkloadGlobalStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.accountId">accountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.defaultPolicyStatement">defaultPolicyStatement</a></code> | <code>aws-cdk-lib.aws_iam.PolicyStatementProps</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.account"></a>

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

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.availabilityZones"></a>

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

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.environment"></a>

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

##### `nested`<sup>Required</sup> <a name="nested" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.region"></a>

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

##### `stackId`<sup>Required</sup> <a name="stackId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.stackId"></a>

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


##### `stackName`<sup>Required</sup> <a name="stackName" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.stackName"></a>

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

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `defaultPolicyStatement`<sup>Required</sup> <a name="defaultPolicyStatement" id="@DataChefHQ/data-landing-zone.WorkloadGlobalStack.property.defaultPolicyStatement"></a>

```typescript
public readonly defaultPolicyStatement: PolicyStatementProps;
```

- *Type:* aws-cdk-lib.aws_iam.PolicyStatementProps

---


### WorkloadRegionalNetworkConnectionsPhase2Stack <a name="WorkloadRegionalNetworkConnectionsPhase2Stack" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.Initializer"></a>

```typescript
import { WorkloadRegionalNetworkConnectionsPhase2Stack } from '@DataChefHQ/data-landing-zone'

new WorkloadRegionalNetworkConnectionsPhase2Stack(scope: Construct, workloadAccountProps: WorkloadAccountProps, props: DataLandingZoneProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.Initializer.parameter.workloadAccountProps">workloadAccountProps</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.WorkloadAccountProps">WorkloadAccountProps</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `workloadAccountProps`<sup>Required</sup> <a name="workloadAccountProps" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.Initializer.parameter.workloadAccountProps"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.WorkloadAccountProps">WorkloadAccountProps</a>

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.resourceName">resourceName</a></code> | Create unique ResourceNames. |

---

##### `toString` <a name="toString" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.addTransform"></a>

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


###### `transform`<sup>Required</sup> <a name="transform" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.exportStringListValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.exportValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.formatArn"></a>

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

###### `components`<sup>Required</sup> <a name="components" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.getLogicalId"></a>

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

###### `element`<sup>Required</sup> <a name="element" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.regionalFact"></a>

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

###### `factName`<sup>Required</sup> <a name="factName" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.isConstruct"></a>

```typescript
import { WorkloadRegionalNetworkConnectionsPhase2Stack } from '@DataChefHQ/data-landing-zone'

WorkloadRegionalNetworkConnectionsPhase2Stack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.isStack"></a>

```typescript
import { WorkloadRegionalNetworkConnectionsPhase2Stack } from '@DataChefHQ/data-landing-zone'

WorkloadRegionalNetworkConnectionsPhase2Stack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.of"></a>

```typescript
import { WorkloadRegionalNetworkConnectionsPhase2Stack } from '@DataChefHQ/data-landing-zone'

WorkloadRegionalNetworkConnectionsPhase2Stack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.accountId">accountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.account"></a>

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

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.availabilityZones"></a>

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

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.environment"></a>

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

##### `nested`<sup>Required</sup> <a name="nested" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.region"></a>

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

##### `stackId`<sup>Required</sup> <a name="stackId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.stackId"></a>

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


##### `stackName`<sup>Required</sup> <a name="stackName" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.stackName"></a>

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

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### WorkloadRegionalNetworkConnectionsPhase3Stack <a name="WorkloadRegionalNetworkConnectionsPhase3Stack" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.Initializer"></a>

```typescript
import { WorkloadRegionalNetworkConnectionsPhase3Stack } from '@DataChefHQ/data-landing-zone'

new WorkloadRegionalNetworkConnectionsPhase3Stack(scope: Construct, workloadAccountProps: WorkloadAccountProps, props: DataLandingZoneProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.Initializer.parameter.workloadAccountProps">workloadAccountProps</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.WorkloadAccountProps">WorkloadAccountProps</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `workloadAccountProps`<sup>Required</sup> <a name="workloadAccountProps" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.Initializer.parameter.workloadAccountProps"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.WorkloadAccountProps">WorkloadAccountProps</a>

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.resourceName">resourceName</a></code> | Create unique ResourceNames. |

---

##### `toString` <a name="toString" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.addTransform"></a>

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


###### `transform`<sup>Required</sup> <a name="transform" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.exportStringListValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.exportValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.formatArn"></a>

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

###### `components`<sup>Required</sup> <a name="components" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.getLogicalId"></a>

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

###### `element`<sup>Required</sup> <a name="element" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.regionalFact"></a>

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

###### `factName`<sup>Required</sup> <a name="factName" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.isConstruct"></a>

```typescript
import { WorkloadRegionalNetworkConnectionsPhase3Stack } from '@DataChefHQ/data-landing-zone'

WorkloadRegionalNetworkConnectionsPhase3Stack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.isStack"></a>

```typescript
import { WorkloadRegionalNetworkConnectionsPhase3Stack } from '@DataChefHQ/data-landing-zone'

WorkloadRegionalNetworkConnectionsPhase3Stack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.of"></a>

```typescript
import { WorkloadRegionalNetworkConnectionsPhase3Stack } from '@DataChefHQ/data-landing-zone'

WorkloadRegionalNetworkConnectionsPhase3Stack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.accountId">accountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.account"></a>

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

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.availabilityZones"></a>

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

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.environment"></a>

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

##### `nested`<sup>Required</sup> <a name="nested" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.region"></a>

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

##### `stackId`<sup>Required</sup> <a name="stackId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.stackId"></a>

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


##### `stackName`<sup>Required</sup> <a name="stackName" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.stackName"></a>

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

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### WorkloadRegionalStack <a name="WorkloadRegionalStack" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.Initializer"></a>

```typescript
import { WorkloadRegionalStack } from '@DataChefHQ/data-landing-zone'

new WorkloadRegionalStack(scope: Construct, workloadAccountProps: WorkloadAccountProps, props: DataLandingZoneProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.Initializer.parameter.workloadAccountProps">workloadAccountProps</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.WorkloadAccountProps">WorkloadAccountProps</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `workloadAccountProps`<sup>Required</sup> <a name="workloadAccountProps" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.Initializer.parameter.workloadAccountProps"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.WorkloadAccountProps">WorkloadAccountProps</a>

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.resourceName">resourceName</a></code> | Create unique ResourceNames. |

---

##### `toString` <a name="toString" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.addTransform"></a>

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


###### `transform`<sup>Required</sup> <a name="transform" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.exportStringListValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.exportValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.formatArn"></a>

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

###### `components`<sup>Required</sup> <a name="components" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.getLogicalId"></a>

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

###### `element`<sup>Required</sup> <a name="element" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.regionalFact"></a>

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

###### `factName`<sup>Required</sup> <a name="factName" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `resourceName` <a name="resourceName" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.resourceName"></a>

```typescript
public resourceName(resourceId: string): string
```

Create unique ResourceNames.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.resourceName.parameter.resourceId"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.isConstruct"></a>

```typescript
import { WorkloadRegionalStack } from '@DataChefHQ/data-landing-zone'

WorkloadRegionalStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.isStack"></a>

```typescript
import { WorkloadRegionalStack } from '@DataChefHQ/data-landing-zone'

WorkloadRegionalStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.of"></a>

```typescript
import { WorkloadRegionalStack } from '@DataChefHQ/data-landing-zone'

WorkloadRegionalStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.accountId">accountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.account"></a>

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

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.availabilityZones"></a>

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

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.environment"></a>

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

##### `nested`<sup>Required</sup> <a name="nested" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.region"></a>

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

##### `stackId`<sup>Required</sup> <a name="stackId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.stackId"></a>

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


##### `stackName`<sup>Required</sup> <a name="stackName" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.stackName"></a>

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

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.WorkloadRegionalStack.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### AuditStacks <a name="AuditStacks" id="@DataChefHQ/data-landing-zone.AuditStacks"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.AuditStacks.Initializer"></a>

```typescript
import { AuditStacks } from '@DataChefHQ/data-landing-zone'

const auditStacks: AuditStacks = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditStacks.property.global">global</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack">AuditGlobalStack</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.AuditStacks.property.regional">regional</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack">AuditRegionalStack</a>[]</code> | *No description.* |

---

##### `global`<sup>Required</sup> <a name="global" id="@DataChefHQ/data-landing-zone.AuditStacks.property.global"></a>

```typescript
public readonly global: AuditGlobalStack;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.AuditGlobalStack">AuditGlobalStack</a>

---

##### `regional`<sup>Required</sup> <a name="regional" id="@DataChefHQ/data-landing-zone.AuditStacks.property.regional"></a>

```typescript
public readonly regional: AuditRegionalStack[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.AuditRegionalStack">AuditRegionalStack</a>[]

---

### BastionHost <a name="BastionHost" id="@DataChefHQ/data-landing-zone.BastionHost"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.BastionHost.Initializer"></a>

```typescript
import { BastionHost } from '@DataChefHQ/data-landing-zone'

const bastionHost: BastionHost = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.BastionHost.property.instanceType">instanceType</a></code> | <code>aws-cdk-lib.aws_ec2.InstanceType</code> | The bastion instance EC2 type. |
| <code><a href="#@DataChefHQ/data-landing-zone.BastionHost.property.location">location</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress">NetworkAddress</a></code> | The location where the Bastion will exist. |
| <code><a href="#@DataChefHQ/data-landing-zone.BastionHost.property.name">name</a></code> | <code>string</code> | The name of the Bastion, defaults to 'default', specify the name if there are more than one per account. |

---

##### `instanceType`<sup>Required</sup> <a name="instanceType" id="@DataChefHQ/data-landing-zone.BastionHost.property.instanceType"></a>

```typescript
public readonly instanceType: InstanceType;
```

- *Type:* aws-cdk-lib.aws_ec2.InstanceType

The bastion instance EC2 type.

---

##### `location`<sup>Required</sup> <a name="location" id="@DataChefHQ/data-landing-zone.BastionHost.property.location"></a>

```typescript
public readonly location: NetworkAddress;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkAddress">NetworkAddress</a>

The location where the Bastion will exist.

The network address must target a specific subnet

---

##### `name`<sup>Optional</sup> <a name="name" id="@DataChefHQ/data-landing-zone.BastionHost.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the Bastion, defaults to 'default', specify the name if there are more than one per account.

---

### BudgetProps <a name="BudgetProps" id="@DataChefHQ/data-landing-zone.BudgetProps"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.BudgetProps.Initializer"></a>

```typescript
import { BudgetProps } from '@DataChefHQ/data-landing-zone'

const budgetProps: BudgetProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.BudgetProps.property.amount">amount</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.BudgetProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.BudgetProps.property.subscribers">subscribers</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.BudgetSubscribers">BudgetSubscribers</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.BudgetProps.property.forTags">forTags</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |

---

##### `amount`<sup>Required</sup> <a name="amount" id="@DataChefHQ/data-landing-zone.BudgetProps.property.amount"></a>

```typescript
public readonly amount: number;
```

- *Type:* number

---

##### `name`<sup>Required</sup> <a name="name" id="@DataChefHQ/data-landing-zone.BudgetProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `subscribers`<sup>Required</sup> <a name="subscribers" id="@DataChefHQ/data-landing-zone.BudgetProps.property.subscribers"></a>

```typescript
public readonly subscribers: BudgetSubscribers;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.BudgetSubscribers">BudgetSubscribers</a>

---

##### `forTags`<sup>Optional</sup> <a name="forTags" id="@DataChefHQ/data-landing-zone.BudgetProps.property.forTags"></a>

```typescript
public readonly forTags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

### BudgetSubscribers <a name="BudgetSubscribers" id="@DataChefHQ/data-landing-zone.BudgetSubscribers"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.BudgetSubscribers.Initializer"></a>

```typescript
import { BudgetSubscribers } from '@DataChefHQ/data-landing-zone'

const budgetSubscribers: BudgetSubscribers = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.BudgetSubscribers.property.emails">emails</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.BudgetSubscribers.property.slack">slack</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.SlackChannel">SlackChannel</a></code> | *No description.* |

---

##### `emails`<sup>Optional</sup> <a name="emails" id="@DataChefHQ/data-landing-zone.BudgetSubscribers.property.emails"></a>

```typescript
public readonly emails: string[];
```

- *Type:* string[]

---

##### `slack`<sup>Optional</sup> <a name="slack" id="@DataChefHQ/data-landing-zone.BudgetSubscribers.property.slack"></a>

```typescript
public readonly slack: SlackChannel;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.SlackChannel">SlackChannel</a>

---

### DataLandingZoneProps <a name="DataLandingZoneProps" id="@DataChefHQ/data-landing-zone.DataLandingZoneProps"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.DataLandingZoneProps.Initializer"></a>

```typescript
import { DataLandingZoneProps } from '@DataChefHQ/data-landing-zone'

const dataLandingZoneProps: DataLandingZoneProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.budgets">budgets</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.BudgetProps">BudgetProps</a>[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.localProfile">localProfile</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.mandatoryTags">mandatoryTags</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.MandatoryTags">MandatoryTags</a></code> | The values of the mandatory tags that all resources must have. |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.organization">organization</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DLzOrganization">DLzOrganization</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.regions">regions</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzRegions">DlzRegions</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.securityHubNotifications">securityHubNotifications</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.SecurityHubNotification">SecurityHubNotification</a>[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.additionalMandatoryTags">additionalMandatoryTags</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzTag">DlzTag</a>[]</code> | List of additional mandatory tags that all resources must have. Not all resources support tags, this is a best-effort. |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.defaultNotification">defaultNotification</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NotificationDetailsProps">NotificationDetailsProps</a></code> | Default notification settings for the organization. |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.denyServiceList">denyServiceList</a></code> | <code>string[]</code> | List of services to deny in the organization SCP. |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.deploymentPlatform">deploymentPlatform</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DeploymentPlatform">DeploymentPlatform</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.iamIdentityCenter">iamIdentityCenter</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterProps">IamIdentityCenterProps</a></code> | IAM Identity Center configuration. |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.iamPolicyPermissionBoundary">iamPolicyPermissionBoundary</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.IamPolicyPermissionsBoundaryProps">IamPolicyPermissionsBoundaryProps</a></code> | IAM Policy Permission Boundary. |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.network">network</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.Network">Network</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.printDeploymentOrder">printDeploymentOrder</a></code> | <code>boolean</code> | Print the deployment order to the console. |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.printReport">printReport</a></code> | <code>boolean</code> | Print the report grouped by account, type and aggregated regions to the console. |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.saveReport">saveReport</a></code> | <code>boolean</code> | Save the raw report items and the reports grouped by account to a `./.dlz-reports` folder. |

---

##### `budgets`<sup>Required</sup> <a name="budgets" id="@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.budgets"></a>

```typescript
public readonly budgets: BudgetProps[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.BudgetProps">BudgetProps</a>[]

---

##### `localProfile`<sup>Required</sup> <a name="localProfile" id="@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.localProfile"></a>

```typescript
public readonly localProfile: string;
```

- *Type:* string

---

##### `mandatoryTags`<sup>Required</sup> <a name="mandatoryTags" id="@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.mandatoryTags"></a>

```typescript
public readonly mandatoryTags: MandatoryTags;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.MandatoryTags">MandatoryTags</a>

The values of the mandatory tags that all resources must have.

The following values are already specified and used by the DLZ constructs
- Owner: [infra]
- Project: [dlz]
- Environment: [dlz]

---

##### `organization`<sup>Required</sup> <a name="organization" id="@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.organization"></a>

```typescript
public readonly organization: DLzOrganization;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DLzOrganization">DLzOrganization</a>

---

##### `regions`<sup>Required</sup> <a name="regions" id="@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.regions"></a>

```typescript
public readonly regions: DlzRegions;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzRegions">DlzRegions</a>

---

##### `securityHubNotifications`<sup>Required</sup> <a name="securityHubNotifications" id="@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.securityHubNotifications"></a>

```typescript
public readonly securityHubNotifications: SecurityHubNotification[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.SecurityHubNotification">SecurityHubNotification</a>[]

---

##### `additionalMandatoryTags`<sup>Optional</sup> <a name="additionalMandatoryTags" id="@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.additionalMandatoryTags"></a>

```typescript
public readonly additionalMandatoryTags: DlzTag[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzTag">DlzTag</a>[]
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

##### `defaultNotification`<sup>Optional</sup> <a name="defaultNotification" id="@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.defaultNotification"></a>

```typescript
public readonly defaultNotification: NotificationDetailsProps;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NotificationDetailsProps">NotificationDetailsProps</a>

Default notification settings for the organization.

Allows you to define the
email notfication settings or slack channel settings. If the account level defaultNotification
is defined those will be used for the account instead of this defaultNotification which
acts as the fallback.

---

##### `denyServiceList`<sup>Optional</sup> <a name="denyServiceList" id="@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.denyServiceList"></a>

```typescript
public readonly denyServiceList: string[];
```

- *Type:* string[]
- *Default:* DataLandingZone.defaultDenyServiceList()

List of services to deny in the organization SCP.

If not specified, the default defined by

---

##### `deploymentPlatform`<sup>Optional</sup> <a name="deploymentPlatform" id="@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.deploymentPlatform"></a>

```typescript
public readonly deploymentPlatform: DeploymentPlatform;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DeploymentPlatform">DeploymentPlatform</a>

---

##### `iamIdentityCenter`<sup>Optional</sup> <a name="iamIdentityCenter" id="@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.iamIdentityCenter"></a>

```typescript
public readonly iamIdentityCenter: IamIdentityCenterProps;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterProps">IamIdentityCenterProps</a>

IAM Identity Center configuration.

---

##### `iamPolicyPermissionBoundary`<sup>Optional</sup> <a name="iamPolicyPermissionBoundary" id="@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.iamPolicyPermissionBoundary"></a>

```typescript
public readonly iamPolicyPermissionBoundary: IamPolicyPermissionsBoundaryProps;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.IamPolicyPermissionsBoundaryProps">IamPolicyPermissionsBoundaryProps</a>

IAM Policy Permission Boundary.

---

##### `network`<sup>Optional</sup> <a name="network" id="@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.network"></a>

```typescript
public readonly network: Network;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.Network">Network</a>

---

##### `printDeploymentOrder`<sup>Optional</sup> <a name="printDeploymentOrder" id="@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.printDeploymentOrder"></a>

```typescript
public readonly printDeploymentOrder: boolean;
```

- *Type:* boolean
- *Default:* true

Print the deployment order to the console.

---

##### `printReport`<sup>Optional</sup> <a name="printReport" id="@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.printReport"></a>

```typescript
public readonly printReport: boolean;
```

- *Type:* boolean
- *Default:* true

Print the report grouped by account, type and aggregated regions to the console.

---

##### `saveReport`<sup>Optional</sup> <a name="saveReport" id="@DataChefHQ/data-landing-zone.DataLandingZoneProps.property.saveReport"></a>

```typescript
public readonly saveReport: boolean;
```

- *Type:* boolean
- *Default:* true

Save the raw report items and the reports grouped by account to a `./.dlz-reports` folder.

---

### DeploymentPlatform <a name="DeploymentPlatform" id="@DataChefHQ/data-landing-zone.DeploymentPlatform"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.DeploymentPlatform.Initializer"></a>

```typescript
import { DeploymentPlatform } from '@DataChefHQ/data-landing-zone'

const deploymentPlatform: DeploymentPlatform = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DeploymentPlatform.property.gitHub">gitHub</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DeploymentPlatformGitHub">DeploymentPlatformGitHub</a></code> | *No description.* |

---

##### `gitHub`<sup>Optional</sup> <a name="gitHub" id="@DataChefHQ/data-landing-zone.DeploymentPlatform.property.gitHub"></a>

```typescript
public readonly gitHub: DeploymentPlatformGitHub;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DeploymentPlatformGitHub">DeploymentPlatformGitHub</a>

---

### DeploymentPlatformGitHub <a name="DeploymentPlatformGitHub" id="@DataChefHQ/data-landing-zone.DeploymentPlatformGitHub"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.DeploymentPlatformGitHub.Initializer"></a>

```typescript
import { DeploymentPlatformGitHub } from '@DataChefHQ/data-landing-zone'

const deploymentPlatformGitHub: DeploymentPlatformGitHub = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DeploymentPlatformGitHub.property.references">references</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.GitHubReference">GitHubReference</a>[]</code> | *No description.* |

---

##### `references`<sup>Required</sup> <a name="references" id="@DataChefHQ/data-landing-zone.DeploymentPlatformGitHub.property.references"></a>

```typescript
public readonly references: GitHubReference[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.GitHubReference">GitHubReference</a>[]

---

### DLzAccount <a name="DLzAccount" id="@DataChefHQ/data-landing-zone.DLzAccount"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.DLzAccount.Initializer"></a>

```typescript
import { DLzAccount } from '@DataChefHQ/data-landing-zone'

const dLzAccount: DLzAccount = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DLzAccount.property.accountId">accountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DLzAccount.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DLzAccount.property.type">type</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzAccountType">DlzAccountType</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DLzAccount.property.defaultNotification">defaultNotification</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NotificationDetailsProps">NotificationDetailsProps</a></code> | Default notifications settings for the account. |
| <code><a href="#@DataChefHQ/data-landing-zone.DLzAccount.property.vpcs">vpcs</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzVpcProps">DlzVpcProps</a>[]</code> | *No description.* |

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@DataChefHQ/data-landing-zone.DLzAccount.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="@DataChefHQ/data-landing-zone.DLzAccount.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `type`<sup>Required</sup> <a name="type" id="@DataChefHQ/data-landing-zone.DLzAccount.property.type"></a>

```typescript
public readonly type: DlzAccountType;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzAccountType">DlzAccountType</a>

---

##### `defaultNotification`<sup>Optional</sup> <a name="defaultNotification" id="@DataChefHQ/data-landing-zone.DLzAccount.property.defaultNotification"></a>

```typescript
public readonly defaultNotification: NotificationDetailsProps;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NotificationDetailsProps">NotificationDetailsProps</a>

Default notifications settings for the account.

Defines settings for email notifications or the slack channel details.
This will override the organization level defaultNotification.

---

##### `vpcs`<sup>Optional</sup> <a name="vpcs" id="@DataChefHQ/data-landing-zone.DLzAccount.property.vpcs"></a>

```typescript
public readonly vpcs: DlzVpcProps[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzVpcProps">DlzVpcProps</a>[]

---

### DlzAccountNetwork <a name="DlzAccountNetwork" id="@DataChefHQ/data-landing-zone.DlzAccountNetwork"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.DlzAccountNetwork.Initializer"></a>

```typescript
import { DlzAccountNetwork } from '@DataChefHQ/data-landing-zone'

const dlzAccountNetwork: DlzAccountNetwork = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzAccountNetwork.property.dlzAccount">dlzAccount</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DLzAccount">DLzAccount</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzAccountNetwork.property.vpcs">vpcs</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NetworkEntityVpc">NetworkEntityVpc</a>[]</code> | *No description.* |

---

##### `dlzAccount`<sup>Required</sup> <a name="dlzAccount" id="@DataChefHQ/data-landing-zone.DlzAccountNetwork.property.dlzAccount"></a>

```typescript
public readonly dlzAccount: DLzAccount;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DLzAccount">DLzAccount</a>

---

##### `vpcs`<sup>Required</sup> <a name="vpcs" id="@DataChefHQ/data-landing-zone.DlzAccountNetwork.property.vpcs"></a>

```typescript
public readonly vpcs: NetworkEntityVpc[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkEntityVpc">NetworkEntityVpc</a>[]

---

### DlzControlTowerControlIdNameProps <a name="DlzControlTowerControlIdNameProps" id="@DataChefHQ/data-landing-zone.DlzControlTowerControlIdNameProps"></a>

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Do not export any of the controls in the folders, they do not conform to JSII, class names are snake case caps and the controlIdName properties are also snake case caps. This will cause the JSII build to fail. !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.DlzControlTowerControlIdNameProps.Initializer"></a>

```typescript
import { DlzControlTowerControlIdNameProps } from '@DataChefHQ/data-landing-zone'

const dlzControlTowerControlIdNameProps: DlzControlTowerControlIdNameProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerControlIdNameProps.property.euWest1">euWest1</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerControlIdNameProps.property.usEast1">usEast1</a></code> | <code>string</code> | *No description.* |

---

##### `euWest1`<sup>Required</sup> <a name="euWest1" id="@DataChefHQ/data-landing-zone.DlzControlTowerControlIdNameProps.property.euWest1"></a>

```typescript
public readonly euWest1: string;
```

- *Type:* string

---

##### `usEast1`<sup>Required</sup> <a name="usEast1" id="@DataChefHQ/data-landing-zone.DlzControlTowerControlIdNameProps.property.usEast1"></a>

```typescript
public readonly usEast1: string;
```

- *Type:* string

---

### DlzControlTowerEnabledControlProps <a name="DlzControlTowerEnabledControlProps" id="@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControlProps"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControlProps.Initializer"></a>

```typescript
import { DlzControlTowerEnabledControlProps } from '@DataChefHQ/data-landing-zone'

const dlzControlTowerEnabledControlProps: DlzControlTowerEnabledControlProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControlProps.property.appliedOu">appliedOu</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControlProps.property.control">control</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.IDlzControlTowerControl">IDlzControlTowerControl</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControlProps.property.controlTowerAccountId">controlTowerAccountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControlProps.property.controlTowerRegion">controlTowerRegion</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.Region">Region</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControlProps.property.organizationId">organizationId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControlProps.property.tags">tags</a></code> | <code>aws-cdk-lib.CfnTag[]</code> | *No description.* |

---

##### `appliedOu`<sup>Required</sup> <a name="appliedOu" id="@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControlProps.property.appliedOu"></a>

```typescript
public readonly appliedOu: string;
```

- *Type:* string

---

##### `control`<sup>Required</sup> <a name="control" id="@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControlProps.property.control"></a>

```typescript
public readonly control: IDlzControlTowerControl;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.IDlzControlTowerControl">IDlzControlTowerControl</a>

---

##### `controlTowerAccountId`<sup>Required</sup> <a name="controlTowerAccountId" id="@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControlProps.property.controlTowerAccountId"></a>

```typescript
public readonly controlTowerAccountId: string;
```

- *Type:* string

---

##### `controlTowerRegion`<sup>Required</sup> <a name="controlTowerRegion" id="@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControlProps.property.controlTowerRegion"></a>

```typescript
public readonly controlTowerRegion: Region;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.Region">Region</a>

---

##### `organizationId`<sup>Required</sup> <a name="organizationId" id="@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControlProps.property.organizationId"></a>

```typescript
public readonly organizationId: string;
```

- *Type:* string

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControlProps.property.tags"></a>

```typescript
public readonly tags: CfnTag[];
```

- *Type:* aws-cdk-lib.CfnTag[]

---

### DLzManagementAccount <a name="DLzManagementAccount" id="@DataChefHQ/data-landing-zone.DLzManagementAccount"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.DLzManagementAccount.Initializer"></a>

```typescript
import { DLzManagementAccount } from '@DataChefHQ/data-landing-zone'

const dLzManagementAccount: DLzManagementAccount = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DLzManagementAccount.property.accountId">accountId</a></code> | <code>string</code> | *No description.* |

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@DataChefHQ/data-landing-zone.DLzManagementAccount.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

---

### DLzOrganization <a name="DLzOrganization" id="@DataChefHQ/data-landing-zone.DLzOrganization"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.DLzOrganization.Initializer"></a>

```typescript
import { DLzOrganization } from '@DataChefHQ/data-landing-zone'

const dLzOrganization: DLzOrganization = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DLzOrganization.property.organizationId">organizationId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DLzOrganization.property.ous">ous</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.OrgOus">OrgOus</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DLzOrganization.property.root">root</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.RootOptions">RootOptions</a></code> | *No description.* |

---

##### `organizationId`<sup>Required</sup> <a name="organizationId" id="@DataChefHQ/data-landing-zone.DLzOrganization.property.organizationId"></a>

```typescript
public readonly organizationId: string;
```

- *Type:* string

---

##### `ous`<sup>Required</sup> <a name="ous" id="@DataChefHQ/data-landing-zone.DLzOrganization.property.ous"></a>

```typescript
public readonly ous: OrgOus;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.OrgOus">OrgOus</a>

---

##### `root`<sup>Required</sup> <a name="root" id="@DataChefHQ/data-landing-zone.DLzOrganization.property.root"></a>

```typescript
public readonly root: RootOptions;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.RootOptions">RootOptions</a>

---

### DlzRegions <a name="DlzRegions" id="@DataChefHQ/data-landing-zone.DlzRegions"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.DlzRegions.Initializer"></a>

```typescript
import { DlzRegions } from '@DataChefHQ/data-landing-zone'

const dlzRegions: DlzRegions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzRegions.property.global">global</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.Region">Region</a></code> | Also known as the Home region for Control Tower. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzRegions.property.regional">regional</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.Region">Region</a>[]</code> | The other regions to support (do not specify the global region again). |

---

##### `global`<sup>Required</sup> <a name="global" id="@DataChefHQ/data-landing-zone.DlzRegions.property.global"></a>

```typescript
public readonly global: Region;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.Region">Region</a>

Also known as the Home region for Control Tower.

---

##### `regional`<sup>Required</sup> <a name="regional" id="@DataChefHQ/data-landing-zone.DlzRegions.property.regional"></a>

```typescript
public readonly regional: Region[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.Region">Region</a>[]

The other regions to support (do not specify the global region again).

---

### DlzServiceControlPolicyProps <a name="DlzServiceControlPolicyProps" id="@DataChefHQ/data-landing-zone.DlzServiceControlPolicyProps"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.DlzServiceControlPolicyProps.Initializer"></a>

```typescript
import { DlzServiceControlPolicyProps } from '@DataChefHQ/data-landing-zone'

const dlzServiceControlPolicyProps: DlzServiceControlPolicyProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzServiceControlPolicyProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzServiceControlPolicyProps.property.statements">statements</a></code> | <code>aws-cdk-lib.aws_iam.PolicyStatement[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzServiceControlPolicyProps.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzServiceControlPolicyProps.property.tags">tags</a></code> | <code>aws-cdk-lib.CfnTag[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzServiceControlPolicyProps.property.targetIds">targetIds</a></code> | <code>string[]</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="@DataChefHQ/data-landing-zone.DlzServiceControlPolicyProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `statements`<sup>Required</sup> <a name="statements" id="@DataChefHQ/data-landing-zone.DlzServiceControlPolicyProps.property.statements"></a>

```typescript
public readonly statements: PolicyStatement[];
```

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement[]

---

##### `description`<sup>Optional</sup> <a name="description" id="@DataChefHQ/data-landing-zone.DlzServiceControlPolicyProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@DataChefHQ/data-landing-zone.DlzServiceControlPolicyProps.property.tags"></a>

```typescript
public readonly tags: CfnTag[];
```

- *Type:* aws-cdk-lib.CfnTag[]

---

##### `targetIds`<sup>Optional</sup> <a name="targetIds" id="@DataChefHQ/data-landing-zone.DlzServiceControlPolicyProps.property.targetIds"></a>

```typescript
public readonly targetIds: string[];
```

- *Type:* string[]

---

### DlzStackNameProps <a name="DlzStackNameProps" id="@DataChefHQ/data-landing-zone.DlzStackNameProps"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.DlzStackNameProps.Initializer"></a>

```typescript
import { DlzStackNameProps } from '@DataChefHQ/data-landing-zone'

const dlzStackNameProps: DlzStackNameProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStackNameProps.property.region">region</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStackNameProps.property.stack">stack</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStackNameProps.property.account">account</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStackNameProps.property.ou">ou</a></code> | <code>string</code> | *No description.* |

---

##### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.DlzStackNameProps.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

---

##### `stack`<sup>Required</sup> <a name="stack" id="@DataChefHQ/data-landing-zone.DlzStackNameProps.property.stack"></a>

```typescript
public readonly stack: string;
```

- *Type:* string

---

##### `account`<sup>Optional</sup> <a name="account" id="@DataChefHQ/data-landing-zone.DlzStackNameProps.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

---

##### `ou`<sup>Optional</sup> <a name="ou" id="@DataChefHQ/data-landing-zone.DlzStackNameProps.property.ou"></a>

```typescript
public readonly ou: string;
```

- *Type:* string

---

### DlzStackProps <a name="DlzStackProps" id="@DataChefHQ/data-landing-zone.DlzStackProps"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.DlzStackProps.Initializer"></a>

```typescript
import { DlzStackProps } from '@DataChefHQ/data-landing-zone'

const dlzStackProps: DlzStackProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStackProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzStackProps.property.name">name</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzStackNameProps">DlzStackNameProps</a></code> | *No description.* |

---

##### `env`<sup>Required</sup> <a name="env" id="@DataChefHQ/data-landing-zone.DlzStackProps.property.env"></a>

```typescript
public readonly env: Environment;
```

- *Type:* aws-cdk-lib.Environment

---

##### `name`<sup>Required</sup> <a name="name" id="@DataChefHQ/data-landing-zone.DlzStackProps.property.name"></a>

```typescript
public readonly name: DlzStackNameProps;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzStackNameProps">DlzStackNameProps</a>

---

### DlzSubnetProps <a name="DlzSubnetProps" id="@DataChefHQ/data-landing-zone.DlzSubnetProps"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.DlzSubnetProps.Initializer"></a>

```typescript
import { DlzSubnetProps } from '@DataChefHQ/data-landing-zone'

const dlzSubnetProps: DlzSubnetProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzSubnetProps.property.cidr">cidr</a></code> | <code>string</code> | The CIDR block of the subnet. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzSubnetProps.property.name">name</a></code> | <code>string</code> | The name of the subnet, must be unique within the segment. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzSubnetProps.property.segment">segment</a></code> | <code>string</code> | A Segment name is a grouping of subnets and is the route table the subnets will be long to. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzSubnetProps.property.az">az</a></code> | <code>string</code> | Optional. |

---

##### `cidr`<sup>Required</sup> <a name="cidr" id="@DataChefHQ/data-landing-zone.DlzSubnetProps.property.cidr"></a>

```typescript
public readonly cidr: string;
```

- *Type:* string

The CIDR block of the subnet.

---

##### `name`<sup>Required</sup> <a name="name" id="@DataChefHQ/data-landing-zone.DlzSubnetProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the subnet, must be unique within the segment.

---

##### `segment`<sup>Required</sup> <a name="segment" id="@DataChefHQ/data-landing-zone.DlzSubnetProps.property.segment"></a>

```typescript
public readonly segment: string;
```

- *Type:* string

A Segment name is a grouping of subnets and is the route table the subnets will be long to.

---

##### `az`<sup>Optional</sup> <a name="az" id="@DataChefHQ/data-landing-zone.DlzSubnetProps.property.az"></a>

```typescript
public readonly az: string;
```

- *Type:* string

Optional.

The Availability Zone of the subnet, if not specified a random AZ will be selected

---

### DlzTag <a name="DlzTag" id="@DataChefHQ/data-landing-zone.DlzTag"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.DlzTag.Initializer"></a>

```typescript
import { DlzTag } from '@DataChefHQ/data-landing-zone'

const dlzTag: DlzTag = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzTag.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzTag.property.values">values</a></code> | <code>string[]</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="@DataChefHQ/data-landing-zone.DlzTag.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `values`<sup>Optional</sup> <a name="values" id="@DataChefHQ/data-landing-zone.DlzTag.property.values"></a>

```typescript
public readonly values: string[];
```

- *Type:* string[]

---

### DlzTagPolicyProps <a name="DlzTagPolicyProps" id="@DataChefHQ/data-landing-zone.DlzTagPolicyProps"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.DlzTagPolicyProps.Initializer"></a>

```typescript
import { DlzTagPolicyProps } from '@DataChefHQ/data-landing-zone'

const dlzTagPolicyProps: DlzTagPolicyProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzTagPolicyProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzTagPolicyProps.property.policyTags">policyTags</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzTag">DlzTag</a>[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzTagPolicyProps.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzTagPolicyProps.property.tags">tags</a></code> | <code>aws-cdk-lib.CfnTag[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzTagPolicyProps.property.targetIds">targetIds</a></code> | <code>string[]</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="@DataChefHQ/data-landing-zone.DlzTagPolicyProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `policyTags`<sup>Required</sup> <a name="policyTags" id="@DataChefHQ/data-landing-zone.DlzTagPolicyProps.property.policyTags"></a>

```typescript
public readonly policyTags: DlzTag[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzTag">DlzTag</a>[]

---

##### `description`<sup>Optional</sup> <a name="description" id="@DataChefHQ/data-landing-zone.DlzTagPolicyProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@DataChefHQ/data-landing-zone.DlzTagPolicyProps.property.tags"></a>

```typescript
public readonly tags: CfnTag[];
```

- *Type:* aws-cdk-lib.CfnTag[]

---

##### `targetIds`<sup>Optional</sup> <a name="targetIds" id="@DataChefHQ/data-landing-zone.DlzTagPolicyProps.property.targetIds"></a>

```typescript
public readonly targetIds: string[];
```

- *Type:* string[]

---

### DlzVpcProps <a name="DlzVpcProps" id="@DataChefHQ/data-landing-zone.DlzVpcProps"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.DlzVpcProps.Initializer"></a>

```typescript
import { DlzVpcProps } from '@DataChefHQ/data-landing-zone'

const dlzVpcProps: DlzVpcProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzVpcProps.property.cidr">cidr</a></code> | <code>string</code> | The CIDR block of the VPC. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzVpcProps.property.name">name</a></code> | <code>string</code> | The name of the VPC, must be unique within the region. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzVpcProps.property.region">region</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.Region">Region</a></code> | The region where the VPC will be created. |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzVpcProps.property.subnets">subnets</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzSubnetProps">DlzSubnetProps</a>[]</code> | The subnets to be created in the VPC. |

---

##### `cidr`<sup>Required</sup> <a name="cidr" id="@DataChefHQ/data-landing-zone.DlzVpcProps.property.cidr"></a>

```typescript
public readonly cidr: string;
```

- *Type:* string

The CIDR block of the VPC.

---

##### `name`<sup>Required</sup> <a name="name" id="@DataChefHQ/data-landing-zone.DlzVpcProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the VPC, must be unique within the region.

---

##### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.DlzVpcProps.property.region"></a>

```typescript
public readonly region: Region;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.Region">Region</a>

The region where the VPC will be created.

---

##### `subnets`<sup>Required</sup> <a name="subnets" id="@DataChefHQ/data-landing-zone.DlzVpcProps.property.subnets"></a>

```typescript
public readonly subnets: DlzSubnetProps[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzSubnetProps">DlzSubnetProps</a>[]

The subnets to be created in the VPC.

---

### GitHubReference <a name="GitHubReference" id="@DataChefHQ/data-landing-zone.GitHubReference"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.GitHubReference.Initializer"></a>

```typescript
import { GitHubReference } from '@DataChefHQ/data-landing-zone'

const gitHubReference: GitHubReference = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.GitHubReference.property.owner">owner</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.GitHubReference.property.repo">repo</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.GitHubReference.property.filter">filter</a></code> | <code>string</code> | *No description.* |

---

##### `owner`<sup>Required</sup> <a name="owner" id="@DataChefHQ/data-landing-zone.GitHubReference.property.owner"></a>

```typescript
public readonly owner: string;
```

- *Type:* string

---

##### `repo`<sup>Required</sup> <a name="repo" id="@DataChefHQ/data-landing-zone.GitHubReference.property.repo"></a>

```typescript
public readonly repo: string;
```

- *Type:* string

---

##### `filter`<sup>Optional</sup> <a name="filter" id="@DataChefHQ/data-landing-zone.GitHubReference.property.filter"></a>

```typescript
public readonly filter: string;
```

- *Type:* string

---

### GlobalVariables <a name="GlobalVariables" id="@DataChefHQ/data-landing-zone.GlobalVariables"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.GlobalVariables.Initializer"></a>

```typescript
import { GlobalVariables } from '@DataChefHQ/data-landing-zone'

const globalVariables: GlobalVariables = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.GlobalVariables.property.dlzAccountNetworks">dlzAccountNetworks</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzAccountNetworks">DlzAccountNetworks</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.GlobalVariables.property.ncp1">ncp1</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.GlobalVariablesNcp1">GlobalVariablesNcp1</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.GlobalVariables.property.ncp2">ncp2</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.GlobalVariablesNcp2">GlobalVariablesNcp2</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.GlobalVariables.property.ncp3">ncp3</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.GlobalVariablesNcp3">GlobalVariablesNcp3</a></code> | *No description.* |

---

##### `dlzAccountNetworks`<sup>Required</sup> <a name="dlzAccountNetworks" id="@DataChefHQ/data-landing-zone.GlobalVariables.property.dlzAccountNetworks"></a>

```typescript
public readonly dlzAccountNetworks: DlzAccountNetworks;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzAccountNetworks">DlzAccountNetworks</a>

---

##### `ncp1`<sup>Required</sup> <a name="ncp1" id="@DataChefHQ/data-landing-zone.GlobalVariables.property.ncp1"></a>

```typescript
public readonly ncp1: GlobalVariablesNcp1;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.GlobalVariablesNcp1">GlobalVariablesNcp1</a>

---

##### `ncp2`<sup>Required</sup> <a name="ncp2" id="@DataChefHQ/data-landing-zone.GlobalVariables.property.ncp2"></a>

```typescript
public readonly ncp2: GlobalVariablesNcp2;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.GlobalVariablesNcp2">GlobalVariablesNcp2</a>

---

##### `ncp3`<sup>Required</sup> <a name="ncp3" id="@DataChefHQ/data-landing-zone.GlobalVariables.property.ncp3"></a>

```typescript
public readonly ncp3: GlobalVariablesNcp3;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.GlobalVariablesNcp3">GlobalVariablesNcp3</a>

---

### GlobalVariablesNcp1 <a name="GlobalVariablesNcp1" id="@DataChefHQ/data-landing-zone.GlobalVariablesNcp1"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.GlobalVariablesNcp1.Initializer"></a>

```typescript
import { GlobalVariablesNcp1 } from '@DataChefHQ/data-landing-zone'

const globalVariablesNcp1: GlobalVariablesNcp1 = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.GlobalVariablesNcp1.property.vpcPeeringRoleKeys">vpcPeeringRoleKeys</a></code> | <code>string[]</code> | *No description.* |

---

##### `vpcPeeringRoleKeys`<sup>Required</sup> <a name="vpcPeeringRoleKeys" id="@DataChefHQ/data-landing-zone.GlobalVariablesNcp1.property.vpcPeeringRoleKeys"></a>

```typescript
public readonly vpcPeeringRoleKeys: string[];
```

- *Type:* string[]

---

### GlobalVariablesNcp2 <a name="GlobalVariablesNcp2" id="@DataChefHQ/data-landing-zone.GlobalVariablesNcp2"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.GlobalVariablesNcp2.Initializer"></a>

```typescript
import { GlobalVariablesNcp2 } from '@DataChefHQ/data-landing-zone'

const globalVariablesNcp2: GlobalVariablesNcp2 = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.GlobalVariablesNcp2.property.ownerVpcIds">ownerVpcIds</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzSsmReaderStackCache">DlzSsmReaderStackCache</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.GlobalVariablesNcp2.property.peeringConnections">peeringConnections</a></code> | <code>{[ key: string ]: aws-cdk-lib.aws_ec2.CfnVPCPeeringConnection}</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.GlobalVariablesNcp2.property.peeringRoleArns">peeringRoleArns</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzSsmReaderStackCache">DlzSsmReaderStackCache</a></code> | *No description.* |

---

##### `ownerVpcIds`<sup>Required</sup> <a name="ownerVpcIds" id="@DataChefHQ/data-landing-zone.GlobalVariablesNcp2.property.ownerVpcIds"></a>

```typescript
public readonly ownerVpcIds: DlzSsmReaderStackCache;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzSsmReaderStackCache">DlzSsmReaderStackCache</a>

---

##### `peeringConnections`<sup>Required</sup> <a name="peeringConnections" id="@DataChefHQ/data-landing-zone.GlobalVariablesNcp2.property.peeringConnections"></a>

```typescript
public readonly peeringConnections: {[ key: string ]: CfnVPCPeeringConnection};
```

- *Type:* {[ key: string ]: aws-cdk-lib.aws_ec2.CfnVPCPeeringConnection}

---

##### `peeringRoleArns`<sup>Required</sup> <a name="peeringRoleArns" id="@DataChefHQ/data-landing-zone.GlobalVariablesNcp2.property.peeringRoleArns"></a>

```typescript
public readonly peeringRoleArns: DlzSsmReaderStackCache;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzSsmReaderStackCache">DlzSsmReaderStackCache</a>

---

### GlobalVariablesNcp3 <a name="GlobalVariablesNcp3" id="@DataChefHQ/data-landing-zone.GlobalVariablesNcp3"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.GlobalVariablesNcp3.Initializer"></a>

```typescript
import { GlobalVariablesNcp3 } from '@DataChefHQ/data-landing-zone'

const globalVariablesNcp3: GlobalVariablesNcp3 = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.GlobalVariablesNcp3.property.routeTablesSsmCache">routeTablesSsmCache</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzSsmReaderStackCache">DlzSsmReaderStackCache</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.GlobalVariablesNcp3.property.vpcPeeringConnectionIds">vpcPeeringConnectionIds</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzSsmReaderStackCache">DlzSsmReaderStackCache</a></code> | *No description.* |

---

##### `routeTablesSsmCache`<sup>Required</sup> <a name="routeTablesSsmCache" id="@DataChefHQ/data-landing-zone.GlobalVariablesNcp3.property.routeTablesSsmCache"></a>

```typescript
public readonly routeTablesSsmCache: DlzSsmReaderStackCache;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzSsmReaderStackCache">DlzSsmReaderStackCache</a>

---

##### `vpcPeeringConnectionIds`<sup>Required</sup> <a name="vpcPeeringConnectionIds" id="@DataChefHQ/data-landing-zone.GlobalVariablesNcp3.property.vpcPeeringConnectionIds"></a>

```typescript
public readonly vpcPeeringConnectionIds: DlzSsmReaderStackCache;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzSsmReaderStackCache">DlzSsmReaderStackCache</a>

---

### IamIdentityCenterAccessGroupProps <a name="IamIdentityCenterAccessGroupProps" id="@DataChefHQ/data-landing-zone.IamIdentityCenterAccessGroupProps"></a>

An access group in the IAM Identity Center.

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.IamIdentityCenterAccessGroupProps.Initializer"></a>

```typescript
import { IamIdentityCenterAccessGroupProps } from '@DataChefHQ/data-landing-zone'

const iamIdentityCenterAccessGroupProps: IamIdentityCenterAccessGroupProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterAccessGroupProps.property.accountNames">accountNames</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterAccessGroupProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterAccessGroupProps.property.permissionSetName">permissionSetName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterAccessGroupProps.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterAccessGroupProps.property.userNames">userNames</a></code> | <code>string[]</code> | *No description.* |

---

##### `accountNames`<sup>Required</sup> <a name="accountNames" id="@DataChefHQ/data-landing-zone.IamIdentityCenterAccessGroupProps.property.accountNames"></a>

```typescript
public readonly accountNames: string[];
```

- *Type:* string[]

---

##### `name`<sup>Required</sup> <a name="name" id="@DataChefHQ/data-landing-zone.IamIdentityCenterAccessGroupProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `permissionSetName`<sup>Required</sup> <a name="permissionSetName" id="@DataChefHQ/data-landing-zone.IamIdentityCenterAccessGroupProps.property.permissionSetName"></a>

```typescript
public readonly permissionSetName: string;
```

- *Type:* string

---

##### `description`<sup>Optional</sup> <a name="description" id="@DataChefHQ/data-landing-zone.IamIdentityCenterAccessGroupProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `userNames`<sup>Optional</sup> <a name="userNames" id="@DataChefHQ/data-landing-zone.IamIdentityCenterAccessGroupProps.property.userNames"></a>

```typescript
public readonly userNames: string[];
```

- *Type:* string[]

---

### IamIdentityCenterGroupProps <a name="IamIdentityCenterGroupProps" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroupProps"></a>

A group of users in the IAM Identity Center.

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroupProps.Initializer"></a>

```typescript
import { IamIdentityCenterGroupProps } from '@DataChefHQ/data-landing-zone'

const iamIdentityCenterGroupProps: IamIdentityCenterGroupProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterGroupProps.property.accounts">accounts</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterGroupProps.property.identityStoreId">identityStoreId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterGroupProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterGroupProps.property.permissionSet">permissionSet</a></code> | <code>aws-cdk-lib.aws_sso.CfnPermissionSet</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterGroupProps.property.ssoArn">ssoArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterGroupProps.property.users">users</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterGroupUser">IamIdentityCenterGroupUser</a>[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterGroupProps.property.description">description</a></code> | <code>string</code> | *No description.* |

---

##### `accounts`<sup>Required</sup> <a name="accounts" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroupProps.property.accounts"></a>

```typescript
public readonly accounts: string[];
```

- *Type:* string[]

---

##### `identityStoreId`<sup>Required</sup> <a name="identityStoreId" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroupProps.property.identityStoreId"></a>

```typescript
public readonly identityStoreId: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroupProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `permissionSet`<sup>Required</sup> <a name="permissionSet" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroupProps.property.permissionSet"></a>

```typescript
public readonly permissionSet: CfnPermissionSet;
```

- *Type:* aws-cdk-lib.aws_sso.CfnPermissionSet

---

##### `ssoArn`<sup>Required</sup> <a name="ssoArn" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroupProps.property.ssoArn"></a>

```typescript
public readonly ssoArn: string;
```

- *Type:* string

---

##### `users`<sup>Required</sup> <a name="users" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroupProps.property.users"></a>

```typescript
public readonly users: IamIdentityCenterGroupUser[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterGroupUser">IamIdentityCenterGroupUser</a>[]

---

##### `description`<sup>Optional</sup> <a name="description" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroupProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

### IamIdentityCenterGroupUser <a name="IamIdentityCenterGroupUser" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroupUser"></a>

A user in the IAM Identity Center.

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroupUser.Initializer"></a>

```typescript
import { IamIdentityCenterGroupUser } from '@DataChefHQ/data-landing-zone'

const iamIdentityCenterGroupUser: IamIdentityCenterGroupUser = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterGroupUser.property.userId">userId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterGroupUser.property.userName">userName</a></code> | <code>string</code> | *No description.* |

---

##### `userId`<sup>Required</sup> <a name="userId" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroupUser.property.userId"></a>

```typescript
public readonly userId: string;
```

- *Type:* string

---

##### `userName`<sup>Required</sup> <a name="userName" id="@DataChefHQ/data-landing-zone.IamIdentityCenterGroupUser.property.userName"></a>

```typescript
public readonly userName: string;
```

- *Type:* string

---

### IamIdentityCenterPermissionSetProps <a name="IamIdentityCenterPermissionSetProps" id="@DataChefHQ/data-landing-zone.IamIdentityCenterPermissionSetProps"></a>

A permission set in the IAM Identity Center.

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.IamIdentityCenterPermissionSetProps.Initializer"></a>

```typescript
import { IamIdentityCenterPermissionSetProps } from '@DataChefHQ/data-landing-zone'

const iamIdentityCenterPermissionSetProps: IamIdentityCenterPermissionSetProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterPermissionSetProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterPermissionSetProps.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterPermissionSetProps.property.inlinePolicyStatement">inlinePolicyStatement</a></code> | <code>aws-cdk-lib.aws_iam.PolicyStatement</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterPermissionSetProps.property.managedPolicyArns">managedPolicyArns</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterPermissionSetProps.property.permissionsBoundary">permissionsBoundary</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_sso.CfnPermissionSet.PermissionsBoundaryProperty</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterPermissionSetProps.property.sessionDuration">sessionDuration</a></code> | <code>aws-cdk-lib.Duration</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="@DataChefHQ/data-landing-zone.IamIdentityCenterPermissionSetProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `description`<sup>Optional</sup> <a name="description" id="@DataChefHQ/data-landing-zone.IamIdentityCenterPermissionSetProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `inlinePolicyStatement`<sup>Optional</sup> <a name="inlinePolicyStatement" id="@DataChefHQ/data-landing-zone.IamIdentityCenterPermissionSetProps.property.inlinePolicyStatement"></a>

```typescript
public readonly inlinePolicyStatement: PolicyStatement;
```

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

---

##### `managedPolicyArns`<sup>Optional</sup> <a name="managedPolicyArns" id="@DataChefHQ/data-landing-zone.IamIdentityCenterPermissionSetProps.property.managedPolicyArns"></a>

```typescript
public readonly managedPolicyArns: string[];
```

- *Type:* string[]

---

##### `permissionsBoundary`<sup>Optional</sup> <a name="permissionsBoundary" id="@DataChefHQ/data-landing-zone.IamIdentityCenterPermissionSetProps.property.permissionsBoundary"></a>

```typescript
public readonly permissionsBoundary: IResolvable | PermissionsBoundaryProperty;
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.aws_sso.CfnPermissionSet.PermissionsBoundaryProperty

---

##### `sessionDuration`<sup>Optional</sup> <a name="sessionDuration" id="@DataChefHQ/data-landing-zone.IamIdentityCenterPermissionSetProps.property.sessionDuration"></a>

```typescript
public readonly sessionDuration: Duration;
```

- *Type:* aws-cdk-lib.Duration

---

### IamIdentityCenterProps <a name="IamIdentityCenterProps" id="@DataChefHQ/data-landing-zone.IamIdentityCenterProps"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.IamIdentityCenterProps.Initializer"></a>

```typescript
import { IamIdentityCenterProps } from '@DataChefHQ/data-landing-zone'

const iamIdentityCenterProps: IamIdentityCenterProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterProps.property.arn">arn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterProps.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterProps.property.storeId">storeId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterProps.property.accessGroups">accessGroups</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterAccessGroupProps">IamIdentityCenterAccessGroupProps</a>[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterProps.property.permissionSets">permissionSets</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterPermissionSetProps">IamIdentityCenterPermissionSetProps</a>[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterProps.property.users">users</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserProps">IdentityStoreUserProps</a>[]</code> | *No description.* |

---

##### `arn`<sup>Required</sup> <a name="arn" id="@DataChefHQ/data-landing-zone.IamIdentityCenterProps.property.arn"></a>

```typescript
public readonly arn: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.IamIdentityCenterProps.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `storeId`<sup>Required</sup> <a name="storeId" id="@DataChefHQ/data-landing-zone.IamIdentityCenterProps.property.storeId"></a>

```typescript
public readonly storeId: string;
```

- *Type:* string

---

##### `accessGroups`<sup>Optional</sup> <a name="accessGroups" id="@DataChefHQ/data-landing-zone.IamIdentityCenterProps.property.accessGroups"></a>

```typescript
public readonly accessGroups: IamIdentityCenterAccessGroupProps[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterAccessGroupProps">IamIdentityCenterAccessGroupProps</a>[]

---

##### `permissionSets`<sup>Optional</sup> <a name="permissionSets" id="@DataChefHQ/data-landing-zone.IamIdentityCenterProps.property.permissionSets"></a>

```typescript
public readonly permissionSets: IamIdentityCenterPermissionSetProps[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterPermissionSetProps">IamIdentityCenterPermissionSetProps</a>[]

---

##### `users`<sup>Optional</sup> <a name="users" id="@DataChefHQ/data-landing-zone.IamIdentityCenterProps.property.users"></a>

```typescript
public readonly users: IdentityStoreUserProps[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserProps">IdentityStoreUserProps</a>[]

---

### IamPolicyPermissionsBoundaryProps <a name="IamPolicyPermissionsBoundaryProps" id="@DataChefHQ/data-landing-zone.IamPolicyPermissionsBoundaryProps"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.IamPolicyPermissionsBoundaryProps.Initializer"></a>

```typescript
import { IamPolicyPermissionsBoundaryProps } from '@DataChefHQ/data-landing-zone'

const iamPolicyPermissionsBoundaryProps: IamPolicyPermissionsBoundaryProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IamPolicyPermissionsBoundaryProps.property.policyStatement">policyStatement</a></code> | <code>aws-cdk-lib.aws_iam.PolicyStatementProps</code> | *No description.* |

---

##### `policyStatement`<sup>Required</sup> <a name="policyStatement" id="@DataChefHQ/data-landing-zone.IamPolicyPermissionsBoundaryProps.property.policyStatement"></a>

```typescript
public readonly policyStatement: PolicyStatementProps;
```

- *Type:* aws-cdk-lib.aws_iam.PolicyStatementProps

---

### IdentityStoreUserEmailsProps <a name="IdentityStoreUserEmailsProps" id="@DataChefHQ/data-landing-zone.IdentityStoreUserEmailsProps"></a>

The email of a user in the IAM Identity Center.

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.IdentityStoreUserEmailsProps.Initializer"></a>

```typescript
import { IdentityStoreUserEmailsProps } from '@DataChefHQ/data-landing-zone'

const identityStoreUserEmailsProps: IdentityStoreUserEmailsProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserEmailsProps.property.type">type</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserEmailsProps.property.value">value</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserEmailsProps.property.primary">primary</a></code> | <code>boolean</code> | *No description.* |

---

##### `type`<sup>Required</sup> <a name="type" id="@DataChefHQ/data-landing-zone.IdentityStoreUserEmailsProps.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

---

##### `value`<sup>Required</sup> <a name="value" id="@DataChefHQ/data-landing-zone.IdentityStoreUserEmailsProps.property.value"></a>

```typescript
public readonly value: string;
```

- *Type:* string

---

##### `primary`<sup>Optional</sup> <a name="primary" id="@DataChefHQ/data-landing-zone.IdentityStoreUserEmailsProps.property.primary"></a>

```typescript
public readonly primary: boolean;
```

- *Type:* boolean

---

### IdentityStoreUserNameProps <a name="IdentityStoreUserNameProps" id="@DataChefHQ/data-landing-zone.IdentityStoreUserNameProps"></a>

The name of a user in the IAM Identity Center.

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.IdentityStoreUserNameProps.Initializer"></a>

```typescript
import { IdentityStoreUserNameProps } from '@DataChefHQ/data-landing-zone'

const identityStoreUserNameProps: IdentityStoreUserNameProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserNameProps.property.familyName">familyName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserNameProps.property.formatted">formatted</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserNameProps.property.givenName">givenName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserNameProps.property.honorificPrefix">honorificPrefix</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserNameProps.property.honorificSuffix">honorificSuffix</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserNameProps.property.middleName">middleName</a></code> | <code>string</code> | *No description.* |

---

##### `familyName`<sup>Required</sup> <a name="familyName" id="@DataChefHQ/data-landing-zone.IdentityStoreUserNameProps.property.familyName"></a>

```typescript
public readonly familyName: string;
```

- *Type:* string

---

##### `formatted`<sup>Required</sup> <a name="formatted" id="@DataChefHQ/data-landing-zone.IdentityStoreUserNameProps.property.formatted"></a>

```typescript
public readonly formatted: string;
```

- *Type:* string

---

##### `givenName`<sup>Required</sup> <a name="givenName" id="@DataChefHQ/data-landing-zone.IdentityStoreUserNameProps.property.givenName"></a>

```typescript
public readonly givenName: string;
```

- *Type:* string

---

##### `honorificPrefix`<sup>Optional</sup> <a name="honorificPrefix" id="@DataChefHQ/data-landing-zone.IdentityStoreUserNameProps.property.honorificPrefix"></a>

```typescript
public readonly honorificPrefix: string;
```

- *Type:* string

---

##### `honorificSuffix`<sup>Optional</sup> <a name="honorificSuffix" id="@DataChefHQ/data-landing-zone.IdentityStoreUserNameProps.property.honorificSuffix"></a>

```typescript
public readonly honorificSuffix: string;
```

- *Type:* string

---

##### `middleName`<sup>Optional</sup> <a name="middleName" id="@DataChefHQ/data-landing-zone.IdentityStoreUserNameProps.property.middleName"></a>

```typescript
public readonly middleName: string;
```

- *Type:* string

---

### IdentityStoreUserProps <a name="IdentityStoreUserProps" id="@DataChefHQ/data-landing-zone.IdentityStoreUserProps"></a>

A user in the IAM Identity Center.

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.IdentityStoreUserProps.Initializer"></a>

```typescript
import { IdentityStoreUserProps } from '@DataChefHQ/data-landing-zone'

const identityStoreUserProps: IdentityStoreUserProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserProps.property.surname">surname</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserProps.property.userName">userName</a></code> | <code>string</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="@DataChefHQ/data-landing-zone.IdentityStoreUserProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `surname`<sup>Required</sup> <a name="surname" id="@DataChefHQ/data-landing-zone.IdentityStoreUserProps.property.surname"></a>

```typescript
public readonly surname: string;
```

- *Type:* string

---

##### `userName`<sup>Required</sup> <a name="userName" id="@DataChefHQ/data-landing-zone.IdentityStoreUserProps.property.userName"></a>

```typescript
public readonly userName: string;
```

- *Type:* string

---

### IdentityStoreUserPropsExt <a name="IdentityStoreUserPropsExt" id="@DataChefHQ/data-landing-zone.IdentityStoreUserPropsExt"></a>

A user in the IAM Identity Center.

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.IdentityStoreUserPropsExt.Initializer"></a>

```typescript
import { IdentityStoreUserPropsExt } from '@DataChefHQ/data-landing-zone'

const identityStoreUserPropsExt: IdentityStoreUserPropsExt = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserPropsExt.property.displayName">displayName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserPropsExt.property.email">email</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserEmailsProps">IdentityStoreUserEmailsProps</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserPropsExt.property.identityStoreId">identityStoreId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserPropsExt.property.name">name</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserNameProps">IdentityStoreUserNameProps</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserPropsExt.property.userName">userName</a></code> | <code>string</code> | *No description.* |

---

##### `displayName`<sup>Required</sup> <a name="displayName" id="@DataChefHQ/data-landing-zone.IdentityStoreUserPropsExt.property.displayName"></a>

```typescript
public readonly displayName: string;
```

- *Type:* string

---

##### `email`<sup>Required</sup> <a name="email" id="@DataChefHQ/data-landing-zone.IdentityStoreUserPropsExt.property.email"></a>

```typescript
public readonly email: IdentityStoreUserEmailsProps;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserEmailsProps">IdentityStoreUserEmailsProps</a>

---

##### `identityStoreId`<sup>Required</sup> <a name="identityStoreId" id="@DataChefHQ/data-landing-zone.IdentityStoreUserPropsExt.property.identityStoreId"></a>

```typescript
public readonly identityStoreId: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="@DataChefHQ/data-landing-zone.IdentityStoreUserPropsExt.property.name"></a>

```typescript
public readonly name: IdentityStoreUserNameProps;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.IdentityStoreUserNameProps">IdentityStoreUserNameProps</a>

---

##### `userName`<sup>Required</sup> <a name="userName" id="@DataChefHQ/data-landing-zone.IdentityStoreUserPropsExt.property.userName"></a>

```typescript
public readonly userName: string;
```

- *Type:* string

---

### LogStacks <a name="LogStacks" id="@DataChefHQ/data-landing-zone.LogStacks"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.LogStacks.Initializer"></a>

```typescript
import { LogStacks } from '@DataChefHQ/data-landing-zone'

const logStacks: LogStacks = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.LogStacks.property.global">global</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack">LogGlobalStack</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.LogStacks.property.regional">regional</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.LogGlobalStack">LogGlobalStack</a>[]</code> | *No description.* |

---

##### `global`<sup>Required</sup> <a name="global" id="@DataChefHQ/data-landing-zone.LogStacks.property.global"></a>

```typescript
public readonly global: LogGlobalStack;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.LogGlobalStack">LogGlobalStack</a>

---

##### `regional`<sup>Required</sup> <a name="regional" id="@DataChefHQ/data-landing-zone.LogStacks.property.regional"></a>

```typescript
public readonly regional: LogGlobalStack[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.LogGlobalStack">LogGlobalStack</a>[]

---

### MandatoryTags <a name="MandatoryTags" id="@DataChefHQ/data-landing-zone.MandatoryTags"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.MandatoryTags.Initializer"></a>

```typescript
import { MandatoryTags } from '@DataChefHQ/data-landing-zone'

const mandatoryTags: MandatoryTags = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.MandatoryTags.property.environment">environment</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.MandatoryTags.property.owner">owner</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.MandatoryTags.property.project">project</a></code> | <code>string[]</code> | *No description.* |

---

##### `environment`<sup>Required</sup> <a name="environment" id="@DataChefHQ/data-landing-zone.MandatoryTags.property.environment"></a>

```typescript
public readonly environment: string[];
```

- *Type:* string[]

---

##### `owner`<sup>Required</sup> <a name="owner" id="@DataChefHQ/data-landing-zone.MandatoryTags.property.owner"></a>

```typescript
public readonly owner: string[];
```

- *Type:* string[]

---

##### `project`<sup>Required</sup> <a name="project" id="@DataChefHQ/data-landing-zone.MandatoryTags.property.project"></a>

```typescript
public readonly project: string[];
```

- *Type:* string[]

---

### Network <a name="Network" id="@DataChefHQ/data-landing-zone.Network"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.Network.Initializer"></a>

```typescript
import { Network } from '@DataChefHQ/data-landing-zone'

const network: Network = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.Network.property.bastionHosts">bastionHosts</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.BastionHost">BastionHost</a>[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.Network.property.connections">connections</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NetworkConnection">NetworkConnection</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.Network.property.nats">nats</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NetworkNat">NetworkNat</a>[]</code> | *No description.* |

---

##### `bastionHosts`<sup>Optional</sup> <a name="bastionHosts" id="@DataChefHQ/data-landing-zone.Network.property.bastionHosts"></a>

```typescript
public readonly bastionHosts: BastionHost[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.BastionHost">BastionHost</a>[]

---

##### `connections`<sup>Optional</sup> <a name="connections" id="@DataChefHQ/data-landing-zone.Network.property.connections"></a>

```typescript
public readonly connections: NetworkConnection;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkConnection">NetworkConnection</a>

---

##### `nats`<sup>Optional</sup> <a name="nats" id="@DataChefHQ/data-landing-zone.Network.property.nats"></a>

```typescript
public readonly nats: NetworkNat[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkNat">NetworkNat</a>[]

---

### NetworkConnection <a name="NetworkConnection" id="@DataChefHQ/data-landing-zone.NetworkConnection"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.NetworkConnection.Initializer"></a>

```typescript
import { NetworkConnection } from '@DataChefHQ/data-landing-zone'

const networkConnection: NetworkConnection = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkConnection.property.vpcPeering">vpcPeering</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NetworkConnectionVpcPeering">NetworkConnectionVpcPeering</a>[]</code> | *No description.* |

---

##### `vpcPeering`<sup>Required</sup> <a name="vpcPeering" id="@DataChefHQ/data-landing-zone.NetworkConnection.property.vpcPeering"></a>

```typescript
public readonly vpcPeering: NetworkConnectionVpcPeering[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkConnectionVpcPeering">NetworkConnectionVpcPeering</a>[]

---

### NetworkConnectionVpcPeering <a name="NetworkConnectionVpcPeering" id="@DataChefHQ/data-landing-zone.NetworkConnectionVpcPeering"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.NetworkConnectionVpcPeering.Initializer"></a>

```typescript
import { NetworkConnectionVpcPeering } from '@DataChefHQ/data-landing-zone'

const networkConnectionVpcPeering: NetworkConnectionVpcPeering = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkConnectionVpcPeering.property.destination">destination</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress">NetworkAddress</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkConnectionVpcPeering.property.source">source</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress">NetworkAddress</a></code> | *No description.* |

---

##### `destination`<sup>Required</sup> <a name="destination" id="@DataChefHQ/data-landing-zone.NetworkConnectionVpcPeering.property.destination"></a>

```typescript
public readonly destination: NetworkAddress;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkAddress">NetworkAddress</a>

---

##### `source`<sup>Required</sup> <a name="source" id="@DataChefHQ/data-landing-zone.NetworkConnectionVpcPeering.property.source"></a>

```typescript
public readonly source: NetworkAddress;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkAddress">NetworkAddress</a>

---

### NetworkEntityRouteTable <a name="NetworkEntityRouteTable" id="@DataChefHQ/data-landing-zone.NetworkEntityRouteTable"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.NetworkEntityRouteTable.Initializer"></a>

```typescript
import { NetworkEntityRouteTable } from '@DataChefHQ/data-landing-zone'

const networkEntityRouteTable: NetworkEntityRouteTable = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkEntityRouteTable.property.address">address</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress">NetworkAddress</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkEntityRouteTable.property.routeTable">routeTable</a></code> | <code>aws-cdk-lib.aws_ec2.CfnRouteTable</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkEntityRouteTable.property.subnets">subnets</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NetworkEntitySubnet">NetworkEntitySubnet</a>[]</code> | *No description.* |

---

##### `address`<sup>Required</sup> <a name="address" id="@DataChefHQ/data-landing-zone.NetworkEntityRouteTable.property.address"></a>

```typescript
public readonly address: NetworkAddress;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkAddress">NetworkAddress</a>

---

##### `routeTable`<sup>Required</sup> <a name="routeTable" id="@DataChefHQ/data-landing-zone.NetworkEntityRouteTable.property.routeTable"></a>

```typescript
public readonly routeTable: CfnRouteTable;
```

- *Type:* aws-cdk-lib.aws_ec2.CfnRouteTable

---

##### `subnets`<sup>Required</sup> <a name="subnets" id="@DataChefHQ/data-landing-zone.NetworkEntityRouteTable.property.subnets"></a>

```typescript
public readonly subnets: NetworkEntitySubnet[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkEntitySubnet">NetworkEntitySubnet</a>[]

---

### NetworkEntitySubnet <a name="NetworkEntitySubnet" id="@DataChefHQ/data-landing-zone.NetworkEntitySubnet"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.NetworkEntitySubnet.Initializer"></a>

```typescript
import { NetworkEntitySubnet } from '@DataChefHQ/data-landing-zone'

const networkEntitySubnet: NetworkEntitySubnet = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkEntitySubnet.property.address">address</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress">NetworkAddress</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkEntitySubnet.property.subnet">subnet</a></code> | <code>aws-cdk-lib.aws_ec2.CfnSubnet</code> | *No description.* |

---

##### `address`<sup>Required</sup> <a name="address" id="@DataChefHQ/data-landing-zone.NetworkEntitySubnet.property.address"></a>

```typescript
public readonly address: NetworkAddress;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkAddress">NetworkAddress</a>

---

##### `subnet`<sup>Required</sup> <a name="subnet" id="@DataChefHQ/data-landing-zone.NetworkEntitySubnet.property.subnet"></a>

```typescript
public readonly subnet: CfnSubnet;
```

- *Type:* aws-cdk-lib.aws_ec2.CfnSubnet

---

### NetworkEntityVpc <a name="NetworkEntityVpc" id="@DataChefHQ/data-landing-zone.NetworkEntityVpc"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.NetworkEntityVpc.Initializer"></a>

```typescript
import { NetworkEntityVpc } from '@DataChefHQ/data-landing-zone'

const networkEntityVpc: NetworkEntityVpc = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkEntityVpc.property.address">address</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress">NetworkAddress</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkEntityVpc.property.routeTables">routeTables</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NetworkEntityRouteTable">NetworkEntityRouteTable</a>[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkEntityVpc.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.CfnVPC</code> | *No description.* |

---

##### `address`<sup>Required</sup> <a name="address" id="@DataChefHQ/data-landing-zone.NetworkEntityVpc.property.address"></a>

```typescript
public readonly address: NetworkAddress;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkAddress">NetworkAddress</a>

---

##### `routeTables`<sup>Required</sup> <a name="routeTables" id="@DataChefHQ/data-landing-zone.NetworkEntityVpc.property.routeTables"></a>

```typescript
public readonly routeTables: NetworkEntityRouteTable[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkEntityRouteTable">NetworkEntityRouteTable</a>[]

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@DataChefHQ/data-landing-zone.NetworkEntityVpc.property.vpc"></a>

```typescript
public readonly vpc: CfnVPC;
```

- *Type:* aws-cdk-lib.aws_ec2.CfnVPC

---

### NetworkNat <a name="NetworkNat" id="@DataChefHQ/data-landing-zone.NetworkNat"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.NetworkNat.Initializer"></a>

```typescript
import { NetworkNat } from '@DataChefHQ/data-landing-zone'

const networkNat: NetworkNat = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkNat.property.allowAccessFrom">allowAccessFrom</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress">NetworkAddress</a>[]</code> | The route tables that should route to the NAT. |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkNat.property.location">location</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress">NetworkAddress</a></code> | The location where the NAT will exist. |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkNat.property.name">name</a></code> | <code>string</code> | The name of the NAT Gateway to easily identify it. |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkNat.property.type">type</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NetworkNatType">NetworkNatType</a></code> | The type of NAT to create. |

---

##### `allowAccessFrom`<sup>Required</sup> <a name="allowAccessFrom" id="@DataChefHQ/data-landing-zone.NetworkNat.property.allowAccessFrom"></a>

```typescript
public readonly allowAccessFrom: NetworkAddress[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkAddress">NetworkAddress</a>[]

The route tables that should route to the NAT.

Must be in the same Account, Region and VPC as the NAT.

---

##### `location`<sup>Required</sup> <a name="location" id="@DataChefHQ/data-landing-zone.NetworkNat.property.location"></a>

```typescript
public readonly location: NetworkAddress;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkAddress">NetworkAddress</a>

The location where the NAT will exist.

The network address must target a specific subnet

---

##### `name`<sup>Required</sup> <a name="name" id="@DataChefHQ/data-landing-zone.NetworkNat.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the NAT Gateway to easily identify it.

---

##### `type`<sup>Required</sup> <a name="type" id="@DataChefHQ/data-landing-zone.NetworkNat.property.type"></a>

```typescript
public readonly type: NetworkNatType;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkNatType">NetworkNatType</a>

The type of NAT to create.

---

### NetworkNatGateway <a name="NetworkNatGateway" id="@DataChefHQ/data-landing-zone.NetworkNatGateway"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.NetworkNatGateway.Initializer"></a>

```typescript
import { NetworkNatGateway } from '@DataChefHQ/data-landing-zone'

const networkNatGateway: NetworkNatGateway = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkNatGateway.property.eip">eip</a></code> | <code>aws-cdk-lib.aws_ec2.CfnEIPProps</code> | *No description.* |

---

##### `eip`<sup>Optional</sup> <a name="eip" id="@DataChefHQ/data-landing-zone.NetworkNatGateway.property.eip"></a>

```typescript
public readonly eip: CfnEIPProps;
```

- *Type:* aws-cdk-lib.aws_ec2.CfnEIPProps

---

### NetworkNatInstance <a name="NetworkNatInstance" id="@DataChefHQ/data-landing-zone.NetworkNatInstance"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.NetworkNatInstance.Initializer"></a>

```typescript
import { NetworkNatInstance } from '@DataChefHQ/data-landing-zone'

const networkNatInstance: NetworkNatInstance = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkNatInstance.property.instanceType">instanceType</a></code> | <code>aws-cdk-lib.aws_ec2.InstanceType</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkNatInstance.property.eip">eip</a></code> | <code>aws-cdk-lib.aws_ec2.CfnEIPProps</code> | *No description.* |

---

##### `instanceType`<sup>Required</sup> <a name="instanceType" id="@DataChefHQ/data-landing-zone.NetworkNatInstance.property.instanceType"></a>

```typescript
public readonly instanceType: InstanceType;
```

- *Type:* aws-cdk-lib.aws_ec2.InstanceType

---

##### `eip`<sup>Optional</sup> <a name="eip" id="@DataChefHQ/data-landing-zone.NetworkNatInstance.property.eip"></a>

```typescript
public readonly eip: CfnEIPProps;
```

- *Type:* aws-cdk-lib.aws_ec2.CfnEIPProps

---

### NetworkNatType <a name="NetworkNatType" id="@DataChefHQ/data-landing-zone.NetworkNatType"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.NetworkNatType.Initializer"></a>

```typescript
import { NetworkNatType } from '@DataChefHQ/data-landing-zone'

const networkNatType: NetworkNatType = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkNatType.property.gateway">gateway</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NetworkNatGateway">NetworkNatGateway</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkNatType.property.instance">instance</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NetworkNatInstance">NetworkNatInstance</a></code> | *No description.* |

---

##### `gateway`<sup>Optional</sup> <a name="gateway" id="@DataChefHQ/data-landing-zone.NetworkNatType.property.gateway"></a>

```typescript
public readonly gateway: NetworkNatGateway;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkNatGateway">NetworkNatGateway</a>

---

##### `instance`<sup>Optional</sup> <a name="instance" id="@DataChefHQ/data-landing-zone.NetworkNatType.property.instance"></a>

```typescript
public readonly instance: NetworkNatInstance;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkNatInstance">NetworkNatInstance</a>

---

### NotificationDetailsProps <a name="NotificationDetailsProps" id="@DataChefHQ/data-landing-zone.NotificationDetailsProps"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.NotificationDetailsProps.Initializer"></a>

```typescript
import { NotificationDetailsProps } from '@DataChefHQ/data-landing-zone'

const notificationDetailsProps: NotificationDetailsProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.NotificationDetailsProps.property.emails">emails</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NotificationDetailsProps.property.slack">slack</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.SlackChannel">SlackChannel</a></code> | *No description.* |

---

##### `emails`<sup>Optional</sup> <a name="emails" id="@DataChefHQ/data-landing-zone.NotificationDetailsProps.property.emails"></a>

```typescript
public readonly emails: string[];
```

- *Type:* string[]

---

##### `slack`<sup>Optional</sup> <a name="slack" id="@DataChefHQ/data-landing-zone.NotificationDetailsProps.property.slack"></a>

```typescript
public readonly slack: SlackChannel;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.SlackChannel">SlackChannel</a>

---

### OrgOus <a name="OrgOus" id="@DataChefHQ/data-landing-zone.OrgOus"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.OrgOus.Initializer"></a>

```typescript
import { OrgOus } from '@DataChefHQ/data-landing-zone'

const orgOus: OrgOus = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.OrgOus.property.security">security</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.OrgOuSecurity">OrgOuSecurity</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.OrgOus.property.suspended">suspended</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.OrgOuSuspended">OrgOuSuspended</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.OrgOus.property.workloads">workloads</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.OrgOuWorkloads">OrgOuWorkloads</a></code> | *No description.* |

---

##### `security`<sup>Required</sup> <a name="security" id="@DataChefHQ/data-landing-zone.OrgOus.property.security"></a>

```typescript
public readonly security: OrgOuSecurity;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.OrgOuSecurity">OrgOuSecurity</a>

---

##### `suspended`<sup>Required</sup> <a name="suspended" id="@DataChefHQ/data-landing-zone.OrgOus.property.suspended"></a>

```typescript
public readonly suspended: OrgOuSuspended;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.OrgOuSuspended">OrgOuSuspended</a>

---

##### `workloads`<sup>Required</sup> <a name="workloads" id="@DataChefHQ/data-landing-zone.OrgOus.property.workloads"></a>

```typescript
public readonly workloads: OrgOuWorkloads;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.OrgOuWorkloads">OrgOuWorkloads</a>

---

### OrgOuSecurity <a name="OrgOuSecurity" id="@DataChefHQ/data-landing-zone.OrgOuSecurity"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.OrgOuSecurity.Initializer"></a>

```typescript
import { OrgOuSecurity } from '@DataChefHQ/data-landing-zone'

const orgOuSecurity: OrgOuSecurity = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.OrgOuSecurity.property.accounts">accounts</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.OrgOuSecurityAccounts">OrgOuSecurityAccounts</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.OrgOuSecurity.property.ouId">ouId</a></code> | <code>string</code> | *No description.* |

---

##### `accounts`<sup>Required</sup> <a name="accounts" id="@DataChefHQ/data-landing-zone.OrgOuSecurity.property.accounts"></a>

```typescript
public readonly accounts: OrgOuSecurityAccounts;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.OrgOuSecurityAccounts">OrgOuSecurityAccounts</a>

---

##### `ouId`<sup>Required</sup> <a name="ouId" id="@DataChefHQ/data-landing-zone.OrgOuSecurity.property.ouId"></a>

```typescript
public readonly ouId: string;
```

- *Type:* string

---

### OrgOuSecurityAccounts <a name="OrgOuSecurityAccounts" id="@DataChefHQ/data-landing-zone.OrgOuSecurityAccounts"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.OrgOuSecurityAccounts.Initializer"></a>

```typescript
import { OrgOuSecurityAccounts } from '@DataChefHQ/data-landing-zone'

const orgOuSecurityAccounts: OrgOuSecurityAccounts = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.OrgOuSecurityAccounts.property.audit">audit</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DLzManagementAccount">DLzManagementAccount</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.OrgOuSecurityAccounts.property.log">log</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DLzManagementAccount">DLzManagementAccount</a></code> | *No description.* |

---

##### `audit`<sup>Required</sup> <a name="audit" id="@DataChefHQ/data-landing-zone.OrgOuSecurityAccounts.property.audit"></a>

```typescript
public readonly audit: DLzManagementAccount;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DLzManagementAccount">DLzManagementAccount</a>

---

##### `log`<sup>Required</sup> <a name="log" id="@DataChefHQ/data-landing-zone.OrgOuSecurityAccounts.property.log"></a>

```typescript
public readonly log: DLzManagementAccount;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DLzManagementAccount">DLzManagementAccount</a>

---

### OrgOuSuspended <a name="OrgOuSuspended" id="@DataChefHQ/data-landing-zone.OrgOuSuspended"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.OrgOuSuspended.Initializer"></a>

```typescript
import { OrgOuSuspended } from '@DataChefHQ/data-landing-zone'

const orgOuSuspended: OrgOuSuspended = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.OrgOuSuspended.property.ouId">ouId</a></code> | <code>string</code> | *No description.* |

---

##### `ouId`<sup>Required</sup> <a name="ouId" id="@DataChefHQ/data-landing-zone.OrgOuSuspended.property.ouId"></a>

```typescript
public readonly ouId: string;
```

- *Type:* string

---

### OrgOuWorkloads <a name="OrgOuWorkloads" id="@DataChefHQ/data-landing-zone.OrgOuWorkloads"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.OrgOuWorkloads.Initializer"></a>

```typescript
import { OrgOuWorkloads } from '@DataChefHQ/data-landing-zone'

const orgOuWorkloads: OrgOuWorkloads = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.OrgOuWorkloads.property.accounts">accounts</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DLzAccount">DLzAccount</a>[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.OrgOuWorkloads.property.ouId">ouId</a></code> | <code>string</code> | *No description.* |

---

##### `accounts`<sup>Required</sup> <a name="accounts" id="@DataChefHQ/data-landing-zone.OrgOuWorkloads.property.accounts"></a>

```typescript
public readonly accounts: DLzAccount[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DLzAccount">DLzAccount</a>[]

---

##### `ouId`<sup>Required</sup> <a name="ouId" id="@DataChefHQ/data-landing-zone.OrgOuWorkloads.property.ouId"></a>

```typescript
public readonly ouId: string;
```

- *Type:* string

---

### OrgRootAccounts <a name="OrgRootAccounts" id="@DataChefHQ/data-landing-zone.OrgRootAccounts"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.OrgRootAccounts.Initializer"></a>

```typescript
import { OrgRootAccounts } from '@DataChefHQ/data-landing-zone'

const orgRootAccounts: OrgRootAccounts = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.OrgRootAccounts.property.management">management</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DLzManagementAccount">DLzManagementAccount</a></code> | *No description.* |

---

##### `management`<sup>Required</sup> <a name="management" id="@DataChefHQ/data-landing-zone.OrgRootAccounts.property.management"></a>

```typescript
public readonly management: DLzManagementAccount;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DLzManagementAccount">DLzManagementAccount</a>

---

### PartialOu <a name="PartialOu" id="@DataChefHQ/data-landing-zone.PartialOu"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.PartialOu.Initializer"></a>

```typescript
import { PartialOu } from '@DataChefHQ/data-landing-zone'

const partialOu: PartialOu = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.PartialOu.property.ouId">ouId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.PartialOu.property.accounts">accounts</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DLzAccount">DLzAccount</a>[]</code> | *No description.* |

---

##### `ouId`<sup>Required</sup> <a name="ouId" id="@DataChefHQ/data-landing-zone.PartialOu.property.ouId"></a>

```typescript
public readonly ouId: string;
```

- *Type:* string

---

##### `accounts`<sup>Optional</sup> <a name="accounts" id="@DataChefHQ/data-landing-zone.PartialOu.property.accounts"></a>

```typescript
public readonly accounts: DLzAccount[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DLzAccount">DLzAccount</a>[]

---

### ReportItem <a name="ReportItem" id="@DataChefHQ/data-landing-zone.ReportItem"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.ReportItem.Initializer"></a>

```typescript
import { ReportItem } from '@DataChefHQ/data-landing-zone'

const reportItem: ReportItem = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.ReportItem.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.ReportItem.property.externalLink">externalLink</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.ReportItem.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.ReportItem.property.type">type</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.ReportType">ReportType</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.ReportItem.property.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.ReportItem.property.appliedFrom">appliedFrom</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.ReportItem.property.region">region</a></code> | <code>string</code> | *No description.* |

---

##### `description`<sup>Required</sup> <a name="description" id="@DataChefHQ/data-landing-zone.ReportItem.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `externalLink`<sup>Required</sup> <a name="externalLink" id="@DataChefHQ/data-landing-zone.ReportItem.property.externalLink"></a>

```typescript
public readonly externalLink: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="@DataChefHQ/data-landing-zone.ReportItem.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `type`<sup>Required</sup> <a name="type" id="@DataChefHQ/data-landing-zone.ReportItem.property.type"></a>

```typescript
public readonly type: ReportType;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.ReportType">ReportType</a>

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="@DataChefHQ/data-landing-zone.ReportItem.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

---

##### `appliedFrom`<sup>Required</sup> <a name="appliedFrom" id="@DataChefHQ/data-landing-zone.ReportItem.property.appliedFrom"></a>

```typescript
public readonly appliedFrom: string;
```

- *Type:* string

---

##### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.ReportItem.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

---

### ReportResource <a name="ReportResource" id="@DataChefHQ/data-landing-zone.ReportResource"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.ReportResource.Initializer"></a>

```typescript
import { ReportResource } from '@DataChefHQ/data-landing-zone'

const reportResource: ReportResource = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.ReportResource.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.ReportResource.property.externalLink">externalLink</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.ReportResource.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.ReportResource.property.type">type</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.ReportType">ReportType</a></code> | *No description.* |

---

##### `description`<sup>Required</sup> <a name="description" id="@DataChefHQ/data-landing-zone.ReportResource.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `externalLink`<sup>Required</sup> <a name="externalLink" id="@DataChefHQ/data-landing-zone.ReportResource.property.externalLink"></a>

```typescript
public readonly externalLink: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="@DataChefHQ/data-landing-zone.ReportResource.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `type`<sup>Required</sup> <a name="type" id="@DataChefHQ/data-landing-zone.ReportResource.property.type"></a>

```typescript
public readonly type: ReportType;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.ReportType">ReportType</a>

---

### RootOptions <a name="RootOptions" id="@DataChefHQ/data-landing-zone.RootOptions"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.RootOptions.Initializer"></a>

```typescript
import { RootOptions } from '@DataChefHQ/data-landing-zone'

const rootOptions: RootOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.RootOptions.property.accounts">accounts</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.OrgRootAccounts">OrgRootAccounts</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.RootOptions.property.controls">controls</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls">DlzControlTowerStandardControls</a>[]</code> | Control Tower Controls applied to all the OUs in the organization. |

---

##### `accounts`<sup>Required</sup> <a name="accounts" id="@DataChefHQ/data-landing-zone.RootOptions.property.accounts"></a>

```typescript
public readonly accounts: OrgRootAccounts;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.OrgRootAccounts">OrgRootAccounts</a>

---

##### `controls`<sup>Optional</sup> <a name="controls" id="@DataChefHQ/data-landing-zone.RootOptions.property.controls"></a>

```typescript
public readonly controls: DlzControlTowerStandardControls[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls">DlzControlTowerStandardControls</a>[]

Control Tower Controls applied to all the OUs in the organization.

---

### SecurityHubNotification <a name="SecurityHubNotification" id="@DataChefHQ/data-landing-zone.SecurityHubNotification"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.SecurityHubNotification.Initializer"></a>

```typescript
import { SecurityHubNotification } from '@DataChefHQ/data-landing-zone'

const securityHubNotification: SecurityHubNotification = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.SecurityHubNotification.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.SecurityHubNotification.property.notification">notification</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.SecurityHubNotificationProps">SecurityHubNotificationProps</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.SecurityHubNotification.property.severity">severity</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.SecurityHubNotificationSeverity">SecurityHubNotificationSeverity</a>[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.SecurityHubNotification.property.workflowStatus">workflowStatus</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.SecurityHubNotificationSWorkflowStatus">SecurityHubNotificationSWorkflowStatus</a>[]</code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.SecurityHubNotification.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `notification`<sup>Required</sup> <a name="notification" id="@DataChefHQ/data-landing-zone.SecurityHubNotification.property.notification"></a>

```typescript
public readonly notification: SecurityHubNotificationProps;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.SecurityHubNotificationProps">SecurityHubNotificationProps</a>

---

##### `severity`<sup>Optional</sup> <a name="severity" id="@DataChefHQ/data-landing-zone.SecurityHubNotification.property.severity"></a>

```typescript
public readonly severity: SecurityHubNotificationSeverity[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.SecurityHubNotificationSeverity">SecurityHubNotificationSeverity</a>[]

---

##### `workflowStatus`<sup>Optional</sup> <a name="workflowStatus" id="@DataChefHQ/data-landing-zone.SecurityHubNotification.property.workflowStatus"></a>

```typescript
public readonly workflowStatus: SecurityHubNotificationSWorkflowStatus[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.SecurityHubNotificationSWorkflowStatus">SecurityHubNotificationSWorkflowStatus</a>[]

---

### SecurityHubNotificationProps <a name="SecurityHubNotificationProps" id="@DataChefHQ/data-landing-zone.SecurityHubNotificationProps"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.SecurityHubNotificationProps.Initializer"></a>

```typescript
import { SecurityHubNotificationProps } from '@DataChefHQ/data-landing-zone'

const securityHubNotificationProps: SecurityHubNotificationProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.SecurityHubNotificationProps.property.emails">emails</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.SecurityHubNotificationProps.property.slack">slack</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.SlackChannel">SlackChannel</a></code> | *No description.* |

---

##### `emails`<sup>Optional</sup> <a name="emails" id="@DataChefHQ/data-landing-zone.SecurityHubNotificationProps.property.emails"></a>

```typescript
public readonly emails: string[];
```

- *Type:* string[]

---

##### `slack`<sup>Optional</sup> <a name="slack" id="@DataChefHQ/data-landing-zone.SecurityHubNotificationProps.property.slack"></a>

```typescript
public readonly slack: SlackChannel;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.SlackChannel">SlackChannel</a>

---

### SlackChannel <a name="SlackChannel" id="@DataChefHQ/data-landing-zone.SlackChannel"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.SlackChannel.Initializer"></a>

```typescript
import { SlackChannel } from '@DataChefHQ/data-landing-zone'

const slackChannel: SlackChannel = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.SlackChannel.property.slackChannelConfigurationName">slackChannelConfigurationName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.SlackChannel.property.slackChannelId">slackChannelId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.SlackChannel.property.slackWorkspaceId">slackWorkspaceId</a></code> | <code>string</code> | *No description.* |

---

##### `slackChannelConfigurationName`<sup>Required</sup> <a name="slackChannelConfigurationName" id="@DataChefHQ/data-landing-zone.SlackChannel.property.slackChannelConfigurationName"></a>

```typescript
public readonly slackChannelConfigurationName: string;
```

- *Type:* string

---

##### `slackChannelId`<sup>Required</sup> <a name="slackChannelId" id="@DataChefHQ/data-landing-zone.SlackChannel.property.slackChannelId"></a>

```typescript
public readonly slackChannelId: string;
```

- *Type:* string

---

##### `slackWorkspaceId`<sup>Required</sup> <a name="slackWorkspaceId" id="@DataChefHQ/data-landing-zone.SlackChannel.property.slackWorkspaceId"></a>

```typescript
public readonly slackWorkspaceId: string;
```

- *Type:* string

---

### WorkloadAccountProps <a name="WorkloadAccountProps" id="@DataChefHQ/data-landing-zone.WorkloadAccountProps"></a>

#### Initializer <a name="Initializer" id="@DataChefHQ/data-landing-zone.WorkloadAccountProps.Initializer"></a>

```typescript
import { WorkloadAccountProps } from '@DataChefHQ/data-landing-zone'

const workloadAccountProps: WorkloadAccountProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadAccountProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadAccountProps.property.name">name</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzStackNameProps">DlzStackNameProps</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadAccountProps.property.dlzAccount">dlzAccount</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DLzAccount">DLzAccount</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.WorkloadAccountProps.property.globalVariables">globalVariables</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.GlobalVariables">GlobalVariables</a></code> | *No description.* |

---

##### `env`<sup>Required</sup> <a name="env" id="@DataChefHQ/data-landing-zone.WorkloadAccountProps.property.env"></a>

```typescript
public readonly env: Environment;
```

- *Type:* aws-cdk-lib.Environment

---

##### `name`<sup>Required</sup> <a name="name" id="@DataChefHQ/data-landing-zone.WorkloadAccountProps.property.name"></a>

```typescript
public readonly name: DlzStackNameProps;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzStackNameProps">DlzStackNameProps</a>

---

##### `dlzAccount`<sup>Required</sup> <a name="dlzAccount" id="@DataChefHQ/data-landing-zone.WorkloadAccountProps.property.dlzAccount"></a>

```typescript
public readonly dlzAccount: DLzAccount;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DLzAccount">DLzAccount</a>

---

##### `globalVariables`<sup>Required</sup> <a name="globalVariables" id="@DataChefHQ/data-landing-zone.WorkloadAccountProps.property.globalVariables"></a>

```typescript
public readonly globalVariables: GlobalVariables;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.GlobalVariables">GlobalVariables</a>

---

## Classes <a name="Classes" id="Classes"></a>

### AccountChatbots <a name="AccountChatbots" id="@DataChefHQ/data-landing-zone.AccountChatbots"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.AccountChatbots.Initializer"></a>

```typescript
import { AccountChatbots } from '@DataChefHQ/data-landing-zone'

new AccountChatbots()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.AccountChatbots.addSlackChannel">addSlackChannel</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.AccountChatbots.existsSlackChannel">existsSlackChannel</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.AccountChatbots.findSlackChannel">findSlackChannel</a></code> | *No description.* |

---

##### `addSlackChannel` <a name="addSlackChannel" id="@DataChefHQ/data-landing-zone.AccountChatbots.addSlackChannel"></a>

```typescript
import { AccountChatbots } from '@DataChefHQ/data-landing-zone'

AccountChatbots.addSlackChannel(scope: Construct, id: string, chatbotProps: SlackChannelConfigurationProps)
```

###### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.AccountChatbots.addSlackChannel.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.AccountChatbots.addSlackChannel.parameter.id"></a>

- *Type:* string

---

###### `chatbotProps`<sup>Required</sup> <a name="chatbotProps" id="@DataChefHQ/data-landing-zone.AccountChatbots.addSlackChannel.parameter.chatbotProps"></a>

- *Type:* aws-cdk-lib.aws_chatbot.SlackChannelConfigurationProps

---

##### `existsSlackChannel` <a name="existsSlackChannel" id="@DataChefHQ/data-landing-zone.AccountChatbots.existsSlackChannel"></a>

```typescript
import { AccountChatbots } from '@DataChefHQ/data-landing-zone'

AccountChatbots.existsSlackChannel(scope: Construct, chatbotProps: SlackChannel)
```

###### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.AccountChatbots.existsSlackChannel.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `chatbotProps`<sup>Required</sup> <a name="chatbotProps" id="@DataChefHQ/data-landing-zone.AccountChatbots.existsSlackChannel.parameter.chatbotProps"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.SlackChannel">SlackChannel</a>

---

##### `findSlackChannel` <a name="findSlackChannel" id="@DataChefHQ/data-landing-zone.AccountChatbots.findSlackChannel"></a>

```typescript
import { AccountChatbots } from '@DataChefHQ/data-landing-zone'

AccountChatbots.findSlackChannel(scope: Construct, chatbotProps: SlackChannel)
```

###### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.AccountChatbots.findSlackChannel.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `chatbotProps`<sup>Required</sup> <a name="chatbotProps" id="@DataChefHQ/data-landing-zone.AccountChatbots.findSlackChannel.parameter.chatbotProps"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.SlackChannel">SlackChannel</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.AccountChatbots.property.slackChatBots">slackChatBots</a></code> | <code>{[ key: string ]: aws-cdk-lib.aws_chatbot.SlackChannelConfiguration}</code> | *No description.* |

---

##### `slackChatBots`<sup>Required</sup> <a name="slackChatBots" id="@DataChefHQ/data-landing-zone.AccountChatbots.property.slackChatBots"></a>

```typescript
public readonly slackChatBots: {[ key: string ]: SlackChannelConfiguration};
```

- *Type:* {[ key: string ]: aws-cdk-lib.aws_chatbot.SlackChannelConfiguration}

---


### Budget <a name="Budget" id="@DataChefHQ/data-landing-zone.Budget"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.Budget.Initializer"></a>

```typescript
import { Budget } from '@DataChefHQ/data-landing-zone'

new Budget(scope: Construct, id: string, props: BudgetProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.Budget.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.Budget.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.Budget.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.BudgetProps">BudgetProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.Budget.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.Budget.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.Budget.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.BudgetProps">BudgetProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.Budget.property.cfnBudget">cfnBudget</a></code> | <code>aws-cdk-lib.aws_budgets.CfnBudget</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.Budget.property.notificationTopic">notificationTopic</a></code> | <code>aws-cdk-lib.aws_sns.Topic</code> | *No description.* |

---

##### `cfnBudget`<sup>Required</sup> <a name="cfnBudget" id="@DataChefHQ/data-landing-zone.Budget.property.cfnBudget"></a>

```typescript
public readonly cfnBudget: CfnBudget;
```

- *Type:* aws-cdk-lib.aws_budgets.CfnBudget

---

##### `notificationTopic`<sup>Required</sup> <a name="notificationTopic" id="@DataChefHQ/data-landing-zone.Budget.property.notificationTopic"></a>

```typescript
public readonly notificationTopic: Topic;
```

- *Type:* aws-cdk-lib.aws_sns.Topic

---


### DataLandingZone <a name="DataLandingZone" id="@DataChefHQ/data-landing-zone.DataLandingZone"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.DataLandingZone.Initializer"></a>

```typescript
import { DataLandingZone } from '@DataChefHQ/data-landing-zone'

new DataLandingZone(app: App, props: DataLandingZoneProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZone.Initializer.parameter.app">app</a></code> | <code>aws-cdk-lib.App</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZone.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a></code> | *No description.* |

---

##### `app`<sup>Required</sup> <a name="app" id="@DataChefHQ/data-landing-zone.DataLandingZone.Initializer.parameter.app"></a>

- *Type:* aws-cdk-lib.App

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.DataLandingZone.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZone.importFrom">importFrom</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZone.stageManagement">stageManagement</a></code> | *No description.* |

---

##### `importFrom` <a name="importFrom" id="@DataChefHQ/data-landing-zone.DataLandingZone.importFrom"></a>

```typescript
public importFrom(accountName: string, region: Region): DataLandingZoneClient
```

###### `accountName`<sup>Required</sup> <a name="accountName" id="@DataChefHQ/data-landing-zone.DataLandingZone.importFrom.parameter.accountName"></a>

- *Type:* string

---

###### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.DataLandingZone.importFrom.parameter.region"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.Region">Region</a>

---

##### `stageManagement` <a name="stageManagement" id="@DataChefHQ/data-landing-zone.DataLandingZone.stageManagement"></a>

```typescript
public stageManagement(): ManagementStack
```


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZone.property.auditStacks">auditStacks</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.AuditStacks">AuditStacks</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZone.property.logStacks">logStacks</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.LogStacks">LogStacks</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZone.property.managementStack">managementStack</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.ManagementStack">ManagementStack</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZone.property.workloadGlobalNetworkConnectionsPhase1Stacks">workloadGlobalNetworkConnectionsPhase1Stacks</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack">WorkloadGlobalNetworkConnectionsPhase1Stack</a>[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZone.property.workloadGlobalNetworkConnectionsPhase2Stacks">workloadGlobalNetworkConnectionsPhase2Stacks</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack">WorkloadGlobalNetworkConnectionsPhase2Stack</a>[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZone.property.workloadGlobalNetworkConnectionsPhase3Stacks">workloadGlobalNetworkConnectionsPhase3Stacks</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack">WorkloadGlobalNetworkConnectionsPhase3Stack</a>[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZone.property.workloadGlobalStacks">workloadGlobalStacks</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack">WorkloadGlobalStack</a>[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZone.property.workloadRegionalNetworkConnectionsPhase2Stacks">workloadRegionalNetworkConnectionsPhase2Stacks</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack">WorkloadRegionalNetworkConnectionsPhase2Stack</a>[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZone.property.workloadRegionalNetworkConnectionsPhase3Stacks">workloadRegionalNetworkConnectionsPhase3Stacks</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack">WorkloadRegionalNetworkConnectionsPhase3Stack</a>[]</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZone.property.workloadRegionalStacks">workloadRegionalStacks</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack">WorkloadRegionalStack</a>[]</code> | *No description.* |

---

##### `auditStacks`<sup>Required</sup> <a name="auditStacks" id="@DataChefHQ/data-landing-zone.DataLandingZone.property.auditStacks"></a>

```typescript
public readonly auditStacks: AuditStacks;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.AuditStacks">AuditStacks</a>

---

##### `logStacks`<sup>Required</sup> <a name="logStacks" id="@DataChefHQ/data-landing-zone.DataLandingZone.property.logStacks"></a>

```typescript
public readonly logStacks: LogStacks;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.LogStacks">LogStacks</a>

---

##### `managementStack`<sup>Required</sup> <a name="managementStack" id="@DataChefHQ/data-landing-zone.DataLandingZone.property.managementStack"></a>

```typescript
public readonly managementStack: ManagementStack;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.ManagementStack">ManagementStack</a>

---

##### `workloadGlobalNetworkConnectionsPhase1Stacks`<sup>Required</sup> <a name="workloadGlobalNetworkConnectionsPhase1Stacks" id="@DataChefHQ/data-landing-zone.DataLandingZone.property.workloadGlobalNetworkConnectionsPhase1Stacks"></a>

```typescript
public readonly workloadGlobalNetworkConnectionsPhase1Stacks: WorkloadGlobalNetworkConnectionsPhase1Stack[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase1Stack">WorkloadGlobalNetworkConnectionsPhase1Stack</a>[]

---

##### `workloadGlobalNetworkConnectionsPhase2Stacks`<sup>Required</sup> <a name="workloadGlobalNetworkConnectionsPhase2Stacks" id="@DataChefHQ/data-landing-zone.DataLandingZone.property.workloadGlobalNetworkConnectionsPhase2Stacks"></a>

```typescript
public readonly workloadGlobalNetworkConnectionsPhase2Stacks: WorkloadGlobalNetworkConnectionsPhase2Stack[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase2Stack">WorkloadGlobalNetworkConnectionsPhase2Stack</a>[]

---

##### `workloadGlobalNetworkConnectionsPhase3Stacks`<sup>Required</sup> <a name="workloadGlobalNetworkConnectionsPhase3Stacks" id="@DataChefHQ/data-landing-zone.DataLandingZone.property.workloadGlobalNetworkConnectionsPhase3Stacks"></a>

```typescript
public readonly workloadGlobalNetworkConnectionsPhase3Stacks: WorkloadGlobalNetworkConnectionsPhase3Stack[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalNetworkConnectionsPhase3Stack">WorkloadGlobalNetworkConnectionsPhase3Stack</a>[]

---

##### `workloadGlobalStacks`<sup>Required</sup> <a name="workloadGlobalStacks" id="@DataChefHQ/data-landing-zone.DataLandingZone.property.workloadGlobalStacks"></a>

```typescript
public readonly workloadGlobalStacks: WorkloadGlobalStack[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.WorkloadGlobalStack">WorkloadGlobalStack</a>[]

---

##### `workloadRegionalNetworkConnectionsPhase2Stacks`<sup>Required</sup> <a name="workloadRegionalNetworkConnectionsPhase2Stacks" id="@DataChefHQ/data-landing-zone.DataLandingZone.property.workloadRegionalNetworkConnectionsPhase2Stacks"></a>

```typescript
public readonly workloadRegionalNetworkConnectionsPhase2Stacks: WorkloadRegionalNetworkConnectionsPhase2Stack[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase2Stack">WorkloadRegionalNetworkConnectionsPhase2Stack</a>[]

---

##### `workloadRegionalNetworkConnectionsPhase3Stacks`<sup>Required</sup> <a name="workloadRegionalNetworkConnectionsPhase3Stacks" id="@DataChefHQ/data-landing-zone.DataLandingZone.property.workloadRegionalNetworkConnectionsPhase3Stacks"></a>

```typescript
public readonly workloadRegionalNetworkConnectionsPhase3Stacks: WorkloadRegionalNetworkConnectionsPhase3Stack[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalNetworkConnectionsPhase3Stack">WorkloadRegionalNetworkConnectionsPhase3Stack</a>[]

---

##### `workloadRegionalStacks`<sup>Required</sup> <a name="workloadRegionalStacks" id="@DataChefHQ/data-landing-zone.DataLandingZone.property.workloadRegionalStacks"></a>

```typescript
public readonly workloadRegionalStacks: WorkloadRegionalStack[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.WorkloadRegionalStack">WorkloadRegionalStack</a>[]

---


### DataLandingZoneClient <a name="DataLandingZoneClient" id="@DataChefHQ/data-landing-zone.DataLandingZoneClient"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.DataLandingZoneClient.Initializer"></a>

```typescript
import { DataLandingZoneClient } from '@DataChefHQ/data-landing-zone'

new DataLandingZoneClient(accountId: string, accountName: string, region: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneClient.Initializer.parameter.accountId">accountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneClient.Initializer.parameter.accountName">accountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneClient.Initializer.parameter.region">region</a></code> | <code>string</code> | *No description.* |

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@DataChefHQ/data-landing-zone.DataLandingZoneClient.Initializer.parameter.accountId"></a>

- *Type:* string

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="@DataChefHQ/data-landing-zone.DataLandingZoneClient.Initializer.parameter.accountName"></a>

- *Type:* string

---

##### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.DataLandingZoneClient.Initializer.parameter.region"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneClient.getBastionSecurityGroupId">getBastionSecurityGroupId</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneClient.getVpcId">getVpcId</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneClient.notificationTopicArn">notificationTopicArn</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneClient.permissionsBoundaryArn">permissionsBoundaryArn</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DataLandingZoneClient.routeTableId">routeTableId</a></code> | *No description.* |

---

##### `getBastionSecurityGroupId` <a name="getBastionSecurityGroupId" id="@DataChefHQ/data-landing-zone.DataLandingZoneClient.getBastionSecurityGroupId"></a>

```typescript
public getBastionSecurityGroupId(bastionName?: string): string
```

###### `bastionName`<sup>Optional</sup> <a name="bastionName" id="@DataChefHQ/data-landing-zone.DataLandingZoneClient.getBastionSecurityGroupId.parameter.bastionName"></a>

- *Type:* string

---

##### `getVpcId` <a name="getVpcId" id="@DataChefHQ/data-landing-zone.DataLandingZoneClient.getVpcId"></a>

```typescript
public getVpcId(vpcName: string): string
```

###### `vpcName`<sup>Required</sup> <a name="vpcName" id="@DataChefHQ/data-landing-zone.DataLandingZoneClient.getVpcId.parameter.vpcName"></a>

- *Type:* string

---

##### `notificationTopicArn` <a name="notificationTopicArn" id="@DataChefHQ/data-landing-zone.DataLandingZoneClient.notificationTopicArn"></a>

```typescript
public notificationTopicArn(): string
```

##### `permissionsBoundaryArn` <a name="permissionsBoundaryArn" id="@DataChefHQ/data-landing-zone.DataLandingZoneClient.permissionsBoundaryArn"></a>

```typescript
public permissionsBoundaryArn(): string
```

##### `routeTableId` <a name="routeTableId" id="@DataChefHQ/data-landing-zone.DataLandingZoneClient.routeTableId"></a>

```typescript
public routeTableId(vpcName: string, segment: string): string
```

###### `vpcName`<sup>Required</sup> <a name="vpcName" id="@DataChefHQ/data-landing-zone.DataLandingZoneClient.routeTableId.parameter.vpcName"></a>

- *Type:* string

---

###### `segment`<sup>Required</sup> <a name="segment" id="@DataChefHQ/data-landing-zone.DataLandingZoneClient.routeTableId.parameter.segment"></a>

- *Type:* string

---




### Defaults <a name="Defaults" id="@DataChefHQ/data-landing-zone.Defaults"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.Defaults.Initializer"></a>

```typescript
import { Defaults } from '@DataChefHQ/data-landing-zone'

new Defaults()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.Defaults.budgets">budgets</a></code> | Budgets for the organization. |
| <code><a href="#@DataChefHQ/data-landing-zone.Defaults.defaultVpcClassB3Private3Public">defaultVpcClassB3Private3Public</a></code> | Creates a Default VPC configuration with 3 private and 3 public subnets. |
| <code><a href="#@DataChefHQ/data-landing-zone.Defaults.denyServiceList">denyServiceList</a></code> | * List of services that are denied in the organization. |
| <code><a href="#@DataChefHQ/data-landing-zone.Defaults.iamIdentityCenterPermissionSets">iamIdentityCenterPermissionSets</a></code> | Provides the AWS managed policy `AdministratorAccess` and `ReadOnlyAccess` as permission sets. |
| <code><a href="#@DataChefHQ/data-landing-zone.Defaults.mandatoryTags">mandatoryTags</a></code> | * Mandatory tags for the organization. |
| <code><a href="#@DataChefHQ/data-landing-zone.Defaults.rootControls">rootControls</a></code> | Control Tower Controls applied to all the OUs in the organization. |

---

##### `budgets` <a name="budgets" id="@DataChefHQ/data-landing-zone.Defaults.budgets"></a>

```typescript
import { Defaults } from '@DataChefHQ/data-landing-zone'

Defaults.budgets(orgTotal: number, infraDlz: number, subscribers: BudgetSubscribers)
```

Budgets for the organization.

###### `orgTotal`<sup>Required</sup> <a name="orgTotal" id="@DataChefHQ/data-landing-zone.Defaults.budgets.parameter.orgTotal"></a>

- *Type:* number

Total budget for the organization in USD.

---

###### `infraDlz`<sup>Required</sup> <a name="infraDlz" id="@DataChefHQ/data-landing-zone.Defaults.budgets.parameter.infraDlz"></a>

- *Type:* number

Budget for this DLZ project identified by tags Owner=infra, Project=dlz in USD.

---

###### `subscribers`<sup>Required</sup> <a name="subscribers" id="@DataChefHQ/data-landing-zone.Defaults.budgets.parameter.subscribers"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.BudgetSubscribers">BudgetSubscribers</a>

Subscribers for the budget.

---

##### `defaultVpcClassB3Private3Public` <a name="defaultVpcClassB3Private3Public" id="@DataChefHQ/data-landing-zone.Defaults.defaultVpcClassB3Private3Public"></a>

```typescript
import { Defaults } from '@DataChefHQ/data-landing-zone'

Defaults.defaultVpcClassB3Private3Public(thirdOctetMask: number, region: Region)
```

Creates a Default VPC configuration with 3 private and 3 public subnets.

Each subnet has a /19 CIDR block. The VPC CIDR is `10.${thirdOctetMask}.0.0/16`

###### `thirdOctetMask`<sup>Required</sup> <a name="thirdOctetMask" id="@DataChefHQ/data-landing-zone.Defaults.defaultVpcClassB3Private3Public.parameter.thirdOctetMask"></a>

- *Type:* number

the third octet of the VPC CIDR.

---

###### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.Defaults.defaultVpcClassB3Private3Public.parameter.region"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.Region">Region</a>

the region where the VPC will be created.

---

##### `denyServiceList` <a name="denyServiceList" id="@DataChefHQ/data-landing-zone.Defaults.denyServiceList"></a>

```typescript
import { Defaults } from '@DataChefHQ/data-landing-zone'

Defaults.denyServiceList()
```

* List of services that are denied in the organization.

##### `iamIdentityCenterPermissionSets` <a name="iamIdentityCenterPermissionSets" id="@DataChefHQ/data-landing-zone.Defaults.iamIdentityCenterPermissionSets"></a>

```typescript
import { Defaults } from '@DataChefHQ/data-landing-zone'

Defaults.iamIdentityCenterPermissionSets()
```

Provides the AWS managed policy `AdministratorAccess` and `ReadOnlyAccess` as permission sets.

##### `mandatoryTags` <a name="mandatoryTags" id="@DataChefHQ/data-landing-zone.Defaults.mandatoryTags"></a>

```typescript
import { Defaults } from '@DataChefHQ/data-landing-zone'

Defaults.mandatoryTags(props: DataLandingZoneProps)
```

* Mandatory tags for the organization.

###### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.Defaults.mandatoryTags.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DataLandingZoneProps">DataLandingZoneProps</a>

---

##### `rootControls` <a name="rootControls" id="@DataChefHQ/data-landing-zone.Defaults.rootControls"></a>

```typescript
import { Defaults } from '@DataChefHQ/data-landing-zone'

Defaults.rootControls()
```

Control Tower Controls applied to all the OUs in the organization.



### DlzAccountNetworks <a name="DlzAccountNetworks" id="@DataChefHQ/data-landing-zone.DlzAccountNetworks"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.DlzAccountNetworks.Initializer"></a>

```typescript
import { DlzAccountNetworks } from '@DataChefHQ/data-landing-zone'

new DlzAccountNetworks()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzAccountNetworks.add">add</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzAccountNetworks.getEntitiesForAddress">getEntitiesForAddress</a></code> | Get NetworkEntities for the given `networkAddress` and match on the given `matchOnAddress`. |

---

##### `add` <a name="add" id="@DataChefHQ/data-landing-zone.DlzAccountNetworks.add"></a>

```typescript
public add(dlzAccount: DLzAccount, networkEntityVpc: NetworkEntityVpc): void
```

###### `dlzAccount`<sup>Required</sup> <a name="dlzAccount" id="@DataChefHQ/data-landing-zone.DlzAccountNetworks.add.parameter.dlzAccount"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DLzAccount">DLzAccount</a>

---

###### `networkEntityVpc`<sup>Required</sup> <a name="networkEntityVpc" id="@DataChefHQ/data-landing-zone.DlzAccountNetworks.add.parameter.networkEntityVpc"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkEntityVpc">NetworkEntityVpc</a>

---

##### `getEntitiesForAddress` <a name="getEntitiesForAddress" id="@DataChefHQ/data-landing-zone.DlzAccountNetworks.getEntitiesForAddress"></a>

```typescript
public getEntitiesForAddress(networkAddress: NetworkAddress, matchOnAddress?: string): DlzAccountNetwork[]
```

Get NetworkEntities for the given `networkAddress` and match on the given `matchOnAddress`.

For example, if the
`networkAddress` is a segment address and `matchOnAddress` has a value of `vpc` then it will return all
NetworkEntities that have the same VPC as the `networkAddress`. Or, if the `matchOnAddress` has a value of
`region` then it will return all NetworkEntities that have the same VPC region as the `networkAddress`.

If the `matchOnAddress` is `account` then the complete NetworkEntity will be returned.
Else, if `matchOnAddress` is `region`, `vpc`, `segment` or `subnet` then a partial NetworkEntity will be returned.
The `vpcs` `routeTables` and `subnets` will be filtered to only include those that match the `networkAddress`. A value of
`undefined` will automatically detect the level of the `networkAddress` and use that as the `matchOnAddress`.

Example:

Given we have these NetworkEntity[]:
1. project-1-develop.us-east-1.default.private
2. project-1-develop.eu-west-1.default.private
3. project-1-production.eu-west-1.default.private

- If the `networkAddress` has a `segment` address of: `project-1-develop.us-east-1.default.private` and the
  `matchOnAddress` value is **`segment`**. Then it will only match the **first** entry of
  `project-1-develop.us-east-1.default.private` and return a partial NetworkEntity with the VPC, and only
  the routeTables and subnets that have the same segment address.

- If the `networkAddress` has the same `segment` address of: `project-1-develop.us-east-1.default.private` and the
  `matchOnAddress` value is changed to **`vpc`**. Then it will match the **first** and **second** entries
   and return the complete NetworkEntity for each.

###### `networkAddress`<sup>Required</sup> <a name="networkAddress" id="@DataChefHQ/data-landing-zone.DlzAccountNetworks.getEntitiesForAddress.parameter.networkAddress"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkAddress">NetworkAddress</a>

---

###### `matchOnAddress`<sup>Optional</sup> <a name="matchOnAddress" id="@DataChefHQ/data-landing-zone.DlzAccountNetworks.getEntitiesForAddress.parameter.matchOnAddress"></a>

- *Type:* string

---




### DlzControlTowerEnabledControl <a name="DlzControlTowerEnabledControl" id="@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControl"></a>

- *Implements:* <a href="#@DataChefHQ/data-landing-zone.IReportResource">IReportResource</a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControl.Initializer"></a>

```typescript
import { DlzControlTowerEnabledControl } from '@DataChefHQ/data-landing-zone'

new DlzControlTowerEnabledControl(scope: Construct, id: string, props: DlzControlTowerEnabledControlProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControl.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControl.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControl.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControlProps">DlzControlTowerEnabledControlProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControl.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControl.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControl.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControlProps">DlzControlTowerEnabledControlProps</a>

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControl.canBeAppliedToSecurityOU">canBeAppliedToSecurityOU</a></code> | Check if the control can be applied to the Security OU. |

---

##### `canBeAppliedToSecurityOU` <a name="canBeAppliedToSecurityOU" id="@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControl.canBeAppliedToSecurityOU"></a>

```typescript
import { DlzControlTowerEnabledControl } from '@DataChefHQ/data-landing-zone'

DlzControlTowerEnabledControl.canBeAppliedToSecurityOU(control: IDlzControlTowerControl)
```

Check if the control can be applied to the Security OU.

Only LEGACY controls can be applied to the Security OU.

###### `control`<sup>Required</sup> <a name="control" id="@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControl.canBeAppliedToSecurityOU.parameter.control"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.IDlzControlTowerControl">IDlzControlTowerControl</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControl.property.control">control</a></code> | <code>aws-cdk-lib.aws_controltower.CfnEnabledControl</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControl.property.reportResource">reportResource</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.ReportResource">ReportResource</a></code> | *No description.* |

---

##### `control`<sup>Required</sup> <a name="control" id="@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControl.property.control"></a>

```typescript
public readonly control: CfnEnabledControl;
```

- *Type:* aws-cdk-lib.aws_controltower.CfnEnabledControl

---

##### `reportResource`<sup>Required</sup> <a name="reportResource" id="@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControl.property.reportResource"></a>

```typescript
public readonly reportResource: ReportResource;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.ReportResource">ReportResource</a>

---


### DlzServiceControlPolicy <a name="DlzServiceControlPolicy" id="@DataChefHQ/data-landing-zone.DlzServiceControlPolicy"></a>

- *Implements:* <a href="#@DataChefHQ/data-landing-zone.IReportResource">IReportResource</a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.DlzServiceControlPolicy.Initializer"></a>

```typescript
import { DlzServiceControlPolicy } from '@DataChefHQ/data-landing-zone'

new DlzServiceControlPolicy(scope: Construct, id: string, props: DlzServiceControlPolicyProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzServiceControlPolicy.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzServiceControlPolicy.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzServiceControlPolicy.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzServiceControlPolicyProps">DlzServiceControlPolicyProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.DlzServiceControlPolicy.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.DlzServiceControlPolicy.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.DlzServiceControlPolicy.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzServiceControlPolicyProps">DlzServiceControlPolicyProps</a>

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzServiceControlPolicy.denyCfnStacksWithoutStandardTags">denyCfnStacksWithoutStandardTags</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzServiceControlPolicy.denyIamPolicyActionStatements">denyIamPolicyActionStatements</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzServiceControlPolicy.denyServiceActionStatements">denyServiceActionStatements</a></code> | *No description.* |

---

##### `denyCfnStacksWithoutStandardTags` <a name="denyCfnStacksWithoutStandardTags" id="@DataChefHQ/data-landing-zone.DlzServiceControlPolicy.denyCfnStacksWithoutStandardTags"></a>

```typescript
import { DlzServiceControlPolicy } from '@DataChefHQ/data-landing-zone'

DlzServiceControlPolicy.denyCfnStacksWithoutStandardTags(tags: DlzTag[])
```

###### `tags`<sup>Required</sup> <a name="tags" id="@DataChefHQ/data-landing-zone.DlzServiceControlPolicy.denyCfnStacksWithoutStandardTags.parameter.tags"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzTag">DlzTag</a>[]

---

##### `denyIamPolicyActionStatements` <a name="denyIamPolicyActionStatements" id="@DataChefHQ/data-landing-zone.DlzServiceControlPolicy.denyIamPolicyActionStatements"></a>

```typescript
import { DlzServiceControlPolicy } from '@DataChefHQ/data-landing-zone'

DlzServiceControlPolicy.denyIamPolicyActionStatements()
```

##### `denyServiceActionStatements` <a name="denyServiceActionStatements" id="@DataChefHQ/data-landing-zone.DlzServiceControlPolicy.denyServiceActionStatements"></a>

```typescript
import { DlzServiceControlPolicy } from '@DataChefHQ/data-landing-zone'

DlzServiceControlPolicy.denyServiceActionStatements(serviceActions: string[])
```

###### `serviceActions`<sup>Required</sup> <a name="serviceActions" id="@DataChefHQ/data-landing-zone.DlzServiceControlPolicy.denyServiceActionStatements.parameter.serviceActions"></a>

- *Type:* string[]

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzServiceControlPolicy.property.policy">policy</a></code> | <code>aws-cdk-lib.aws_organizations.CfnPolicy</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzServiceControlPolicy.property.reportResource">reportResource</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.ReportResource">ReportResource</a></code> | *No description.* |

---

##### `policy`<sup>Required</sup> <a name="policy" id="@DataChefHQ/data-landing-zone.DlzServiceControlPolicy.property.policy"></a>

```typescript
public readonly policy: CfnPolicy;
```

- *Type:* aws-cdk-lib.aws_organizations.CfnPolicy

---

##### `reportResource`<sup>Required</sup> <a name="reportResource" id="@DataChefHQ/data-landing-zone.DlzServiceControlPolicy.property.reportResource"></a>

```typescript
public readonly reportResource: ReportResource;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.ReportResource">ReportResource</a>

---


### DlzSsmReader <a name="DlzSsmReader" id="@DataChefHQ/data-landing-zone.DlzSsmReader"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.DlzSsmReader.Initializer"></a>

```typescript
import { DlzSsmReader } from '@DataChefHQ/data-landing-zone'

new DlzSsmReader()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzSsmReader.getValue">getValue</a></code> | Get the value of an SSM Parameter Store value. |

---

##### `getValue` <a name="getValue" id="@DataChefHQ/data-landing-zone.DlzSsmReader.getValue"></a>

```typescript
import { DlzSsmReader } from '@DataChefHQ/data-landing-zone'

DlzSsmReader.getValue(scope: Construct, id: string, accountId: string, region: string, name: string, fetchType?: string, withDecryption?: boolean)
```

Get the value of an SSM Parameter Store value.

Fetch type `always` will always fetch the value from SSM Parameter Store, this will produce a CDK diff every time.
Fetch type `value-change` will fetch the value from SSM Parameter Store only when the value changes, this will not
produce a CDK diff every time.

###### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.DlzSsmReader.getValue.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.DlzSsmReader.getValue.parameter.id"></a>

- *Type:* string

---

###### `accountId`<sup>Required</sup> <a name="accountId" id="@DataChefHQ/data-landing-zone.DlzSsmReader.getValue.parameter.accountId"></a>

- *Type:* string

---

###### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.DlzSsmReader.getValue.parameter.region"></a>

- *Type:* string

---

###### `name`<sup>Required</sup> <a name="name" id="@DataChefHQ/data-landing-zone.DlzSsmReader.getValue.parameter.name"></a>

- *Type:* string

---

###### `fetchType`<sup>Optional</sup> <a name="fetchType" id="@DataChefHQ/data-landing-zone.DlzSsmReader.getValue.parameter.fetchType"></a>

- *Type:* string

---

###### `withDecryption`<sup>Optional</sup> <a name="withDecryption" id="@DataChefHQ/data-landing-zone.DlzSsmReader.getValue.parameter.withDecryption"></a>

- *Type:* boolean

---



### DlzSsmReaderStackCache <a name="DlzSsmReaderStackCache" id="@DataChefHQ/data-landing-zone.DlzSsmReaderStackCache"></a>

Get the value of an SSM Parameter Store value.

This method will reuse the same CustomResource, reducing the number
of lookups to the same resource within a stack.

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.DlzSsmReaderStackCache.Initializer"></a>

```typescript
import { DlzSsmReaderStackCache } from '@DataChefHQ/data-landing-zone'

new DlzSsmReaderStackCache()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzSsmReaderStackCache.getValue">getValue</a></code> | Fetch type `always` will always fetch the value from SSM Parameter Store, this will produce a CDK diff every time. |

---

##### `getValue` <a name="getValue" id="@DataChefHQ/data-landing-zone.DlzSsmReaderStackCache.getValue"></a>

```typescript
public getValue(scope: Construct, id: string, accountId: string, region: string, name: string, fetchType?: string, withDecryption?: boolean): string
```

Fetch type `always` will always fetch the value from SSM Parameter Store, this will produce a CDK diff every time.

Fetch type `value-change` will fetch the value from SSM Parameter Store only when the value changes, this will not
produce a CDK diff every time.

###### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.DlzSsmReaderStackCache.getValue.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.DlzSsmReaderStackCache.getValue.parameter.id"></a>

- *Type:* string

---

###### `accountId`<sup>Required</sup> <a name="accountId" id="@DataChefHQ/data-landing-zone.DlzSsmReaderStackCache.getValue.parameter.accountId"></a>

- *Type:* string

---

###### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.DlzSsmReaderStackCache.getValue.parameter.region"></a>

- *Type:* string

---

###### `name`<sup>Required</sup> <a name="name" id="@DataChefHQ/data-landing-zone.DlzSsmReaderStackCache.getValue.parameter.name"></a>

- *Type:* string

---

###### `fetchType`<sup>Optional</sup> <a name="fetchType" id="@DataChefHQ/data-landing-zone.DlzSsmReaderStackCache.getValue.parameter.fetchType"></a>

- *Type:* string

---

###### `withDecryption`<sup>Optional</sup> <a name="withDecryption" id="@DataChefHQ/data-landing-zone.DlzSsmReaderStackCache.getValue.parameter.withDecryption"></a>

- *Type:* boolean

---




### DlzTagPolicy <a name="DlzTagPolicy" id="@DataChefHQ/data-landing-zone.DlzTagPolicy"></a>

- *Implements:* <a href="#@DataChefHQ/data-landing-zone.IReportResource">IReportResource</a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.DlzTagPolicy.Initializer"></a>

```typescript
import { DlzTagPolicy } from '@DataChefHQ/data-landing-zone'

new DlzTagPolicy(scope: Construct, id: string, props: DlzTagPolicyProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzTagPolicy.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzTagPolicy.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzTagPolicy.Initializer.parameter.props">props</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzTagPolicyProps">DlzTagPolicyProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@DataChefHQ/data-landing-zone.DlzTagPolicy.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@DataChefHQ/data-landing-zone.DlzTagPolicy.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.DlzTagPolicy.Initializer.parameter.props"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzTagPolicyProps">DlzTagPolicyProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzTagPolicy.property.policy">policy</a></code> | <code>aws-cdk-lib.aws_organizations.CfnPolicy</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzTagPolicy.property.reportResource">reportResource</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.ReportResource">ReportResource</a></code> | *No description.* |

---

##### `policy`<sup>Required</sup> <a name="policy" id="@DataChefHQ/data-landing-zone.DlzTagPolicy.property.policy"></a>

```typescript
public readonly policy: CfnPolicy;
```

- *Type:* aws-cdk-lib.aws_organizations.CfnPolicy

---

##### `reportResource`<sup>Required</sup> <a name="reportResource" id="@DataChefHQ/data-landing-zone.DlzTagPolicy.property.reportResource"></a>

```typescript
public readonly reportResource: ReportResource;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.ReportResource">ReportResource</a>

---


### DlzVpc <a name="DlzVpc" id="@DataChefHQ/data-landing-zone.DlzVpc"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.DlzVpc.Initializer"></a>

```typescript
import { DlzVpc } from '@DataChefHQ/data-landing-zone'

new DlzVpc(dlzAccount: DLzAccount, dlzStack: DlzStack, dlzVpc: DlzVpcProps, networkNats?: NetworkNat[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzVpc.Initializer.parameter.dlzAccount">dlzAccount</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DLzAccount">DLzAccount</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzVpc.Initializer.parameter.dlzStack">dlzStack</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzStack">DlzStack</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzVpc.Initializer.parameter.dlzVpc">dlzVpc</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzVpcProps">DlzVpcProps</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzVpc.Initializer.parameter.networkNats">networkNats</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NetworkNat">NetworkNat</a>[]</code> | *No description.* |

---

##### `dlzAccount`<sup>Required</sup> <a name="dlzAccount" id="@DataChefHQ/data-landing-zone.DlzVpc.Initializer.parameter.dlzAccount"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DLzAccount">DLzAccount</a>

---

##### `dlzStack`<sup>Required</sup> <a name="dlzStack" id="@DataChefHQ/data-landing-zone.DlzVpc.Initializer.parameter.dlzStack"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzStack">DlzStack</a>

---

##### `dlzVpc`<sup>Required</sup> <a name="dlzVpc" id="@DataChefHQ/data-landing-zone.DlzVpc.Initializer.parameter.dlzVpc"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzVpcProps">DlzVpcProps</a>

---

##### `networkNats`<sup>Optional</sup> <a name="networkNats" id="@DataChefHQ/data-landing-zone.DlzVpc.Initializer.parameter.networkNats"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkNat">NetworkNat</a>[]

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzVpc.property.networkEntityVpc">networkEntityVpc</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.NetworkEntityVpc">NetworkEntityVpc</a></code> | *No description.* |

---

##### `networkEntityVpc`<sup>Required</sup> <a name="networkEntityVpc" id="@DataChefHQ/data-landing-zone.DlzVpc.property.networkEntityVpc"></a>

```typescript
public readonly networkEntityVpc: NetworkEntityVpc;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkEntityVpc">NetworkEntityVpc</a>

---


### IamIdentityCenter <a name="IamIdentityCenter" id="@DataChefHQ/data-landing-zone.IamIdentityCenter"></a>

The IAM Identity Center.

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.IamIdentityCenter.Initializer"></a>

```typescript
import { IamIdentityCenter } from '@DataChefHQ/data-landing-zone'

new IamIdentityCenter(dlzStack: DlzStack, organization: DLzOrganization, iamIdentityCenter: IamIdentityCenterProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenter.Initializer.parameter.dlzStack">dlzStack</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzStack">DlzStack</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenter.Initializer.parameter.organization">organization</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DLzOrganization">DLzOrganization</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenter.Initializer.parameter.iamIdentityCenter">iamIdentityCenter</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterProps">IamIdentityCenterProps</a></code> | *No description.* |

---

##### `dlzStack`<sup>Required</sup> <a name="dlzStack" id="@DataChefHQ/data-landing-zone.IamIdentityCenter.Initializer.parameter.dlzStack"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzStack">DlzStack</a>

---

##### `organization`<sup>Required</sup> <a name="organization" id="@DataChefHQ/data-landing-zone.IamIdentityCenter.Initializer.parameter.organization"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DLzOrganization">DLzOrganization</a>

---

##### `iamIdentityCenter`<sup>Required</sup> <a name="iamIdentityCenter" id="@DataChefHQ/data-landing-zone.IamIdentityCenter.Initializer.parameter.iamIdentityCenter"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.IamIdentityCenterProps">IamIdentityCenterProps</a>

---





### NetworkAddress <a name="NetworkAddress" id="@DataChefHQ/data-landing-zone.NetworkAddress"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.NetworkAddress.Initializer"></a>

```typescript
import { NetworkAddress } from '@DataChefHQ/data-landing-zone'

new NetworkAddress(account: string, region?: string, vpc?: string, segment?: string, subnet?: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress.Initializer.parameter.account">account</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress.Initializer.parameter.region">region</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress.Initializer.parameter.vpc">vpc</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress.Initializer.parameter.segment">segment</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress.Initializer.parameter.subnet">subnet</a></code> | <code>string</code> | *No description.* |

---

##### `account`<sup>Required</sup> <a name="account" id="@DataChefHQ/data-landing-zone.NetworkAddress.Initializer.parameter.account"></a>

- *Type:* string

---

##### `region`<sup>Optional</sup> <a name="region" id="@DataChefHQ/data-landing-zone.NetworkAddress.Initializer.parameter.region"></a>

- *Type:* string

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="@DataChefHQ/data-landing-zone.NetworkAddress.Initializer.parameter.vpc"></a>

- *Type:* string

---

##### `segment`<sup>Optional</sup> <a name="segment" id="@DataChefHQ/data-landing-zone.NetworkAddress.Initializer.parameter.segment"></a>

- *Type:* string

---

##### `subnet`<sup>Optional</sup> <a name="subnet" id="@DataChefHQ/data-landing-zone.NetworkAddress.Initializer.parameter.subnet"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress.isAccountAddress">isAccountAddress</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress.isRegionAddress">isRegionAddress</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress.isSegmentAddress">isSegmentAddress</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress.isSubnetAddress">isSubnetAddress</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress.isVpcAddress">isVpcAddress</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress.matches">matches</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress.toString">toString</a></code> | *No description.* |

---

##### `isAccountAddress` <a name="isAccountAddress" id="@DataChefHQ/data-landing-zone.NetworkAddress.isAccountAddress"></a>

```typescript
public isAccountAddress(): boolean
```

##### `isRegionAddress` <a name="isRegionAddress" id="@DataChefHQ/data-landing-zone.NetworkAddress.isRegionAddress"></a>

```typescript
public isRegionAddress(): boolean
```

##### `isSegmentAddress` <a name="isSegmentAddress" id="@DataChefHQ/data-landing-zone.NetworkAddress.isSegmentAddress"></a>

```typescript
public isSegmentAddress(): boolean
```

##### `isSubnetAddress` <a name="isSubnetAddress" id="@DataChefHQ/data-landing-zone.NetworkAddress.isSubnetAddress"></a>

```typescript
public isSubnetAddress(): boolean
```

##### `isVpcAddress` <a name="isVpcAddress" id="@DataChefHQ/data-landing-zone.NetworkAddress.isVpcAddress"></a>

```typescript
public isVpcAddress(): boolean
```

##### `matches` <a name="matches" id="@DataChefHQ/data-landing-zone.NetworkAddress.matches"></a>

```typescript
public matches(other: NetworkAddress): boolean
```

###### `other`<sup>Required</sup> <a name="other" id="@DataChefHQ/data-landing-zone.NetworkAddress.matches.parameter.other"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.NetworkAddress">NetworkAddress</a>

---

##### `toString` <a name="toString" id="@DataChefHQ/data-landing-zone.NetworkAddress.toString"></a>

```typescript
public toString(): string
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress.fromString">fromString</a></code> | *No description.* |

---

##### `fromString` <a name="fromString" id="@DataChefHQ/data-landing-zone.NetworkAddress.fromString"></a>

```typescript
import { NetworkAddress } from '@DataChefHQ/data-landing-zone'

NetworkAddress.fromString(props: string)
```

###### `props`<sup>Required</sup> <a name="props" id="@DataChefHQ/data-landing-zone.NetworkAddress.fromString.parameter.props"></a>

- *Type:* string

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress.property.account">account</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress.property.region">region</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress.property.segment">segment</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress.property.subnet">subnet</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.NetworkAddress.property.vpc">vpc</a></code> | <code>string</code> | *No description.* |

---

##### `account`<sup>Required</sup> <a name="account" id="@DataChefHQ/data-landing-zone.NetworkAddress.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

---

##### `region`<sup>Optional</sup> <a name="region" id="@DataChefHQ/data-landing-zone.NetworkAddress.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

---

##### `segment`<sup>Optional</sup> <a name="segment" id="@DataChefHQ/data-landing-zone.NetworkAddress.property.segment"></a>

```typescript
public readonly segment: string;
```

- *Type:* string

---

##### `subnet`<sup>Optional</sup> <a name="subnet" id="@DataChefHQ/data-landing-zone.NetworkAddress.property.subnet"></a>

```typescript
public readonly subnet: string;
```

- *Type:* string

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="@DataChefHQ/data-landing-zone.NetworkAddress.property.vpc"></a>

```typescript
public readonly vpc: string;
```

- *Type:* string

---


### Report <a name="Report" id="@DataChefHQ/data-landing-zone.Report"></a>

#### Initializers <a name="Initializers" id="@DataChefHQ/data-landing-zone.Report.Initializer"></a>

```typescript
import { Report } from '@DataChefHQ/data-landing-zone'

new Report()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.Report.addReportForAccountRegion">addReportForAccountRegion</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.Report.addReportForAccountRegions">addReportForAccountRegions</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.Report.addReportForOuAccountRegions">addReportForOuAccountRegions</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.Report.addReportForSecurityOuAccountRegions">addReportForSecurityOuAccountRegions</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.Report.printConsoleReport">printConsoleReport</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.Report.saveConsoleReport">saveConsoleReport</a></code> | *No description.* |

---

##### `addReportForAccountRegion` <a name="addReportForAccountRegion" id="@DataChefHQ/data-landing-zone.Report.addReportForAccountRegion"></a>

```typescript
import { Report } from '@DataChefHQ/data-landing-zone'

Report.addReportForAccountRegion(accountName: string, region: string, reportResource: ReportResource)
```

###### `accountName`<sup>Required</sup> <a name="accountName" id="@DataChefHQ/data-landing-zone.Report.addReportForAccountRegion.parameter.accountName"></a>

- *Type:* string

---

###### `region`<sup>Required</sup> <a name="region" id="@DataChefHQ/data-landing-zone.Report.addReportForAccountRegion.parameter.region"></a>

- *Type:* string

---

###### `reportResource`<sup>Required</sup> <a name="reportResource" id="@DataChefHQ/data-landing-zone.Report.addReportForAccountRegion.parameter.reportResource"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.ReportResource">ReportResource</a>

---

##### `addReportForAccountRegions` <a name="addReportForAccountRegions" id="@DataChefHQ/data-landing-zone.Report.addReportForAccountRegions"></a>

```typescript
import { Report } from '@DataChefHQ/data-landing-zone'

Report.addReportForAccountRegions(accountName: string, regions: DlzRegions, reportResource: ReportResource)
```

###### `accountName`<sup>Required</sup> <a name="accountName" id="@DataChefHQ/data-landing-zone.Report.addReportForAccountRegions.parameter.accountName"></a>

- *Type:* string

---

###### `regions`<sup>Required</sup> <a name="regions" id="@DataChefHQ/data-landing-zone.Report.addReportForAccountRegions.parameter.regions"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzRegions">DlzRegions</a>

---

###### `reportResource`<sup>Required</sup> <a name="reportResource" id="@DataChefHQ/data-landing-zone.Report.addReportForAccountRegions.parameter.reportResource"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.ReportResource">ReportResource</a>

---

##### `addReportForOuAccountRegions` <a name="addReportForOuAccountRegions" id="@DataChefHQ/data-landing-zone.Report.addReportForOuAccountRegions"></a>

```typescript
import { Report } from '@DataChefHQ/data-landing-zone'

Report.addReportForOuAccountRegions(partialOu: PartialOu, regions: DlzRegions, reportResource: ReportResource)
```

###### `partialOu`<sup>Required</sup> <a name="partialOu" id="@DataChefHQ/data-landing-zone.Report.addReportForOuAccountRegions.parameter.partialOu"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.PartialOu">PartialOu</a>

---

###### `regions`<sup>Required</sup> <a name="regions" id="@DataChefHQ/data-landing-zone.Report.addReportForOuAccountRegions.parameter.regions"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzRegions">DlzRegions</a>

---

###### `reportResource`<sup>Required</sup> <a name="reportResource" id="@DataChefHQ/data-landing-zone.Report.addReportForOuAccountRegions.parameter.reportResource"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.ReportResource">ReportResource</a>

---

##### `addReportForSecurityOuAccountRegions` <a name="addReportForSecurityOuAccountRegions" id="@DataChefHQ/data-landing-zone.Report.addReportForSecurityOuAccountRegions"></a>

```typescript
import { Report } from '@DataChefHQ/data-landing-zone'

Report.addReportForSecurityOuAccountRegions(securityOu: OrgOuSecurity, regions: DlzRegions, reportResource: ReportResource)
```

###### `securityOu`<sup>Required</sup> <a name="securityOu" id="@DataChefHQ/data-landing-zone.Report.addReportForSecurityOuAccountRegions.parameter.securityOu"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.OrgOuSecurity">OrgOuSecurity</a>

---

###### `regions`<sup>Required</sup> <a name="regions" id="@DataChefHQ/data-landing-zone.Report.addReportForSecurityOuAccountRegions.parameter.regions"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzRegions">DlzRegions</a>

---

###### `reportResource`<sup>Required</sup> <a name="reportResource" id="@DataChefHQ/data-landing-zone.Report.addReportForSecurityOuAccountRegions.parameter.reportResource"></a>

- *Type:* <a href="#@DataChefHQ/data-landing-zone.ReportResource">ReportResource</a>

---

##### `printConsoleReport` <a name="printConsoleReport" id="@DataChefHQ/data-landing-zone.Report.printConsoleReport"></a>

```typescript
import { Report } from '@DataChefHQ/data-landing-zone'

Report.printConsoleReport()
```

##### `saveConsoleReport` <a name="saveConsoleReport" id="@DataChefHQ/data-landing-zone.Report.saveConsoleReport"></a>

```typescript
import { Report } from '@DataChefHQ/data-landing-zone'

Report.saveConsoleReport()
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.Report.property.reports">reports</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.ReportItem">ReportItem</a>[]</code> | *No description.* |

---

##### `reports`<sup>Required</sup> <a name="reports" id="@DataChefHQ/data-landing-zone.Report.property.reports"></a>

```typescript
public readonly reports: ReportItem[];
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.ReportItem">ReportItem</a>[]

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IDlzControlTowerControl <a name="IDlzControlTowerControl" id="@DataChefHQ/data-landing-zone.IDlzControlTowerControl"></a>

- *Implemented By:* <a href="#@DataChefHQ/data-landing-zone.IDlzControlTowerControl">IDlzControlTowerControl</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IDlzControlTowerControl.property.controlFriendlyName">controlFriendlyName</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls">DlzControlTowerStandardControls</a> \| <a href="#@DataChefHQ/data-landing-zone.DlzControlTowerSpecializedControls">DlzControlTowerSpecializedControls</a></code> | The short name of the control, example: AWS-GR_ENCRYPTED_VOLUMES. |
| <code><a href="#@DataChefHQ/data-landing-zone.IDlzControlTowerControl.property.controlIdName">controlIdName</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerControlIdNameProps">DlzControlTowerControlIdNameProps</a></code> | The control ID name used to construct the controlIdentifier, example: AWS-GR_ENCRYPTED_VOLUMES This can differ from the controlFriendlyName for newer controls. |
| <code><a href="#@DataChefHQ/data-landing-zone.IDlzControlTowerControl.property.description">description</a></code> | <code>string</code> | Description of the control. |
| <code><a href="#@DataChefHQ/data-landing-zone.IDlzControlTowerControl.property.externalLink">externalLink</a></code> | <code>string</code> | External link to the control documentation. |
| <code><a href="#@DataChefHQ/data-landing-zone.IDlzControlTowerControl.property.format">format</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerControlFormat">DlzControlTowerControlFormat</a></code> | The format of the control, LEGACY or STANDARD LEGACY controls include the control name in the controlIdentifier STANDARD controls do not include the control name in the controlIdentifier and can not be applied to the Security OU. |
| <code><a href="#@DataChefHQ/data-landing-zone.IDlzControlTowerControl.property.parameters">parameters</a></code> | <code>{[ key: string ]: any}</code> | Optional parameters for the control. |

---

##### `controlFriendlyName`<sup>Required</sup> <a name="controlFriendlyName" id="@DataChefHQ/data-landing-zone.IDlzControlTowerControl.property.controlFriendlyName"></a>

```typescript
public readonly controlFriendlyName: DlzControlTowerStandardControls | DlzControlTowerSpecializedControls;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls">DlzControlTowerStandardControls</a> | <a href="#@DataChefHQ/data-landing-zone.DlzControlTowerSpecializedControls">DlzControlTowerSpecializedControls</a>

The short name of the control, example: AWS-GR_ENCRYPTED_VOLUMES.

---

##### `controlIdName`<sup>Required</sup> <a name="controlIdName" id="@DataChefHQ/data-landing-zone.IDlzControlTowerControl.property.controlIdName"></a>

```typescript
public readonly controlIdName: DlzControlTowerControlIdNameProps;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzControlTowerControlIdNameProps">DlzControlTowerControlIdNameProps</a>

The control ID name used to construct the controlIdentifier, example: AWS-GR_ENCRYPTED_VOLUMES This can differ from the controlFriendlyName for newer controls.

---

##### `description`<sup>Required</sup> <a name="description" id="@DataChefHQ/data-landing-zone.IDlzControlTowerControl.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Description of the control.

---

##### `externalLink`<sup>Required</sup> <a name="externalLink" id="@DataChefHQ/data-landing-zone.IDlzControlTowerControl.property.externalLink"></a>

```typescript
public readonly externalLink: string;
```

- *Type:* string

External link to the control documentation.

---

##### `format`<sup>Required</sup> <a name="format" id="@DataChefHQ/data-landing-zone.IDlzControlTowerControl.property.format"></a>

```typescript
public readonly format: DlzControlTowerControlFormat;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.DlzControlTowerControlFormat">DlzControlTowerControlFormat</a>

The format of the control, LEGACY or STANDARD LEGACY controls include the control name in the controlIdentifier STANDARD controls do not include the control name in the controlIdentifier and can not be applied to the Security OU.

---

##### `parameters`<sup>Optional</sup> <a name="parameters" id="@DataChefHQ/data-landing-zone.IDlzControlTowerControl.property.parameters"></a>

```typescript
public readonly parameters: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Optional parameters for the control.

---

### IReportResource <a name="IReportResource" id="@DataChefHQ/data-landing-zone.IReportResource"></a>

- *Implemented By:* <a href="#@DataChefHQ/data-landing-zone.DlzControlTowerEnabledControl">DlzControlTowerEnabledControl</a>, <a href="#@DataChefHQ/data-landing-zone.DlzServiceControlPolicy">DlzServiceControlPolicy</a>, <a href="#@DataChefHQ/data-landing-zone.DlzTagPolicy">DlzTagPolicy</a>, <a href="#@DataChefHQ/data-landing-zone.IReportResource">IReportResource</a>

Behavioral, used with Inheritance.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IReportResource.property.reportResource">reportResource</a></code> | <code><a href="#@DataChefHQ/data-landing-zone.ReportResource">ReportResource</a></code> | *No description.* |

---

##### `reportResource`<sup>Required</sup> <a name="reportResource" id="@DataChefHQ/data-landing-zone.IReportResource.property.reportResource"></a>

```typescript
public readonly reportResource: ReportResource;
```

- *Type:* <a href="#@DataChefHQ/data-landing-zone.ReportResource">ReportResource</a>

---

## Enums <a name="Enums" id="Enums"></a>

### DlzAccountType <a name="DlzAccountType" id="@DataChefHQ/data-landing-zone.DlzAccountType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzAccountType.DEVELOP">DEVELOP</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzAccountType.PRODUCTION">PRODUCTION</a></code> | *No description.* |

---

##### `DEVELOP` <a name="DEVELOP" id="@DataChefHQ/data-landing-zone.DlzAccountType.DEVELOP"></a>

---


##### `PRODUCTION` <a name="PRODUCTION" id="@DataChefHQ/data-landing-zone.DlzAccountType.PRODUCTION"></a>

---


### DlzControlTowerControlFormat <a name="DlzControlTowerControlFormat" id="@DataChefHQ/data-landing-zone.DlzControlTowerControlFormat"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerControlFormat.LEGACY">LEGACY</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerControlFormat.STANDARD">STANDARD</a></code> | *No description.* |

---

##### `LEGACY` <a name="LEGACY" id="@DataChefHQ/data-landing-zone.DlzControlTowerControlFormat.LEGACY"></a>

---


##### `STANDARD` <a name="STANDARD" id="@DataChefHQ/data-landing-zone.DlzControlTowerControlFormat.STANDARD"></a>

---


### DlzControlTowerSpecializedControls <a name="DlzControlTowerSpecializedControls" id="@DataChefHQ/data-landing-zone.DlzControlTowerSpecializedControls"></a>

Controls that take parameters.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerSpecializedControls.CT_MULTISERVICE_PV_1">CT_MULTISERVICE_PV_1</a></code> | *No description.* |

---

##### `CT_MULTISERVICE_PV_1` <a name="CT_MULTISERVICE_PV_1" id="@DataChefHQ/data-landing-zone.DlzControlTowerSpecializedControls.CT_MULTISERVICE_PV_1"></a>

---


### DlzControlTowerStandardControls <a name="DlzControlTowerStandardControls" id="@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls"></a>

Controls that do not take parameters.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS">AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_ENCRYPTED_VOLUMES">AWS_GR_ENCRYPTED_VOLUMES</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK">AWS_GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED">AWS_GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RDS_STORAGE_ENCRYPTED">AWS_GR_RDS_STORAGE_ENCRYPTED</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RESTRICTED_SSH">AWS_GR_RESTRICTED_SSH</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RESTRICT_ROOT_USER">AWS_GR_RESTRICT_ROOT_USER</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RESTRICT_ROOT_USER_ACCESS_KEYS">AWS_GR_RESTRICT_ROOT_USER_ACCESS_KEYS</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_ROOT_ACCOUNT_MFA_ENABLED">AWS_GR_ROOT_ACCOUNT_MFA_ENABLED</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_S3_BUCKET_PUBLIC_READ_PROHIBITED">AWS_GR_S3_BUCKET_PUBLIC_READ_PROHIBITED</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED">AWS_GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.SH_SECRETS_MANAGER_3">SH_SECRETS_MANAGER_3</a></code> | *No description.* |

---

##### `AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS` <a name="AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS" id="@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS"></a>

---


##### `AWS_GR_ENCRYPTED_VOLUMES` <a name="AWS_GR_ENCRYPTED_VOLUMES" id="@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_ENCRYPTED_VOLUMES"></a>

---


##### `AWS_GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK` <a name="AWS_GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK" id="@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK"></a>

---


##### `AWS_GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED` <a name="AWS_GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED" id="@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED"></a>

---


##### `AWS_GR_RDS_STORAGE_ENCRYPTED` <a name="AWS_GR_RDS_STORAGE_ENCRYPTED" id="@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RDS_STORAGE_ENCRYPTED"></a>

---


##### `AWS_GR_RESTRICTED_SSH` <a name="AWS_GR_RESTRICTED_SSH" id="@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RESTRICTED_SSH"></a>

---


##### `AWS_GR_RESTRICT_ROOT_USER` <a name="AWS_GR_RESTRICT_ROOT_USER" id="@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RESTRICT_ROOT_USER"></a>

---


##### `AWS_GR_RESTRICT_ROOT_USER_ACCESS_KEYS` <a name="AWS_GR_RESTRICT_ROOT_USER_ACCESS_KEYS" id="@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_RESTRICT_ROOT_USER_ACCESS_KEYS"></a>

---


##### `AWS_GR_ROOT_ACCOUNT_MFA_ENABLED` <a name="AWS_GR_ROOT_ACCOUNT_MFA_ENABLED" id="@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_ROOT_ACCOUNT_MFA_ENABLED"></a>

---


##### `AWS_GR_S3_BUCKET_PUBLIC_READ_PROHIBITED` <a name="AWS_GR_S3_BUCKET_PUBLIC_READ_PROHIBITED" id="@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_S3_BUCKET_PUBLIC_READ_PROHIBITED"></a>

---


##### `AWS_GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED` <a name="AWS_GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED" id="@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.AWS_GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED"></a>

---


##### `SH_SECRETS_MANAGER_3` <a name="SH_SECRETS_MANAGER_3" id="@DataChefHQ/data-landing-zone.DlzControlTowerStandardControls.SH_SECRETS_MANAGER_3"></a>

---


### IamIdentityAccounts <a name="IamIdentityAccounts" id="@DataChefHQ/data-landing-zone.IamIdentityAccounts"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityAccounts.ROOT">ROOT</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityAccounts.SECURITY_LOG">SECURITY_LOG</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityAccounts.SECURITY_AUDIT">SECURITY_AUDIT</a></code> | *No description.* |

---

##### `ROOT` <a name="ROOT" id="@DataChefHQ/data-landing-zone.IamIdentityAccounts.ROOT"></a>

---


##### `SECURITY_LOG` <a name="SECURITY_LOG" id="@DataChefHQ/data-landing-zone.IamIdentityAccounts.SECURITY_LOG"></a>

---


##### `SECURITY_AUDIT` <a name="SECURITY_AUDIT" id="@DataChefHQ/data-landing-zone.IamIdentityAccounts.SECURITY_AUDIT"></a>

---


### IamIdentityPermissionSets <a name="IamIdentityPermissionSets" id="@DataChefHQ/data-landing-zone.IamIdentityPermissionSets"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityPermissionSets.ADMIN">ADMIN</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityPermissionSets.READ_ONLY">READ_ONLY</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.IamIdentityPermissionSets.CATALOG">CATALOG</a></code> | *No description.* |

---

##### `ADMIN` <a name="ADMIN" id="@DataChefHQ/data-landing-zone.IamIdentityPermissionSets.ADMIN"></a>

---


##### `READ_ONLY` <a name="READ_ONLY" id="@DataChefHQ/data-landing-zone.IamIdentityPermissionSets.READ_ONLY"></a>

---


##### `CATALOG` <a name="CATALOG" id="@DataChefHQ/data-landing-zone.IamIdentityPermissionSets.CATALOG"></a>

---


### Ou <a name="Ou" id="@DataChefHQ/data-landing-zone.Ou"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.Ou.SECURITY">SECURITY</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.Ou.WORKLOADS">WORKLOADS</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.Ou.SUSPENDED">SUSPENDED</a></code> | *No description.* |

---

##### `SECURITY` <a name="SECURITY" id="@DataChefHQ/data-landing-zone.Ou.SECURITY"></a>

---


##### `WORKLOADS` <a name="WORKLOADS" id="@DataChefHQ/data-landing-zone.Ou.WORKLOADS"></a>

---


##### `SUSPENDED` <a name="SUSPENDED" id="@DataChefHQ/data-landing-zone.Ou.SUSPENDED"></a>

---


### Region <a name="Region" id="@DataChefHQ/data-landing-zone.Region"></a>

Control Tower Supported Regions as listed here https://docs.aws.amazon.com/controltower/latest/userguide/region-how.html with the regions that might have partial or no support for SecurityHub Standard mentioned in the comment https://docs.aws.amazon.com/controltower/latest/userguide/security-hub-controls.html#sh-unsupported-regions Last updated: 22 Mar 2024.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.US_EAST_1">US_EAST_1</a></code> | N. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.US_EAST_2">US_EAST_2</a></code> | Ohio. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.US_WEST_1">US_WEST_1</a></code> | N. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.US_WEST_2">US_WEST_2</a></code> | Oregon. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.CA_CENTRAL_1">CA_CENTRAL_1</a></code> | Canada (Central). |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.EU_WEST_1">EU_WEST_1</a></code> | Ireland. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.EU_WEST_2">EU_WEST_2</a></code> | London. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.EU_WEST_3">EU_WEST_3</a></code> | Paris. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.EU_CENTRAL_1">EU_CENTRAL_1</a></code> | Frankfurt. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.EU_CENTRAL_2">EU_CENTRAL_2</a></code> | Zurich. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.EU_NORTH_1">EU_NORTH_1</a></code> | Stockholm. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.EU_SOUTH_1">EU_SOUTH_1</a></code> | Milan. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.EU_SOUTH_2">EU_SOUTH_2</a></code> | Spain. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.AP_NORTHEAST_1">AP_NORTHEAST_1</a></code> | Tokyo. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.AP_NORTHEAST_2">AP_NORTHEAST_2</a></code> | Seoul. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.AP_NORTHEAST_3">AP_NORTHEAST_3</a></code> | Osaka. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.AP_SOUTHEAST_1">AP_SOUTHEAST_1</a></code> | Singapore. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.AP_SOUTHEAST_2">AP_SOUTHEAST_2</a></code> | Sydney, Melbourne. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.AP_SOUTHEAST_3">AP_SOUTHEAST_3</a></code> | Jakarta No Control Tower SecurityHub Standard support. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.AP_SOUTHEAST_4">AP_SOUTHEAST_4</a></code> | Melbourne No Control Tower SecurityHub Standard support. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.AP_EAST_1">AP_EAST_1</a></code> | Hong Kong No Control Tower SecurityHub Standard support. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.SA_EAST_1">SA_EAST_1</a></code> | Sao Paulo. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.AF_SOUTH_1">AF_SOUTH_1</a></code> | Cape Town No Control Tower SecurityHub Standard support. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.ME_SOUTH_1">ME_SOUTH_1</a></code> | Bahrain, UAE, Tel Aviv No Control Tower SecurityHub Standard support. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.ME_CENTRAL_1">ME_CENTRAL_1</a></code> | UAE No Control Tower SecurityHub Standard support. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.IL_CENTRAL_1">IL_CENTRAL_1</a></code> | Israel No Control Tower SecurityHub Standard support. |
| <code><a href="#@DataChefHQ/data-landing-zone.Region.AP_SOUTH_2">AP_SOUTH_2</a></code> | Hyderabad No Control Tower SecurityHub Standard support. |

---

##### `US_EAST_1` <a name="US_EAST_1" id="@DataChefHQ/data-landing-zone.Region.US_EAST_1"></a>

N.

Virginia

---


##### `US_EAST_2` <a name="US_EAST_2" id="@DataChefHQ/data-landing-zone.Region.US_EAST_2"></a>

Ohio.

---


##### `US_WEST_1` <a name="US_WEST_1" id="@DataChefHQ/data-landing-zone.Region.US_WEST_1"></a>

N.

California

---


##### `US_WEST_2` <a name="US_WEST_2" id="@DataChefHQ/data-landing-zone.Region.US_WEST_2"></a>

Oregon.

---


##### `CA_CENTRAL_1` <a name="CA_CENTRAL_1" id="@DataChefHQ/data-landing-zone.Region.CA_CENTRAL_1"></a>

Canada (Central).

---


##### `EU_WEST_1` <a name="EU_WEST_1" id="@DataChefHQ/data-landing-zone.Region.EU_WEST_1"></a>

Ireland.

---


##### `EU_WEST_2` <a name="EU_WEST_2" id="@DataChefHQ/data-landing-zone.Region.EU_WEST_2"></a>

London.

---


##### `EU_WEST_3` <a name="EU_WEST_3" id="@DataChefHQ/data-landing-zone.Region.EU_WEST_3"></a>

Paris.

---


##### `EU_CENTRAL_1` <a name="EU_CENTRAL_1" id="@DataChefHQ/data-landing-zone.Region.EU_CENTRAL_1"></a>

Frankfurt.

---


##### `EU_CENTRAL_2` <a name="EU_CENTRAL_2" id="@DataChefHQ/data-landing-zone.Region.EU_CENTRAL_2"></a>

Zurich.

---


##### `EU_NORTH_1` <a name="EU_NORTH_1" id="@DataChefHQ/data-landing-zone.Region.EU_NORTH_1"></a>

Stockholm.

---


##### `EU_SOUTH_1` <a name="EU_SOUTH_1" id="@DataChefHQ/data-landing-zone.Region.EU_SOUTH_1"></a>

Milan.

---


##### `EU_SOUTH_2` <a name="EU_SOUTH_2" id="@DataChefHQ/data-landing-zone.Region.EU_SOUTH_2"></a>

Spain.

---


##### `AP_NORTHEAST_1` <a name="AP_NORTHEAST_1" id="@DataChefHQ/data-landing-zone.Region.AP_NORTHEAST_1"></a>

Tokyo.

---


##### `AP_NORTHEAST_2` <a name="AP_NORTHEAST_2" id="@DataChefHQ/data-landing-zone.Region.AP_NORTHEAST_2"></a>

Seoul.

---


##### `AP_NORTHEAST_3` <a name="AP_NORTHEAST_3" id="@DataChefHQ/data-landing-zone.Region.AP_NORTHEAST_3"></a>

Osaka.

---


##### `AP_SOUTHEAST_1` <a name="AP_SOUTHEAST_1" id="@DataChefHQ/data-landing-zone.Region.AP_SOUTHEAST_1"></a>

Singapore.

---


##### `AP_SOUTHEAST_2` <a name="AP_SOUTHEAST_2" id="@DataChefHQ/data-landing-zone.Region.AP_SOUTHEAST_2"></a>

Sydney, Melbourne.

---


##### `AP_SOUTHEAST_3` <a name="AP_SOUTHEAST_3" id="@DataChefHQ/data-landing-zone.Region.AP_SOUTHEAST_3"></a>

Jakarta No Control Tower SecurityHub Standard support.

---


##### `AP_SOUTHEAST_4` <a name="AP_SOUTHEAST_4" id="@DataChefHQ/data-landing-zone.Region.AP_SOUTHEAST_4"></a>

Melbourne No Control Tower SecurityHub Standard support.

---


##### `AP_EAST_1` <a name="AP_EAST_1" id="@DataChefHQ/data-landing-zone.Region.AP_EAST_1"></a>

Hong Kong No Control Tower SecurityHub Standard support.

---


##### `SA_EAST_1` <a name="SA_EAST_1" id="@DataChefHQ/data-landing-zone.Region.SA_EAST_1"></a>

Sao Paulo.

---


##### `AF_SOUTH_1` <a name="AF_SOUTH_1" id="@DataChefHQ/data-landing-zone.Region.AF_SOUTH_1"></a>

Cape Town No Control Tower SecurityHub Standard support.

---


##### `ME_SOUTH_1` <a name="ME_SOUTH_1" id="@DataChefHQ/data-landing-zone.Region.ME_SOUTH_1"></a>

Bahrain, UAE, Tel Aviv No Control Tower SecurityHub Standard support.

---


##### `ME_CENTRAL_1` <a name="ME_CENTRAL_1" id="@DataChefHQ/data-landing-zone.Region.ME_CENTRAL_1"></a>

UAE No Control Tower SecurityHub Standard support.

---


##### `IL_CENTRAL_1` <a name="IL_CENTRAL_1" id="@DataChefHQ/data-landing-zone.Region.IL_CENTRAL_1"></a>

Israel No Control Tower SecurityHub Standard support.

---


##### `AP_SOUTH_2` <a name="AP_SOUTH_2" id="@DataChefHQ/data-landing-zone.Region.AP_SOUTH_2"></a>

Hyderabad No Control Tower SecurityHub Standard support.

---


### ReportType <a name="ReportType" id="@DataChefHQ/data-landing-zone.ReportType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.ReportType.CONTROL_TOWER_CONTROL">CONTROL_TOWER_CONTROL</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.ReportType.CONFIG_RULE">CONFIG_RULE</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.ReportType.SECURITY_HUB_STANDARD">SECURITY_HUB_STANDARD</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.ReportType.TAG_POLICY">TAG_POLICY</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.ReportType.SERVICE_CONTROL_POLICY">SERVICE_CONTROL_POLICY</a></code> | *No description.* |

---

##### `CONTROL_TOWER_CONTROL` <a name="CONTROL_TOWER_CONTROL" id="@DataChefHQ/data-landing-zone.ReportType.CONTROL_TOWER_CONTROL"></a>

---


##### `CONFIG_RULE` <a name="CONFIG_RULE" id="@DataChefHQ/data-landing-zone.ReportType.CONFIG_RULE"></a>

---


##### `SECURITY_HUB_STANDARD` <a name="SECURITY_HUB_STANDARD" id="@DataChefHQ/data-landing-zone.ReportType.SECURITY_HUB_STANDARD"></a>

---


##### `TAG_POLICY` <a name="TAG_POLICY" id="@DataChefHQ/data-landing-zone.ReportType.TAG_POLICY"></a>

---


##### `SERVICE_CONTROL_POLICY` <a name="SERVICE_CONTROL_POLICY" id="@DataChefHQ/data-landing-zone.ReportType.SERVICE_CONTROL_POLICY"></a>

---


### SecurityHubNotificationSeverity <a name="SecurityHubNotificationSeverity" id="@DataChefHQ/data-landing-zone.SecurityHubNotificationSeverity"></a>

https://docs.aws.amazon.com/securityhub/1.0/APIReference/API_Severity.html.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.SecurityHubNotificationSeverity.INFORMATIONAL">INFORMATIONAL</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.SecurityHubNotificationSeverity.LOW">LOW</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.SecurityHubNotificationSeverity.MEDIUM">MEDIUM</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.SecurityHubNotificationSeverity.HIGH">HIGH</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.SecurityHubNotificationSeverity.CRITICAL">CRITICAL</a></code> | *No description.* |

---

##### `INFORMATIONAL` <a name="INFORMATIONAL" id="@DataChefHQ/data-landing-zone.SecurityHubNotificationSeverity.INFORMATIONAL"></a>

---


##### `LOW` <a name="LOW" id="@DataChefHQ/data-landing-zone.SecurityHubNotificationSeverity.LOW"></a>

---


##### `MEDIUM` <a name="MEDIUM" id="@DataChefHQ/data-landing-zone.SecurityHubNotificationSeverity.MEDIUM"></a>

---


##### `HIGH` <a name="HIGH" id="@DataChefHQ/data-landing-zone.SecurityHubNotificationSeverity.HIGH"></a>

---


##### `CRITICAL` <a name="CRITICAL" id="@DataChefHQ/data-landing-zone.SecurityHubNotificationSeverity.CRITICAL"></a>

---


### SecurityHubNotificationSWorkflowStatus <a name="SecurityHubNotificationSWorkflowStatus" id="@DataChefHQ/data-landing-zone.SecurityHubNotificationSWorkflowStatus"></a>

https://docs.aws.amazon.com/securityhub/1.0/APIReference/API_Workflow.html.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@DataChefHQ/data-landing-zone.SecurityHubNotificationSWorkflowStatus.NEW">NEW</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.SecurityHubNotificationSWorkflowStatus.NOTIFIED">NOTIFIED</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.SecurityHubNotificationSWorkflowStatus.SUPPRESSED">SUPPRESSED</a></code> | *No description.* |
| <code><a href="#@DataChefHQ/data-landing-zone.SecurityHubNotificationSWorkflowStatus.RESOLVED">RESOLVED</a></code> | *No description.* |

---

##### `NEW` <a name="NEW" id="@DataChefHQ/data-landing-zone.SecurityHubNotificationSWorkflowStatus.NEW"></a>

---


##### `NOTIFIED` <a name="NOTIFIED" id="@DataChefHQ/data-landing-zone.SecurityHubNotificationSWorkflowStatus.NOTIFIED"></a>

---


##### `SUPPRESSED` <a name="SUPPRESSED" id="@DataChefHQ/data-landing-zone.SecurityHubNotificationSWorkflowStatus.SUPPRESSED"></a>

---


##### `RESOLVED` <a name="RESOLVED" id="@DataChefHQ/data-landing-zone.SecurityHubNotificationSWorkflowStatus.RESOLVED"></a>

---

