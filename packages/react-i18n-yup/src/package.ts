import { Package, PackageConfigToken, PartialConfig } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';
import { Yup } from './service';

@Injectable()
export class YupPackage extends Package<PackageConfigType> {
  getConfigToken(): PackageConfigToken<PackageConfigType> {
    return PACKAGE_CONFIG_TOKEN;
  }

  initialiseServices() {
    return [Yup];
  }

  getDefaultConfig(): PartialConfig<PackageConfigType, null> {
    return {
      usePathsInTranslations: true,
    };
  }
}
