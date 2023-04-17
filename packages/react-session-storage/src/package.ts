import { Injectable, Package, PartialConfig, Token } from '@ts-phoenix/core';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';
import { SessionStorage } from './service';

@Injectable()
export class SessionStoragePackage extends Package<PackageConfigType> {
  getConfigToken(): Token<PackageConfigType> {
    return PACKAGE_CONFIG_TOKEN;
  }

  initialiseServices() {
    return [SessionStorage];
  }

  getDefaultConfig(): PartialConfig<PackageConfigType, null> {
    return {
      localStorageKey: 'session-storage',
    };
  }
}
