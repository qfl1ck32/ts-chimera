import { createUseTranslation } from '@ts-chimera/react-i18n';
import { Translations } from '@src/translations/defs';
import { interpolationStrings } from '@src/defs';

const useTranslation = createUseTranslation<
  Translations,
  typeof interpolationStrings
>();

export default useTranslation;
