import { Package } from '@ts-phoenix/core';

import { Dayjs } from './service';

export class DayjsPackage extends Package {
  getServices() {
    return [Dayjs];
  }
}
