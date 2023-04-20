import { Container, InjectContainer } from '@ts-phoenix/core';
import { Inject, InjectToken, Injectable } from '@ts-phoenix/di';
import { EventManager } from '@ts-phoenix/event-manager';
import { Apollo } from '@ts-phoenix/node-apollo';
import { buildSchema } from 'type-graphql';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';
import { BeforeGraphQLInitialiseEvent } from './events';
import FrameworkResolver from './resolvers/framework';

@Injectable()
export class GraphQL {
  constructor(
    @InjectContainer() private container: Container,
    @InjectToken(PACKAGE_CONFIG_TOKEN) private config: PackageConfigType,
    @Inject(EventManager) private eventManager: EventManager,
    @Inject(Apollo) private apollo: Apollo,
  ) {}

  public async initialise() {
    const { resolvers: _, ...config } = this.config;

    const resolvers = this.config.resolvers || [];

    resolvers.push(FrameworkResolver);

    await this.eventManager.emitSync(
      new BeforeGraphQLInitialiseEvent({
        resolvers,
      }),
    );

    const schema = await buildSchema({
      ...config,
      resolvers: resolvers as any,
      container: this.container,

      validate: {
        forbidUnknownValues: false,
      },
    });

    this.apollo.setSchema(schema);
  }
}
