import { Core } from '@ts-phoenix/core';
import { I18nPackage } from '@ts-phoenix/react-i18n';

import { defaultLocale, interpolationStrings } from '@src/constants';
import * as translations from '@src/translations';

import { AppPackage } from './app';
import { LoggerPackage } from '@ts-phoenix/logger';

export const core = new Core({
  packages: [
    new LoggerPackage(),

    new I18nPackage({
      translations,
      defaultLocale,
      interpolationStrings,
    }),

    new AppPackage(),
  ],
});
