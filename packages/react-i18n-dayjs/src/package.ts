import { Package } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';

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
