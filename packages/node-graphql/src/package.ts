import { Package } from '@ts-phoenix/core';
import { EventManagerPackage } from '@ts-phoenix/event-manager';

import {
  GraphQLServiceToken,
  NodeGraphQLPackageConfigToken,
} from './constants';
import { INodeGraphQLPackageConfig } from './defs';
import { GraphQLService } from './service';

export class GraphQLPackage extends Package<INodeGraphQLPackageConfig> {
  getDependencies() {
    return [EventManagerPackage]
  }

  bind() {
    this.bindConfig(NodeGraphQLPackageConfigToken);

    this.core.container
      .bind(GraphQLServiceToken)
      .to(GraphQLService)
      .inSingletonScope();
  }
}
