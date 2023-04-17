import { Package, PartialConfig, Injectable, Token } from '@ts-phoenix/core';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';
import { Yup } from './service';

@Injectable()
export class YupPackage extends Package<PackageConfigType> {
  getConfigToken(): Token<PackageConfigType> {
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
