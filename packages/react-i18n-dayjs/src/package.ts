import { Injectable, Package } from '@ts-phoenix/core';

import { Dayjs } from './service';

@Injectable()
export class DayjsPackage extends Package {
  getConfigToken() {
    return null;
  }

  initialiseServices() {
    return [Dayjs];
  }
}
