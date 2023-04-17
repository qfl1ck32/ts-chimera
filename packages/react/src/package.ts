import {
  Package,
  createPackageDependency,
  Injectable,
  Token,
} from '@ts-phoenix/core';
import { I18nPackage } from '@ts-phoenix/react-i18n';
import { SessionPackage } from '@ts-phoenix/react-session';
import {
  SessionStorage,
  SessionStoragePackage,
} from '@ts-phoenix/react-session-storage';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';
import { YupPackage } from './yup2';

@Injectable()
export class ReactPackage extends Package<PackageConfigType> {
  getConfigToken(): Token<PackageConfigType> {
    return PACKAGE_CONFIG_TOKEN;
  }

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
