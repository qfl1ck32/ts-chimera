import { Package } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';

import { CustomLogger } from './custom-logger';

@Injectable()
export class LoggerPackage extends Package {
  async initialise() {
    this.core.container.rebind(CustomLogger).toSelf().inTransientScope();
  }
}
