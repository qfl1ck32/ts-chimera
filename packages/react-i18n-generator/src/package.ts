import { Package, PartialConfig } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';

import { Config, RequiredConfig } from './defs';

@Injectable()
export class I18nGeneratorPackage extends Package<Config, RequiredConfig> {
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
