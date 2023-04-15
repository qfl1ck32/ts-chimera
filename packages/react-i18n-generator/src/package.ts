import { Package, PartialConfig } from '@ts-chimera/core';
import { Injectable } from '@ts-chimera/di';
import { I18nGenerator } from './service';
import { I18N_GENERATOR_CONFIG } from './tokens';
import { Config, RequiredConfig } from './defs';

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
      defaultLanguage: 'en',
      srcDir: 'src',
      i18nFilesRegex: '**/i18n.json',
      interpolation: {
        start: '{{ ',
        end: ' }}',
      },
      missingKey: 'MISSING_KEY',
      outputPath: 'src/translations',

      languages: undefined,
    };
  }
}
