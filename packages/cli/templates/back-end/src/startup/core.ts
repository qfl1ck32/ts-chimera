import { Core } from '@ts-phoenix/core';
import { LoggerPackage, chalk } from '@ts-phoenix/logger';
import { ApolloPackage } from '@ts-phoenix/node-apollo';
import { ExpressPackage } from '@ts-phoenix/node-express';
import { ORMPackage } from '@ts-phoenix/node-orm';

import { AppPackage } from './app';
import { GraphQLError, GraphQLPackage } from '@ts-phoenix/node-graphql';

import { Error } from '@ts-phoenix/error';

const core = new Core({
  packages: [
    new ExpressPackage({
      port: 8000,
    }),
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
      resolvers: ['src/resolvers/**/*.ts'],
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

      entities: ['src/entities/**'],

      synchronize: true,
    }),

    new AppPackage(),
  ],
});

export default core;
