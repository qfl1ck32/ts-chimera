import { createServer, Server as ServerType } from 'http';
import { AddressInfo } from 'net';

import { Inject, Service } from '@ts-phoenix/core';
import {
  EventManagerServiceToken,
  IEventManagerService,
} from '@ts-phoenix/event-manager';
import {
  CustomLoggerServiceToken,
  ICustomLoggerService,
} from '@ts-phoenix/logger';
import express from 'express';

import { ExpressPackageConfigToken } from './constants';
import { IExpressPackageConfig, Application, IExpressService } from './defs';
import {
  BeforeServerStartEvent,
  AfterServerStartEvent,
  BeforeServerStopEvent,
} from './events';

@Service()
export class ExpressService implements IExpressService {
  public app: Application;
  public server!: ServerType;

  constructor(
    @Inject(EventManagerServiceToken)
    private eventManagerService: IEventManagerService,
    @Inject(CustomLoggerServiceToken)
    private loggerService: ICustomLoggerService,
    @Inject(ExpressPackageConfigToken)
    private config: IExpressPackageConfig,
  ) {
    this.loggerService.setPrefix('ExpressService');

    this.app = express();
    this.server = createServer(this.app);
  }

  async start() {
    this.loggerService.info('Starting...');

    await this.eventManagerService.emitSync(
      new BeforeServerStartEvent({ app: this.app, server: this.server }),
    );

    await new Promise((resolve) =>
      this.server.listen(this.config.port, () => {
        resolve(null);
      }),
    );

    await this.eventManagerService.emitSync(
      new AfterServerStartEvent({ app: this.app, server: this.server }),
    );

    const { port } = this.server.address() as AddressInfo;

    this.loggerService.info(`Listening on port ${port}.`);
  }

  async stop() {
    this.loggerService.info('Stopping...');

    await this.eventManagerService.emitSync(
      new BeforeServerStopEvent({ app: this.app, server: this.server }),
    );

    await new Promise((resolve) => this.server.close(resolve));

    this.loggerService.info('Stopped.');
  }
}
