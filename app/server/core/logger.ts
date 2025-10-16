export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

export interface LogObject {
  level: LogLevel;
  timestamp: string;
  message: string;
  details?: any;
}

export class Logger {
  private static formatLog(level: LogLevel, message: string, details?: any): LogObject {
    return {
      level,
      timestamp: new Date().toISOString(),
      message,
      ...(details && { details }),
    };
  }

  static info(message: string, details?: any): void {
    const logEntry = Logger.formatLog(LogLevel.INFO, message, details);
    console.log(JSON.stringify(logEntry));
  }

  static warn(message: string, details?: any): void {
    const logEntry = Logger.formatLog(LogLevel.WARN, message, details);
    console.warn(JSON.stringify(logEntry));
  }

  static error(message: string, details?: any): void {
    const logEntry = Logger.formatLog(LogLevel.ERROR, message, details);
    console.error(JSON.stringify(logEntry));
  }

  static debug(message: string, details?: any): void {
    const logEntry = Logger.formatLog(LogLevel.DEBUG, message, details);
    console.debug(JSON.stringify(logEntry));
  }
}
