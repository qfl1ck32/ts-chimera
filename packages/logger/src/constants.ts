import { ServiceToken, PackageConfigToken } from '@ts-phoenix/core';

import {
  ICustomLoggerService,
  ILoggerService,
  ILoggerPackageConfig,
} from './defs';

export const LoggerPackageConfigToken =
  PackageConfigToken<ILoggerPackageConfig>('Logger');

export const LoggerServiceToken = ServiceToken<ILoggerService>('LoggerService');

export const CustomLoggerServiceToken = ServiceToken<ICustomLoggerService>(
  'CustomLoggerService',
);
