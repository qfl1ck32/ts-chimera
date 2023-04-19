import { Injectable } from '@ts-phoenix/di';
import { DeepPartial, MaybePromise } from '@ts-phoenix/typings';
import { mergeDeep } from '@ts-phoenix/utils';

import { Core } from './core';
import { PackagesConstructors, PartialConfig } from './defs';
import { PackageConfigToken } from './tokens';

@Injectable()
export abstract class Package<
  ConfigType extends Record<string, any> | null = null,
  RequiredConfigType extends Partial<ConfigType> | null = null,
> {
  protected core!: Core;

  private _config: ConfigType;

  constructor(
    ...args: RequiredConfigType extends null
      ? [DeepPartial<ConfigType>?]
      : [RequiredConfigType & DeepPartial<ConfigType>]
  ) {
    this._config = (this.getDefaultConfig() || {}) as unknown as ConfigType;

    if (args[0]) {
      this.__mergeConfig(args[0]);
    }
  }

  public getConfigToken(): ConfigType extends null
    ? null
    : PackageConfigToken<ConfigType> {
    return null as any;
  }

  public getDependencies(): PackagesConstructors {
    return [];
  }

  public getDefaultConfig(): PartialConfig<ConfigType, RequiredConfigType> {
    return null as any;
  }

  public initialise(): MaybePromise<void> {
    return;
  }

  get config() {
    return this._config;
  }

  private __setCore(core: Core) {
    this.core = core;
  }

  private __mergeConfig(config: Partial<ConfigType>) {
    if (this.config == null) {
      this._config = { ...config } as ConfigType;
      return;
    }

    mergeDeep({
      target: this._config as any,
      sources: [config, this._config as any],
    });
  }

  private __setConfigToken() {
    const token = this.getConfigToken();

    if (!token) {
      return;
    }

    this.core.setToken(token, this.config!);
  }
}
