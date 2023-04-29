/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  Join,
  NestedPaths,
  NestedPathsObjectUntilLeaf,
  NestedPathsObjectsJustLeaf,
} from '@ts-phoenix/typings';
import Polyglot from 'node-polyglot';

export type ITranslations = Record<string, any>;
export type IInterpolationStrings = Record<'start' | 'end', string>;

export interface II18nService {
  t<Translations extends ITranslations>(
    phrase: AllPhrases<Translations>,
    options?: number | Polyglot.InterpolationOptions | undefined,
  ): string;

  activePolyglot: Polyglot;

  onLocaleChange(locale: string): Promise<void>;
}

export interface I18nPackageConfigType {
  defaultLocale: string;
  translations: ITranslations;
  interpolationStrings: IInterpolationStrings;
}

export type AllPhrases<Translations extends ITranslations> = Join<
  NestedPathsObjectsJustLeaf<Translations, []>,
  '.'
>;

export type AllPhrasesPrefixes<Translations extends ITranslations> = Join<
  NestedPathsObjectUntilLeaf<Translations, []>,
  '.'
>;

export type ExtractInterpolation<
  InterpolationStrings extends IInterpolationStrings,
  Text extends string,
> = Text extends `${infer A}${InterpolationStrings['start']}${infer B}${InterpolationStrings['end']}${infer C}`
  ?
      | ExtractInterpolation<InterpolationStrings, A>
      | B
      | ExtractInterpolation<InterpolationStrings, C>
  : never;

export type ExtractInterpolationStringsFromTranslation<
  Translations extends ITranslations,
  InterpolationStrings extends IInterpolationStrings,
  Text extends AllPhrases<Translations>,
  // @ts-ignore
> = ExtractInterpolation<InterpolationStrings, GetDeep<Translations, Text>>;

export type InterpolationKeys<
  Translations extends ITranslations,
  InterpolationStrings extends IInterpolationStrings,
  Prefix extends AllPhrasesPrefixes<Translations> | undefined = undefined,
  P = Phrase<Translations, Prefix>,
> = Prefix extends undefined
  ? ExtractInterpolationStringsFromTranslation<
      Translations,
      InterpolationStrings,
      // @ts-ignore
      P
    >
  : ExtractInterpolationStringsFromTranslation<
      Translations,
      InterpolationStrings,
      // @ts-ignore
      Join<[Prefix, P], '.'>
    >;

export type GetDeep<
  T extends Record<string, any>,
  R extends Join<NestedPaths<T, []>, '.'>,
> = R extends keyof T
  ? T[R]
  : R extends `${infer A}.${infer B}`
  ? // @ts-ignore
    GetDeep<T[A], B>
  : any;

export type Phrase<
  Translations extends ITranslations,
  T extends AllPhrasesPrefixes<Translations> | undefined,
> = T extends undefined
  ? AllPhrases<Translations>
  : Join<
      NestedPathsObjectsJustLeaf<
        T extends AllPhrasesPrefixes<Translations>
          ? // @ts-ignore
            GetDeep<Translations, T>
          : never,
        []
      >,
      '.'
    >;
