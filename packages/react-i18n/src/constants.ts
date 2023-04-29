import { PackageConfigToken, ServiceToken } from '@ts-phoenix/core';

import { I18nPackageConfigType, II18nService } from './defs';

export const I18nPackageConfigToken =
  PackageConfigToken<I18nPackageConfigType>('ReactI18n');

export const I18nServiceToken = ServiceToken<II18nService>('I18nService');
