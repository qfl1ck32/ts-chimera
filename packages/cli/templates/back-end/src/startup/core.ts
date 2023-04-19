import { Core } from '@ts-phoenix/core';
import { LoggerPackage } from '@ts-phoenix/logger';
import { ApolloPackage } from '@ts-phoenix/node-apollo';
import { ExpressPackage } from '@ts-phoenix/node-express';

import { AppPackage } from './app';

const core = new Core({
  packages: [
    new ExpressPackage({
      port: 8000,
    }),
    new ApolloPackage(),
    new LoggerPackage(),

    new AppPackage(),
  ],
});

export default core;
