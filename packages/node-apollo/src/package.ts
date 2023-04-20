import { Package, PartialConfig } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import { LoggerPackage } from '@ts-phoenix/logger';
import { ExpressPackage } from '@ts-phoenix/node-express';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';

@Injectable()
export class ApolloPackage extends Package<PackageConfigType> {
  getDependencies() {
    return [LoggerPackage, ExpressPackage];
  }

  getConfigToken() {
    return PACKAGE_CONFIG_TOKEN;
  }

  // istanbul ignore next
  private getFramework() {
    return 'ts-phoenix';
  }

  getDefaultConfig(): PartialConfig<PackageConfigType, null> {
    return {
      typeDefs: [
        `
        type Query {
          framework: String
        }
        `,
      ],

      resolvers: [
        {
          Query: {
            framework: this.getFramework,
          },
        },
      ],
    };
  }
}
