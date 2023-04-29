import { Package } from '@ts-phoenix/core';
import { ORMPackage, ORMDataSourceToken } from '@ts-phoenix/node-orm';

import { I18nDataSource } from './service';

export class ORMI18nPackage extends Package {
  getDependencies() {
    return [ORMPackage];
  }

  bind() {
    this.core.container.rebind(ORMDataSourceToken).to(I18nDataSource);
  }
}
