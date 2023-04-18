import { Core } from '@ts-phoenix/core';
import { EventManager } from '@ts-phoenix/event-manager';

import {
  ServerPackage,
  Server,
  AfterServerStartEvent,
  BeforeServerStartEvent,
  BeforeServerStopEvent,
} from '@src/index';

describe('node-server', () => {
  it('should start the server', async () => {
    const core = new Core({
      packages: [
        new ServerPackage({
          port: 8001,
        }),
      ],
    });

    await core.initialise();

    const eventManager = core.container.get(EventManager);
    const server = core.container.get(Server);

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

    await server.start();

    expect(beforeServerStartListener).toHaveBeenCalled();
    expect(afterServerStartListener).toHaveBeenCalled();

    await server.stop();

    expect(beforeServerStopListener).toHaveBeenCalled();
  });
});
