import { Core } from '@ts-phoenix/core';
import {
  EventManagerPackage,
  EventManagerServiceToken,
} from '@ts-phoenix/event-manager';
import { LoggerPackage } from '@ts-phoenix/logger';

import {
  ExpressPackage,
  AfterExpressServerStartEvent,
  BeforeExpressServerStartEvent,
  BeforeExpressServerStopEvent,
  ExpressServiceToken,
} from '@src/index';

describe('node-express', () => {
  it('should start the server', async () => {
    const core = new Core({
      packages: [
        new ExpressPackage({
          port: 8001,
        }),
        new LoggerPackage(),
        new EventManagerPackage(),
      ],
    });

    await core.initialise();

    const beforeServerStartListener = jest.fn();
    const afterServerStartListener = jest.fn();
    const beforeServerStopListener = jest.fn();

    const eventManagerService = core.container.get(EventManagerServiceToken);

    eventManagerService.addListener({
      event: BeforeExpressServerStartEvent,
      handler: beforeServerStartListener,
    });

    eventManagerService.addListener({
      event: AfterExpressServerStartEvent,
      handler: afterServerStartListener,
    });

    eventManagerService.addListener({
      event: BeforeExpressServerStopEvent,
      handler: beforeServerStopListener,
    });

    const express = core.container.get(ExpressServiceToken);

    await express.start();

    expect(beforeServerStartListener).toHaveBeenCalled();
    expect(afterServerStartListener).toHaveBeenCalled();

    await express.stop();

    expect(beforeServerStopListener).toHaveBeenCalled();
  });
});
