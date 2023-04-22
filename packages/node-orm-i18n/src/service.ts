import { Injectable } from '@ts-phoenix/di';
import { DataSource as BaseDataSource } from '@ts-phoenix/node-orm';
import { Constructor } from '@ts-phoenix/typings';

@Injectable()
export class DataSource extends BaseDataSource {
  public createI18nQueryBuilder<TEntity, TTranslationEntity>(args: {
    entity: Constructor<TEntity>;
    translationEntity: Constructor<TTranslationEntity>;
    alias: string;
    fields: Array<Exclude<keyof TTranslationEntity, 'id' | 'locale'>>;
    locale?: string;
  }) {
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
