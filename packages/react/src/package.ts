import { Package, createPackageDependency } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/react-di';
import { I18nPackage } from '@ts-phoenix/react-i18n';
import { SessionPackage } from '@ts-phoenix/react-session';
import {
  SessionStorage,
  SessionStoragePackage,
} from '@ts-phoenix/react-session-storage';

import { DayjsPackage } from './dayjs2';
import { ReactPackageConfig } from './defs';
import { YupPackage } from './yup2';

@Injectable()
export class ReactPackage extends Package<ReactPackageConfig> {
  getServices() {
    return [];
  }

  getDependencies() {
    return [
      createPackageDependency(DayjsPackage),
      createPackageDependency(YupPackage, this.config.yup),
      createPackageDependency(
        SessionStoragePackage,
        this.config.sessionStorage,
      ),
      createPackageDependency(
        SessionStoragePackage,
        this.config.sessionStorage,
      ),
      createPackageDependency(SessionPackage, {
        storage: SessionStorage,
      }),
      createPackageDependency(I18nPackage, this.config.i18n),
    ];
  }
}
