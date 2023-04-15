import * as yup from 'yup';

import { Package, PartialConfig } from '@ts-chimera/core';

import { Config } from './defs';
import { Yup } from './service';

export class YupPackage extends Package<Config> {
  getServices() {
    return [Yup];
  }

  getDefaultConfig(): PartialConfig<Config, null> {
    return {
      usePathsInTranslations: true,
    };
  }
}

export { yup };
