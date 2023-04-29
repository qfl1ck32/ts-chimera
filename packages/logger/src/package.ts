import { Package } from '@ts-phoenix/core';
import chalk from 'chalk';

import {
  CustomLoggerServiceToken,
  LoggerPackageConfigToken,
  LoggerServiceToken,
} from './constants';
import { CustomLoggerService } from './custom-logger-service';
import { ILoggerPackageConfig } from './defs';
import { LoggerService } from './logger-service';

export class LoggerPackage extends Package<ILoggerPackageConfig> {
  bind() {
    this.bindConfig(LoggerPackageConfigToken);

    this.core.container
      .bind(LoggerServiceToken)
      .to(LoggerService)
      .inSingletonScope();

    this.core.container
      .bind(CustomLoggerServiceToken)
      .to(CustomLoggerService)
      .inTransientScope();
  }

  getDefaultConfig(): Partial<ILoggerPackageConfig> {
    return {
      colors: {
        INFO: chalk.blueBright,
        ERROR: chalk.red,
        WARN: chalk.yellow,
        DEBUG: chalk.gray,
      },
    };
  }
}
