import Polyglot from 'node-polyglot';

import { use } from '@src/di/hooks';

import {
  AllPhrases,
  AllPhrasesPrefixes,
  InterpolationKeys,
  Phrase,
} from '../defs';
import { I18n } from '../service';

export const useTranslation = <
  T extends AllPhrasesPrefixes | undefined = undefined,
>(
  prefix?: T,
) => {
  const service = use(I18n);

  const t = <P extends Phrase<T>>(
    phrase: P,
    options?:
      | Pick<Polyglot.InterpolationOptions, 'smart_count' | '_'>
      | Record<InterpolationKeys<T, P>, string>,
  ) => {
    const text = (prefix ? `${prefix}.${phrase}` : phrase) as AllPhrases;

    return service.t(text, options);
  };

  return t;
};
