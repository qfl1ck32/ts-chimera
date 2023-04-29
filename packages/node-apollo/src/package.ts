import { Package } from '@ts-phoenix/core';
import { LoggerPackage } from '@ts-phoenix/logger';
import { ExpressPackage } from '@ts-phoenix/node-express';

import { ApolloPackageConfigToken, ApolloServiceToken } from './constants';
import { INodeApolloPackageConfig } from './defs';
import { ApolloService } from './service';

export class ApolloPackage extends Package<INodeApolloPackageConfig> {
  getDependencies() {
    return [LoggerPackage, ExpressPackage];
  }

  bind() {
    this.bindConfig(ApolloPackageConfigToken);

    this.core.container
      .bind(ApolloServiceToken)
      .to(ApolloService)
      .inSingletonScope();
  }

  getDefaultConfig(): Partial<INodeApolloPackageConfig> {
    return {
      mountingPath: '/graphql',
    };
  }
}
