import { Package, PackageConfigToken, PartialConfig } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import { Constructor } from '@ts-phoenix/typings';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';
import { I18n } from './service';

@Injectable()
export class I18nPackage extends Package<PackageConfigType> {
  getConfigToken(): PackageConfigToken<PackageConfigType> {
    return PACKAGE_CONFIG_TOKEN;
  }

  initialiseServices(): Constructor[] {
    return [I18n];
  }

  getDefaultConfig(): PartialConfig<PackageConfigType, null> {
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
