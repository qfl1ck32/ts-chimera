import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { Inject, InjectToken, Injectable } from '@ts-phoenix/di';
import { EventManager } from '@ts-phoenix/event-manager';
import { CustomLogger } from '@ts-phoenix/logger';
import { Application } from 'express';

import { BeforeServerStartEvent as BeforeNodeServerStartEvent } from '../../node-express/dist';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';
import {
  AfterServerStartEvent,
  BeforeServerStartEvent,
  BeforeServerStopEvent,
} from './events';

@Injectable()
export class Apollo {
  private server!: ApolloServer;

  constructor(
    @Inject(CustomLogger) private logger: CustomLogger,
    @InjectToken(PACKAGE_CONFIG_TOKEN) private config: PackageConfigType,
    @Inject(EventManager) private eventManager: EventManager,
  ) {
    this.logger.setPrefix('Apollo');

    this.server = new ApolloServer(this.config);
  }

  async start(app: Application) {
    this.logger.info('Starting...');

    await this.eventManager.emitAsync(
      new BeforeServerStartEvent({
        server: this.server,
      }),
    );

    await this.server.start();

    app.use('/graphql', expressMiddleware(this.server));

    await this.eventManager.emitAsync(
      new AfterServerStartEvent({
        server: this.server,
      }),
    );

    this.logger.info('Started.');
  }

  async stop() {
    this.logger.info('Stopping...');

    await this.eventManager.emitAsync(
      new BeforeServerStopEvent({
        server: this.server,
      }),
    );

    await this.server.stop();

    this.logger.info('Stopped.');
  }
}
