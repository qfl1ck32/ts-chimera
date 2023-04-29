#!/usr/bin/env node

import { Core } from '@ts-phoenix/core';
import { EventManagerPackage } from '@ts-phoenix/event-manager';
import { LoggerServiceToken, LoggerPackage } from '@ts-phoenix/logger';
import yargs from 'yargs';

import { I18nGeneratorServiceToken } from './config';
import { II18nGeneratorPackageConfig } from './defs';
import { I18nGeneratorPackage } from './package';

const main = async () => {
  const argv = yargs
    .option('defaultLocale', {
      describe: 'the default locale',
      type: 'string',
    })
    .option('srcDir', {
      describe: 'the source directory',
      type: 'string',
    })
    .option('i18nFilesRegex', {
      describe: 'the regex pattern for i18n files',
      type: 'string',
    })
    .option('interpolationStart', {
      describe: 'the interpolation start pattern',
      type: 'string',
    })
    .option('interpolationEnd', {
      describe: 'the interpolation end pattern',
      type: 'string',
    })
    .option('missingKey', {
      describe: 'the missing key replacement value',
      type: 'string',
    })
    .option('outputPath', {
      describe: 'the output directory for the i18n files',
      type: 'string',
    })
    .option('locales', {
      describe: 'the locales to generate',
      type: 'array',
    })
    .demandOption([
      'defaultLocale',
      'srcDir',
      'i18nFilesRegex',
      'interpolationStart',
      'interpolationEnd',
      'missingKey',
      'outputPath',
      'locales',
    ])
    .parseSync();

  const core = new Core({
    packages: [
      new LoggerPackage(),

      new EventManagerPackage(),

      new I18nGeneratorPackage(argv as unknown as II18nGeneratorPackageConfig),
    ],
  });

  await core.initialise();

  const generatorService = core.container.get(I18nGeneratorServiceToken);
  const loggerService = core.container.get(LoggerServiceToken);

  generatorService.run();

  loggerService.info('i18n-generator: done');
};

main();
