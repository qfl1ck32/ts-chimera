import { Package, PartialConfig } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/react-di';

import { Config } from './defs';
import { SessionStorage } from './service';
import { SESSION_STORAGE_CONFIG } from './tokens';

@Injectable()
export class SessionStoragePackage extends Package<Config> {
  async initialise() {
    this.setConfigToken(SESSION_STORAGE_CONFIG);
  }

  getServices() {
    return [SessionStorage];
  }

  getDefaultConfig(): PartialConfig<Config, null> {
    return {
      localStorageKey: 'session-storage',
    };
  }
}
