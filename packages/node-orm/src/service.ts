import { Inject, Service } from '@ts-phoenix/core';
import {
  EventManagerServiceToken,
  IEventManagerService,
} from '@ts-phoenix/event-manager';
import {
  CustomLoggerServiceToken,
  ICustomLoggerService,
} from '@ts-phoenix/logger';
import { Constructor } from '@ts-phoenix/typings';
import { makeArray } from '@ts-phoenix/utils';
import { DataSource, MixedList } from 'typeorm';

import { NodeORMackageConfigToken, ORMDataSourceToken } from './constants';
import {
  DataSourceOptionsEntity,
  IORMService,
  PackageConfigType,
} from './defs';
import {
  AfterORMInitialiseEvent,
  BeforeORMDestroyEvent,
  BeforeORMInitialiseEvent,
} from './events';

@Service()
export class ORMService<TDataSource extends DataSource = DataSource>
  implements IORMService<TDataSource>
{
  public source!: TDataSource;

  constructor(
    @Inject(EventManagerServiceToken)
    private eventManagerService: IEventManagerService,
    @Inject(CustomLoggerServiceToken)
    private loggerService: ICustomLoggerService,
    @Inject(NodeORMackageConfigToken) private config: PackageConfigType,
    @Inject(ORMDataSourceToken) DataSourceClass: Constructor<TDataSource>,
  ) {
    this.loggerService.setPrefix('ORMService');

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
    await this.loggerService.info('Initialising...');

    await this.eventManagerService.emitSync(new BeforeORMInitialiseEvent());

    await this.source.initialize();

    await this.eventManagerService.emitSync(
      new AfterORMInitialiseEvent({
        source: this.source,
      }),
    );

    await this.loggerService.info('Initialised.');
  }

  async destroy() {
    await this.loggerService.info('Destroying...');

    await this.eventManagerService.emitSync(
      new BeforeORMDestroyEvent({
        source: this.source,
      }),
    );

    await this.source.destroy();

    await this.loggerService.info('Destroyed.');
  }
}
