import { createUseTranslation } from '@ts-chimera/react-i18n';

import { interpolationStrings } from '@src/defs';
import { Translations } from '@src/translations/defs';

export const useTranslation = createUseTranslation<
  Translations,
  typeof interpolationStrings
>();
