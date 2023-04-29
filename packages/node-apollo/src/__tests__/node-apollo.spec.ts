import { Core } from '@ts-phoenix/core';
import {
  EventManagerPackage,
  EventManagerServiceToken,
} from '@ts-phoenix/event-manager';
import { LoggerPackage } from '@ts-phoenix/logger';
import {
  ExpressPackage,
  BeforeServerStartEvent as BeforeExpressServerStartEvent,
  BeforeServerStopEvent as BeforeExpressServerStopEvent,
  ExpressServiceToken,
} from '@ts-phoenix/node-express';

import {
  BeforeServerStartEvent,
  AfterServerStartEvent,
  BeforeServerStopEvent,
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
      event: BeforeServerStartEvent,
      handler: beforeServerStartListener,
    });

    eventManagerService.addListener({
      event: AfterServerStartEvent,
      handler: afterServerStartListener,
    });

    eventManagerService.addListener({
      event: BeforeServerStopEvent,
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
