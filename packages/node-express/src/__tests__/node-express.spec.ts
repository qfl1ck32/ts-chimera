import { Core } from '@ts-phoenix/core';
import { EventManager } from '@ts-phoenix/event-manager';
import { LoggerPackage } from '@ts-phoenix/logger';

import {
  ExpressPackage,
  AfterServerStartEvent,
  BeforeServerStartEvent,
  BeforeServerStopEvent,
  Express,
} from '@src/index';

describe('node-express', () => {
  it('should start the server', async () => {
    const core = new Core({
      packages: [
        new ExpressPackage({
          port: 8001,
        }),
        new LoggerPackage(),
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

    await express.start();

    expect(beforeServerStartListener).toHaveBeenCalled();
    expect(afterServerStartListener).toHaveBeenCalled();

    await express.stop();

    expect(beforeServerStopListener).toHaveBeenCalled();
  });
});
