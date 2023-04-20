import { Package } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType, RequiredPackageConfigType } from './defs';

@Injectable()
export class ORMPackage extends Package<
  PackageConfigType,
  RequiredPackageConfigType
> {
  getConfigToken() {
    return PACKAGE_CONFIG_TOKEN;
  }
}
