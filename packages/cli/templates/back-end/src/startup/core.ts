import { Core } from '@ts-phoenix/core';
import { LoggerPackage, chalk } from '@ts-phoenix/logger';
import { ApolloPackage } from '@ts-phoenix/node-apollo';
import { ExpressPackage } from '@ts-phoenix/node-express';
import { ORMPackage } from '@ts-phoenix/node-orm';

import { AppPackage } from './app';
import { GraphQLError, GraphQLPackage } from '@ts-phoenix/node-graphql';

import { Error } from '@ts-phoenix/error';
import { ORMI18nPackage } from '@ts-phoenix/node-orm-i18n';
import { EventManagerPackage } from '@ts-phoenix/event-manager';

const core = new Core({
  packages: [
    new ExpressPackage({
      port: 8000,
    }),
    new EventManagerPackage(),

    // TODO: formatError should be moved
    new ApolloPackage({
      formatError: (
        formattedError: GraphQLError,
        error: { originalError: Error },
      ) => {
        const originalError = error.originalError;

        if (originalError instanceof Error) {
          Object.assign(formattedError, {
            code: originalError.getCode(),
            context: originalError.getContext(),
          });
        }
        return formattedError;
      },
    }),
    new GraphQLPackage({
      resolvers: ['src/graphql/resolvers/**/*.ts'],
    }),
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

      entities: ['src/orm/entities/**'],

      synchronize: true,
    }),

    // new ORMI18nPackage(),

    new AppPackage(),
  ],
});

export default core;
