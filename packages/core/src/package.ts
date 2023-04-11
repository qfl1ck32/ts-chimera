import { Injectable } from '@ts-chimera/di';

import { Core } from './core';
import { Constructor, Service } from './defs';

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

  /**
   * Called when the package is being initialised. Do not call this method directly.
   */
  async initialise() {
    for (const ServiceClass of this.getServices()) {
      const service: Service = this.core.container.get(ServiceClass);

      await service.initialise();
    }
  }
}
