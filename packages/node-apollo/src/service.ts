import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { Inject, Service } from '@ts-phoenix/core';
import {
  EventManagerServiceToken,
  IEventManagerService,
} from '@ts-phoenix/event-manager';
import {
  CustomLoggerServiceToken,
  ICustomLoggerService,
} from '@ts-phoenix/logger';
import { Application, json } from 'express';

import { ApolloPackageConfigToken } from './constants';
import { IApolloService, INodeApolloPackageConfig } from './defs';
import {
  AfterServerStartEvent,
  BeforeServerStartEvent,
  BeforeServerStopEvent,
} from './events';

@Service()
export class ApolloService implements IApolloService {
  public server!: ApolloServer;

  constructor(
    @Inject(CustomLoggerServiceToken)
    private loggerService: ICustomLoggerService,
    @Inject(ApolloPackageConfigToken)
    private config: INodeApolloPackageConfig,
    @Inject(EventManagerServiceToken)
    private eventManagerService: IEventManagerService,
  ) {
    this.loggerService.setPrefix('ApolloService');
  }

  public async setSchema(schema: INodeApolloPackageConfig['schema']) {
    this.config.schema = schema;
  }

  async start(app: Application) {
    this.loggerService.info('Starting...');

    await this.eventManagerService.emitSync(new BeforeServerStartEvent());

    this.server = new ApolloServer(this.config as any);

    await this.server.start();

    app.use(this.config.mountingPath, json(), expressMiddleware(this.server));

    await this.eventManagerService.emitSync(
      new AfterServerStartEvent({
        server: this.server,
      }),
    );

    this.loggerService.info('Started.');
  }

  async stop() {
    this.loggerService.info('Stopping...');

    await this.eventManagerService.emitSync(
      new BeforeServerStopEvent({
        server: this.server,
      }),
    );

    await this.server.stop();

    this.loggerService.info('Stopped.');
  }
}
