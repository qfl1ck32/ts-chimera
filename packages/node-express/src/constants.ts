import { PackageConfigToken, ServiceToken } from '@ts-phoenix/core';

import { IExpressService, IExpressPackageConfig } from './defs';

export const ExpressPackageConfigToken =
  PackageConfigToken<IExpressPackageConfig>('NodeExpress');

export const ExpressServiceToken = ServiceToken<IExpressService>('NodeExpress');
