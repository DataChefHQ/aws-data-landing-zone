export class Logger {
  public static log(message?: any, ...optionalParams: any[]): void {
    console.log(message, ...optionalParams);
  }

  public static debug(message?: any, ...optionalParams: any[]): void {
    if (process.env.CDK_DEBUG === 'true') {
      Logger.log(message, ...optionalParams);
    }
  }
}