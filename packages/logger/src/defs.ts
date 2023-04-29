import chalk from 'chalk';

export interface ILoggerService {
  info(message: string): Promise<void>;
  error(message: string): Promise<void>;
  warn(message: string): Promise<void>;
  debug(message: string): Promise<void>;
}

export interface ICustomLoggerService extends ILoggerService {
  prefix?: string;

  setPrefix(prefix: string): void;
}

export interface LogArgs {
  message: string;
  level: LogLevel;
}

export enum LogLevel {
  INFO = 'INFO',
  ERROR = 'ERROR',
  WARN = 'WARN',
  DEBUG = 'DEBUG',
}

export interface LogEventData {
  message: string;
  level: LogLevel;
}

export interface ILoggerPackageConfig {
  colors: {
    [key in LogLevel]: chalk.Chalk;
  };
}
