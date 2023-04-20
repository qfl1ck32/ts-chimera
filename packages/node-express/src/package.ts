import { Package, PartialConfig } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import { LoggerPackage } from '@ts-phoenix/logger';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';

@Injectable()
export class ExpressPackage extends Package<PackageConfigType> {
  getDependencies() {
    return [LoggerPackage];
  }

  getConfigToken() {
    return PACKAGE_CONFIG_TOKEN;
  }

  getDefaultConfig(): PartialConfig<PackageConfigType, null> {
    return {
      port: 3000,
    };
  }
}
