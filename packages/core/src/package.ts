import { Injectable } from '@ts-chimera/di';

import { Core } from './';
import { Constructor } from './defs';
import { Service } from './service';

@Injectable()
export abstract class Package<Config = any> {
  protected core!: Core;

  constructor(protected config?: Config) {
    if (!config && this.getDefaultConfig) {
      this.config = this.getDefaultConfig();
    }
  }

  abstract getServices(): Constructor<Service>[];

  public getDefaultConfig(): Config {
    return {} as Config;
  }

  public setCore(core: Core) {
    this.core = core;
  }

  async init() {
    for (const ServiceClass of this.getServices()) {
      await this.core.container.get(ServiceClass).init();
    }
  }
}
