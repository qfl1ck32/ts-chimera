import { use } from '@ts-phoenix/react-di';
import Polyglot from 'node-polyglot';

import { I18nServiceToken } from '..';
import {
  AllPhrases,
  AllPhrasesPrefixes,
  IInterpolationStrings,
  ITranslations,
  InterpolationKeys,
  Phrase,
} from '../defs';

export const createUseTranslation = <
  Translations extends ITranslations,
  InterpolationStrings extends IInterpolationStrings,
>() => {
  const useTranslation = <
    T extends AllPhrasesPrefixes<Translations> | undefined = undefined,
  >(
    prefix?: T,
  ) => {
    const service = use(I18nServiceToken);

    const t = <P extends Phrase<Translations, T>>(
      phrase: P,
      options?:
        | Pick<Polyglot.InterpolationOptions, 'smart_count' | '_'>
        | Record<
            InterpolationKeys<Translations, InterpolationStrings, T, P>,
            string
          >,
    ) => {
      const text = (
        prefix ? `${prefix}.${phrase}` : phrase
      ) as AllPhrases<Translations>;

      return service.t(text, options);
    };

    return t;
  };

  return useTranslation;
};
