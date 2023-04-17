import { Package, PackageConfigToken, PartialConfig } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType, PackageRequiredConfig } from './defs';
import { Session } from './service';

@Injectable()
export class SessionPackage extends Package<
  PackageConfigType,
  PackageRequiredConfig
> {
  getConfigToken(): PackageConfigToken<PackageConfigType> {
    return PACKAGE_CONFIG_TOKEN;
  }

  initialiseServices() {
    return [Session];
  }

  getDefaultConfig(): PartialConfig<PackageConfigType, PackageRequiredConfig> {
    return {
      storage: undefined,
    };
  }
}
