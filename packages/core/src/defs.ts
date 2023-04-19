import { Constructor } from '@ts-phoenix/typings';

import { Package } from './package';

export type Packages = Array<Package | Package<any, null>>;
export type PackagesConstructors = Array<
  Constructor<Package | Package<any, null>>
>;
export interface CoreConfig {
  packages: Packages;
}

export enum CoreState {
  NEW = 'NEW',
  INITIALIZING = 'INITIALIZING',
  INITIALIZED = 'INITIALIZED',
}

export type PartialConfig<Config, RequiredConfig> = RequiredConfig extends null
  ? Partial<Config>
  : Omit<Config, keyof RequiredConfig> & Partial<RequiredConfig>;
