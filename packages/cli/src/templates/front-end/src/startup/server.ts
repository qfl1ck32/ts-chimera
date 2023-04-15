import {
  I18nGenerator,
  I18nGeneratorPackage,
} from '@ts-chimera/react-i18n-generator';

import { Language } from '@src/constants';
import env from '@src/env';

import { Core } from '@ts-chimera/core';

// TODO: not triggered when it should (on refresh)
const main = async () => {
  if (env.NODE_ENV !== 'development') {
    return;
  }

  const core = new Core({
    packages: [
      new I18nGeneratorPackage({
        languages: Object.values(Language),
      }),
    ],
  });

  await core.initialise();

  const generator = core.container.get(I18nGenerator);

  generator.run();
};

main();
