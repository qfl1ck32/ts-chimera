import { Core, Package } from '@ts-phoenix/core';
import { LoggerPackage } from '@ts-phoenix/logger';

import {
  ExpressPackage,
  AfterServerStartEvent,
  BeforeServerStartEvent,
  BeforeServerStopEvent,
} from '@src/index';

describe('node-express', () => {
  it('should start the server', async () => {
    const beforeServerStartListener = jest.fn();
    const afterServerStartListener = jest.fn();
    const beforeServerStopListener = jest.fn();

    class TestPackage extends Package {
      async initialise() {
        this.core.eventManager.addListener({
          event: BeforeServerStartEvent,
          handler: beforeServerStartListener,
        });

        this.core.eventManager.addListener({
          event: AfterServerStartEvent,
          handler: afterServerStartListener,
        });

        this.core.eventManager.addListener({
          event: BeforeServerStopEvent,
          handler: beforeServerStopListener,
        });
      }
    }

    const core = new Core({
      packages: [
        new ExpressPackage({
          port: 8001,
        }),
        new LoggerPackage(),
        new TestPackage(),
      ],
    });

    await core.initialise();

    expect(beforeServerStartListener).toHaveBeenCalled();
    expect(afterServerStartListener).toHaveBeenCalled();

    await core.shutdown();

    expect(beforeServerStopListener).toHaveBeenCalled();
  });
});
