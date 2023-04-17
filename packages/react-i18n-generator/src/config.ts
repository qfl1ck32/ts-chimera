import { PackageConfigToken } from '@ts-phoenix/core';

import { PackageConfigType } from './defs';

export const PACKAGE_CONFIG_TOKEN = new PackageConfigToken<PackageConfigType>(
  'REACT_I18N_GENERATOR',
);
