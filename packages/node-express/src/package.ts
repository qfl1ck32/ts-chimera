import {
  CoreBeforeInitialiseEvent,
  CoreBeforeShutdownEvent,
  Package,
  PartialConfig,
} from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import { LoggerPackage } from '@ts-phoenix/logger';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';
import { Express } from './service';

@Injectable()
export class ExpressPackage extends Package<PackageConfigType> {
  async initialise() {
    const express = this.core.container.get(Express);

    this.core.eventManager.addListener({
      event: CoreBeforeInitialiseEvent,
      handler: async () => {
        await express.start();
      },
    });

    this.core.eventManager.addListener({
      event: CoreBeforeShutdownEvent,
      handler: async () => {
        await express.stop();
      },
    });
  }

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
