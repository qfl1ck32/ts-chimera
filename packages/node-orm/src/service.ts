import { Inject, InjectToken, Injectable } from '@ts-phoenix/di';
import { EventManager } from '@ts-phoenix/event-manager';
import { Logger } from '@ts-phoenix/logger';
import { DataSource } from 'typeorm';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';
import {
  AfterORMInitialiseEvent,
  BeforeORMDestroyEvent,
  BeforeORMInitialiseEvent,
} from './events';

@Injectable()
export class ORM {
  public source!: DataSource;

  constructor(
    @Inject(EventManager) private eventManager: EventManager,
    @Inject(Logger) private logger: Logger,
    @InjectToken(PACKAGE_CONFIG_TOKEN) private config: PackageConfigType,
  ) {
    this.logger = this.logger.getWithPrefix('ORM');

    this.source = new DataSource(this.config);
  }

  async initialise() {
    await this.logger.info('Initialising...');

    await this.eventManager.emitSync(
      new BeforeORMInitialiseEvent({
        source: this.source,
      }),
    );

    await this.source.initialize();

    await this.eventManager.emitSync(
      new AfterORMInitialiseEvent({
        source: this.source,
      }),
    );

    await this.logger.info('Initialised.');
  }

  async destroy() {
    await this.logger.info('Destroying...');

    await this.eventManager.emitSync(
      new BeforeORMDestroyEvent({
        source: this.source,
      }),
    );

    await this.source.destroy();

    await this.logger.info('Destroyed.');
  }
}
