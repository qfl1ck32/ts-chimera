import { Inject, InjectToken, Injectable } from '@ts-phoenix/di';
import { EventManager } from '@ts-phoenix/event-manager';
import { Logger } from '@ts-phoenix/logger';
import { Constructor } from '@ts-phoenix/typings';
import { makeArray } from '@ts-phoenix/utils';
import { DataSource, MixedList } from 'typeorm';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { DataSourceOptionsEntity, PackageConfigType } from './defs';
import {
  AfterORMInitialiseEvent,
  BeforeORMDestroyEvent,
  BeforeORMInitialiseEvent,
} from './events';
import { DATA_SOURCE_CLASS_TOKEN } from './tokens';

@Injectable()
export class ORM<TDataSource extends DataSource = DataSource> {
  public source!: TDataSource;

  constructor(
    @Inject(EventManager) private eventManager: EventManager,
    @Inject(Logger) private logger: Logger,
    @InjectToken(PACKAGE_CONFIG_TOKEN) private config: PackageConfigType,
    @InjectToken(DATA_SOURCE_CLASS_TOKEN)
    DataSourceClass: Constructor<TDataSource>,
  ) {
    this.logger = this.logger.getWithPrefix('ORM');

    this.source = new DataSourceClass(this.config);
  }

  async addEntity(entity: DataSourceOptionsEntity | DataSourceOptionsEntity[]) {
    const entities = makeArray(entity);

    const configEntities = this.config.entities as MixedList<any>;

    configEntities.push(...entities);
  }

  public async cleanDatabase() {
    try {
      const entities = this.source.entityMetadatas;

      const tableNames = entities
        .map((entity) => `"${entity.tableName}"`)
        .join(', ');

      await this.source.query(`TRUNCATE ${tableNames} CASCADE;`);
    } catch (error) {
      throw new Error(`ERROR: Cleaning test database: ${error}`);
    }
  }

  async initialise() {
    await this.logger.info('Initialising...');

    await this.eventManager.emitSync(new BeforeORMInitialiseEvent());

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
