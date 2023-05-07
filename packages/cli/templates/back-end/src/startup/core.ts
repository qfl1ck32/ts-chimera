import { LoggerPackage, chalk } from '@ts-phoenix/logger';
import { Core } from '@ts-phoenix/core';
import { ApolloPackage } from '@ts-phoenix/node-apollo';
import { ExpressPackage } from '@ts-phoenix/node-express';

import { AppPackage } from './app';
import { GraphQLError, GraphQLPackage } from '@ts-phoenix/node-graphql';

import { Error } from '@ts-phoenix/error';
import { EventManagerPackage } from '@ts-phoenix/event-manager';

const core = new Core({
  packages: [
    new LoggerPackage({
      colors: {
        INFO: chalk.cyanBright,
      },
    }),

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
    new AppPackage(),
  ],
});

export default core;
