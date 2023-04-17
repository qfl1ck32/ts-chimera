import { Package, PartialConfig } from '@ts-phoenix/core';
import { Injectable, Token } from '@ts-phoenix/di';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType, RequiredConfig } from './defs';
import { I18nGenerator } from './service';

@Injectable()
export class I18nGeneratorPackage extends Package<
  PackageConfigType,
  RequiredConfig
> {
  getConfigToken(): Token<PackageConfigType> {
    return PACKAGE_CONFIG_TOKEN;
  }

  initialiseServices() {
    return [I18nGenerator];
  }

  getDefaultConfig(): PartialConfig<PackageConfigType, RequiredConfig> {
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
