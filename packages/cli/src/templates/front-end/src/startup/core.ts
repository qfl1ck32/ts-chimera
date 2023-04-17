import { Core } from '@ts-phoenix/core';
import { I18nPackage } from '@ts-phoenix/react-i18n';
import { SessionPackage } from '@ts-phoenix/react-session';
import {
  SessionStorage,
  SessionStoragePackage,
} from '@ts-phoenix/react-session-storage';

import { defaultLocale } from '@src/constants';
import { interpolationStrings } from '@src/defs';
import * as translations from '@src/translations';

import { AppPackage } from './app';

export const core = new Core({
  packages: [
    new SessionStoragePackage(),

    new SessionPackage({
      storage: SessionStorage,
    }),

    new I18nPackage({
      translations,
      defaultLocale,
      interpolationStrings,
    }),

    new AppPackage(),
  ],
});
