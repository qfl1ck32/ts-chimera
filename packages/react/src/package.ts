import { Package, createPackageDependency, Injectable } from '@ts-phoenix/core';
import { I18nPackage } from '@ts-phoenix/react-i18n';
import { SessionPackage } from '@ts-phoenix/react-session';
import {
  SessionStorage,
  SessionStoragePackage,
} from '@ts-phoenix/react-session-storage';

import { ReactPackageConfig } from './defs';
import { YupPackage } from './yup2';

@Injectable()
export class ReactPackage extends Package<ReactPackageConfig> {
  getDependencies() {
    return [
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
