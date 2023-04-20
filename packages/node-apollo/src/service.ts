import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { Inject, InjectToken, Injectable } from '@ts-phoenix/di';
import { EventManager } from '@ts-phoenix/event-manager';
import { Logger } from '@ts-phoenix/logger';
import { Application, json } from 'express';

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
    @Inject(Logger) private logger: Logger,
    @InjectToken(PACKAGE_CONFIG_TOKEN) private config: PackageConfigType,
    @Inject(EventManager) private eventManager: EventManager,
  ) {
    this.logger = this.logger.getWithPrefix('Apollo');
  }

  public async setSchema(schema: PackageConfigType['schema']) {
    this.config.schema = schema;
  }

  async start(app: Application) {
    this.logger.info('Starting...');

    await this.eventManager.emitSync(new BeforeServerStartEvent());

    this.server = new ApolloServer(this.config as any);

    await this.server.start();

    app.use(this.config.mountingPath, json(), expressMiddleware(this.server));

    await this.eventManager.emitSync(
      new AfterServerStartEvent({
        server: this.server,
      }),
    );

    this.logger.info('Started.');
  }

  async stop() {
    this.logger.info('Stopping...');

    await this.eventManager.emitSync(
      new BeforeServerStopEvent({
        server: this.server,
      }),
    );

    await this.server.stop();

    this.logger.info('Stopped.');
  }
}
