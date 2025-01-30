import axios from 'axios';
import * as cheerio from 'cheerio';


async function main()
{
  const response = await axios.get('https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_supported-resources-enforcement.html', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  });

  // Load the HTML content
  const $ = cheerio.load(response.data);
  // const pageHtml = $('body').html();
  // console.debug(pageHtml);

  const jsonArray: string[] = [];
  $('table tbody tr').each((index, element) => {
    // Select the "JSON syntax" column (3rd <td>)
    const jsonSyntax = $(element).find('td').eq(2).find('code').map((i, el) => $(el).text().slice(1,-1)).get();
    jsonArray.push(...jsonSyntax);
  });
  // console.log(jsonArray);


  const starrServiceActions = jsonArray.filter((value) => value.endsWith('*'));
  const additionalMainServiceActions: string[] = [
    "backup:backup-plan",
    "batch:job",
    "logs:log-group",
    "ec2:elastic-ip",
    "ec2:instance",
    "ec2:vpc",
    "ec2:security-group",
    "ecr:repository",
    "ecs:service",
    "eks:cluster",
    "es:domain",
    "elasticmapreduce:cluster",
    "elasticache:cluster",
    "iam:policy",
    "network-firewall:firewall",
    "rds:secgrp",
    "s3:bucket",
    "sns:topic",
    "sqs:queue",
  ]
  const allServiceActions = [...starrServiceActions, ...additionalMainServiceActions];
  console.log(allServiceActions);
  console.log(JSON.stringify(allServiceActions).length);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
