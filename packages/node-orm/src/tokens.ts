import { Token } from '@ts-phoenix/di';
import { DataSource } from 'typeorm';

export const DATA_SOURCE_CLASS_TOKEN = new Token<DataSource>(
  'DATA_SOURCE_CLASS',
);

export const DATA_SOURCE_INSTANCE_TOKEN = new Token<DataSource>(
  'DATA_SOURCE_INSTANCE',
);
