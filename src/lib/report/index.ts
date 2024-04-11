import * as fs from 'fs';
import { table } from 'table';
import { DLzAccount, DlzRegions } from '../../data-landing-zone';
import { groupByField } from '../ts-utils';

export enum ReportType {
  CONTROL_TOWER_CONTROL = 'Control Tower Control',
  CONFIG_RULE = 'Config Rule',
  SECURITY_HUB_STANDARD = 'SecurityHub Standard',
  TAG_POLICY = 'Tag Policy',
  SERVICE_CONTROL_POLICY = 'Service Control Policy'
}

export interface ReportResource {
  readonly type: ReportType;
  readonly name: string;
  readonly description: string;
  readonly externalLink: string;
}

/**
 * Behavioral, used with Inheritance
 */
export interface IReportResource {
  readonly reportResource: ReportResource;
}

export interface ReportItem extends ReportResource {
  readonly accountName: string;
  readonly appliedFrom: 'account' | 'ou';
  readonly region: string;
}

export type PartialOu = {
  readonly ouId: string;
  readonly accounts?: Record<string, DLzAccount>;
}

export class Report {

  public static reports: ReportItem[] = [];

  public static addReportForAccountRegion(accountName: string, region: string, reportResource: ReportResource) {
    this.reports.push({
      accountName: accountName,
      appliedFrom: 'account',
      region: region,
      ...reportResource,
    });
  }

  public static addReportForAccountRegions(accountName: string, regions: DlzRegions, reportResource: ReportResource) {
    const allRegions = [regions.global, ...regions.regional];
    for (const region of allRegions) {
      this.reports.push({
        accountName: accountName,
        appliedFrom: 'account',
        region: region,
        ...reportResource,
      });
    }
  }

  public static addReportForOuAccountRegions(ou: any, regions: DlzRegions, reportResource: ReportResource) {
    //TODO: Fix this any later
    const partialOu = ou as PartialOu;

    const allRegions = [regions.global, ...regions.regional];
    const accountNames = Object.keys(partialOu.accounts || []);
    for (const accountName of accountNames) {
      // const account = ou.accounts[accountName];
      for (const region of allRegions) {
        this.reports.push({
          accountName: accountName,
          appliedFrom: 'ou',
          region: region,
          ...reportResource,
        });
      }
    }
  }

  public static printConsoleReport() {
    const grouped = this.groupByAccountTypeNameAggregatedRegions();
    for (let accountName in grouped) {

      console.log('');
      console.log('');
      console.log('============================================================================================================================================================');
      console.log('============================================================================================================================================================');
      console.log('============================================================================================================================================================');
      console.log('');
      console.log('');

      const accountTypes = grouped[accountName];
      for (let type in accountTypes) {
        console.log(`ACCOUNT: ${accountName}`);
        console.log(`TYPE: ${type}`);

        const accountItemsByType = accountTypes[type];

        const tableData = accountItemsByType.map(report => {
          return [report.name, report.appliedFrom, report.regions, report.description, !!report.externalLink];
        });

        const defaultColumnWidth = 30;
        const tableHeader = [['NAME', 'APPLIED FROM', 'REGIONS', 'DESCRIPTION', 'HAS EXTERNAL LINK']];
        const tableOutput = table([
          ...tableHeader,
          ...tableData,
        ],
        {
          border: {
            topBody: '─',
            topJoin: '┬',
            topLeft: '┌',
            topRight: '┐',

            bottomBody: '─',
            bottomJoin: '┴',
            bottomLeft: '└',
            bottomRight: '┘',

            bodyLeft: '│',
            bodyRight: '│',
            bodyJoin: '│',

            joinBody: '─',
            joinLeft: '├',
            joinRight: '┤',
            joinJoin: '┼',
          },
          columns: [
            { width: defaultColumnWidth, wrapWord: true },
            { width: defaultColumnWidth, wrapWord: true },
            { width: defaultColumnWidth, wrapWord: true },
            { width: defaultColumnWidth, wrapWord: true },
            // { width: defaultColumnWidth, wrapWord: true },
          ],

        });

        console.log(
          tableOutput.split('\n').map(line => {
            return '   ' + line;
          }).join('\n'),
        );
      }
    }
  }

  public static saveConsoleReport() {
    if (!fs.existsSync('./.dlz-reports')) {fs.mkdirSync('./.dlz-reports');}

    fs.writeFileSync('./.dlz-reports/raw.json', JSON.stringify(this.reports, null, 2));

    const grouped = this.groupByAccountTypeNameAggregatedRegions();
    for (let accountName in grouped) {
      const accountTypes = grouped[accountName];

      fs.writeFileSync(`./.dlz-reports/account-${accountName}.json`, JSON.stringify(accountTypes, null, 2));
    }
  }

  private static groupByAccountTypeNameAggregatedRegions() {
    const grouped: {
      [accountName: string]: {
        [type: string]: {
          appliedFrom: string;
          name: string;
          description: string;
          externalLink: string;
          regions: string;
        }[];
      };
    } = { };

    const groupedByAccount = groupByField(this.reports, 'accountName');
    for (const accountName in groupedByAccount) {
      grouped[accountName] = {};
      const accountItems = groupedByAccount[accountName];

      const groupedByAccountItemsByType = groupByField(accountItems, 'type');
      for (const type in groupedByAccountItemsByType) {
        grouped[accountName][type] = [];
        const accountItemsByType = groupedByAccountItemsByType[type];
        const groupedByAccountItemsByTypeByName = groupByField(accountItemsByType, 'name');

        // const accountTypeNameAggregatedRegions: (Pick<ReportItem, "appliedFrom" | "name" | "description" | "externalLink"> & { regions: string })[] = [];
        for (const name in groupedByAccountItemsByTypeByName) {

          const reportItem = groupedByAccountItemsByTypeByName[name][0];
          grouped[accountName][type].push({
            appliedFrom: reportItem.appliedFrom,
            name: reportItem.name,
            description: reportItem.description,
            externalLink: reportItem.externalLink,
            regions: groupedByAccountItemsByTypeByName[name].map(item => item.region).join(', '),
          });
        }
      }
    }

    return grouped;
  }

}


