import { PackageConfigToken, ServiceToken } from '@ts-phoenix/core';

import { II18nYupPackageConfig, II18nYupService } from './defs';

export const I18nYupPackageConfigToken =
  PackageConfigToken<II18nYupPackageConfig>('I18nYup');

export const I18nYupServiceToken =
  ServiceToken<II18nYupService>('I18nYupService');
