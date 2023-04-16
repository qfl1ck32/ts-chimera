import { Constructor } from '@ts-phoenix/typings';

import { Package } from './package';

export const createPackageDependency = <
  ConfigType extends Record<string, any> | null = any,
  RequiredConfig extends Partial<ConfigType> | null = null,
>(
  PackageConstructor: Constructor<Package<ConfigType, RequiredConfig>>,
  ...config: RequiredConfig extends null ? [] : [RequiredConfig]
) => {
  return {
    PackageConstructor,
    config,
  };
};
