import { Package } from '@ts-chimera/core';

import Dayjs from './service';

class DayjsPackage extends Package {
  getServices() {
    return [Dayjs];
  }

  getDefaultConfig() {
    return {};
  }
}

export default DayjsPackage;
