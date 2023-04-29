import { Inject, Service } from '@ts-phoenix/core';
import {
  EventManagerServiceToken,
  IEventManagerService,
} from '@ts-phoenix/event-manager';
import { buildSchema } from 'type-graphql';

import { NodeGraphQLPackageConfigToken } from './constants';
import { IGraphQLService, INodeGraphQLPackageConfig } from './defs';
import { BeforeGraphQLInitialiseEvent } from './events';
import FrameworkResolver from './resolvers/framework';

@Service()
export class GraphQLService implements IGraphQLService {
  constructor(
    @Inject(NodeGraphQLPackageConfigToken)
    private config: INodeGraphQLPackageConfig,
    @Inject(EventManagerServiceToken)
    private eventManagerService: IEventManagerService,
  ) {}

  public async generateSchema() {
    const { resolvers: _, ...config } = this.config;

    const resolvers = this.config.resolvers || [];

    resolvers.push(FrameworkResolver);

    await this.eventManagerService.emitSync(
      new BeforeGraphQLInitialiseEvent({
        resolvers,
      }),
    );

    const schema = await buildSchema({
      ...config,
      resolvers: resolvers as any,

      // TODO
      // container: this.container,

      validate: {
        forbidUnknownValues: false,
      },
    });

    return schema;
  }
}
