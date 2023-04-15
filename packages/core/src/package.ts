import { Injectable, Token } from '@ts-chimera/di';
import { Constructor } from '@ts-chimera/typings';

import { Core } from './core';
import { PackageDependency, PartialConfig } from './defs';

import { mergeDeep } from '@ts-chimera/utils';
@Injectable()
export class Package<
  ConfigType extends Record<string, any> | null = null,
  RequiredConfig extends Partial<ConfigType> | null = null,
> {
  protected core!: Core;

  private _config!: ConfigType;

  constructor(
    ...args: RequiredConfig extends null
      ? [Partial<ConfigType>?]
      : [RequiredConfig & Partial<ConfigType>]
  ) {
    this.setConfig(args[0] || (this.getDefaultConfig() as any));
  }

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
      this._config = config;
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
