import { DeepPartial, MaybePromise } from '@ts-phoenix/typings';
import { mergeDeep } from '@ts-phoenix/utils';

import { Core } from './core';
import { PackagesConstructors, PartialConfig, ServiceIdentifier } from './defs';

export abstract class Package<
  FullConfigType extends Record<string, any> | null = null,
  RequiredConfigType extends Partial<FullConfigType> | null = null,
> {
  protected core!: Core;

  private _config: FullConfigType;

  constructor(
    ...args: RequiredConfigType extends null
      ? [DeepPartial<FullConfigType>?]
      : [RequiredConfigType & DeepPartial<FullConfigType>]
  ) {
    this._config = (this.getDefaultConfig() || {}) as unknown as FullConfigType;

    if (args[0]) {
      this.__mergeConfig(args[0]);
    }
  }

  public getDependencies(): PackagesConstructors {
    return [];
  }

  public getDefaultConfig(): PartialConfig<FullConfigType, RequiredConfigType> {
    return null as any;
  }

  public initialise(): MaybePromise<void> {
    return;
  }

  public bind(): MaybePromise<void> {
    return;
  }

  get config() {
    return this._config;
  }

  private __setCore(core: Core) {
    this.core = core;
  }

  private __mergeConfig(config: Partial<FullConfigType>) {
    if (this.config == null) {
      this._config = { ...config } as FullConfigType;
      return;
    }

    mergeDeep({
      target: this._config as any,
      sources: [config, this._config as any],
    });
  }

  protected bindConfig(token: ServiceIdentifier<FullConfigType>) {
    this.core.container.bind(token).toConstantValue(this.config!);
  }
}
