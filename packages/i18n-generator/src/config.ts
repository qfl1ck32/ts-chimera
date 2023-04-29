import { PackageConfigToken, ServiceToken } from '@ts-phoenix/core';

import { II18nGeneratorPackageConfig, II18nGeneratorService } from './defs';

export const I18nGeneratorPackageConfigToken =
  PackageConfigToken<II18nGeneratorPackageConfig>('I18nGenerator');

export const I18nGeneratorServiceToken = ServiceToken<II18nGeneratorService>(
  'I18nGeneratorService',
);
