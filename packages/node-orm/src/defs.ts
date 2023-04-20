import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export type PackageConfigType = DataSourceOptions;

export type RequiredPackageConfigType = PostgresConnectionOptions;

export interface ORMEventData {
  source: DataSource;
}
