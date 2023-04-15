import { Core } from '@ts-chimera/core';
import { ReactPackage } from '@ts-chimera/react';
import { AppPackage } from './app';

import * as translations from '@src/translations';

export const core = new Core({
  packages: [
    new ReactPackage({
      i18n: {
        translations,
      },
    }),
    new AppPackage(),
  ],
});
