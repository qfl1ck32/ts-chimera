import { Package, PartialConfig } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import { I18nPackage } from '@ts-phoenix/react-i18n';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';

@Injectable()
export class YupPackage extends Package<PackageConfigType> {
  getDependencies() {
    return [I18nPackage];
  }

  getConfigToken() {
    return PACKAGE_CONFIG_TOKEN;
  }

  getDefaultConfig(): PartialConfig<PackageConfigType, null> {
    return {
      usePathsInTranslations: true,
    };
  }
}
