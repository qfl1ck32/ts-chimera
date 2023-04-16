import { Package, PartialConfig } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';

import { Config, RequiredConfig } from './defs';
import { I18nGenerator } from './service';
import { I18N_GENERATOR_CONFIG } from './tokens';

@Injectable()
export class I18nGeneratorPackage extends Package<Config, RequiredConfig> {
  async initialise(): Promise<void> {
    this.setConfigToken(I18N_GENERATOR_CONFIG);
  }

  getServices() {
    return [I18nGenerator];
  }

  getDefaultConfig(): PartialConfig<Config, RequiredConfig> {
    return {
      defaultLocale: 'en',
      srcDir: 'src',
      i18nFilesRegex: '**/i18n.json',
      interpolation: {
        start: '{{ ',
        end: ' }}',
      },
      missingKey: 'MISSING_KEY',
      outputPath: 'src/translations',

      locales: undefined,
    };
  }
}
