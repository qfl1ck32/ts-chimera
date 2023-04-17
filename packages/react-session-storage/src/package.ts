import { Package, PartialConfig, Injectable } from '@ts-phoenix/core';

import { Config } from './defs';

@Injectable()
export class SessionStoragePackage extends Package<Config> {
  getDefaultConfig(): PartialConfig<Config, null> {
    return {
      localStorageKey: 'session-storage',
    };
  }
}
