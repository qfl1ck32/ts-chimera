import { Package } from '@ts-chimera/core';
import { I18n } from './service';
import { Config } from '@src/defs';
import { Constructor } from '@ts-chimera/typings';
import { I18N_CONFIG } from './tokens';

export class I18nPackage extends Package<Config> {
  async initialise(): Promise<void> {
    this.setConfigToken(I18N_CONFIG);
  }

  getServices(): Constructor[] {
    return [I18n];
  }

  getDefaultConfig(): Config {
    return {
      defaultLocale: 'en',
      translations: {},
    };
  }
}
