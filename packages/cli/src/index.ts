#!/usr/bin/env node

import { Core } from '@ts-phoenix/core';
import { LoggerPackage } from '@ts-phoenix/logger';

import { CLIService } from './service';

const main = async () => {
  const core = new Core({
    packages: [new LoggerPackage()],
  });

  await core.initialise();

  const cli = core.container.get(CLIService);

  await cli.run();
};

main();
