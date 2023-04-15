import {
  Package,
  PartialConfig,
  createPackageDependency,
} from '@ts-chimera/core';
import { Config } from './defs';
import DayjsPackage from './dayjs/package';
import { YupPackage } from './yup';

export class ReactPackage extends Package<Config> {
  getServices() {
    return [];
  }

  getDependencies() {
    return [
      createPackageDependency(DayjsPackage),
      createPackageDependency(YupPackage, this.config.yup),
    ];
  }

  getDefaultConfig(): PartialConfig<Config, null> {
    return {
      yup: {
        usePathsInTranslations: true,
      },
    };
  }
}
