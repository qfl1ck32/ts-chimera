import { Injectable } from '@ts-phoenix/core';
import { DataSource as BaseDataSource } from '@ts-phoenix/node-orm';

import { CreateI18nQueryBuilderArgs, II18nDataSource } from './defs';

@Injectable()
export class I18nDataSource extends BaseDataSource implements II18nDataSource {
  public createI18nQueryBuilder<TEntity, TTranslationEntity>(
    args: CreateI18nQueryBuilderArgs<TEntity, TTranslationEntity>,
  ) {
    const translations = 'translations';

    let builder = this.getRepository(args.entity)
      .createQueryBuilder(args.alias)
      .leftJoin(`${args.alias}.${translations}`, translations)
      .select(
        args.fields.map(
          (field) => `${translations}.${field.toString()}, ${field.toString()}`,
        ),
      );

    if (args.locale) {
      builder = builder.where(`${translations}.locale = :locale`, {
        locale: args.locale,
      });
    }

    return builder;
  }
}
