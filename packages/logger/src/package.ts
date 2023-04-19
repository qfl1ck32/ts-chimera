import { Package } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';

import { CustomLogger } from './custom-logger';

@Injectable()
export class LoggerPackage extends Package {
  async initialise() {
    if (this.core.container.isBound(CustomLogger)) {
      this.core.container.rebind(CustomLogger).toSelf().inTransientScope();
    } else {
      this.core.container.bind(CustomLogger).toSelf().inTransientScope();
    }
  }
}
