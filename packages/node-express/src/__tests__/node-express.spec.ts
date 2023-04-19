import { Core } from '@ts-phoenix/core';
import { EventManager } from '@ts-phoenix/event-manager';

import {
  ExpressPackage,
  Express,
  AfterServerStartEvent,
  BeforeServerStartEvent,
  BeforeServerStopEvent,
} from '@src/index';

describe('node-express', () => {
  it('should start the server', async () => {
    const core = new Core({
      packages: [
        new ExpressPackage({
          port: 8001,
        }),
      ],
    });

    const eventManager = core.container.get(EventManager);
    const server = core.container.get(Express);

    const beforeServerStartListener = jest.fn();
    const afterServerStartListener = jest.fn();
    const beforeServerStopListener = jest.fn();

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

    expect(beforeServerStartListener).toHaveBeenCalled();
    expect(afterServerStartListener).toHaveBeenCalled();

    await core.shutdown();

    expect(beforeServerStopListener).toHaveBeenCalled();
  });
});
