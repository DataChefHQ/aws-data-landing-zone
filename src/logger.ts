export interface ILogger {
  info(message: string): void;
  error(message: string): void;
  warn(message: string): void;
}

export enum LogLevel {
  INFO = 1 << 0,
  WARN = 1 << 1,
  ERROR = 1 << 2
}

export class Logger implements ILogger {
  public static staticInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private static instance: Logger;
  private _logLevel: LogLevel = LogLevel.INFO | LogLevel.WARN | LogLevel.ERROR;
  private _logger: ILogger = ConsoleLogger.getInstance();

  private constructor() {
    this.info = this.info.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);
  }


  public info(message: string): void {
    if (LogLevel.INFO & this.logLevel) {
      this.internalLogger.info(message);
    }
  }

  public error(message: string): void {
    if (LogLevel.ERROR & this.logLevel) {
      this.internalLogger.error(message);
    }
  }

  public warn(message: string): void {
    if (LogLevel.WARN & this.logLevel) {
      this.internalLogger.warn(message);
    }
  }

  set logLevel(logLevel: LogLevel) {
    this._logLevel = logLevel;
  }

  get logLevel(): LogLevel {
    return this._logLevel;
  }

  set internalLogger(logger: ILogger) {
    this._logger = logger;
  }

  get internalLogger(): ILogger {
    return this._logger;
  }
}

class ConsoleLogger implements ILogger {

  public static getInstance(): ConsoleLogger {
    if (!ConsoleLogger.instance) {
      ConsoleLogger.instance = new ConsoleLogger();
    }
    return ConsoleLogger.instance;
  }

  private static instance: ConsoleLogger;

  private constructor() {
    this.info = this.info.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);
  }

  public info(message: string): void {
    console.log(message);
  }

  public error(message: string): void {
    console.error(message);
  }

  public warn(message: string): void {
    console.warn(message);
  }
}