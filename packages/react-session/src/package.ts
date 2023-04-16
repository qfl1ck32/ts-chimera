import { Package, PartialConfig } from '@ts-chimera/core';
import { Injectable } from '@ts-chimera/react-di';

import { Config, RequiredConfig } from './defs';
import { Session } from './service';
import { SESSION_CONFIG } from './tokens';

@Injectable()
export class SessionPackage extends Package<Config, RequiredConfig> {
  async initialise() {
    this.setConfigToken(SESSION_CONFIG);
  }

  public getServices() {
    return [Session];
  }

  getDefaultConfig(): PartialConfig<Config, RequiredConfig> {
    return {
      storage: undefined,
    };
  }
}
