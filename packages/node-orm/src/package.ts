import { Package } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import { DataSource } from 'typeorm';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType, RequiredPackageConfigType } from './defs';
import { ORM } from './service';
import { DATA_SOURCE_CLASS_TOKEN, DATA_SOURCE_INSTANCE_TOKEN } from './tokens';

@Injectable()
export class ORMPackage extends Package<
  PackageConfigType,
  RequiredPackageConfigType
> {
  async initialise() {
    this.core.container
      .bindToken(DATA_SOURCE_INSTANCE_TOKEN)
      .toDynamicValue((ctx) => ctx.container.get(ORM).source);

    this.core.container
      .bindToken(DATA_SOURCE_CLASS_TOKEN)
      .toConstructor(DataSource);
  }

  getConfigToken() {
    return PACKAGE_CONFIG_TOKEN;
  }
}
