import * as path from 'path';

const conformancePacksPath = './scripts/create-cdk-config-rules-and-conformance-packs/cfn-conformance-packs/'

export const CONFORMANCE_PACKS = [
  // Outdated it seems, not referenced in AWS Docs anymore, can not find when it was deprecated.
  // {
  //   friendlyName: "OperationalBestPracticesForCIS",
  //   templateUrl: "https://github.com/awslabs/aws-config-rules/blob/master/aws-config-conformance-packs/Operational-Best-Practices-for-CIS.yaml",
  //   docsUrl: "",
  //   yamlFilePath: path.resolve(conformancePacksPath + 'Operational-Best-Practices-for-CIS.yaml'),
  // },
  {
    friendlyName: "OperationalBestPracticesForCISAWS_v1_4_Level1",
    templateUrl: "https://github.com/awslabs/aws-config-rules/blob/master/aws-config-conformance-packs/Operational-Best-Practices-for-CIS-AWS-v1.4-Level1.yaml",
    docsUrl: "https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_aws_benchmark_level_1.html",
    yamlFilePath: path.resolve(conformancePacksPath + 'Operational-Best-Practices-for-CIS-AWS-v1.4-Level1.yaml'),
  },
  {
    friendlyName: "OperationalBestPracticesForCISAWS_v1_4_Level2",
    templateUrl: "https://github.com/awslabs/aws-config-rules/blob/master/aws-config-conformance-packs/Operational-Best-Practices-for-CIS-AWS-v1.4-Level2.yaml",
    docsUrl: "https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_aws_benchmark_level_2.html",
    yamlFilePath: path.resolve(conformancePacksPath + 'Operational-Best-Practices-for-CIS-AWS-v1.4-Level2.yaml'),
  },
];