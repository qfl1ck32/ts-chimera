import { Package, PartialConfig } from '@ts-chimera/core';
import { Injectable } from '@ts-chimera/react-di';
import { SessionStorage } from './service';
import { SESSION_STORAGE_CONFIG } from './tokens';
import { Config } from './defs';

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
