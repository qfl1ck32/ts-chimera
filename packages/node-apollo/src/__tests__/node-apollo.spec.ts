import { Core } from '@ts-phoenix/core';
import {
  EventManagerPackage,
  EventManagerServiceToken,
} from '@ts-phoenix/event-manager';
import { LoggerPackage } from '@ts-phoenix/logger';
import {
  ExpressPackage,
  BeforeExpressServerStartEvent,
  BeforeExpressServerStopEvent,
  ExpressServiceToken,
} from '@ts-phoenix/node-express';

import {
  BeforeApolloServerStartEvent,
  AfterApolloServerStartEvent,
  BeforeApolloServerStopEvent,
} from '@src/events';
import { ApolloPackage } from '@src/package';

import { ApolloServiceToken } from '..';

describe('node-apollo', () => {
  it('should work', async () => {
    const core = new Core({
      packages: [
        new ApolloPackage(),
        new LoggerPackage(),
        new ExpressPackage(),
        new EventManagerPackage(),
      ],
    });

    await core.initialise();

    const beforeServerStartListener = jest.fn();
    const afterServerStartListener = jest.fn();
    const beforeServerStopListener = jest.fn();

    const eventManagerService = core.container.get(EventManagerServiceToken);

    eventManagerService.addListener({
      event: BeforeApolloServerStartEvent,
      handler: beforeServerStartListener,
    });

    eventManagerService.addListener({
      event: AfterApolloServerStartEvent,
      handler: afterServerStartListener,
    });

    eventManagerService.addListener({
      event: BeforeApolloServerStopEvent,
      handler: beforeServerStopListener,
    });

    const expressService = core.container.get(ExpressServiceToken);
    const apolloService = core.container.get(ApolloServiceToken);

    eventManagerService.addListener({
      event: BeforeExpressServerStartEvent,
      handler: async (e) => {
        await apolloService.start(e.data.app);
      },
    });

    eventManagerService.addListener({
      event: BeforeExpressServerStopEvent,
      handler: async () => {
        await apolloService.stop();
      },
    });

    await expressService.start();

    expect(beforeServerStartListener).toHaveBeenCalled();
    expect(afterServerStartListener).toHaveBeenCalled();

    await expressService.stop();

    expect(beforeServerStopListener).toHaveBeenCalled();
  });
});
