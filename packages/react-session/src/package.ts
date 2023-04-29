import { Package } from '@ts-phoenix/core';

import { SessionServiceToken } from './constants';
import { SessionService } from './service';

export class SessionPackage extends Package {
  bind() {
    this.core.container
      .bind(SessionServiceToken)
      .to(SessionService)
      .inSingletonScope();
  }
}
