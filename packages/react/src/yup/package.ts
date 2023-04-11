import * as yup from 'yup';

import { Package } from '@ts-chimera/core';

import { Config } from './defs';
import { Yup } from './service';

export class YupPackage extends Package<Config> {
  getServices() {
    return [Yup];
  }

  getDefaultConfig(): Config {
    return {
      usePathsInTranslations: false,
    };
  }
}

export { yup };
