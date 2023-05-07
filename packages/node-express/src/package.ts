import { Package, PartialConfig } from '@ts-phoenix/core';
import { EventManagerPackage } from '@ts-phoenix/event-manager';
import { LoggerPackage } from '@ts-phoenix/logger';

import { ExpressPackageConfigToken, ExpressServiceToken } from './constants';
import { IExpressPackageConfig } from './defs';
import { ExpressService } from './service';

export class ExpressPackage extends Package<IExpressPackageConfig> {
  getDependencies() {
    return [LoggerPackage, EventManagerPackage];
  }

  bind() {
    this.bindConfig(ExpressPackageConfigToken);

    this.core.container
      .bind(ExpressServiceToken)
      .to(ExpressService)
      .inSingletonScope();
  }

  getDefaultConfig(): PartialConfig<IExpressPackageConfig, null> {
    return {
      port: 3000,
    };
  }
}
