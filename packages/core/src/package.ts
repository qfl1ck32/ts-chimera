import { Injectable } from '@ts-phoenix/di';
import { DeepPartial } from '@ts-phoenix/typings';
import { mergeDeep } from '@ts-phoenix/utils';

import { Core } from './core';
import { PackageDependency, PartialConfig } from './defs';

@Injectable()
export class Package<
  Config extends Record<string, any> | null = null,
  RequiredConfig extends Partial<Config> | null = null,
> {
  protected core!: Core;

  private _config!: Config;

  constructor(
    ...args: RequiredConfig extends null
      ? [DeepPartial<Config>?]
      : [RequiredConfig & DeepPartial<Config>]
  ) {
    const config = {} as Config;

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

  public getDependencies(): PackageDependency[] {
    return [];
  }

  public getDefaultConfig(): PartialConfig<Config, RequiredConfig> {
    return {} as any;
  }

  get config() {
    return this._config;
  }

  public setConfig(config: Config) {
    if (this._config == null) {
      this._config = { ...config };
      return;
    }

    mergeDeep({
      target: this._config as any,
      sources: [config, this._config as any],
    });
  }

  public setCore(core: Core) {
    this.core = core;
  }
}
