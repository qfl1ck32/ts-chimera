import { Package, createPackageDependency } from '@ts-chimera/core';
import { ReactPackageConfig } from './defs';
import { DayjsPackage } from './dayjs2';
import { YupPackage } from './yup2';
import {
  SessionStorage,
  SessionStoragePackage,
} from '@ts-chimera/react-session-storage';
import { SessionPackage } from '@ts-chimera/react-session';
import { I18nPackage } from '@ts-chimera/react-i18n';
import { Injectable } from '@ts-chimera/react-di';

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
