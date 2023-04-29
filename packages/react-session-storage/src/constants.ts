import { PackageConfigToken } from '@ts-phoenix/core';

import { ISessionStoragePackageConfig } from './defs';

export const SessionStoragePackageConfigToken =
  PackageConfigToken<ISessionStoragePackageConfig>('REACT_SESSION_STORAGE');
