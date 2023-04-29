import { Package } from '@ts-phoenix/core';
import { DataSource } from 'typeorm';

import {
  NodeORMackageConfigToken,
  ORMDataSourceToken,
  ORMServiceToken,
} from './constants';
import { PackageConfigType, RequiredPackageConfigType } from './defs';
import { ORMService } from './service';

export class ORMPackage extends Package<
  PackageConfigType,
  RequiredPackageConfigType
> {
  bind() {
    this.bindConfig(NodeORMackageConfigToken);

    this.core.container.bind(ORMServiceToken).to(ORMService).inSingletonScope();

    this.core.container.bind(ORMDataSourceToken).toConstantValue(DataSource);
  }
}
