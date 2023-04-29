import { Package, PartialConfig } from '@ts-phoenix/core';
import {
  SessionPackage,
  SessionStorageServiceToken,
} from '@ts-phoenix/react-session';

import { SessionStoragePackageConfigToken } from './constants';
import { ISessionStoragePackageConfig } from './defs';
import { SessionStorageService } from './service';

export class SessionStoragePackage extends Package<ISessionStoragePackageConfig> {
  getDependencies() {
    return [SessionPackage];
  }

  bind() {
    this.bindConfig(SessionStoragePackageConfigToken);

    this.core.container
      .bind(SessionStorageServiceToken)
      .to(SessionStorageService)
      .inSingletonScope();
  }

  getDefaultConfig(): PartialConfig<ISessionStoragePackageConfig, null> {
    return {
      localStorageKey: 'session-storage',
    };
  }
}
