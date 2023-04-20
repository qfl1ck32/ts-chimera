import { Core } from '@ts-phoenix/core';
import { Logger, LoggerPackage } from '@ts-phoenix/logger';
import {
  I18nGenerator,
  I18nGeneratorPackage,
} from '@ts-phoenix/react-i18n-generator';

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

      new LoggerPackage(),
    ],
  });

  await core.initialise();

  const logger = core.container.get(Logger);

  const generator = core.container.get(I18nGenerator);

  logger.info('Generating i18n files...');
  generator.run();
  logger.info('Done generating i18n files.');
};

main();
