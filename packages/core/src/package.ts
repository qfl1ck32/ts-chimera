import { Injectable, Token } from '@ts-phoenix/di';
import { Constructor, DeepPartial } from '@ts-phoenix/typings';
import { mergeDeep } from '@ts-phoenix/utils';

import { Core } from './core';
import { PackageDependency, PartialConfig } from './defs';

@Injectable()
export abstract class Package<
  ConfigType extends Record<string, any> | null = null,
  RequiredConfigType extends Partial<ConfigType> | null = null,
> {
  protected core!: Core;

  protected _config: ConfigType;

  constructor(
    ...args: RequiredConfigType extends null
      ? [DeepPartial<ConfigType>?]
      : [RequiredConfigType & DeepPartial<ConfigType>]
  ) {
    this._config = (this.getDefaultConfig() || {}) as ConfigType;

    if (args[0]) {
      this.__mergeConfig(args[0]);
    }
  }

  abstract getConfigToken(): ConfigType extends null ? null : Token<ConfigType>;

  public getDependencies(): PackageDependency[] {
    return [];
  }

  public getDefaultConfig(): PartialConfig<ConfigType, RequiredConfigType> {
    return null as any;
  }

  public initialiseServices(): Constructor[] {
    return [];
  }

  get config() {
    return this._config;
  }

  protected __setCore(core: Core) {
    this.core = core;
  }

  protected __mergeConfig(config: Partial<ConfigType>) {
    if (this.config == null) {
      this._config = { ...config } as ConfigType;
      return;
    }

    mergeDeep({
      target: this._config as any,
      sources: [config, this._config as any],
    });
  }

  protected __setConfigToken() {
    const token = this.getConfigToken();

    if (!token) {
      return;
    }

    this.core.setToken(token, this.config!);
  }
}
