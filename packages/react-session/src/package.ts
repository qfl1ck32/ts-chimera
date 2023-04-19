import { Package, PartialConfig } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType, PackageRequiredConfig } from './defs';

@Injectable()
export class SessionPackage extends Package<
  PackageConfigType,
  PackageRequiredConfig
> {
  getConfigToken() {
    return PACKAGE_CONFIG_TOKEN;
  }

  getDefaultConfig(): PartialConfig<PackageConfigType, PackageRequiredConfig> {
    return {
      storage: undefined,
    };
  }
}
