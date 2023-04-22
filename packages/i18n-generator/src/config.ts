import { PackageConfigToken } from '@ts-phoenix/core';

import { PackageConfigType } from './defs';

export const PACKAGE_CONFIG_TOKEN = new PackageConfigToken<PackageConfigType>(
  'I18N_GENERATOR',
);
