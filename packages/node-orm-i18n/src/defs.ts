import {
  ObjectLiteral,
  SelectQueryBuilder,
  DataSource,
} from '@ts-phoenix/node-orm';
import { Constructor } from '@ts-phoenix/typings';

export interface CreateI18nQueryBuilderArgs<TEntity, TTranslationEntity> {
  entity: Constructor<TEntity>;
  translationEntity: Constructor<TTranslationEntity>;
  alias: string;
  fields: Array<Exclude<keyof TTranslationEntity, 'id' | 'locale'>>;
  locale?: string;
}

export interface II18nDataSource extends DataSource {
  createI18nQueryBuilder<TEntity, TTranslationEntity>(
    args: CreateI18nQueryBuilderArgs<TEntity, TTranslationEntity>,
  ): SelectQueryBuilder<ObjectLiteral>;
}
