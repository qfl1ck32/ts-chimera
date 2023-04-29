import { PackageConfigToken, ServiceToken } from '@ts-phoenix/core';

import { IGraphQLService, INodeGraphQLPackageConfig } from './defs';

export const NodeGraphQLPackageConfigToken =
  PackageConfigToken<INodeGraphQLPackageConfig>('NodeGraphQL');

export const GraphQLServiceToken =
  ServiceToken<IGraphQLService>('GraphQLService');
