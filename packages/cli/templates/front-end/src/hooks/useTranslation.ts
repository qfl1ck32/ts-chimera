import { createUseTranslation } from '@ts-phoenix/react-i18n';

import { interpolationStrings } from '@src/constants';
import { Translations } from '@src/translations/defs';

export const useTranslation = createUseTranslation<
  Translations,
  typeof interpolationStrings
>();
