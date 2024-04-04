import {DLzAccount, DlzRegions} from "../../data-landing-zone";
import {table} from "table";

export enum ReportType {
  ControlTowerControl = 'Control Tower Control',
  ConfigRule = 'Config Rule',
  SecurityHubStandard = 'SecurityHub Standard',
  TagPolicy = 'Tag Policy',
  ServiceControlPolicy = 'Service Control Policy'
}

export interface ReportResource  {
  type: ReportType;
  name: string;
  description: string;
  externalLink: string;
}

/**
 * Behavioral, used with Inheritance
 */
export interface IReportResource  {
  readonly reportResource: ReportResource;
}

export interface ReportItem extends ReportResource {
  accountName: string;
  appliedFrom: "account" | "ou"
  region: string;
}

export type PartialOu = {
  ouId: string;
  accounts?: Record<string, DLzAccount>;
}

export class Report {
  private static report: ReportItem[] = [];

  public static addReportForAccountRegion(accountName: string, region: string, reportResource: ReportResource) {
    this.report.push({
      accountName: accountName,
      appliedFrom: "account",
      region: region,
      ...reportResource
    });
  }

  public static addReportForAccountRegions(accountName: string, regions: DlzRegions, reportResource: ReportResource) {
    const allRegions = [regions.global, ...regions.regional];
    for (const region of allRegions) {
      this.report.push({
        accountName: accountName,
        appliedFrom: "account",
        region: region,
        ...reportResource
      });
    }
  }

  public static addReportForOuAccountRegions(ou: any, regions: DlzRegions, reportResource: ReportResource)
  {
    //TODO: Fix this any later
    const partialOu = ou as PartialOu;

    const allRegions = [regions.global, ...regions.regional];
    const accountNames = Object.keys(partialOu.accounts || [])
    for (const accountName of accountNames) {
      // const account = ou.accounts[accountName];
      for (const region of allRegions) {
        this.report.push({
          accountName: accountName,
          appliedFrom: "ou",
          region: region,
          ...reportResource
        });
      }
    }
  }

  public static getReports(): ReportItem[] {
    return this.report;
  }

  public static printConsoleReport()
  {
    // console.table(Report.getReports())
    const reports = Report.getReports();

    function groupByField<T>(items: T[], field: keyof T): {[key: string]: T[]} {
      return items.reduce<{[key: string]: T[]}>((acc, item) => {
        const key = String(item[field]);
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {});
    }

    const groupedByAccount = groupByField(reports, 'accountName');
    for(const accountName in groupedByAccount) {

      console.log('');
      console.log('');
      console.log('============================================================================================================================================');
      console.log('============================================================================================================================================');
      console.log('============================================================================================================================================');
      console.log('');
      console.log('');
      // console.log(`ACCOUNT: ${accountName}`);
      // console.log('');
      const accountItems = groupedByAccount[accountName];

      const groupedByAccountItemsByType = groupByField(accountItems, 'type');
      for(const type in groupedByAccountItemsByType) {
        console.log(`ACCOUNT: ${accountName}`);
        console.log(`TYPE: ${type}`);
        // console.log('');

        const accountItemsByType = groupedByAccountItemsByType[type];
        const groupedByAccountItemsByTypeByName = groupByField(accountItemsByType, 'name'); // then rduce by region.


        const accountTypeNameAggregatedRegions: (Pick<ReportItem, "appliedFrom" | "name" | "description" | "externalLink"> & { regions: string })[] = [];
        for(const name in groupedByAccountItemsByTypeByName) {
          const reportItem = groupedByAccountItemsByTypeByName[name][0];
          accountTypeNameAggregatedRegions.push({
            appliedFrom: reportItem.appliedFrom,
            name: reportItem.name,
            description: reportItem.description,
            externalLink: reportItem.externalLink,
            regions: groupedByAccountItemsByTypeByName[name].map(item => item.region).join(', ')
          })
        }

        const tableData = accountTypeNameAggregatedRegions.map(report => {
          return [report.name, report.appliedFrom, report.regions, report.description, report.externalLink];
        });

        const defaultColumnWidth = 30;
        const tableHeader = [['NAME', 'APPLIED FROM', 'REGIONS', 'DESCRIPTION', 'EXTERNAL LINK']];
        const tableOutput = table([
            ...tableHeader,
            ...tableData
          ],
          {
            border: {
              topBody: `─`,
              topJoin: `┬`,
              topLeft: `┌`,
              topRight: `┐`,

              bottomBody: `─`,
              bottomJoin: `┴`,
              bottomLeft: `└`,
              bottomRight: `┘`,

              bodyLeft: `│`,
              bodyRight: `│`,
              bodyJoin: `│`,

              joinBody: `─`,
              joinLeft: `├`,
              joinRight: `┤`,
              joinJoin: `┼`
            },
            columns: [
              { width: defaultColumnWidth, wrapWord: true },
              { width: defaultColumnWidth, wrapWord: true },
              { width: defaultColumnWidth, wrapWord: true },
              { width: defaultColumnWidth, wrapWord: true },
              // { width: defaultColumnWidth, wrapWord: true },
            ]

          });

        console.log(
          tableOutput.split('\n').map(line => {
            return "   " + line;
          }).join('\n')
        );
      }
    }
  }

}


