import { Package, PartialConfig } from '@ts-phoenix/core';

import { Config } from './defs';
import { Yup } from './service';
import { YUP_CONFIG } from './tokens';

export class YupPackage extends Package<Config> {
  async initialise(): Promise<void> {
    this.setConfigToken(YUP_CONFIG);
  }

  getServices() {
    return [Yup];
  }

  getDefaultConfig(): PartialConfig<Config, null> {
    return {
      usePathsInTranslations: true,
    };
  }
}
