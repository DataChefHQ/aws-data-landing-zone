# Code History & Bugs

> This doc is experimental. The idea is to keep a record of all the wierd changes/workarounds made to the codebase 
> and any bugs that were found and fixed. So that we have a history of why some things were done a certain way. 
> The writing style can be informal but still professional. 

## Clearing /lib and /dist 
It seems that Projen on its onw does not clear the /lib and /dist folders before producing the assets. We added a 
script `clear-lib-and-dist` that clears the directories and should be run before the `compile` and `package` commands.

Otherwise old files can interfere, especially when moving around files, things like `index.js` files stick around and
messes the imports up. Many hours were spent trying to figure out why the code was not working as expected, while 
testing locally with Python.

## Keeping things away from JSII

The ADR [0005-pass-list-of-classes-in-jsii.md](docs/adr/0005-pass-list-of-classes-in-jsii.md) explains how we had to
use `@internal` to keep the entity(class or interface) away from JSII. But as soon as the class you are trying to hide is used in an 
`exported` entity, it is exposed and then JSII will say that it can not find the `@internal` entity.

The other way to keep things away from JSII is to not `export` it. It can be `exported` in TS, but it should not be 
exported out of the package which happens at `/src/index.ts`. Because that is the entry point for JSII.

## Uppercase class naming breaks JSII

All the `src/constructs/control-tower-control/controls/` break the JSII naming convention, but it does not matter because
they are not exposed in the `src/index.ts` files. So they are essentially ignored by JSII. The properties on the classes
comes from the interface and that is exposed to JSII hence the properties like `eu-west-1` are forced to be camelCase. 
If this was a pure TS project, we could have the enum `[Region.EU_WEST_1]` which has the value of `eu-west-1`.
