import { Package, PartialConfig } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/react-di';
import { Constructor } from '@ts-phoenix/typings';

import { Config } from './defs';
import { I18n } from './service';
import { I18N_CONFIG } from './tokens';

@Injectable()
export class I18nPackage extends Package<Config> {
  async initialise(): Promise<void> {
    this.setConfigToken(I18N_CONFIG);
  }

  getServices(): Constructor[] {
    return [I18n];
  }

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
