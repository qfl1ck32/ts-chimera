#!/usr/bin/env node

import { Core } from '@ts-phoenix/core';
import { EventManagerPackage } from '@ts-phoenix/event-manager';
import { LoggerPackage } from '@ts-phoenix/logger';

import { CLIServiceToken } from './constants';
import { CLIPackage } from './package';

const main = async () => {
  const core = new Core({
    packages: [
      new LoggerPackage(),
      new CLIPackage(),
      new EventManagerPackage(),
    ],
  });

  await core.initialise();

  const cli = core.container.get(CLIServiceToken);

  await cli.run();
};

main();
