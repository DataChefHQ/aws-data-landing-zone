# Tag Strategy

**Status:** accepted

**Deciders:** Rehan van der Merwe

**Last updated:** 2024-04-03

## Context

It is a limitation of JSII that you can only pass data types that cam be serialized and you can not return any class
or the likes there of.

Example of what you can NOT do:
```typescript
export class AWS_GR_ENCRYPTED_VOLUMES implements IDlzControlTowerControl {
 ...
}

export class DlzControlTowerEnabledControl implements IReportResource {
    public static standardControls() 
    {
        const standardControlsMap: Record<DlzControlTowerStandardControls, IDlzControlTowerControl> = {
          [DlzControlTowerStandardControls.AWS_GR_ENCRYPTED_VOLUMES]: new AWS.AWS_GR_ENCRYPTED_VOLUMES(),
          ...
        };
        return standardControlsMap;
    }
}
```

The usage would look like, we get the defaults and then we can add or remove from it as needed, but this errors:
```typescript
const standardControls = DlzControlTowerEnabledControl.standardControls(); <<<<< BUT THIS ERRORS <<<<<
new DataLandingZone(app, ..., {
    controls: [
      standardControls[DlzControlTowerStandardControls.AWS_GR_ENCRYPTED_VOLUMES],
      new AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS(),
      ...
    ]
});
```

## Decision

The `standardControls` is returning an array of classes. We want to be flexible and allow for the caller to decide what
controls to enable. But we also want them to get a list of defaults that they can use to add to or remove from, hence
the ability to get the list of standard controls as defined by `standardControlsMap`.

So a different approach is used, we just pass an array of enum values. These enum values map to the classes internally.
This map can not be exposed by JSII because its in the form of `Record<string, class>`, thus we need this factory
mapping. In this specific example we let the function return the map otherwise it instantiates all the classes
immediately.

Apart from making the function internal, we also need it to start with an underscore:
```typescript
export class DlzControlTowerEnabledControl implements IReportResource {
  /**
   * Map of standard controls so that a control can be referenced by its name
   * @internal
   * */
  public static _standardControls() {
    const standardControlsMap: Record<DlzControlTowerStandardControls, IDlzControlTowerControl> = {
      [DlzControlTowerStandardControls.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS]: new AWS.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS(),
      ...
    };
    return standardControlsMap;
  }
}

export class Defaults {
  /**
   * Control Tower Controls applied to all the OUs in the organization
   */
  public static rootControls(): DlzControlTowerStandardControls[] {
    return [
      DlzControlTowerStandardControls.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS,
      DlzControlTowerStandardControls.AWS_GR_ENCRYPTED_VOLUMES,
      ....
  ];
  }
}
```

So instead we must pass an array of enum values and then internally select the correct class, the usage changes to:
```typescript
const defaultControls = Default.rootControls();
new DataLandingZone(app, ..., {
  controls: [
    ...defaultControls,
      DlzControlTowerStandardControls.AWS_GR_ENCRYPTED_VOLUMES,
      DlzControlTowerStandardControls.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS,
    ]
});
```

Now JSII won't complain, but we can not use it outside the project (you can for TS but not other languages). This is fine
because now we pass an array of the enum values to select the correct class internally. Now we can get a list of enum
values for standard controls, add/remove from it, and then add specific controls as well.

## Consequences

We loose the ability to pass in arguments to the control, the workaround would be to pass an additional property that
has all the arguments for all controls. Then when we create the map in the code, we pass these parameters when we
instantiate the classes. Example:

```typescript
export class DlzControlTowerEnabledControl implements IReportResource {
  /**
   * Map of standard controls so that a control can be referenced by its name
   * @internal
   * */
  public static _standardControls(controlProps: XXX) {
    const standardControlsMap: Record<DlzControlTowerStandardControls, IDlzControlTowerControl> = {
      [DlzControlTowerStandardControls.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS]: new AWS.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS(
            something: controlProps.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS.something
          ),
      ...
    };
    return standardControlsMap;
  }
}
```

```typescript
const defaultControls = Default.rootControls();
new DataLandingZone(app, ..., {
    controls: [
      ...defaultControls,
      DlzControlTowerStandardControls.AWS_GR_ENCRYPTED_VOLUMES,
      DlzControlTowerStandardControls.AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS,
    ],
     controlProps: {
       AWS_GR_MFA_ENABLED_FOR_IAM_CONSOLE_ACCESS: {
         something: 'value'
       }
     }
});
```

JSII makes us jump through a lot of loops to get this working, but it is possible.

