import { Package } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import chalk from 'chalk';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';

@Injectable()
export class LoggerPackage extends Package<PackageConfigType> {
  getConfigToken() {
    return PACKAGE_CONFIG_TOKEN;
  }

  getDefaultConfig(): Partial<PackageConfigType> {
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
