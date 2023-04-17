import { Package, PartialConfig, Injectable, Token } from '@ts-phoenix/core';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType, PackageRequiredConfig } from './defs';
import { Session } from './service';

@Injectable()
export class SessionPackage extends Package<
  PackageConfigType,
  PackageRequiredConfig
> {
  getConfigToken(): Token<PackageConfigType> {
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
