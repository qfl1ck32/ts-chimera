import { Package, PartialConfig } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import { LoggerPackage } from '@ts-phoenix/logger';
import {
  ExpressPackage,
  AfterServerStartEvent as AfterExpressServerStartEvent,
  BeforeServerStopEvent as BeforeExpressServerStopEvent,
} from '@ts-phoenix/node-express';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';
import { Apollo } from './service';

@Injectable()
export class GraphQLPackage extends Package<PackageConfigType> {
  async initialise() {
    const apollo = this.core.container.get(Apollo);

    this.core.eventManager.addListener({
      event: AfterExpressServerStartEvent,
      handler: async (e) => {
        await apollo.start(e.data!.app);
      },
    });

    this.core.eventManager.addListener({
      event: BeforeExpressServerStopEvent,
      handler: async () => {
        await apollo.stop();
      },
    });
  }

  getDependencies() {
    return [LoggerPackage, ExpressPackage];
  }

  getConfigToken() {
    return PACKAGE_CONFIG_TOKEN;
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
            framework: () => 'ts-phoenix',
          },
        },
      ],
    };
  }
}
