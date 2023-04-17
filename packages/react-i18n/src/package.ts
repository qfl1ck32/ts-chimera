import { Package, PartialConfig, Injectable } from '@ts-phoenix/core';

import { Config } from './defs';

@Injectable()
export class I18nPackage extends Package<Config> {
  getDefaultConfig(): PartialConfig<Config, null> {
    return {
      defaultLocale: 'en',
      translations: {},
      interpolationStrings: {
        start: '{{ ',
        end: ' }}',
      },
    };
  }
}
