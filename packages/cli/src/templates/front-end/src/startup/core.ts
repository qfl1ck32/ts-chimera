import { Core } from '@ts-chimera/core';
import { ReactPackage } from '@ts-chimera/react';
import { AppPackage } from './app';

import * as translations from '@src/translations';
import { interpolationStrings } from '@src/defs';

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
