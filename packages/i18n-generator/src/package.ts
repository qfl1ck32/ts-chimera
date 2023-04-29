import { Package } from '@ts-phoenix/core';

import {
  I18nGeneratorPackageConfigToken,
  I18nGeneratorServiceToken,
} from './config';
import { II18nGeneratorPackageConfig } from './defs';
import { I18nGeneratorService } from './service';

export class I18nGeneratorPackage extends Package<II18nGeneratorPackageConfig> {
  bind() {
    this.bindConfig(I18nGeneratorPackageConfigToken);

    this.core.container
      .bind(I18nGeneratorServiceToken)
      .to(I18nGeneratorService)
      .inSingletonScope();
  }
}
