import { Package } from '@ts-phoenix/core';

import { I18nGeneratorPackageConfigToken } from './config';
import { PackageConfigType } from './defs';

export class I18nGeneratorPackage extends Package<PackageConfigType> {
  bind() {
    this.bindConfig(I18nGeneratorPackageConfigToken);
  }
}
