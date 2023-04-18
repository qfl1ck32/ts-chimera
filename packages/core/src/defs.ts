import { Constructor } from '@ts-phoenix/typings';

import { Package } from './package';

export interface CoreConfig {
  packages: Array<Package | Package<any, null>>;
}

export enum CoreState {
  NEW = 'NEW',
  INITIALIZING = 'INITIALIZING',
  INITIALIZED = 'INITIALIZED',
}

export interface PackageDependency<
  ConfigType extends Record<string, any> | null = any,
  RequiredConfig extends Partial<ConfigType> | null = any,
> {
  PackageConstructor: Constructor<Package<ConfigType, RequiredConfig>>;
  config: Array<RequiredConfig extends null ? undefined : RequiredConfig>;
}

export type PartialConfig<Config, RequiredConfig> = {
  [K in keyof Config]: K extends keyof RequiredConfig
    ? Config[K] | undefined
    : Config[K];
};
