import { Injectable, Token } from '@ts-phoenix/di';
import { Constructor, DeepPartial } from '@ts-phoenix/typings';
import { mergeDeep } from '@ts-phoenix/utils';

import { Core } from './core';
import { PackageDependency, PartialConfig } from './defs';

@Injectable()
export class Package<
  ConfigType extends Record<string, any> | null = null,
  RequiredConfig extends Partial<ConfigType> | null = null,
> {
  protected core!: Core;

  private _config!: ConfigType;

  constructor(
    ...args: RequiredConfig extends null
      ? [DeepPartial<ConfigType>?]
      : [RequiredConfig & DeepPartial<ConfigType>]
  ) {
    const config = {} as ConfigType;

    const sources = [this.getDefaultConfig()];

    if (args[0]) {
      sources.push(args[0] as any);
    }

    mergeDeep({
      target: config as Record<string, any>,
      sources,
    });

    this.setConfig(config);
  }

  /* eslint-disable */
  public async initialise() {}

  public getDependencies(): PackageDependency[] {
    return [];
  }

  public getServices(): Constructor[] {
    return [];
  }

  public getDefaultConfig(): PartialConfig<ConfigType, RequiredConfig> {
    return {} as any;
  }

  get config() {
    return this._config;
  }

  public setConfig(config: ConfigType) {
    if (this._config == null) {
      this._config = { ...config };
      return;
    }

    mergeDeep({
      target: this._config as any,
      sources: [config, this._config as any],
    });
  }

  public setConfigToken<T>(token: Token<T>) {
    this.core.setToken(token, this.config as unknown as T);
  }

  public setCore(core: Core) {
    this.core = core;
  }
}
