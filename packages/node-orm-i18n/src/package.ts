import { Package } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import { DATA_SOURCE_CLASS_TOKEN, ORMPackage } from '@ts-phoenix/node-orm';

import { DataSource } from './service';

@Injectable()
export class ORMI18nPackage extends Package {
  async initialise() {
    this.core.container
      .rebindToken(DATA_SOURCE_CLASS_TOKEN)
      .toConstructor(DataSource);
  }

  getDependencies() {
    return [ORMPackage];
  }
}
