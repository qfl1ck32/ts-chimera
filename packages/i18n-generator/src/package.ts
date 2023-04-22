import { Package } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';

@Injectable()
export class I18nGeneratorPackage extends Package<PackageConfigType> {
  getConfigToken() {
    return PACKAGE_CONFIG_TOKEN;
  }
}
