# Create config rules and conformance packs

This script creates config rules and groups them together to be deployed as conformance packs. It creates CDK constructs
by reading the Conformance Pack CloudFormation YAML at https://github.com/awslabs/aws-config-rules/tree/master/aws-config-conformance-packs. 

## SOP

Standard Operating Procedures

### Adding conformance packs and config rules 

1. Copy the conformance pack YAML from https://github.com/awslabs/aws-config-rules/tree/master/aws-config-conformance-packs
to the `scripts/create-cdk-config-rules-and-conformance-packs/cfn-conformance-packs`.
2. Add the path and other properties to the`CONFORMANCE_PACKS` TS array in `scripts/create-cdk-config-rules-and-conformance-packs/cfn-conformance-packs/index.ts`. 
3. Run `npm run create-cdk-config-rules-and-conformance-packs` to create the CDK constructs in `src/constructs/config/rules`.
4. Copy the output of the script to the `Defaults` class in the `src/defaults.ts` file.
5. Add the generated files to Git and push.
