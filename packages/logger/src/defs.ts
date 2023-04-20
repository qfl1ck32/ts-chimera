import chalk from 'chalk';

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

export type PackageConfigType = {
  colors: {
    [key in LogLevel]: chalk.Chalk;
  };
};
