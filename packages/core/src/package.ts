import { Injectable } from '@ts-chimera/di';
import { Constructor } from '@ts-chimera/typings';

import { Core } from './core';

@Injectable()
export abstract class Package<Config = any> {
  protected core!: Core;

  constructor(protected config?: Config) {
    if (!config) {
      this.config = this.getDefaultConfig();
    }
  }

  public abstract getServices(): Constructor[];

  public abstract getDefaultConfig(): Config;

  public setCore(core: Core) {
    this.core = core;
  }
}
