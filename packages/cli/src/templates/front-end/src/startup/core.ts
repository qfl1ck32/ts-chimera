import { Core } from '@ts-phoenix/core';
import { I18nPackage } from '@ts-phoenix/react-i18n';

import { defaultLocale } from '@src/constants';
import { interpolationStrings } from '@src/defs';
import * as translations from '@src/translations';

import { AppPackage } from './app';

export const core = new Core({
  packages: [
    new I18nPackage({
      translations,
      defaultLocale,
      interpolationStrings,
    }),
    new AppPackage(),
  ],
});
