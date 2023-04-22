#!/usr/bin/env node

import yargs from 'yargs';

import { Args } from './defs';
import { I18nGenerator } from './service';

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

const generator = new I18nGenerator(argv as unknown as Args);

console.log('i18n-generator: running');

generator.run();

console.log('i18n-generator: done');
