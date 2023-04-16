import { Core } from '@ts-chimera/core';
import {
  I18nGenerator,
  I18nGeneratorPackage,
} from '@ts-chimera/react-i18n-generator';

import { defaultLocale } from '@src/constants';
import { Locales } from '@src/defs';
import env from '@src/env';

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
