import { Package } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';

import { CustomLogger } from './custom-logger';

@Injectable()
export class LoggerPackage extends Package {
  getConfigToken() {
    return null;
  }

  async initialise() {
    this.core.container.bind(CustomLogger).toSelf().inTransientScope();
  }
}
