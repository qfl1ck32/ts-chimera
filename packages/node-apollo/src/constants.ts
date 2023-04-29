import { PackageConfigToken, ServiceToken } from '@ts-phoenix/core';

import {
  INodeApolloPackageConfig as IApolloPackageConfig,
  IApolloService,
} from './defs';

export const ApolloPackageConfigToken =
  PackageConfigToken<IApolloPackageConfig>('NodeApollo');

export const ApolloServiceToken = ServiceToken<IApolloService>('ApolloService');
