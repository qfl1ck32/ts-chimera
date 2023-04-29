import { Package } from '@ts-phoenix/core';

import { EventManagerServiceToken } from './constants';
import { EventManagerService } from './service';

export class EventManagerPackage extends Package {
  public bind() {
    this.core.container
      .bind(EventManagerServiceToken)
      .to(EventManagerService)
      .inSingletonScope();
  }
}
