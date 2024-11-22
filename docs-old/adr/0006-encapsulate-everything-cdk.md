# Encapsulate everything CDK

**Status:** accepted

**Deciders:** Rehan van der Merwe

**Last updated:** 2024-04-11

## Context

We want the DLZ construct to be as configurable as possible. Usually that means passing in other CDK constructs as 
parameters, but it is not possible in the DLZ construct. It's technically possible, but it bleeds the implementation details
and makes it the caller's responsibility to configure it correctly.

Example of what we would have done in a normal CDK construct that is within a stack:
```typescript
export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const alarmTopic = new sns.Topic(this, "alarm-topic");
   
    new NormalConstruct(this, 'construct', {
      topic: alarmTopic
    });
  }
}
```

Since our construct does not define Constructs but Stacks, it is not possible to know what the scope is for constructs.
that are passed in.
```typescript
const app = new App();

const alarmTopic = new sns.Topic(???, "alarm-topic"); <<< Error
  
new StackConstruct(app, {
  topic: alarmTopic
});
```

As mentioned this is technically possible if we expose the stacks, and that implementation would look like: 
```typescript
const app = new App();

const myStackConstruct = new StackConstruct(app, {
  ...
});

const alarmTopic = new sns.Topic(myStackConstruct.stackA, "alarm-topic");
```
But this makes it difficult to `alarmTopic` in the construct, as it is not defined in the construct itself.


## Decision

Let the DLZ construct encapsulate everything. This means that the DLZ construct will create the necessary constructs 
in the correct stacks. This will make the DLZ construct easier to use and will hide the implementation details, but 
if we are not careful we loose the ability to configure these constructs.

```typescript
const app = new App();

const myStackConstruct = new StackConstruct(app, {
  topicName: "alarm-topic"
});
```

In the example above, `StackConstruct` will define the `sns.Topic` with the given id/name internally. 

To keep things configurable, an alternative method would be to pass in the `sns.TopicProps` as a parameter, or allow it
to be retrieved from the stack after the fact by exposing it publicly.

```typescript
const myStackConstruct = new StackConstruct(app, {
  topicProps: {
    topicName: "alarm-topic"
     ...
  }
});

/* OR */

myStackConstruct.stackA.topic
```

Another alternative would be to use functions to add constructs to the correct stack. It would look something like:
```typescript
const myStackConstruct = new StackConstruct(app, {
...
});

const topicProps = {
  topicName: "alarm-topic"
  ...
};

myStackConstruct.addTopic(topicProps)
```
Here the `addTopic` function would create the `sns.Topic` construct on the correct stack.

## Consequences

The DLZ construct will be easier to use and will hide the implementation details. The caller does not need to manually
configure auxiliary constructs to get the desired functionality. The DLZ construct will be responsible for creating the
necessary constructs in the correct stacks. 

Care must be taken to not hide any of the important internally created constructs, as the caller might want to change
or extend them if need be.
