import { Core } from '@ts-phoenix/core';
import { EventManagerPackage } from '@ts-phoenix/event-manager';
import { LoggerPackage } from '@ts-phoenix/logger';
import { I18nPackage } from '@ts-phoenix/react-i18n';

import { defaultLocale, interpolationStrings } from '@src/constants';
import * as translations from '@src/translations';

import { AppPackage } from './app';

export const core = new Core({
  packages: [
    new LoggerPackage(),
    new EventManagerPackage(),

    new I18nPackage({
      translations,
      defaultLocale,
      interpolationStrings,
    }),

    new AppPackage(),
  ],
});
