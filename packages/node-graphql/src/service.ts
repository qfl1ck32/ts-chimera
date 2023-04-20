import { Inject, InjectToken, Injectable } from '@ts-phoenix/di';
import { EventManager } from '@ts-phoenix/event-manager';
import {
  PACKAGE_CONFIG_TOKEN as APOLLO_PACKAGE_CONFIG_TOKEN,
  PackageConfigType as ApolloPackageConfigType,
} from '@ts-phoenix/node-apollo';
import { buildSchema } from 'type-graphql';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';
import { BeforeGraphQLInitialiseEvent } from './events';

@Injectable()
export class GraphQL {
  constructor(
    @InjectToken(PACKAGE_CONFIG_TOKEN) private config: PackageConfigType,
    @Inject(EventManager) private eventManager: EventManager,
    @InjectToken(APOLLO_PACKAGE_CONFIG_TOKEN)
    private apolloConfig: ApolloPackageConfigType,
  ) {}

  public async initialise() {
    const resolvers = [] as any;

    await this.eventManager.emitSync(
      new BeforeGraphQLInitialiseEvent({
        resolvers,
      }),
    );

    const schema = await buildSchema({
      ...this.config,
      resolvers,
    });

    this.apolloConfig.schema = schema;
  }
}
