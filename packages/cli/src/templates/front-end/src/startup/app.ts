import { Package } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';

import * as Services from '@src/services';

@Injectable()
export class AppPackage extends Package {
  getConfigToken() {
    return null;
  }

  initialiseServices() {
    return Object.values(Services);
  }
}
