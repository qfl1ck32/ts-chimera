import {
  I18nGenerator,
  I18nGeneratorPackage,
} from '@ts-chimera/react-i18n-generator';

import env from '@src/env';

import { Core } from '@ts-chimera/core';
import { Locales } from '@src/defs';
import { defaultLocale } from '@src/constants';

const main = async () => {
  if (env.NODE_ENV !== 'development') {
    return;
  }

  const core = new Core({
    packages: [
      new I18nGeneratorPackage({
        locales: Object.values(Locales),
        defaultLocale,
      }),
    ],
  });

  await core.initialise();

  const generator = core.container.get(I18nGenerator);

  generator.run();
};

main();
