import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as config from 'aws-cdk-lib/aws-config';
import * as assert from 'assert';

//@ts-ignore complains about the TS root being /src and this is outside
import {CONFORMANCE_PACKS} from "./cfn-conformance-packs";

import { Project } from 'ts-morph';

/**
 * Get the comments for a property in a TypeScript Class
 * @param tsFilePath
 * @param className
 * @param propertyName
 */
function getPropertyComments(tsFilePath: string, className: string, propertyName: string): string[] {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(tsFilePath);
  const classDeclaration = sourceFile.getClass(className);

  if (classDeclaration) {
    const property = classDeclaration.getProperty(propertyName);
    if (property) {
      return property.getJsDocs().map(doc => doc.getDescription());
    }
  }
  return [];
}



function parseYamlFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return yaml.load(fileContents) as any;
}

// Function to determine the TypeScript type of a YAML value
function getTsType(value: any): string {
  if (typeof value === 'boolean') {
    return 'boolean';
  } else if (typeof value === 'number') {
    return 'number';
  } else if (typeof value === 'string') {
    return 'string';
  } else {
    return 'string'; // Fallback type
  }
}

function getTsTypeValue(value: any): string {
  if (typeof value === 'string') {
    return `"${value}"`;
  } else {
    return value;
  }
}

/**
 * Function to reverse lookup the ManagedRuleIdentifiers value from the config object.
 * Most are 1-1 mappings from CFN, but some are different. Example "INCOMING_SSH_DISABLED" is specified in CFN
 * but it is "EC2_SECURITY_GROUPS_INCOMING_SSH_DISABLED" in the CDK config identifiers.
 * @param value - The value to lookup
 * @returns The key of the value in the ManagedRuleIdentifiers object
 */
function configRuleReverseLookup(value: string): string | undefined {
  if(value === 'AWS_CONFIG_PROCESS_CHECK')
    return 'AWS_CONFIG_PROCESS_CHECK';

  for (const key in config.ManagedRuleIdentifiers) {
    if (config.ManagedRuleIdentifiers[key as keyof typeof config.ManagedRuleIdentifiers] === value) {
      return key;
    }
  }
  return undefined;
}

function toPascalCase(text: string): string {
  return text
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function toUpperSnake(text: string): string {
  return text
    .split('-')
    .map(word => word.toUpperCase())
    .join('_');
}

function getConfigRuleDescriptionFromReflection(ruleName: string): string
{
  const configRulesTsFilePath = path.resolve('./node_modules/aws-cdk-lib/aws-config/lib/rule.d.ts');
  const rawComment = getPropertyComments(configRulesTsFilePath,'ManagedRuleIdentifiers', ruleName);
  if(rawComment.length === 0)
    return '';

  //Remove only the first new line and replace the rest with spaces
  return rawComment[0].replace(/\n/, "").replace(/\n/g, " ");
}

function generateConfigRuleFile(properties: any, cfnParameters: any, outputPath: string)
{
  const isProcessCheck = properties.Source.SourceIdentifier === 'AWS_CONFIG_PROCESS_CHECK';
  let ruleName = toPascalCase(properties.ConfigRuleName);
  let enumValue = properties.Source.SourceIdentifier;
  if(isProcessCheck)
  {
    ruleName = "ProcessCheck"+ruleName;
    enumValue = "AWS_CONFIG_PROCESS_CHECK_"+ toUpperSnake(properties.ConfigRuleName);
  }


  const filePath = path.join(outputPath, `${ruleName}.ts`);


  let propsInterfaceName = `${ruleName}Props`;
  let propsInterface: string[] = [ ];
  let hasProps = !!properties.InputParameters;
  let defaultValues: string[] = [ ];
  if(hasProps)
  {
    propsInterface.push(`export interface ${propsInterfaceName} {`);
    defaultValues.push(`{`);

    for (let [paramName, paramValue] of Object.entries(properties.InputParameters) as [string, any][])
    {
      if(paramValue["Fn::If"] && paramValue["Fn::If"][2] && paramValue["Fn::If"][2].Ref === "AWS::NoValue")
      {
        const defaultCfnRef = paramValue["Fn::If"][1].Ref;
        paramValue = cfnParameters[defaultCfnRef].Default;

        //Certain parameter values are all in strings, so we need to convert them to the correct type
        if(paramValue === 'true')
          paramValue = true;
        else if(paramValue === 'false')
          paramValue = false;
        else if(!isNaN(paramValue))
          paramValue = parseInt(paramValue);
      }

      const paramType = getTsType(paramValue);
      propsInterface.push( ...[
        `    /** @default ${paramValue} */`,
        `    ${paramName}: ${paramType};`
      ])
      defaultValues.push(`      ${paramName}: ${getTsTypeValue(paramValue)},`)
    }

    defaultValues.push('    }');
    propsInterface.push('}');
  }


  let frequency: string | undefined;
  switch (properties.MaximumExecutionFrequency) {
    case 'One_Hour': frequency = "config.MaximumExecutionFrequency.ONE_HOUR"; break;
    case 'Three_Hours': frequency = "config.MaximumExecutionFrequency.THREE_HOURS"; break;
    case 'Six_Hours': frequency = "config.MaximumExecutionFrequency.SIX_HOURS"; break;
    case 'Twelve_Hours': frequency = "config.MaximumExecutionFrequency.TWELVE_HOURS"; break;
    case 'TwentyFour_Hours': frequency = "config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS"; break;
  }

  // Take the longest description we can get
  const cdkConfigRuleIdentifier = configRuleReverseLookup(properties.Source.SourceIdentifier);
  assert.ok(cdkConfigRuleIdentifier);
  const propertiesDescription = properties.Description ? properties.Description.replace(/'/g, "\\'") : '';
  const reflectionDescription = getConfigRuleDescriptionFromReflection(cdkConfigRuleIdentifier);
  const description = propertiesDescription.length > reflectionDescription.length ? propertiesDescription : reflectionDescription;

  const ruleLinkPage = properties.Source.SourceIdentifier.replace(/_/g, '-').toLowerCase();
  const docLink = `https://docs.aws.amazon.com/config/latest/developerguide/${ruleLinkPage}.html`;

  const identifier = cdkConfigRuleIdentifier === 'AWS_CONFIG_PROCESS_CHECK' ?
    `'AWS_CONFIG_PROCESS_CHECK'` :
    `config.ManagedRuleIdentifiers.${cdkConfigRuleIdentifier}`;

  const tsContent = `/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
${!isProcessCheck ? `import * as config from 'aws-cdk-lib/aws-config';` : ''}
import {DlzConfigRuleReportItem, IDlzConfigRule} from '../rule';
${hasProps ? '\n' + propsInterface.join('\n') + '\n' : ''}
/**
 * ${description}
 * ${docLink}
 */
export class ${ruleName} implements IDlzConfigRule {
  readonly configRuleName = '${properties.ConfigRuleName}';
  readonly description = '${(description + " " + docLink).slice(0, 255)}';
  readonly identifier = ${identifier};
  ${frequency ? `readonly maximumExecutionFrequency = ${frequency};` : ''}
  readonly reportItem: DlzConfigRuleReportItem = {
    description: '${description}',
    externalLink: '${docLink}',
  };
  ${hasProps ? `readonly inputParameters: { [p: string]: any };
  constructor(props?: ${propsInterfaceName}) {
    this.inputParameters = props ?? ${defaultValues.join('\n')};
  }` : ''}
}
`;

  fs.writeFileSync(filePath, tsContent, 'utf8');
  // console.log(`Generated file: ${filePath}`);

  return {enumValue, enumDescription: `${description}\n${docLink}`, ruleName};
}

type RuleMapping = {
  ruleName: string,
  enumValue: string,
  enumDescription: string
}

function generateConfigRuleIndex(ruleMappings: RuleMapping[], outputPath: string)
{
  const filePath = path.join(outputPath, `index.ts`);

  const imports = ruleMappings.map(({ruleName}) => `import {${ruleName}} from './${ruleName}';`);
  const enumValues = ruleMappings.map(({enumValue, enumDescription}) => {
    return `/** 
${enumDescription.split('\n').map((line) => `   * ${line}`).join('\n')}
  */
  ${enumValue} = "${enumValue}",`;
  });
  const mappingValues = ruleMappings.map(({ruleName, enumValue}) => `${enumValue}: new ${ruleName}(),`);

  const tsContent = `/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Do not modify this file it is generated from an external source and any changes will be lost upon regeneration.
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
import { IDlzConfigRule } from '../rule';
${imports.join('\n')}

/**
 * Available Config Rules 
 */
export enum ConfigRule {
  ${enumValues.join('\n\n  ')}
}

/**
 * Map of Config Rules so that a control can be referenced by its name
 * @internal
 * */
export class ConfigRuleMappings {

  /**
   * @internal
   * */
  public static all() {
    const standardControlsMap: Record<ConfigRule, IDlzConfigRule> = {
      ${mappingValues.join('\n      ')}
    };
    return standardControlsMap;
  }
}
`;

  fs.writeFileSync(filePath, tsContent, 'utf8');
  // console.log(`Generated file: ${filePath}`);
}

function generateDefaultFunctions(name: string, packEnums: string[], templatrUrl: string, docsUrl: string) {
  const tsContent = `
    /**
     * ConfigRules that come with the ${name} conformance pack
     * ${templatrUrl}
     * ${docsUrl}
     */
    public static configConformancePack${name}(disabledRules: DisabledConfigRule[] = []): ConfigRule[] {
      /** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      * Do not modify this function it is generated from an external source and any changes will be lost upon regeneration.
      *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
      return [
        ${packEnums.map((val) => `ConfigRule.${val},`).join('\n        ')}
      ].filter((rule) => !disabledRules.find((disabledRule) => disabledRule.rule === rule));;
    }`;

  return tsContent;
}



function main() {

  const outputPath = path.resolve('./src/constructs/config/rules/');

  const allRuleMappings: Record<string, RuleMapping> = { };
  for (const conformancePack of CONFORMANCE_PACKS) {
    const configData = parseYamlFile(conformancePack.yamlFilePath);

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath);
    }

    const packEnums: string[] = [];
    if (configData && configData.Resources) {
      for (const resourceKey in configData.Resources) {
        const resource = configData.Resources[resourceKey];
        if (resource.Type === 'AWS::Config::ConfigRule') {
          const ruleMapping = generateConfigRuleFile(resource.Properties, configData.Parameters, outputPath);
          packEnums.push(ruleMapping.enumValue);
          if(!allRuleMappings[ruleMapping.ruleName]) // Only add the Rule once if in multiple conformance packs
            allRuleMappings[ruleMapping.ruleName] = ruleMapping;
        }
      }
    }

    const defaultFunction = generateDefaultFunctions(conformancePack.friendlyName, packEnums, conformancePack.templateUrl, conformancePack.docsUrl);
    console.log(defaultFunction);
  }

  generateConfigRuleIndex(Object.values(allRuleMappings), outputPath);
}

main();
