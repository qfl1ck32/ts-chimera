import {
  Package,
  PartialConfig,
  createPackageDependency,
} from '@ts-chimera/core';
import { ReactPackageConfig } from './defs';
import { DayjsPackage } from './dayjs';
import { YupPackage } from './yup';
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

  getDefaultConfig(): PartialConfig<ReactPackageConfig, null> {
    return {
      yup: {
        usePathsInTranslations: true,
      },

      sessionStorage: {
        localStorageKey: 'session-storage',
      },

      i18n: {
        defaultLocale: 'en',
        translations: {},
      },
    };
  }
}
