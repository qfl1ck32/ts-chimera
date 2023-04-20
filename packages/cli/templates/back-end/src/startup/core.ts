import { Core } from '@ts-phoenix/core';
import { LoggerPackage, chalk } from '@ts-phoenix/logger';
import { ApolloPackage } from '@ts-phoenix/node-apollo';
import { ExpressPackage } from '@ts-phoenix/node-express';
import { ORMPackage } from '@ts-phoenix/node-orm';

import { AppPackage } from './app';

const core = new Core({
  packages: [
    new ExpressPackage({
      port: 8000,
    }),
    new ApolloPackage(),
    new LoggerPackage({
      colors: {
        INFO: chalk.cyanBright,
      },
    }),
    new ORMPackage({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'test',

      entities: ['src/entities/**'],
    }),

    new AppPackage(),
  ],
});

export default core;
