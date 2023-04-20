import {
  BeforeServerStartEvent,
  AfterServerStartEvent,
  BeforeServerStopEvent,
} from '@src/events';
import { ApolloPackage } from '@src/package';
import { Apollo } from '@src/service';
import { Core } from '@ts-phoenix/core';
import { EventManager } from '@ts-phoenix/event-manager';
import { LoggerPackage } from '@ts-phoenix/logger';
import {
  Express,
  ExpressPackage,
  BeforeServerStartEvent as BeforeExpressServerStartEvent,
  BeforeServerStopEvent as BeforeExpressServerStopEvent,
} from '@ts-phoenix/node-express';

describe('node-apollo', () => {
  it('should work', async () => {
    const core = new Core({
      packages: [
        new ApolloPackage(),
        new LoggerPackage(),
        new ExpressPackage(),
      ],
    });

    const beforeServerStartListener = jest.fn();
    const afterServerStartListener = jest.fn();
    const beforeServerStopListener = jest.fn();

    const eventManager = core.container.get(EventManager);

    eventManager.addListener({
      event: BeforeServerStartEvent,
      handler: beforeServerStartListener,
    });

    eventManager.addListener({
      event: AfterServerStartEvent,
      handler: afterServerStartListener,
    });

    eventManager.addListener({
      event: BeforeServerStopEvent,
      handler: beforeServerStopListener,
    });

    await core.initialise();

    const express = core.container.get(Express);
    const apollo = core.container.get(Apollo);

    eventManager.addListener({
      event: BeforeExpressServerStartEvent,
      handler: async (e) => {
        await apollo.start(e.data!.app);
      },
    });

    eventManager.addListener({
      event: BeforeExpressServerStopEvent,
      handler: async () => {
        await apollo.stop();
      },
    });

    await express.start();

    expect(beforeServerStartListener).toHaveBeenCalled();
    expect(afterServerStartListener).toHaveBeenCalled();

    await express.stop();

    expect(beforeServerStopListener).toHaveBeenCalled();
  });
});
