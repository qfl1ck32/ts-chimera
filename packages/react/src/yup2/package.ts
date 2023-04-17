import { Package, PartialConfig, Injectable } from '@ts-phoenix/core';

import { Config } from './defs';

@Injectable()
export class YupPackage extends Package<Config> {
  getDefaultConfig(): PartialConfig<Config, null> {
    return {
      usePathsInTranslations: true,
    };
  }
}
