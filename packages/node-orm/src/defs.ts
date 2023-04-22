import { DataSource, DataSourceOptions } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/ban-types
export type DataSourceOptionsEntity = string | Function;

export type PackageConfigType = Exclude<DataSourceOptions, 'entities'> & {
  entities: DataSourceOptionsEntity[];
};

export type RequiredPackageConfigType = Pick<DataSourceOptions, 'type'>;

export interface ORMEventData {
  source: DataSource;
}
