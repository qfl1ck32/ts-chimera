import { PackageConfigToken, ServiceToken, Token } from '@ts-phoenix/core';

import { IORMService, PackageConfigType } from './defs';

export const NodeORMackageConfigToken =
  PackageConfigToken<PackageConfigType>('NodeORM');

export const ORMServiceToken = ServiceToken<IORMService>('ORMService');

export const ORMDataSourceToken = Token('ORMDataSource');
