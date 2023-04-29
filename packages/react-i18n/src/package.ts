import { Package, PartialConfig } from '@ts-phoenix/core';

import { I18nPackageConfigToken, I18nServiceToken } from './constants';
import { I18nPackageConfigType } from './defs';
import { I18nService } from './service';

export class I18nPackage extends Package<I18nPackageConfigType> {
  bind() {
    this.bindConfig(I18nPackageConfigToken);

    this.core.container
      .bind(I18nServiceToken)
      .to(I18nService)
      .inSingletonScope();
  }

  getDefaultConfig(): PartialConfig<I18nPackageConfigType, null> {
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
