import { Core } from '@ts-phoenix/core';
import { ReactPackage } from '@ts-phoenix/react';

import { interpolationStrings } from '@src/defs';
import * as translations from '@src/translations';

import { AppPackage } from './app';

export const core = new Core({
  packages: [
    new ReactPackage({
      i18n: {
        translations,
        interpolationStrings,
      },
    }),
    new AppPackage(),
  ],
});
