import { Package, PartialConfig } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import { SessionPackage } from '@ts-phoenix/react-session';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';

@Injectable()
export class SessionStoragePackage extends Package<PackageConfigType> {
  // theoretically, it doesn't "depend" on it, but it doesn't make sense as standalone
  getDependencies() {
    return [SessionPackage];
  }

  getConfigToken() {
    return PACKAGE_CONFIG_TOKEN;
  }

  getDefaultConfig(): PartialConfig<PackageConfigType, null> {
    return {
      localStorageKey: 'session-storage',
    };
  }
}
