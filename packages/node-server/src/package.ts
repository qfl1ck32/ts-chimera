import { Package, PackageConfigToken, PartialConfig } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import { Constructor } from '@ts-phoenix/typings';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';
import { Server } from './service';

@Injectable()
export class ServerPackage extends Package<PackageConfigType> {
  getConfigToken(): PackageConfigToken<PackageConfigType> {
    return PACKAGE_CONFIG_TOKEN;
  }

  initialiseServices(): Constructor[] {
    return [Server];
  }

  getDefaultConfig(): PartialConfig<PackageConfigType, null> {
    return {
      port: 3000,
    };
  }
}
