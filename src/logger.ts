interface LoggingOptions {
  readonly verbose: boolean;
  readonly silent: boolean;
}

export class Logger {

  public static info(message: string): void {
    if (Logger.getOptions().verbose && !Logger.getOptions().silent) {
      console.log(message);
    }
  }

  public static error(message: string): void {
    if (!Logger.getOptions().silent) {
      console.error(message);
    }
  }

  private static options: LoggingOptions | undefined = undefined;

  private static getOptions(): LoggingOptions {
    if (!Logger.options) {

      let verbose = false;
      let silent = false;

      for (const key of process.argv) {
        if (key === '--verbose') verbose = true;
        if (key === '--silent') silent = true;
        if (key === '-v') verbose = true;
        if (key === '-s') silent = true;
      }
      Logger.options = {
        verbose: verbose,
        silent: silent,
      };
    }
    return Logger.options;
  }
}