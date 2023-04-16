import Polyglot from 'node-polyglot';

import { use } from '@ts-chimera/react-di';

import {
  AllPhrases,
  AllPhrasesPrefixes,
  IInterpolationStrings,
  ITranslations,
  InterpolationKeys,
  Phrase,
} from '../defs';
import { I18n } from '../service';

export const createUseTranslation = <
  Translations extends ITranslations,
  InterpolationStrings extends IInterpolationStrings,
>() => {
  const useTranslation = <
    T extends AllPhrasesPrefixes<Translations> | undefined = undefined,
  >(
    prefix?: T,
  ) => {
    const service = use(I18n);

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
