import { Package } from '@ts-chimera/core';

import { Dayjs } from './service';

export class DayjsPackage extends Package {
  getServices() {
    return [Dayjs];
  }
}
