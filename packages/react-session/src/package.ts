import { Package, PartialConfig, Injectable } from '@ts-phoenix/core';

import { Config, RequiredConfig } from './defs';

@Injectable()
export class SessionPackage extends Package<Config, RequiredConfig> {
  getDefaultConfig(): PartialConfig<Config, RequiredConfig> {
    return {
      storage: undefined,
    };
  }
}
